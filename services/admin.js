const adminModel = require('../database/models/admin')

class AdminService {
  async createAdminAccount(adminAccount) {
    const { username } = adminAccount
    const result = await adminModel.findOne({
      where: {
        username,
      },
    })
    if (result) {
      return await adminModel.update(adminAccount, {
        where: {
          username,
        },
      })
    } else {
      return await adminModel.create(adminAccount)
    }
  }

  /**
   * 该方法用于验证用户登录信息的正确性，并返回用户的身份标识信息。
   * @param {Object} userInfo - 包含用户名和密码的对象。
   * @returns {number | Object} - 如果用户名不存在，返回10003；如果密码不匹配，返回10004；否则返回包含用户ID和用户名的对象。
   */
  async login(userInfo) {
    // 解构获取用户名和密码
    const { username, password } = userInfo

    // 检查用户名是否存在
    const usernameExist = await adminModel.findOne({
      where: {
        username,
      },
    })

    // 如果用户名不存在，返回错误代码10003
    if (!usernameExist) {
      return 10003
    }

    // 获取数据库中存储的密码
    const dbPassword = usernameExist.get('password')

    // 如果数据库中的密码与输入的密码不匹配，返回错误代码10004
    if (dbPassword !== password) {
      return 10004
    }

    // 获取用户的ID
    const uid = usernameExist.get('id')

    // 返回成功登录后的用户信息，包括ID和用户名
    return {
      uid,
      username,
    }
  }
}

module.exports = new AdminService()
