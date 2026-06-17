<template>
  <div class="flex min-h-screen bg-gray-100 font-sans text-left relative">
    <Sidebar />

    <main class="flex-1 p-8">
      <header class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 capitalize flex items-center gap-2">
            Selamat Datang, {{ namaUser }}
          </h1>
          <p class="text-gray-500 text-sm mt-1">
            Hak Akses Sistem: <span class="bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider border border-indigo-200/50">{{ roleUser }}</span>
          </p>
        </div>
        
        <div v-if="roleUser === 'sarpras'" class="flex gap-2">
          <button @click="router.push('/master-barang')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25m-9-5.25v9l9 5.25" />
            </svg>
            Kelola Master Barang
          </button>
          <button @click="router.push('/kelola-user')" class="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            Kelola Akun Pengguna
          </button>
        </div>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div v-for="stat in statsDinamis" :key="stat.label" 
          class="bg-white p-6 rounded-2xl shadow-sm border-l-8 flex items-center justify-between"
          :class="stat.color"
        >
          <div>
            <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{{ stat.label }}</p>
            <p class="text-3xl font-black text-gray-800 mt-1">{{ stat.value }}</p>
          </div>
          <div class="pr-2">
            <svg v-if="stat.type === 'total'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-indigo-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
            </svg>
            <svg v-else-if="stat.type === 'pending'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-amber-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <svg v-else-if="stat.type === 'proses'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-purple-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <svg v-else-if="stat.type === 'disetujui'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-emerald-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <svg v-else-if="stat.type === 'ditolak'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-red-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200">
            
            <div class="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 class="font-bold text-gray-800">
                {{ roleUser === 'jurusan' ? 'Daftar Berkas Pengajuan Jurusan Saya' : 'Antrean Validasi Berkas Berantai Sekolah' }}
              </h3>
              
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
                    v-for="tab in tabList" 
                    :key="tab" @click="tabAktif = tab" class="px-3 py-1.5 rounded-lg transition"
                    :class="tabAktif === tab ? 'bg-white text-indigo-950 shadow-sm font-extrabold' : 'hover:text-gray-800'"
                  >
                    {{ tab }}
                  </button>
                </div>
              </div>
            </div>

            <div class="overflow-x-auto rounded-b-2xl">
              <table class="w-full text-sm table-fixed min-w-[700px]">
                <thead>
                  <tr class="bg-gray-50 text-gray-400 text-xs uppercase font-bold text-left border-b border-gray-100">
                    <th class="px-6 py-4" :class="roleUser === 'jurusan' ? 'w-[45%]' : 'w-[35%]'">Kode & Item Utama</th>
                    <th v-if="roleUser !== 'jurusan'" class="px-6 py-4 w-[15%]">Asal Instansi</th>
                    <th class="px-6 py-4" :class="roleUser === 'jurusan' ? 'w-[20%]' : 'w-[20%]'">Tanggal Masuk</th>
                    <th class="px-6 py-4 text-right" :class="roleUser === 'jurusan' ? 'w-[35%]' : 'w-[30%]'">Status Alur</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr 
                    v-for="item in pengajuanTerbatas" :key="item.id" @click="bukaDetail(item)"
                    class="hover:bg-gray-50/80 transition cursor-pointer"
                  >
                    <td class="px-6 py-4 pr-2">
                      <div class="font-bold text-indigo-600">{{ item.id }}</div>
                      <div class="text-xs text-gray-600 font-semibold mt-0.5">{{ item.item }}</div>
                    </td>
                    <td v-if="roleUser !== 'jurusan'" class="px-6 py-4 font-bold text-xs text-indigo-950 pr-2">
                      Jurusan {{ item.asal_jurusan }}
                    </td>
                    <td class="px-6 py-4 text-gray-400 text-xs font-medium">{{ item.tgl }}</td>
                    <td class="px-6 py-4 text-right">
                      <span :class="getStatusBadgeClass(item.status)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border inline-block whitespace-nowrap">
                        {{ formatStatusTeks(item.status, item.catatan_opsional) }}
                      </span>
                    </td>
                  </tr>
                  
                  <tr v-if="pengajuanTersaring.length === 0">
                    <td :colspan="roleUser === 'jurusan' ? 3 : 4" class="px-6 py-12 text-center text-gray-400 text-xs italic">
                      Tidak ada antrean data berkas pengajuan saat ini.
                    </td>
                  </tr>

                  <tr v-if="pengajuanTersaring.length > 5" class="bg-gray-50/30">
                    <td :colspan="roleUser === 'jurusan' ? 3 : 4" class="px-6 py-5 text-center">
                      <span class="text-[11px] font-medium text-gray-500 mr-2">Menampilkan 5 dari total {{ pengajuanTersaring.length }} berkas pengajuan.</span>
                      <router-link :to="linkLihatSemua" class="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100">
                        Lihat Semua di Halaman {{ namaHalamanLengkap }} &rarr;
                      </router-link>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1 space-y-6">
          
          <template v-if="roleUser === 'jurusan'">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-emerald-100 text-emerald-600 p-2.5 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 text-sm">Pagu Anggaran Jurusan</h3>
                  <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Periode Semester Ini</p>
                </div>
              </div>
              
              <div class="bg-gray-50 rounded-xl p-4 border border-gray-200/60 space-y-3">
                <div class="flex justify-between items-center pb-2 border-b border-gray-200/60">
                  <span class="text-xs font-bold text-gray-500">Pagu Awal Alokasi:</span>
                  <span class="text-xs font-black text-gray-700">{{ paguAnggaranJurusan > 0 ? formatRupiah(paguAnggaranJurusan) : 'Belum Diatur' }}</span>
                </div>
                <div class="flex justify-between items-center pb-2 border-b border-gray-200/60">
                  <span class="text-xs font-bold text-gray-500">Dana Terpakai (Disetujui):</span>
                  <span class="text-xs font-black text-red-500">- {{ formatRupiah(danaTerpakaiJurusan) }}</span>
                </div>
                <div class="flex justify-between items-center pt-1">
                  <span class="text-xs font-black uppercase text-indigo-900 tracking-wider">Sisa Saldo:</span>
                  <span class="text-xl font-black" :class="sisaSaldoJurusan > 0 ? 'text-emerald-600' : (sisaSaldoJurusan < 0 ? 'text-red-600' : 'text-gray-400')">
                    {{ paguAnggaranJurusan > 0 ? formatRupiah(sisaSaldoJurusan) : 'Rp 0' }}
                  </span>
                </div>
              </div>
              
              <p class="text-[9px] text-gray-400 leading-relaxed mt-3 italic text-center px-2">
                *Sisa saldo akan berkurang otomatis jika pengajuan Anda telah disetujui penuh oleh Kepsek.
              </p>
            </div>

            <div class="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl border border-indigo-950">
              <h3 class="font-bold text-lg mb-2">Butuh Pengadaan Baru?</h3>
              <p class="text-indigo-200 text-xs mb-6 leading-relaxed">
                Silakan pilih barang siap pakai dari daftar katalog umum sekolah atau ajukan spesifikasi barang mandiri secara terperinci.
              </p>
              <router-link to="/pengajuan" class="bg-white text-indigo-950 px-4 py-3 rounded-xl font-black text-sm hover:bg-indigo-50 transition flex items-center justify-center gap-2 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                BUAT NOTA PENGAJUAN
              </router-link>
            </div>
          </template>

          <template v-else>
            <div class="bg-gradient-to-br from-slate-800 to-indigo-950 text-white p-6 rounded-2xl shadow-xl border border-slate-900">
              <h3 class="font-bold text-lg mb-1 flex items-center gap-2">
                Panel Peninjau Dokumen
              </h3>
              <p class="text-indigo-200/80 text-xs leading-relaxed mb-5 border-b border-white/10 pb-3">
                Periksa kecocokan data fisik barang, kesesuaian anggaran, dan volume kuantitas secara saksama sebelum mengambil keputusan persetujuan.
              </p>
              <div class="bg-black/20 p-4 rounded-xl border border-white/5 text-[11px] text-indigo-100 leading-relaxed">
                <span v-if="roleUser === 'sarpras'">💡 <b>Tanggung Jawab Sarpras:</b> Validasi kelayakan infrastruktur teknis serta spesifikasi barang sekolah.</span>
                <span v-else-if="roleUser === 'keuangan'">💡 <b>Tanggung Jawab Keuangan:</b> Validasi ketersediaan dana melalui pagu anggaran internal.</span>
                <span v-else-if="roleUser === 'kepsek'">💡 <b>Tanggung Jawab Kepsek:</b> Pengambil keputusan akhir secara regulasi institusi.</span>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div class="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 class="font-bold text-gray-800 text-sm flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-amber-500"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>
                  Klasemen Serapan Dana
                </h3>
              </div>
              <div class="p-5">
                <div v-if="leaderboardJurusan.length === 0" class="text-center text-xs text-gray-400 italic py-4">
                  Belum ada data penyerapan anggaran.
                </div>
                <div v-else class="space-y-4">
                  <div v-for="(rank, index) in leaderboardJurusan" :key="rank.nama" class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border"
                           :class="index === 0 ? 'bg-amber-100 text-amber-700 border-amber-200 shadow-sm' : 
                                  (index === 1 ? 'bg-slate-100 text-slate-600 border-slate-200' : 
                                  (index === 2 ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                                  'bg-white text-gray-400 border-gray-100'))">
                        #{{ index + 1 }}
                      </div>
                      <div>
                        <p class="text-xs font-bold text-gray-800">Jurusan {{ rank.nama }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-[11px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                        {{ formatRupiah(rank.total) }}
                      </p>
                    </div>
                  </div>
                </div>
                <p class="text-[9px] text-gray-400 text-center mt-4 italic border-t border-gray-100 pt-3">
                  *Diurutkan berdasarkan total nilai pengajuan yang telah Disetujui Penuh.
                </p>
              </div>
            </div>
          </template>

        </div>
      </div>
    </main>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-6 relative border border-gray-100 overflow-hidden">
        
        <div class="flex justify-between items-start border-b border-gray-100 pb-4 mb-4 bg-gray-50/50 -mx-6 px-6 -mt-6 pt-6">
          <div>
            <span class="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
              {{ isEditing ? 'Panel Form Perbaikan Berkas' : 'Detail Kelayakan Nota Pengadaan' }}
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
            <table class="w-full text-left text-xs relative table-fixed">
              <thead class="bg-gray-50 text-gray-500 font-bold uppercase text-[9px] tracking-wider border-b sticky top-0 z-10 shadow-sm">
                <tr>
                  <th class="px-4 py-3" :class="isEditing ? 'w-[35%]' : 'w-[45%]'">Nama Komoditas & Spesifikasi Teknis</th>
                  <th class="px-4 py-3 text-center" :class="isEditing ? 'w-[15%]' : 'w-[15%]'">Kuantitas</th>
                  <th class="px-4 py-3 text-right" :class="isEditing ? 'w-[20%]' : 'w-[20%]'">Harga Perkiraan</th>
                  <th class="px-4 py-3 text-right" :class="isEditing ? 'w-[20%]' : 'w-[20%]'">Subtotal</th>
                  <th v-if="isEditing" class="px-4 py-3 text-center w-[10%]">Hapus</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 font-medium text-gray-700">
                <tr v-for="(subItem, index) in selectedPengajuan.list_barang" :key="subItem.id" class="hover:bg-gray-50/50">
                  <td class="px-4 py-3">
                    <div class="font-bold text-gray-800 break-words">{{ subItem.nama_barang }}</div>
                    <div class="text-[11px] text-gray-400 mt-0.5 font-medium italic break-words">{{ subItem.keterangan }}</div>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <input v-if="isEditing" type="number" v-model.number="subItem.jumlah" min="1" class="w-16 p-1 border border-gray-300 rounded text-center font-bold text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    <span v-else class="font-bold text-gray-800">{{ subItem.jumlah }} Unit</span>
                  </td>
                  <td class="px-4 py-3 text-right text-gray-500 whitespace-nowrap">
                    {{ formatRupiah(subItem.harga_estimasi) }}
                  </td>
                  <td class="px-4 py-3 text-right font-bold text-indigo-950 whitespace-nowrap">
                    {{ formatRupiah(subItem.jumlah * subItem.harga_estimasi) }}
                  </td>
                  <td v-if="isEditing" class="px-4 py-3 text-center">
                    <button @click="hapusItemBarangDariRevisi(index)" class="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition border border-transparent hover:border-red-100 mx-auto block" title="Hapus Barang Ini">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
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

        <div v-if="isEditing || (roleUser === 'jurusan' && selectedPengajuan.status === 'ditolak') || (roleUser === 'sarpras' && selectedPengajuan.status === 'pending_sarpras') || (roleUser === 'keuangan' && selectedPengajuan.status === 'pending_keuangan') || (roleUser === 'kepsek' && selectedPengajuan.status === 'pending_kepsek')" class="flex items-center border-t border-gray-100 pt-4 justify-end gap-2">
          
          <template v-if="isEditing">
            <span class="text-[10px] text-gray-400 italic mr-auto">Spesifikasi sudah dipatenkan. Anda hanya bisa mengubah jumlah unit atau menghapus barang.</span>
            <button @click="batalRevisiLokal" class="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded-xl text-xs transition">Batal</button>
            <button @click="simpanRevisi" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-md">
              Simpan & Ajukan Ulang
            </button>
          </template>

          <template v-else>
            <div v-if="roleUser === 'jurusan' && selectedPengajuan.status === 'ditolak'" class="flex gap-2 w-full justify-start">
              <button @click="bukaModeRevisi" class="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm">
                Lakukan Perbaikan Berkas
              </button>
              <button @click="konfirmasiHapusPengajuan" class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold px-4 py-2 rounded-xl text-xs transition">
                Batalkan Nota Berkas
              </button>
            </div>

            <div v-else-if="roleUser === 'sarpras' && selectedPengajuan.status === 'pending_sarpras'" class="flex gap-2 w-full justify-end">
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
          </template>
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
        
        <textarea v-model="catatanInput" @input="errorCatatan = ''" rows="4" :class="['w-full p-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition', errorCatatan ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500 bg-red-50/30' : 'border-gray-200 focus:ring-amber-500/50 focus:border-amber-500']" placeholder="Ketik alasan revisi..."></textarea>
        
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

    <div v-if="isHapusModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <div class="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 relative border border-red-100 text-center">
        <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-red-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Batalkan Berkas?</h3>
        <p class="text-sm text-gray-500 leading-relaxed mb-6">
          Apakah Anda yakin ingin membatalkan dokumen pengajuan <b>{{ selectedPengajuan.id }}</b> ini secara permanen? Data yang dibatalkan akan dihapus.
        </p>
        <div class="flex items-center justify-center gap-3">
          <button @click="isHapusModalOpen = false" class="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition w-full">Tidak, Kembali</button>
          <button @click="eksekusiHapusPengajuan" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-md w-full">Ya, Batalkan!</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter() 

const namaUser = ref('Pengguna')
const roleUser = ref('jurusan')
const tabAktif = ref('Semua')

const filterJurusan = ref('Semua Jurusan') 
const isFilterDropdownOpen = ref(false)

const isModalOpen = ref(false)
const isEditing = ref(false)
const selectedPengajuan = ref({})
const daftarPengajuan = ref([])

const isCatatanModalOpen = ref(false)
const catatanInput = ref('')
const pendingStatus = ref('')
const errorCatatan = ref('')

const isHapusModalOpen = ref(false)

const paguAnggaranJurusan = ref(0)
const inisialJurusanAktif = ref('')

const danaTerpakaiJurusan = computed(() => {
  if (roleUser.value !== 'jurusan') return 0
  const pengajuanDisetujui = daftarPengajuan.value.filter(p => {
    const inisialDokumen = String(p.id).split('-')[1]
    return inisialDokumen === inisialJurusanAktif.value && p.status === 'disetujui'
  })
  let totalTerpakai = 0
  pengajuanDisetujui.forEach(p => {
    totalTerpakai += hitungTotalSemuaBarang(p.list_barang)
  })
  return totalTerpakai
})

const sisaSaldoJurusan = computed(() => {
  return paguAnggaranJurusan.value - danaTerpakaiJurusan.value
})

const pilihFilterJurusan = (jurusan) => {
  filterJurusan.value = jurusan
  isFilterDropdownOpen.value = false
}

const tabList = computed(() => {
  if (roleUser.value === 'keuangan') {
    return ['Semua', 'Menunggu', 'Pending Kepsek', 'Siap Rekap', 'Ditolak']
  }
  return ['Semua', 'Menunggu', 'Disetujui', 'Ditolak']
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
        let namaPembuatDB = item.nama_pembuat || localStorage.getItem('user_name') || 'PPLG'
        let namaUpper = namaPembuatDB.toUpperCase()
        
        if (namaUpper === 'JURUSAN' || namaUpper === 'ADMIN' || namaUpper === 'ADMIN JURUSAN') {
          namaPembuatDB = 'PPLG'
          namaUpper = 'PPLG'
        }
        
        let inisial = 'JUR' 
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
          inisial = 'TE' 
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

const hitungTotalSemuaBarang = (list) => {
  if (!list || list.length === 0) return 0
  return list.reduce((total, barang) => total + (Number(barang.jumlah) * Number(barang.harga_estimasi)), 0)
}

// LOGIKA BARU: LEADERBOARD JURUSAN TOP SPENDER
const leaderboardJurusan = computed(() => {
  if (roleUser.value === 'jurusan') return []

  const pengajuanDisetujui = daftarPengajuan.value.filter(p => p.status === 'disetujui')
  
  const rekap = {}
  pengajuanDisetujui.forEach(p => {
    const totalNota = hitungTotalSemuaBarang(p.list_barang)
    if (!rekap[p.asal_jurusan]) {
      rekap[p.asal_jurusan] = 0
    }
    rekap[p.asal_jurusan] += totalNota
  })

  return Object.keys(rekap)
    .map(jurusan => ({
      nama: jurusan,
      total: rekap[jurusan]
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5) // Ambil Top 5 Teratas
})

const listJurusanTersedia = computed(() => {
  const jurusanSet = new Set(daftarPengajuan.value.map(p => p.asal_jurusan))
  return ['Semua Jurusan', ...Array.from(jurusanSet).sort()]
})

const statsDinamis = computed(() => {
  const total = daftarPengajuan.value.length

  if (roleUser.value === 'sarpras') {
    const pending = daftarPengajuan.value.filter(p => p.status === 'pending_sarpras').length
    const disetujui = daftarPengajuan.value.filter(p => ['pending_keuangan', 'pending_kepsek', 'disetujui'].includes(p.status)).length
    const ditolak = daftarPengajuan.value.filter(p => p.status === 'ditolak' && String(p.catatan_opsional).toUpperCase().includes('SARPRAS')).length
    return [
      { id: 'Semua', type: 'total', label: 'Total Berkas Masuk', value: total, color: 'border-indigo-500' },
      { id: 'Menunggu', type: 'pending', label: 'Antrean Validasi', value: pending, color: 'border-amber-500' },
      { id: 'Disetujui', type: 'disetujui', label: 'Lolos Sarpras', value: disetujui, color: 'border-green-500' },
      { id: 'Ditolak', type: 'ditolak', label: 'Ditolak Sarpras', value: ditolak, color: 'border-red-500' }
    ]
  }
  
  if (roleUser.value === 'keuangan') {
    const pending = daftarPengajuan.value.filter(p => p.status === 'pending_keuangan').length
    const prosesKepsek = daftarPengajuan.value.filter(p => p.status === 'pending_kepsek').length
    const disetujui = daftarPengajuan.value.filter(p => p.status === 'disetujui').length
    const ditolak = daftarPengajuan.value.filter(p => p.status === 'ditolak' && String(p.catatan_opsional).toUpperCase().includes('KEUANGAN')).length
    
    const totalBersihKeuangan = pending + prosesKepsek + disetujui + ditolak

    return [
      { id: 'Semua', type: 'total', label: 'Total Berkas Masuk', value: totalBersihKeuangan, color: 'border-indigo-500' },
      { id: 'Menunggu', type: 'pending', label: 'Menunggu Verifikasi', value: pending, color: 'border-amber-500' },
      { id: 'Proses', type: 'proses', label: 'Pending Kepsek', value: prosesKepsek, color: 'border-purple-500' },
      { id: 'Disetujui', type: 'disetujui', label: 'Siap Rekap / Disetujui', value: disetujui, color: 'border-emerald-500' }
    ]
  }

  if (roleUser.value === 'kepsek') {
    const pending = daftarPengajuan.value.filter(p => p.status === 'pending_kepsek').length
    const disetujui = daftarPengajuan.value.filter(p => p.status === 'disetujui').length
    const ditolak = daftarPengajuan.value.filter(p => p.status === 'ditolak' && String(p.catatan_opsional).toUpperCase().includes('KEPSEK')).length
    
    const totalBersihKepsek = pending + disetujui + ditolak

    return [
      { id: 'Semua', type: 'total', label: 'Total Berkas Masuk', value: totalBersihKepsek, color: 'border-indigo-500' },
      { id: 'Menunggu', type: 'pending', label: 'Antrean Validasi', value: pending, color: 'border-amber-500' },
      { id: 'Disetujui', type: 'disetujui', label: 'Telah Disetujui', value: disetujui, color: 'border-green-500' },
      { id: 'Ditolak', type: 'ditolak', label: 'Ditolak Kepsek', value: ditolak, color: 'border-red-500' }
    ]
  }

  const disetujui = daftarPengajuan.value.filter(p => p.status === 'disetujui').length
  const ditolak = daftarPengajuan.value.filter(p => p.status === 'ditolak').length
  const pending = total - disetujui - ditolak
  return [
    { id: 'Semua', type: 'total', label: 'Total Berkas Masuk', value: total, color: 'border-indigo-500' },
    { id: 'Menunggu', type: 'pending', label: 'Antrean Sesi Proses', value: pending, color: 'border-amber-500' },
    { id: 'Disetujui', type: 'disetujui', label: 'Berkas Goal Disetujui', value: disetujui, color: 'border-green-500' },
    { id: 'Ditolak', type: 'ditolak', label: 'Berkas Ditolak', value: ditolak, color: 'border-red-500' }
  ]
})

const pengajuanTersaring = computed(() => {
  let hasilFilter = daftarPengajuan.value
  
  if (roleUser.value === 'keuangan') {
    hasilFilter = hasilFilter.filter(p => 
      p.status === 'pending_keuangan' || 
      p.status === 'pending_kepsek' || 
      p.status === 'disetujui' || 
      (p.status === 'ditolak' && String(p.catatan_opsional).toUpperCase().includes('KEUANGAN'))
    )
  } else if (roleUser.value === 'kepsek') {
    hasilFilter = hasilFilter.filter(p => 
      p.status === 'pending_kepsek' || 
      p.status === 'disetujui' || 
      (p.status === 'ditolak' && String(p.catatan_opsional).toUpperCase().includes('KEPSEK'))
    )
  }

  if (filterJurusan.value !== 'Semua Jurusan') {
    hasilFilter = hasilFilter.filter(p => p.asal_jurusan === filterJurusan.value)
  }

  if (tabAktif.value === 'Semua') return hasilFilter

  if (roleUser.value === 'sarpras') {
    if (tabAktif.value === 'Menunggu') return hasilFilter.filter(p => p.status === 'pending_sarpras')
    if (tabAktif.value === 'Disetujui') return hasilFilter.filter(p => ['pending_keuangan', 'pending_kepsek', 'disetujui'].includes(p.status))
    if (tabAktif.value === 'Ditolak') return hasilFilter.filter(p => p.status === 'ditolak' && String(p.catatan_opsional).toUpperCase().includes('SARPRAS'))
  } else if (roleUser.value === 'keuangan') {
    if (tabAktif.value === 'Menunggu') return hasilFilter.filter(p => p.status === 'pending_keuangan')
    if (tabAktif.value === 'Pending Kepsek') return hasilFilter.filter(p => p.status === 'pending_kepsek')
    if (tabAktif.value === 'Siap Rekap') return hasilFilter.filter(p => p.status === 'disetujui')
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

const pengajuanTerbatas = computed(() => {
  return pengajuanTersaring.value.slice(0, 5)
})

const namaHalamanLengkap = computed(() => {
  if (roleUser.value === 'jurusan') return 'Riwayat'
  if (roleUser.value === 'sarpras') return 'Verifikasi Teknis'
  if (roleUser.value === 'keuangan') return 'Verifikasi Anggaran'
  if (roleUser.value === 'kepsek') return 'Persetujuan Akhir'
  return 'Riwayat'
})

const linkLihatSemua = computed(() => {
  if (roleUser.value === 'jurusan') return '/riwayat'
  if (roleUser.value === 'sarpras') return '/verifikasi-teknis'
  if (roleUser.value === 'keuangan') return '/verifikasi-anggaran'
  if (roleUser.value === 'kepsek') return '/persetujuan-akhir'
  return '/riwayat'
})

const bukaDetail = (item) => {
  selectedPengajuan.value = JSON.parse(JSON.stringify(item))
  isModalOpen.value = true
  isEditing.value = false
}

const bukaModeRevisi = () => {
  isEditing.value = true
}

const batalRevisiLokal = () => {
  isEditing.value = false
  const dataAsli = daftarPengajuan.value.find(p => p.id_asli === selectedPengajuan.value.id_asli)
  if (dataAsli) {
    selectedPengajuan.value = JSON.parse(JSON.stringify(dataAsli))
  }
}

const hapusItemBarangDariRevisi = (index) => {
  if (selectedPengajuan.value.list_barang.length <= 1) {
    alert('Minimal harus ada 1 barang dalam pengajuan! Jika ingin membatalkan pengajuan ini sepenuhnya, silakan klik tombol "Batal" lalu pilih "Batalkan Nota Berkas".')
    return
  }
  selectedPengajuan.value.list_barang.splice(index, 1)
}

const simpanRevisi = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    await axios.post(`http://localhost:8889/api/pengajuan-detail/${selectedPengajuan.value.id_asli}`, {
      list_barang: selectedPengajuan.value.list_barang
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    isModalOpen.value = false
    fetchDashboardData()
  } catch (error) {
    console.error('Gagal menyimpan revisi:', error)
    alert('ERROR SISTEM: ' + (error.response?.data?.message || 'Server Lumen Gagal Merespon!'))
  }
}

const konfirmasiHapusPengajuan = () => {
  isHapusModalOpen.value = true
}

const eksekusiHapusPengajuan = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    await axios.delete(`http://localhost:8889/api/pengajuan/${selectedPengajuan.value.id_asli}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    isHapusModalOpen.value = false
    isModalOpen.value = false
    fetchDashboardData() 
  } catch (error) {
    console.error('Gagal menghapus pengajuan:', error)
    alert('Gagal membatalkan nota berkas.')
  }
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
    fetchDashboardData()
  } catch (error) {
    console.error('Gagal memperbarui status verifikator:', error)
    alert('GAGAL KIRIM KEPUTUSAN! Error: ' + (error.response?.data?.message || 'Server backend bermasalah.'))
  }
}

const cekPaguAnggaran = () => {
  if (roleUser.value === 'jurusan') {
    const namaUserRaw = (localStorage.getItem('user_name') || 'PPLG').toUpperCase()
    let inisial = 'PPLG' 
    
    const kata = namaUserRaw.split(' ')

    if (namaUserRaw.includes('PPLG') || namaUserRaw.includes('PERANGKAT LUNAK')) inisial = 'PPLG'
    else if (namaUserRaw.includes('TJKT') || namaUserRaw.includes('JARINGAN')) inisial = 'TJKT'
    else if (namaUserRaw.includes('DPIB') || namaUserRaw.includes('BANGUNAN')) inisial = 'DPIB'
    else if (namaUserRaw.includes('BROADCASTING') || namaUserRaw.includes('BC')) inisial = 'BC'
    else if (namaUserRaw.includes('ELEKTRONIKA') || kata.includes('TE')) inisial = 'TE'
    else if (namaUserRaw.includes('KETENAGALISTRIKAN') || namaUserRaw.includes('TLK')) inisial = 'TLK'
    else if (namaUserRaw.includes('MESIN') || namaUserRaw.includes('MSN')) inisial = 'MSN'
    else if (namaUserRaw.includes('OTOMOTIF') || namaUserRaw.includes('OTM')) inisial = 'OTM'

    inisialJurusanAktif.value = inisial

    const dataPagu = localStorage.getItem('data_pagu_jurusan')
    if (dataPagu) {
      const parsed = JSON.parse(dataPagu)
      paguAnggaranJurusan.value = parsed[inisial] || 0
    }
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
  if (status === 'disetujui') {
    if (roleUser.value === 'keuangan') return 'Siap Rekap'
    return 'Disetujui'
  }
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
  roleUser.value = (localStorage.getItem('user_role') || 'jurusan').toLowerCase()
  fetchDashboardData()
  cekPaguAnggaran()
})
</script>