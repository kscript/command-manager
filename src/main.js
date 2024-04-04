import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import '@/assets/scss/base.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App).use(store).use(router)
app.use(ElementPlus, {
  locale: zhCn
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
