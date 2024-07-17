const router = require('koa-router')()

// 导入控制器
const adminController = require('../controllers/Admin')

//设置路由前缀，将所有后续路由映射到/admin路径下
router.prefix('/admin')
// 配置GET请求路由，用于添加管理员账户
router.get('/add_admin_account', adminController.addAdminAccount)
// 配置POST请求路由，用于处理管理员登录动作
router.post('/login_action', adminController.loginAction)
// 配置GET请求路由，用于检查管理员登录状态
router.get('/login_check', adminController.loginCheck)
// 配置GET请求路由，用于管理员退出登录
router.get('/logout', adminController.logout)

module.exports = router
