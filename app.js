const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
/**
 * 导入koa-generic-session中间件，用于实现会话管理。
 * 这个中间件使得koa应用可以支持会话，从而可以存储和管理用户会话信息。
 */
const session = require('koa-generic-session')

/**
 * 导入koa-redis中间件，用于将会话数据存储在Redis中。
 * 选择Redis作为会话存储是因为Redis是一种高性能的键值存储系统，适合存储会话数据。
 */
const redisStore = require('koa-redis')

const { sessionInfo, cookieInfo, redisInfo, corsOrigin } = require('./config/account_config')

const crawlerRouter = require('./routes/crawler')
const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admin')

// error handler
onerror(app)

// middlewares
app.use(
  cors({
    origin: function (ctx) {
      return corsOrigin
    },
    // 允许跨域请求包含凭证（如cookies、HTTP认证及客户端SSL证明等）
    credentials: true
  })
)

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)

// 加密cookie的key
app.keys = sessionInfo.keys

// 注册并配置session中间件
app.use(
  session({
    key: sessionInfo.name, // 设置cookie的name
    prefix: sessionInfo.prefix, // 设置Redis key的前缀
    cookie: cookieInfo, // 设置cookie的配置
    store: redisStore(redisInfo) // 使用Redis存储会话数据
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(crawlerRouter.routes(), crawlerRouter.allowedMethods())
app.use(indexRouter.routes(), indexRouter.allowedMethods())
app.use(adminRouter.routes(), adminRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
