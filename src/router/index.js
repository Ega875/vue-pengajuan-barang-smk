import { createRouter, createWebHistory } from 'vue-router'

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
    },
    {
      path: '/master-barang',
      name: 'MasterBarang',
      component: () => import('../views/MasterBarang.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/kelola-user',
      name: 'KelolaUser',
      component: () => import('../views/KelolaUser.vue'),
      meta: { requiresAuth: true }
    },
    // INI ADALAH RUTE BARU UNTUK HALAMAN VERIFIKASI TEKNIS (SARPRAS)
    {
      path: '/verifikasi-teknis',
      name: 'VerifikasiTeknis',
      component: () => import('../views/VerifikasiTeknis.vue'), 
      meta: { requiresAuth: true }
    },

    {
      path: '/verifikasi-anggaran',
      name: 'verifikasi-anggaran',
      component: () => import('../views/VerifikasiAnggaran.vue')
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token')

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