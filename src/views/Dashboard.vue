<template>
  <div class="flex min-h-screen bg-gray-100 font-sans text-left relative">
    <Sidebar />

    <main class="flex-1 p-8">
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 capitalize">Halo, {{ namaUser }} ({{ roleUser }})! 👋</h1>
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
            
            <div class="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 class="font-bold text-gray-800">Daftar Pengajuan</h3>
              
              <div class="flex bg-gray-100 p-1 rounded-xl text-xs font-bold text-gray-500">
                <button 
                  v-for="tab in ['Semua', 'Menunggu', 'Disetujui', 'Ditolak']" 
                  :key="tab"
                  @click="tabAktif = tab"
                  class="px-3 py-1.5 rounded-lg transition"
                  :class="tabAktif === tab ? 'bg-white text-indigo-900 shadow-sm' : 'hover:text-gray-800'"
                >
                  {{ tab }}
                </button>
              </div>
            </div>

            <table class="w-full text-sm">
              <tbody class="divide-y divide-gray-100">
                <tr 
                  v-for="item in pengajuanTersaring" 
                  :key="item.id" 
                  @click="bukaDetail(item)"
                  class="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td class="px-6 py-4 font-bold text-gray-700">{{ item.id }}</td>
                  <td class="px-6 py-4 text-gray-600">{{ item.item }}</td>
                  <td class="px-6 py-4 text-gray-400 text-xs">{{ item.tgl }}</td>
                  
                  <td class="px-6 py-4 text-right">
                    <div class="inline-flex flex-col items-end">
                      <span :class="getStatusColor(item.status)" class="px-3 py-1 rounded-lg text-[10px] font-bold block">
                        {{ item.status }}
                      </span>
                      
                      <span v-if="item.status === 'Menunggu' || item.status === 'Ditolak'" class="text-[10px] text-gray-400 font-medium mt-1">
                        oleh Pihak {{ item.posisi_pihak }}
                      </span>
                    </div>
                  </td>
                </tr>
                
                <tr v-if="pengajuanTersaring.length === 0">
                  <td colspan="4" class="px-6 py-10 text-center text-gray-400 text-xs italic">
                    Tidak ada data pengajuan dengan status "{{ tabAktif }}".
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="lg:col-span-1 space-y-6">
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
          
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
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

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative transition-all">
        
        <div class="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
          <div>
            <span class="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
              {{ isEditing ? 'Mode Revisi Pengajuan' : 'Detail Pengajuan' }}
            </span>
            <h2 class="text-xl font-bold text-gray-800 mt-2">
              {{ selectedPengajuan.id }} <span class="text-gray-300 font-light">|</span> {{ selectedPengajuan.item }}
            </h2>
          </div>
          <span :class="getStatusColor(selectedPengajuan.status)" class="px-3 py-1 rounded-lg text-xs font-extrabold">
            {{ selectedSelectedPengajuan ? selectedPengajuan.status : selectedPengajuan.status }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span class="text-[10px] uppercase font-black text-gray-400 block tracking-wider mb-1">Posisi Berkas / Catatan:</span>
            <p class="font-bold text-gray-800 text-sm">
              {{ selectedPengajuan.status === 'Disetujui' ? 'Selesai (Arsip Sekolah)' : 'Pihak ' + selectedPengajuan.posisi_pihak }}
            </p>
            <p class="text-xs text-gray-500 mt-2 italic leading-relaxed border-t border-gray-200/60 pt-2">
              <span v-if="selectedPengajuan.status === 'Menunggu'">
                <span v-if="selectedPengajuan.posisi_pihak === 'Sarpras'">🔍 Sedang diverifikasi internal oleh pihak Sarpras.</span>
                <span v-else-if="selectedPengajuan.posisi_pihak === 'Keuangan'">💰 Sedang dalam proses pengecekan anggaran dana sekolah.</span>
                <span v-else-if="selectedPengajuan.posisi_pihak === 'Kepala Sekolah'">📋 Sedang menunggu keputusan persetujuan Kepala Sekolah.</span>
              </span>
              <span v-else-if="selectedPengajuan.status === 'Ditolak'" class="text-red-600 font-medium">
                ❌ Alasan Penolakan ({{ selectedPengajuan.posisi_pihak }}): "{{ selectedPengajuan.catatan_opsional }}"
              </span>
              <span v-else class="text-green-600 font-medium">
                🎉 Pengajuan sukses disetujui penuh oleh instansi sekolah.
              </span>
            </p>
          </div>

          <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col">
            <span class="text-[10px] uppercase font-black text-gray-400 block tracking-wider mb-1">Spesifikasi Detail:</span>
            <textarea v-if="isEditing" v-model="formEdit.spesifikasi" class="w-full flex-1 p-2 border rounded-lg text-xs bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none" rows="3"></textarea>
            <p v-else class="text-xs text-gray-700 font-medium bg-white p-2.5 rounded-lg border border-gray-200/60 flex-1">
              {{ selectedPengajuan.spesifikasi }}
            </p>
          </div>
        </div>

        <div class="border-t border-gray-100 pt-4 mb-6">
          <span class="text-[10px] uppercase font-black text-gray-400 block tracking-wider mb-2">Rincian Anggaran:</span>
          <div class="space-y-2">
            <div class="flex justify-between text-xs text-gray-600">
              <span>Harga Satuan</span>
              <span class="font-semibold text-gray-800">{{ formatRupiah(selectedPengajuan.harga_satuan) }}</span>
            </div>
            <div class="flex justify-between items-center text-xs text-gray-600 border-b border-gray-100 pb-2">
              <span>Jumlah Volume</span>
              <div v-if="isEditing" class="flex items-center gap-1.5">
                <input type="number" v-model.number="formEdit.jumlah" min="1" class="w-16 p-1 border rounded bg-white font-bold text-center text-indigo-950 focus:outline-none" />
                <span class="font-bold text-gray-500">Unit</span>
              </div>
              <span v-else class="font-extrabold text-indigo-950 bg-indigo-50 px-2 py-0.5 rounded">
                {{ selectedPengajuan.jumlah }} Unit
              </span>
            </div>
            <div class="flex justify-between items-center bg-indigo-900 text-white p-3.5 rounded-xl mt-2">
              <span class="text-xs font-bold uppercase tracking-wider">Total Keseluruhan</span>
              <span class="text-base font-black">
                {{ isEditing ? formatRupiah(formEdit.jumlah * selectedPengajuan.harga_satuan) : formatRupiah(selectedPengajuan.jumlah * selectedPengajuan.harga_satuan) }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center border-t border-gray-100 pt-4">
          <div v-if="isEditing" class="flex justify-end w-full gap-2">
            <button @click="isEditing = false" class="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded-xl text-xs transition">Batal Edit</button>
            <button @click="simpanRevisiLokal" class="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2 rounded-xl text-xs transition shadow-sm">💾 Simpan Perubahan</button>
          </div>
          <div v-else class="w-full">
            <div v-if="selectedPengajuan.status === 'Ditolak'" class="flex justify-between w-full gap-3">
              <div class="flex gap-2">
                <button @click="aktifkanModeRevisi" class="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1">✏️ Revisi Barang</button>
                <button @click="batalkanPengajuan(selectedPengajuan.id)" class="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2 rounded-xl text-xs transition border border-red-200/60 flex items-center gap-1">🗑️ Batalkan Pengajuan</button>
              </div>
              <button @click="kembaliKeDashboard" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs transition">Kembali ke Dashboard</button>
            </div>
            <div v-else class="flex justify-end w-full">
              <button @click="kembaliKeDashboard" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-5 py-2.5 rounded-xl text-xs transition">← Kembali ke Dashboard</button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref, computed, onMounted } from 'vue'

// --- TAMBAHAN BARU: State Penampung Data User dari Login ---
const namaUser = ref('Admin')
const roleUser = ref('Jurusan')

onMounted(() => {
  // Ambil data nama & role yang diset oleh AuthController kemarin
  const storedName = localStorage.getItem('user_name')
  const storedRole = localStorage.getItem('user_role')
  
  if (storedName) namaUser.value = storedName
  if (storedRole) roleUser.value = storedRole
})
// -----------------------------------------------------------

// Data ringkasan (Statistik) - Tetap Utuh
const stats = ref([
  { label: 'Total Pengajuan', value: 12, color: 'border-indigo-500', icon: '📁' },
  { label: 'Sedang Diproses', value: 3, color: 'border-yellow-500', icon: '⏳' },
  { label: 'Selesai/Disetujui', value: 9, color: 'border-green-500', icon: '✅' },
])

// Data Kamus Data Lokal Pengajuan - Tetap Utuh
const daftarPengajuan = ref([
  { 
    id: 'REQ-003', 
    item: 'Mouse Logitech G102', 
    tgl: '13 Mei', 
    status: 'Ditolak',
    posisi_pihak: 'Keuangan',
    catatan_opsional: 'Dana tidak cukup, harap kurangi volumenya atau batalkan pengajuan.',
    jumlah: 1, 
    harga_satuan: 250000, 
    spesifikasi: 'Kombinasi Wireless MK220' 
  },
  { 
    id: 'REQ-002', 
    item: 'Monitor LED 24 Inch', 
    tgl: '12 Mei', 
    status: 'Menunggu',
    posisi_pihak: 'Keuangan',
    catatan_opsional: 'Sedang dalam proses pengecekan alokasi anggaran dana sekolah.',
    jumlah: 1, 
    harga_satuan: 1500000, 
    spesifikasi: 'Full HD 1080p, IPS Panel' 
  },
  { 
    id: 'REQ-001', 
    item: 'PC Rakitan Core i7', 
    tgl: '10 Mei', 
    status: 'Disetujui',
    posisi_pihak: 'Selesai',
    catatan_opsional: 'Pengajuan berhasil disetujui! Silakan berkoordinasi dengan Sarpras.',
    jumlah: 1, 
    harga_satuan: 7500000, 
    spesifikasi: 'Core i5, RAM 16GB, SSD 512GB' 
  },
])

const tabAktif = ref('Semua')

const pengajuanTersaring = computed(() => {
  if (tabAktif.value === 'Semua') {
    return daftarPengajuan.value
  }
  return daftarPengajuan.value.filter(item => item.status === tabAktif.value)
})

const isModalOpen = ref(false)
const selectedPengajuan = ref(null)
const isEditing = ref(false)
const formEdit = ref({ spesifikasi: '', jumlah: 1 })

const bukaDetail = (item) => {
  selectedPengajuan.value = item
  isModalOpen.value = true
  isEditing.value = false
}

const kembaliKeDashboard = () => {
  isModalOpen.value = false
  selectedPengajuan.value = null
  isEditing.value = false
}

const aktifkanModeRevisi = () => {
  formEdit.value.spesifikasi = selectedPengajuan.value.spesifikasi
  formEdit.value.jumlah = selectedPengajuan.value.jumlah
  isEditing.value = true
}

const simpanRevisiLokal = () => {
  const index = daftarPengajuan.value.findIndex(p => p.id === selectedPengajuan.value.id)
  if (index !== -1) {
    daftarPengajuan.value[index].spesifikasi = formEdit.value.spesifikasi
    daftarPengajuan.value[index].jumlah = formEdit.value.jumlah
    alert(`Berhasil memperbarui data berkas ${selectedPengajuan.value.id}!`)
  }
  kembaliKeDashboard()
}

const batalkanPengajuan = (id) => {
  if (confirm(`Apakah kamu yakin ingin membatalkan dan menghapus pengajuan ${id} secara permanen?`)) {
    daftarPengajuan.value = daftarPengajuan.value.filter(p => p.id !== id)
    isModalOpen.value = false
    selectedPengajuan.value = null
  }
}

const getStatusColor = (status) => {
  if (status === 'Disetujui') return 'text-green-600 bg-green-50'
  if (status === 'Menunggu') return 'text-yellow-600 bg-yellow-50'
  if (status === 'Ditolak') return 'text-red-600 bg-red-50'
  return 'text-gray-600 bg-gray-50'
}

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka)
}
</script>