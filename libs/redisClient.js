/**
 * 引入Redis连接模块
 */
const redisConnect = require('../database/connections/redis_connect')

/**
 * 将数据设置到Redis中
 * @param {string} key - 数据的键
 * @param {string|object} value - 数据的值，如果为对象，将被转换为JSON字符串
 * @param {number} timeOut - 数据的过期时间，默认为60分钟
 */
function redisSet(key, value, timeOut = 60 * 60) {
  // 如果值是对象，转换为JSON字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  // 设置键值对，并设定过期时间
  redisConnect.set(key, value)
  redisConnect.expire(key, timeOut)
}

// 从Redis中获取数据
function redisGet(key) {
  return new Promise((resolve, reject) => {
    redisConnect.get(key, (err, val) => {
      // 如果有错误，拒绝Promise并返回错误
      if (err) {
        reject(err)
        return
      }
      // 如果键不存在，解析为null
      if (val == null) {
        resolve(null)
        return
      }
      // 尝试将值解析为JSON对象，如果失败则直接返回值
      try {
        resolve(JSON.parse(val))
      } catch (err) {
        resolve(val)
      }
    })
  })
}

/**
 * 导出Redis操作函数
 */
module.exports = {
  redisSet,
  redisGet,
}

/**
 * redisGet()的逻辑流程：
 * 创建一个新的 Promise 对象：函数开始时，创建一个新的 Promise 对象，该对象接受两个参数：resolve 和 reject。这两个函数用于在适当的时候解析或拒绝 Promise。

 * 调用 Redis 的 get 方法：使用 redisConnect.get(key, callback) 调用来尝试获取与 key 关联的值。这是一个异步调用，当操作完成时，会执行回调函数 callback。

 * 处理回调函数：在回调函数中，err 参数表示操作过程中是否发生了错误，而 val 参数包含获取到的值（如果操作成功）。

 * 错误处理：如果 err 不为空，这意味着在尝试获取值的过程中发生了错误。在这种情况下，使用 reject(err) 来拒绝 Promise，并将错误作为参数传递。这使得调用者可以捕获错误并进行适当的错误处理。

 * 值处理：如果 val 是 null，这意味着没有找到与 key 关联的值。在这种情况下，使用 resolve(null) 来解析 Promise，告诉调用者没有找到值。

 * 解析值：如果 val 不是 null，那么尝试将 val 解析为 JSON 对象。这是因为在 redisSet 函数中，如果存储的是对象，会先将其转换为 JSON 字符串。因此，在这里尝试反序列化以恢复原始对象。如果解析成功，使用 resolve(JSON.parse(val)) 来解析 Promise 并返回对象；如果解析失败（例如，val 不是有效的 JSON），则直接使用 resolve(val) 来解析 Promise 并返回原始字符串。

 * 通过这种方式，redisGet 函数能够异步地从 Redis 中获取数据，并根据数据类型和状态适当地处理结果，同时允许调用者通过 Promise 的 .then() 或 .catch() 方法来处理成功或失败的情况。
 */
