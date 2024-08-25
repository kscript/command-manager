const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/command-manager/',
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false
    }
  }
})
