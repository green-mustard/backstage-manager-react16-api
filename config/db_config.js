const ENV = require('./env_config')

module.exports = {
  MYSQL_CONF: {
    base: {
      host: 'localhost', // 数据库地址
      user: 'root', // 数据库用户名
      password: '123456', // 数据库密码
      database: 'test', // 数据库名
      dialect: 'mysql', // 数据库类型
      pool: {
        max: 5, // 连接池最大连接数量
        min: 0,
        idle: 10000,
      },
    },
    conf: ['test', 'root', ENV.isProd ? '' : '123456'],
  },
  //建立和Redis的连接
  REDIS_CONF: [
    '6379', //Redis默认端口号
    '127.0.0.1', //主机地址
  ],
}
