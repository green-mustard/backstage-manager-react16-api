//  引入Sequelize库，用于数据库操作。
const Sequelize = require('sequelize')

// 从db_config模块加载数据库配置信息，包含数据库连接所需的参数。
const { MYSQL_CONF } = require('../../config/db_config')

// 使用数据库配置初始化Sequelize实例，该实例用于处理所有与数据库相关的操作。
const sequelize = new Sequelize(...MYSQL_CONF.conf, MYSQL_CONF.base)

// 导出Sequelize实例以便其他模块使用。
module.exports = sequelize
