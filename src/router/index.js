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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token')
  const role = localStorage.getItem('user_role')

  // 1. Jika user mau ke halaman selain Login tapi belum login (tidak punya token)
  if (to.name !== 'Login' && !token) {
    next({ name: 'Login' })
  } 
  // 2. Jika user sudah login tapi malah mencoba buka halaman Login lagi
  else if (to.name === 'Login' && token) {
    next({ name: 'Dashboard' })
  } 
  // 3. Lolos seleksi, silakan jalan terus
  else {
    next()
  }
})

export default router