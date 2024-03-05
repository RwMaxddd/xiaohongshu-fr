import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css';

const app = createApp(App)

const pinia = createPinia()
app.use(ElementPlus).use(router).use(pinia)
app.mount('#app')