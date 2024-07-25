/**
 * 引入热门课程模型
 * @module popularCourseModel
 */
const popularCourseModel = require('../database/models/popularCourses')

/**
 * 热门课程服务类
 * 提供热门课程的增删改查等业务逻辑
 */
class PopularCoursesService {
  /**
   * 添加热门课程
   * 如果课程已存在，则更新课程信息；否则，创建新课程
   * @param {Object} data - 课程数据，包含imgSrc等字段
   * @returns {Object} 返回数据库操作的结果
   */
  async addPopularCourses(data) {
    try {
      // 获取数据中的图片源URL
      const imgSrc = data.imgSrc
      // 检查是否已存在相同图片源的课程
      const result = await popularCourseModel.findOne({
        where: { imgSrc },
      })

      // 如果课程已存在，更新课程数据
      if (result) {
        return await popularCourseModel.update(data, {
          where: { imgSrc },
        })
      } else {
        // 如果课程不存在，创建新课程
        return await popularCourseModel.create(data)
      }
    } catch (error) {
      // 捕获并打印任何错误
      console.log(error)
    }
  }
  async getPopularCourses() {
    return await popularCourseModel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'imgSrc'] },
    })
  }

  async changePopularCourseStatus(id, status) {
    const result = await popularCourseModel.update(
      { status },
      { where: { cid: id } },
    )
    return result[0]
  }
}

// 导出热门课程服务实例
module.exports = new PopularCoursesService()
