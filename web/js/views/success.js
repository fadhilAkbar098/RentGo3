/* =====================================================
   Halaman: Booking Berhasil
   Template untuk Views.success.
   ===================================================== */

Views.success = () => { const o = S.last; return `
  <div class="max-w-md mx-auto text-center">
    <div class="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-brand-700 to-brand-500 grid place-items-center text-white shadow-lg shadow-brand-600/30">${ic('check','w-10 h-10')}</div>
    <h1 class="text-2xl font-extrabold text-brand-900 mt-5">Booking Berhasil!</h1><p class="text-sm text-slate-500 mt-1">Pesanan Anda telah dikonfirmasi. Silakan cek detail pesanan di bawah ini.</p>
    <div class="card p-5 mt-6 text-left">${row('No. Pesanan', o.no)}${row('Kendaraan', o.name)}${row('Tanggal', o.date)}${row('Lokasi jemput', o.pickup)}${row('Lokasi antar', o.drop)}<div class="border-t border-brand-100 mt-2 pt-2">${row('Total Pembayaran', rp(o.total), true)}</div></div>
    <div class="mt-5 space-y-3"><button class="btn" onclick="nav('orders')">Lihat Detail Pesanan</button><button class="btn-o" onclick="nav('home')">Kembali ke Beranda</button>
      <a href="https://wa.me/6281234567890" target="_blank" rel="noopener" class="card flex items-center gap-3 p-3 text-left"><span class="w-10 h-10 rounded-full bg-green-500 text-white grid place-items-center font-bold">W</span><span><b class="text-sm text-brand-900">Hubungi Kami</b><br><span class="text-xs text-slate-500">Butuh bantuan? Chat admin sekarang!</span></span></a></div>
  </div>`; };
