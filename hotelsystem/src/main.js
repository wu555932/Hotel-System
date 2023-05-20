import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/index"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
      app.use(router)
      app.use(ElementPlus)
      app.mount('#app')
