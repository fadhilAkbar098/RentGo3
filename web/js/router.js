/* =====================================================
   Router
   Render halaman dan perpindahan antar halaman (go, back, nav).
   ===================================================== */

const Views = {}; // diisi oleh file di js/views/
const GUARDED = ['orders', 'profile']; // halaman yang wajib login
const BOOKING_FLOW = ['detail', 'booking', 'payment', 'success'];

function render() {
  $('#view').innerHTML = `<div class="view">${Views[S.view]()}</div>`;
  const tab = BOOKING_FLOW.includes(S.view) ? 'vehicles' : S.view;
  $('#topNav').innerHTML = NAV.map(([k, l]) => `<button onclick="nav('${k}')" class="px-4 py-2 rounded-full transition ${tab===k?'bg-brand-600 text-white':'text-slate-600 hover:bg-brand-50'}">${l}</button>`).join('');
  $('#botNav').innerHTML = NAV.map(([k, l, i]) => `<button onclick="nav('${k}')" class="nav-i ${tab===k?'on':''}">${ic(i)}${l}</button>`).join('');
  $('#userBox').innerHTML = S.user
    ? `<span class="hidden sm:block text-sm font-medium text-slate-600">${S.user.name}</span><button onclick="logout()" class="text-sm font-semibold text-brand-700 border border-brand-100 rounded-full px-4 py-1.5 hover:bg-brand-50">Keluar</button>`
    : `<button onclick="openAuth()" class="text-sm font-semibold text-brand-700 px-3 py-2">Masuk</button><button onclick="openAuth('register')" class="rounded-full bg-brand-600 text-white text-sm font-semibold px-5 py-2 shadow-md shadow-brand-600/25 transition hover:bg-brand-700">Daftar</button>`;
}
function go(v)   { S.stack.push(S.view); S.view = v; render(); scrollTo(0, 0); }
function back()  { S.view = S.stack.pop() || 'home'; render(); scrollTo(0, 0); }
function nav(v)  {
  if (GUARDED.includes(v) && !S.user) return requireLogin(() => nav(v));
  S.stack = []; S.view = v; render(); scrollTo(0, 0);
}
