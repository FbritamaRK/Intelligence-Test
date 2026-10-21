# 🎯 Simulasi Tes Seleksi Kerja & Psikotes Lengkap
### (Ketelitian Data, Hafalan Kata IST ME, & Kemampuan Verbal TPA)

Aplikasi simulasi psikotes dan tes seleksi kerja interaktif modern yang dirancang khusus untuk persiapan menghadapi ujian seleksi di **BUMN, Perbankan (Bank BCA, Mandiri, BNI, BRI), CPNS / Kementerian, TNI / Polri, Sekolah Kedinasan, serta Perusahaan Multinasional**.

Aplikasi ini mencakup **3 modul tes psikotes standar seleksi kerja**:
1. **🎯 Tes Ketelitian & Kecermatan Data** (*Clerical Aptitude & Accuracy Test*) — Membandingkan dua deret data dengan kecepatan dan presisi tinggi.
2. **🧠 Psikotes Hafalan Kata** (*IST Subtes ME - Merkaufgaben*) — Menghafal kategori kata dalam waktu terbatas, lalu menjawab kategori kata berdasarkan huruf awalannya.
3. **📚 Tes Kemampuan Verbal** (*TPA Verbal*) — Menguji analogi hubungan kata, korelasi makna, sinonim (persamaan kata), dan antonim (lawan kata) dilengkapi pembahasan logika lengkap.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini dapat dijalankan di komputer lokal (**localhost**) maupun diakses langsung dari **HP / Smartphone / Tablet** melalui jaringan Wi-Fi lokal (**Network / LAN**) menggunakan Node.js & NPM, ataupun dibuka offline secara langsung.

### Langkah Pertama: Instalasi Dependensi (Hanya Sekali)
Buka terminal / Command Prompt di folder proyek ini, lalu jalankan:
```bash
npm install
```

---

### Cara 1: Menggunakan File Batch (Paling Praktis untuk Windows)
Cukup **klik dua kali** file:
```text
start.bat
```
Server Vite akan otomatis menyala dan menampilkan alamat akses untuk localhost dan jaringan Wi-Fi lokal.

---

### Cara 2: Menjalankan via Terminal / CMD / PowerShell
Buka folder proyek di terminal, lalu jalankan:
```bash
npm run dev
```
atau:
```bash
npm start
```

Setelah server aktif, terminal akan menampilkan tautan akses otomatis:
```text
  VITE v6.x.x  ready in ... ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.1.xxx:8080/
```

- **Akses Komputer Sendiri (Localhost):**
  ```text
  http://localhost:8080/
  ```
- **Akses dari HP / Tablet (Wi-Fi yang sama):**
  ```text
  http://<IP-Laptop-Anda>:8080/
  (Contoh: http://192.168.1.162:8080/)
  ```

---

### Cara 3: Buka Langsung Tanpa Server (Mode Offline File)
Anda juga bisa langsung membuka file:
```text
index.html
```
Cukup klik dua kali pada file `index.html` di Windows Explorer dan buka di Google Chrome, Microsoft Edge, atau browser favorit Anda tanpa memerlukan koneksi internet.

---

## 📱 Cara Mengakses dari HP / Smartphone (Tes Layar Sentuh)

1. Pastikan HP dan Laptop/Komputer **terhubung ke jaringan Wi-Fi yang sama**.
2. Jalankan `npm run dev` atau `start.bat` di laptop.
3. Lihat alamat pada baris **"Network"** di terminal (misal: `http://192.168.1.162:8080/`).
4. Buka browser di HP (Chrome / Safari), lalu ketikkan alamat tersebut.
5. Anda dapat langsung berlatih menggunakan tombol sentuh di layar HP.

> **Tips Firewall Windows:** Jika HP tidak dapat membuka halaman tersebut, pastikan Windows Defender Firewall mengizinkan akses Node.js pada jaringan Private / Home.

---

## ⌨️ Kontrol & Pintasan Keyboard Lengkap

| Layar / Posisi | Tombol | Fungsi | Keterangan |
| :--- | :--- | :--- | :--- |
| **Menu Utama (Home)** | <kbd>1</kbd> | Beralih ke **Tes Ketelitian** | Memilih tab Tes Ketelitian Data |
| **Menu Utama (Home)** | <kbd>2</kbd> | Beralih ke **Hafalan Kata** | Memilih tab Psikotes Hafalan Kata |
| **Menu Utama (Home)** | <kbd>3</kbd> | Beralih ke **Kemampuan Verbal** | Memilih tab Tes Kemampuan Verbal |
| **Menu Utama (Home)** | <kbd>Spasi</kbd> / <kbd>Enter</kbd> | **Mulai Tes Aktif** | Memulai simulasi tes yang sedang dipilih |
| **Tes Ketelitian** | <kbd>1</kbd> / <kbd>S</kbd> / <kbd>←</kbd> | **SAMA** | Memilih bahwa Data A dan Data B identik |
| **Tes Ketelitian** | <kbd>2</kbd> / <kbd>T</kbd> / <kbd>→</kbd> | **TIDAK SAMA** | Memilih bahwa Data A dan B berbeda |
| **Hafalan Kata (Tahap 1)** | <kbd>Spasi</kbd> / <kbd>Enter</kbd> | **Mulai Soal** | Menutup lembar hafalan dan langsung mulai pengerjaan soal |
| **Hafalan Kata (Tahap 2)** | <kbd>A</kbd>–<kbd>E</kbd> atau <kbd>1</kbd>–<kbd>5</kbd> | **Pilih Kategori** | Memilih kategori A (Bunga), B (Perkakas), C (Burung), D (Kesenian), E (Binatang) |
| **Kemampuan Verbal** | <kbd>A</kbd>–<kbd>D</kbd> atau <kbd>1</kbd>–<kbd>4</kbd> | **Pilih Jawaban** | Memilih opsi jawaban a, b, c, atau d |
| **Header Ujian** | <kbd>❌ Batalkan</kbd> | **Batalkan Tes** | Menghentikan tes yang sedang berjalan dan kembali ke Menu Utama |
| **Layar Hasil** | <kbd>Spasi</kbd> / <kbd>Enter</kbd> | **Mulai Ulang** | Mengulang simulasi tes baru secara instan |
| **Semua Modal** | <kbd>Esc</kbd> | **Tutup Modal** | Menutup jendela Pengaturan, Batal, atau Hasil |

---

## 🧩 3 Modul Simulasi Psikotes

### 1. 🎯 Tes Ketelitian & Kecermatan Data (Clerical Test)
Menguji ketahanan fokus mata, kecepatan refleks, dan akurasi dalam membandingkan dua blok data dalam batas waktu per soal yang sangat singkat (1.0 s/d 30.0 detik).
- **Jenis Data Soal**:
  - **Angka Murni (0–9)**: Jebakan transposisi urutan angka (`2837` vs `2387`) dan kemiripan bentuk angka (`3` vs `8`, `0` vs `8`, `1` vs `7`, `5` vs `6`).
  - **Alfanumerik (Kode/ID)**: Jebakan kode faktur/pegawai (`O` dengan `0`, `I` dengan `1`, `B` dengan `8`, `S` dengan `5`).
  - **Huruf Acak**: Menguji ketelitian urutan alfabet.
  - **Nama & Instansi**: Membandingkan gelar dan nama instansi (*"PT. Bank Central Asia Tbk."* vs *"PT. Bank Sentral Asia Tbk."*).
  - **Campuran (Mixed)**: Kombinasi menyeluruh layaknya ujian seleksi asli.
- **Pengaturan Waktu Fleksibel**: Pilihan preset (1.5s, 2.0s, 3.0s, 5.0s) serta slider & input bebas dari **1.0 hingga 30.0 detik**.
- **Visual Diff Highlighting**: Karakter yang berbeda pada Data B langsung **disorot dengan warna merah** pada lembar review hasil.

---

### 2. 🧠 Psikotes Hafalan Kata (IST Subtes ME - Merkaufgaben)
Tes memori jangka pendek standar **Intelligenz Struktur Test (IST)** yang digunakan secara luas di seleksi BUMN, Perbankan, TNI/Polri, dan Kedinasan.
- **Tahap 1: Menghafal Kategori & Kata (5 Menit)**:
  - Peserta diberikan daftar kategori dan kata-kata untuk dihafalkan:
    - 🌸 **BUNGA** : **D**ahlia, **F**lamboyan, **L**aret, **S**oka, **Y**asmin
    - 🔨 **PERKAKAS** : **C**angkul, **J**arum, **K**ikir, **P**alu, **W**ajan
    - 🦅 **BURUNG** : **E**lang, **I**tik, **T**ekukur, **N**uri, **W**alet
    - 🎭 **KESENIAN** : **A**rca, **G**amelan, **O**pera, **Q**uintet, **U**kiran
    - 🐯 **BINATANG** : **B**eruang, **H**arimau, **R**usa, **Z**ebra, **M**usang
  - Dilengkapi timer hitung mundur dan tips rahasia mnemonic huruf alfabetis (**A** = Arca, **B** = Beruang, **C** = Cangkul, dst.).
  - Tersedia tombol *"Saya Sudah Hafal, Mulai Jawab Soal!"* untuk peserta yang ingin langsung ujian sebelum waktu hafalan habis.
- **Tahap 2: Pengerjaan Soal (Lembar Ditutup)**:
  - Lembar hafalan ditutup sepenuhnya.
  - Peserta menjawab soal kategori berdasarkan huruf awalan:
    *"Kata yang berawalan huruf A termasuk dalam kategori....."* (Jawaban: d. Kesenian &rarr; Arca).
  - Pilihan kategori: a. Bunga, b. Perkakas, c. Burung, d. Kesenian, e. Binatang.
- **Review & Lembar Hafalan**:
  - Pada layar hasil, tersedia tombol **"📖 Lembar Hafalan"** untuk mengecek kembali kata dan huruf awalan yang keliru dijawab.

---

### 3. 📚 Tes Kemampuan Verbal (Analogi, Sinonim, Antonim, & Korelasi)
Menguji perbendaharaan kata, logika bahasa, dan relasi semantik standar **Tes Potensi Akademik (TPA)** dan SKD CPNS.
- **Kategori Soal yang Diujikan**:
  1. **🔗 Analogi Hubungan Kata**:
     - *Mobil - Bensin = Pelari - ....* (Jawaban: **Makanan** &mdash; hubungan sumber energi).
     - *Dingin - Selimut = Hujan - ....* (Jawaban: **Payung** &mdash; hubungan perlindungan cuaca).
     - *Semir - Sepatu = Sikat - ....* (Jawaban: **Gigi** &mdash; hubungan alat pembersih).
     - *Kepala - Pusing = Perut - ....* (Jawaban: **Mules** &mdash; hubungan organ & keluhan).
     - *Bugil - Pakaian = Gundul - ....* (Jawaban: **Rambut** &mdash; hubungan ketiadaan).
     - *Kayu - Pohon = Emas - ....* (Jawaban: **Tambang** &mdash; hubungan sumber asal material).
     - *Saya - Kami = Dia - ....* (Jawaban: **Mereka** &mdash; hubungan bentuk tunggal ke jamak).
     - *Kumis - Kucing = Belalai - ....* (Jawaban: **Gajah** &mdash; hubungan organ khas hewan).
     - Serta puluhan variasi analogi profesi, instrumen, dan sains lainnya.
  2. **↔️ Sinonim (Persamaan Kata)**:
     - Menguji kosakata baku dan serapan ilmiah (*Evolusi, Absah, Rancu, Nisbi, Tangkal, Defisit, Kredibel, Insinuasi, Anulir, Mutakhir, dll.*).
  3. **⚔️ Antonim (Lawan Kata)**:
     - Menguji lawan kata (*Konveks >< Cekung, Maya >< Nyata, Progresif >< Statis, Nomaden >< Menetap, Paradoksal >< Selaras, Sporadis >< Teratur, dll.*).
  4. **🧩 Korelasi Makna & Pengelompokan**:
     - Menentukan kata atau konsep yang **TIDAK termasuk dalam kelompoknya** (*Odd one out*).
- **Pembahasan Logika Lengkap**:
  - Setiap soal pada daftar review hasil dilengkapi penjelasan mendalam (**💡 Pembahasan**) mengenai logika keterkaitan makna antar kata.

---

## 📊 Standar Evaluasi & Skor Psikotes

Aplikasi menghitung performa Anda secara objektif berdasarkan standar penilaian psikotes:
- **Persentase Akurasi (%)**: Perbandingan jumlah jawaban benar terhadap total soal.
- **Tingkat Ketelitian / Grade Psikotes**:
  - **Grade A+ (Sangat Unggul / Istimewa)**: Akurasi &ge; 95% (Standar BUMN & Bank Top Tier).
  - **Grade A (Teliti / Daya Ingat Kuat)**: Akurasi 80% &ndash; 94% (Memenuhi kualifikasi staf).
  - **Grade B (Cukup)**: Akurasi 65% &ndash; 79% (Perlu peningkatan ketahanan fokus).
  - **Grade C (Kurang Teliti / Terburu-buru)**: Akurasi 50% &ndash; 64%.
  - **Grade D (Perlu Evaluasi)**: Akurasi &lt; 50%.
- **Kecepatan Rata-Rata**: Waktu respon rata-rata per soal dalam satuan detik.
- **Fitur "Ulangi yang Salah"**: Mengulang hanya soal-soal yang keliru atau habis waktu untuk melatih titik kelemahan Anda.

---

## 🔊 Efek Suara Interaktif

- Menggunakan **Web Audio API** bawaan browser (tanpa perlu koneksi internet atau mengunduh berkas suara eksternal).
- Efek suara interaktif meliputi: *Pop klik*, *Chime benar*, *Buzzer salah*, *Tick detikan timer*, dan *Melodi penyelesaian*.
- Tombol toggle suara (🔊 / 🔇) tersedia di semua layar untuk kenyamanan belajar.

---

*Selamat berlatih, tingkatkan kecepatan dan akurasi Anda, dan raih sukses dalam seleksi lowongan kerja!*
