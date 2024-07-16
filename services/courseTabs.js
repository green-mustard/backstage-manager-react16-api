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
}

module.exports = new CourseTabsService()
