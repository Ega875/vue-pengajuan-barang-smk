<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref } from 'vue'

// Data dummy riwayat pengajuan
const riwayat = ref([
  { 
    id: 'REQ-001', 
    tanggal: '2024-05-10', 
    item: 'PC Rakitan Core i7', 
    jumlah: 5, 
    status: 'Disetujui',
    catatan: 'Segera diproses bagian pengadaan'
  },
  { 
    id: 'REQ-002', 
    tanggal: '2024-05-12', 
    item: 'Monitor LED 24 Inch', 
    jumlah: 5, 
    status: 'Menunggu',
    catatan: '-'
  },
  { 
    id: 'REQ-003', 
    tanggal: '2024-05-13', 
    item: 'Mouse Logitech G102', 
    jumlah: 10, 
    status: 'Ditolak',
    catatan: 'Stok di gudang pusat masih mencukupi'
  }
])

// Fungsi untuk warna badge status
const getStatusClass = (status) => {
  if (status === 'Disetujui') return 'bg-green-100 text-green-700'
  if (status === 'Menunggu') return 'bg-yellow-100 text-yellow-700'
  if (status === 'Ditolak') return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-700'
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100 font-sans text-left">
    <Sidebar />

    <main class="flex-1 p-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Riwayat Pengajuan</h1>
        <p class="text-gray-500 text-sm">Pantau status pengajuan barang jurusan kamu di sini.</p>
      </div>

      <div class="mb-4 flex gap-2">
        <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-md">Semua</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg text-xs font-bold border border-gray-200 hover:bg-gray-50">Menunggu</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg text-xs font-bold border border-gray-200 hover:bg-gray-50">Selesai</button>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-widest font-bold">
            <tr>
              <th class="px-6 py-4">ID / Tanggal</th>
              <th class="px-6 py-4">Barang</th>
              <th class="px-6 py-4">Jumlah</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Catatan Sarpras</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="data in riwayat" :key="data.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">
                <p class="font-bold text-indigo-600">{{ data.id }}</p>
                <p class="text-[11px] text-gray-400">{{ data.tanggal }}</p>
              </td>
              <td class="px-6 py-4 font-semibold text-gray-700">{{ data.item }}</td>
              <td class="px-6 py-4 text-gray-600">{{ data.jumlah }} Unit</td>
              <td class="px-6 py-4">
                <span :class="getStatusClass(data.status)" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                  {{ data.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-xs text-gray-500 italic">
                {{ data.catatan }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>