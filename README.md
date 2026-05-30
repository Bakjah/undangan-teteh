# Undangan Pernikahan Meylisa & Rizky

Undangan pernikahan digital yang indah dan interaktif untuk menghormati hari spesial Meylisa dan Rizky.

## 🎀 Fitur

- **Cover Overlay** - Tampilan pembuka dengan tombol "Buka Undangan"
- **Hero Section** - Penampilan nama pasangan dan tanggal pernikahan
- **Countdown Timer** - Hitungan mundur menuju hari bahagia
- **Profil Pasangan** - Kartu profil untuk pengantin pria dan wanita
- **Timeline** - Perjalanan cinta dari awal bertemu hingga hari pernikahan
- **Informasi Acara** - Detail akad nikah dan resepsi
- **Galeri Foto** - Momen-momen indah sebelum hari H
- **RSVP & Ucapan** - Form konfirmasi kehadiran dan buku tamu digital
- **Kirim Hadiah** - Informasi rekening bank untuk mengirim hadiah

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js v18 atau lebih baru
- npm atau yarn

### Instalasi

1. **Clone atau download proyek ini**

2. **Install dependencies:**
```bash
npm install
```

3. **Jalankan development server:**
```bash
npm run dev
```

4. **Buka browser** dan visit `http://localhost:5173`

### Build untuk Produksi

```bash
npm run build
```

File production akan ada di folder `dist/`

### Preview Build Production

```bash
npm run preview
```

## 📁 Struktur Proyek

```
/app
├── index.html          # Entry HTML
├── package.json        # Dependencies dan scripts
├── vite.config.js      # Konfigurasi Vite
├── tailwind.config.js  # Konfigurasi Tailwind CSS
├── postcss.config.js   # Konfigurasi PostCSS
└── src/
    ├── main.jsx        # Entry point React
    ├── App.jsx         # Komponen utama aplikasi
    └── index.css       # Styles dan Tailwind directives
```

## 🎨 Kustomisasi

### Mengubah Nama dan Tanggal

Edit file `src/App.jsx`:

```jsx
// Line 10 - Ubah tanggal pernikahan
const weddingDate = new Date('2025-06-20T10:00:00');

// Line 12-13 - Nama pengantin
<h1 className="cover-names">Meylisa & Rizky</h1>
```

### Mengubah Informasi Orang Tua

Cari bagian `couple-card` di file `App.jsx`:

```jsx
<p className="couple-parents">Bpk. Hasan & Ibu Suryani</p>
```

### Mengubah Detail Acara

Cari bagian `event-card` di file `App.jsx`:

```jsx
<p className="event-date">20 Juni 2025</p>
<p className="event-time">10:00 - 12:00 WIB</p>
```

### Menambah Gambar Galeri

Ganti placeholder gallery dengan tag `<img>`:

```jsx
<div className="gallery-item">
  <img src="/path/to/image.jpg" alt="Pre-wedding" />
</div>
```

### Mengubah Informasi Rekening

Cari bagian `gift-card` di file `App.jsx`:

```jsx
<h3>Bank BCA</h3>
<p className="gift-number">123-456-7890</p>
<p className="gift-holder">a.n. Meylisa Amelia</p>
```

## 🎯 Teknologi yang Digunakan

- **React 18** - Library UI
- **Vite** - Build tool
- **Tailwind CSS** - CSS framework
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Cormorant Garamond, Montserrat, Dancing Script)

## 📱 Responsif

Aplikasi ini sepenuhnya responsif dan mendukung:
- Desktop
- Tablet
- Mobile

## 💝 Credits

Dibuat dengan cinta untuk Meylisa & Rizky

---

**Catatan:** Pastikan untuk terhubung ke internet saat pertama kali membuka untuk memuat font dan icon dari CDN.