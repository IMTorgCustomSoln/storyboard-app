import './assets/main.css'

//import { createApp } from 'vue'
import Vue, { createApp } from '@vue/compat';
import {BootstrapVue, BIcon, BootstrapVueIcons} from 'bootstrap-vue';
import { createPinia } from 'pinia'
import App from '@/App.vue'

//style
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.component('b-icon', BIcon)


const app = createApp(App)

app.use(createPinia())

app.mount('#app')
