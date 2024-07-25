// 导入课程数据获取服务
const {
  getCourseData,
  changeCourseTabData,
  changeCourseStatus,
} = require('../services/courseData.js')
const { getCourseTab } = require('../services/courseTabs.js')
const {
  getPopularCourseData,
  changePopularCourseStatus,
} = require('../services/popularCourses.js')
const { getSliderData, changeSliderStatus } = require('../services/slider.js')
// 导入返回信息处理工具
const { returnInfo } = require('../libs/utils.js')
// 导入错误配置信息
const { API } = require('../config/error_config.js')

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
    const popularCourseData = await getPopularCourseData()

    ctx.body = popularCourseData
      ? returnInfo(API.RETURN_SUCCESS, popularCourseData)
      : returnInfo(API.RETURN_FAIL)
  }

  async getSlider(ctx, next) {
    const sliderData = await getSliderData()

    ctx.body = sliderData
      ? returnInfo(API.RETURN_SUCCESS, sliderData)
      : returnInfo(API.RETURN_FAIL)
  }
  async changeCourseTab(ctx, next) {
    const { cid, field } = ctx.request.body

    const result = await changeCourseTabData(cid, field)

    if (!result) {
      ctx.body = returnInfo(API.CHANGE_COURSE_TAB_FAIL)
      return
    }
    ctx.body = returnInfo(API.CHANGE_COURSE_TAB_SUCCESS)
  }

  async changeStatus(ctx, next) {
    const { id, status, field } = ctx.request.body
    let result = null

    switch (field) {
      case 'COURSE':
        result = await changeCourseStatus(id, status)
        break
      case 'POPULAR_COURSE':
        result = await changePopularCourseStatus(id, status)
        break
      case 'SLIDER':
        result = await changeSliderStatus(id, status)
        break
      default:
        ctx.body = returnInfo(API.FIELD_ERROR)
        return
    }

    if (!result) {
      ctx.body = returnInfo(API.CHANGE_STATUS_FAIL)
    }
    ctx.body = returnInfo(API.CHANGE_STATUS_SUCCESS)
  }
}

// 导出Index类的实例，供其他地方使用
module.exports = new Index()
