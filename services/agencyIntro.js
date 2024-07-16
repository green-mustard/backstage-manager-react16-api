/*
 * 引入代理介绍的数据库模型
 */
const agencyModel = require('../database/models/agencyIntro')

/*
 * 代理介绍服务类
 * 提供代理介绍的增删改查等业务逻辑
 */
class AgencyIntroService {
  /*
   * 添加或更新代理介绍
   * @param {Object} data - 代理介绍的数据对象
   * @returns {Object} 返回数据库操作的结果
   * @async
   */
  async addAgencyIntro(data) {
    // 定义要操作的记录的ID
    const id = 1
    try {
      // 查询是否存在该ID的记录
      const result = await agencyModel.findOne({
        where: { id },
      })
      // 如果记录存在，则更新记录
      if (result) {
        return await agencyModel.update(data, { where: { id } })
      } else {
        // 如果记录不存在，则创建新记录
        return await agencyModel.create(data)
      }
    } catch (error) {
      // 捕获并打印任何操作错误
      console.log(error)
    }
  }
}

// 导出实例化的服务类
module.exports = new AgencyIntroService()
