import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import '@/assets/scss/app.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const debounce = (callback, delay) => {
  let tid
  return function () {
    const ctx = self
    tid && clearTimeout(tid)
    tid = setTimeout(() => {
      callback.apply(ctx, arguments)
    }, delay)
  }
}

export default (app) => {
  const _ = window.ResizeObserver
  window.ResizeObserver = class ResizeObserver extends _ {
    constructor (callback) {
      callback = debounce(callback, 20)
      super(callback)
    }
  }
  app.use(ElementPlus, {
    locale: zhCn
  })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
