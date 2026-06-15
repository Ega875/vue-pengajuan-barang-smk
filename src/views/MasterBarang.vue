<template>
  <div class="flex min-h-screen bg-gray-100 font-sans text-left relative">
    <Sidebar />

    <main class="flex-1 p-8">
      <header class="mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Master Barang Umum
          </h1>
          <p class="text-gray-500 text-sm mt-1">Kelola katalog spesifikasi dan harga standar pengadaan sekolah.</p>
        </div>
        <button @click="bukaModalTambah" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-md flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Tambah Barang Baru
        </button>
      </header>

      <div class="mb-4 flex flex-wrap gap-2">
        <button 
          v-for="kat in listKategoriDinamis" :key="kat" 
          @click="kategoriAktif = kat"
          :class="kategoriAktif === kat ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'"
          class="px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap"
        >
          {{ kat === 'Semua' ? 'Semua Kategori' : kat }}
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th class="px-6 py-4">Kategori</th>
                <th class="px-6 py-4">Nama Barang & Spesifikasi</th>
                <th class="px-6 py-4 text-right">Harga Satuan Standar</th>
                <th class="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in barangTersaring" :key="item.id" class="hover:bg-gray-50/50 transition">
                <td class="px-6 py-4">
                  <span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-slate-200 inline-block whitespace-nowrap">
                    {{ item.kategori }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="font-bold text-gray-800">{{ item.nama_barang }}</div>
                  <div class="text-[11px] text-gray-400 mt-0.5 italic">{{ item.spesifikasi_umum || 'Tidak ada spesifikasi khusus.' }}</div>
                </td>
                <td class="px-6 py-4 text-right font-bold text-indigo-950 whitespace-nowrap">
                  {{ formatRupiah(item.harga_satuan) }}
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button @click="bukaModalEdit(item)" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition" title="Edit Data">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>
                    </button>
                    <button @click="hapusBarang(item.id)" class="text-red-500 hover:bg-red-50 p-2 rounded-lg transition" title="Hapus Data">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="barangTersaring.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-gray-400 text-xs italic">
                  Tidak ada barang untuk kategori "{{ kategoriAktif === 'Semua' ? 'Semua Kategori' : kategoriAktif }}".
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative border border-gray-100">
        
        <div class="border-b border-gray-100 pb-4 mb-5">
          <span class="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
            {{ isEditing ? 'Edit Data Barang' : 'Tambah Barang Baru' }}
          </span>
        </div>

        <form @submit.prevent="simpanData" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            
            <div class="col-span-2 sm:col-span-1 relative">
              <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Kategori</label>
              
              <div 
                @click="isDropdownOpen = !isDropdownOpen" 
                @focusout="setTimeoutTutupDropdown"
                tabindex="0"
                class="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer flex justify-between items-center"
              >
                <span :class="form.kategori ? 'text-gray-800' : 'text-gray-400'">
                  {{ form.kategori || 'Pilih Kategori...' }}
                </span>
                
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 transition-transform duration-200" :class="{'rotate-180': isDropdownOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <ul v-if="isDropdownOpen" class="absolute z-20 w-full mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg py-1 max-h-48 overflow-y-auto">
                <li v-for="opsi in daftarKategori" :key="opsi" 
                    @click="pilihKategori(opsi)"
                    class="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition font-medium">
                  {{ opsi }}
                </li>
              </ul>
            </div>
            
            <div class="col-span-2 sm:col-span-1">
              <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Harga Satuan (Rp)</label>
              <input :value="hargaDisplay" @input="onInputHarga" type="text" inputmode="numeric" required class="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition" placeholder="Contoh: 1.500.000">
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Nama Barang</label>
            <input v-model="form.nama_barang" type="text" required class="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition" placeholder="Contoh: PC Rakitan Core i5">
          </div>

          <div>
            <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Spesifikasi Lengkap</label>
            <textarea v-model="form.spesifikasi_umum" rows="3" class="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition" placeholder="Tulis rincian spesifikasi standar..."></textarea>
          </div>

          <div class="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
            <button type="button" @click="tutupModal" class="px-5 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold transition">Batal</button>
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md">
              {{ isEditing ? 'Simpan Perubahan' : 'Tambahkan ke Katalog' }}
            </button>
          </div>
        </form>

      </div>
    </div>

  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const daftarBarang = ref([])
const isModalOpen = ref(false)
const isEditing = ref(false)
const editId = ref(null)

// STATE UNTUK FILTER KATEGORI
const kategoriAktif = ref('Semua')

// STATE CUSTOM DROPDOWN FORM
const isDropdownOpen = ref(false)
const daftarKategori = ['Elektronik & IT', 'Mebel & Furnitur', 'Alat Tulis Kantor (ATK)', 'Peralatan Praktikum', 'Lainnya']

const form = ref({
  nama_barang: '',
  spesifikasi_umum: '',
  kategori: '',
  harga_satuan: '' 
})

// FUNGSI KOMPUTASI FILTER DINAMIS: Mengekstrak kategori unik dari database
const listKategoriDinamis = computed(() => {
  // Menggunakan Set untuk membuang duplikat kategori
  const unik = new Set(daftarBarang.value.map(item => item.kategori))
  return ['Semua', ...Array.from(unik)]
})

// FUNGSI KOMPUTASI TABEL: Menyaring data berdasarkan tombol yang diklik
const barangTersaring = computed(() => {
  if (kategoriAktif.value === 'Semua') return daftarBarang.value
  return daftarBarang.value.filter(item => item.kategori === kategoriAktif.value)
})

// FUNGSI CUSTOM DROPDOWN
const pilihKategori = (opsi) => {
  form.value.kategori = opsi
  isDropdownOpen.value = false
}

const setTimeoutTutupDropdown = () => {
  setTimeout(() => {
    isDropdownOpen.value = false
  }, 150)
}

const hargaDisplay = computed(() => {
  if (!form.value.harga_satuan) return ''
  return Number(form.value.harga_satuan).toLocaleString('id-ID')
})

const onInputHarga = (e) => {
  const rawValue = e.target.value.replace(/\D/g, '')
  form.value.harga_satuan = rawValue ? Number(rawValue) : ''
  e.target.value = rawValue ? Number(rawValue).toLocaleString('id-ID') : ''
}

const fetchMasterBarang = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get('http://localhost:8889/api/master-barang', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (response.data.success) {
      daftarBarang.value = response.data.data
    }
  } catch (error) {
    console.error('Gagal mengambil data master barang:', error)
  }
}

const simpanData = async () => {
  if (!form.value.kategori) {
    alert('Harap pilih kategori barang terlebih dahulu!')
    return
  }

  try {
    const token = localStorage.getItem('auth_token')
    
    if (isEditing.value) {
      await axios.put(`http://localhost:8889/api/master-barang/${editId.value}`, form.value, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } else {
      await axios.post('http://localhost:8889/api/master-barang', form.value, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
    
    tutupModal()
    fetchMasterBarang()
  } catch (error) {
    console.error('Gagal menyimpan data:', error)
    alert('Terjadi kesalahan saat menyimpan data.')
  }
}

const hapusBarang = async (id) => {
  if (confirm('Yakin ingin menghapus spesifikasi barang ini dari katalog standar?')) {
    try {
      const token = localStorage.getItem('auth_token')
      await axios.delete(`http://localhost:8889/api/master-barang/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchMasterBarang()
      
      // Kembalikan filter ke 'Semua' jika kategori yang aktif ternyata kosong setelah dihapus
      kategoriAktif.value = 'Semua'
    } catch (error) {
      console.error('Gagal menghapus data:', error)
    }
  }
}

const bukaModalTambah = () => {
  isEditing.value = false
  form.value = { nama_barang: '', spesifikasi_umum: '', kategori: '', harga_satuan: '' }
  isModalOpen.value = true
}

const bukaModalEdit = (item) => {
  isEditing.value = true
  editId.value = item.id
  form.value = { ...item }
  isModalOpen.value = true
}

const tutupModal = () => {
  isModalOpen.value = false
  isDropdownOpen.value = false 
}

const formatRupiah = (angka) => 'Rp ' + Number(angka).toLocaleString('id-ID')

onMounted(() => {
  fetchMasterBarang()
})
</script>