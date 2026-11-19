/* =====================================================
   Data
   Data statis: kendaraan, lokasi, kota, fasilitas, menu navigasi.
   ===================================================== */

const V = [
  { id:1, img:'img/avanza', name:'Toyota Avanza',   type:'mobil',  cat:'MPV',      seat:'7 Kursi',   price:350000, rate:4.8, rev:120, color:'#fff',    art:'car' },
  { id:2, img:'img/innova', name:'Toyota Innova',   type:'mobil',  cat:'MPV',      seat:'7-8 Kursi', price:550000, rate:4.9, rev:98,  color:'#64748b', art:'car' },
  { id:3, img:'img/hiace', name:'Hiace Commuter',  type:'travel', cat:'Van',      seat:'14 Kursi',  price:900000, rate:4.8, rev:76,  color:'#fff',    art:'van' },
  { id:4, img:'img/brio', name:'Honda Brio',      type:'mobil',  cat:'City Car', seat:'5 Kursi',   price:250000, rate:4.7, rev:62,  color:'#fff',    art:'car' },
  { id:5, img:'img/vario', name:'Honda Vario 160', type:'motor',  cat:'Matic',    seat:'2 Orang',   price:120000, rate:4.8, rev:210, color:'#2563eb', art:'bike' },
  { id:6, img:'img/nmax', name:'Yamaha NMAX',     type:'motor',  cat:'Matic',    seat:'2 Orang',   price:180000, rate:4.9, rev:143, color:'#334155', art:'bike' }
];
const PLACES = ['Bandara YIA', 'Stasiun Tugu', 'Hotel Malioboro', 'Terminal Giwangan'];
const CITIES = ['Yogyakarta', 'Semarang', 'Solo', 'Surabaya', 'Bandung'];
const FACS = [['snow','AC'], ['music','Audio'], ['bag','Bagasi Luas'], ['shield','Asuransi']];
const NAV = [['home','Beranda','home'], ['vehicles','Kendaraan','search'], ['travel','Travel','route'], ['orders','Pesanan','list'], ['profile','Profil','user']];

const FEATURES = [
  ['shield', 'Aman & terpercaya',  'Unit terawat dan dilengkapi asuransi dasar di setiap perjalanan.'],
  ['headset','Layanan 24 jam',     'Admin kami siap membantu kapan pun Anda butuh.'],
  ['tag',    'Harga transparan',   'Tanpa biaya tersembunyi. Total terlihat sebelum Anda membayar.'],
  ['pin',    'Antar jemput',       'Kendaraan diantar ke bandara, stasiun, atau hotel Anda.']
];
const STEPS = [
  ['Pilih kendaraan',   'Cari mobil, motor, atau travel sesuai kebutuhan Anda.'],
  ['Isi data booking',  'Tentukan tanggal, durasi, dan lokasi jemput.'],
  ['Bayar dan berangkat','Pilih metode bayar, konfirmasi pesanan langsung muncul.']
];
const REVIEWS = [
  { n:'Rina Kusuma', c:'Sleman',   t:'Avanza bersih dan wangi, sopirnya tepat waktu. Liburan keluarga jadi tenang.' },
  { n:'Budi Santoso',c:'Jakarta',  t:'Dijemput di bandara tanpa drama. Harga sesuai yang tertulis di aplikasi.' },
  { n:'Dewi Lestari',c:'Semarang', t:'Pesan Hiace untuk 12 orang, prosesnya cepat dan adminnya ramah.' }
];
const FAQS = [
  ['Apa saja syarat sewa?',            'Cukup KTP dan SIM yang masih berlaku. Untuk travel, kendaraan sudah termasuk sopir.'],
  ['Apakah harga sudah termasuk BBM?', 'Harga sewa belum termasuk BBM, tol, dan parkir. Detailnya tertera di rincian pesanan.'],
  ['Apakah bisa diantar ke bandara?',  'Bisa. Pilih lokasi jemput Bandara YIA atau Stasiun Tugu saat mengisi form booking.'],
  ['Bagaimana jika jadwal berubah?',   'Hubungi admin lewat WhatsApp sebelum jadwal ambil agar bisa diatur ulang.']
];
