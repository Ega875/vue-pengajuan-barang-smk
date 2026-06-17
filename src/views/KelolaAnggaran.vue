<template>
  <div class="flex min-h-screen bg-gray-100 font-sans text-left relative">
    <Sidebar />

    <main class="flex-1 p-8">
      <header class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Kelola Pagu Anggaran
          </h1>
          <p class="text-gray-500 text-sm mt-1">Atur batasan jatah dana pengadaan untuk masing-masing jurusan (Periode Semester Ini).</p>
        </div>
        
        <div class="bg-white border border-gray-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
          <span class="text-xs font-bold text-gray-500">Tugas Pengecekan:</span>
          <span class="bg-indigo-100 text-indigo-800 font-black px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider">
            {{ roleUser }}
          </span>
        </div>
      </header>

      <!-- Kartu Ringkasan Total Anggaran Sekolah -->
      <div class="bg-gradient-to-br from-indigo-900 to-indigo-950 p-8 rounded-2xl shadow-xl border border-indigo-800 mb-8 flex justify-between items-center text-white">
        <div>
          <p class="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">Total Plafon Anggaran Sekolah (Semester Ini)</p>
          <h2 class="text-4xl font-black text-emerald-400">{{ formatRupiah(totalSemuaAnggaran) }}</h2>
        </div>
        <div class="hidden sm:block opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-5 border-b border-gray-100">
          <h3 class="font-bold text-gray-800">Daftar Jatah Dana Jurusan</h3>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm table-fixed min-w-[700px]">
            <thead>
              <tr class="bg-gray-50 text-gray-400 text-xs uppercase font-bold text-left border-b border-gray-100">
                <th class="px-6 py-4 w-[15%]">Kode</th>
                <th class="px-6 py-4 w-[40%]">Nama Program Keahlian</th>
                <th class="px-6 py-4 text-right w-[25%]">Pagu Anggaran (Rp)</th>
                <th class="px-6 py-4 text-center w-[20%]">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="(jurusan, index) in daftarJurusan" :key="jurusan.id" class="hover:bg-gray-50/50 transition">
                <td class="px-6 py-4 font-black text-indigo-950">{{ jurusan.id }}</td>
                <td class="px-6 py-4 font-bold text-gray-700">{{ jurusan.nama }}</td>
                <td class="px-6 py-4 text-right font-black" :class="jurusan.pagu > 0 ? 'text-emerald-600' : 'text-gray-400'">
                  {{ jurusan.pagu > 0 ? formatRupiah(jurusan.pagu) : 'Belum Diatur' }}
                </td>
                <td class="px-6 py-4 text-center">
                  <button @click="bukaModalEdit(index)" class="bg-white border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm mx-auto flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    Atur Dana
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- MODAL EDIT PAGU -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative border border-gray-100">
        <div class="mb-5">
          <span class="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
            Edit Pagu Anggaran
          </span>
          <h2 class="text-xl font-black text-gray-900 mt-3">Jurusan {{ jurusanTerpilih.id }}</h2>
          <p class="text-xs text-gray-500 mt-1">{{ jurusanTerpilih.nama }}</p>
        </div>

        <div class="mb-6">
          <label class="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Tentukan Nominal Saldo (Rp)</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rp</span>
            <input 
              type="number" 
              v-model.number="inputPagu" 
              min="0"
              class="w-full bg-gray-50 border border-gray-200 text-gray-900 font-black text-lg rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="0"
            />
          </div>
          <p class="text-[10px] text-gray-400 mt-2 italic">*Ketik angka saja tanpa titik (Contoh: 15000000)</p>
          
          <div class="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
            <span class="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block mb-1">Preview Nominal:</span>
            <span class="text-lg font-black text-emerald-700">{{ formatRupiah(inputPagu || 0) }}</span>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <button @click="isModalOpen = false" class="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-5 py-2.5 rounded-xl text-xs transition">Batal</button>
          <button @click="simpanPagu" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-md">Simpan Anggaran</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref, onMounted, computed } from 'vue'

const roleUser = ref('keuangan')

// Data Master Jurusan
const daftarJurusan = ref([
  { id: 'PPLG', nama: 'Pengembangan Perangkat Lunak dan Gim', pagu: 0 },
  { id: 'TJKT', nama: 'Teknik Jaringan Komputer dan Telekomunikasi', pagu: 0 },
  { id: 'DPIB', nama: 'Desain Pemodelan dan Informasi Bangunan', pagu: 0 },
  { id: 'BC', nama: 'Broadcasting dan Perfilman', pagu: 0 },
  { id: 'TE', nama: 'Teknik Elektronika', pagu: 0 },
  { id: 'TLK', nama: 'Teknik Ketenagalistrikan', pagu: 0 },
  { id: 'MSN', nama: 'Teknik Mesin', pagu: 0 },
  { id: 'OTM', nama: 'Teknik Otomotif', pagu: 0 }
])

const totalSemuaAnggaran = computed(() => {
  return daftarJurusan.value.reduce((total, jur) => total + (Number(jur.pagu) || 0), 0)
})

const isModalOpen = ref(false)
const indexTerpilih = ref(null)
const jurusanTerpilih = ref({})
const inputPagu = ref(0)

const muatDataPagu = () => {
  const simpananData = localStorage.getItem('data_pagu_jurusan')
  if (simpananData) {
    const dataParsed = JSON.parse(simpananData)
    // Cocokkan data dari localstorage ke daftarJurusan
    daftarJurusan.value.forEach(jur => {
      if (dataParsed[jur.id] !== undefined) {
        jur.pagu = dataParsed[jur.id]
      }
    })
  }
}

const bukaModalEdit = (index) => {
  indexTerpilih.value = index
  jurusanTerpilih.value = daftarJurusan.value[index]
  inputPagu.value = daftarJurusan.value[index].pagu
  isModalOpen.value = true
}

const simpanPagu = () => {
  if (indexTerpilih.value !== null) {
    // Update nilai di state
    daftarJurusan.value[indexTerpilih.value].pagu = inputPagu.value || 0
    
    // Format ulang data untuk disimpan ke localStorage
    const dataUntukDisimpan = {}
    daftarJurusan.value.forEach(jur => {
      dataUntukDisimpan[jur.id] = jur.pagu
    })

    // Simpan ke memori browser
    localStorage.setItem('data_pagu_jurusan', JSON.stringify(dataUntukDisimpan))
    
    isModalOpen.value = false
  }
}

const formatRupiah = (angka) => 'Rp ' + Number(angka).toLocaleString('id-ID')

onMounted(() => {
  roleUser.value = (localStorage.getItem('user_role') || 'keuangan').toLowerCase()
  muatDataPagu()
})
</script>