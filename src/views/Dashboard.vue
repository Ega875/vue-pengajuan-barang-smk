<script setup>
// Kita panggil komponen Sidebar yang tadi dibuat
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <div class="flex min-h-screen bg-gray-100 font-sans">
    <Sidebar />

    <main class="flex-1 p-8">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 text-left">Dashboard Jurusan</h1>
          <p class="text-gray-500 text-sm text-left">Selamat datang kembali di sistem pengajuan barang.</p>
        </div>
        <div class="flex items-center space-x-4">
          <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">
            Sesi Aktif
          </span>
        </div>
      </header>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
          <p class="text-gray-400 text-xs font-bold uppercase text-left mb-1">Total Pengajuan</p>
          <p class="text-3xl font-extrabold text-gray-800 text-left">12</p>
        </div>
        
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <p class="text-gray-400 text-xs font-bold uppercase text-left mb-1">Menunggu</p>
          <p class="text-3xl font-extrabold text-gray-800 text-left">3</p>
        </div>
        
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p class="text-gray-400 text-xs font-bold uppercase text-left mb-1">Disetujui</p>
          <p class="text-3xl font-extrabold text-gray-800 text-left">9</p>
        </div>
      </div>

      <div class="mt-10 p-10 border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
        Area ini nantinya bisa diisi dengan tabel pengajuan terbaru atau grafik.
      </div>
    </main>
  </div>
</template>