<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// --- FUNGSI LOGOUT DINAMIS ---
const handleLogout = async () => {
  try {
    // Ambil token aktif dari browser
    const token = localStorage.getItem('auth_token')

    // 1. Tembak API logout di backend Lumen (Port 8889)
    await axios.post('http://localhost:8889/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    // Jika koneksi server bermasalah, catat log tapi frontend tetap lanjut logout
    console.error('Gagal sinkronisasi logout dengan server:', error)
  } finally {
    // 2. Bersihkan seluruh sesi lokal di browser sampai bersih
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_role')
    localStorage.removeItem('user_name')

    // 3. Tendang balik dan kunci di halaman login
    router.push('/login')
  }
}
</script>

<template>
  <aside class="w-64 bg-indigo-900 text-white flex flex-col h-screen sticky top-0">
    <div class="p-6 text-xl font-bold border-b border-indigo-800">
      SMK System
    </div>
    
    <nav class="flex-1 p-4 space-y-2">
      <router-link 
        to="/" 
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-800"
        active-class="bg-indigo-700 shadow-lg"
      >
        <span class="mr-3">📊</span> Dashboard
      </router-link>

      <router-link 
        to="/pengajuan" 
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-800"
        active-class="bg-indigo-700 shadow-lg"
      >
        <span class="mr-3">📝</span> Pengajuan Barang
      </router-link>

      <router-link 
        to="/riwayat" 
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-800"
        active-class="bg-indigo-700 shadow-lg"
      >
        <span class="mr-3">📜</span> Riwayat Pengajuan
      </router-link>
    </nav>

    <div class="p-4 border-t border-indigo-800">
      <!-- UBAHAN DI SINI: Mengganti $router.push menjadi fungsi handleLogout -->
      <button 
        type="button"
        @click="handleLogout" 
        class="w-full text-left py-2 px-4 text-sm hover:text-red-400 transition-colors flex items-center"
      >
        <span class="mr-3">🚪</span> Keluar
      </button>
    </div>
  </aside>
</template>