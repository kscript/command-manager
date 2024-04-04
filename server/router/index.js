const path = require('path')
const fs = require('fs-extra')
const router = require('koa-router')()
const { useResponse } = require('../utils')
const { exec, spawn } = require('child_process')
const commandList = {}

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

router.post('/stop', async (ctx) => {
    data = ctx.request.body
    console.log(commandList[data.uuid])
    if (data.uuid && Array.isArray(commandList[data.uuid])) {
        commandList[data.uuid].forEach(list => {
            list.forEach(item => {
                if (!item.close) {
                    item.child.kill('SIGKILL')
                }
            })
        })
        delete commandList[data.uuid]
        return useResponse(ctx, 1)
    }
    useResponse(ctx, 0)
})

router.post('/exec', async (ctx) => {
    const current = []
    const commands = []
    const data = ctx.request.body
    if (data.uuid) {
        commandList[data.uuid] = commandList[data.uuid] || []
        commandList[data.uuid].push(current)
    }
    if (data.nodeVersion) {
        commands.push('nvm use ' + data.nodeVersion)
    }
    if (typeof data.commandLines === 'string' || Array.isArray(data.commandLines)) {
        const commandLines = (Array.isArray(data.commandLines) ? data.commandLines : data.commandLines.split('\n'))
        commandLines.map(command => {
            commands.push(command.replace(/(^\s+|\s+$)/g, ''))
        })
        const result = []
        const promises = commands.map((command, index) => {
            return new Promise((resolve, reject) => {
                if (!command) resolve()
                const child = spawn('cmd.exe', ['/c', command], {
                    cwd: data.path
                })
                const item = {
                    command,
                    child
                }
                current.push(item)
                child.stdout.on('data', data => {
                    console.log(`${command} 输出:\n${data}\n`)
                })
                child.stderr.on('data', data => {
                    console.error(`${command} 错误:\n${data}\n`)
                })
                child.on('close', code => {
                    Object.assign(item, {
                        close: true,
                        code
                    })
                    result[index] = {
                        command,
                        code
                    }
                    if (code === 0) resolve()
                    else reject(code)
                })
            })
        })
        console.log(commands)
        const execPromise = () => Promise.all(promises).then(() => {
            useResponse(ctx, result.slice(data.nodeVersion ? 3 : 2))
        }).catch(error => {
            useResponse(ctx, {}, 500, error.toString())
        }).finally(() => {
            if (data.uuid) {
                commandList[data.uuid] = commandList[data.uuid].filter(item => item !== current)
            }
        })
        if (data.await) {
            return execPromise()
        } else {
            execPromise()
        }
    }
    useResponse(ctx, {})
})

module.exports = router