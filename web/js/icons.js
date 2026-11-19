/* =====================================================
   Ikon & ilustrasi
   Ikon SVG dan ilustrasi kendaraan (mobil, van, motor).
   ===================================================== */

const P = {
  back:'M15 18l-6-6 6-6', chev:'M9 18l6-6-6-6', search:'M21 21l-4.3-4.3M11 19a8 8 0 100-16 8 8 0 000 16',
  home:'M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z', list:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  user:'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8', check:'M20 6L9 17l-5-5',
  plus:'M12 5v14M5 12h14', minus:'M5 12h14', shield:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  pin:'M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12zM12 11a2 2 0 100-4 2 2 0 000 4',
  headset:'M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h1v-6H5a2 2 0 00-2 2zM21 18a2 2 0 01-2 2h-1v-6h1a2 2 0 012 2z',
  tag:'M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8zM7.5 7.5h.01',
  snow:'M12 2v20M4.9 7l14.2 10M4.9 17L19.1 7', music:'M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z',
  bag:'M6 7h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2zM9 7V5a2 2 0 012-2h2a2 2 0 012 2v2', route:'M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4zM8 17h6a3 3 0 000-6h-4a3 3 0 010-6h6'
};
const ic = (n, c = 'w-5 h-5') => `<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${P[n]}"/></svg>`;
const star = '<svg class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z"/></svg>';
function art(t, c = '#fff', cls = 'w-full') {
  const wheel = x => `<circle cx="${x}" cy="48" r="9" fill="#1e293b"/><circle cx="${x}" cy="48" r="4" fill="#cbd5e1"/>`;
  const body = {
    car: `<path d="M8 42l8-15q4-8 14-8h42q10 0 16 9l14 9q5 2 5 8v3H8z" fill="${c}" stroke="#94a3b8" stroke-width="1.5"/><path d="M28 24h22v12H22zM54 24h18q7 0 11 10H54z" fill="#bfdbfe"/>${wheel(34)}${wheel(92)}`,
    van: `<path d="M6 44V24q0-7 7-7h74q8 0 14 9l8 8q3 3 3 8v2H6z" fill="${c}" stroke="#94a3b8" stroke-width="1.5"/><path d="M16 23h18v12H16zM38 23h20v12H38zM62 23h20v12H62zM88 23h8q5 0 8 7H88z" fill="#bfdbfe"/>${wheel(32)}${wheel(98)}`,
    bike: `<circle cx="30" cy="46" r="11" fill="none" stroke="#1e293b" stroke-width="4"/><circle cx="92" cy="46" r="11" fill="none" stroke="#1e293b" stroke-width="4"/><path d="M30 46l18-18h20l10 18M48 28l-4-8h-8M70 28l8-10h10" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><rect x="46" y="22" width="26" height="8" rx="4" fill="#1e293b"/>`
  }[t];
  return `<svg class="${cls}" viewBox="0 0 120 62" aria-hidden="true">${body}</svg>`;
}
