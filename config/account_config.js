const { REDIS_CONF } = require('../config/db_config')
const { isProd } = require('./env_config')
module.exports = {
  qiniu: {
    keys: {
      ak: 'YdHMldeM-cp7Qg84yUuiamebbfy9-q0WcFHlcy22',
      sk: '2zfoot6jv9bLeuhVKNULC3vcHhkdMJMu0IfGidxe',
    },
    bucket: {
      crawlSlider: {
        name: 'crawler-test0086',
        domain: 'http://greenmustard0086.cn/',
      },
    },
  },
  // 配置crawler
  crawlerOptions: {
    url: {
      // 推荐页
      recommend: 'https://duyi.ke.qq.com/?activeTab=head_recommend',
      // 课程页
      course: 'https://duyi.ke.qq.com/?activeTab=head_course',
      // 教师页
      teacher: 'https://duyi.ke.qq.com/?activeTab=head_teacher',
      // 机构介绍
      introduction: 'https://duyi.ke.qq.com/?activeTab=head_introduction',
    },
  },
  /**
   * 会话配置对象，包含会话键及相关设置。
   *
   * @property {Array} keys 会话密钥数组，用于加密和验证会话数据。
   * @property {string} name 会话ID的cookie名称。
   * @property {string} prefix 会话数据在存储中的前缀。
   */
  sessionInfo: {
    keys: ['aB3kL9QwZ1'],
    name: 'crawler.sid',
    prefix: 'crawler.sess',
  },

  /**
   * Cookie配置对象，包含cookie的路径、安全性和过期时间等设置。
   *
   * @property {string} path cookie的作用路径，指定cookie应用于网站的哪个部分。
   * @property {boolean} httpOnly 是否只通过HTTP协议访问cookie，增强安全性。
   * @property {number} maxAge cookie的过期时间，以毫秒为单位。
   */
  cookieInfo: {
    path: '/',
    httpOnly: true, //是否允许修改，true表示不允许修改
    maxAge: 24 * 60 * 60 * 1000, // 设置cookie的过期时间
  },

  /**
   * Redis配置对象，包含连接Redis服务器的信息。
   */
  redisInfo: {
    all: `${REDIS_CONF[1]}:${REDIS_CONF[0]}`,
  },

  adminInfo: {
    username: 'admin',
    password: 'admin',
  },

  cryptoSecret: '5e3c1a4d9b7f410c8a2b7d3f4e5b6c7d',

  corsOrigin: isProd ? '线上开发地址' : 'http://localhost:3001',
}
