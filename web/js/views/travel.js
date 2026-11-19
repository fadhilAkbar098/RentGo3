/* =====================================================
   Halaman: Travel Keluarga
   Template untuk Views.travel.
   ===================================================== */

Views.travel = () => `
  <div class="max-w-2xl mx-auto space-y-6">
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 to-brand-600 text-white p-7">
      <h1 class="text-2xl font-extrabold">Travel Keluarga</h1><p class="text-sm text-brand-100 mt-2 max-w-xs">Perjalanan lebih nyaman untuk keluarga tercinta.</p>
      ${photo(V[2], 'mt-5 rounded-2xl aspect-[16/7]')}</div>
    <div class="grid grid-cols-4 gap-3 text-center text-xs font-medium text-brand-900">
      ${[['route','Rute Populer'],['bag','Kapasitas Besar'],['user','Supir Profesional'],['tag','Harga Terjangkau']].map(([i,l]) => `<div class="card py-4 flex flex-col items-center gap-2"><span class="text-brand-600">${ic(i,'w-6 h-6')}</span>${l}</div>`).join('')}</div>
    <div class="card p-5 space-y-4"><h2 class="h2 !mb-0">Pilih Rute</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div><label class="lbl">Dari</label>${select('tf', CITIES, S.tf || 'Yogyakarta', "S.tf=this.value")}</div>
        <div><label class="lbl">Ke</label>${select('tt', CITIES, S.tt || 'Semarang', "S.tt=this.value")}</div>
        <div><label class="lbl">Tanggal keberangkatan</label><input type="date" id="td" class="field" min="${iso(new Date())}" value="${S.td || iso(new Date(Date.now()+864e5))}" onchange="S.td=this.value"></div>
        <div><label class="lbl">Jumlah penumpang</label>${stepper(S.pax || 5, 'pax')}</div></div>
      <button class="btn" onclick="searchTravel()">Cari Travel</button></div>
  </div>`;
