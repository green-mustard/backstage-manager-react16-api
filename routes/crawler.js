const router = require('koa-router')()

// 导入控制器
const crawlerController = require('../controllers/Crawler')

// 配置路由前缀
router.prefix('/crawler')
// 轮播图路径
router.get('/crawl_slider_data', crawlerController.crawlSliderData)
// 机构介绍路径
router.get('/crawl_agency_intro', crawlerController.crawlAgencyIntro)
// 热门课程路径
router.get('/crawl_popular_courses', crawlerController.crawlPopularCourse)
// 教师列表路径
router.get('/crawl_teacher', crawlerController.crawlTeacher)
// 课程标签路径
router.get('/crawl_course_tabs', crawlerController.crawlCourseTabs)
// 课程路径
router.get('/crawl_courses_data', crawlerController.crawlCourseData)

module.exports = router
