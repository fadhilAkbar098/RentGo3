/* =====================================================
   Autentikasi
   Login, daftar, logout, sesi. Halaman publik; login diminta saat booking.
   ===================================================== */

let mode = 'login';
const DEMO = { name: 'Demo User', email: 'demo@rentgo.id', pass: 'rentgo123' };
const users = () => [DEMO, ...(store.get('rg_users') || [])];
const err = m => { const e = $('#authErr'); e.textContent = m; e.classList.toggle('hidden', !m); };

function setMode(m) {
  mode = m; const reg = m === 'register';
  $('#authTitle').textContent = reg ? 'Buat akun baru' : 'Masuk ke akun';
  $('#authSub').textContent = reg ? 'Daftar untuk mulai menyewa kendaraan.' : 'Lanjutkan untuk memesan kendaraan.';
  $('#authBtn').textContent = reg ? 'Daftar' : 'Masuk';
  $('#swapText').textContent = reg ? 'Sudah punya akun?' : 'Belum punya akun?';
  $('#swapAuth').textContent = reg ? 'Masuk' : 'Daftar';
  $('#nameWrap').classList.toggle('hidden', !reg); $('#fillDemo').classList.toggle('hidden', reg); err('');
}
function openAuth(m = 'login') { setMode(m); $('#auth').classList.remove('hidden'); document.body.classList.add('overflow-hidden'); }
function closeAuth() { S.after = null; hideAuth(); }
function hideAuth() { $('#auth').classList.add('hidden'); document.body.classList.remove('overflow-hidden'); $('#authForm').reset(); }
function requireLogin(next) { if (S.user) return next(); S.after = next; openAuth(); }

function showApp(u) {
  S.user = u; store.set('rg_session', { name: u.name, email: u.email });
  const next = S.after; S.after = null; hideAuth(); render(); if (next) next();
}
function logout() { store.del('rentgo_auth'); S.user = null; location.href = '../index.html'; }

$('#authForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#aName').value.trim(), email = $('#aEmail').value.trim().toLowerCase(), pass = $('#aPass').value;
  if (!/^\S+@\S+\.\S+$/.test(email)) return err('Format email belum benar. Contoh: nama@email.com');
  if (pass.length < 6) return err('Kata sandi minimal 6 karakter.');
  if (mode === 'register') {
    if (name.length < 2) return err('Masukkan nama lengkap Anda.');
    if (users().some(u => u.email === email)) return err('Email sudah terdaftar. Silakan masuk.');
    const u = { name, email, pass }; store.set('rg_users', [...(store.get('rg_users') || []), u]); return showApp(u);
  }
  const u = users().find(x => x.email === email && x.pass === pass);
  if (!u) return err('Email atau kata sandi salah. Periksa lagi atau daftar akun baru.');
  showApp(u);
});
$('#swapAuth').onclick = () => setMode(mode === 'login' ? 'register' : 'login');
$('#fillDemo').onclick = () => { $('#aEmail').value = DEMO.email; $('#aPass').value = DEMO.pass; err(''); };
$('#togglePass').onclick = e => { const p = $('#aPass'), s = p.type === 'password'; p.type = s ? 'text' : 'password'; e.target.textContent = s ? 'Sembunyi' : 'Lihat'; };
