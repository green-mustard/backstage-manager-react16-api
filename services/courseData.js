const courseDataModel = require('../database/models/courseData')

class CourseDataService {
  async addCourseData(data) {
    const cid = data.cid
    const result = await courseDataModel.findOne({
      where: {
        cid,
      },
    })
    if (result) {
      return await courseDataModel.update(data, {
        where: {
          cid,
        },
      })
    } else {
      return await courseDataModel.create(data)
    }
  }
  async getCourseData() {
    return await courseDataModel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'imgUrl'] },
    })
  }

  /**
   * 异步函数：更新课程数据中的指定字段
   *
   * 本函数通过调用courseDataModel的update方法，来更新课程数据表中特定课程（cid）的特定字段（field）。
   * 它使用了async/await语法，以确保更新操作完成后再继续执行后续代码。
   *
   * @param {number} cid - 课程的唯一标识符。此标识符用于确定要更新哪门课程的数据。
   * @param {string} field - 要更新的字段名。此字段名指定要修改的课程数据的属性。
   * @returns {number} 返回更新操作影响的行数。这可以帮助确定更新是否成功。
   */
  async changeCourseTab(cid, field) {
    // 等待更新操作完成，并获取更新结果
    const result = await courseDataModel.update(
      { field },
      {
        where: {
          cid,
        },
      },
    )
    // 返回更新操作影响的行数
    return result[0]
  }
}

module.exports = new CourseDataService()
