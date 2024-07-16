const sequelize = require('./connections/mysql_connect')
require('./models')
// 尝试验证数据库连接。此函数用来检验数据库连接是否成功建立。
async function authenticateDatabase() {
  try {
    await sequelize.authenticate()
    // 如果认证成功，输出数据库连接成功的消息。
    console.log('MySQL服务器已完全连接。')
  } catch (err) {
    // 如果认证失败，输出错误信息。
    console.log('MySQL服务器连接失败，错误信息如下:' + err)
  }
}

// 执行数据库连接验证。
authenticateDatabase()

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('MySQL服务器已完全连接。')
//     process.exit()
//   })
//   .catch(err => {
//     console.log('MySQL服务器连接失败，错误信息如下:' + err)
//   })

async function synchronizeDatabase() {
  try {
    // 尝试同步模型到数据库，{ force: true }强制重新创建表。
    await sequelize.sync()
    console.log('表已成功同步到数据库中')
    process.exit()
  } catch (err) {
    console.error('数据库同步时发生错误:', err)
  }
}

// 调用函数以同步数据库表。
synchronizeDatabase()
