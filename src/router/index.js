import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: Home
//     //component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
//   },
  {
    path: '/skills',
    name: 'skills',
    component: () => import(/* webpackChunkName: "skills" */ '../views/Skills.vue')
  },
  {
    path: '/',
    name: 'projects',
    component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue')
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import(/* webpackChunkName: "gallery" */ '../views/Gallery.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
