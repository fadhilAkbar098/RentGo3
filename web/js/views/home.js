/* =====================================================
   Halaman: Beranda (landing page)
   ===================================================== */

const sec = (title, sub, body) => `
<section>
  <div class="max-w-xl mb-8"><h2 class="text-3xl font-extrabold tracking-tight text-brand-900">${title}</h2><p class="mt-2 text-slate-500">${sub}</p></div>
  ${body}
</section>`;

Views.home = () => `
<div class="space-y-24 pb-8">

  <!-- Hero + pencarian cepat -->
  <section>
    <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white px-6 pt-10 pb-24 lg:px-14 lg:pt-16 lg:pb-28">
      <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-500/30 blur-3xl"></div>
      <div class="relative grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-brand-100">${star} Rental terpercaya di Yogyakarta</p>
          <h1 class="mt-5 text-4xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">Perjalanan nyaman, mulai dari sini.</h1>
          <p class="mt-5 max-w-md leading-relaxed text-brand-100">Sewa mobil, motor, dan travel keluarga dengan harga transparan, unit terawat, dan layanan 24 jam.</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <button onclick="nav('vehicles')" class="rounded-full bg-white text-brand-700 font-semibold px-7 py-3.5 shadow-lg transition hover:bg-brand-50">Lihat Armada</button>
            <button onclick="nav('travel')" class="rounded-full border border-white/40 font-semibold px-7 py-3.5 transition hover:bg-white/10">Pesan Travel</button>
          </div>
          <dl class="mt-10 flex gap-10">
            ${[[V.length, 'Pilihan armada'], ['4.8', 'Rating rata-rata'], ['24 jam', 'Layanan pelanggan']].map(([n, l]) => `<div><dt class="text-2xl font-extrabold">${n}</dt><dd class="text-sm text-brand-100">${l}</dd></div>`).join('')}
          </dl>
        </div>
        <div class="relative">
          ${photo(V[0], 'rounded-3xl aspect-[4/3] shadow-2xl ring-1 ring-white/20')}
          <div class="absolute -bottom-5 left-4 sm:left-8 rounded-2xl bg-white text-slate-700 shadow-xl px-5 py-3">
            <p class="text-xs text-slate-500">${V[0].name}</p>
            <p class="font-extrabold text-brand-600">${rp(V[0].price)}<span class="text-xs font-medium text-slate-400">/hari</span></p>
          </div>
        </div>
      </div>
    </div>

    <form onsubmit="event.preventDefault();quickSearch()" class="card relative z-10 -mt-14 mx-4 lg:mx-14 p-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] items-end">
      <div><label class="lbl" for="qType">Jenis kendaraan</label>
        <select id="qType" class="field">${[['semua','Semua'],['mobil','Mobil'],['motor','Motor'],['travel','Travel']].map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></div>
      <div><label class="lbl" for="qDate">Tanggal ambil</label><input id="qDate" type="date" class="field" min="${iso(new Date())}" value="${S.b.date}"></div>
      <div><label class="lbl" for="qDays">Durasi</label>
        <select id="qDays" class="field">${[1, 2, 3, 5, 7].map(d => `<option value="${d}">${d} hari</option>`).join('')}</select></div>
      <button class="btn !w-auto px-8">Cari Kendaraan</button>
    </form>
  </section>

  <!-- Kategori -->
  ${sec('Mau sewa apa hari ini?', 'Pilih jenis kendaraan sesuai rencana perjalanan Anda.', `
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
      ${[['mobil', 'Mobil', 'car', 'Untuk keluarga dan bisnis'], ['motor', 'Motor', 'bike', 'Lincah menjelajah kota'], ['travel', 'Travel', 'van', 'Rombongan hingga 14 orang']].map(([k, l, a, d]) => `
      <button onclick="S.filter='${k}';S.q='';nav('vehicles')" class="card p-5 text-left transition hover:-translate-y-1 hover:shadow-xl">
        <div class="w-20 rounded-xl bg-brand-50 p-2">${art(a, '#93c5fd')}</div>
        <h3 class="mt-4 font-bold text-brand-900">${l}</h3><p class="text-sm text-slate-500">${d}</p></button>`).join('')}
      <button onclick="nav('travel')" class="card p-5 text-left transition hover:-translate-y-1 hover:shadow-xl">
        <div class="w-20 h-[3.4rem] rounded-xl bg-brand-50 grid place-items-center text-brand-600">${ic('pin', 'w-7 h-7')}</div>
        <h3 class="mt-4 font-bold text-brand-900">Paket Wisata</h3><p class="text-sm text-slate-500">Rute populer antar kota</p></button>
    </div>`)}

  <!-- Armada unggulan -->
  ${sec('Armada unggulan', 'Pilihan favorit pelanggan, siap jalan kapan saja.', `
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">${V.slice(0, 3).map(vCard).join('')}</div>
    <div class="mt-8 text-center"><button onclick="S.filter='semua';nav('vehicles')" class="btn-o !w-auto px-8">Lihat semua armada</button></div>`)}

  <!-- Keunggulan -->
  ${sec('Kenapa memilih RentGo', 'Kami urus detailnya supaya Anda fokus menikmati perjalanan.', `
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${FEATURES.map(([i, t, d]) => `<div class="card p-6"><div class="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 grid place-items-center">${ic(i, 'w-6 h-6')}</div><h3 class="mt-4 font-bold text-brand-900">${t}</h3><p class="mt-1 text-sm leading-relaxed text-slate-500">${d}</p></div>`).join('')}
    </div>`)}

  <!-- Cara pesan -->
  ${sec('Cara memesan', 'Tiga langkah singkat, tanpa ribet.', `
    <div class="grid md:grid-cols-3 gap-5">
      ${STEPS.map(([t, d], i) => `<div class="card p-6 flex gap-4"><span class="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand-700 to-brand-500 text-white font-bold grid place-items-center">${i + 1}</span><div><h3 class="font-bold text-brand-900">${t}</h3><p class="mt-1 text-sm leading-relaxed text-slate-500">${d}</p></div></div>`).join('')}
    </div>`)}

  <!-- Promo -->
  <section class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-900 to-brand-600 text-white p-8 lg:p-14 grid lg:grid-cols-2 gap-8 items-center">
    <div>
      <p class="text-brand-100">Promo hari ini</p>
      <h2 class="mt-2 text-4xl lg:text-5xl font-extrabold">Diskon 10%</h2>
      <p class="mt-3 max-w-sm text-brand-100">Sewa mobil untuk perjalanan keluarga. Gunakan kode promo saat pembayaran.</p>
      <button onclick="navigator.clipboard?.writeText('TRAVEL10');toast('Kode TRAVEL10 disalin')" class="mt-6 rounded-full bg-white text-brand-700 font-bold px-7 py-3 shadow-lg transition hover:bg-brand-50">Salin kode: TRAVEL10</button>
    </div>
    ${photo(V[1], 'rounded-3xl aspect-[16/10] shadow-2xl ring-1 ring-white/20')}
  </section>

  <!-- Testimoni -->
  ${sec('Kata pelanggan kami', 'Cerita singkat dari mereka yang sudah berangkat bersama RentGo.', `
    <div class="grid md:grid-cols-3 gap-5">
      ${REVIEWS.map(r => `<figure class="card p-6 flex flex-col">
        <div class="flex gap-0.5">${star.repeat(5)}</div>
        <blockquote class="mt-4 flex-1 leading-relaxed text-slate-600">${r.t}</blockquote>
        <figcaption class="mt-5 flex items-center gap-3"><span class="w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-bold grid place-items-center">${r.n[0]}</span><span class="text-sm"><b class="text-brand-900">${r.n}</b><br><span class="text-slate-500">${r.c}</span></span></figcaption>
      </figure>`).join('')}
    </div>`)}

  <!-- FAQ -->
  ${sec('Pertanyaan umum', 'Jawaban singkat sebelum Anda memesan.', `
    <div class="max-w-3xl space-y-3">
      ${FAQS.map(([q, a]) => `<details class="card group px-6 py-4">
        <summary class="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-brand-900">${q}<span class="text-brand-600 transition group-open:rotate-45">${ic('plus')}</span></summary>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">${a}</p></details>`).join('')}
    </div>`)}

  <!-- Ajakan akhir -->
  <section class="text-center">
    <h2 class="text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-900">Siap berangkat?</h2>
    <p class="mt-3 text-slate-500">Pilih kendaraan dan pesan sekarang. Konfirmasi langsung Anda terima.</p>
    <button onclick="nav('vehicles')" class="btn !w-auto px-10 mt-6 mx-auto">Mulai Pesan</button>
  </section>
</div>`;
