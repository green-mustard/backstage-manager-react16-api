/**
 * Index类用于处理应用程序的入口点。
 * 它定义了应用程序索引页面的逻辑。
 */
const { getCourseData } = require('../services/courseData')
class Index {
  /**
   * index方法是索引页面的处理函数。
   * 它使用async关键字定义，允许使用await关键字在方法内等待异步操作。
   * @param {Object} ctx - 上下文对象，包含请求和响应等信息。
   * @param {Function} next - 中间件函数，用于执行下一个中间件或路由处理。
   */
  async index(ctx, next) {
    // 获取会话对象
    const session = ctx.session

    // 检查会话中是否没有uid属性，如果没有则初始化会话信息
    if (!session.uid) {
      // 设置默认的用户ID
      session.uid = 1
      // 设置默认用户名
      session.user = 'test'
      // 设置默认用户昵称
      session.nickname = 'greenMustard'
      // 设置默认用户性别
      session.gender = 'male'
    }

    // 设置响应体，将会话对象发送给客户端
    ctx.body = {
      session,
    }

    // 渲染页面
    // await ctx.render('index')
  }

  async getCourse(ctx, next) {
    const data = await getCourseData()
    ctx.body = data
  }
}

// 导出Index类的实例，供应用程序其他部分使用。
module.exports = new Index()
