const router = require('koa-router')()

// 导入控制器
const indexController = require('../controllers/Index')
// 导入检查登录状态的中间件
const loginCheck = require('../middleware/loginCheck')

router.get('/get_courses', loginCheck, indexController.getCourses)

module.exports = router
