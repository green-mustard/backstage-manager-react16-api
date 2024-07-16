const sequelize = require('../connections/mysql_connect')
const { STRING, INT } = require('../../config/db_type_config')

const popularCourses = sequelize.define('popularCourses', {
  cid: {
    comment: 'course id',
    type: INT,
    allowNull: false,
    unique: true,
  },
  href: {
    comment: 'course detail page link',
    type: STRING,
    allowNull: false,
  },
  courseName: {
    comment: 'course name',
    type: STRING,
    allowNull: false,
  },
  imgSrc: {
    comment: 'img src',
    type: STRING,
    allowNull: false,
  },
  imgKey: {
    comment: 'img key',
    type: STRING,
    allowNull: false,
  },
  feedbackRate: {
    comment: 'course feedback rage',
    type: STRING,
    allowNull: false,
  },
  studentsNumber: {
    comment: 'course students number',
    type: STRING,
    allowNull: false,
  },
  status: {
    comment: 'course status',
    type: INT,
    defaultValue: 1,
    allowNull: false,
  },
})

module.exports = popularCourses
