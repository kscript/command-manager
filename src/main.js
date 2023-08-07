import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ELementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/scss/base.scss'

createApp(App).use(store).use(router).use(ELementPlus).mount('#app')
