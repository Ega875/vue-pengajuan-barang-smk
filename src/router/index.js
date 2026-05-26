import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
    {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
    },
    {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue') 
    },
    {
    path: '/pengajuan',
    name: 'Pengajuan',
    component: () => import('../views/Pengajuan.vue')
    },
    {
    path: '/riwayat',
    name: 'Riwayat',
    component: () => import('../views/Riwayat.vue')
    }

    
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router