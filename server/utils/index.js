const getPort = (val) => {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}

const useListen = (server, port, success, fail) => {
    const serverPort = getPort(port)
    server.listen(serverPort)
    server.on('error', (err) => {
        if (err.errno === -4091) {
            console.log('端口被占用, 1秒后重试..')
            setTimeout(() => {
                server.listen(serverPort)
            }, 1000)
        } else {
            typeof fail === 'function' && fail(err)
        }
    })
    server.on('listening', () => {
        typeof success === 'function' && success()
    })
}

const useResponse = (ctx, data, code = 200, msg = 'success') => {
    ctx.body = { data, code, msg }
}

Object.assign(module.exports, Object.assign(exports, {
    useListen,
    useResponse,
}))