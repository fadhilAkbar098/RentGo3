/* =====================================================
   Titik masuk
   Dijalankan terakhir: pulihkan sesi, siapkan booking, tampilkan halaman.
   ===================================================== */

S.user = store.get('rentgo_auth'); // sesi dari halaman login utama
resetBooking();
$('#authArt').innerHTML = photo(V[0], 'rounded-3xl aspect-[4/3] shadow-2xl');
render();
