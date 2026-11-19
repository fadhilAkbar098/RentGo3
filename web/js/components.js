/* =====================================================
   Komponen UI
   Potongan tampilan yang dipakai ulang di banyak halaman.
   ===================================================== */

const head = t => `<div class="flex items-center gap-3 mb-6"><button onclick="back()" aria-label="Kembali" class="w-10 h-10 grid place-items-center rounded-full bg-white border border-brand-100 text-brand-700">${ic('back')}</button><h1 class="text-xl font-extrabold text-brand-900">${t}</h1></div>`;
const vCard = v => `
<article class="card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
  <button class="block w-full" onclick="pick(${v.id})" aria-label="Lihat ${v.name}">${photo(v, 'aspect-[4/3]')}</button>
  <div class="p-5">
    <div class="flex items-center justify-between text-xs">
      <span class="rounded-full bg-brand-100 text-brand-700 font-semibold px-3 py-1">${v.cat}</span>
      <span class="flex items-center gap-1 text-slate-500">${star}<b class="text-slate-700">${v.rate}</b> (${v.rev})</span>
    </div>
    <h3 class="mt-3 text-lg font-bold text-brand-900">${v.name}</h3>
    <p class="text-sm text-slate-500">${v.seat}</p>
    <div class="mt-4 flex items-end justify-between">
      <p class="text-xl font-extrabold text-brand-600">${rp(v.price)}<span class="text-xs font-medium text-slate-400">/hari</span></p>
      <button onclick="pick(${v.id})" class="rounded-full bg-brand-600 text-white text-sm font-semibold px-5 py-2 transition hover:bg-brand-700">Pesan</button>
    </div>
  </div>
</article>`;
const stepper = (val, fn) => `<div class="flex items-center justify-between rounded-xl border border-brand-100 bg-brand-50/60 px-3 py-2">
  <button type="button" onclick="${fn}(-1)" class="w-8 h-8 grid place-items-center rounded-full bg-white text-brand-600 shadow-sm">${ic('minus','w-4 h-4')}</button>
  <span class="font-semibold text-slate-800">${val}</span>
  <button type="button" onclick="${fn}(1)" class="w-8 h-8 grid place-items-center rounded-full bg-white text-brand-600 shadow-sm">${ic('plus','w-4 h-4')}</button></div>`;
const select = (id, opts, cur, fn) => `<select id="${id}" class="field" onchange="${fn}">${opts.map(o => `<option ${o===cur?'selected':''}>${o}</option>`).join('')}</select>`;
const row = (a, b, bold) => `<div class="flex justify-between gap-4 py-1.5 text-sm"><span class="text-slate-500">${a}</span><span class="${bold?'font-extrabold text-brand-600':'font-semibold text-slate-800'} text-right">${b}</span></div>`;

/* Foto kendaraan: coba .jpg, .png, .webp dari folder img/. Jika tidak ada, ilustrasi tetap tampil. */
const photo = (v, cls = '') => `
<div class="relative overflow-hidden bg-gradient-to-br from-brand-100 via-white to-brand-50 ${cls}">
  <div class="absolute inset-0 grid place-items-center p-[6%]">${art(v.art, v.color)}</div>
  <img src="${v.img}.jpg" data-base="${v.img}" data-i="0" alt="${v.name}" loading="lazy"
       class="relative w-full h-full object-cover opacity-0 transition-opacity duration-500"
       onload="this.previousElementSibling.remove();this.classList.remove('opacity-0')" onerror="imgNext(this)">
</div>`;
function imgNext(el) {
  const ext = ['jpg', 'png', 'webp'], i = +el.dataset.i + 1;
  if (i >= ext.length) return el.remove();
  el.dataset.i = i; el.src = `${el.dataset.base}.${ext[i]}`;
}
