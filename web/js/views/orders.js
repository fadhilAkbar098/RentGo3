/* =====================================================
   Halaman: Pesanan Saya
   Template untuk Views.orders.
   ===================================================== */

Views.orders = () => { const list = store.get('rg_orders_' + S.user.email) || []; return `
  <div class="max-w-2xl mx-auto"><h1 class="text-xl font-extrabold text-brand-900 mb-5">Pesanan Saya</h1>
  ${list.length ? `<div class="space-y-4">${list.map(o => `<div class="card p-5"><div class="flex justify-between items-start"><b class="text-brand-900">${o.name}</b><span class="text-xs font-semibold text-brand-700 bg-brand-100 rounded-full px-3 py-1">Dikonfirmasi</span></div><div class="mt-2">${row('No. Pesanan', o.no)}${row('Tanggal', o.date)}${row('Total', rp(o.total), true)}</div></div>`).join('')}</div>`
  : `<div class="card p-10 text-center"><p class="text-slate-500 mb-4">Belum ada pesanan. Pilih kendaraan untuk mulai memesan.</p><button class="btn !w-auto px-8 mx-auto" onclick="nav('vehicles')">Pilih Kendaraan</button></div>`}</div>`; };
