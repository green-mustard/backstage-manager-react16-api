const courseTabsModel = require('../database/models/courseTabs')

class CourseTabsService {
  async addCourseTab(data) {
    const tid = data.tid
    const result = await courseTabsModel.findOne({
      where: {
        tid,
      },
    })
    if (result) {
      return await courseTabsModel.update(data, {
        where: {
          tid,
        },
      })
    } else {
      return await courseTabsModel.create(data)
    }
  }

  async getCourseTab() {
    return await courseTabsModel.findAll({
      // 获取课程标签所有数据的同时，排除掉'tid', 'createdAt', 'updatedAt'这几个属性
      attributes: { exclude: ['tid', 'createdAt', 'updatedAt'] },
    })
  }
}

module.exports = new CourseTabsService()
