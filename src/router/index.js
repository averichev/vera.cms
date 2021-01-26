import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/pages/',
    name: 'pages',
    component: () => import('../views/Admin/Page/ListPage')
  },
  {
    path: '/page/new/',
    name: 'pages_new',
    component: () => import('../views/Admin/Page/NewPage')
  },
  {
    path: '/page/edit/:pageId/',
    name: 'pages_edit',
    component: () => import('../views/Admin/Page/EditPage')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
