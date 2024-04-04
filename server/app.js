const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const json = require('koa-json')
const views = require('koa-views')
const logger = require('koa-logger')
const onerror = require('koa-onerror')

const app = new Koa()
const router = require('./router')

onerror(app)

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(cors())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/static'))

app.use(
  views(__dirname + '/views', {
  })
)

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(router.routes(), router.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
