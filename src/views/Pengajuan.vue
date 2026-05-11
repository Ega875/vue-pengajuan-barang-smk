<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref } from 'vue'

// Data Dummy untuk Tabel Barang Umum
const barangUmum = ref([
  { id: 1, nama: 'PC Rakitan Core i7', spek: 'RAM 16GB, SSD 512GB', kategori: 'Elektronik' },
  { id: 2, nama: 'Monitor LED 24 Inch', spek: 'Full HD IPS', kategori: 'Elektronik' },
  { id: 3, nama: 'Mouse Logitech G102', spek: 'Wired Gaming Mouse', kategori: 'Aksesoris' },
  { id: 4, nama: 'Keyboard Mechanical', spek: 'Blue Switch', kategori: 'Aksesoris' },
  { id: 5, nama: 'Printer Epson L3210', spek: 'Ink Tank System', kategori: 'Peralatan' },
  { id: 6, nama: 'Proyektor Epson', spek: '3300 Lumens', kategori: 'Elektronik' },
  { id: 7, nama: 'Kabel LAN Cat6', spek: 'Roll (300 Meter)', kategori: 'Jaringan' },
  { id: 8, nama: 'Switch Hub 24 Port', spek: 'Gigabit Managed', kategori: 'Jaringan' },
  { id: 9, nama: 'Webcam Logi C922', spek: 'Full HD 1080p', kategori: 'Aksesoris' },
  { id: 10, nama: 'Router Mikrotik', spek: 'RB4011iGS+RM', kategori: 'Jaringan' },
])

// State untuk Form Manual
const formManual = ref({
  namaBarang: '',
  jumlah: 1,
  alasan: ''
})

const submitPengajuan = () => {
  alert(`Mengajukan: ${formManual.value.namaBarang}`);
  // Nanti di sini tempat kodingan Axios untuk kirim ke API
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100 font-sans text-left">
    <Sidebar />

    <main class="flex-1 p-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Pengajuan Barang Baru</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 bg-indigo-50 border-b border-indigo-100">
              <h2 class="font-bold text-indigo-900 text-left">Daftar Barang Umum Jurusan</h2>
              <p class="text-xs text-indigo-600 text-left">Klik "Pilih" untuk mengajukan barang dari list ini.</p>
            </div>
            <table class="w-full text-sm text-left">
              <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th class="px-4 py-3">Nama Barang</th>
                  <th class="px-4 py-3">Spesifikasi</th>
                  <th class="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="item in barangUmum" :key="item.id" class="hover:bg-gray-50 transition">
                  <td class="px-4 py-3 font-medium text-gray-700">{{ item.nama }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ item.spek }}</td>
                  <td class="px-4 py-3 text-left">
                    <button class="text-indigo-600 font-semibold hover:underline">Pilih</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="bg-white p-6 rounded-xl shadow-md sticky top-8">
            <h2 class="font-bold text-gray-800 mb-4 text-left border-b pb-2">Form Manual</h2>
            <form @submit.prevent="submitPengajuan" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1 text-left">Nama Barang</label>
                <input v-model="formManual.namaBarang" type="text" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Misal: AC Sharp 1 PK">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1 text-left">Jumlah</label>
                <input v-model="formManual.jumlah" type="number" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1 text-left">Alasan/Keperluan</label>
                <textarea v-model="formManual.alasan" rows="3" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Untuk kebutuhan Lab 2..."></textarea>
              </div>
              <button type="submit" class="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
                Kirim Pengajuan
              </button>
            </form>
            <p class="mt-4 text-[10px] text-gray-400 italic">
              *Gunakan form ini jika barang tidak tersedia di tabel list umum.
            </p>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>