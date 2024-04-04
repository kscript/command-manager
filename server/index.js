const http = require('http')
const pkg = require('./package.json')
const app = require('./app')
const { useListen } = require('./utils')
const server = http.createServer(app.callback())
useListen(server, process.env.PORT || pkg.port, () => {
    const addr = server.address()
    console.log(`服务器已启动 http://localhost:${addr.port}`)
})
