import './main.scss'
import 'es6-promise/auto'
import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import 'git-describe'
import VueRouterMultiView from 'vue-router-multi-view'
import { BootstrapVue } from 'bootstrap-vue'
import httpClient from './plugins/httpClient'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueRouterMultiView)
Vue.use(httpClient)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
