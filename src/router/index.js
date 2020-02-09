import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
    //component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import(/* webpackChunkName: "home" */ '../views/Skills.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
