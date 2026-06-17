<template>
  <div class="flex min-h-screen bg-gray-50 font-sans text-left relative">
    <Sidebar />

    <main class="flex-1 p-8">
      <header class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-black text-gray-800 flex items-center gap-2">
            Persetujuan Akhir Pengadaan
          </h1>
          <p class="text-gray-500 text-sm mt-1">Panel eksekutif Kepala Sekolah untuk memantau serapan dana dan mengambil keputusan mutlak.</p>
        </div>
      </header>

      <!-- FITUR 2: EXECUTIVE SUMMARY (SERAPAN ANGGARAN GLOBAL) -->
      <div class="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl shadow-xl border border-slate-800 p-8 mb-8 text-white relative overflow-hidden">
        <!-- Dekorasi Latar -->
        <div class="absolute -right-10 -top-10 opacity-10 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-64 h-64">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
          </svg>
        </div>

        <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="w-full md:w-1/3">
            <p class="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Status Keuangan Sekolah</p>
            <h2 class="text-3xl font-black text-white mb-2">Serapan Dana</h2>
            <p class="text-sm text-indigo-200/80 leading-relaxed">
              Memantau total pagu anggaran seluruh program keahlian dibandingkan dengan nilai pengajuan yang telah Anda setujui.
            </p>
          </div>

          <div class="w-full md:w-2/3 bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div class="flex justify-between items-end mb-3">
              <div>
                <p class="text-xs text-indigo-300 font-bold mb-1">Total Terpakai (Disetujui)</p>
                <p class="text-2xl font-black text-emerald-400">{{ formatRupiah(totalDanaTerpakaiGlobal) }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-indigo-300 font-bold mb-1">Total Pagu Sekolah</p>
                <p class="text-lg font-bold text-white">{{ formatRupiah(totalPaguGlobal) }}</p>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="w-full bg-slate-800 rounded-full h-4 mb-2 shadow-inner overflow-hidden border border-slate-700">
              <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-4 rounded-full transition-all duration-1000 ease-out" :style="{ width: persentaseSerapan + '%' }"></div>
            </div>
            <div class="flex justify-between text-[10px] font-bold text-indigo-300 tracking-wider">
              <span>{{ persentaseSerapan }}% TERSERAP</span>
              <span>SISA: {{ formatRupiah(totalPaguGlobal - totalDanaTerpakaiGlobal) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- FITUR 1: PANEL KETUK PALU -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-5 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-gray-50/50">
          <h3 class="font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-indigo-600"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg>
            Meja Persetujuan Dokumen
          </h3>
          
          <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto relative">
            <!-- FITUR BARU: DROPDOWN FILTER JURUSAN -->
            <div class="relative w-full sm:w-auto">
              <div 
                @click="isFilterDropdownOpen = !isFilterDropdownOpen"
                class="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer shadow-sm flex items-center justify-between gap-3 min-w-[160px] transition hover:border-indigo-300 select-none h-full"
                :class="{'ring-2 ring-indigo-500/20 border-indigo-500': isFilterDropdownOpen}"
              >
                <span>{{ filterJurusan === 'Semua Jurusan' ? 'Semua Jurusan' : 'Jurusan ' + filterJurusan }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-gray-400 transition-transform duration-300" :class="{'rotate-180 text-indigo-600': isFilterDropdownOpen}">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              
              <div v-if="isFilterDropdownOpen" @click="isFilterDropdownOpen = false" class="fixed inset-0 z-[5]"></div>
              
              <div v-if="isFilterDropdownOpen" class="absolute right-0 sm:left-0 sm:right-auto z-10 mt-1.5 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-y-auto max-h-48 custom-scrollbar py-1.5">
                <div 
                  v-for="jurusan in listJurusanTersedia" 
                  :key="jurusan"
                  @click="pilihFilterJurusan(jurusan)"
                  class="px-4 py-2 text-xs text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors flex items-center justify-between font-bold"
                >
                  {{ jurusan === 'Semua Jurusan' ? 'Semua Jurusan' : 'Jurusan ' + jurusan }}
                  <svg v-if="filterJurusan === jurusan" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-indigo-600">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- TAB FILTER KEPSEK -->
            <div class="flex flex-wrap bg-white p-1 rounded-xl text-xs font-bold text-gray-500 border border-gray-200 shadow-sm w-full sm:w-auto">
              <button 
                v-for="tab in ['Menunggu Keputusan', 'Riwayat Disetujui', 'Riwayat Ditolak']" 
                :key="tab" @click="tabAktif = tab" class="px-4 py-2 rounded-lg transition whitespace-nowrap flex-1 sm:flex-none text-center"
                :class="tabAktif === tab ? 'bg-indigo-600 text-white shadow-md font-black' : 'hover:text-gray-800 hover:bg-gray-50'"
              >
                {{ tab }}
                <span v-if="tab === 'Menunggu Keputusan' && jumlahPending > 0" class="ml-1 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[9px]">{{ jumlahPending }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm table-fixed min-w-[800px]">
            <thead>
              <tr class="bg-white text-gray-400 text-xs uppercase font-bold text-left border-b border-gray-100">
                <th class="px-6 py-4 w-[35%]">Kode & Rangkuman Item</th>
                <th class="px-6 py-4 w-[15%]">Pengusul</th>
                <th class="px-6 py-4 w-[20%] text-right">Nilai Anggaran</th>
                <th class="px-6 py-4 text-center w-[15%]">Status</th>
                <th class="px-6 py-4 text-right w-[15%]">Tindakan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in pengajuanTersaring" :key="item.id" class="hover:bg-indigo-50/30 transition">
                <td class="px-6 py-4">
                  <div class="font-bold text-indigo-900 truncate">{{ item.id }}</div>
                  <div class="text-xs text-gray-500 font-semibold mt-0.5 truncate" :title="item.item">{{ item.item }}</div>
                </td>
                <td class="px-6 py-4 font-bold text-xs text-gray-700 truncate">
                  Jurusan {{ item.asal_jurusan }}
                </td>
                <td class="px-6 py-4 text-right font-black text-emerald-600">
                  {{ formatRupiah(hitungTotalSemuaBarang(item.list_barang)) }}
                </td>
                <td class="px-6 py-4 text-center">
                  <span :class="getStatusBadgeClass(item.status)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border inline-block whitespace-nowrap">
                    {{ formatStatusTeks(item.status, item.catatan_opsional) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button @click="bukaDetail(item)" class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm border border-indigo-700">
                    Lihat & Putuskan
                  </button>
                </td>
              </tr>
              
              <tr v-if="pengajuanTersaring.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-400 text-sm">
                  <div class="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-300 mb-3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>
                    <span>Tidak ada dokumen di kategori ini. Meja Anda bersih.</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- MODAL DETAIL KEPSEK -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white w-full max-w-4xl rounded-3xl shadow-2xl p-6 relative border border-gray-100 overflow-hidden">
        
        <div class="flex justify-between items-start border-b border-gray-100 pb-5 mb-5 bg-slate-900 -mx-6 px-6 -mt-6 pt-6 text-white rounded-t-3xl">
          <div>
            <span class="text-[10px] font-black text-indigo-300 bg-indigo-900/50 border border-indigo-400/30 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Tinjauan Eksekutif Pengadaan
            </span>
            <h2 class="text-2xl font-black mt-2 tracking-wide flex items-center gap-2">
              {{ selectedPengajuan.id }}
            </h2>
            <p class="text-xs text-gray-400 mt-1 font-medium">Asal Pengusul: Program Keahlian {{ selectedPengajuan.asal_jurusan }} | Masuk: {{ selectedPengajuan.tgl }}</p>
          </div>
          
          <div class="flex items-center gap-3">
            <button @click="isModalOpen = false" class="text-gray-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition" title="Tutup Modal">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div v-if="selectedPengajuan.status === 'ditolak'" class="bg-red-50 text-red-700 p-4 rounded-2xl text-xs font-semibold mb-5 border border-red-100 flex flex-col gap-1">
          <span class="uppercase text-[9px] tracking-widest font-black text-red-500">Catatan Penolakan Anda:</span>
          <p class="italic bg-white p-3 rounded-xl border border-red-100 mt-1 text-sm">" {{ selectedPengajuan.catatan_opsional }} "</p>
        </div>

        <!-- Rincian Barang -->
        <div class="bg-gray-50 rounded-2xl border border-gray-200 mb-6 overflow-hidden">
          <div class="px-5 py-3 border-b border-gray-200 bg-gray-100 flex justify-between items-center">
            <span class="text-[10px] uppercase font-black text-gray-500 tracking-wider">Rincian Komoditas</span>
            <span class="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">Telah Diverifikasi Sarpras & Keuangan</span>
          </div>
          
          <div class="overflow-x-auto overflow-y-auto max-h-60 custom-scrollbar">
            <table class="w-full text-left text-xs relative table-fixed">
              <thead class="bg-white text-gray-400 font-bold uppercase text-[9px] tracking-wider border-b sticky top-0 z-10 shadow-sm">
                <tr>
                  <th class="px-5 py-3 w-[50%]">Nama & Spesifikasi Teknis</th>
                  <th class="px-5 py-3 text-center w-[10%]">Kuantitas</th>
                  <th class="px-5 py-3 text-right w-[20%]">Harga Satuan</th>
                  <th class="px-5 py-3 text-right w-[20%]">Subtotal</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 font-medium text-gray-700 bg-white">
                <tr v-for="subItem in selectedPengajuan.list_barang" :key="subItem.id" class="hover:bg-gray-50/50">
                  <td class="px-5 py-3">
                    <div class="font-bold text-gray-900 text-sm break-words">{{ subItem.nama_barang }}</div>
                    <div class="text-[11px] text-gray-500 mt-1 italic break-words">{{ subItem.keterangan }}</div>
                  </td>
                  <td class="px-5 py-3 text-center font-bold text-gray-900">{{ subItem.jumlah }} Unit</td>
                  <td class="px-5 py-3 text-right text-gray-500">{{ formatRupiah(subItem.harga_estimasi) }}</td>
                  <td class="px-5 py-3 text-right font-black text-indigo-900">{{ formatRupiah(subItem.jumlah * subItem.harga_estimasi) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="flex justify-between items-center bg-emerald-50 p-5 border-t border-emerald-100">
            <div>
              <span class="font-black uppercase text-[10px] tracking-widest text-emerald-700 block mb-0.5">Total Pengajuan Anggaran</span>
              <span class="text-xs font-medium text-emerald-600">Dana akan memotong pagu Jurusan {{ selectedPengajuan.asal_jurusan }}</span>
            </div>
            <span class="font-black text-2xl text-emerald-700">
              {{ formatRupiah(hitungTotalSemuaBarang(selectedPengajuan.list_barang)) }}
            </span>
          </div>
        </div>

        <div class="flex items-center pt-2 justify-end gap-3">
          <template v-if="selectedPengajuan.status === 'pending_kepsek'">
            <button @click="keputusanVerifikator('ditolak')" class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold px-6 py-3 rounded-xl text-xs transition">
              Tolak & Kembalikan Dokumen
            </button>
            <button @click="keputusanVerifikator('disetujui')" class="bg-slate-900 hover:bg-black text-white font-black px-8 py-3 rounded-xl text-sm transition shadow-xl shadow-slate-900/20 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z" clip-rule="evenodd" /></svg>
              SETUJUI SEPENUHNYA
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- MODAL CATATAN PENOLAKAN KEPSEK -->
    <div v-if="isCatatanModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 relative border border-gray-100">
        <div class="mb-5">
          <div class="flex items-center gap-3 mb-2">
            <div class="bg-red-100 text-red-600 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </div>
            <h3 class="text-xl font-black text-gray-900">Catatan Keputusan</h3>
          </div>
          <p class="text-xs text-gray-500 leading-relaxed ml-10">Tinggalkan instruksi disposisi mengapa dokumen ini ditolak/dikembalikan.</p>
        </div>
        
        <textarea v-model="catatanInput" @input="errorCatatan = ''" rows="4" :class="['w-full p-4 bg-gray-50 border rounded-2xl text-sm focus:outline-none focus:ring-2 transition', errorCatatan ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500 bg-red-50/30' : 'border-gray-200 focus:ring-indigo-500/30 focus:border-indigo-500']" placeholder="Contoh: Tunda pengadaan ini, prioritaskan pembelian tinta printer..."></textarea>
        
        <p v-if="errorCatatan" class="text-red-500 text-xs mt-2 flex items-center gap-1 font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" /></svg>
          {{ errorCatatan }}
        </p>

        <div class="flex items-center justify-end gap-3 mt-6">
          <button @click="isCatatanModalOpen = false; errorCatatan = ''" class="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition">Batal</button>
          <button @click="submitCatatan" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition shadow-lg shadow-red-600/30">Kirim Penolakan</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const tabAktif = ref('Menunggu Keputusan')

// STATE BARU UNTUK FILTER JURUSAN
const filterJurusan = ref('Semua Jurusan') 
const isFilterDropdownOpen = ref(false)

const isModalOpen = ref(false)
const selectedPengajuan = ref({})
const daftarPengajuan = ref([])

const isCatatanModalOpen = ref(false)
const catatanInput = ref('')
const pendingStatus = ref('')
const errorCatatan = ref('')

const totalPaguGlobal = ref(0)
const totalDanaTerpakaiGlobal = ref(0)

const persentaseSerapan = computed(() => {
  if (totalPaguGlobal.value === 0) return 0
  const persen = (totalDanaTerpakaiGlobal.value / totalPaguGlobal.value) * 100
  return Math.min(Math.round(persen), 100)
})

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get('http://localhost:8889/api/pengajuan', {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.data.success) {
      const rawData = response.data.data
      const totalData = rawData.length 

      daftarPengajuan.value = rawData.map((item, index) => {
        let namaPembuatDB = item.nama_pembuat || 'PPLG'
        let namaUpper = namaPembuatDB.toUpperCase()
        
        let inisial = 'JUR' 
        const kata = namaUpper.split(' ')

        if (namaUpper.includes('PPLG') || namaUpper.includes('PERANGKAT LUNAK')) inisial = 'PPLG'
        else if (namaUpper.includes('TJKT') || namaUpper.includes('JARINGAN')) inisial = 'TJKT'
        else if (namaUpper.includes('DPIB') || namaUpper.includes('BANGUNAN')) inisial = 'DPIB'
        else if (namaUpper.includes('BROADCASTING') || namaUpper.includes('BC')) inisial = 'BC'
        else if (namaUpper.includes('ELEKTRONIKA') || kata.includes('TE')) inisial = 'TE'
        else if (namaUpper.includes('KETENAGALISTRIKAN') || namaUpper.includes('TLK')) inisial = 'TLK'
        else if (namaUpper.includes('MESIN') || namaUpper.includes('MSN')) inisial = 'MSN'
        else if (namaUpper.includes('OTOMOTIF') || namaUpper.includes('OTM')) inisial = 'OTM'
        
        const urutanDinamis = totalData - index
        const formatAngka = String(urutanDinamis).padStart(3, '0')
        const kodeUnik = `REQ-${inisial}-${formatAngka}`
        
        const rawList = item.detail_pengajuan || []
        const listBarangSteril = rawList.map(det => ({
          ...det,
          nama_barang: det.nama_barang_riil || 'Item Pengadaan',
          keterangan: det.spesifikasi_riil || 'Tidak ada spesifikasi.',
          harga_estimasi: parseInt(det.harga_riil) || 0,
          jumlah: parseInt(det.jumlah) || 1
        }))

        const namaBarangUtama = listBarangSteril.length > 0 ? listBarangSteril[0].nama_barang : 'Berkas Pengadaan'
        const teksJudulTabelLuar = listBarangSteril.length > 1 ? `${namaBarangUtama} (+${listBarangSteril.length - 1} Barang)` : namaBarangUtama

        let asalInstansiBersih = namaPembuatDB
        if (asalInstansiBersih.toLowerCase().startsWith('jurusan ')) {
          asalInstansiBersih = asalInstansiBersih.substring(8)
        }

        return {
          id_asli: item.id, 
          id: kodeUnik,     
          asal_jurusan: asalInstansiBersih, 
          item: teksJudulTabelLuar, 
          tgl: new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          status: item.status, 
          catatan_opsional: item.catatan_revisi || 'Tidak ada catatan.',
          list_barang: listBarangSteril
        }
      })
      
      hitungPaguDanSerapan()
    }
  } catch (error) {
    console.error('Gagal memuat data:', error)
  }
}

const hitungPaguDanSerapan = () => {
  const dataPagu = localStorage.getItem('data_pagu_jurusan')
  totalPaguGlobal.value = 0
  if (dataPagu) {
    const parsed = JSON.parse(dataPagu)
    totalPaguGlobal.value = Object.values(parsed).reduce((sum, current) => sum + (Number(current) || 0), 0)
  }

  totalDanaTerpakaiGlobal.value = 0
  const pengajuanDisetujui = daftarPengajuan.value.filter(p => p.status === 'disetujui')
  pengajuanDisetujui.forEach(p => {
    totalDanaTerpakaiGlobal.value += hitungTotalSemuaBarang(p.list_barang)
  })
}

const hitungTotalSemuaBarang = (list) => {
  if (!list || list.length === 0) return 0
  return list.reduce((total, barang) => total + (Number(barang.jumlah) * Number(barang.harga_estimasi)), 0)
}

// LOGIKA BARU: DAFTAR JURUSAN DINAMIS UNTUK DROPDOWN
const listJurusanTersedia = computed(() => {
  // Hanya ambil jurusan dari dokumen yang masuk radar Kepsek
  const pengajuanKepsek = daftarPengajuan.value.filter(p => 
    p.status === 'pending_kepsek' || 
    p.status === 'disetujui' || 
    (p.status === 'ditolak' && String(p.catatan_opsional).toUpperCase().includes('KEPSEK'))
  )
  const jurusanSet = new Set(pengajuanKepsek.map(p => p.asal_jurusan))
  return ['Semua Jurusan', ...Array.from(jurusanSet).sort()]
})

const pilihFilterJurusan = (jurusan) => {
  filterJurusan.value = jurusan
  isFilterDropdownOpen.value = false
}

// PERBAIKAN LOGIKA FILTER (GABUNGAN TAB STATUS & DROPDOWN JURUSAN)
const pengajuanTersaring = computed(() => {
  // 1. Filter level dasar: Hanya yang berhak dilihat Kepsek
  let hasilFilter = daftarPengajuan.value.filter(p => 
    p.status === 'pending_kepsek' || 
    p.status === 'disetujui' || 
    (p.status === 'ditolak' && String(p.catatan_opsional).toUpperCase().includes('KEPSEK'))
  )

  // 2. Terapkan Filter Jurusan jika bukan "Semua Jurusan"
  if (filterJurusan.value !== 'Semua Jurusan') {
    hasilFilter = hasilFilter.filter(p => p.asal_jurusan === filterJurusan.value)
  }

  // 3. Terapkan Filter Tab Status Aktif
  if (tabAktif.value === 'Menunggu Keputusan') return hasilFilter.filter(p => p.status === 'pending_kepsek')
  if (tabAktif.value === 'Riwayat Disetujui') return hasilFilter.filter(p => p.status === 'disetujui')
  if (tabAktif.value === 'Riwayat Ditolak') return hasilFilter.filter(p => p.status === 'ditolak')

  return hasilFilter
})

const jumlahPending = computed(() => {
  // Badge merah angka pending tidak perlu terpengaruh filter jurusan agar Kepsek tahu total tunggakan kerjanya
  return daftarPengajuan.value.filter(p => p.status === 'pending_kepsek').length
})

const bukaDetail = (item) => {
  selectedPengajuan.value = JSON.parse(JSON.stringify(item))
  isModalOpen.value = true
}

const keputusanVerifikator = (statusBaru) => {
  if (statusBaru === 'ditolak') {
    pendingStatus.value = statusBaru
    catatanInput.value = '' 
    errorCatatan.value = '' 
    isCatatanModalOpen.value = true
    return 
  }
  
  if(confirm('TINDAKAN MUTLAK: Anda yakin ingin menyetujui pengadaan ini? Dana akan otomatis terpotong dari pagu jurusan.')) {
    eksekusiStatusAPI(statusBaru, '')
  }
}

const submitCatatan = () => {
  if (!catatanInput.value.trim()) {
    errorCatatan.value = 'Instruksi penolakan wajib diisi untuk dibaca Jurusan!'
    return
  }
  errorCatatan.value = '' 
  eksekusiStatusAPI(pendingStatus.value, catatanInput.value)
}

const eksekusiStatusAPI = async (status_final, catatan_final) => {
  try {
    const token = localStorage.getItem('auth_token')
    
    let catatanKirim = catatan_final
    if (status_final === 'ditolak') {
      catatanKirim = `(KEPSEK) ${catatan_final}`
    }

    await axios.post(`http://localhost:8889/api/pengajuan-status/${selectedPengajuan.value.id_asli}`, {
      status_sesudah: status_final,
      catatan: catatanKirim
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    isCatatanModalOpen.value = false
    isModalOpen.value = false
    fetchDashboardData() 
  } catch (error) {
    console.error('Gagal memperbarui status:', error)
    alert('GAGAL KIRIM KEPUTUSAN!')
  }
}

const getStatusBadgeClass = (status) => {
  if (status === 'disetujui') return 'bg-emerald-100 text-emerald-700 border-emerald-200'
  if (status === 'ditolak') return 'bg-red-50 text-red-700 border-red-200'
  if (status === 'pending_kepsek') return 'bg-amber-100 text-amber-700 border-amber-200'
  return 'bg-gray-50 text-gray-700 border-gray-200'
}

const formatStatusTeks = (status, catatan = '') => {
  if (status === 'disetujui') return 'Disetujui Penuh'
  if (status === 'pending_kepsek') return 'Menunggu Anda'
  if (status === 'ditolak') return 'Ditolak Kepsek'
  return status
}

const formatRupiah = (angka) => 'Rp ' + Number(angka).toLocaleString('id-ID')

onMounted(() => {
  fetchDashboardData()
})
</script>