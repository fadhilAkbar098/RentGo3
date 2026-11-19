/* =====================================================
   Halaman: Pembayaran
   Template untuk Views.payment.
   ===================================================== */

Views.payment = () => { const v = veh(), b = S.b; return `
  <div class="max-w-2xl mx-auto">${head('Pembayaran')}
    <div class="card p-5 mb-5"><h2 class="h2">Rincian Pesanan</h2>
      <div class="flex items-center gap-4 rounded-xl bg-brand-50 p-3 mb-3">${photo(v, 'w-24 h-16 rounded-lg shrink-0')}<div><b class="text-brand-900">${v.name}</b><p class="text-xs text-slate-500">${v.cat} • ${v.seat}</p></div></div>
      ${row('Tanggal', fmt(new Date(b.date)) + ' - ' + fmt(retDate()))}${row('Lokasi jemput', b.pickup)}${row('Lokasi antar', b.drop)}
      <div class="border-t border-brand-100 mt-2 pt-2">${row('Harga sewa', rp(v.price))}${row('Durasi (' + b.days + ' hari)', rp(total()))}${row('Total', rp(total()), true)}</div></div>
    <div class="card p-5 mb-5"><h2 class="h2">Metode Pembayaran</h2><div class="space-y-2">
      ${['Transfer Bank','E-wallet (OVO, GoPay, DANA)','Kartu Kredit / Debit'].map(m => `<label class="flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition ${S.pay===m?'border-brand-600 bg-brand-50':'border-brand-100'}"><input type="radio" name="pm" class="accent-blue-600" ${S.pay===m?'checked':''} onchange="S.pay='${m}';render()"><span class="text-sm font-medium text-slate-800">${m}</span></label>`).join('')}</div></div>
    <button class="btn" onclick="payNow()">Bayar Sekarang</button></div>`; };
