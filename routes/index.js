const router = require('koa-router')()

// 导入控制器
const indexController = require('../controllers/Index')
// 导入检查登录状态的中间件
const loginCheck = require('../middleware/loginCheck')

router.get('/get_courses', loginCheck, indexController.getCourses)
router.get(
  '/get_popular_course_data',
  loginCheck,
  indexController.getPopularCourse,
)
router.post('/change_course_tab', loginCheck, indexController.changeCourseTab)
router.post(
  '/change_course_status',
  loginCheck,
  indexController.changeCourseStatus,
)
router.post(
  '/change_popular_course_status',
  loginCheck,
  indexController.changePopularCourseStatus,
)

module.exports = router
