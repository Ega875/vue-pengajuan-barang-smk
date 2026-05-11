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
    </nav>

    <div class="p-4 border-t border-indigo-800">
      <button @click="$router.push('/login')" class="w-full text-left py-2 px-4 text-sm hover:text-red-400 transition-colors">
        🚪 Keluar
      </button>
    </div>
  </aside>
</template>