/**
 * 初始化Redis连接
 *
 * 本段代码负责引入redis模块，并基于配置信息创建一个Redis连接实例。
 * 同时，通过监听错误事件来处理Redis连接可能出现的问题。
 *
 * @requires redis 操作Redis的Node.js模块
 * @requires ../../config/db_config Redis配置信息的文件
 */
const redis = require('redis')
const { REDIS_CONF } = require('../../config/db_config')

/**
 * 创建Redis连接实例
 *
 * 通过redis.createClient方法创建一个Redis连接实例，并使用从配置文件中获取的REDIS_CONF来配置连接参数。这确保能正确地连接到Redis服务器。
 */
const redisConnect = redis.createClient(REDIS_CONF)

/**
 * 监听Redis连接的错误事件
 *
 * 此事件监听器用于捕获并记录Redis在连接或操作过程中产生的错误。
 * 它是Redis连接操作中必要的错误处理机制，确保了在遇到问题时我们能够
 * 及时得到反馈，以便进行相应的错误处理或调试。
 */
redisConnect.on('error', err => {
  console.log('redis error: ', err)
})

module.exports = redisConnect
