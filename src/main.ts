import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { App } from './App';
import { router } from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia();
const app = createApp(App);

app.use(ElementPlus)
app.use(pinia).use(router);
app.mount('#app');
