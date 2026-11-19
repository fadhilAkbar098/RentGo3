/* =====================================================
   Login & Daftar RentGo (pintu masuk untuk semua pengguna)
   - admin / admin123        -> dashboard/index.html
   - akun yang sudah daftar  -> web/index.html
   Sesi: localStorage "rentgo_auth". Akun terdaftar: "rentgo_users".
   (Akun tersimpan di browser ini saja, bukan di server.)
   ===================================================== */

const KEY = 'rentgo_auth';
const USERS = 'rentgo_users';
const ADMIN = { user: 'admin', pass: 'admin123' };
const $ = s => document.querySelector(s);
let mode = 'login';

/* ---------- Penyimpanan ---------- */
const readSession = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } };
const readUsers = () => { try { return JSON.parse(localStorage.getItem(USERS)) || {}; } catch { return {}; } };
const homeOf = s => (s.role === 'admin' ? 'dashboard/index.html' : 'web/index.html');

async function hash(teks) {
  if (window.crypto && crypto.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(teks));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }
  let h = 5381; // cadangan jika crypto.subtle tidak tersedia
  for (const c of teks) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0;
  return 'x' + h;
}

/* ---------- Aturan login & daftar ---------- */
async function login(id, pass) {
  if (!id || !pass) return { error: 'Isi username/email dan kata sandi.' };
  const key = id.toLowerCase();
  if (key === ADMIN.user) {
    if (pass !== ADMIN.pass) return { error: 'Kata sandi admin salah.' };
    return { session: { role: 'admin', name: 'Admin', email: ADMIN.user } };
  }
  const u = readUsers()[key];
  if (!u || u.hash !== await hash(key + ':' + pass)) return { error: 'Email atau kata sandi salah. Belum punya akun? Silakan daftar.' };
  return { session: { role: 'user', name: u.name, email: key } };
}

async function register(name, id, pass, pass2) {
  const key = id.toLowerCase();
  if (name.length < 2) return { error: 'Masukkan nama lengkap Anda.' };
  if (!/^\S+@\S+\.\S+$/.test(key)) return { error: 'Format email belum benar. Contoh: nama@email.com' };
  if (pass.length < 6) return { error: 'Kata sandi minimal 6 karakter.' };
  if (pass !== pass2) return { error: 'Ulangi kata sandi tidak sama.' };
  const users = readUsers();
  if (users[key]) return { error: 'Email sudah terdaftar. Silakan masuk.' };
  users[key] = { name, hash: await hash(key + ':' + pass) };
  try { localStorage.setItem(USERS, JSON.stringify(users)); } catch { return { error: 'Browser memblokir penyimpanan. Izinkan penyimpanan lokal lalu coba lagi.' }; }
  return { session: { role: 'user', name, email: key } };
}

/* ---------- Tampilan ---------- */
const showError = m => { const e = $('#err'); e.textContent = m; e.classList.toggle('hidden', !m); };

function setMode(m) {
  mode = m; const reg = m === 'register';
  $('#title').textContent = reg ? 'Buat akun baru' : 'Masuk ke akun';
  $('#sub').textContent = reg ? 'Daftar untuk mulai menyewa kendaraan.' : 'Masukkan akun Anda untuk melanjutkan.';
  $('#idLbl').textContent = reg ? 'Email' : 'Username atau email';
  $('#id').placeholder = reg ? 'nama@email.com' : 'Username atau email';
  $('#pw').autocomplete = reg ? 'new-password' : 'current-password';
  $('#submit').textContent = reg ? 'Daftar' : 'Masuk';
  $('#swapText').textContent = reg ? 'Sudah punya akun?' : 'Belum punya akun?';
  $('#swap').textContent = reg ? 'Masuk' : 'Daftar';
  $('#nameWrap').classList.toggle('hidden', !reg);
  $('#pw2Wrap').classList.toggle('hidden', !reg);
  showError('');
}

$('#form').addEventListener('submit', async e => {
  e.preventDefault();
  const id = $('#id').value.trim(), pass = $('#pw').value;
  const { error, session } = mode === 'register'
    ? await register($('#name').value.trim(), id, pass, $('#pw2').value)
    : await login(id, pass);
  if (error) return showError(error);
  try { localStorage.setItem(KEY, JSON.stringify(session)); }
  catch { return showError('Browser memblokir penyimpanan. Izinkan penyimpanan lokal lalu coba lagi.'); }
  location.href = homeOf(session);
});

$('#swap').addEventListener('click', () => setMode(mode === 'login' ? 'register' : 'login'));
$('#toggle').addEventListener('click', e => {
  const p = $('#pw'), hidden = p.type === 'password';
  p.type = hidden ? 'text' : 'password';
  e.target.textContent = hidden ? 'Sembunyi' : 'Lihat';
});

// Sudah login sebelumnya? Langsung arahkan ke tujuannya.
const existing = readSession();
if (existing && existing.role) location.replace(homeOf(existing));
