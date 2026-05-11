import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' // Tambahkan ini

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(), // Tambahkan ini
  ],
})