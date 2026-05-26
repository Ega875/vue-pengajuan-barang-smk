<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref } from 'vue'

// Data ringkasan (Statistik)
const stats = ref([
  { label: 'Total Pengajuan', value: 12, color: 'border-indigo-500', icon: '📁' },
  { label: 'Sedang Diproses', value: 3, color: 'border-yellow-500', icon: '⏳' },
  { label: 'Selesai/Disetujui', value: 9, color: 'border-green-500', icon: '✅' },
])

// Data 5 Pengajuan Terakhir untuk ditampilkan di Dashboard
const pengajuanTerakhir = ref([
  { id: 'REQ-003', item: 'Mouse Logitech G102', tgl: '13 Mei', status: 'Ditolak' },
  { id: 'REQ-002', item: 'Monitor LED 24 Inch', tgl: '12 Mei', status: 'Menunggu' },
  { id: 'REQ-001', item: 'PC Rakitan Core i7', tgl: '10 Mei', status: 'Disetujui' },
])

const getStatusColor = (status) => {
  if (status === 'Disetujui') return 'text-green-600 bg-green-50'
  if (status === 'Menunggu') return 'text-yellow-600 bg-yellow-50'
  if (status === 'Ditolak') return 'text-red-600 bg-red-50'
  return 'text-gray-600 bg-gray-50'
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100 font-sans text-left">
    <Sidebar />

    <main class="flex-1 p-8">
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Halo, Admin Jurusan! 👋</h1>
        <p class="text-gray-500">Berikut adalah ringkasan aktivitas pengajuan barang kamu.</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div v-for="stat in stats" :key="stat.label" 
          class="bg-white p-6 rounded-2xl shadow-sm border-l-8 transition-transform hover:scale-105"
          :class="stat.color"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">{{ stat.label }}</p>
              <p class="text-3xl font-black text-gray-800 mt-1">{{ stat.value }}</p>
            </div>
            <span class="text-2xl">{{ stat.icon }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 class="font-bold text-gray-800">Pengajuan Terbaru</h3>
              <router-link to="/riwayat" class="text-xs text-indigo-600 font-bold hover:underline">Lihat Semua</router-link>
            </div>
            <table class="w-full text-sm">
              <tbody class="divide-y divide-gray-100">
                <tr v-for="item in pengajuanTerakhir" :key="item.id" class="hover:bg-gray-50 transition">
                  <td class="px-6 py-4 font-bold text-gray-700">{{ item.id }}</td>
                  <td class="px-6 py-4 text-gray-600">{{ item.item }}</td>
                  <td class="px-6 py-4 text-gray-400 text-xs">{{ item.tgl }}</td>
                  <td class="px-6 py-4 text-right">
                    <span :class="getStatusColor(item.status)" class="px-3 py-1 rounded-lg text-[10px] font-bold">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div class="relative z-10">
              <h3 class="font-bold text-lg mb-2">Butuh Barang Baru?</h3>
              <p class="text-indigo-200 text-sm mb-6">Ajukan segera permintaan barang untuk kebutuhan praktikum atau kantor jurusan.</p>
              <router-link to="/pengajuan" class="bg-white text-indigo-900 px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-50 transition block text-center">
                Mulai Pengajuan
              </router-link>
            </div>
            <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-800 rounded-full opacity-50"></div>
          </div>
          
          <div class="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 class="font-bold text-gray-800 mb-4 text-sm">Catatan Admin Sarpras</h3>
            <div class="space-y-4">
              <div class="flex gap-3">
                <div class="w-2 h-2 bg-yellow-400 rounded-full mt-1.5 shrink-0"></div>
                <p class="text-xs text-gray-500 italic">"Pengadaan barang elektronik sedang antre, mohon bersabar."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>