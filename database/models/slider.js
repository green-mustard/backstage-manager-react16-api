const sequelize = require('../connections/mysql_connect'),
  { STRING, INT } = require('../../config/db_type_config')

const Slider = sequelize.define('slider', {
  cid: {
    comment: 'course ID',
    type: INT,
    allowNull: false,
    unique: true,
  },
  imgUrl: {
    comment: 'course image url',
    type: STRING,
    allowNull: false,
  },
  title: {
    comment: 'course name',
    type: STRING,
    allowNull: false,
  },
  imgKey: {
    comment: 'qiniu image name',
    type: STRING,
    allowNull: false,
  },
  status: {
    comment: 'slider status',
    type: INT,
    defaultValue: 1,
    allowNull: false,
  },
})

module.exports = Slider
