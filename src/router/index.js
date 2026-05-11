import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue') 
  },
  // TAMBAHKAN INI
  {
    path: '/pengajuan',
    name: 'Pengajuan',
    component: () => import('../views/Pengajuan.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router