<template>
  <aside class="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0 text-left border-r border-slate-800 shadow-2xl">
    
    <div class="p-6 border-b border-slate-800 flex flex-col gap-3 bg-slate-900/50">
      <div class="flex items-center gap-3">
        <img src="../assets/logo-smk2.png" alt="Logo SMK N 2 Tasikmalaya" class="w-12 h-12 object-contain flex-shrink-0 drop-shadow-lg" />
        
        <div class="flex flex-col">
          <span class="text-[8px] text-blue-300 font-bold uppercase tracking-widest leading-tight mb-0.5">Sistem Informasi Pengajuan Barang</span>
          <span class="text-sm font-black tracking-wide text-gray-100 leading-tight">SMK 2 TASIKMALAYA</span>
        </div>
      </div>
      
      <span class="text-[10px] text-blue-300 font-bold tracking-widest uppercase bg-blue-500/10 px-2.5 py-1 rounded-md w-max border border-blue-500/20 mt-1">
        {{ roleUser }}
      </span>
    </div>
    
    <nav class="flex-1 p-4 space-y-1.5 overflow-y-auto">
      
      <router-link 
        to="/" 
        class="flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group"
        active-class="!bg-blue-600 !text-white shadow-md shadow-blue-900/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-3 text-current transition-colors">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
        </svg>
        Dashboard
      </router-link>

      <template v-if="roleUser === 'jurusan'">
        <router-link 
          to="/pengajuan" 
          class="flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group"
          active-class="!bg-blue-600 !text-white shadow-md shadow-blue-900/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-3 text-current transition-colors">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          Pengajuan Barang
        </router-link>

        <router-link 
          to="/riwayat" 
          class="flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group"
          active-class="!bg-blue-600 !text-white shadow-md shadow-blue-900/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-3 text-current transition-colors">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Riwayat Pengajuan
        </router-link>
      </template>

      <template v-if="roleUser === 'sarpras'">
        <router-link 
          to="/verifikasi-teknis" 
          class="flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group"
          active-class="!bg-blue-600 !text-white shadow-md shadow-blue-900/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-3 text-current transition-colors">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Verifikasi Teknis
        </router-link>

        <router-link 
          to="/master-barang" 
          class="flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group"
          active-class="!bg-blue-600 !text-white shadow-md shadow-blue-900/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-3 text-current transition-colors">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25m-9-5.25v9l9 5.25" />
          </svg>
          Master Barang Umum
        </router-link>

        <router-link 
          to="/kelola-user" 
          class="flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group"
          active-class="!bg-blue-600 !text-white shadow-md shadow-blue-900/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-3 text-current transition-colors">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
          Manajemen Akun
        </router-link>
      </template>

      <template v-if="roleUser === 'keuangan'">
        <router-link 
          to="/verifikasi-anggaran" 
          class="flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group"
          active-class="!bg-blue-600 !text-white shadow-md shadow-blue-900/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-3 text-current transition-colors">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.83-1.106-2.17 0-3 1.147-.86 2.859-.86 4.006 0l.415.311M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Verifikasi Anggaran
        </router-link>

        <router-link 
          to="/kelola-anggaran" 
          class="flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group"
          active-class="!bg-blue-600 !text-white shadow-md shadow-blue-900/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-3 text-current transition-colors">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          Kelola Anggaran
        </router-link>
      </template>

      <template v-if="roleUser === 'kepsek'">
        <router-link 
          to="/persetujuan-akhir" 
          class="flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group"
          active-class="!bg-blue-600 !text-white shadow-md shadow-blue-900/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-3 text-current transition-colors">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Keputusan Akhir
        </router-link>
      </template>

    </nav>

    <div class="p-4 border-t border-slate-800 mt-auto">
      <button 
        type="button"
        @click="handleLogout" 
        class="w-full text-left py-3 px-4 text-sm font-semibold text-red-500 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200 flex items-center group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-3 text-current transition-colors">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
        </svg>
        Keluar Sesi
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const roleUser = ref('jurusan')

onMounted(() => {
  const storedRole = localStorage.getItem('user_role')
  if (storedRole) {
    roleUser.value = storedRole.toLowerCase()
  }
})

const handleLogout = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    await axios.post('http://localhost:8889/api/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (error) {
    console.error('Gagal sinkronisasi sesi logout dengan server:', error)
  } finally {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_role')
    localStorage.removeItem('user_name')
    router.push('/login')
  }
}
</script>