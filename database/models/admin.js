const sequelize = require('../connections/mysql_connect')
const { STRING } = require('../../config/db_type_config')

const Admin = sequelize.define('admin', {
  username: {
    comment: 'admin user name',
    type: STRING,
    allowNull: false,
  },
  password: {
    comment: 'crypto user password',
    type: STRING,
    allowNull: false,
  },
})

module.exports = Admin
