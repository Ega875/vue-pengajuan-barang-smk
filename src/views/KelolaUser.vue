<template>
  <div class="flex min-h-screen bg-gray-100 font-sans text-left relative">
    <Sidebar />

    <main class="flex-1 p-8">
      <header class="mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Manajemen Akun Pengguna
          </h1>
          <p class="text-gray-500 text-sm mt-1">Kelola akses *login* dan atur ulang *password* seluruh pihak SMK.</p>
        </div>
        <button @click="bukaModalTambah" class="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-md flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Registrasi Akun Baru
        </button>
      </header>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-wider border-b border-gray-100">
            <tr>
              <th class="px-6 py-4">Nama Pengguna / Instansi</th>
              <th class="px-6 py-4">Alamat Email (Username)</th>
              <th class="px-6 py-4">Hak Akses (Role)</th>
              <th class="px-6 py-4 text-center">Aksi Administrator</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="user in daftarUser" :key="user.id" class="hover:bg-gray-50/50 transition">
              <td class="px-6 py-4 font-bold text-gray-800">{{ user.nama_user }}</td>
              <td class="px-6 py-4 text-gray-500">{{ user.email }}</td>
              <td class="px-6 py-4">
                <span :class="getRoleBadge(user.role)" class="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button @click="bukaModalEdit(user)" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition font-bold text-xs border border-transparent hover:border-blue-100">
                    Edit / Reset Sandi
                  </button>
                  <!-- PERBAIKAN: Tombol hapus sekarang memanggil fungsi buka modal kustom -->
                  <button @click="konfirmasiHapusUser(user.id, user.nama_user)" class="text-red-500 hover:bg-red-50 p-2 rounded-lg transition border border-transparent hover:border-red-100" title="Cabut Akses Akun">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="daftarUser.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-400 text-xs italic">
                Belum ada data akun yang terdaftar.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- MODAL REGISTRASI & EDIT AKUN -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative border border-gray-100">
        
        <div class="border-b border-gray-100 pb-4 mb-5">
          <span class="text-[10px] font-black text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
            {{ isEditing ? 'Panel Edit & Reset Sandi' : 'Registrasi Akun Baru' }}
          </span>
        </div>

        <form @submit.prevent="simpanData" class="space-y-4">
          <div>
            <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Nama Lengkap / Instansi</label>
            <input v-model="form.nama_user" type="text" required class="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition" placeholder="Contoh: Ketua Jurusan TKJ">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 sm:col-span-1">
              <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Alamat Email</label>
              <input v-model="form.email" type="email" required class="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition" placeholder="tkj@smk.sch.id">
            </div>
            
            <div class="col-span-2 sm:col-span-1 relative">
              <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Hak Akses (Role)</label>
              
              <div 
                @click="isDropdownOpen = !isDropdownOpen"
                class="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm cursor-pointer flex justify-between items-center focus:ring-2 focus:ring-teal-500/20 transition select-none"
                :class="{'ring-2 ring-teal-500/20 border-teal-500': isDropdownOpen}"
              >
                <span :class="form.role ? 'text-gray-800 capitalize' : 'text-gray-400'">
                  {{ form.role ? form.role : 'Pilih Role...' }}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-gray-400 transition-transform duration-300" :class="{'rotate-180 text-teal-600': isDropdownOpen}">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              
              <div v-if="isDropdownOpen" @click="isDropdownOpen = false" class="fixed inset-0 z-[5]"></div>
              
              <div v-if="isDropdownOpen" class="absolute z-10 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-y-auto max-h-48 custom-scrollbar py-1">
                <div 
                  v-for="role in listRole" 
                  :key="role"
                  @click="pilihRole(role)"
                  class="px-3 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 cursor-pointer transition-colors flex items-center justify-between font-medium"
                >
                  {{ role }}
                  <svg v-if="form.role === role.toLowerCase()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-teal-600">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-amber-50 p-4 rounded-xl border border-amber-100 mt-2">
            <label class="block text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">
              {{ isEditing ? 'Reset Password (Opsional)' : 'Password Akun Baru' }}
            </label>
            
            <div class="relative">
              <input 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'" 
                :required="!isEditing" 
                class="w-full p-2.5 pr-10 bg-white border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition" 
                placeholder="Minimal 6 karakter..."
              >
              <button 
                type="button" 
                @click="showPassword = !showPassword" 
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-600/60 hover:text-amber-600 transition-colors focus:outline-none"
              >
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </div>
            
            <p v-if="isEditing" class="text-[10px] text-amber-500 mt-1.5 italic">Kosongkan kotak ini jika tidak ingin mengubah password akun yang bersangkutan.</p>
          </div>

          <div class="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
            <button type="button" @click="tutupModal" class="px-5 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold transition">Batal</button>
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-md">
              {{ isEditing ? 'Simpan Perubahan' : 'Buat Akun Sekarang' }}
            </button>
          </div>
        </form>

      </div>
    </div>

    <!-- MODAL CUSTOM: KONFIRMASI HAPUS AKUN -->
    <div v-if="isHapusModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <div class="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 relative border border-red-100 text-center">
        <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-red-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Cabut Akses Akun?</h3>
        <p class="text-sm text-gray-500 leading-relaxed mb-6">
          Apakah Anda yakin ingin menghapus akun <b>{{ userToDelete.nama }}</b> secara permanen? Data yang terkait mungkin akan terdampak.
        </p>
        <div class="flex items-center justify-center gap-3">
          <button @click="isHapusModalOpen = false" class="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition w-full">Batal</button>
          <button @click="eksekusiHapusUser" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-md w-full">Ya, Hapus!</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const daftarUser = ref([])
const isModalOpen = ref(false)
const isEditing = ref(false)
const editId = ref(null)

const isDropdownOpen = ref(false)
const showPassword = ref(false)
const listRole = ['jurusan', 'Sarpras', 'Keuangan', 'Kepsek']

// STATE BARU UNTUK FITUR HAPUS KUSTOM
const isHapusModalOpen = ref(false)
const userToDelete = ref({ id: null, nama: '' })

const form = ref({
  nama_user: '',
  email: '',
  role: '',
  password: ''
})

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get('http://localhost:8889/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (response.data.success) daftarUser.value = response.data.data
  } catch (error) {
    console.error('Gagal mengambil data user:', error)
  }
}

const pilihRole = (role) => {
  form.value.role = role.toLowerCase()
  isDropdownOpen.value = false
}

const simpanData = async () => {
  if (!form.value.role) {
    alert('Harap pilih Hak Akses (Role) terlebih dahulu!')
    return
  }

  try {
    const token = localStorage.getItem('auth_token')
    
    if (isEditing.value) {
      await axios.put(`http://localhost:8889/api/users/${editId.value}`, form.value, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } else {
      await axios.post('http://localhost:8889/api/users', form.value, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
    
    tutupModal()
    fetchUsers()
  } catch (error) {
    console.error('Gagal menyimpan data akun:', error)
    alert(error.response?.data?.message || 'Email sudah terdaftar atau terjadi kesalahan server.')
  }
}

// FUNGSI BARU UNTUK MEMBUKA MODAL HAPUS
const konfirmasiHapusUser = (id, nama) => {
  userToDelete.value = { id, nama }
  isHapusModalOpen.value = true
}

// FUNGSI BARU UNTUK MENGEKSEKUSI PENGHAPUSAN (SAAT TOMBOL 'YA, HAPUS!' DIKLIK)
const eksekusiHapusUser = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    await axios.delete(`http://localhost:8889/api/users/${userToDelete.value.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    isHapusModalOpen.value = false // Tutup modalnya
    fetchUsers() // Refresh tabel
  } catch (error) {
    console.error('Gagal menghapus akun:', error)
    // PERBAIKAN: Tampilkan pesan asli dari Lumen agar kita tahu apa penyebab pastinya!
    alert('Gagal: ' + (error.response?.data?.message || 'Terjadi kesalahan server.'))
  }
}

const bukaModalTambah = () => {
  isEditing.value = false
  form.value = { nama_user: '', email: '', role: '', password: '' }
  isDropdownOpen.value = false
  showPassword.value = false
  isModalOpen.value = true
}

const bukaModalEdit = (user) => {
  isEditing.value = true
  editId.value = user.id
  form.value = { nama_user: user.nama_user, email: user.email, role: user.role, password: '' }
  isDropdownOpen.value = false
  showPassword.value = false
  isModalOpen.value = true
}

const tutupModal = () => {
  isModalOpen.value = false
  isDropdownOpen.value = false
}

const getRoleBadge = (role) => {
  if (role === 'jurusan') return 'bg-indigo-50 text-indigo-700 border-indigo-200'
  if (role === 'sarpras') return 'bg-teal-50 text-teal-700 border-teal-200'
  if (role === 'keuangan') return 'bg-blue-50 text-blue-700 border-blue-200'
  if (role === 'kepsek') return 'bg-purple-50 text-purple-700 border-purple-200'
  return 'bg-gray-100 text-gray-800 border-gray-200'
}

onMounted(() => {
  fetchUsers()
})
</script>