import Vue from 'vue'
import VueRouter from 'vue-router'
import Projects from '@/views/Projects'

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
    component: Projects
  },
//   {
//     path: '/',
//     name: 'projects',
//     component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue')
//   },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import(/* webpackChunkName: "gallery" */ '../views/Gallery.vue')
  },
  {
    path: '/blocks',
    name: 'blocks',
    component: () => import(/* webpackChunkName: "gallery" */ '../views/Blocks.vue')
  },
  {
    path: '/tetris',
    name: 'tetris',
    component: () => import(/* webpackChunkName: "tetris" */ '../views/Tetris.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
