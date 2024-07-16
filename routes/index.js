const router = require('koa-router')()

// 导入控制器
const indexController = require('../controllers/Index')

router.get('/', indexController.index)
router.get('/get_courses', indexController.getCourse)

module.exports = router
