const sequelize = require('../connections/mysql_connect'),
  { STRING, INT, TEXT } = require('../../config/db_type_config')

const agencyIntro = sequelize.define('agencyIntro', {
  logoUrl: {
    comment: 'logo url',
    type: STRING,
    allowNull: false,
  },
  name: {
    comment: '机构名称',
    type: STRING,
    allowNull: false,
  },
  agencyIntro: {
    comment: '机构介绍',
    type: TEXT,
    allowNull: false,
  },
  feedbackRate: {
    comment: '好评率',
    type: STRING,
    allowNull: false,
  },
  courseCount: {
    comment: '课程数量',
    type: INT,
    allowNull: false,
  },
  studentCount: {
    comment: '学员数量',
    type: INT,
    allowNull: false,
  },
  logoKey: {
    comment: 'logo image name',
    type: STRING,
    allowNull: false,
  },
})

module.exports = agencyIntro
