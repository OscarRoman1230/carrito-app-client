import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import router from './router'

const app = Vue.createApp(App)

app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
