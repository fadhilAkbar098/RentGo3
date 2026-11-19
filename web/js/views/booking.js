/* =====================================================
   Halaman: Form Booking
   Template untuk Views.booking.
   ===================================================== */

Views.booking = () => { const v = veh(), b = S.b; return `
  <div class="max-w-2xl mx-auto">${head('Form Booking')}
    <div class="card p-4 flex items-center gap-4 mb-6">${photo(v, 'w-28 h-20 rounded-xl shrink-0')}
      <div><h2 class="font-bold text-brand-900">${v.name}</h2><p class="text-xs text-slate-500">${v.cat} • ${v.seat}</p>${b.route ? `<p class="text-xs text-brand-600 font-semibold mt-1">${b.route}</p>` : ''}</div></div>
    <div class="card p-5 space-y-6">
      <div><h3 class="h2">Tanggal &amp; Waktu</h3><div class="grid sm:grid-cols-2 gap-4">
        <div><label class="lbl">Tanggal ambil</label><input type="date" class="field" min="${iso(new Date())}" value="${b.date}" onchange="S.b.date=this.value||S.b.date;render()"></div>
        <div><label class="lbl">Waktu ambil</label><input type="time" class="field" value="${b.time}" onchange="S.b.time=this.value"></div>
        <div><label class="lbl">Tanggal kembali</label><input class="field !bg-slate-50 text-slate-500" readonly value="${fmt(retDate())}"></div>
        <div><label class="lbl">Durasi</label>${stepper(b.days + ' Hari', 'day')}</div></div></div>
      <div><h3 class="h2">Lokasi</h3><div class="grid sm:grid-cols-2 gap-4">
        <div><label class="lbl">Lokasi jemput</label>${select('pk', PLACES, b.pickup, "S.b.pickup=this.value")}</div>
        <div><label class="lbl">Lokasi pengantaran</label>${select('dr', PLACES, b.drop, "S.b.drop=this.value")}</div></div></div>
      <div class="flex items-center justify-between border-t border-brand-100 pt-4"><span class="text-sm text-slate-500">Total</span><span class="text-xl font-extrabold text-brand-600">${rp(total())}</span></div>
      <button class="btn" onclick="go('payment')">Lanjut ke Pembayaran</button>
    </div></div>`; };
