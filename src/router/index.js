import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin/homepage/',
    name: 'admin_homepage',
    component: () => import('../views/Admin/AdminHome')
  },
  {
    path: '/admin/page/new/',
    name: 'admin_page_new',
    component: () => import('../views/Admin/Page/NewPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
