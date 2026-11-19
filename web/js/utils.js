/* =====================================================
   Utilitas
   Helper umum: selector, format rupiah/tanggal, penyimpanan, toast.
   ===================================================== */

const $ = s => document.querySelector(s);
const rp = n => 'Rp ' + n.toLocaleString('id-ID');
const fmt = d => d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
const iso = d => d.toISOString().slice(0, 10);
const mem = {};
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return mem[k] ?? null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { mem[k] = v; } },
  del(k) { try { localStorage.removeItem(k); } catch { delete mem[k]; } }
};
function toast(t) { const e = $('#toast'); e.textContent = t; e.classList.remove('hidden'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.add('hidden'), 2200); }
