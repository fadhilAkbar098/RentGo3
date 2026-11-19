/* =====================================================
   Halaman: Pilih Kendaraan
   Template untuk Views.vehicles.
   ===================================================== */

Views.vehicles = () => {
    const list = V.filter(v => (S.filter === 'semua' || v.type === S.filter) && v.name.toLowerCase().includes(S.q.toLowerCase()));
    return `<h1 class="text-xl font-extrabold text-brand-900 mb-5">Pilih Kendaraan</h1>
    <div class="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1">${['semua','mobil','motor','travel'].map(f => `<button class="chip ${S.filter===f?'on':''}" onclick="S.filter='${f}';render()">${f[0].toUpperCase()+f.slice(1)}</button>`).join('')}</div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">${list.map(vCard).join('') || '<p class="text-slate-500">Kendaraan tidak ditemukan. Coba kata kunci lain.</p>'}</div>`;
  };
