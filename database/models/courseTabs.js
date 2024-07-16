const sequelize = require('../connections/mysql_connect')
const { STRING, INT } = require('../../config/db_type_config')

const CourseTabs = sequelize.define('courseTabs', {
  tid: {
    comment: 'tab ID',
    type: INT,
    allowNull: false,
    unique: true,
  },
  tabName: {
    comment: 'tab name',
    type: STRING,
    allowNull: false,
  },
})

module.exports = CourseTabs
