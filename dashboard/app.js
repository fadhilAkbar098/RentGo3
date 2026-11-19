/* =====================================================
   RentGo - Dashboard Keuangan
   Styling: Tailwind CSS. Data disimpan di localStorage,
   terpisah untuk tiap akun. Mode tamu tidak menyimpan apa pun.

   1. Helper         5. Komponen UI
   2. Ikon           6. Halaman
   3. Data & akun    7. Aksi
   4. Perhitungan    8. Render utama
   ===================================================== */

/* ---------- 1. HELPER ---------- */
const $ = s => document.querySelector(s);
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const KATEGORI = ['BBM', 'Perawatan', 'Operasional', 'Pajak', 'Gaji', 'Lainnya'];
const KENDARAAN = [
  ['Toyota Avanza', 350000], ['Honda Brio', 250000], ['Innova Reborn', 500000],
  ['Hiace Commuter', 450000], ['Travel Yogyakarta', 350000],
  ['Motor Beat', 120000], ['Motor Vario', 130000],
];
const KOLOM_KANAN = ['Total', 'Dibayar', 'Sisa', 'Jumlah', 'Masuk', 'Keluar', 'Saldo'];

const rupiah = n => 'Rp ' + Math.round(n).toLocaleString('id-ID');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const total = (arr, fn) => arr.reduce((s, x) => s + fn(x), 0);
const hariIni = () => new Date().toISOString().slice(0, 10);
const urutTerbaru = (a, b) => b.tgl.localeCompare(a.tgl) || b.id - a.id;
const dalam = (t, dari, sampai) => t >= dari && t <= sampai;

function tglIndo(t) {
  const [y, m, d] = t.split('-');
  return `${+d} ${BULAN[m - 1]} ${y}`;
}
function geserHari(t, n) {
  const d = new Date(t + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
const selisihHari = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);

/* ---------- 2. IKON ---------- */
const IKON = {
  home: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
  cal: 'M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z',
  card: 'M3 6h18v12H3zM3 10h18M6 15h4',
  wallet: 'M4 7h15a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 7l12-3v3M15 13h3',
  doc: 'M6 3h9l4 4v14H6zM9 12h7M9 16h7M9 8h3',
  out: 'M10 4H5v16h5M15 8l4 4-4 4M19 12H9',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
  bell: 'M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4',
  chev: 'M6 9l6 6 6-6',
  trend: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  users: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M17 11a3 3 0 1 0 0-6M22 20a5 5 0 0 0-4-5',
  right: 'M9 6l6 6-6 6',
};
const ikon = (nama, ukuran = 18) =>
  `<svg width="${ukuran}" height="${ukuran}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${IKON[nama]}"/></svg>`;

/* ---------- 3. DATA & AKUN ---------- */
const KEY_USERS = 'rentgo_users';     // daftar akun {username: hashPassword}
const KEY_SESSION = 'rentgo_session'; // akun yang sedang login
const KEY_DATA = 'rentgo_data_';      // + username -> data milik akun itu

const baca = (key, awal) => {
  try { const v = JSON.parse(localStorage.getItem(key)); return v === null ? awal : v; } catch (e) { return awal; }
};
const tulis = (key, nilai) => { try { localStorage.setItem(key, JSON.stringify(nilai)); } catch (e) { /* abaikan */ } };

function dataKosong() {
  const t = hariIni();
  return { n: 1, per: { from: t.slice(0, 8) + '01', to: t }, b: [], p: [], e: [] };
}

function dataContoh() {
  return {
    n: 20,
    per: { from: '2025-10-25', to: '2025-10-26' },
    b: [
      { id: 1, tgl: '2025-10-24', nama: 'Agus Setiawan', kend: 'Travel Yogyakarta', hari: 1, tarif: 350000 },
      { id: 2, tgl: '2025-10-24', nama: 'Rina Dewi', kend: 'Hiace Commuter', hari: 2, tarif: 450000 },
      { id: 3, tgl: '2025-10-25', nama: 'Budi Santoso', kend: 'Motor Beat', hari: 1, tarif: 120000 },
      { id: 4, tgl: '2025-10-25', nama: 'Siti Rahma', kend: 'Honda Brio', hari: 1, tarif: 250000 },
      { id: 5, tgl: '2025-10-25', nama: 'Andi Pratama', kend: 'Toyota Avanza', hari: 1, tarif: 350000 },
    ],
    p: [
      { id: 6, bid: 5, tgl: '2025-10-25', jml: 350000, met: 'Tunai' },
      { id: 7, bid: 4, tgl: '2025-10-25', jml: 100000, met: 'Transfer' },
      { id: 8, bid: 3, tgl: '2025-10-25', jml: 120000, met: 'QRIS' },
      { id: 9, bid: 2, tgl: '2025-10-24', jml: 900000, met: 'Transfer' },
    ],
    e: [
      { id: 10, tgl: '2025-10-25', ket: 'BBM Avanza & Brio', kat: 'BBM', jml: 150000 },
      { id: 11, tgl: '2025-10-26', ket: 'Servis rutin Hiace', kat: 'Perawatan', jml: 400000 },
      { id: 12, tgl: '2025-10-25', ket: 'Cuci kendaraan', kat: 'Operasional', jml: 60000 },
      { id: 13, tgl: '2025-10-24', ket: 'Pajak motor', kat: 'Pajak', jml: 200000 },
    ],
  };
}

// state tampilan. user = null berarti mode tamu
const S = {
  user: null, auth: false, mode: 'masuk', error: '', lastUser: '',
  view: 'dashboard', sub: 'kas', lap: 'labarugi', kOpen: false, pop: false, q: '',
};
let D = dataKosong();

// hanya akun yang login yang disimpan; tamu tidak
function save() {
  if (S.user) tulis(KEY_DATA + S.user, D);
}

// --- login & daftar (akun disimpan di browser ini, bukan server) ---
async function hash(teks) {
  if (window.crypto && crypto.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(teks));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }
  let h = 5381; // cadangan jika crypto.subtle tidak tersedia
  for (const c of teks) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0;
  return 'x' + h;
}

async function kirimAuth() {
  const user = $('#au_user').value.trim().toLowerCase();
  const pass = $('#au_pass').value;
  const users = baca(KEY_USERS, {});
  S.lastUser = user; S.error = '';

  if (!/^[a-z0-9_.]{3,20}$/.test(user)) S.error = 'Username 3-20 karakter: huruf, angka, _ atau .';
  else if (pass.length < 4) S.error = 'Password minimal 4 karakter.';
  else if (S.mode === 'daftar') {
    if (users[user]) S.error = 'Username sudah dipakai.';
    else if (pass !== $('#au_pass2').value) S.error = 'Konfirmasi password tidak sama.';
    else {
      users[user] = await hash(user + ':' + pass);
      tulis(KEY_USERS, users);
      return masuk(user, true);
    }
  } else if (!users[user] || users[user] !== await hash(user + ':' + pass)) {
    S.error = 'Username atau password salah.';
  } else {
    return masuk(user, false);
  }
  render();
}

// akun baru membawa data tamu yang sudah diisi; akun lama memuat datanya sendiri
function masuk(user, bawaDataTamu) {
  const tamuAdaData = D.b.length || D.p.length || D.e.length;
  S.user = user; S.auth = false; S.view = 'dashboard';
  tulis(KEY_SESSION, user);
  if (!(bawaDataTamu && tamuAdaData)) D = baca(KEY_DATA + user, null) || dataKosong();
  save(); render();
}

function logout() {
  try { localStorage.removeItem('rentgo_auth'); localStorage.removeItem(KEY_SESSION); } catch (e) { /* abaikan */ }
  location.href = '../index.html'; // kembali ke halaman login utama
}

const bukaAuth = () => { S.auth = true; S.error = ''; render(); };

/* ---------- 4. PERHITUNGAN ---------- */
const totalBooking = b => b.hari * b.tarif;
const dibayar = b => total(D.p.filter(x => x.bid === b.id), x => x.jml);
const sisa = b => totalBooking(b) - dibayar(b);
const cariBooking = id => D.b.find(b => b.id == id) || { nama: '-', kend: '-' };

function status(b) {
  const bayar = dibayar(b);
  if (bayar >= totalBooking(b)) return 'Lunas';
  return bayar > 0 ? 'DP' : 'Menunggu';
}

function ringkasan(dari, sampai) {
  const booking = D.b.filter(b => dalam(b.tgl, dari, sampai));
  const omzet = total(booking, totalBooking);
  const pengeluaran = total(D.e.filter(e => dalam(e.tgl, dari, sampai)), e => e.jml);
  return { omzet, pengeluaran, laba: omzet - pengeluaran, piutang: total(booking, sisa) };
}

function ringkasanSebelumnya() {
  const { from, to } = D.per;
  const panjang = selisihHari(from, to) + 1;
  const akhir = geserHari(from, -1);
  return ringkasan(geserHari(akhir, -(panjang - 1)), akhir);
}

const persen = (now, before) => (before ? Math.round((now - before) / Math.abs(before) * 100) : null);

function mutasiKas() {
  const { from, to } = D.per;
  const masuk = D.p.filter(p => dalam(p.tgl, from, to))
    .map(p => ({ id: p.id, tgl: p.tgl, ket: 'Pembayaran - ' + cariBooking(p.bid).nama, masuk: p.jml, keluar: 0 }));
  const keluar = D.e.filter(e => dalam(e.tgl, from, to))
    .map(e => ({ id: e.id, tgl: e.tgl, ket: e.ket, masuk: 0, keluar: e.jml }));
  return [...masuk, ...keluar].sort(urutTerbaru);
}

function sesuaikanPeriode(t) {
  if (t < D.per.from) D.per.from = t;
  if (t > D.per.to) D.per.to = t;
}

/* ---------- 5. KOMPONEN UI ---------- */
const CARD = 'bg-slate-900 border border-slate-800 rounded-lg p-4';
const INPUT = 'w-full h-10 bg-slate-950 border border-slate-700 rounded-md px-3 text-sm text-slate-100 outline-none focus:border-blue-500';
const LABEL = 'block text-xs text-slate-400 mb-1';
const BTN = 'h-10 px-4 rounded-md bg-blue-600 hover:bg-blue-500 text-sm font-medium text-white flex items-center justify-center cursor-pointer';
const BTN_LINK = 'text-xs text-slate-400 hover:text-white underline cursor-pointer';
const FORM = 'grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3 items-end';
const H3 = 'text-base font-medium mb-3';
const WARNA_BADGE = {
  Lunas: 'bg-emerald-500/15 text-emerald-400',
  DP: 'bg-amber-500/15 text-amber-400',
  Menunggu: 'bg-slate-500/20 text-slate-300',
};
const badge = s => `<span class="text-xs px-2 py-0.5 rounded ${WARNA_BADGE[s]}">${s}</span>`;

function tabel(kolom, baris) {
  if (!baris.length) return '<p class="text-slate-400 text-center py-8">Belum ada data.</p>';
  const rata = i => (KOLOM_KANAN.includes(kolom[i]) ? 'text-right' : 'text-left');
  return `<div class="overflow-x-auto"><table class="w-full min-w-[480px]">
    <tr>${kolom.map((k, i) => `<th class="py-2 px-3 text-xs font-medium text-slate-400 border-b border-slate-800 whitespace-nowrap ${rata(i)}">${k}</th>`).join('')}</tr>
    ${baris.map(r => `<tr>${r.map((c, i) => `<td class="py-3 px-3 border-b border-slate-800/60 whitespace-nowrap ${rata(i)}">${c}</td>`).join('')}</tr>`).join('')}
  </table></div>`;
}

function tab(daftar, aktif, halaman) {
  return `<div class="flex gap-5 border-b border-slate-800 mb-5">${daftar.map(([k, label]) => `
    <button class="pb-2 -mb-px border-b-2 cursor-pointer ${aktif === k ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}"
      onclick="go('${halaman}','${k}')">${label}</button>`).join('')}</div>`;
}

function kartu(label, nilai, ket = '', ik = null, warna = '') {
  const kotak = ik ? `<div class="w-11 h-11 rounded-lg grid place-items-center text-white shrink-0 ${warna}">${ikon(ik, 22)}</div>` : '';
  return `<div class="${CARD} flex gap-3.5">${kotak}<div><p class="text-slate-400">${label}</p>
    <p class="text-2xl font-semibold mt-1">${nilai}</p>${ket}</div></div>`;
}

// logo RentGo (dipakai di sidebar dan halaman login)
const htmlLogo = () => `<div class="text-center">
  <svg class="mx-auto" width="150" height="34" viewBox="0 0 150 34" fill="none" stroke-linecap="round">
    <path d="M6 30C26 4 104 -2 144 22" stroke="#1d6fff" stroke-width="4"/>
    <path d="M34 22C54 11 100 9 124 19" stroke="#4da3ff" stroke-width="3"/></svg>
  <b class="block italic font-extrabold text-[40px] leading-none tracking-tight">Rent<i class="text-blue-500">Go</i></b>
  <small class="block text-xs mt-1.5 leading-tight text-slate-300">Rental Mobil &amp; Motor<br>Travel Keluarga</small>
</div>`;

function perubahan(p, naikBagus) {
  if (p === null) return '<p class="text-xs mt-1 text-slate-500">&nbsp;</p>';
  const bagus = (p >= 0) === naikBagus;
  return `<p class="text-xs mt-1 text-slate-500"><span class="${bagus ? 'text-emerald-400' : 'text-red-400'}">${p >= 0 ? '▲' : '▼'} ${Math.abs(p)}%</span> dari periode sebelumnya</p>`;
}

const header = (judul, desk) => `<div class="mb-5">
  <h1 class="text-2xl font-semibold">${judul}</h1><p class="text-slate-400 mt-1">${desk}</p></div>`;
const infoPeriode = () =>
  `<p class="text-slate-400 mb-4">Periode: ${tglIndo(D.per.from)} - ${tglIndo(D.per.to)} (ubah di Dashboard)</p>`;

function tabelPiutang(denganTombol) {
  const buka = D.b.filter(b => sisa(b) > 0).sort(urutTerbaru);
  const kolom = ['Pelanggan', 'Kendaraan', 'Tanggal', 'Total', 'Dibayar', 'Sisa', 'Status'];
  if (denganTombol) kolom.push('');
  const baris = buka.map(b => {
    const r = [esc(b.nama), esc(b.kend), tglIndo(b.tgl), rupiah(totalBooking(b)), rupiah(dibayar(b)), rupiah(sisa(b)), badge(status(b))];
    if (denganTombol) r.push(`<a class="${BTN_LINK}" onclick="go('pembayaran')">Bayar</a>`);
    return r;
  });
  return tabel(kolom, baris) +
    `<p class="text-right pt-3 font-medium">Total piutang: ${rupiah(total(buka, sisa))}</p>`;
}

/* ---------- 6. HALAMAN ---------- */
function htmlAuth() {
  const daftar = S.mode === 'daftar';
  const tabAuth = (m, t) => `<button class="flex-1 pb-2 -mb-px border-b-2 cursor-pointer ${S.mode === m ? 'border-blue-500 text-white' : 'border-transparent text-slate-400'}"
    onclick="S.mode='${m}';S.error='';render()">${t}</button>`;
  const enter = `onkeydown="if(event.key==='Enter')kirimAuth()"`;

  return `<div class="w-full max-w-sm">
    <div class="mb-6">${htmlLogo()}</div>
    <div class="${CARD} p-5">
      <div class="flex border-b border-slate-800 mb-5">${tabAuth('masuk', 'Masuk')}${tabAuth('daftar', 'Daftar')}</div>
      <div class="space-y-3">
        <div><label class="${LABEL}">Username</label>
          <input id="au_user" value="${esc(S.lastUser)}" autocomplete="username" class="${INPUT}" ${enter}></div>
        <div><label class="${LABEL}">Password</label>
          <input id="au_pass" type="password" autocomplete="${daftar ? 'new-password' : 'current-password'}" class="${INPUT}" ${enter}></div>
        ${daftar ? `<div><label class="${LABEL}">Ulangi password</label>
          <input id="au_pass2" type="password" class="${INPUT}" ${enter}></div>` : ''}
        ${S.error ? `<p class="text-red-400">${S.error}</p>` : ''}
        <button class="${BTN} w-full" onclick="kirimAuth()">${daftar ? 'Buat akun' : 'Masuk'}</button>
      </div>
    </div>
    <p class="text-center text-slate-400 mt-4">
      <a class="${BTN_LINK}" onclick="S.auth=false;render()">Lanjut tanpa login</a> (data tidak disimpan)</p>
    <p class="text-center text-xs text-slate-500 mt-3">Akun dan data tersimpan di browser ini saja.</p>
  </div>`;
}

function halamanDashboard() {
  const now = ringkasan(D.per.from, D.per.to);
  const before = ringkasanSebelumnya();
  const belumLunas = D.b.filter(b => sisa(b) > 0);
  const terbaru = [...D.b].sort(urutTerbaru).slice(0, 5);
  const menuLaporan = [['Laba Rugi', 'labarugi'], ['Arus Kas', 'aruskas'], ['Piutang', 'piutang'], ['Pengeluaran', 'pengeluaran']];

  const kosong = `<p class="text-slate-400 text-center py-8">Belum ada booking.
    <a class="${BTN_LINK}" onclick="go('booking')">Tambah booking</a> atau
    <a class="${BTN_LINK}" onclick="isiContoh()">isi data contoh</a>.</p>`;

  return `
  <div class="flex justify-between items-start flex-wrap gap-3 mb-5 relative">
    <div><h1 class="text-2xl font-semibold">Dashboard Keuangan</h1>
      <p class="text-slate-400 mt-1">Ringkasan pemasukan dan pengeluaran usaha Anda.</p></div>
    <button class="h-10 px-3 flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-md cursor-pointer"
            onclick="S.pop=!S.pop;render()">
      ${ikon('cal')}<span>${tglIndo(D.per.from)} - ${tglIndo(D.per.to)}</span>${ikon('chev', 16)}
    </button>
    ${S.pop ? `<div class="absolute right-0 top-12 bg-slate-900 border border-slate-700 rounded-lg p-3 flex gap-2 items-end z-10">
      <div><label class="${LABEL}">Dari</label><input type="date" id="pf" value="${D.per.from}" class="${INPUT}"></div>
      <div><label class="${LABEL}">Sampai</label><input type="date" id="pt" value="${D.per.to}" class="${INPUT}"></div>
      <button class="${BTN}" onclick="aturPeriode()">Terapkan</button></div>` : ''}
  </div>

  <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
    ${kartu('Total Omzet', rupiah(now.omzet), perubahan(persen(now.omzet, before.omzet), true), 'wallet', 'bg-blue-600')}
    ${kartu('Laba Bersih', rupiah(now.laba), perubahan(persen(now.laba, before.laba), true), 'trend', 'bg-emerald-600')}
    ${kartu('Piutang Pelanggan', rupiah(total(belumLunas, sisa)), `<p class="text-xs mt-1 text-slate-500">${belumLunas.length} transaksi belum lunas</p>`, 'users', 'bg-amber-500')}
    ${kartu('Pengeluaran', rupiah(now.pengeluaran), perubahan(persen(now.pengeluaran, before.pengeluaran), false), 'wallet', 'bg-violet-600')}
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
    <div class="${CARD} xl:col-span-2">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-base font-medium">Transaksi Terbaru</h3>
        <a class="${BTN_LINK}" onclick="go('booking')">Lihat semua</a>
      </div>
      ${D.b.length ? tabel(['No', 'Tanggal', 'Pelanggan', 'Kendaraan', 'Total', 'Status'],
        terbaru.map((b, i) => [i + 1, tglIndo(b.tgl), esc(b.nama), esc(b.kend), rupiah(totalBooking(b)), badge(status(b))])) : kosong}
    </div>

    <div class="space-y-4">
      <div class="${CARD}">
        <h3 class="${H3}">Laporan</h3>
        ${menuLaporan.map(([judul, tujuan]) => `
          <a class="flex justify-between items-center py-2.5 border-t border-slate-800 text-slate-300 hover:text-white cursor-pointer"
             onclick="go('laporan','${tujuan}')">${judul}${ikon('right', 14)}</a>`).join('')}
      </div>

      <div class="${CARD}">
        <h3 class="${H3}">Kalkulator</h3>
        <div class="grid grid-cols-2 gap-3 mb-3">
          <div><label class="${LABEL}">Tarif per hari (Rp)</label>
            <input id="ct" value="350.000" inputmode="numeric" oninput="hitung()" class="${INPUT}"></div>
          <div><label class="${LABEL}">Durasi (hari)</label>
            <select id="cd" onchange="hitung()" class="${INPUT}">
              ${Array.from({ length: 30 }, (_, i) => `<option>${i + 1}</option>`).join('')}</select></div>
        </div>
        <div class="space-y-1.5 text-slate-300 [&>div]:flex [&>div]:justify-between">
          <div><span>Total tagihan</span><span id="c1">Rp 350.000</span></div>
          <div><span>Biaya operasional</span><span id="c2">Rp 50.000</span></div>
          <div class="text-white font-medium border-t border-slate-800 pt-2"><span>Estimasi laba</span><span id="c3">Rp 300.000</span></div>
        </div>
      </div>
    </div>
  </div>`;
}

function halamanBooking() {
  const kata = S.q.toLowerCase();
  const daftar = D.b
    .filter(b => !kata || `${b.nama} ${b.kend} ${tglIndo(b.tgl)}`.toLowerCase().includes(kata))
    .sort(urutTerbaru);

  return header('Booking', 'Catat dan kelola pemesanan kendaraan pelanggan.') + `
  <div class="${CARD} mb-4">
    <h3 class="${H3}">Booking baru</h3>
    <div class="${FORM}">
      <div><label class="${LABEL}">Nama pelanggan</label><input id="fn" class="${INPUT}"></div>
      <div><label class="${LABEL}">Kendaraan</label>
        <select id="fk" class="${INPUT}" onchange="$('#ft').value=KENDARAAN[this.value][1]">
          ${KENDARAAN.map((k, i) => `<option value="${i}">${k[0]}</option>`).join('')}</select></div>
      <div><label class="${LABEL}">Tarif per hari (Rp)</label><input id="ft" type="number" value="${KENDARAAN[0][1]}" class="${INPUT}"></div>
      <div><label class="${LABEL}">Durasi (hari)</label><input id="fh" type="number" min="1" value="1" class="${INPUT}"></div>
      <div><label class="${LABEL}">Tanggal</label><input id="fg" type="date" value="${hariIni()}" class="${INPUT}"></div>
      <div><label class="${LABEL}">DP (Rp)</label><input id="fp" type="number" min="0" value="0" class="${INPUT}"></div>
      <button class="${BTN}" onclick="tambahBooking()">Simpan</button>
    </div>
  </div>
  <div class="${CARD}">
    <h3 class="${H3}">Daftar booking${S.q ? ` - hasil "${esc(S.q)}"` : ''}</h3>
    ${tabel(['No', 'Tanggal', 'Pelanggan', 'Kendaraan', 'Durasi', 'Total', 'Dibayar', 'Status', ''],
      daftar.map((b, i) => [i + 1, tglIndo(b.tgl), esc(b.nama), esc(b.kend), b.hari + ' hari',
        rupiah(totalBooking(b)), rupiah(dibayar(b)), badge(status(b)),
        `<a class="${BTN_LINK}" onclick="hapusBooking(${b.id})">Hapus</a>`]))}
  </div>`;
}

function halamanPembayaran() {
  const buka = D.b.filter(b => sisa(b) > 0).sort(urutTerbaru);
  const riwayat = [...D.p].sort(urutTerbaru);

  const form = buka.length ? `
    <div class="${FORM}">
      <div><label class="${LABEL}">Booking</label>
        <select id="pb" class="${INPUT}" onchange="$('#pj').value=sisa(cariBooking(this.value))">
          ${buka.map(b => `<option value="${b.id}">${esc(b.nama)} - ${esc(b.kend)} (sisa ${rupiah(sisa(b))})</option>`).join('')}</select></div>
      <div><label class="${LABEL}">Jumlah (Rp)</label><input id="pj" type="number" value="${sisa(buka[0])}" class="${INPUT}"></div>
      <div><label class="${LABEL}">Metode</label>
        <select id="pm" class="${INPUT}"><option>Tunai</option><option>Transfer</option><option>QRIS</option></select></div>
      <div><label class="${LABEL}">Tanggal</label><input id="pd" type="date" value="${hariIni()}" class="${INPUT}"></div>
      <button class="${BTN}" onclick="tambahPembayaran()">Simpan</button>
    </div>` : '<p class="text-slate-400 py-4">Tidak ada booking yang belum lunas.</p>';

  return header('Pembayaran', 'Catat pelunasan atau cicilan dari pelanggan.') + `
  <div class="${CARD} mb-4"><h3 class="${H3}">Catat pembayaran</h3>${form}</div>
  <div class="${CARD}"><h3 class="${H3}">Riwayat pembayaran</h3>
    ${tabel(['Tanggal', 'Pelanggan', 'Kendaraan', 'Metode', 'Jumlah'],
      riwayat.map(p => { const b = cariBooking(p.bid); return [tglIndo(p.tgl), esc(b.nama), esc(b.kend), p.met, rupiah(p.jml)]; }))}
  </div>`;
}

function halamanKeuangan() {
  let isi = '';

  if (S.sub === 'kas') {
    const kas = mutasiKas();
    const masuk = total(kas, x => x.masuk);
    const keluar = total(kas, x => x.keluar);
    isi = infoPeriode() + `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        ${kartu('Kas masuk', rupiah(masuk))}${kartu('Kas keluar', rupiah(keluar))}${kartu('Saldo kas', rupiah(masuk - keluar))}
      </div>
      <div class="${CARD}">${tabel(['Tanggal', 'Keterangan', 'Masuk', 'Keluar'],
        kas.map(x => [tglIndo(x.tgl), esc(x.ket), x.masuk ? rupiah(x.masuk) : '-', x.keluar ? rupiah(x.keluar) : '-']))}</div>`;
  } else if (S.sub === 'pengeluaran') {
    isi = `
      <div class="${CARD} mb-4">
        <h3 class="${H3}">Catat pengeluaran</h3>
        <div class="${FORM}">
          <div><label class="${LABEL}">Tanggal</label><input id="et" type="date" value="${hariIni()}" class="${INPUT}"></div>
          <div><label class="${LABEL}">Keterangan</label><input id="ek" class="${INPUT}"></div>
          <div><label class="${LABEL}">Kategori</label>
            <select id="ec" class="${INPUT}">${KATEGORI.map(k => `<option>${k}</option>`).join('')}</select></div>
          <div><label class="${LABEL}">Jumlah (Rp)</label><input id="ej" type="number" min="0" class="${INPUT}"></div>
          <button class="${BTN}" onclick="tambahPengeluaran()">Simpan</button>
        </div>
      </div>
      <div class="${CARD}">${tabel(['Tanggal', 'Keterangan', 'Kategori', 'Jumlah', ''],
        [...D.e].sort(urutTerbaru).map(e => [tglIndo(e.tgl), esc(e.ket), e.kat, rupiah(e.jml),
          `<a class="${BTN_LINK}" onclick="hapusPengeluaran(${e.id})">Hapus</a>`]))}</div>`;
  } else {
    isi = `<div class="${CARD}">${tabelPiutang(true)}</div>`;
  }

  return header('Keuangan', 'Arus kas, pengeluaran, dan piutang.') +
    tab([['kas', 'Arus kas'], ['pengeluaran', 'Pengeluaran'], ['piutang', 'Piutang']], S.sub, 'keuangan') + isi;
}

function halamanLaporan() {
  const { from, to } = D.per;
  const r = ringkasan(from, to);
  const pengeluaran = D.e.filter(e => dalam(e.tgl, from, to));
  const perKategori = {};
  pengeluaran.forEach(e => { perKategori[e.kat] = (perKategori[e.kat] || 0) + e.jml; });
  let isi = '';

  if (S.lap === 'labarugi') {
    isi = tabel(['Keterangan', 'Jumlah'], [
      ['<b>Pendapatan (omzet)</b>', `<b>${rupiah(r.omzet)}</b>`],
      ...Object.entries(perKategori).map(([k, v]) => ['&nbsp;&nbsp;Biaya ' + k, `(${rupiah(v)})`]),
      ['<b>Total pengeluaran</b>', `<b>(${rupiah(r.pengeluaran)})</b>`],
      ['<b>Laba bersih</b>', `<b>${rupiah(r.laba)}</b>`],
      ['Margin laba', r.omzet ? Math.round(r.laba / r.omzet * 100) + '%' : '-'],
    ]);
  } else if (S.lap === 'aruskas') {
    let saldo = 0;
    isi = tabel(['Tanggal', 'Keterangan', 'Masuk', 'Keluar', 'Saldo'],
      mutasiKas().reverse().map(x => {
        saldo += x.masuk - x.keluar;
        return [tglIndo(x.tgl), esc(x.ket), x.masuk ? rupiah(x.masuk) : '-', x.keluar ? rupiah(x.keluar) : '-', rupiah(saldo)];
      }));
  } else if (S.lap === 'piutang') {
    isi = tabelPiutang(false);
  } else {
    isi = tabel(['Kategori', 'Jumlah'],
        [...Object.entries(perKategori).map(([k, v]) => [k, rupiah(v)]), ['<b>Total</b>', `<b>${rupiah(r.pengeluaran)}</b>`]]) +
      '<div class="h-4"></div>' +
      tabel(['Tanggal', 'Keterangan', 'Kategori', 'Jumlah'],
        pengeluaran.sort(urutTerbaru).map(e => [tglIndo(e.tgl), esc(e.ket), e.kat, rupiah(e.jml)]));
  }

  return header('Laporan', 'Laporan keuangan berdasarkan periode terpilih.') +
    tab([['labarugi', 'Laba rugi'], ['aruskas', 'Arus kas'], ['piutang', 'Piutang'], ['pengeluaran', 'Pengeluaran']], S.lap, 'laporan') +
    infoPeriode() + `<div class="${CARD}">${isi}</div>`;
}

/* ---------- 7. AKSI ---------- */
function go(halaman, sub) {
  S.view = halaman;
  if (halaman === 'keuangan') { S.kOpen = true; if (sub) S.sub = sub; }
  if (halaman === 'laporan' && sub) S.lap = sub;
  if (halaman !== 'booking') { S.q = ''; $('#q').value = ''; }
  $('#side').classList.add('-translate-x-full'); // tutup sidebar di HP
  render();
}

function toggleKeuangan() { S.kOpen = !S.kOpen; S.view = 'keuangan'; render(); }

function isiContoh() {
  if (D.b.length) return;
  D = dataContoh();
  save(); render();
}

function aturPeriode() {
  let dari = $('#pf').value, sampai = $('#pt').value;
  if (!dari || !sampai) return;
  if (dari > sampai) [dari, sampai] = [sampai, dari];
  D.per = { from: dari, to: sampai };
  S.pop = false; save(); render();
}

function hitung() {
  const tarif = +$('#ct').value.replace(/\D/g, '') || 0;
  const hari = +$('#cd').value || 1;
  const tagihan = tarif * hari, biaya = 50000 * hari;
  $('#c1').textContent = rupiah(tagihan);
  $('#c2').textContent = rupiah(biaya);
  $('#c3').textContent = rupiah(tagihan - biaya);
}

function tambahBooking() {
  const nama = $('#fn').value.trim();
  const kend = KENDARAAN[+$('#fk').value][0];
  const hari = +$('#fh').value, tarif = +$('#ft').value, tgl = $('#fg').value;
  const dp = +$('#fp').value || 0;
  if (!nama || hari < 1 || !tarif || !tgl) { $('#fn').focus(); return; }

  const b = { id: D.n++, tgl, nama, kend, hari, tarif };
  D.b.push(b);
  if (dp > 0) D.p.push({ id: D.n++, bid: b.id, tgl, jml: Math.min(dp, totalBooking(b)), met: 'Tunai' });
  sesuaikanPeriode(tgl); save(); render();
}

function hapusBooking(id) {
  D.b = D.b.filter(b => b.id !== id);
  D.p = D.p.filter(p => p.bid !== id);
  save(); render();
}

function tambahPembayaran() {
  const b = cariBooking($('#pb').value), tgl = $('#pd').value;
  const jml = Math.min(+$('#pj').value || 0, sisa(b));
  if (!b.id || jml <= 0 || !tgl) return;
  D.p.push({ id: D.n++, bid: b.id, tgl, jml, met: $('#pm').value });
  sesuaikanPeriode(tgl); save(); render();
}

function tambahPengeluaran() {
  const tgl = $('#et').value, ket = $('#ek').value.trim(), jml = +$('#ej').value;
  if (!tgl || !ket || jml <= 0) return;
  D.e.push({ id: D.n++, tgl, ket, kat: $('#ec').value, jml });
  sesuaikanPeriode(tgl); save(); render();
}

function hapusPengeluaran(id) {
  D.e = D.e.filter(e => e.id !== id);
  save(); render();
}

/* ---------- 8. RENDER UTAMA ---------- */
const MENU = [
  ['dashboard', 'home', 'Dashboard'], ['booking', 'cal', 'Booking'], ['pembayaran', 'card', 'Pembayaran'],
  ['keuangan', 'wallet', 'Keuangan'], ['laporan', 'doc', 'Laporan'],
];
const SUBMENU = [['kas', 'Arus kas'], ['pengeluaran', 'Pengeluaran'], ['piutang', 'Piutang']];
const HALAMAN = {
  dashboard: halamanDashboard, booking: halamanBooking, pembayaran: halamanPembayaran,
  keuangan: halamanKeuangan, laporan: halamanLaporan,
};
const NAV = 'flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer hover:bg-slate-800/60 ';

function htmlSidebar() {
  const menu = MENU.map(([k, ik, label]) => {
    const isKeuangan = k === 'keuangan';
    const aktif = S.view === k ? 'bg-slate-800 text-white' : 'text-slate-300';
    const item = `<a class="${NAV}${aktif}" onclick="${isKeuangan ? 'toggleKeuangan()' : `go('${k}')`}">
      ${ikon(ik)}<span>${label}</span>
      ${isKeuangan ? `<span class="ml-auto transition-transform ${S.kOpen ? 'rotate-180' : ''}">${ikon('chev', 16)}</span>` : ''}</a>`;
    const sub = isKeuangan && S.kOpen
      ? SUBMENU.map(([s, t]) => `<a class="block pl-10 py-1.5 text-[13px] cursor-pointer
          ${S.view === 'keuangan' && S.sub === s ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}"
          onclick="go('keuangan','${s}')">${t}</a>`).join('')
      : '';
    return item + sub;
  }).join('');

  return `<div class="mb-7 mt-1">${htmlLogo()}</div>
    <nav class="space-y-0.5">${menu}</nav>
    <a class="${NAV}mt-auto text-slate-300" onclick="${S.user ? 'logout()' : 'bukaAuth()'}">
      ${ikon('out')}<span>${S.user ? 'Keluar' : 'Login / Daftar'}</span></a>`;
}

function render() {
  $('#auth').classList.toggle('hidden', !S.auth);
  $('#auth').classList.toggle('flex', S.auth);
  $('#app').classList.toggle('hidden', S.auth);
  if (S.auth) { $('#auth').innerHTML = htmlAuth(); return; }

  const belumLunas = D.b.filter(b => sisa(b) > 0).length; // angka di lonceng
  $('#bn').textContent = belumLunas;
  $('#bn').style.display = belumLunas ? '' : 'none';

  $('#av').textContent = (S.user || 'T')[0];
  $('#un').textContent = S.user || 'Tamu';
  $('#ur').textContent = S.user ? 'Data tersimpan' : 'Data tidak disimpan';
  $('#tamu').classList.toggle('hidden', !!S.user);

  $('#side').innerHTML = htmlSidebar();
  $('#main').innerHTML = HALAMAN[S.view]();
}

// mulai: pulihkan sesi login jika ada, kalau tidak tampilkan halaman login
$('#si').innerHTML = ikon('search');
$('#bi').innerHTML = ikon('bell', 20);
// akun bawaan: dibuat sekali saat belum ada akun sama sekali (username: admin, password: admin123)
async function buatAkunBawaan() {
  const users = baca(KEY_USERS, {});
  if (Object.keys(users).length) return;
  users.admin = await hash('admin:admin123');
  tulis(KEY_USERS, users);
  tulis(KEY_DATA + 'admin', dataContoh());
}

async function mulai() {
  // hanya admin (login dari ../index.html) yang boleh membuka dashboard
  const auth = baca('rentgo_auth', null);
  if (!auth || auth.role !== 'admin') { location.replace('../index.html'); return; }
  S.user = 'admin';
  D = baca(KEY_DATA + 'admin', null) || dataContoh();
  save(); render();
}
mulai();
