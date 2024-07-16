const teacherModel = require('../database/models/teachers')

class TeacherService {
  async addTeacher(data) {
    const tid = data.tid
    const result = await teacherModel.findOne({
      where: {
        tid,
      },
    })
    if (result) {
      return await teacherModel.update(data, {
        where: {
          tid,
        },
      })
    } else {
      return await teacherModel.create(data)
    }
  }
}

module.exports = new TeacherService()
