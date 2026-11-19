/* =====================================================
   State aplikasi
   Satu objek state (S) dan fungsi turunan untuk booking.
   ===================================================== */

const S = { view:'home', stack:[], sel:null, filter:'semua', q:'', pay:'Transfer Bank', user:null, last:null, b:{} };
function resetBooking() {
  const d = new Date(); d.setDate(d.getDate() + 1);
  S.b = { date: iso(d), time:'08:00', pickup: PLACES[0], drop: PLACES[2], days: 1, route: null };
}
const veh = () => V.find(v => v.id === S.sel);
const retDate = () => { const d = new Date(S.b.date); d.setDate(d.getDate() + S.b.days); return d; };
const total = () => veh().price * S.b.days;
