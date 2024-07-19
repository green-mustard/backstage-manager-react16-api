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
}

module.exports = new CourseDataService()
