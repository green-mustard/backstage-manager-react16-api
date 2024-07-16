const sequelize = require('../connections/mysql_connect')
const { STRING, INT } = require('../../config/db_type_config')

const CourseData = sequelize.define('course_data', {
  cid: {
    comment: 'course ID',
    type: INT,
    allowNull: false,
    unique: true,
  },
  imgUrl: {
    comment: '课程图片',
    type: STRING,
    allowNull: false,
  },
  imgKey: {
    comment: 'qiniu image name',
    type: STRING,
    allowNull: false,
  },
  href: {
    comment: '课程链接',
    type: STRING,
    allowNull: false,
  },
  title: {
    comment: '课程名称',
    type: STRING,
    allowNull: false,
  },
  price: {
    comment: '课程价格',
    type: STRING,
    allowNull: false,
  },
  studentCount: {
    comment: '报名人数',
    type: STRING,
    allowNull: false,
  },
  courseCount: {
    comment: '课程数量',
    type: STRING,
    allowNull: false,
  },
  filed: {
    comment: '课程分类',
    type: INT,
    allowNull: false,
  },
})

module.exports = CourseData
