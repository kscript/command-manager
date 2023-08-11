import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ELementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/scss/base.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App).use(store).use(router).use(ELementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
