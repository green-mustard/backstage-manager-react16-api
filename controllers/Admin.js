/**
 * 从配置文件中导入管理员信息配置
 * @type {Object}
 */
const { adminInfo } = require('../config/account_config')

/**
 * 从服务模块导入添加管理员的方法
 * @type {Function}
 */
const { createAdminAccount, login } = require('../services/admin')

/**
 * 从工具库中导入各种方法
 * @type {Function}
 */
const { makeCrypto, trimSpace, returnInfo } = require('../libs/utils')
const { LOGIN } = require('../config/error_config')

/**
 * Admin 类用于管理员账户的创建
 */
class Admin {
  /**
   * 异步方法：创建管理员账户
   * @async
   */
  async addAdminAccount(ctx, next) {
    // 对管理员密码进行加密处理
    adminInfo.password = makeCrypto(adminInfo.password)

    // 调用添加管理员服务，尝试添加管理员
    const result = await createAdminAccount(adminInfo)
    // 根据添加结果打印相应信息
    if (result) {
      console.log('创建管理员成功')
    } else {
      console.log('创建管理员失败')
    }
  }

  /**
   * 异步处理登录动作。
   *
   * 此函数旨在处理用户的登录请求，通过验证用户名和密码的合法性来决定是否允许登录。
   * 它首先检查用户名和密码是否存在，然后验证它们的长度是否符合要求。
   * 接着，对用户名和密码进行处理（如去除空格和加密），并尝试进行登录操作。
   * 根据登录结果，返回相应的信息给客户端。
   *
   * @param {Object} ctx - 上下文对象，包含请求和响应等信息。
   * @param {Function} next - 中间件函数，用于链式调用下一个中间件。
   * @returns {Object} - 返回登录结果信息。
   */
  async loginAction(ctx, next) {
    // 从请求体中提取用户名和密码
    const { username, password } = ctx.request.body

    // 检查用户名或密码是否存在为空的情况
    if (!username || !password) {
      // 如果为空，则返回无效操作的信息
      ctx.body = returnInfo(LOGIN.INVALIDE_OPERATION)
      return
    }

    // 检查用户名长度是否合法
    if (trimSpace(username).length <= 0) {
      // 如果不合法，则返回用户名长度不符合要求的信息
      ctx.body = returnInfo(LOGIN.INVALIDE_USERNAME_LENGTH)
      return
    }

    // 检查密码长度是否合法
    if (trimSpace(password).length <= 0) {
      // 如果不合法，则返回密码长度不符合要求的信息
      ctx.body = returnInfo(LOGIN.INVALIDE_PASSWORD_LENGTH)
      return
    }

    // 准备登录信息，包括去除空格的用户名和加密后的密码
    const userInfo = {
      username: trimSpace(username),
      password: makeCrypto(trimSpace(password)),
    }

    // 尝试登录，等待登录结果
    const result = await login(userInfo)

    // 根据登录结果返回相应的信息
    if (result === 10003) {
      ctx.body = returnInfo(LOGIN.USERNAME_NOT_EXIST)
      return
    } else if (result === 10004) {
      ctx.body = returnInfo(LOGIN.PASSWORD_ERROR)
      return
    }

    // 登录成功，返回成功信息和登录结果
    return (ctx.body = returnInfo(LOGIN.SUCESS, result))
  }
}

// 导出一个 Admin 类的实例，以便其他地方可以直接使用该实例创建管理员
module.exports = new Admin()
