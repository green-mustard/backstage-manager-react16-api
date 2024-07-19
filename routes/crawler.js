const router = require('koa-router')()

// 导入控制器
const crawlerController = require('../controllers/Crawler')
const loginCheck = require('../middleware/loginCheck')

// 配置路由前缀
router.prefix('/crawler')
// 轮播图路径
router.get('/crawl_slider_data', loginCheck, crawlerController.crawlSliderData)
// 机构介绍路径
router.get(
  '/crawl_agency_intro',
  loginCheck,
  crawlerController.crawlAgencyIntro,
)
// 热门课程路径
router.get(
  '/crawl_popular_courses',
  loginCheck,
  crawlerController.crawlPopularCourse,
)
// 教师列表路径
router.get('/crawl_teacher', loginCheck, crawlerController.crawlTeacher)
// 课程标签路径
router.get('/crawl_course_tabs', loginCheck, crawlerController.crawlCourseTabs)
// 课程路径
router.get('/crawl_courses_data', loginCheck, crawlerController.crawlCourseData)

module.exports = router
