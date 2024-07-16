/*
 * 启动一个子进程。
 *
 * @param {Object} options - 配置选项。
 * @param {string} options.path - 子进程要执行的脚本路径。
 * @param {Function} options.message - 接收子进程发送的消息的回调函数。
 * @param {Function} options.exit - 子进程退出时调用的回调函数。
 * @param {Function} options.error - 子进程启动失败时调用的回调函数。
 */
const cp = require('child_process')
const nanoId = require('nanoid')
const Qiniu = require('qiniu')
// 导入加密工具
const crypto = require('crypto')
const { resolve } = require('path')
const {
  qiniu: { keys },
  cryptoSecret,
} = require('../config/account_config')

function startProcess(options) {
  // 解析脚本路径并启动子进程
  const script = resolve(__dirname, options.path),
    childProcess = cp.fork(script, [])

  let invoked = false

  // 监听子进程发送的消息
  childProcess.on('message', data => {
    options.message(data)
  })
  // 监听子进程退出事件
  childProcess.on('exit', code => {
    if (invoked) return
    invoked = true
    options.exit(code)
  })
  // 监听子进程启动错误
  childProcess.on('error', err => {
    if (invoked) return
    invoked = true
    options.error(err)
  })
}

// 将上传文件到七牛云。
function qiniuUpload(options) {
  // 创建七牛云的认证对象
  const mac = new Qiniu.auth.digest.Mac(keys.ak, keys.sk)
  // 配置七牛云的客户端
  const config = new Qiniu.conf.Config()
  const client = new Qiniu.rs.BucketManager(mac, config)

  // 生成文件的唯一标识
  const key = nanoId() + options.ext

  // 返回一个Promise对象，此处实现文件上传逻辑
  return new Promise((resolve, reject) => {
    client.fetch(options.url, options.bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

/**
 * 创建一个加密函数，用于生成基于输入字符串和预定义密钥的MD5加密字符串。
 * 此函数主要用于数据的签名或验证，确保数据的完整性和真实性。
 *
 * @param {string} str 需要加密的原始字符串。
 * @returns {string} 返回加密后的MD5字符串。
 */
function makeCrypto(str) {
  // 创建MD5哈希对象
  const _md5 = crypto.createHash('md5')

  // 构建加密内容，包含原始字符串和密钥
  // 这里使用了一个固定的格式，将原始字符串和密钥通过&符号连接
  const content = `str=${str}&secret=${cryptoSecret}`

  // 更新MD5哈希对象的内容为构建的加密内容，并以16进制格式返回哈希值
  return _md5.update(content).digest('hex')
}

/**
 * 移除字符串中的所有空格。
 *
 * 该函数通过正则表达式替换所有一个或多个连续空格为零个空格，从而实现字符串中空格的移除。
 * 这对处理用户输入或从外部源获取的字符串数据非常有用，可以避免因空格导致的错误或不必要的间隔。
 *
 * @param {string} str - 需要移除空格的字符串。
 * @returns {string} - 移除所有空格后的字符串。
 */
function trimSpace(str) {
  return str.replace(/\s+/g, '')
}

/**
 * 处理错误信息和数据的返回。
 *
 * 此函数主要用于在存在数据时，将数据附加到错误信息对象中，然后返回该对象。
 * 这种模式在处理异步操作或API响应时非常有用，可以将错误信息和相关数据一起返回，便于上层逻辑处理。
 *
 * @param {Object} errorInfo - 错误信息对象，包含错误描述等信息。
 * @param {*} data - 可能存在的数据对象，如果存在，则将其附加到错误信息对象中。
 * @returns {Object} - 包含错误信息和可能的数据的对象。
 */
function returnInfo(errorInfo, data) {
  if (data) {
    errorInfo.data = data
  }
  return errorInfo
}
module.exports = {
  startProcess,
  qiniuUpload,
  makeCrypto,
  trimSpace,
  returnInfo,
}
