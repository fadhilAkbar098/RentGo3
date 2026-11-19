/* =====================================================
   Aksi pengguna
   Fungsi yang dipanggil tombol: durasi, penumpang, cari travel, bayar.
   ===================================================== */

function day(d) { S.b.days = Math.max(1, Math.min(30, S.b.days + d)); render(); }
function pax(d) { S.pax = Math.max(1, Math.min(14, (S.pax || 5) + d)); render(); }
function searchTravel() {
  const f = S.tf || 'Yogyakarta', t = S.tt || 'Semarang';
  if (f === t) return toast('Kota asal dan tujuan tidak boleh sama');
  S.sel = 3; resetBooking();
  if (S.td) S.b.date = S.td;
  S.b.route = `${f} → ${t} • ${S.pax || 5} penumpang`; S.b.drop = t;
  go('detail');
}
function payNow() {
  const v = veh(), b = S.b;
  S.last = { no: '#RG' + iso(new Date()).replace(/-/g, '') + Math.floor(1000 + Math.random() * 9000), name: v.name, date: fmt(new Date(b.date)) + ' - ' + fmt(retDate()), pickup: b.pickup, drop: b.drop, total: total() };
  const k = 'rg_orders_' + S.user.email;
  store.set(k, [S.last, ...(store.get(k) || [])]);
  resetBooking(); S.stack = []; S.view = 'success'; render(); scrollTo(0, 0);
}

function pick(id) { S.sel = id; S.b.route = null; go('detail'); }
function quickSearch() {
  S.filter = $('#qType').value; S.q = ''; resetBooking();
  S.b.date = $('#qDate').value || S.b.date; S.b.days = +$('#qDays').value;
  nav('vehicles');
}
