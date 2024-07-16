const sequelize = require('../connections/mysql_connect')
const { STRING, INT } = require('../../config/db_type_config')

const Teacher = sequelize.define('teacher', {
  tid: {
    comment: 'teacher ID',
    type: INT,
    allowNull: false,
    unique: true,
  },
  href: {
    comment: 'teacher page link',
    type: STRING,
    allowNull: false,
  },
  teacherImgSrc: {
    comment: 'teacher image url',
    type: STRING,
    allowNull: false,
  },
  teacherName: {
    comment: 'teacher name',
    type: STRING,
    allowNull: false,
  },
  courseCount: {
    comment: 'course count',
    type: INT,
    allowNull: false,
  },
  teacherDescription: {
    comment: 'teacher description',
    type: STRING,
    allowNull: false,
  },
  studentCount: {
    comment: 'student count',
    type: INT,
    allowNull: false,
  },
  teacherImgKey: {
    comment: 'qiniu image name',
    type: STRING,
    allowNull: false,
  },
  status: {
    comment: 'teacher status',
    type: INT,
    defaultValue: 1,
    allowNull: false,
  },
})

module.exports = Teacher
