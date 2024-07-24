// 导入课程数据获取服务
const {
  getCourseData,
  changeCourseTab,
  changeStatus,
} = require('../services/courseData.js')
const { getCourseTab } = require('../services/courseTabs.js')
const {
  getPopularCourses,
  changePopularStatus,
} = require('../services/popularCourses.js')
// 导入返回信息处理工具
const { returnInfo } = require('../libs/utils.js')
// 导入错误配置信息
const { API } = require('../config/error_config.js')
const popularCourses = require('../services/popularCourses.js')

/**
 * Index类，用于处理课程相关信息
 */
class Index {
  /**
   * 获取课程列表信息
   * @param {Object} ctx 上下文对象，用于访问请求和响应数据
   * @param {Function} next 中间件函数，用于执行下一个中间件
   * @returns {Promise<void>} 异步操作，返回Promise
   */
  async getCourses(ctx, next) {
    // 异步获取课程数据
    const courseData = await getCourseData()
    const tabData = await getCourseTab()

    // 根据获取数据的结果，设置响应体
    // 如果数据获取成功，返回成功信息和数据
    // 如果数据获取失败，返回失败信息
    ctx.body =
      courseData && tabData
        ? returnInfo(API.RETURN_SUCCESS, { courseData, tabData })
        : returnInfo(API.RETURN_FAIL)

    // 注释掉的代码是与上面相同逻辑的另一种写法
    // if (data) {
    //   ctx.body = returnInfo(API.RETURN_SUCCESS, data)
    // } else {
    //   ctx.body = returnInfo(API.RETURN_FAIL)
    // }
  }

  async getPopularCourse(ctx, next) {
    const popularCourseData = await getPopularCourses()

    ctx.body = popularCourseData
      ? returnInfo(API.RETURN_SUCCESS, popularCourseData)
      : returnInfo(API.RETURN_FAIL)
  }

  async changeCourseTab(ctx, next) {
    const { cid, field } = ctx.request.body

    const result = await changeCourseTab(cid, field)

    if (!result) {
      ctx.body = returnInfo(API.CHANGE_COURSE_TAB_FAIL)
      return
    }
    ctx.body = returnInfo(API.CHANGE_COURSE_TAB_SUCCESS)
  }

  async changeCourseStatus(ctx, next) {
    const { cid, status } = ctx.request.body
    const result = await changeStatus(cid, status)
    if (!result) {
      ctx.body = returnInfo(API.CHANGE_COURSE_STATUS_FAIL)
      return
    }
    ctx.body = returnInfo(API.CHANGE_COURSE_STATUS_SUCCESS)
  }

  async changePopularCourseStatus(ctx, next) {
    const { cid, status } = ctx.request.body
    const result = await changePopularStatus(cid, status)
    if (!result) {
      ctx.body = returnInfo(API.CHANGE_COURSE_STATUS_FAIL)
      return
    }
    ctx.body = returnInfo(API.CHANGE_COURSE_STATUS_SUCCESS)
  }
}

// 导出Index类的实例，供其他地方使用
module.exports = new Index()
