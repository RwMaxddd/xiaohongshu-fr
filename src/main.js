import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css';
import './style/theme.css'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App)

const pinia = createPinia()
app.use(ElementPlus).use(router).use(pinia).use(ArcoVue);
app.mount('#app')