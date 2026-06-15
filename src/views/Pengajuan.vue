<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// Inisialisasi router
const router = useRouter()

// Fungsi untuk kembali ke dashboard utama
const kembaliKeDashboard = () => {
  router.push('/')
}

// 1. Data 10 Template Barang Umum (Kembali ke default lokal kamu)
const masterBarang = ref([
  { id: 1, nama_barang: 'PC Rakitan Standar Lab', harga_satuan: 7500000, spesifikasi_umum: 'Core i5, RAM 16GB, SSD 512GB', kategori: 'Elektronik', jumlah_pilih: 1 },
  { id: 2, nama_barang: 'Monitor LED 24 Inch', harga_satuan: 1500000, spesifikasi_umum: 'Full HD 1080p, IPS Panel', kategori: 'Elektronik', jumlah_pilih: 1 },
  { id: 3, nama_barang: 'Mouse & Keyboard Logitech', harga_satuan: 250000, spesifikasi_umum: 'Kombinasi Wireless MK220', kategori: 'Aksesoris', jumlah_pilih: 1 },
  { id: 4, nama_barang: 'Printer Epson L3210', harga_satuan: 2400000, spesifikasi_umum: 'Ecotank Ink Tank Printer', kategori: 'Elektronik', jumlah_pilih: 1 },
  { id: 5, nama_barang: 'Proyektor Epson', harga_satuan: 5500000, spesifikasi_umum: '3300 Lumens, XGA', kategori: 'Elektronik', jumlah_pilih: 1 },
  { id: 6, nama_barang: 'Kursi Kerja Staff', harga_satuan: 650000, spesifikasi_umum: 'Kursi Jaring Hidrolik', kategori: 'Mebel', jumlah_pilih: 1 },
  { id: 7, nama_barang: 'Meja Komputer Sekat', harga_satuan: 850000, spesifikasi_umum: 'Bahan Partikel Board Tebal', kategori: 'Mebel', jumlah_pilih: 1 },
  { id: 8, nama_barang: 'Router Mikrotik RB951', harga_satuan: 950000, spesifikasi_umum: 'Wireless SOHO AP', kategori: 'Elektronik', jumlah_pilih: 1 },
  { id: 9, nama_barang: 'Kabel LAN Belden Cat6', harga_satuan: 2100000, spesifikasi_umum: '1 Roll / 305 Meter', kategori: 'Aksesoris', jumlah_pilih: 1 },
  { id: 10, nama_barang: 'Switch Hub TP-Link 24 Port', harga_satuan: 1200000, spesifikasi_umum: 'Gigabit Rackmount Switch', kategori: 'Elektronik', jumlah_pilih: 1 }
])

// Ambil data dari katalog master barang umum di database jika ada
const fetchMasterBarangUmum = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get('http://localhost:8889/api/master-barang', {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.data.success && response.data.data.length > 0) {
      masterBarang.value = response.data.data.map(item => ({
        id: item.id,
        nama_barang: item.nama_barang,
        harga_satuan: item.harga_satuan,
        spesifikasi_umum: item.spesifikasi_umum,
        kategori: item.kategori,
        jumlah_pilih: 1 
      }))
    }
  } catch (error) {
    console.error('Katalog master barang di DB kosong. Menggunakan data cadangan bawaan.')
  }
}

// State untuk Filter Kategori
const kategoriTerpilih = ref('Semua')

const daftarKategori = computed(() => {
  const kategoriAsli = masterBarang.value.map(item => item.kategori)
  return ['Semua', ...new Set(kategoriAsli)]
})

const barangTerfilter = computed(() => {
  if (kategoriTerpilih.value === 'Semua') return masterBarang.value
  return masterBarang.value.filter(item => item.kategori === kategoriTerpilih.value)
})

// 2. State untuk Form Input Manual
const formManual = ref({
  nama_barang: '',
  harga_satuan_display: '', 
  jumlah: 1,
  spesifikasi: ''
})

const formSubmitted = ref(false)

const isNamaBarangError = computed(() => formSubmitted.value && !formManual.value.nama_barang.trim())
const isHargaError = computed(() => formSubmitted.value && (!formManual.value.harga_satuan_display || hargaSatuanAsli.value <= 0))
const isSpesifikasiError = computed(() => formSubmitted.value && !formManual.value.spesifikasi.trim())

const filterKarakterAngka = (event) => {
  const key = event.key
  if (
    ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key) ||
    ((event.ctrlKey === true || event.metaKey === true) && (key === 'a' || key === 'A' || key === 'c' || key === 'C' || key === 'v' || key === 'V'))
  ) {
    return
  }
  if (!/^[0-9]$/.test(key)) event.preventDefault()
}

const handleInputHarga = (event) => {
  let nilaiMurni = event.target.value.replace(/\D/g, '')
  if (nilaiMurni) {
    formManual.value.harga_satuan_display = new Intl.NumberFormat('id-ID').format(nilaiMurni)
  } else {
    formManual.value.harga_satuan_display = ''
  }
}

const hargaSatuanAsli = computed(() => {
  if (!formManual.value.harga_satuan_display) return 0
  return Number(formManual.value.harga_satuan_display.replace(/\./g, ''))
})

// 3. Array Keranjang Belanja
const keranjang = ref([])

const ubahQtyMaster = (barang, aksi) => {
  if (aksi === 'tambah') {
    barang.jumlah_pilih++
  } else if (aksi === 'kurang' && barang.jumlah_pilih > 1) {
    barang.jumlah_pilih--
  }
}

// Menambahkan barang dari tabel standar ke keranjang database MySQL
const tambahDariMaster = async (barang) => {
  try {
    const token = localStorage.getItem('auth_token')
    
    // KITA PAKAI ID ASLI DARI DATABASE SEKARANG!
    await axios.post('http://localhost:8889/api/keranjang', {
      master_barang_id: barang.id,
      jumlah: barang.jumlah_pilih
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    const itemAda = keranjang.value.find(item => item.nama_barang === barang.nama_barang)
    if (itemAda) {
      itemAda.jumlah += barang.jumlah_pilih
    } else {
      keranjang.value.push({
        master_barang_id: barang.id,
        nama_barang: barang.nama_barang,
        harga_satuan: barang.harga_satuan,
        jumlah: barang.jumlah_pilih,
        spesifikasi: barang.spesifikasi_umum
      })
    }
    barang.jumlah_pilih = 1
    
  } catch (error) {
    // 🚨 RADAR ERROR SUPER JITU 🚨
    const serverError = error.response?.data;
    alert("❌ GAGAL! Ini alasan dari server:\n" + JSON.stringify(serverError, null, 2));
    console.error('Error lengkap:', error);
  }
}

// Menambahkan barang input manual ke keranjang database MySQL
const tambahManual = async () => {
  formSubmitted.value = true

  if (isNamaBarangError.value || isHargaError.value || isSpesifikasiError.value) {
    return
  }

  try {
    const token = localStorage.getItem('auth_token')
    
    // PERBAIKAN PAYLOAD: Mengirim data spesifikasi murni apa adanya ke backend Lumen
    await axios.post('http://localhost:8889/api/keranjang', {
      master_barang_id: null, 
      nama_barang_kustom: formManual.value.nama_barang,
      harga_estimasi: hargaSatuanAsli.value,
      jumlah: Number(formManual.value.jumlah),
      spesifikasi: formManual.value.spesifikasi 
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    keranjang.value.push({
      master_barang_id: null,
      nama_barang: formManual.value.nama_barang,
      harga_satuan: hargaSatuanAsli.value,
      jumlah: Number(formManual.value.jumlah),
      spesifikasi: formManual.value.spesifikasi
    })

    // Bersihkan kembali form input
    formManual.value = { nama_barang: '', harga_satuan_display: '', jumlah: 1, spesifikasi: '' }
    formSubmitted.value = false
  } catch (error) {
    console.error('Gagal memasukkan barang custom ke keranjang DB:', error)
    alert(error.response?.data?.message || 'Gagal menambahkan barang custom ke server.')
  }
}

const hapusItem = (index) => {
  keranjang.value.splice(index, 1)
}

const totalHargaKeseluruhan = computed(() => {
  return keranjang.value.reduce((total, item) => total + (item.harga_satuan * item.jumlah), 0)
})

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka)
}

// Fungsi Kirim Semua Pengajuan
const kirimPengajuanKeDatabase = async () => {
  if (keranjang.value.length === 0) {
    alert('Keranjang belanja kamu masih kosong!')
    return
  }

  try {
    const token = localStorage.getItem('auth_token')
    
    // Tembak request checkout ke backend Lumen
    await axios.post('http://localhost:8889/api/pengajuan', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })

    // Kosongkan state keranjang di frontend
    keranjang.value = []
    
    // Langsung redirect ke dashboard utama tanpa memunculkan pop-up OK lagi
    router.push('/').then(() => {
      window.location.reload()
    })
  } catch (error) {
    console.error('Gagal melakukan checkout:', error)
    alert(error.response?.data?.message || 'Terjadi kesalahan saat checkout pengajuan.')
  }
}

onMounted(() => {
  fetchMasterBarangUmum()
})
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    
    <div class="mb-5">
      <button 
        @click="kembaliKeDashboard"
        class="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold text-sm transition bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Kembali ke Dashboard
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <div class="lg:col-span-7 space-y-6">
        
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h2 class="text-xl font-bold text-gray-800 mb-2">Pilihan Barang Standar</h2>
          
          <div class="flex flex-wrap gap-2 mb-4 border-b border-gray-100 pb-3">
            <button
              v-for="kat in daftarKategori"
              :key="kat"
              @click="kategoriTerpilih = kat"
              :class="[
                'px-4 py-1.5 rounded-full text-xs font-bold transition duration-200',
                kategoriTerpilih === kat 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              {{ kat }}
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
            <div 
              v-for="barang in barangTerfilter" 
              :key="barang.id" 
              class="p-3 bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-between hover:border-blue-400 transition"
            >
              <div>
                <span class="text-xs font-semibold text-blue-600 uppercase">{{ barang.kategori }}</span>
                <h4 class="font-bold text-gray-700 text-sm mt-0.5">{{ barang.nama_barang }}</h4>
                <p class="text-xs text-gray-500 mt-1 line-clamp-1">{{ barang.spesifikasi_umum }}</p>
                <p class="text-sm font-semibold text-emerald-600 mt-2">{{ formatRupiah(barang.harga_satuan) }}</p>
              </div>

              <div class="mt-4 flex items-center gap-2">
                <div class="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden h-8">
                  <button 
                    @click="ubahQtyMaster(barang, 'kurang')"
                    class="px-2 text-gray-600 hover:bg-gray-100 font-bold h-full transition text-sm"
                  >
                    -
                  </button>
                  <input 
                    v-model.number="barang.jumlah_pilih" 
                    type="number" 
                    min="1" 
                    class="w-10 text-center text-xs font-bold focus:outline-none h-full border-x border-gray-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  >
                   <button 
                    @click="ubahQtyMaster(barang, 'tambah')"
                    class="px-2 text-gray-600 hover:bg-gray-100 font-bold h-full transition text-sm"
                  >
                    +
                  </button>
                </div>

                <button 
                  @click="tambahDariMaster(barang)"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold h-8 rounded-lg transition"
                >
                  + Pilih Barang
                </button>
              </div>

            </div>
          </div>
        </div>

        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Input Barang Custom (Manual)</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label class="block text-xs font-bold text-gray-600 uppercase mb-1">Nama Barang</label>
              <input 
                v-model="formManual.nama_barang" 
                type="text" 
                :class="[
                  'w-full p-2 border rounded-lg text-sm focus:outline-none transition-colors duration-200',
                  isNamaBarangError ? 'border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:ring-1 focus:ring-blue-500'
                ]" 
                placeholder="Misal: AC Sharp 1 PK"
              >
              <span v-if="isNamaBarangError" class="text-red-500 text-[11px] mt-1 block font-medium">Nama barang wajib diisi!</span>
            </div>
           
            <div>
              <label class="block text-xs font-bold text-gray-600 uppercase mb-1">Estimasi Harga Satuan</label>
              <div 
                :class="[
                  'flex items-center w-full border rounded-lg bg-white overflow-hidden transition-colors duration-200',
                  isHargaError ? 'border-red-500 focus-within:ring-1 focus-within:ring-red-500' : 'border-gray-300 focus-within:ring-1 focus-within:ring-blue-500'
                ]"
              >
                <span 
                  :class="[
                    'px-3 py-2 text-sm font-semibold border-r select-none',
                    isHargaError ? 'bg-red-50 text-red-500 border-red-200' : 'bg-gray-100 text-gray-500 border-gray-200'
                  ]"
                >
                  Rp
                </span>
                <input 
                   :value="formManual.harga_satuan_display"
                  @keydown="filterKarakterAngka"
                  @input="handleInputHarga"
                  type="text" 
                  :class="['w-full p-2 text-sm focus:outline-none', isHargaError ? 'bg-red-50' : '']" 
                  placeholder="0"
                >
              </div>
              <span v-if="isHargaError" class="text-red-500 text-[11px] mt-1 block font-medium">Harga satuan wajib diisi!</span>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-600 uppercase mb-1">Jumlah</label>
              <input v-model="formManual.jumlah" type="number" min="1" class="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-600 uppercase mb-1">Spesifikasi Detail</label>
               <input 
                v-model="formManual.spesifikasi" 
                type="text" 
                :class="[
                  'w-full p-2 border rounded-lg text-sm focus:outline-none transition-colors duration-200',
                  isSpesifikasiError ? 'border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:ring-1 focus:ring-blue-500'
                ]" 
                placeholder="Spesifikasi tambahan"
              >
              <span v-if="isSpesifikasiError" class="text-red-500 text-[11px] mt-1 block font-medium">Spesifikasi barang wajib diisi!</span>
            </div>

          </div>
          
          <button 
            @click="tambahManual"
            class="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2 px-4 rounded-lg w-full transition"
          >
            + Tambahkan ke Keranjang
          </button>
        </div>

      </div>

      <div class="lg:col-span-5">
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 h-[700px] flex flex-col justify-between">
          
          <div class="flex flex-col flex-1 min-h-0">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center justify-between flex-shrink-0">
              <span>Keranjang Pengajuan</span>
              <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">{{ keranjang.length }} Item</span>
            </h2>

            <div v-if="keranjang.length === 0" class="text-center py-12 text-gray-400 text-sm flex-1 flex items-center justify-center">
              Keranjang masih kosong. Silakan pilih atau input barang terlebih dahulu.
            </div>

            <div class="space-y-3 flex-1 overflow-y-auto pr-2 min-h-0 mb-2" v-else>
              <div 
                v-for="(item, index) in keranjang" 
                :key="index"
                class="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-start hover:border-gray-300 transition shadow-sm"
              >
                <div class="space-y-0.5">
                  <h4 class="font-bold text-gray-800 text-sm">{{ item.nama_barang }}</h4>
                  <p class="text-xs text-gray-500">Spec: {{ item.spesifikasi || '-' }}</p>
                  <p class="text-xs text-gray-600">
                    {{ formatRupiah(item.harga_satuan) }} x {{ item.jumlah }}
                  </p>
                  <p class="text-sm font-bold text-gray-700 mt-1">
                    Subtotal: <span class="text-blue-600">{{ formatRupiah(item.harga_satuan * item.jumlah) }}</span>
                  </p>
                </div>
                <button 
                  @click="hapusItem(index)"
                  class="text-gray-400 hover:text-red-500 font-bold text-lg p-1 rounded transition"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4 flex-shrink-0">
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-600 font-medium">Total Anggaran:</span>
              <span class="text-xl font-extrabold text-emerald-600">{{ formatRupiah(totalHargaKeseluruhan) }}</span>
            </div>
            <button @click="kirimPengajuanKeDatabase" :disabled="keranjang.length === 0"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-md transition text-center text-sm uppercase tracking-wider">
            Kirim Semua Pengajuan
          </button>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>