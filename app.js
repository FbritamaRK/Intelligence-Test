/**
 * Simulasi Tes Seleksi Kerja & Psikotes Interaktif
 * 1. Tes Ketelitian & Kecermatan Data (Clerical Aptitude & Accuracy Test)
 * 2. Psikotes Hafalan Kata (IST Subtest ME - Merkaufgaben)
 * 3. Tes Kemampuan Verbal (Analogi Kata, Sinonim, Antonim, & Korelasi Makna)
 * 
 * Standar Seleksi Kerja BUMN, Perbankan (BCA, Mandiri, BNI, BRI), CPNS, TNI/Polri, & Kedinasan.
 */

// --- Audio Synthesizer (Web Audio API) ---
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playCorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.08); // A5
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.18);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  playFinish() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.09;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    });
  }
}

// --- Bank Data Tes Ketelitian ---
const RealDataPool = {
  names: [
    "Muhammad Fadhil Ramadhan",
    "Bambang Soeprapto, S.T.",
    "Dr. Hj. Siti Nurjanah, M.Pd.",
    "PT. Bank Central Asia Tbk.",
    "PT. Telkom Indonesia (Persero)",
    "Kementerian Keuangan RI",
    "Raden Mas Suryokusumo",
    "Anindya Putri Maharani",
    "Ir. H. Achmad Zulkarnaen",
    "CV. Mitra Mandiri Sejahtera"
  ],
  addresses: [
    "Jl. Sudirman No. 45 Kav. 12",
    "Komp. Bintaro Jaya Sektor 9",
    "Graha Niaga Lt. 18 Suite 2",
    "RT 004 / RW 012 Kebayoran",
    "Gedung Wisma 46 Lt. 24",
    "Jl. MH Thamrin Blok A-3/7"
  ],
  lookalikePairs: [
    ['0', '8'], ['0', 'O'], ['8', 'B'], ['1', 'I'], ['1', 'l'], ['1', '7'],
    ['3', '8'], ['5', 'S'], ['6', 'b'], ['9', 'q'], ['2', 'Z'], ['V', 'U'],
    ['D', 'O'], ['C', 'G'], ['E', 'F'], ['P', 'R'], ['M', 'N'], ['K', 'X']
  ]
};

// --- Bank Data Psikotes Hafalan Kata (IST ME) ---
const MemoryDataSets = {
  set1: {
    id: 'set1',
    title: 'Standar IST (Bunga, Perkakas, Burung, Kesenian, Binatang)',
    categories: [
      { name: 'BUNGA', icon: '🌸', words: ['Dahlia', 'Flamboyan', 'Laret', 'Soka', 'Yasmin'] },
      { name: 'PERKAKAS', icon: '🔨', words: ['Cangkul', 'Jarum', 'Kikir', 'Palu', 'Wajan'] },
      { name: 'BURUNG', icon: '🦅', words: ['Elang', 'Itik', 'Tekukur', 'Nuri', 'Walet'] },
      { name: 'KESENIAN', icon: '🎭', words: ['Arca', 'Gamelan', 'Opera', 'Quintet', 'Ukiran'] },
      { name: 'BINATANG', icon: '🐯', words: ['Beruang', 'Harimau', 'Rusa', 'Zebra', 'Musang'] }
    ]
  },
  set2: {
    id: 'set2',
    title: 'IST Alternatif (Buah, Kendaraan, Profesi, Kota, Alat Musik)',
    categories: [
      { name: 'BUAH', icon: '🍎', words: ['Apel', 'Blewah', 'Cempedak', 'Delima', 'Mangga'] },
      { name: 'KENDARAAN', icon: '🚗', words: ['Fuso', 'Gondola', 'Helikopter', 'Jeep', 'Kapal'] },
      { name: 'PROFESI', icon: '💼', words: ['Nelayan', 'Operator', 'Pilot', 'Satpam', 'Tentara'] },
      { name: 'KOTA', icon: '🏙️', words: ['Bandung', 'Jakarta', 'Kupang', 'Medan', 'Surabaya'] },
      { name: 'ALAT MUSIK', icon: '🎸', words: ['Angklung', 'Biola', 'Cello', 'Gitar', 'Kendang'] }
    ]
  }
};

// --- Bank Data Tes Kemampuan Verbal ---
const VerbalQuestionBank = {
  // 1. Analogi Kata (Termasuk 8 Soal Asli di Foto + Soal Standar Seleksi BUMN & CPNS)
  analogi: [
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Mobil - Bensin',
      part2: 'Pelari - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Mobil - Bensin</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Pelari - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Makanan', 'Sepatu', 'Kaos', 'Lintasan'],
      answer: 'Makanan',
      explanation: 'Hubungan bahan bakar/sumber energi: Mobil memerlukan bensin untuk bergerak, pelari memerlukan makanan sebagai sumber energi tubuh.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Dingin - Selimut',
      part2: 'Hujan - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Dingin - Selimut</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Hujan - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Air', 'Payung', 'Dingin', 'Basah'],
      answer: 'Payung',
      explanation: 'Hubungan perlindungan dari kondisi alam: Selimut digunakan untuk melindungi dari rasa dingin, payung digunakan untuk melindungi dari hujan.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Semir - Sepatu',
      part2: 'Sikat - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Semir - Sepatu</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Sikat - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Kuku', 'Rambut', 'Televisi', 'Gigi'],
      answer: 'Gigi',
      explanation: 'Hubungan alat pembersih dengan objek yang dibersihkan/dirawat: Semir untuk sepatu, sikat (gigi) untuk gigi.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Kepala - Pusing',
      part2: 'Perut - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Kepala - Pusing</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Perut - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Batuk', 'Pilek', 'Mules', 'Gemuk'],
      answer: 'Mules',
      explanation: 'Hubungan bagian tubuh dan keluhan/gangguan: Kepala mengalami keluhan pusing, perut mengalami keluhan mules.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Bugil - Pakaian',
      part2: 'Gundul - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Bugil - Pakaian</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Gundul - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Botak', 'Kepala', 'Cukur', 'Rambut'],
      answer: 'Rambut',
      explanation: 'Hubungan ketiadaan sesuatu: Bugil adalah keadaan tanpa pakaian, gundul adalah keadaan kepala tanpa rambut.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Kayu - Pohon',
      part2: 'Emas - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Kayu - Pohon</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Emas - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Tambang', 'Perhiasan', 'Mahal', 'Logam'],
      answer: 'Tambang',
      explanation: 'Hubungan material dan sumber/tempat asalnya: Kayu diperoleh dari pohon, emas diperoleh dari tambang.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Saya - Kami',
      part2: 'Dia - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Saya - Kami</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Dia - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Kamu', 'Mereka', 'Anda', 'Kita'],
      answer: 'Mereka',
      explanation: 'Hubungan bentuk tunggal ke jamak: Saya (orang pertama tunggal) menjadi Kami (jamak). Dia (orang ketiga tunggal) menjadi Mereka (jamak).'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Kumis - Kucing',
      part2: 'Belalai - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Kumis - Kucing</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Belalai - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Ular', 'Harimau', 'Gajah', 'Hidung'],
      answer: 'Gajah',
      explanation: 'Hubungan ciri fisik khas hewan: Kumis merupakan ciri khas kucing, belalai merupakan ciri khas gajah.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Apoteker - Obat',
      part2: 'Koki - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Apoteker - Obat</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Koki - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Masakan', 'Dapur', 'Bumbu', 'Restoran'],
      answer: 'Masakan',
      explanation: 'Hubungan profesi dan produk yang diolah/dihasilkan: Apoteker meracik obat, koki mengolah masakan.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Nelayan - Perahu',
      part2: 'Petani - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Nelayan - Perahu</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Petani - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Traktor', 'Sawah', 'Padi', 'Lumpur'],
      answer: 'Traktor',
      explanation: 'Hubungan profesi dan sarana/alat kerja utama: Nelayan bekerja menggunakan perahu, petani membajak menggunakan traktor.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Bus - Terminal',
      part2: 'Kereta Api - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Bus - Terminal</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Kereta Api - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Stasiun', 'Rel', 'Gerbong', 'Masinis'],
      answer: 'Stasiun',
      explanation: 'Hubungan moda transportasi dan tempat pemberhentiannya: Bus singgah di terminal, kereta api singgah di stasiun.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Kertas - Pena',
      part2: 'Dinding - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Kertas - Pena</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Dinding - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Kuas', 'Paku', 'Semen', 'Batu'],
      answer: 'Kuas',
      explanation: 'Hubungan media dan alat poles/tulisnya: Kertas ditulis menggunakan pena, dinding diwarnai menggunakan kuas.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Suara - Telinga',
      part2: 'Bau - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Suara - Telinga</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Bau - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Hidung', 'Parfum', 'Bunga', 'Udara'],
      answer: 'Hidung',
      explanation: 'Hubungan stimulus sensori dan organ penangkapnya: Suara ditangkap oleh telinga, bau ditangkap oleh hidung.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Air - Menguap',
      part2: 'Es - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Air - Menguap</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Es - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Mencair', 'Membeku', 'Dingin', 'Kering'],
      answer: 'Mencair',
      explanation: 'Hubungan perubahan wujud zat saat terkena panas: Air dipanaskan menguap, es dipanaskan mencair.'
    },
    {
      type: 'analogi',
      tag: 'Analogi Hubungan Kata',
      part1: 'Janji - Bukti',
      part2: 'Ucapan - ....',
      promptHtml: `
        <div class="analogy-row">
          <span class="analogy-part">Janji - Bukti</span>
          <span class="analogy-eq">=</span>
          <span class="analogy-part">Ucapan - <span class="analogy-blank">....</span></span>
        </div>
      `,
      options: ['Tindakan', 'Pikiran', 'Kata', 'Tulisan'],
      answer: 'Tindakan',
      explanation: 'Hubungan pemenuhan: Janji membutuhkan bukti, ucapan membutuhkan tindakan nyata.'
    }
  ],

  // 2. Sinonim (Persamaan Kata)
  sinonim: [
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'EVOLUSI',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">EVOLUSI = ....</span>
        </div>
      `,
      options: ['Perubahan bertahap', 'Kemunduran drastis', 'Pertumbuhan kilat', 'Revolusi instan'],
      answer: 'Perubahan bertahap',
      explanation: 'Evolusi adalah proses perubahan yang berlangsung secara perlahan dan bertahap.'
    },
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'ABSAH',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">ABSAH = ....</span>
        </div>
      `,
      options: ['Resmi / Sah', 'Ragu-ragu', 'Batal / Gugur', 'Ilegal'],
      answer: 'Resmi / Sah',
      explanation: 'Absah berarti sah atau resmi menurut ketentuan/hukum yang berlaku.'
    },
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'RANCU',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">RANCU = ....</span>
        </div>
      `,
      options: ['Kacau / Tercampur', 'Rapi tersusun', 'Tepat sasaran', 'Jelas dipahami'],
      answer: 'Kacau / Tercampur',
      explanation: 'Rancu berarti campur aduk tidak beraturan, kacau (tentang susunan bahasa, pemikiran).'
    },
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'NISBI',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">NISBI = ....</span>
        </div>
      `,
      options: ['Relatif', 'Mutlak', 'Pasti', 'Abadi'],
      answer: 'Relatif',
      explanation: 'Nisbi bermakna hanya terlihat atau berlaku jika dibandingkan dengan yang lain; relatif.'
    },
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'TANGKAL',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">TANGKAL = ....</span>
        </div>
      `,
      options: ['Cegah / Tolak', 'Biarkan mengalir', 'Serang balik', 'Ikat erat'],
      answer: 'Cegah / Tolak',
      explanation: 'Tangkal bermakna menolak, mencegah (bahaya, penyakit, guna-guna).'
    },
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'DEFISIT',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">DEFISIT = ....</span>
        </div>
      `,
      options: ['Kekurangan', 'Kelebihan laba', 'Keseimbangan', 'Tabungan'],
      answer: 'Kekurangan',
      explanation: 'Defisit berarti kekurangan dalam kas/anggaran belanja (pengeluaran lebih banyak dari pemasukan).'
    },
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'KREDIBEL',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">KREDIBEL = ....</span>
        </div>
      `,
      options: ['Dapat dipercaya', 'Meragukan', 'Mudah goyah', 'Sukar dinilai'],
      answer: 'Dapat dipercaya',
      explanation: 'Kredibel berarti dapat dipercaya dan andal integritasnya.'
    },
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'INSINUASI',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">INSINUASI = ....</span>
        </div>
      `,
      options: ['Sindiran halus', 'Pujian terbuka', 'Ajakan damai', 'Perintah tegas'],
      answer: 'Sindiran halus',
      explanation: 'Insinuasi berarti sindiran tersembunyi atau tidak langsung yang bertujuan menuduh.'
    },
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'ANULIR',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">ANULIR = ....</span>
        </div>
      `,
      options: ['Membatalkan', 'Mengesahkan', 'Menambahkan', 'Memperbaiki'],
      answer: 'Membatalkan',
      explanation: 'Menganulir berarti membatalkan atau menyatakan tidak sah suatu keputusan/gol.'
    },
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'VIRTUAL',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">VIRTUAL = ....</span>
        </div>
      `,
      options: ['Maya / Simulasi', 'Fisik nyata', 'Kuno', 'Abadi'],
      answer: 'Maya / Simulasi',
      explanation: 'Virtual bermakna tampil nyata dalam wujud simulasi komputer atau maya.'
    },
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'MUTAKHIR',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">MUTAKHIR = ....</span>
        </div>
      `,
      options: ['Paling modern', 'Ketinggalan zaman', 'Sederhana', 'Terselubung'],
      answer: 'Paling modern',
      explanation: 'Mutakhir berarti terakhir, terbaru, atau paling modern (canggih).'
    },
    {
      type: 'sinonim',
      tag: 'Sinonim (Persamaan Kata)',
      word: 'KLIMAKS',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah kata yang bersinonim dengan:</span>
          <span class="vocab-target">KLIMAKS = ....</span>
        </div>
      `,
      options: ['Titik puncak', 'Awal mula', 'Jalan buntu', 'Penurunan'],
      answer: 'Titik puncak',
      explanation: 'Klimaks berarti puncak dari suatu hal, kejadian, atau alur cerita.'
    }
  ],

  // 3. Antonim (Lawan Kata)
  antonim: [
    {
      type: 'antonim',
      tag: 'Antonim (Lawan Kata)',
      word: 'KONVEKS',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah lawan kata (antonim) dari:</span>
          <span class="vocab-target antonim-target">KONVEKS &ne; ....</span>
        </div>
      `,
      options: ['Cekung (Konkaf)', 'Cembung', 'Datar rata', 'Meruncing'],
      answer: 'Cekung (Konkaf)',
      explanation: 'Konveks berarti cembung, lawan katanya adalah konkaf atau cekung.'
    },
    {
      type: 'antonim',
      tag: 'Antonim (Lawan Kata)',
      word: 'MAYA',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah lawan kata (antonim) dari:</span>
          <span class="vocab-target antonim-target">MAYA &ne; ....</span>
        </div>
      `,
      options: ['Nyata', 'Semu', 'Khayalan', 'Bayangan'],
      answer: 'Nyata',
      explanation: 'Maya berarti semu atau hanya ada dalam angan-angan, lawannya adalah nyata.'
    },
    {
      type: 'antonim',
      tag: 'Antonim (Lawan Kata)',
      word: 'PROGRESIF',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah lawan kata (antonim) dari:</span>
          <span class="vocab-target antonim-target">PROGRESIF &ne; ....</span>
        </div>
      `,
      options: ['Statis / Regresif', 'Maju berkembang', 'Dinamis', 'Aktif bergerak'],
      answer: 'Statis / Regresif',
      explanation: 'Progresif berarti ke arah kemajuan, lawan katanya adalah statis (jalan di tempat) atau regresif (mundur).'
    },
    {
      type: 'antonim',
      tag: 'Antonim (Lawan Kata)',
      word: 'NOMADEN',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah lawan kata (antonim) dari:</span>
          <span class="vocab-target antonim-target">NOMADEN &ne; ....</span>
        </div>
      `,
      options: ['Menetap', 'Berpindah-pindah', 'Mengembara', 'Berkelana'],
      answer: 'Menetap',
      explanation: 'Nomaden berarti berpindah-pindah dari satu tempat ke tempat lain, lawan katanya adalah menetap.'
    },
    {
      type: 'antonim',
      tag: 'Antonim (Lawan Kata)',
      word: 'PARADOKSAL',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah lawan kata (antonim) dari:</span>
          <span class="vocab-target antonim-target">PARADOKSAL &ne; ....</span>
        </div>
      `,
      options: ['Selaras / Sejalan', 'Bertentangan', 'Aneh / Ganjil', 'Kontradiktif'],
      answer: 'Selaras / Sejalan',
      explanation: 'Paradoksal berarti seolah-olah bertentangan dengan kebenaran umum, lawannya adalah selaras atau sejalan.'
    },
    {
      type: 'antonim',
      tag: 'Antonim (Lawan Kata)',
      word: 'SPORADIS',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah lawan kata (antonim) dari:</span>
          <span class="vocab-target antonim-target">SPORADIS &ne; ....</span>
        </div>
      `,
      options: ['Teratur / Rutin', 'Jarang sekali', 'Kadang-kadang', 'Acak'],
      answer: 'Teratur / Rutin',
      explanation: 'Sporadis bermakna keadaan yang tidak menentu atau sesekali, lawannya adalah teratur, rutin, atau kontinu.'
    },
    {
      type: 'antonim',
      tag: 'Antonim (Lawan Kata)',
      word: 'AMATIR',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah lawan kata (antonim) dari:</span>
          <span class="vocab-target antonim-target">AMATIR &ne; ....</span>
        </div>
      `,
      options: ['Profesional', 'Pemula', 'Peminat biasa', 'Awam'],
      answer: 'Profesional',
      explanation: 'Amatir berarti kegiatan yang dilakukan atas dasar kegemaran/bukan mata pencaharian, lawannya adalah profesional.'
    },
    {
      type: 'antonim',
      tag: 'Antonim (Lawan Kata)',
      word: 'ANTAGONIS',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah lawan kata (antonim) dari:</span>
          <span class="vocab-target antonim-target">ANTAGONIS &ne; ....</span>
        </div>
      `,
      options: ['Protagonis', 'Musuh', 'Penentang', 'Pemberontak'],
      answer: 'Protagonis',
      explanation: 'Antagonis berarti pihak yang menentang atau tokoh jahat, lawannya adalah protagonis.'
    },
    {
      type: 'antonim',
      tag: 'Antonim (Lawan Kata)',
      word: 'PASIF',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah lawan kata (antonim) dari:</span>
          <span class="vocab-target antonim-target">PASIF &ne; ....</span>
        </div>
      `,
      options: ['Aktif', 'Diam', 'Lesu', 'Tenang'],
      answer: 'Aktif',
      explanation: 'Pasif berarti tidak aktif atau menerima saja, lawan katanya adalah aktif/proaktif.'
    },
    {
      type: 'antonim',
      tag: 'Antonim (Lawan Kata)',
      word: 'MONOTON',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah lawan kata (antonim) dari:</span>
          <span class="vocab-target antonim-target">MONOTON &ne; ....</span>
        </div>
      `,
      options: ['Bervariasi', 'Seragam', 'Membosankan', 'Datar'],
      answer: 'Bervariasi',
      explanation: 'Monoton berarti berulang-ulang tanpa variasi, lawan katanya adalah bervariasi atau dinamis.'
    },
    {
      type: 'antonim',
      tag: 'Antonim (Lawan Kata)',
      word: 'PLURAL',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pilihlah lawan kata (antonim) dari:</span>
          <span class="vocab-target antonim-target">PLURAL &ne; ....</span>
        </div>
      `,
      options: ['Tunggal', 'Majemuk', 'Banyak', 'Kompleks'],
      answer: 'Tunggal',
      explanation: 'Plural berarti majemuk atau lebih dari satu (jamak), lawannya adalah tunggal (singular).'
    }
  ],

  // 4. Korelasi Makna & Pengelompokan Kata
  korelasi: [
    {
      type: 'korelasi',
      tag: 'Korelasi Makna & Pengelompokan',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pengelompokan Kata:</span>
          <span style="font-size:1.15rem; font-weight:800; color:#0f172a;">Manakah kata yang TIDAK termasuk dalam kelompoknya?</span>
        </div>
      `,
      options: ['Elang', 'Gagak', 'Burung Hantu', 'Harimau'],
      answer: 'Harimau',
      explanation: 'Elang, Gagak, dan Burung Hantu adalah unggas/burung, sedangkan Harimau adalah binatang mamalia darat.'
    },
    {
      type: 'korelasi',
      tag: 'Korelasi Makna & Pengelompokan',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pengelompokan Kata:</span>
          <span style="font-size:1.15rem; font-weight:800; color:#0f172a;">Manakah alat musik yang TIDAK sekelompok berdasarkan cara memainkannya?</span>
        </div>
      `,
      options: ['Gitar', 'Biola', 'Cello', 'Terompet'],
      answer: 'Terompet',
      explanation: 'Gitar, Biola, dan Cello dimainkan dengan cara dipetik/digesek (alat musik dawai), sedangkan Terompet adalah alat musik tiup.'
    },
    {
      type: 'korelasi',
      tag: 'Korelasi Makna & Pengelompokan',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pengelompokan Kata:</span>
          <span style="font-size:1.15rem; font-weight:800; color:#0f172a;">Manakah benda yang TIDAK termasuk dalam kelompoknya?</span>
        </div>
      `,
      options: ['Bumi', 'Mars', 'Jupiter', 'Matahari'],
      answer: 'Matahari',
      explanation: 'Bumi, Mars, dan Jupiter adalah planet, sedangkan Matahari adalah bintang induk di pusat tata surya.'
    },
    {
      type: 'korelasi',
      tag: 'Korelasi Makna & Pengelompokan',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pengelompokan Kata:</span>
          <span style="font-size:1.15rem; font-weight:800; color:#0f172a;">Manakah perkakas yang TIDAK sekelompok berdasarkan fungsi utamanya?</span>
        </div>
      `,
      options: ['Sendok', 'Garpu', 'Sumpit', 'Panci'],
      answer: 'Panci',
      explanation: 'Sendok, Garpu, dan Sumpit adalah alat makan, sedangkan Panci adalah alat memasak/peralatan dapur.'
    },
    {
      type: 'korelasi',
      tag: 'Korelasi Makna & Pengelompokan',
      promptHtml: `
        <div class="vocab-prompt-block">
          <span class="vocab-label">Pengelompokan Kata:</span>
          <span style="font-size:1.15rem; font-weight:800; color:#0f172a;">Manakah istilah yang TIDAK sekelompok dalam kategori mata uang?</span>
        </div>
      `,
      options: ['Rupiah', 'Ringgit', 'Dolar', 'Saham'],
      answer: 'Saham',
      explanation: 'Rupiah, Ringgit, dan Dolar adalah mata uang resmi negara (currency), sedangkan Saham adalah surat berharga/instrumen investasi.'
    }
  ]
};

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateQuestionItem(dataType, difficulty) {
  let minLen = 5, maxLen = 7;
  if (difficulty === 'medium') { minLen = 8; maxLen = 10; }
  else if (difficulty === 'hard') { minLen = 11; maxLen = 14; }

  let chosenType = dataType;
  if (dataType === 'mixed') {
    const types = ['numeric', 'alphanumeric', 'letters', 'verbal'];
    chosenType = randomChoice(types);
  }

  let strA = "";
  if (chosenType === 'numeric') {
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    for (let i = 0; i < len; i++) {
      strA += Math.floor(Math.random() * 10).toString();
    }
  } else if (chosenType === 'alphanumeric') {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    for (let i = 0; i < len; i++) {
      strA += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } else if (chosenType === 'letters') {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    for (let i = 0; i < len; i++) {
      strA += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  } else {
    strA = randomChoice(Math.random() > 0.5 ? RealDataPool.names : RealDataPool.addresses);
  }

  const isIdentical = Math.random() < 0.5;
  let strB = strA;

  if (!isIdentical) {
    strB = mutateStringSubtly(strA);
    if (strB === strA) {
      strB = strA.slice(0, -1) + (strA.slice(-1) === '9' ? '8' : '9');
    }
  }

  return {
    dataA: strA,
    dataB: strB,
    correctAnswer: isIdentical ? 'SAME' : 'DIFFERENT',
    type: chosenType
  };
}

function mutateStringSubtly(str) {
  const arr = str.split('');
  const mode = Math.random();

  if (mode < 0.45 && arr.length >= 3) {
    const candidates = [];
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] !== ' ' && arr[i + 1] !== ' ' && arr[i] !== arr[i + 1]) {
        candidates.push(i);
      }
    }
    if (candidates.length > 0) {
      const idx = randomChoice(candidates);
      const temp = arr[idx];
      arr[idx] = arr[idx + 1];
      arr[idx + 1] = temp;
      return arr.join('');
    }
  }

  if (mode < 0.8) {
    const validIndices = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== ' ' && arr[i] !== '-' && arr[i] !== '.') validIndices.push(i);
    }
    if (validIndices.length > 0) {
      const idx = randomChoice(validIndices);
      const ch = arr[idx];
      let replaced = false;
      for (const pair of RealDataPool.lookalikePairs) {
        if (ch === pair[0]) { arr[idx] = pair[1]; replaced = true; break; }
        if (ch === pair[1]) { arr[idx] = pair[0]; replaced = true; break; }
      }
      if (!replaced) {
        if (/\d/.test(ch)) {
          const num = parseInt(ch, 10);
          arr[idx] = ((num + 1) % 10).toString();
        } else if (/[a-zA-Z]/.test(ch)) {
          const code = ch.charCodeAt(0);
          arr[idx] = String.fromCharCode(code + 1);
        }
      }
      return arr.join('');
    }
  }

  const nonSpaceIndices = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== ' ') nonSpaceIndices.push(i);
  }
  if (nonSpaceIndices.length > 0) {
    const idx = randomChoice(nonSpaceIndices);
    if (Math.random() < 0.5 && arr.length > 6) {
      arr.splice(idx, 1);
    } else {
      arr.splice(idx, 0, arr[idx]);
    }
    return arr.join('');
  }

  return str + "1";
}

// --- Generator Soal Psikotes Hafalan Kata ---
function generateMemoryQuestions(setId, count = 20) {
  const set = MemoryDataSets[setId] || MemoryDataSets.set1;
  const allItems = [];

  set.categories.forEach(cat => {
    cat.words.forEach(word => {
      const firstLetter = word.charAt(0).toUpperCase();
      allItems.push({
        letter: firstLetter,
        word: word,
        category: cat.name,
        categoryIcon: cat.icon
      });
    });
  });

  const letterMap = {};
  allItems.forEach(item => {
    if (!letterMap[item.letter]) letterMap[item.letter] = [];
    letterMap[item.letter].push(item);
  });

  const pool = [];
  Object.keys(letterMap).forEach(ltr => {
    const items = letterMap[ltr];
    if (items.length === 1) {
      const itm = items[0];
      pool.push({
        letter: ltr,
        word: itm.word,
        correctCategory: itm.category,
        categoryIcon: itm.categoryIcon,
        promptText: `Kata yang berawalan huruf <span class="mem-q-letter">${ltr}</span> termasuk dalam kategori.....`,
        explanation: `Kata yang berawalan huruf <strong>${ltr}</strong> adalah <strong>${itm.word}</strong>, termasuk dalam kategori <strong>${itm.category}</strong>.`
      });
    } else {
      items.forEach(itm => {
        pool.push({
          letter: ltr,
          word: itm.word,
          correctCategory: itm.category,
          categoryIcon: itm.categoryIcon,
          promptText: `Kata <strong>"${itm.word}"</strong> yang berawalan huruf <span class="mem-q-letter">${ltr}</span> termasuk dalam kategori.....`,
          explanation: `Kata <strong>${itm.word}</strong> berawalan huruf <strong>${ltr}</strong> termasuk dalam kategori <strong>${itm.category}</strong>.`
        });
      });
    }
  });

  shuffleArray(pool);
  const targetCount = count === 'all' || count >= pool.length ? pool.length : count;
  return pool.slice(0, targetCount);
}

// --- Generator Soal Tes Kemampuan Verbal ---
function generateVerbalQuestions(subtest = 'all', count = 15) {
  let pool = [];

  if (subtest === 'analogi') {
    pool = [...VerbalQuestionBank.analogi];
  } else if (subtest === 'sinonim') {
    pool = [...VerbalQuestionBank.sinonim];
  } else if (subtest === 'antonim') {
    pool = [...VerbalQuestionBank.antonim];
  } else if (subtest === 'korelasi') {
    pool = [...VerbalQuestionBank.korelasi];
  } else {
    // Campuran: Gabungkan dari semua kategori
    pool = [
      ...VerbalQuestionBank.analogi,
      ...VerbalQuestionBank.sinonim,
      ...VerbalQuestionBank.antonim,
      ...VerbalQuestionBank.korelasi
    ];
  }

  shuffleArray(pool);
  const targetCount = Math.min(count, pool.length);
  return pool.slice(0, targetCount);
}

// --- Main Unified Application Engine ---
class PsychotestSuiteApp {
  constructor() {
    this.sound = new SoundEffects();
    this.activeTest = 'accuracy'; // 'accuracy' | 'memory' | 'verbal'

    // Konfigurasi Tes Ketelitian
    this.accuracyConfig = {
      questionCount: 5,
      timePerQuestion: 2.0,
      dataType: 'numeric',
      difficulty: 'medium',
      autoMode: true
    };

    // Konfigurasi Tes Hafalan Kata
    this.memoryConfig = {
      setId: 'set1',
      studyTime: 300, // 5 menit default
      qTime: 8,       // 8 detik per soal
      questionCount: 20
    };

    // Konfigurasi Tes Kemampuan Verbal
    this.verbalConfig = {
      subtest: 'all', // 'all' | 'analogi' | 'sinonim' | 'antonim' | 'korelasi'
      questionCount: 15,
      timePerQuestion: 15.0 // 15 detik per soal
    };

    // State Berjalan
    this.state = {
      currentView: 'home', // 'home' | 'test' | 'memory-study' | 'memory-test' | 'verbal-test'
      activeTestSession: null, // 'accuracy' | 'memory' | 'verbal'
      isRunning: false,
      isPaused: false,
      questions: [],
      currentIndex: 0,
      userAnswers: [],
      questionStartTime: 0,
      timeRemaining: 0,
      rafId: null,

      // State khusus Hafalan Kata
      studyTimeRemaining: 0,
      studyDurationMs: 0,
      studyStartMs: 0,
      studyRafId: null
    };

    this.cacheDOMElements();
    this.bindEvents();
    this.loadPreferences();
    this.syncUIWithConfig();
  }

  cacheDOMElements() {
    // Views
    this.elViewHome = document.getElementById('view-home');
    this.elViewTest = document.getElementById('view-test');
    this.elViewMemoryStudy = document.getElementById('view-memory-study');
    this.elViewMemoryTest = document.getElementById('view-memory-test');
    this.elViewVerbalTest = document.getElementById('view-verbal-test');

    // Navigation Switcher Tabs
    this.elTabNavAccuracy = document.getElementById('tab-nav-accuracy');
    this.elTabNavMemory = document.getElementById('tab-nav-memory');
    this.elTabNavVerbal = document.getElementById('tab-nav-verbal');

    this.elHomePanelAccuracy = document.getElementById('home-panel-accuracy');
    this.elHomePanelMemory = document.getElementById('home-panel-memory');
    this.elHomePanelVerbal = document.getElementById('home-panel-verbal');

    // Buttons Mulai di Home
    this.elBtnMainStart = document.getElementById('btn-main-start');
    this.elBtnMainStartMemory = document.getElementById('btn-main-start-memory');
    this.elBtnMainStartVerbal = document.getElementById('btn-main-start-verbal');

    // Controls Ketelitian di Home
    this.elHomePillsType = document.querySelectorAll('input[name="home-q-type"]');
    this.elHomePillsCount = document.querySelectorAll('input[name="home-q-count"]');
    this.elHomePillsTime = document.querySelectorAll('input[name="home-q-time"]');
    this.elHomePillsDiff = document.querySelectorAll('input[name="home-q-diff"]');
    this.elHomeCardTime = document.getElementById('home-card-time');
    this.elHomeCardDiff = document.getElementById('home-card-diff');
    this.elLabelActiveTime = document.getElementById('label-active-time');
    this.elHomeCustomTimeSlider = document.getElementById('home-custom-time-slider');
    this.elHomeCustomTimeInput = document.getElementById('home-custom-time-input');

    // Controls Hafalan Kata di Home
    this.elHomeMemPillsSet = document.querySelectorAll('input[name="home-mem-set"]');
    this.elHomeMemPillsStudyTime = document.querySelectorAll('input[name="home-mem-studytime"]');
    this.elHomeMemPillsQTime = document.querySelectorAll('input[name="home-mem-qtime"]');
    this.elHomeMemPillsCount = document.querySelectorAll('input[name="home-mem-count"]');
    this.elLabelActiveStudyTime = document.getElementById('label-active-studytime');
    this.elLabelActiveMemQTime = document.getElementById('label-active-mem-qtime');
    this.elHomeCardStudyTime = document.getElementById('home-card-studytime');
    this.elHomeCardMemQTime = document.getElementById('home-card-mem-qtime');

    // Controls Verbal di Home
    this.elHomeVerbalPillsSubtest = document.querySelectorAll('input[name="home-verbal-subtest"]');
    this.elHomeVerbalPillsCount = document.querySelectorAll('input[name="home-verbal-count"]');
    this.elHomeVerbalPillsTime = document.querySelectorAll('input[name="home-verbal-time"]');
    this.elLabelActiveVerbalTime = document.getElementById('label-active-verbal-time');
    this.elHomeCardVerbalType = document.getElementById('home-card-verbal-type');
    this.elHomeCardVerbalTime = document.getElementById('home-card-verbal-time');

    // Accuracy Test Header & Status
    this.elBtnCancelTest = document.getElementById('btn-cancel-test');
    this.elModeBadge = document.getElementById('mode-indicator');
    this.elQuestionCounter = document.getElementById('question-counter');
    this.elTimerVal = document.getElementById('timer-val');
    this.elProgressBar = document.getElementById('timer-progress-bar');
    this.elDataA = document.getElementById('data-a-content');
    this.elDataB = document.getElementById('data-b-content');
    this.elTestContainer = document.getElementById('test-body');
    this.elBtnSama = document.getElementById('btn-sama');
    this.elBtnTidakSama = document.getElementById('btn-tidak-sama');
    this.elStatCorrect = document.getElementById('stat-correct');
    this.elStatWrong = document.getElementById('stat-wrong');

    // Study View Elements
    this.elBtnCancelStudy = document.getElementById('btn-cancel-study');
    this.elStudyTimeDesc = document.getElementById('study-time-desc');
    this.elStudyTimerDisplay = document.getElementById('study-timer-display');
    this.elStudyProgressFill = document.getElementById('study-progress-fill');
    this.elMemoryCategoriesList = document.getElementById('memory-categories-list');
    this.elBtnFinishStudy = document.getElementById('btn-finish-study');

    // Memory Test View Elements
    this.elBtnCancelMemoryTest = document.getElementById('btn-cancel-memory-test');
    this.elMemQuestionCounter = document.getElementById('mem-question-counter');
    this.elMemTimerVal = document.getElementById('mem-timer-val');
    this.elMemProgressBar = document.getElementById('mem-timer-progress-bar');
    this.elMemProgressContainer = document.getElementById('mem-progress-container');
    this.elMemQuestionSentence = document.getElementById('mem-q-sentence');
    this.elMemQBadge = document.getElementById('mem-q-badge');
    this.elMemoryOptionsContainer = document.getElementById('memory-options-container');
    this.elMemQuestionBody = document.getElementById('mem-question-body');
    this.elMemStatCorrect = document.getElementById('mem-stat-correct');
    this.elMemStatWrong = document.getElementById('mem-stat-wrong');

    // Verbal Test View Elements
    this.elBtnCancelVerbalTest = document.getElementById('btn-cancel-verbal-test');
    this.elVerbalSubtestBadge = document.getElementById('verbal-subtest-badge');
    this.elVerbalSubtestInstruction = document.getElementById('verbal-subtest-instruction');
    this.elVerbalQuestionCounter = document.getElementById('verbal-question-counter');
    this.elVerbalTimerVal = document.getElementById('verbal-timer-val');
    this.elVerbalTimerProgressBar = document.getElementById('verbal-timer-progress-bar');
    this.elVerbalProgressContainer = document.getElementById('verbal-progress-container');
    this.elVerbalQuestionCard = document.getElementById('verbal-question-card');
    this.elVerbalQNumber = document.getElementById('verbal-q-number');
    this.elVerbalCategoryTag = document.getElementById('verbal-category-tag');
    this.elVerbalPromptDisplay = document.getElementById('verbal-prompt-display');
    this.elVerbalOptionsContainer = document.getElementById('verbal-options-container');
    this.elVerbalQuestionBody = document.getElementById('verbal-question-body');
    this.elVerbalStatCorrect = document.getElementById('verbal-stat-correct');
    this.elVerbalStatWrong = document.getElementById('verbal-stat-wrong');

    // Global Header Controls
    this.elBtnsSound = document.querySelectorAll('.btn-toggle-sound');
    this.elBtnsSettings = document.querySelectorAll('.btn-open-settings');

    // Settings Modal
    this.elModalSettings = document.getElementById('modal-settings');
    this.elBtnSaveSettings = document.getElementById('btn-save-settings');
    this.elBtnCloseSettings = document.getElementById('btn-close-settings');
    this.elSettingsLabelActiveTime = document.getElementById('settings-label-active-time');
    this.elSettingsCustomTimeSlider = document.getElementById('settings-custom-time-slider');
    this.elSettingsCustomTimeInput = document.getElementById('settings-custom-time-input');

    // Results Modal
    this.elModalResults = document.getElementById('modal-results');
    this.elResultsHeading = document.getElementById('results-heading');
    this.elResultScore = document.getElementById('result-score');
    this.elResultGradeBadge = document.getElementById('result-grade-badge');
    this.elResultKategori = document.getElementById('result-kategori');
    this.elStatBenar = document.getElementById('result-benar');
    this.elStatSalah = document.getElementById('result-salah');
    this.elStatTimeout = document.getElementById('result-timeout');
    this.elStatSpeed = document.getElementById('result-speed');
    this.elReviewSectionTitle = document.getElementById('review-section-title');
    this.elReviewList = document.getElementById('review-list');
    this.elBtnRestart = document.getElementById('btn-restart');
    this.elBtnRetryWrong = document.getElementById('btn-retry-wrong');
    this.elBtnViewSheet = document.getElementById('btn-view-sheet');
    this.elBtnResultHome = document.getElementById('btn-result-home');
    this.elBtnCloseResults = document.getElementById('btn-close-results');

    // Memory Sheet Review Modal
    this.elModalMemorySheet = document.getElementById('modal-memory-sheet');
    this.elBtnCloseMemorySheet = document.getElementById('btn-close-memory-sheet');
    this.elBtnCloseModalSheet = document.getElementById('btn-close-modal-sheet');
    this.elModalSheetContent = document.getElementById('modal-sheet-content');

    // Cancel Confirm Modal
    this.elModalConfirmCancel = document.getElementById('modal-confirm-cancel');
    this.elBtnCancelNo = document.getElementById('btn-cancel-no');
    this.elBtnCancelYes = document.getElementById('btn-cancel-yes');
  }

  bindEvents() {
    // Tab Navigation Switcher
    this.elTabNavAccuracy.addEventListener('click', () => {
      this.sound.playPop();
      this.switchTestTab('accuracy');
    });

    this.elTabNavMemory.addEventListener('click', () => {
      this.sound.playPop();
      this.switchTestTab('memory');
    });

    this.elTabNavVerbal.addEventListener('click', () => {
      this.sound.playPop();
      this.switchTestTab('verbal');
    });

    // Mulai Tes Ketelitian
    this.elBtnMainStart.addEventListener('click', () => {
      this.sound.playPop();
      this.startAccuracyTest();
    });

    // Mulai Tes Hafalan Kata
    this.elBtnMainStartMemory.addEventListener('click', () => {
      this.sound.playPop();
      this.startMemoryStudyPhase();
    });

    // Mulai Tes Verbal
    this.elBtnMainStartVerbal.addEventListener('click', () => {
      this.sound.playPop();
      this.startVerbalTest();
    });

    // Study Phase Actions
    this.elBtnFinishStudy.addEventListener('click', () => {
      this.sound.playPop();
      this.startMemoryTestPhase();
    });

    if (this.elBtnCancelStudy) {
      this.elBtnCancelStudy.addEventListener('click', () => {
        this.sound.playPop();
        this.showHomeView();
      });
    }

    // Cancel Test Actions
    [this.elBtnCancelTest, this.elBtnCancelMemoryTest, this.elBtnCancelVerbalTest].forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        this.sound.playPop();
        this.state.isPaused = true;
        cancelAnimationFrame(this.state.rafId);
        cancelAnimationFrame(this.state.studyRafId);
        this.elModalConfirmCancel.classList.add('active');
      });
    });

    if (this.elBtnCancelNo) {
      this.elBtnCancelNo.addEventListener('click', () => {
        this.sound.playPop();
        this.elModalConfirmCancel.classList.remove('active');
        this.state.isPaused = false;
        if (this.state.currentView === 'test' && this.state.isRunning) {
          this.startCountdownLoop();
        } else if (this.state.currentView === 'memory-test' && this.state.isRunning) {
          this.startMemoryQuestionCountdown();
        } else if (this.state.currentView === 'verbal-test' && this.state.isRunning) {
          this.startVerbalQuestionCountdown();
        } else if (this.state.currentView === 'memory-study') {
          this.startStudyCountdownLoop();
        }
      });
    }

    if (this.elBtnCancelYes) {
      this.elBtnCancelYes.addEventListener('click', () => {
        this.sound.playPop();
        this.elModalConfirmCancel.classList.remove('active');
        this.showHomeView();
      });
    }

    // Accuracy Test Choice Buttons
    this.elBtnSama.addEventListener('click', () => this.handleAccuracyAnswer('SAME'));
    this.elBtnTidakSama.addEventListener('click', () => this.handleAccuracyAnswer('DIFFERENT'));

    // Config: Accuracy Pills
    this.elHomePillsType.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.accuracyConfig.dataType = e.target.value;
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    this.elHomePillsCount.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.accuracyConfig.questionCount = parseInt(e.target.value, 10);
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    this.elHomePillsTime.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.updateCustomTime(parseFloat(e.target.value));
        this.sound.playPop();
      });
    });

    this.elHomePillsDiff.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.accuracyConfig.difficulty = e.target.value;
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    // Accuracy Custom Time Range Controls
    if (this.elHomeCustomTimeSlider) {
      this.elHomeCustomTimeSlider.addEventListener('input', (e) => {
        this.updateCustomTime(parseFloat(e.target.value));
      });
    }

    if (this.elHomeCustomTimeInput) {
      this.elHomeCustomTimeInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) this.updateCustomTime(val);
      });
      this.elHomeCustomTimeInput.addEventListener('change', (e) => {
        let val = parseFloat(e.target.value);
        if (isNaN(val) || val < 1.0) val = 1.0;
        if (val > 30.0) val = 30.0;
        this.updateCustomTime(val);
      });
    }

    // Config: Memory Pills
    this.elHomeMemPillsSet.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.memoryConfig.setId = e.target.value;
        this.savePreferences();
        this.sound.playPop();
      });
    });

    this.elHomeMemPillsStudyTime.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.memoryConfig.studyTime = parseInt(e.target.value, 10);
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    this.elHomeMemPillsQTime.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.memoryConfig.qTime = parseInt(e.target.value, 10);
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    this.elHomeMemPillsCount.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.memoryConfig.questionCount = parseInt(e.target.value, 10);
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    // Config: Verbal Pills
    this.elHomeVerbalPillsSubtest.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.verbalConfig.subtest = e.target.value;
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    this.elHomeVerbalPillsCount.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.verbalConfig.questionCount = parseInt(e.target.value, 10);
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    this.elHomeVerbalPillsTime.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.verbalConfig.timePerQuestion = parseFloat(e.target.value);
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    // Sound Toggles
    this.elBtnsSound.forEach(btn => {
      btn.addEventListener('click', () => {
        this.sound.enabled = !this.sound.enabled;
        this.updateSoundButtons();
        if (this.sound.enabled) this.sound.playPop();
      });
    });

    // Settings Modal
    this.elBtnsSettings.forEach(btn => {
      btn.addEventListener('click', () => this.openSettings());
    });
    this.elBtnCloseSettings.addEventListener('click', () => this.closeSettings());
    this.elBtnSaveSettings.addEventListener('click', () => this.saveSettings());

    // Mode Toggle Pill (Accuracy Test)
    if (this.elModeBadge) {
      this.elModeBadge.addEventListener('click', () => {
        this.accuracyConfig.autoMode = !this.accuracyConfig.autoMode;
        this.updateModeBadge();
        this.sound.playPop();
      });
    }

    // Results Actions
    this.elBtnRestart.addEventListener('click', () => {
      this.elModalResults.classList.remove('active');
      if (this.state.activeTestSession === 'memory') {
        this.startMemoryStudyPhase();
      } else if (this.state.activeTestSession === 'verbal') {
        this.startVerbalTest();
      } else {
        this.startAccuracyTest();
      }
    });

    this.elBtnRetryWrong.addEventListener('click', () => {
      this.retryWrongQuestions();
    });

    this.elBtnViewSheet.addEventListener('click', () => {
      this.sound.playPop();
      this.renderMemorySheetContent(this.memoryConfig.setId, this.elModalSheetContent);
      this.elModalMemorySheet.classList.add('active');
    });

    [this.elBtnCloseMemorySheet, this.elBtnCloseModalSheet].forEach(btn => {
      if (btn) btn.addEventListener('click', () => this.elModalMemorySheet.classList.remove('active'));
    });

    this.elBtnResultHome.addEventListener('click', () => {
      this.sound.playPop();
      this.elModalResults.classList.remove('active');
      this.showHomeView();
    });

    this.elBtnCloseResults.addEventListener('click', () => {
      this.elModalResults.classList.remove('active');
    });

    // Overlay backdrop clicks
    [this.elModalSettings, this.elModalResults, this.elModalConfirmCancel, this.elModalMemorySheet].forEach(overlay => {
      if (!overlay) return;
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
          if (overlay === this.elModalConfirmCancel) {
            this.state.isPaused = false;
            if (this.state.currentView === 'test' && this.state.isRunning) {
              this.startCountdownLoop();
            } else if (this.state.currentView === 'memory-test' && this.state.isRunning) {
              this.startMemoryQuestionCountdown();
            } else if (this.state.currentView === 'verbal-test' && this.state.isRunning) {
              this.startVerbalQuestionCountdown();
            }
          }
        }
      });
    });

    // Keyboard Navigation
    window.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  switchTestTab(tab) {
    this.activeTest = tab;

    // Reset all tabs
    [this.elTabNavAccuracy, this.elTabNavMemory, this.elTabNavVerbal].forEach(btn => {
      if (!btn) return;
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });

    [this.elHomePanelAccuracy, this.elHomePanelMemory, this.elHomePanelVerbal].forEach(panel => {
      if (!panel) return;
      panel.classList.remove('active');
    });

    if (tab === 'accuracy') {
      this.elTabNavAccuracy.classList.add('active');
      this.elTabNavAccuracy.setAttribute('aria-selected', 'true');
      this.elHomePanelAccuracy.classList.add('active');
    } else if (tab === 'memory') {
      this.elTabNavMemory.classList.add('active');
      this.elTabNavMemory.setAttribute('aria-selected', 'true');
      this.elHomePanelMemory.classList.add('active');
    } else {
      this.elTabNavVerbal.classList.add('active');
      this.elTabNavVerbal.setAttribute('aria-selected', 'true');
      this.elHomePanelVerbal.classList.add('active');
    }

    this.savePreferences();
  }

  showHomeView() {
    this.state.currentView = 'home';
    this.state.isRunning = false;
    cancelAnimationFrame(this.state.rafId);
    cancelAnimationFrame(this.state.studyRafId);

    this.elViewTest.classList.remove('active');
    this.elViewMemoryStudy.classList.remove('active');
    this.elViewMemoryTest.classList.remove('active');
    this.elViewVerbalTest.classList.remove('active');
    this.elViewHome.classList.add('active');

    this.syncUIWithConfig();
  }

  // ==========================================
  // 1. TES KETELITIAN DATA METHODS
  // ==========================================
  startAccuracyTest(customQuestions = null) {
    this.state.activeTestSession = 'accuracy';
    this.state.currentView = 'test';
    cancelAnimationFrame(this.state.rafId);
    cancelAnimationFrame(this.state.studyRafId);

    this.elViewHome.classList.remove('active');
    this.elViewMemoryStudy.classList.remove('active');
    this.elViewMemoryTest.classList.remove('active');
    this.elViewVerbalTest.classList.remove('active');
    this.elViewTest.classList.add('active');

    if (customQuestions && customQuestions.length > 0) {
      this.state.questions = customQuestions;
    } else {
      const list = [];
      for (let i = 0; i < this.accuracyConfig.questionCount; i++) {
        list.push(generateQuestionItem(this.accuracyConfig.dataType, this.accuracyConfig.difficulty));
      }
      this.state.questions = list;
    }

    this.state.currentIndex = 0;
    this.state.userAnswers = [];
    this.state.isRunning = true;
    this.state.isPaused = false;

    this.updateAccuracyLiveStats();
    this.displayCurrentAccuracyQuestion();
  }

  displayCurrentAccuracyQuestion() {
    if (this.state.currentIndex >= this.state.questions.length) {
      this.finishAccuracyTest();
      return;
    }

    const q = this.state.questions[this.state.currentIndex];
    const total = this.state.questions.length;
    this.elQuestionCounter.textContent = `Soal ${this.state.currentIndex + 1} / ${total}`;

    this.elDataA.textContent = q.dataA;
    this.elDataB.textContent = q.dataB;

    this.state.questionStartTime = performance.now();
    const timeLimit = this.accuracyConfig.timePerQuestion;
    this.state.timeRemaining = timeLimit;

    this.elTimerVal.textContent = `${timeLimit.toFixed(1)}s`;
    this.elTimerVal.classList.remove('warning');
    this.elProgressBar.classList.remove('danger');
    this.elProgressBar.style.width = '100%';

    this.startCountdownLoop();
  }

  startCountdownLoop() {
    cancelAnimationFrame(this.state.rafId);
    const timeLimitMs = this.accuracyConfig.timePerQuestion * 1000;
    const startMs = performance.now();

    const frame = (now) => {
      if (!this.state.isRunning || this.state.isPaused) return;

      const elapsed = now - startMs;
      const remainingMs = Math.max(0, timeLimitMs - elapsed);
      const remainingSec = remainingMs / 1000;
      this.state.timeRemaining = remainingSec;

      this.elTimerVal.textContent = `${remainingSec.toFixed(1)}s`;
      const pct = (remainingMs / timeLimitMs) * 100;
      this.elProgressBar.style.width = `${pct}%`;

      if (remainingSec <= 0.8 && remainingSec > 0.05) {
        this.elTimerVal.classList.add('warning');
        this.elProgressBar.classList.add('danger');
      }

      if (remainingMs <= 0) {
        this.handleAccuracyTimeout();
        return;
      }

      this.state.rafId = requestAnimationFrame(frame);
    };

    this.state.rafId = requestAnimationFrame(frame);
  }

  handleAccuracyAnswer(chosenAnswer) {
    if (!this.state.isRunning || this.state.currentView !== 'test') return;
    cancelAnimationFrame(this.state.rafId);

    const q = this.state.questions[this.state.currentIndex];
    const timeSpent = (performance.now() - this.state.questionStartTime) / 1000;
    const isCorrect = chosenAnswer === q.correctAnswer;

    if (isCorrect) {
      this.sound.playCorrect();
      this.triggerFlash('correct', this.elTestContainer);
    } else {
      this.sound.playWrong();
      this.triggerFlash('wrong', this.elTestContainer);
    }

    this.state.userAnswers.push({
      question: q,
      answer: chosenAnswer,
      isCorrect: isCorrect,
      timeSpent: timeSpent,
      timeout: false
    });

    this.updateAccuracyLiveStats();
    this.state.currentIndex++;

    if (this.accuracyConfig.autoMode) {
      setTimeout(() => this.displayCurrentAccuracyQuestion(), 100);
    } else {
      this.displayCurrentAccuracyQuestion();
    }
  }

  handleAccuracyTimeout() {
    cancelAnimationFrame(this.state.rafId);
    this.sound.playWrong();
    this.triggerFlash('wrong', this.elTestContainer);

    const q = this.state.questions[this.state.currentIndex];
    this.state.userAnswers.push({
      question: q,
      answer: 'TIMEOUT',
      isCorrect: false,
      timeSpent: this.accuracyConfig.timePerQuestion,
      timeout: true
    });

    this.updateAccuracyLiveStats();
    this.state.currentIndex++;
    setTimeout(() => this.displayCurrentAccuracyQuestion(), 120);
  }

  updateAccuracyLiveStats() {
    const correctCount = this.state.userAnswers.filter(a => a.isCorrect).length;
    const wrongCount = this.state.userAnswers.filter(a => !a.isCorrect).length;
    this.elStatCorrect.textContent = correctCount;
    this.elStatWrong.textContent = wrongCount;
  }

  finishAccuracyTest() {
    this.state.isRunning = false;
    cancelAnimationFrame(this.state.rafId);
    this.sound.playFinish();

    this.showEvaluationModal('accuracy');
  }

  // ==========================================
  // 2. PSIKOTES HAFALAN KATA (IST ME) METHODS
  // ==========================================
  startMemoryStudyPhase() {
    this.state.activeTestSession = 'memory';
    this.state.currentView = 'memory-study';
    cancelAnimationFrame(this.state.rafId);
    cancelAnimationFrame(this.state.studyRafId);

    this.elViewHome.classList.remove('active');
    this.elViewTest.classList.remove('active');
    this.elViewVerbalTest.classList.remove('active');
    this.elViewMemoryTest.classList.remove('active');
    this.elViewMemoryStudy.classList.add('active');

    // Render Lembar Hafalan
    this.renderMemorySheetContent(this.memoryConfig.setId, this.elMemoryCategoriesList);

    const studySeconds = this.memoryConfig.studyTime;
    const timeText = studySeconds === 0 ? 'Bebas' : (studySeconds >= 60 ? `${Math.round(studySeconds / 60)} menit` : `${studySeconds} detik`);
    this.elStudyTimeDesc.textContent = timeText;

    if (studySeconds > 0) {
      this.state.studyDurationMs = studySeconds * 1000;
      this.state.studyStartMs = performance.now();
      this.startStudyCountdownLoop();
    } else {
      this.elStudyTimerDisplay.textContent = "Bebas";
      this.elStudyProgressFill.style.width = "100%";
    }
  }

  startStudyCountdownLoop() {
    cancelAnimationFrame(this.state.studyRafId);
    const duration = this.state.studyDurationMs;

    const frame = (now) => {
      if (this.state.currentView !== 'memory-study' || this.state.isPaused) return;

      const elapsed = now - this.state.studyStartMs;
      const remainingMs = Math.max(0, duration - elapsed);
      const remainingSec = Math.ceil(remainingMs / 1000);

      const mins = Math.floor(remainingSec / 60);
      const secs = remainingSec % 60;
      this.elStudyTimerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      const pct = (remainingMs / duration) * 100;
      this.elStudyProgressFill.style.width = `${pct}%`;

      if (remainingMs <= 0) {
        this.sound.playFinish();
        this.startMemoryTestPhase();
        return;
      }

      this.state.studyRafId = requestAnimationFrame(frame);
    };

    this.state.studyRafId = requestAnimationFrame(frame);
  }

  startMemoryTestPhase(customQuestions = null) {
    this.state.currentView = 'memory-test';
    cancelAnimationFrame(this.state.studyRafId);
    cancelAnimationFrame(this.state.rafId);

    this.elViewMemoryStudy.classList.remove('active');
    this.elViewHome.classList.remove('active');
    this.elViewTest.classList.remove('active');
    this.elViewVerbalTest.classList.remove('active');
    this.elViewMemoryTest.classList.add('active');

    if (customQuestions && customQuestions.length > 0) {
      this.state.questions = customQuestions;
    } else {
      this.state.questions = generateMemoryQuestions(this.memoryConfig.setId, this.memoryConfig.questionCount);
    }

    this.state.currentIndex = 0;
    this.state.userAnswers = [];
    this.state.isRunning = true;
    this.state.isPaused = false;

    this.updateMemoryLiveStats();
    this.renderMemoryOptionsButtons();
    this.displayCurrentMemoryQuestion();
  }

  renderMemoryOptionsButtons() {
    const set = MemoryDataSets[this.memoryConfig.setId] || MemoryDataSets.set1;
    this.elMemoryOptionsContainer.innerHTML = '';

    const alphaKeys = ['a', 'b', 'c', 'd', 'e'];
    set.categories.forEach((cat, idx) => {
      const alpha = alphaKeys[idx] || (idx + 1);
      const btn = document.createElement('button');
      btn.className = 'btn-mem-option';
      btn.dataset.category = cat.name;
      btn.dataset.index = idx;
      btn.setAttribute('aria-label', `Pilih ${alpha}. ${cat.name}`);

      const catFormatted = cat.name.charAt(0) + cat.name.slice(1).toLowerCase();

      btn.innerHTML = `
        <div class="opt-left">
          <span class="opt-alpha-badge">${alpha}.</span>
          <span class="opt-name-text">${cat.icon} ${catFormatted}</span>
        </div>
        <span class="opt-hotkey-hint">[${alpha.toUpperCase()} / ${idx + 1}]</span>
      `;

      btn.addEventListener('click', () => {
        this.handleMemoryAnswer(cat.name);
      });

      this.elMemoryOptionsContainer.appendChild(btn);
    });
  }

  displayCurrentMemoryQuestion() {
    if (this.state.currentIndex >= this.state.questions.length) {
      this.finishMemoryTest();
      return;
    }

    const q = this.state.questions[this.state.currentIndex];
    const total = this.state.questions.length;

    this.elMemQuestionCounter.textContent = `Soal ${this.state.currentIndex + 1} / ${total}`;
    this.elMemQBadge.textContent = `Pertanyaan ${this.state.currentIndex + 1}`;
    this.elMemQuestionSentence.innerHTML = q.promptText;

    this.state.questionStartTime = performance.now();
    const timeLimit = this.memoryConfig.qTime;

    if (timeLimit > 0) {
      this.elMemTimerVal.textContent = `${timeLimit.toFixed(1)}s`;
      this.elMemTimerVal.classList.remove('warning');
      this.elMemProgressBar.classList.remove('danger');
      this.elMemProgressBar.style.width = '100%';
      this.elMemProgressContainer.style.display = 'block';
      this.startMemoryQuestionCountdown();
    } else {
      this.elMemTimerVal.textContent = `Bebas`;
      this.elMemProgressContainer.style.display = 'none';
    }
  }

  startMemoryQuestionCountdown() {
    cancelAnimationFrame(this.state.rafId);
    const timeLimitMs = this.memoryConfig.qTime * 1000;
    const startMs = performance.now();

    const frame = (now) => {
      if (!this.state.isRunning || this.state.isPaused || this.state.currentView !== 'memory-test') return;

      const elapsed = now - startMs;
      const remainingMs = Math.max(0, timeLimitMs - elapsed);
      const remainingSec = remainingMs / 1000;

      this.elMemTimerVal.textContent = `${remainingSec.toFixed(1)}s`;
      const pct = (remainingMs / timeLimitMs) * 100;
      this.elMemProgressBar.style.width = `${pct}%`;

      if (remainingSec <= 2.0 && remainingSec > 0.05) {
        this.elMemTimerVal.classList.add('warning');
        this.elMemProgressBar.classList.add('danger');
      }

      if (remainingMs <= 0) {
        this.handleMemoryTimeout();
        return;
      }

      this.state.rafId = requestAnimationFrame(frame);
    };

    this.state.rafId = requestAnimationFrame(frame);
  }

  handleMemoryAnswer(chosenCategory) {
    if (!this.state.isRunning || this.state.currentView !== 'memory-test') return;
    cancelAnimationFrame(this.state.rafId);

    const q = this.state.questions[this.state.currentIndex];
    const timeSpent = (performance.now() - this.state.questionStartTime) / 1000;
    const isCorrect = chosenCategory === q.correctCategory;

    if (isCorrect) {
      this.sound.playCorrect();
      this.triggerFlash('correct', this.elMemQuestionBody);
    } else {
      this.sound.playWrong();
      this.triggerFlash('wrong', this.elMemQuestionBody);
    }

    this.state.userAnswers.push({
      question: q,
      answer: chosenCategory,
      isCorrect: isCorrect,
      timeSpent: timeSpent,
      timeout: false
    });

    this.updateMemoryLiveStats();
    this.state.currentIndex++;
    setTimeout(() => this.displayCurrentMemoryQuestion(), 180);
  }

  handleMemoryTimeout() {
    cancelAnimationFrame(this.state.rafId);
    this.sound.playWrong();
    this.triggerFlash('wrong', this.elMemQuestionBody);

    const q = this.state.questions[this.state.currentIndex];
    this.state.userAnswers.push({
      question: q,
      answer: 'TIMEOUT',
      isCorrect: false,
      timeSpent: this.memoryConfig.qTime,
      timeout: true
    });

    this.updateMemoryLiveStats();
    this.state.currentIndex++;
    setTimeout(() => this.displayCurrentMemoryQuestion(), 200);
  }

  updateMemoryLiveStats() {
    const correctCount = this.state.userAnswers.filter(a => a.isCorrect).length;
    const wrongCount = this.state.userAnswers.filter(a => !a.isCorrect).length;
    this.elMemStatCorrect.textContent = correctCount;
    this.elMemStatWrong.textContent = wrongCount;
  }

  finishMemoryTest() {
    this.state.isRunning = false;
    cancelAnimationFrame(this.state.rafId);
    this.sound.playFinish();

    this.showEvaluationModal('memory');
  }

  // ==========================================
  // 3. TES KEMAMPUAN VERBAL METHODS
  // ==========================================
  startVerbalTest(customQuestions = null) {
    this.state.activeTestSession = 'verbal';
    this.state.currentView = 'verbal-test';
    cancelAnimationFrame(this.state.rafId);
    cancelAnimationFrame(this.state.studyRafId);

    this.elViewHome.classList.remove('active');
    this.elViewTest.classList.remove('active');
    this.elViewMemoryStudy.classList.remove('active');
    this.elViewMemoryTest.classList.remove('active');
    this.elViewVerbalTest.classList.add('active');

    if (customQuestions && customQuestions.length > 0) {
      this.state.questions = customQuestions;
    } else {
      this.state.questions = generateVerbalQuestions(this.verbalConfig.subtest, this.verbalConfig.questionCount);
    }

    this.state.currentIndex = 0;
    this.state.userAnswers = [];
    this.state.isRunning = true;
    this.state.isPaused = false;

    this.updateVerbalLiveStats();
    this.displayCurrentVerbalQuestion();
  }

  displayCurrentVerbalQuestion() {
    if (this.state.currentIndex >= this.state.questions.length) {
      this.finishVerbalTest();
      return;
    }

    const q = this.state.questions[this.state.currentIndex];
    const total = this.state.questions.length;

    this.elVerbalQuestionCounter.textContent = `Soal ${this.state.currentIndex + 1} / ${total}`;
    this.elVerbalQNumber.textContent = `Soal ${this.state.currentIndex + 1}`;
    this.elVerbalCategoryTag.textContent = q.tag;

    // Subtest strip badge & instruction
    this.elVerbalSubtestBadge.textContent = q.tag;
    if (q.type === 'analogi') {
      this.elVerbalSubtestInstruction.textContent = "Pilihlah kata yang memiliki hubungan analogi paling sesuai.";
    } else if (q.type === 'sinonim') {
      this.elVerbalSubtestInstruction.textContent = "Pilihlah kata yang memiliki makna paling dekat (persamaan kata).";
    } else if (q.type === 'antonim') {
      this.elVerbalSubtestInstruction.textContent = "Pilihlah kata yang memiliki makna paling berlawanan (lawan kata).";
    } else {
      this.elVerbalSubtestInstruction.textContent = "Temukan korelasi makna atau kata yang tidak sekelompok.";
    }

    // Render prompt display
    this.elVerbalPromptDisplay.innerHTML = q.promptHtml;

    // Render 4 Options
    this.elVerbalOptionsContainer.innerHTML = '';
    const alphaKeys = ['a', 'b', 'c', 'd'];
    q.options.forEach((optText, idx) => {
      const alpha = alphaKeys[idx] || (idx + 1);
      const btn = document.createElement('button');
      btn.className = 'btn-verbal-option';
      btn.dataset.option = optText;
      btn.dataset.index = idx;
      btn.setAttribute('aria-label', `Pilih ${alpha}. ${optText}`);

      btn.innerHTML = `
        <div class="opt-left">
          <span class="opt-alpha-badge">${alpha}.</span>
          <span class="opt-name-text">${optText}</span>
        </div>
        <span class="opt-hotkey-hint">[${alpha.toUpperCase()} / ${idx + 1}]</span>
      `;

      btn.addEventListener('click', () => {
        this.handleVerbalAnswer(optText);
      });

      this.elVerbalOptionsContainer.appendChild(btn);
    });

    // Start timer
    this.state.questionStartTime = performance.now();
    const timeLimit = this.verbalConfig.timePerQuestion;

    if (timeLimit > 0) {
      this.elVerbalTimerVal.textContent = `${timeLimit.toFixed(1)}s`;
      this.elVerbalTimerVal.classList.remove('warning');
      this.elVerbalTimerProgressBar.classList.remove('danger');
      this.elVerbalTimerProgressBar.style.width = '100%';
      this.elVerbalProgressContainer.style.display = 'block';
      this.startVerbalQuestionCountdown();
    } else {
      this.elVerbalTimerVal.textContent = `Bebas`;
      this.elVerbalProgressContainer.style.display = 'none';
    }
  }

  startVerbalQuestionCountdown() {
    cancelAnimationFrame(this.state.rafId);
    const timeLimitMs = this.verbalConfig.timePerQuestion * 1000;
    const startMs = performance.now();

    const frame = (now) => {
      if (!this.state.isRunning || this.state.isPaused || this.state.currentView !== 'verbal-test') return;

      const elapsed = now - startMs;
      const remainingMs = Math.max(0, timeLimitMs - elapsed);
      const remainingSec = remainingMs / 1000;

      this.elVerbalTimerVal.textContent = `${remainingSec.toFixed(1)}s`;
      const pct = (remainingMs / timeLimitMs) * 100;
      this.elVerbalTimerProgressBar.style.width = `${pct}%`;

      if (remainingSec <= 3.0 && remainingSec > 0.05) {
        this.elVerbalTimerVal.classList.add('warning');
        this.elVerbalTimerProgressBar.classList.add('danger');
      }

      if (remainingMs <= 0) {
        this.handleVerbalTimeout();
        return;
      }

      this.state.rafId = requestAnimationFrame(frame);
    };

    this.state.rafId = requestAnimationFrame(frame);
  }

  handleVerbalAnswer(chosenOption) {
    if (!this.state.isRunning || this.state.currentView !== 'verbal-test') return;
    cancelAnimationFrame(this.state.rafId);

    const q = this.state.questions[this.state.currentIndex];
    const timeSpent = (performance.now() - this.state.questionStartTime) / 1000;
    const isCorrect = chosenOption === q.answer;

    if (isCorrect) {
      this.sound.playCorrect();
      this.triggerFlash('correct', this.elVerbalQuestionBody);
    } else {
      this.sound.playWrong();
      this.triggerFlash('wrong', this.elVerbalQuestionBody);
    }

    this.state.userAnswers.push({
      question: q,
      answer: chosenOption,
      isCorrect: isCorrect,
      timeSpent: timeSpent,
      timeout: false
    });

    this.updateVerbalLiveStats();
    this.state.currentIndex++;
    setTimeout(() => this.displayCurrentVerbalQuestion(), 180);
  }

  handleVerbalTimeout() {
    cancelAnimationFrame(this.state.rafId);
    this.sound.playWrong();
    this.triggerFlash('wrong', this.elVerbalQuestionBody);

    const q = this.state.questions[this.state.currentIndex];
    this.state.userAnswers.push({
      question: q,
      answer: 'TIMEOUT',
      isCorrect: false,
      timeSpent: this.verbalConfig.timePerQuestion,
      timeout: true
    });

    this.updateVerbalLiveStats();
    this.state.currentIndex++;
    setTimeout(() => this.displayCurrentVerbalQuestion(), 200);
  }

  updateVerbalLiveStats() {
    const correctCount = this.state.userAnswers.filter(a => a.isCorrect).length;
    const wrongCount = this.state.userAnswers.filter(a => !a.isCorrect).length;
    this.elVerbalStatCorrect.textContent = correctCount;
    this.elVerbalStatWrong.textContent = wrongCount;
  }

  finishVerbalTest() {
    this.state.isRunning = false;
    cancelAnimationFrame(this.state.rafId);
    this.sound.playFinish();

    this.showEvaluationModal('verbal');
  }

  // ==========================================
  // SHARED MODAL & EVALUATION METHODS
  // ==========================================
  showEvaluationModal(testType) {
    const total = this.state.userAnswers.length;
    const correct = this.state.userAnswers.filter(a => a.isCorrect).length;
    const wrong = this.state.userAnswers.filter(a => !a.isCorrect && !a.timeout).length;
    const timeout = this.state.userAnswers.filter(a => a.timeout).length;

    const accuracyPct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const totalTime = this.state.userAnswers.reduce((acc, cur) => acc + cur.timeSpent, 0);
    const avgSpeed = total > 0 ? (totalTime / total).toFixed(2) : '0.00';

    this.elResultScore.textContent = accuracyPct;
    this.elStatBenar.textContent = correct;
    this.elStatSalah.textContent = wrong;
    this.elStatTimeout.textContent = timeout;
    this.elStatSpeed.textContent = `${avgSpeed}s`;

    let gradeClass = "grade-b";
    let gradeText = "Grade B: Baik";
    let kategoriText = "Memenuhi Standar Seleksi Kerja";

    if (testType === 'verbal') {
      this.elResultsHeading.textContent = "Hasil Evaluasi Tes Kemampuan Verbal";
      this.elReviewSectionTitle.textContent = "Daftar Review & Pembahasan Logika Verbal";
      this.elBtnViewSheet.style.display = 'none';

      if (accuracyPct >= 95) {
        gradeClass = "grade-a";
        gradeText = "Grade A+: Sangat Unggul";
        kategoriText = "Istimewa: Perbendaharaan Kata & Logika Verbal Tingkat Tinggi (Standar BUMN/Bank Top Tier)";
      } else if (accuracyPct >= 80) {
        gradeClass = "grade-a";
        gradeText = "Grade A: Kemampuan Verbal Baik";
        kategoriText = "Sangat Baik: Memenuhi Syarat Tes Potensi Akademik (TPA) & Seleksi Kerja";
      } else if (accuracyPct >= 65) {
        gradeClass = "grade-b";
        gradeText = "Grade B: Cukup";
        kategoriText = "Cukup: Perlu Memperluas Kosakata Khususnya Sinonim & Analogi Hubungan";
      } else if (accuracyPct >= 50) {
        gradeClass = "grade-c";
        gradeText = "Grade C: Kurang Teliti";
        kategoriText = "Perlu Latihan Tambahan: Pahami Hubungan Sebab-Akibat & Fungsi Kata";
      } else {
        gradeClass = "grade-d";
        gradeText = "Grade D: Perlu Evaluasi";
        kategoriText = "Tingkat Kesalahan Tinggi: Pelajari Kembali Pembahasan Logika Analogi di Bawah";
      }
    } else if (testType === 'memory') {
      this.elResultsHeading.textContent = "Hasil Evaluasi Psikotes Hafalan Kata";
      this.elReviewSectionTitle.textContent = "Review Soal & Analisis Daya Ingat";
      this.elBtnViewSheet.style.display = 'inline-block';

      if (accuracyPct >= 95) {
        gradeClass = "grade-a";
        gradeText = "Grade A+: Daya Ingat Luar Biasa";
        kategoriText = "Istimewa: Memori Jangka Pendek & Mnemonic Sangat Kuat (Standar Top Tier BUMN/Bank)";
      } else if (accuracyPct >= 80) {
        gradeClass = "grade-a";
        gradeText = "Grade A: Daya Ingat Kuat";
        kategoriText = "Sangat Baik: Memenuhi Syarat Seleksi Kerja Perbankan, BUMN, & CPNS";
      } else if (accuracyPct >= 65) {
        gradeClass = "grade-b";
        gradeText = "Grade B: Daya Ingat Cukup";
        kategoriText = "Cukup Baik: Disarankan Melatih Asosiasi Huruf Awal & Visualisasi Mnemonic";
      } else if (accuracyPct >= 50) {
        gradeClass = "grade-c";
        gradeText = "Grade C: Kurang Fokus";
        kategoriText = "Perlu Latihan Tambahan: Latih Konsentrasi Saat Tahap Menghafal 5 Menit";
      } else {
        gradeClass = "grade-d";
        gradeText = "Grade D: Perlu Evaluasi";
        kategoriText = "Tingkat Kesalahan Tinggi: Pelajari Kembali Kunci Mnemonic Lembar Hafalan";
      }
    } else {
      this.elResultsHeading.textContent = "Hasil Evaluasi Ketelitian Data";
      this.elReviewSectionTitle.textContent = "Daftar Review Soal & Analisis Kesalahan";
      this.elBtnViewSheet.style.display = 'none';

      if (accuracyPct >= 95) {
        gradeClass = "grade-a";
        gradeText = "Grade A+: Sangat Unggul";
        kategoriText = "Istimewa: Sangat Teliti & Refleks Cepat (Standar BUMN/Bank Top Tier)";
      } else if (accuracyPct >= 80) {
        gradeClass = "grade-a";
        gradeText = "Grade A: Teliti";
        kategoriText = "Sangat Baik: Memenuhi Syarat Seleksi Staff Administrasi/Operasional";
      } else if (accuracyPct >= 65) {
        gradeClass = "grade-b";
        gradeText = "Grade B: Cukup";
        kategoriText = "Cukup: Perlu Meningkatkan Kecepatan & Ketahanan Konsentrasi";
      } else if (accuracyPct >= 50) {
        gradeClass = "grade-c";
        gradeText = "Grade C: Kurang Teliti";
        kategoriText = "Cenderung Terburu-buru: Disarankan Latihan Rutin";
      } else {
        gradeClass = "grade-d";
        gradeText = "Grade D: Perlu Evaluasi";
        kategoriText = "Tingkat Kesalahan Tinggi: Latih Fokus Mata & Kurangi Distraksi";
      }
    }

    this.elResultGradeBadge.className = `grade-badge ${gradeClass}`;
    this.elResultGradeBadge.textContent = gradeText;
    this.elResultKategori.textContent = kategoriText;

    this.renderReviewList(testType);

    const hasMistakes = (wrong + timeout) > 0;
    this.elBtnRetryWrong.style.display = hasMistakes ? 'inline-block' : 'none';

    this.elModalResults.classList.add('active');
  }

  renderReviewList(testType) {
    this.elReviewList.innerHTML = "";
    this.state.userAnswers.forEach((ans, index) => {
      const q = ans.question;
      const item = document.createElement('div');
      item.className = `review-item ${ans.isCorrect ? 'correct' : (ans.timeout ? 'timeout' : 'wrong')}`;

      let statusBadge = "";
      if (ans.isCorrect) {
        statusBadge = `<span style="color:#059669; font-weight:700;">✓ Benar (${ans.timeSpent.toFixed(2)}s)</span>`;
      } else if (ans.timeout) {
        statusBadge = `<span style="color:#d97706; font-weight:700;">⌛ Waktu Habis (${ans.timeSpent.toFixed(2)}s)</span>`;
      } else {
        statusBadge = `<span style="color:#dc2626; font-weight:700;">✗ Salah (${ans.timeSpent.toFixed(2)}s)</span>`;
      }

      if (testType === 'verbal') {
        const userAnsText = ans.timeout ? 'WAKTU HABIS' : this.escapeHtml(ans.answer);
        const correctText = this.escapeHtml(q.answer);

        let questionSnippet = "";
        if (q.type === 'analogi') {
          questionSnippet = `${q.part1} = ${q.part2}`;
        } else if (q.word) {
          questionSnippet = `${q.word}`;
        } else {
          questionSnippet = `Soal #${index + 1}`;
        }

        item.innerHTML = `
          <div class="review-top">
            <span>Soal #${index + 1} &bull; <strong>${this.escapeHtml(questionSnippet)}</strong></span>
            ${statusBadge}
          </div>
          <div class="review-data" style="margin-top:4px;">
            <div>Jawaban Anda: <strong style="color:${ans.isCorrect ? '#059669' : '#dc2626'};">${userAnsText}</strong> &bull; Kunci: <strong>${correctText}</strong></div>
          </div>
          <div class="review-verbal-explanation">
            💡 ${q.explanation}
          </div>
        `;
      } else if (testType === 'memory') {
        const userAnsText = ans.timeout ? 'WAKTU HABIS' : this.escapeHtml(ans.answer);
        const correctText = this.escapeHtml(q.correctCategory);

        item.innerHTML = `
          <div class="review-top">
            <span>Soal #${index + 1} &bull; Huruf Awalan: <strong>${this.escapeHtml(q.letter)}</strong></span>
            ${statusBadge}
          </div>
          <div class="review-data" style="margin-top:4px;">
            <div>Jawaban Anda: <strong style="color:${ans.isCorrect ? '#059669' : '#dc2626'};">${userAnsText}</strong> &bull; Kunci: <strong>${correctText}</strong></div>
          </div>
          <div class="review-mem-detail">
            💡 ${q.explanation}
          </div>
        `;
      } else {
        const highlightedB = this.getDiffHighlightedString(q.dataA, q.dataB);
        item.innerHTML = `
          <div class="review-top">
            <span>Soal #${index + 1} &bull; Kunci: <strong>${q.correctAnswer === 'SAME' ? 'SAMA' : 'TIDAK SAMA'}</strong></span>
            ${statusBadge}
          </div>
          <div class="review-data">
            <div><strong>A:</strong> ${this.escapeHtml(q.dataA)}</div>
            <div><strong>B:</strong> ${highlightedB}</div>
          </div>
        `;
      }

      this.elReviewList.appendChild(item);
    });
  }

  retryWrongQuestions() {
    const wrongQuestions = this.state.userAnswers
      .filter(a => !a.isCorrect)
      .map(a => a.question);

    if (wrongQuestions.length === 0) return;

    this.elModalResults.classList.remove('active');
    if (this.state.activeTestSession === 'verbal') {
      this.startVerbalTest(wrongQuestions);
    } else if (this.state.activeTestSession === 'memory') {
      this.startMemoryTestPhase(wrongQuestions);
    } else {
      this.startAccuracyTest(wrongQuestions);
    }
  }

  renderMemorySheetContent(setId, container) {
    const set = MemoryDataSets[setId] || MemoryDataSets.set1;
    container.innerHTML = '';

    set.categories.forEach(cat => {
      const row = document.createElement('div');
      row.className = 'memory-cat-row';

      const wordSpans = cat.words.map(w => {
        const initial = w.charAt(0);
        const rest = w.slice(1);
        return `<span class="word-chip"><strong class="letter-lead">${initial}</strong>${rest}</span>`;
      }).join(', ');

      row.innerHTML = `
        <div class="cat-badge-box">
          <span class="cat-icon">${cat.icon}</span>
          <span class="cat-name">${cat.name}</span>
        </div>
        <span class="cat-colon">:</span>
        <div class="cat-words-text">${wordSpans}</div>
      `;

      container.appendChild(row);
    });
  }

  triggerFlash(type, element) {
    const cls = type === 'correct' ? 'flash-correct' : 'flash-wrong';
    element.classList.add(cls);
    setTimeout(() => element.classList.remove(cls), 300);
  }

  getDiffHighlightedString(strA, strB) {
    if (strA === strB) return this.escapeHtml(strB);
    let out = "";
    for (let i = 0; i < strB.length; i++) {
      if (i >= strA.length || strB[i] !== strA[i]) {
        out += `<span class="diff-char">${this.escapeHtml(strB[i] === ' ' ? '⎵' : strB[i])}</span>`;
      } else {
        out += this.escapeHtml(strB[i]);
      }
    }
    return out;
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================
  // KEYBOARD HANDLING
  // ==========================================
  handleKeyPress(e) {
    if (e.key === 'Escape') {
      if (this.elModalMemorySheet && this.elModalMemorySheet.classList.contains('active')) {
        this.elModalMemorySheet.classList.remove('active');
        return;
      }
      if (this.elModalConfirmCancel && this.elModalConfirmCancel.classList.contains('active')) {
        this.elModalConfirmCancel.classList.remove('active');
        this.state.isPaused = false;
        if (this.state.currentView === 'test' && this.state.isRunning) {
          this.startCountdownLoop();
        } else if (this.state.currentView === 'memory-test' && this.state.isRunning) {
          this.startMemoryQuestionCountdown();
        } else if (this.state.currentView === 'verbal-test' && this.state.isRunning) {
          this.startVerbalQuestionCountdown();
        }
        return;
      }
      if (this.elModalSettings.classList.contains('active')) {
        this.closeSettings();
        return;
      }
      if (this.elModalResults.classList.contains('active')) {
        this.elModalResults.classList.remove('active');
        return;
      }
    }

    if (this.elModalConfirmCancel && this.elModalConfirmCancel.classList.contains('active')) {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.elModalConfirmCancel.classList.remove('active');
        this.showHomeView();
      }
      return;
    }

    if (this.elModalSettings.classList.contains('active') || (this.elModalMemorySheet && this.elModalMemorySheet.classList.contains('active'))) {
      return;
    }

    if (this.elModalResults.classList.contains('active')) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.elModalResults.classList.remove('active');
        if (this.state.activeTestSession === 'memory') {
          this.startMemoryStudyPhase();
        } else if (this.state.activeTestSession === 'verbal') {
          this.startVerbalTest();
        } else {
          this.startAccuracyTest();
        }
      }
      return;
    }

    // HOME MENU SHORTCUTS
    if (this.state.currentView === 'home') {
      if (e.key === '1') {
        this.switchTestTab('accuracy');
        this.sound.playPop();
      } else if (e.key === '2') {
        this.switchTestTab('memory');
        this.sound.playPop();
      } else if (e.key === '3') {
        this.switchTestTab('verbal');
        this.sound.playPop();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (this.activeTest === 'memory') {
          this.startMemoryStudyPhase();
        } else if (this.activeTest === 'verbal') {
          this.startVerbalTest();
        } else {
          this.startAccuracyTest();
        }
      }
      return;
    }

    // STUDY VIEW SHORTCUTS
    if (this.state.currentView === 'memory-study') {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.startMemoryTestPhase();
      }
      return;
    }

    // ACCURACY TEST SHORTCUTS
    if (this.state.currentView === 'test' && this.state.isRunning) {
      const key = e.key.toUpperCase();
      if (key === '1' || key === 'S' || e.key === 'ArrowLeft') {
        e.preventDefault();
        this.highlightButtonPress(this.elBtnSama);
        this.handleAccuracyAnswer('SAME');
      } else if (key === '2' || key === 'T' || e.key === 'ArrowRight') {
        e.preventDefault();
        this.highlightButtonPress(this.elBtnTidakSama);
        this.handleAccuracyAnswer('DIFFERENT');
      }
      return;
    }

    // MEMORY TEST SHORTCUTS (A-E or 1-5)
    if (this.state.currentView === 'memory-test' && this.state.isRunning) {
      const key = e.key.toUpperCase();
      const set = MemoryDataSets[this.memoryConfig.setId] || MemoryDataSets.set1;
      let targetIndex = -1;

      if (key === 'A' || key === '1') targetIndex = 0;
      else if (key === 'B' || key === '2') targetIndex = 1;
      else if (key === 'C' || key === '3') targetIndex = 2;
      else if (key === 'D' || key === '4') targetIndex = 3;
      else if (key === 'E' || key === '5') targetIndex = 4;

      if (targetIndex >= 0 && targetIndex < set.categories.length) {
        e.preventDefault();
        const catName = set.categories[targetIndex].name;
        const optButtons = this.elMemoryOptionsContainer.querySelectorAll('.btn-mem-option');
        if (optButtons[targetIndex]) {
          this.highlightButtonPress(optButtons[targetIndex]);
        }
        this.handleMemoryAnswer(catName);
      }
      return;
    }

    // VERBAL TEST SHORTCUTS (A-D or 1-4)
    if (this.state.currentView === 'verbal-test' && this.state.isRunning) {
      const key = e.key.toUpperCase();
      const q = this.state.questions[this.state.currentIndex];
      if (!q) return;

      let targetIndex = -1;
      if (key === 'A' || key === '1') targetIndex = 0;
      else if (key === 'B' || key === '2') targetIndex = 1;
      else if (key === 'C' || key === '3') targetIndex = 2;
      else if (key === 'D' || key === '4') targetIndex = 3;

      if (targetIndex >= 0 && targetIndex < q.options.length) {
        e.preventDefault();
        const chosen = q.options[targetIndex];
        const optButtons = this.elVerbalOptionsContainer.querySelectorAll('.btn-verbal-option');
        if (optButtons[targetIndex]) {
          this.highlightButtonPress(optButtons[targetIndex]);
        }
        this.handleVerbalAnswer(chosen);
      }
    }
  }

  highlightButtonPress(btn) {
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 140);
  }

  // ==========================================
  // SETTINGS & PREFERENCES
  // ==========================================
  loadPreferences() {
    try {
      const saved = localStorage.getItem('psiko_suite_cfg');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeTest) this.activeTest = parsed.activeTest;
        if (parsed.accuracy) this.accuracyConfig = { ...this.accuracyConfig, ...parsed.accuracy };
        if (parsed.memory) this.memoryConfig = { ...this.memoryConfig, ...parsed.memory };
        if (parsed.verbal) this.verbalConfig = { ...this.verbalConfig, ...parsed.verbal };
      }
    } catch (err) {
      console.warn('Cannot load preferences:', err);
    }
  }

  savePreferences() {
    try {
      localStorage.setItem('psiko_suite_cfg', JSON.stringify({
        activeTest: this.activeTest,
        accuracy: this.accuracyConfig,
        memory: this.memoryConfig,
        verbal: this.verbalConfig
      }));
    } catch (e) { }
  }

  syncUIWithConfig() {
    this.updateSoundButtons();
    this.updateModeBadge();
    this.switchTestTab(this.activeTest);

    // Sync Accuracy UI
    this.setRadioValue('home-q-type', this.accuracyConfig.dataType);
    this.setRadioValue('home-q-count', this.accuracyConfig.questionCount.toString());
    this.setRadioValue('home-q-diff', this.accuracyConfig.difficulty);
    this.setRadioValue('q-type', this.accuracyConfig.dataType);
    this.setRadioValue('q-count', this.accuracyConfig.questionCount.toString());
    this.setRadioValue('q-diff', this.accuracyConfig.difficulty);
    this.updateCustomTime(this.accuracyConfig.timePerQuestion);

    if (this.elHomeCardDiff) {
      const diffText = this.accuracyConfig.difficulty === 'easy' ? 'Mudah (5-7)' : (this.accuracyConfig.difficulty === 'hard' ? 'Sulit (11-14)' : 'Sedang (8-10)');
      this.elHomeCardDiff.textContent = diffText;
    }

    // Sync Memory UI
    this.setRadioValue('home-mem-set', this.memoryConfig.setId);
    this.setRadioValue('home-mem-studytime', this.memoryConfig.studyTime.toString());
    this.setRadioValue('home-mem-qtime', this.memoryConfig.qTime.toString());
    this.setRadioValue('home-mem-count', this.memoryConfig.questionCount.toString());

    const studyTimeVal = this.memoryConfig.studyTime;
    const studyLabel = studyTimeVal === 0 ? 'Bebas' : (studyTimeVal >= 60 ? `${Math.round(studyTimeVal / 60)} Menit` : `${studyTimeVal} Detik`);
    if (this.elLabelActiveStudyTime) this.elLabelActiveStudyTime.textContent = studyLabel;
    if (this.elHomeCardStudyTime) this.elHomeCardStudyTime.textContent = studyLabel;

    const qTimeVal = this.memoryConfig.qTime;
    const qLabel = qTimeVal === 0 ? 'Bebas' : `${qTimeVal}.0s`;
    if (this.elLabelActiveMemQTime) this.elLabelActiveMemQTime.textContent = qLabel;
    if (this.elHomeCardMemQTime) this.elHomeCardMemQTime.textContent = qLabel;

    // Sync Verbal UI
    this.setRadioValue('home-verbal-subtest', this.verbalConfig.subtest);
    this.setRadioValue('home-verbal-count', this.verbalConfig.questionCount.toString());
    this.setRadioValue('home-verbal-time', this.verbalConfig.timePerQuestion.toString());

    const verbalTimeVal = this.verbalConfig.timePerQuestion;
    const verbalTimeLabel = verbalTimeVal === 0 ? 'Bebas' : `${verbalTimeVal.toFixed(1)}s`;
    if (this.elLabelActiveVerbalTime) this.elLabelActiveVerbalTime.textContent = verbalTimeLabel;
    if (this.elHomeCardVerbalTime) this.elHomeCardVerbalTime.textContent = verbalTimeLabel;

    const subtestLabels = {
      all: 'Campuran',
      analogi: 'Analogi Kata',
      sinonim: 'Sinonim',
      antonim: 'Antonim',
      korelasi: 'Korelasi'
    };
    if (this.elHomeCardVerbalType) {
      this.elHomeCardVerbalType.textContent = subtestLabels[this.verbalConfig.subtest] || 'Campuran';
    }
  }

  updateCustomTime(newTime) {
    if (isNaN(newTime)) return;
    newTime = Math.min(30.0, Math.max(1.0, Math.round(newTime * 10) / 10));
    this.accuracyConfig.timePerQuestion = newTime;

    const timeText = `${newTime.toFixed(1)}s`;
    if (this.elLabelActiveTime) this.elLabelActiveTime.textContent = timeText;
    if (this.elSettingsLabelActiveTime) this.elSettingsLabelActiveTime.textContent = timeText;
    if (this.elHomeCardTime) this.elHomeCardTime.textContent = `${newTime.toFixed(1)} Detik`;
    if (this.elTimerVal) this.elTimerVal.textContent = timeText;

    if (this.elHomeCustomTimeSlider && parseFloat(this.elHomeCustomTimeSlider.value) !== newTime) {
      this.elHomeCustomTimeSlider.value = newTime;
    }
    if (this.elHomeCustomTimeInput && parseFloat(this.elHomeCustomTimeInput.value) !== newTime) {
      this.elHomeCustomTimeInput.value = newTime;
    }
    if (this.elSettingsCustomTimeSlider && parseFloat(this.elSettingsCustomTimeSlider.value) !== newTime) {
      this.elSettingsCustomTimeSlider.value = newTime;
    }
    if (this.elSettingsCustomTimeInput && parseFloat(this.elSettingsCustomTimeInput.value) !== newTime) {
      this.elSettingsCustomTimeInput.value = newTime;
    }

    const presetValues = ["1.5", "2.0", "3.0", "5.0"];
    const strVal = newTime.toString();
    const isPreset = presetValues.includes(strVal);

    document.querySelectorAll('input[name="home-q-time"]').forEach(r => {
      r.checked = isPreset && r.value === strVal;
    });
    document.querySelectorAll('input[name="q-time"]').forEach(r => {
      r.checked = isPreset && r.value === strVal;
    });

    this.savePreferences();
  }

  updateModeBadge() {
    if (!this.elModeBadge) return;
    if (this.accuracyConfig.autoMode) {
      this.elModeBadge.innerHTML = `<span class="mode-dot"></span> Mode Otomatis`;
      this.elModeBadge.title = "Jawaban otomatis lanjut ke soal berikutnya";
    } else {
      this.elModeBadge.innerHTML = `<span class="mode-dot" style="background:#94a3b8;box-shadow:none;"></span> Mode Santai`;
      this.elModeBadge.title = "Mode santai tanpa otomatis waktu habis cepat";
    }
  }

  updateSoundButtons() {
    this.elBtnsSound.forEach(btn => {
      btn.innerHTML = this.sound.enabled ? '🔊' : '🔇';
      btn.title = this.sound.enabled ? 'Suara Aktif' : 'Suara Senyap';
    });
  }

  openSettings() {
    this.state.isPaused = true;
    this.setRadioValue('q-count', this.accuracyConfig.questionCount.toString());
    this.setRadioValue('q-type', this.accuracyConfig.dataType);
    this.setRadioValue('q-diff', this.accuracyConfig.difficulty);
    this.updateCustomTime(this.accuracyConfig.timePerQuestion);
    this.elModalSettings.classList.add('active');
  }

  closeSettings() {
    this.elModalSettings.classList.remove('active');
    this.state.isPaused = false;
    if (this.state.currentView === 'test' && this.state.isRunning) {
      this.startCountdownLoop();
    }
  }

  saveSettings() {
    const count = parseInt(this.getRadioValue('q-count') || "5", 10);
    const radioTime = this.getRadioValue('q-time');
    const time = radioTime ? parseFloat(radioTime) : this.accuracyConfig.timePerQuestion;
    const type = this.getRadioValue('q-type') || "numeric";
    const diff = this.getRadioValue('q-diff') || "medium";

    this.accuracyConfig.questionCount = count;
    this.accuracyConfig.timePerQuestion = time;
    this.accuracyConfig.dataType = type;
    this.accuracyConfig.difficulty = diff;

    this.savePreferences();
    this.syncUIWithConfig();
    this.closeSettings();

    if (this.state.currentView === 'test') {
      this.startAccuracyTest();
    }
  }

  getRadioValue(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
  }

  setRadioValue(name, val) {
    const el = document.querySelector(`input[name="${name}"][value="${val}"]`);
    if (el) el.checked = true;
  }
}

// Inisialisasi saat DOM siap
window.addEventListener('DOMContentLoaded', () => {
  window.app = new PsychotestSuiteApp();
});
