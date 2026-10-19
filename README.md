# 🎯 Simulasi Tes Ketelitian Data (Clerical Aptitude & Accuracy Test)

Aplikasi simulasi tes ketelitian data interaktif yang dirancang khusus untuk persiapan menghadapi **psikotes seleksi lowongan pekerjaan** di **BUMN, Perbankan (Bank BCA, Mandiri, BNI, BRI), CPNS / Kementerian, serta Perusahaan Swasta & Multinasional**.

Tes ini menguji kecepatan reaksi mata, daya fokus, serta ketelitian dalam membandingkan dua blok data dalam batas waktu yang sangat singkat.

---

## 🚀 Cara Menjalankan Menggunakan NPM

Aplikasi ini dapat dijalankan di komputer lokal (**localhost**) maupun diakses dari perangkat lain seperti **HP / Smartphone / Tablet** melalui jaringan Wi-Fi lokal (**Network / LAN**) menggunakan Node.js & NPM.

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
Buka folder proyek ini di terminal, lalu ketik perintah:
```bash
npm run dev
```
atau:
```bash
npm start
```

Setelah berjalan, terminal akan menampilkan tautan akses otomatis:
```text
  VITE v6.x.x  ready in ... ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.1.xxx:8080/
```

- **Akses Komputer Sendiri (Localhost):**
  ```text
  http://localhost:8080/
  ```
- **Akses dari HP / Tablet (Jaringan Wi-Fi yang sama):**
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
Cukup klik dua kali pada file `index.html` di Windows Explorer dan buka di Google Chrome, Microsoft Edge, atau browser favorit Anda.

---

## 📱 Cara Mengakses dari HP / Smartphone (Tes Layar Sentuh)

1. Pastikan HP dan Laptop/Komputer Anda **terhubung ke jaringan Wi-Fi yang sama**.
2. Jalankan `npm run dev` atau `start.bat` di laptop.
3. Lihat bagian **"Network"** pada terminal (misalnya `http://192.168.1.162:8080/`).
4. Buka browser di HP (Chrome / Safari), ketikkan alamat tersebut.
5. Anda dapat langsung berlatih menggunakan tombol sentuh di layar HP.

> **Tips Firewall Windows:** Jika HP tidak dapat membuka halaman tersebut, pastikan Windows Defender Firewall mengizinkan akses Node.js pada jaringan Private / Home.

---

## ⌨️ Kontrol & Pintasan Keyboard

| Tombol | Posisi / Layar | Fungsi | Keterangan |
| :--- | :--- | :--- | :--- |
| <kbd>Spasi</kbd> / <kbd>Enter</kbd> | **Home Menu** | **Mulai Simulasi** | Memulai simulasi langsung dari menu utama tanpa mouse |
| <kbd>1</kbd> / <kbd>S</kbd> / <kbd>←</kbd> | **Area Simulasi** | **SAMA** | Memilih bahwa Data A dan Data B identik |
| <kbd>2</kbd> / <kbd>T</kbd> / <kbd>→</kbd> | **Area Simulasi** | **TIDAK SAMA** | Memilih bahwa terdapat perbedaan antara Data A dan B |
| <kbd>❌ Batalkan</kbd> | **Header Simulasi** | **Batalkan Tes** | Menghentikan tes yang sedang berjalan dan kembali ke Menu Utama |
| <kbd>Spasi</kbd> / <kbd>Enter</kbd> | **Layar Hasil** | **Mulai Ulang** | Mengulang simulasi baru secara instan |
| <kbd>Esc</kbd> | **Modal** | **Tutup Modal** | Menutup jendela Pengaturan, Batal, atau Hasil |

---

## ✨ Fitur Unggulan

- **🏠 Tampilan Home Menu Terintegrasi**: Halaman menu utama yang elegan dilengkapi judul tes, penjelasan tujuan psikotes, dan **semua pengaturan langsung di layar utama**:
  - **Jenis Data**: Angka (0-9), Alfanumerik, Huruf Acak, Nama/Instansi, atau Campuran.
  - **Jumlah Soal**: 5, 10, 25, atau 50 soal.
  - **Batas Waktu Kustomisasi (1 s/d 30 Detik Maksimal)**: Pilihan preset (1.5s, 2.0s, 3.0s, 5.0s) serta slider & input angka bebas dari **1.0 hingga 30.0 detik**.
  - **Tingkat Kesulitan**: Mudah (5–7 digit), Sedang (8–10 digit), Sulit (11–14 digit).
  - Tombol **"🚀 Mulai Simulasi"** (dapat dimulai dengan klik atau tekan <kbd>Spasi</kbd>).
- **❌ Tombol Batalkan Tes**: Tersedia tombol pembatalan tes di header saat simulasi berjalan disertai dialog konfirmasi aman agar progres tidak hilang secara tidak sengaja.
- **⏱️ Timer Presisi Sub-Detik**: Batas waktu tiap soal (fleksibel 1–30 detik) dengan indikator warna peringatan dan progress bar yang menyusut secara halus.
- **🔄 Mode Otomatis**: Secara otomatis lanjut ke soal berikutnya begitu tombol ditekan atau ketika waktu habis.
- **🧠 Generator Soal Psikotes Realistis**:
  - **Angka Murni (Numerik)**: Format digit dengan jebakan subtle seperti transposisi urutan angka (`2837` vs `2387`) atau kemiripan bentuk angka (`3` vs `8`, `0` vs `8`, `1` vs `7`, `5` vs `6`).
  - **Alfanumerik (Kode/ID)**: Jebakan kode faktur/pegawai seperti `O` dengan `0`, `I` dengan `1`, `B` dengan `8`, `S` dengan `5`.
  - **Nama & Instansi**: Membandingkan gelar, nama orang, dan nama instansi bank/BUMN (*"PT. Bank Central Asia Tbk."* vs *"PT. Bank Sentral Asia Tbk."*).
  - **Campuran (Mixed)**: Kombinasi menyeluruh layaknya ujian seleksi asli.
- **📊 Evaluasi & Standar Skor Psikotes**:
  - Persentase Akurasi (%) dan Grade Ketelitian (*Grade A+ Sangat Unggul*, *Grade A Teliti*, *Grade B Cukup*, dst.).
  - Kecepatan rata-rata respon per soal.
  - **Diff Highlighting**: Karakter yang salah/berbeda pada Data B langsung **disorot dengan warna merah** pada daftar review soal.
  - Fitur **"Ulangi yang Salah"** untuk melatih soal-soal yang keliru atau habis waktu.
  - Tombol **"🏠 Menu Utama"** untuk kembali ke Home Menu kapan saja.
- **🔊 Efek Suara Interaktif**: Menggunakan *Web Audio API* bawaan (tanpa perlu koneksi internet atau download berkas audio) dengan tombol toggle Suara (🔊/🔇).

---

*Selamat berlatih dan sukses dalam seleksi lowongan kerja!*
