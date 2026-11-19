/* =====================================================
   Halaman: Detail Kendaraan
   Template untuk Views.detail.
   ===================================================== */

Views.detail = () => { const v = veh(); return `
  <div class="max-w-3xl mx-auto">${head('Detail Kendaraan')}
    <div class="card overflow-hidden">
      ${photo(v, 'aspect-[16/9]')}
      <div class="p-6 space-y-6">
        <div class="flex items-start justify-between gap-4">
          <div><h2 class="text-2xl font-extrabold text-brand-900">${v.name}</h2><p class="text-sm text-slate-500 mt-1">${v.cat} • ${v.seat}</p>
            <p class="flex items-center gap-1 text-sm mt-2">${star}<b>${v.rate}</b> <span class="text-slate-500">(${v.rev} review)</span></p></div>
          <p class="text-2xl font-extrabold text-brand-600 whitespace-nowrap">${rp(v.price)}<span class="text-sm font-medium text-slate-400">/hari</span></p>
        </div>
        <div><h3 class="h2">Fasilitas</h3><div class="grid grid-cols-4 gap-3">${FACS.map(([i,l]) => `<div class="rounded-xl bg-brand-50 py-3 flex flex-col items-center gap-1.5 text-xs font-medium text-brand-700">${ic(i)}${l}</div>`).join('')}</div></div>
        <div><h3 class="h2">Deskripsi</h3><p class="text-sm leading-relaxed text-slate-600">${v.name} adalah pilihan tepat untuk perjalanan Anda. Nyaman, irit bahan bakar, dan cocok untuk perjalanan jarak dekat maupun jauh.</p></div>
        <button class="btn" onclick="requireLogin(() => go('booking'))">Lanjut Booking</button>
      </div>
    </div></div>`; };
