const path = require('path')
const fs = require('fs-extra')
const router = require('koa-router')()
const { useResponse } = require('../utils')
const { exec } = require('child_process')

router.get('/', async (ctx) => {
    await ctx.render('index', {})
})

router.post('/export', async (ctx) => {
    const data = ctx.request.body
    if (data.path) {
        if (fs.existsSync(data.path)) {
            const isDirectory = fs.statSync(data.path).isDirectory()
            const filePath = isDirectory ? path.join(data.path, 'manifest.json') : /[/\/]manifest\.json$/.test(data.path) ? data.path : path.join(path.basename(data.path), 'manifest.json')
            try {
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
                useResponse(ctx, {})
            } catch (err) {
                useResponse(ctx, {}, 500, err.toString())
            }
            return
        }
    }
    useResponse(ctx, {}, 500, '文件目录不存在')
})

router.post('/open', async (ctx) => {
    const data = ctx.request.body
    if (data.path) {
        if (fs.existsSync(data.path)) {
            const command = {
                darwin: `open -R "${data.path}"`,
                win32: `start explorer "${data.path}"`
            }[process.platform] || `xdg-open "${data.path}"`
            return new Promise((resolve, reject) => {
                exec(command, (error) => {
                    error ? reject(error) : resolve()
                })
            }).then(() => {
                useResponse(ctx, {})
            }).catch(error => {
                useResponse(ctx, {}, 500, error.toString())
            })
        }
    }
    useResponse(ctx, {}, 500, '文件目录不存在')
})

module.exports = router