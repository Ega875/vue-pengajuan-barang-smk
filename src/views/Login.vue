<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <!-- Header Tampilan -->
      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-2">Login Jurusan</h2>
      <p class="text-sm text-center text-gray-500 mb-6">Sistem Informasi Pengajuan Barang SMK</p>

      <!-- Alert Pesan Error jika Login Gagal -->
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg border border-red-200">
        {{ errorMessage }}
      </div>

      <!-- Form Login -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Input Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Email Pengguna</label>
          <input 
            v-model="form.email"
            type="email" 
            required
            placeholder="nama@smk.sch.id"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
          />
        </div>

        <!-- Input Password dengan Tambahan Fitur Tombol Mata -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <div class="relative mt-1">
            <input 
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'" 
              required
              placeholder="••••••••"
              class="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
            />
            <!-- Tombol Icon Mata (Buka/Tutup Dinamis) -->
            <!-- Tombol Icon Mata Berdasarkan Gambar Screen Shot 2026-06-04 at 1.45.59 pm.png -->
            <button 
              type="button"
              @click="togglePassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <!-- Icon Mata Terbuka (Show) -->
              <svg v-if="showPassword" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

              <!-- Icon Mata Ditutup / Dicoret (Hide) -->
              <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Fitur Lupa Password -->
        <div class="flex justify-end">
          <button 
            type="button" 
            @click="handleForgotPassword"
            class="text-sm text-blue-600 hover:underline font-medium"
          >
            Lupa Password?
          </button>
        </div>

        <!-- Tombol Submit -->
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md disabled:bg-blue-400"
        >
          {{ isLoading ? 'Sedang Memproses...' : 'MASUK' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')

// --- TAMBAHAN BARU: State dan fungsi untuk kontrol show/hide password ---
const showPassword = ref(false) 
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
// ------------------------------------------------------------------------

// Reactive object menampung input (Tetap sama)
const form = reactive({
  email: '',
  password: ''
})

// Fungsi login ke backend Lumen (Tetap sama)
const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.post('http://localhost:8889/api/login', {
      email: form.email,
      password: form.password
    })

    if (response.data.success) {
      const token = response.data.token
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_role', response.data.user.role)
      localStorage.setItem('user_name', response.data.user.nama_user)

      router.push('/')
    }
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message || 'Email atau Password salah!'
    } else {
      errorMessage.value = 'Gagal terhubung ke server backend. Pastikan server Lumen menyala.'
    }
  } finally {
    isLoading.value = false
  }
}

// Fungsi alert penanganan lupa password (Tetap sama)
const handleForgotPassword = () => {
  alert('Silakan hubungi pihak Sarpras selaku Super Admin untuk melakukan reset password akun Anda.')
}
</script>