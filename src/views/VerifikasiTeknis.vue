<template>
  <div class="flex min-h-screen bg-gray-100 font-sans text-left relative">
    <Sidebar />

    <main class="flex-1 p-8">
      <header class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Verifikasi Teknis Pengajuan Barang
          </h1>
          <p class="text-gray-500 text-sm mt-1">Periksa kecocokan data fisik, kelayakan, dan kesesuaian anggaran pengadaan sekolah.</p>
        </div>
        
        <div class="bg-white border border-gray-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
          <span class="text-xs font-bold text-gray-500">Tugas Pengecekan:</span>
          <span class="bg-indigo-100 text-indigo-800 font-black px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider">
            {{ roleUser }}
          </span>
        </div>
      </header>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div class="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 class="font-bold text-gray-800">Antrean Validasi Berkas Berantai</h3>
          
          <div class="flex flex-col sm:flex-row gap-3 relative">
            <div v-if="roleUser !== 'jurusan'" class="relative">
              <div 
                @click="isFilterDropdownOpen = !isFilterDropdownOpen"
                class="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer shadow-sm flex items-center justify-between gap-3 min-w-[160px] transition hover:border-indigo-300 select-none"
                :class="{'ring-2 ring-indigo-500/20 border-indigo-500': isFilterDropdownOpen}"
              >
                <span>{{ filterJurusan === 'Semua Jurusan' ? 'Semua Jurusan' : 'Jurusan ' + filterJurusan }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-gray-400 transition-transform duration-300" :class="{'rotate-180 text-indigo-600': isFilterDropdownOpen}">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              
              <div v-if="isFilterDropdownOpen" @click="isFilterDropdownOpen = false" class="fixed inset-0 z-[5]"></div>
              
              <div v-if="isFilterDropdownOpen" class="absolute right-0 z-10 mt-1.5 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-y-auto max-h-48 custom-scrollbar py-1.5">
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

            <div class="flex bg-gray-100 p-1 rounded-xl text-xs font-bold text-gray-500 border border-gray-200/50">
              <button 
                v-for="tab in ['Semua', 'Menunggu', 'Disetujui', 'Ditolak']" 
                :key="tab" @click="tabAktif = tab" class="px-3 py-1.5 rounded-lg transition"
                :class="tabAktif === tab ? 'bg-white text-indigo-950 shadow-sm font-extrabold' : 'hover:text-gray-800'"
              >
                {{ tab }}
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto rounded-b-2xl overflow-hidden">
          <table class="w-full text-sm table-fixed min-w-[800px]">
            <thead>
              <tr class="bg-gray-50 text-gray-400 text-xs uppercase font-bold text-left border-b border-gray-100">
                <th class="px-6 py-4 w-[35%]">Kode & Item Utama</th>
                <th v-if="roleUser !== 'jurusan'" class="px-6 py-4 w-[20%]">Asal Instansi</th>
                <th class="px-6 py-4 w-[15%]">Tanggal Masuk</th>
                <th class="px-6 py-4 text-center w-[15%]">Status Alur</th>
                <th class="px-6 py-4 text-right w-[15%]">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in pengajuanTersaring" :key="item.id" class="hover:bg-gray-50/50 transition">
                <td class="px-6 py-4">
                  <div class="font-bold text-indigo-600 truncate">{{ item.id }}</div>
                  <div class="text-xs text-gray-600 font-semibold mt-0.5 truncate" :title="item.item">{{ item.item }}</div>
                </td>
                <td v-if="roleUser !== 'jurusan'" class="px-6 py-4 font-bold text-xs text-indigo-950 truncate">
                  Jurusan {{ item.asal_jurusan }}
                </td>
                <td class="px-6 py-4 text-gray-400 text-xs font-medium truncate">{{ item.tgl }}</td>
                <td class="px-6 py-4 text-center">
                  <span :class="getStatusBadgeClass(item.status)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border inline-block whitespace-nowrap">
                    {{ formatStatusTeks(item.status, item.catatan_opsional) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button @click="bukaDetail(item)" class="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm">
                    Lihat Detail
                  </button>
                </td>
              </tr>
              
              <tr v-if="pengajuanTersaring.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-400 text-xs italic">
                  Belum ada antrean validasi dokumen di kategori ini.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-6 relative border border-gray-100 overflow-hidden">
        
        <div class="flex justify-between items-start border-b border-gray-100 pb-4 mb-4 bg-gray-50/50 -mx-6 px-6 -mt-6 pt-6">
          <div>
            <span class="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Detail Kelayakan Nota Pengadaan
            </span>
            <h2 class="text-xl font-black text-gray-900 mt-2 tracking-wide flex items-center gap-2">
              {{ selectedPengajuan.id }}
            </h2>
            <p class="text-xs text-gray-400 mt-1 font-bold">Asal Pengusul: Program Keahlian {{ selectedPengajuan.asal_jurusan }}</p>
          </div>
          
          <div class="flex items-center gap-3">
            <span :class="getStatusBadgeClass(selectedPengajuan.status)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase border tracking-wider inline-block whitespace-nowrap">
              {{ formatStatusTeks(selectedPengajuan.status, selectedPengajuan.catatan_opsional) }}
            </span>
            <button @click="isModalOpen = false" class="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition border border-transparent hover:border-red-100" title="Tutup Modal">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="selectedPengajuan.status === 'ditolak'" class="bg-red-50 text-red-700 p-4 rounded-xl text-xs font-semibold mb-4 border border-red-100/50 flex flex-col gap-1">
          <span class="uppercase text-[9px] tracking-widest font-black text-red-500">Catatan Kendala Sistem:</span>
          <p class="italic bg-white p-2 rounded-lg border border-red-100 mt-1">" {{ selectedPengajuan.catatan_opsional }} "</p>
        </div>

        <div class="bg-gray-50/50 p-4 rounded-xl border border-gray-200/60 mb-6">
          <span class="text-[10px] uppercase font-black text-gray-400 block tracking-wider mb-2.5">Rincian Komoditas Anggaran Berkas:</span>
          
          <div class="overflow-x-auto overflow-y-auto max-h-60 bg-white rounded-xl border border-gray-200 shadow-sm custom-scrollbar">
            <table class="w-full text-left text-xs relative">
              <thead class="bg-gray-50 text-gray-500 font-bold uppercase text-[9px] tracking-wider border-b sticky top-0 z-10 shadow-sm">
                <tr>
                  <th class="px-4 py-3">Nama Komoditas & Spesifikasi Teknis</th>
                  <th class="px-4 py-3 text-center w-24">Kuantitas</th>
                  <th class="px-4 py-3 text-right">Harga Perkiraan</th>
                  <th class="px-4 py-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 font-medium text-gray-700">
                <tr v-for="(subItem, index) in selectedPengajuan.list_barang" :key="subItem.id" class="hover:bg-gray-50/50">
                  <td class="px-4 py-3">
                    <div class="font-bold text-gray-800">{{ subItem.nama_barang }}</div>
                    <div class="text-[11px] text-gray-400 mt-0.5 font-medium italic">{{ subItem.keterangan }}</div>
                  </td>
                  <td class="px-4 py-3 text-center font-bold text-gray-800">
                    {{ subItem.jumlah }} Unit
                  </td>
                  <td class="px-4 py-3 text-right text-gray-500 whitespace-nowrap">
                    {{ formatRupiah(subItem.harga_estimasi) }}
                  </td>
                  <td class="px-4 py-3 text-right font-bold text-indigo-950 whitespace-nowrap">
                    {{ formatRupiah(subItem.jumlah * subItem.harga_estimasi) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex justify-between items-center bg-indigo-950 text-white p-4 rounded-xl mt-4 shadow-md border border-indigo-900">
            <div>
              <span class="font-black uppercase text-[9px] tracking-wider text-indigo-300 block">Total Kumulatif Alokasi Anggaran:</span>
            </div>
            <span class="font-black text-xl text-emerald-400">
              {{ formatRupiah(hitungTotalSemuaBarang(selectedPengajuan.list_barang)) }}
            </span>
          </div>
        </div>

        <div v-if="(roleUser === 'sarpras' && selectedPengajuan.status === 'pending_sarpras') || (roleUser === 'keuangan' && selectedPengajuan.status === 'pending_keuangan') || (roleUser === 'kepsek' && selectedPengajuan.status === 'pending_kepsek')" class="flex items-center border-t border-gray-100 pt-4 justify-end gap-2">
            
            <div v-if="roleUser === 'sarpras' && selectedPengajuan.status === 'pending_sarpras'" class="flex gap-2 w-full justify-end">
              <button @click="keputusanVerifikator('ditolak')" class="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition">Kembalikan / Revisi</button>
              <button @click="keputusanVerifikator('pending_keuangan')" class="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition">Verifikasi Layak (Kirim ke Keuangan)</button>
            </div>

            <div v-else-if="roleUser === 'keuangan' && selectedPengajuan.status === 'pending_keuangan'" class="flex gap-2 w-full justify-end">
              <button @click="keputusanVerifikator('ditolak')" class="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition">Tolak / Anggaran Kosong</button>
              <button @click="keputusanVerifikator('pending_kepsek')" class="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition">Pagu Anggaran Ada (Kirim ke Kepsek)</button>
            </div>

            <div v-else-if="roleUser === 'kepsek' && selectedPengajuan.status === 'pending_kepsek'" class="flex gap-2 w-full justify-end">
              <button @click="keputusanVerifikator('ditolak')" class="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition">Tolak / Tolak Dokumen</button>
              <button @click="keputusanVerifikator('disetujui')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition">Ketuk Palu Persetujuan Akhir</button>
            </div>
        </div>
      </div>
    </div>

    <div v-if="isCatatanModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative border border-gray-100">
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-amber-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
            </svg>
            <h3 class="text-lg font-bold text-gray-800">Lampirkan Catatan</h3>
          </div>
          <p class="text-xs text-gray-500 leading-relaxed">Berikan alasan mengapa dokumen ini dikembalikan agar jurusan dapat memperbaikinya.</p>
        </div>
        
        <textarea 
          v-model="catatanInput" 
          @input="errorCatatan = ''"
          rows="4" 
          :class="[
            'w-full p-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition', 
            errorCatatan ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500 bg-red-50/30' : 'border-gray-200 focus:ring-amber-500/50 focus:border-amber-500'
          ]" 
          placeholder="Ketik alasan revisi..."
        ></textarea>
        
        <p v-if="errorCatatan" class="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" /></svg>
          {{ errorCatatan }}
        </p>

        <div class="flex items-center justify-end gap-2 mt-5">
          <button @click="isCatatanModalOpen = false; errorCatatan = ''" class="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition">Batal</button>
          <button @click="submitCatatan" class="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-md">Kirim Keputusan</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const namaUser = ref('Pengguna')
const roleUser = ref('sarpras')
const tabAktif = ref('Semua')

// --- TAMBAHKAN 2 BLOK KODE INI ---
const filterJurusan = ref('Semua Jurusan') // State untuk menyimpan jurusan yang dipilih
const isFilterDropdownOpen = ref(false)
const pilihFilterJurusan = (jurusan) => {
  filterJurusan.value = jurusan
  isFilterDropdownOpen.value = false
}
// Otomatis mengambil daftar nama jurusan yang unik dari data pengajuan
const listJurusanTersedia = computed(() => {
  const jurusanSet = new Set(daftarPengajuan.value.map(p => p.asal_jurusan))
  return ['Semua Jurusan', ...Array.from(jurusanSet).sort()]
})
// ---------------------------------

const isModalOpen = ref(false)
const selectedPengajuan = ref({})
const daftarPengajuan = ref([])

const isCatatanModalOpen = ref(false)
const catatanInput = ref('')
const pendingStatus = ref('')
const errorCatatan = ref('')

const fetchDataValidasi = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get('http://localhost:8889/api/pengajuan', {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.data.success) {
      const rawData = response.data.data
      const totalData = rawData.length 

      daftarPengajuan.value = rawData.map((item, index) => {
        let namaPembuatDB = item.nama_pembuat || localStorage.getItem('user_name') || 'PPLG'
        let namaUpper = namaPembuatDB.toUpperCase()
        
        if (namaUpper === 'JURUSAN' || namaUpper === 'ADMIN' || namaUpper === 'ADMIN JURUSAN') {
          namaPembuatDB = 'PPLG'
          namaUpper = 'PPLG'
        }
        
        let inisial = 'JUR' // Default jika tidak cocok dengan jurusan mana pun
        
        // Memecah nama menjadi array per kata untuk menghindari bug "TE" vs "TEKNIK"
        const kata = namaUpper.split(' ')

        if (namaUpper.includes('PPLG') || namaUpper.includes('PERANGKAT LUNAK') || namaUpper.includes('GIM')) {
          inisial = 'PPLG'
        } else if (namaUpper.includes('TJKT') || namaUpper.includes('TELEKOMUNIKASI') || namaUpper.includes('JARINGAN')) {
          inisial = 'TJKT'
        } else if (namaUpper.includes('DPIB') || namaUpper.includes('BANGUNAN') || namaUpper.includes('PEMODELAN')) {
          inisial = 'DPIB'
        } else if (namaUpper.includes('BROADCASTING') || namaUpper.includes('PERFILMAN') || namaUpper.includes('BC')) {
          inisial = 'BC'
        } else if (namaUpper.includes('ELEKTRONIKA') || namaUpper.includes('ELEKTRO') || kata.includes('TE')) {
          inisial = 'TE' // Aman dari kata "TEKNIK" karena dicarinya per kata
        } else if (namaUpper.includes('KETENAGALISTRIKAN') || namaUpper.includes('LISTRIK') || namaUpper.includes('TLK')) {
          inisial = 'TLK'
        } else if (namaUpper.includes('MESIN') || namaUpper.includes('MSN')) {
          inisial = 'MSN'
        } else if (namaUpper.includes('OTOMOTIF') || namaUpper.includes('OTM')) {
          inisial = 'OTM'
        }
        
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
        const teksJudulTabelLuar = listBarangSteril.length > 1 
          ? `${namaBarangUtama} (+${listBarangSteril.length - 1} Barang)` 
          : namaBarangUtama

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
    }
  } catch (error) {
    console.error('Gagal memuat data:', error)
  }
}

// FUNGSI FILTER BERDASARKAN KACAMATA ROLE MASING-MASING VERIFIKATOR
const pengajuanTersaring = computed(() => {
  // 1. Saring berdasarkan JURUSAN terlebih dahulu
  let hasilFilter = daftarPengajuan.value
  if (filterJurusan.value !== 'Semua Jurusan') {
    hasilFilter = hasilFilter.filter(p => p.asal_jurusan === filterJurusan.value)
  }

  // 2. Saring hasil nomor 1 berdasarkan STATUS (Tab Aktif)
  if (tabAktif.value === 'Semua') return hasilFilter

  if (roleUser.value === 'sarpras') {
    if (tabAktif.value === 'Menunggu') return hasilFilter.filter(p => p.status === 'pending_sarpras')
    if (tabAktif.value === 'Disetujui') return hasilFilter.filter(p => ['pending_keuangan', 'pending_kepsek', 'disetujui'].includes(p.status))
    if (tabAktif.value === 'Ditolak') return hasilFilter.filter(p => p.status === 'ditolak' && String(p.catatan_opsional).toUpperCase().includes('SARPRAS'))
  } else if (roleUser.value === 'keuangan') {
    if (tabAktif.value === 'Menunggu') return hasilFilter.filter(p => p.status === 'pending_keuangan')
    if (tabAktif.value === 'Disetujui') return hasilFilter.filter(p => ['pending_kepsek', 'disetujui'].includes(p.status))
    if (tabAktif.value === 'Ditolak') return hasilFilter.filter(p => p.status === 'ditolak' && String(p.catatan_opsional).toUpperCase().includes('KEUANGAN'))
  } else if (roleUser.value === 'kepsek') {
    if (tabAktif.value === 'Menunggu') return hasilFilter.filter(p => p.status === 'pending_kepsek')
    if (tabAktif.value === 'Disetujui') return hasilFilter.filter(p => p.status === 'disetujui')
    if (tabAktif.value === 'Ditolak') return hasilFilter.filter(p => p.status === 'ditolak' && String(p.catatan_opsional).toUpperCase().includes('KEPSEK'))
  } else {
    if (tabAktif.value === 'Menunggu') return hasilFilter.filter(p => p.status && p.status.startsWith('pending_'))
    if (tabAktif.value === 'Disetujui') return hasilFilter.filter(p => p.status === 'disetujui')
    if (tabAktif.value === 'Ditolak') return hasilFilter.filter(p => p.status === 'ditolak')
  }

  return hasilFilter
})

const hitungTotalSemuaBarang = (list) => {
  if (!list || list.length === 0) return 0
  return list.reduce((total, barang) => total + (Number(barang.jumlah) * Number(barang.harga_estimasi)), 0)
}

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
  eksekusiStatusAPI(statusBaru, '')
}

const submitCatatan = () => {
  if (!catatanInput.value.trim()) {
    errorCatatan.value = 'Alasan penolakan atau revisi wajib diisi secara rinci!'
    return
  }
  errorCatatan.value = '' 
  eksekusiStatusAPI(pendingStatus.value, catatanInput.value)
}

const eksekusiStatusAPI = async (status_final, catatan_final) => {
  try {
    const token = localStorage.getItem('auth_token')
    await axios.post(`http://localhost:8889/api/pengajuan-status/${selectedPengajuan.value.id_asli}`, {
      status_sesudah: status_final,
      catatan: catatan_final
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    isCatatanModalOpen.value = false
    isModalOpen.value = false
    fetchDataValidasi()
  } catch (error) {
    console.error('Gagal memperbarui status verifikator:', error)
    alert('GAGAL KIRIM KEPUTUSAN! Error: ' + (error.response?.data?.message || 'Server backend bermasalah.'))
  }
}

const getStatusBadgeClass = (status) => {
  if (status === 'disetujui') return 'bg-green-50 text-green-700 border-green-200'
  if (status === 'ditolak') return 'bg-red-50 text-red-700 border-red-200'
  if (status === 'pending_sarpras') return 'bg-amber-50 text-amber-700 border-amber-200'
  if (status === 'pending_keuangan') return 'bg-blue-50 text-blue-700 border-blue-200'
  if (status === 'pending_kepsek') return 'bg-purple-50 text-purple-700 border-purple-200'
  return 'bg-gray-50 text-gray-700 border-gray-200'
}

const formatStatusTeks = (status, catatan = '') => {
  if (status === 'disetujui') return 'Disetujui Penuh'
  if (status === 'pending_sarpras') return 'Pending Sarpras'
  if (status === 'pending_keuangan') return 'Pending Keuangan'
  if (status === 'pending_kepsek') return 'Pending Kepsek'
  
  if (status === 'ditolak') {
    const teksCatatan = String(catatan).toUpperCase()
    if (teksCatatan.includes('SARPRAS')) return 'Ditolak Sarpras'
    if (teksCatatan.includes('KEUANGAN')) return 'Ditolak Keuangan'
    if (teksCatatan.includes('KEPSEK')) return 'Ditolak Kepsek'
    return 'Ditolak / Revisi'
  }
  
  return status
}

const formatRupiah = (angka) => 'Rp ' + Number(angka).toLocaleString('id-ID')

onMounted(() => {
  namaUser.value = localStorage.getItem('user_name') || 'Pengguna'
  roleUser.value = (localStorage.getItem('user_role') || 'sarpras').toLowerCase()
  fetchDataValidasi()
})
</script>