/* =====================================================
   Halaman: Profil
   Template untuk Views.profile.
   ===================================================== */

Views.profile = () => `
  <div class="max-w-md mx-auto"><h1 class="text-xl font-extrabold text-brand-900 mb-5">Profil</h1>
    <div class="card p-6 text-center"><div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-brand-700 to-brand-500 text-white text-3xl font-extrabold grid place-items-center">${S.user.name[0].toUpperCase()}</div>
      <h2 class="mt-4 text-lg font-bold text-brand-900">${S.user.name}</h2><p class="text-sm text-slate-500">${S.user.email}</p>
      <button class="btn-o mt-6" onclick="logout()">Keluar dari akun</button></div></div>`;
