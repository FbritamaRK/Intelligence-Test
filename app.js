/**
 * Simulasi Tes Ketelitian Data (Clerical Aptitude & Accuracy Test)
 * Dirancang menyerupai standar seleksi kerja BUMN, Perbankan (BCA, Mandiri, BNI, BRI), CPNS & Korporat.
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

// --- Generator Bank Soal Realistis ---
const RealDataPool = {
  names: [
    "Muhammad Fadhil Ramadhan",
    "Bambang Soeprapto, S.T.",
    "Dr. Hj. Siti Nurjanah, M.Pd.",
    "PT. Bank Central Asia Tbk.",
    "PT. Telekomunikasi Indonesia",
    "Kurniawan Dwi Yulianto",
    "Raden Ajeng Kartini No. 45",
    "Jl. Jenderal Sudirman Kav. 52-53",
    "Kecamatan Sukajadi, Bandung",
    "Kelurahan Menteng, Jakarta Pusat",
    "Bank Rakyat Indonesia Cab. Thamrin",
    "Komplek Perumahan Griya Indah Blok B4/12",
    "Kombes Pol. Hendra Gunawan, S.I.K.",
    "PT. Astra International Tbk.",
    "Perum Peruri Karawang Timur"
  ],
  alphanumericPrefixes: ["IDN-", "TRX/", "INV-2026-", "BUMN-", "ACC-", "KTP-", "SK-"],
  lookalikePairs: [
    ["0", "8"], ["3", "8"], ["1", "7"], ["5", "6"], ["6", "9"],
    ["O", "0"], ["I", "1"], ["B", "8"], ["S", "5"], ["Z", "2"],
    ["V", "U"], ["D", "O"], ["E", "F"], ["P", "R"], ["M", "N"]
  ]
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateQuestionItem(dataType, difficulty) {
  const isIdentical = Math.random() < 0.5; // 50% chance SAMA, 50% chance TIDAK SAMA
  let strA = "";
  let strB = "";

  // Panjang karakter berdasarkan tingkat kesulitan
  let targetLen = 10;
  if (difficulty === 'easy') targetLen = randomInt(5, 7);
  else if (difficulty === 'medium') targetLen = randomInt(8, 10);
  else if (difficulty === 'hard') targetLen = randomInt(11, 14);

  let chosenType = dataType;
  if (chosenType === 'mixed') {
    const types = ['numeric', 'alphanumeric', 'verbal', 'numeric'];
    chosenType = randomChoice(types);
  }

  if (chosenType === 'numeric') {
    // Generate pure digits
    let digits = "";
    for (let i = 0; i < targetLen; i++) {
      digits += randomInt(0, 9).toString();
    }
    strA = digits;
  } else if (chosenType === 'letters') {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    let res = "";
    for (let i = 0; i < targetLen; i++) {
      res += chars.charAt(randomInt(0, chars.length - 1));
    }
    strA = res;
  } else if (chosenType === 'alphanumeric') {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let res = "";
    for (let i = 0; i < targetLen; i++) {
      res += chars.charAt(randomInt(0, chars.length - 1));
    }
    if (res.length > 6 && Math.random() < 0.5) {
      const mid = Math.floor(res.length / 2);
      res = res.substring(0, mid) + "-" + res.substring(mid);
    }
    strA = res;
  } else if (chosenType === 'verbal') {
    strA = randomChoice(RealDataPool.names);
  }

  if (isIdentical) {
    strB = strA;
  } else {
    // Buat perbedaan tipis / subtle error (khas psikotes ketelitian tingkat tinggi)
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
    // Tukar dua karakter bertetangga (transposition: misal 2837 -> 2387)
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
    // Ubah 1 karakter dengan karakter yang mirip (lookalike / off by one)
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

  // Pengurangan atau penambahan 1 huruf (typo umum: Muhamad vs Muhammad)
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

// --- App State & Engine ---
class AccuracyTestApp {
  constructor() {
    this.sound = new SoundEffects();
    this.config = {
      questionCount: 5,
      timePerQuestion: 2.0, // dalam detik
      dataType: 'numeric',
      difficulty: 'medium',
      autoMode: true
    };

    this.state = {
      currentView: 'home', // 'home' | 'test'
      isRunning: false,
      isPaused: false,
      questions: [],
      currentIndex: 0,
      userAnswers: [],
      timerId: null,
      questionStartTime: 0,
      timeRemaining: 0,
      rafId: null
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

    // Home view controls
    this.elBtnMainStart = document.getElementById('btn-main-start');
    this.elHomePillsType = document.querySelectorAll('input[name="home-q-type"]');
    this.elHomePillsCount = document.querySelectorAll('input[name="home-q-count"]');
    this.elHomePillsTime = document.querySelectorAll('input[name="home-q-time"]');
    this.elHomePillsDiff = document.querySelectorAll('input[name="home-q-diff"]');
    this.elHomeCardTime = document.getElementById('home-card-time');
    this.elHomeCardDiff = document.getElementById('home-card-diff');
    this.elLabelActiveTime = document.getElementById('label-active-time');
    this.elHomeCustomTimeSlider = document.getElementById('home-custom-time-slider');
    this.elHomeCustomTimeInput = document.getElementById('home-custom-time-input');

    // Settings custom time controls
    this.elSettingsLabelActiveTime = document.getElementById('settings-label-active-time');
    this.elSettingsCustomTimeSlider = document.getElementById('settings-custom-time-slider');
    this.elSettingsCustomTimeInput = document.getElementById('settings-custom-time-input');

    // Test header controls
    this.elBtnCancelTest = document.getElementById('btn-cancel-test');
    this.elModeBadge = document.getElementById('mode-indicator');
    this.elBtnsSound = document.querySelectorAll('.btn-toggle-sound');
    this.elBtnsSettings = document.querySelectorAll('.btn-open-settings');

    // Status bar
    this.elQuestionCounter = document.getElementById('question-counter');
    this.elTimerVal = document.getElementById('timer-val');
    this.elProgressBar = document.getElementById('timer-progress-bar');

    // Cards
    this.elDataA = document.getElementById('data-a-content');
    this.elDataB = document.getElementById('data-b-content');
    this.elTestContainer = document.getElementById('test-body');

    // Buttons
    this.elBtnSama = document.getElementById('btn-sama');
    this.elBtnTidakSama = document.getElementById('btn-tidak-sama');

    // Bottom Stats
    this.elStatCorrect = document.getElementById('stat-correct');
    this.elStatWrong = document.getElementById('stat-wrong');

    // Modals
    this.elModalSettings = document.getElementById('modal-settings');
    this.elModalResults = document.getElementById('modal-results');
    this.elModalConfirmCancel = document.getElementById('modal-confirm-cancel');

    // Cancel modal controls
    this.elBtnCancelNo = document.getElementById('btn-cancel-no');
    this.elBtnCancelYes = document.getElementById('btn-cancel-yes');

    // Settings elements
    this.elBtnSaveSettings = document.getElementById('btn-save-settings');
    this.elBtnCloseSettings = document.getElementById('btn-close-settings');

    // Results elements
    this.elResultScore = document.getElementById('result-score');
    this.elResultGradeBadge = document.getElementById('result-grade-badge');
    this.elResultKategori = document.getElementById('result-kategori');
    this.elStatBenar = document.getElementById('result-benar');
    this.elStatSalah = document.getElementById('result-salah');
    this.elStatTimeout = document.getElementById('result-timeout');
    this.elStatSpeed = document.getElementById('result-speed');
    this.elReviewList = document.getElementById('review-list');
    this.elBtnRestart = document.getElementById('btn-restart');
    this.elBtnRetryWrong = document.getElementById('btn-retry-wrong');
    this.elBtnResultHome = document.getElementById('btn-result-home');
    this.elBtnCloseResults = document.getElementById('btn-close-results');
  }

  bindEvents() {
    // Start simulation from home menu
    this.elBtnMainStart.addEventListener('click', () => {
      this.sound.playPop();
      this.showTestView();
    });

    // Cancel test button
    if (this.elBtnCancelTest) {
      this.elBtnCancelTest.addEventListener('click', () => {
        this.sound.playPop();
        this.state.isPaused = true;
        cancelAnimationFrame(this.state.rafId);
        this.elModalConfirmCancel.classList.add('active');
      });
    }

    if (this.elBtnCancelNo) {
      this.elBtnCancelNo.addEventListener('click', () => {
        this.sound.playPop();
        this.elModalConfirmCancel.classList.remove('active');
        this.state.isPaused = false;
        if (this.state.isRunning) {
          this.startCountdownLoop();
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

    this.elBtnResultHome.addEventListener('click', () => {
      this.sound.playPop();
      this.elModalResults.classList.remove('active');
      this.showHomeView();
    });

    // Quick config in Home Menu
    this.elHomePillsType.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.config.dataType = e.target.value;
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    this.elHomePillsCount.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.config.questionCount = parseInt(e.target.value, 10);
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    // Custom Time (1 - 30 Detik Maksimal)
    this.elHomePillsTime.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.updateCustomTime(parseFloat(e.target.value));
        this.sound.playPop();
      });
    });

    document.querySelectorAll('input[name="q-time"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.updateCustomTime(parseFloat(e.target.value));
        this.sound.playPop();
      });
    });

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

    if (this.elSettingsCustomTimeSlider) {
      this.elSettingsCustomTimeSlider.addEventListener('input', (e) => {
        this.updateCustomTime(parseFloat(e.target.value));
      });
    }

    if (this.elSettingsCustomTimeInput) {
      this.elSettingsCustomTimeInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) this.updateCustomTime(val);
      });
      this.elSettingsCustomTimeInput.addEventListener('change', (e) => {
        let val = parseFloat(e.target.value);
        if (isNaN(val) || val < 1.0) val = 1.0;
        if (val > 30.0) val = 30.0;
        this.updateCustomTime(val);
      });
    }


    this.elHomePillsDiff.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.config.difficulty = e.target.value;
        this.savePreferences();
        this.syncUIWithConfig();
        this.sound.playPop();
      });
    });

    // Answer buttons click
    this.elBtnSama.addEventListener('click', () => this.handleAnswer('SAME'));
    this.elBtnTidakSama.addEventListener('click', () => this.handleAnswer('DIFFERENT'));

    // Sound toggle buttons
    this.elBtnsSound.forEach(btn => {
      btn.addEventListener('click', () => {
        this.sound.enabled = !this.sound.enabled;
        this.updateSoundButtons();
        if (this.sound.enabled) this.sound.playPop();
      });
    });

    // Settings open/close
    this.elBtnsSettings.forEach(btn => {
      btn.addEventListener('click', () => this.openSettings());
    });
    this.elBtnCloseSettings.addEventListener('click', () => this.closeSettings());
    this.elBtnSaveSettings.addEventListener('click', () => this.saveSettings());

    // Mode toggle pill
    this.elModeBadge.addEventListener('click', () => {
      this.config.autoMode = !this.config.autoMode;
      this.updateModeBadge();
      this.sound.playPop();
    });

    // Close on overlay backdrop click
    [this.elModalSettings, this.elModalResults, this.elModalConfirmCancel].forEach(overlay => {
      if (!overlay) return;
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          if (overlay === this.elModalSettings) {
            this.closeSettings();
          } else if (overlay === this.elModalResults) {
            this.elModalResults.classList.remove('active');
          } else if (overlay === this.elModalConfirmCancel) {
            this.elModalConfirmCancel.classList.remove('active');
            this.state.isPaused = false;
            if (this.state.isRunning) {
              this.startCountdownLoop();
            }
          }
        }
      });
    });


    // Results modal buttons
    this.elBtnRestart.addEventListener('click', () => {
      this.elModalResults.classList.remove('active');
      this.startNewTest();
    });

    this.elBtnRetryWrong.addEventListener('click', () => {
      this.retryWrongQuestions();
    });

    this.elBtnCloseResults.addEventListener('click', () => {
      this.elModalResults.classList.remove('active');
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  showHomeView() {
    this.state.currentView = 'home';
    this.state.isRunning = false;
    cancelAnimationFrame(this.state.rafId);

    this.elViewTest.classList.remove('active');
    this.elViewHome.classList.add('active');
    this.syncUIWithConfig();
  }

  showTestView() {
    this.state.currentView = 'test';
    this.elViewHome.classList.remove('active');
    this.elViewTest.classList.add('active');

    this.startNewTest();
  }

  handleKeyPress(e) {
    if (e.key === 'Escape') {
      if (this.elModalConfirmCancel && this.elModalConfirmCancel.classList.contains('active')) {
        this.elModalConfirmCancel.classList.remove('active');
        this.state.isPaused = false;
        if (this.state.isRunning) {
          this.startCountdownLoop();
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

    // Jika konfirmasi batal sedang aktif
    if (this.elModalConfirmCancel && this.elModalConfirmCancel.classList.contains('active')) {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.elModalConfirmCancel.classList.remove('active');
        this.showHomeView();
      }
      return;
    }

    // Abaikan jika user sedang di modal
    if (this.elModalSettings.classList.contains('active')) return;

    if (this.elModalResults.classList.contains('active')) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.elModalResults.classList.remove('active');
        this.startNewTest();
      }
      return;
    }

    // Jika sedang di Home Menu: Tekan Spasi atau Enter untuk Mulai Simulasi
    if (this.state.currentView === 'home') {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.showTestView();
      }
      return;
    }

    // Jika sedang di simulasi tes
    if (this.state.currentView === 'test' && this.state.isRunning) {
      const key = e.key.toUpperCase();
      if (key === '1' || key === 'S' || e.key === 'ArrowLeft') {
        e.preventDefault();
        this.highlightButtonPress(this.elBtnSama);
        this.handleAnswer('SAME');
      } else if (key === '2' || key === 'T' || e.key === 'ArrowRight') {
        e.preventDefault();
        this.highlightButtonPress(this.elBtnTidakSama);
        this.handleAnswer('DIFFERENT');
      }
    }
  }

  highlightButtonPress(btn) {
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 140);
  }

  loadPreferences() {
    try {
      const saved = localStorage.getItem('psiko_ketelitian_cfg');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.config = { ...this.config, ...parsed };
      }
    } catch (err) {
      console.warn('Cannot load preferences:', err);
    }
  }

  savePreferences() {
    try {
      localStorage.setItem('psiko_ketelitian_cfg', JSON.stringify(this.config));
    } catch (e) {}
  }

  syncUIWithConfig() {
    this.updateModeBadge();
    this.updateSoundButtons();

    // Sync Home menu pills
    this.setRadioValue('home-q-type', this.config.dataType);
    this.setRadioValue('home-q-count', this.config.questionCount.toString());
    this.setRadioValue('home-q-diff', this.config.difficulty);

    // Sync Settings modal inputs
    this.setRadioValue('q-type', this.config.dataType);
    this.setRadioValue('q-count', this.config.questionCount.toString());
    this.setRadioValue('q-diff', this.config.difficulty);

    // Sync custom time (1 - 30 detik)
    this.updateCustomTime(this.config.timePerQuestion);

    // Update Home preview cards
    if (this.elHomeCardDiff) {
      const diffText = this.config.difficulty === 'easy' ? 'Mudah (5-7)' : (this.config.difficulty === 'hard' ? 'Sulit (11-14)' : 'Sedang (8-10)');
      this.elHomeCardDiff.textContent = diffText;
    }

    // Sync initial labels
    this.elQuestionCounter.textContent = `Soal 1 / ${this.config.questionCount}`;
    this.elProgressBar.style.width = '100%';
    this.updateLiveStats();
  }

  updateCustomTime(newTime) {
    if (isNaN(newTime)) return;
    // Maksimal 30 detik, minimal 1 detik
    newTime = Math.min(30.0, Math.max(1.0, Math.round(newTime * 10) / 10));
    this.config.timePerQuestion = newTime;

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
    if (this.config.autoMode) {
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

  startNewTest(customQuestions = null) {
    cancelAnimationFrame(this.state.rafId);

    if (customQuestions && customQuestions.length > 0) {
      this.state.questions = customQuestions;
    } else {
      const list = [];
      for (let i = 0; i < this.config.questionCount; i++) {
        list.push(generateQuestionItem(this.config.dataType, this.config.difficulty));
      }
      this.state.questions = list;
    }

    this.state.currentIndex = 0;
    this.state.userAnswers = [];
    this.state.isRunning = true;
    this.state.isPaused = false;

    this.updateLiveStats();
    this.displayCurrentQuestion();
  }

  displayCurrentQuestion() {
    if (this.state.currentIndex >= this.state.questions.length) {
      this.finishTest();
      return;
    }

    const q = this.state.questions[this.state.currentIndex];
    const total = this.state.questions.length;
    this.elQuestionCounter.textContent = `Soal ${this.state.currentIndex + 1} / ${total}`;

    // Tampilkan data A dan B
    this.elDataA.textContent = q.dataA;
    this.elDataB.textContent = q.dataB;

    // Reset timer
    this.state.questionStartTime = performance.now();
    const timeLimit = this.config.timePerQuestion;
    this.state.timeRemaining = timeLimit;

    this.elTimerVal.textContent = `${timeLimit.toFixed(1)}s`;
    this.elTimerVal.classList.remove('warning');
    this.elProgressBar.classList.remove('danger');
    this.elProgressBar.style.width = '100%';

    this.startCountdownLoop();
  }

  startCountdownLoop() {
    cancelAnimationFrame(this.state.rafId);
    const timeLimitMs = this.config.timePerQuestion * 1000;
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
        this.handleTimeout();
        return;
      }

      this.state.rafId = requestAnimationFrame(frame);
    };

    this.state.rafId = requestAnimationFrame(frame);
  }

  handleAnswer(chosenAnswer) {
    if (!this.state.isRunning) return;
    cancelAnimationFrame(this.state.rafId);

    const q = this.state.questions[this.state.currentIndex];
    const timeSpent = (performance.now() - this.state.questionStartTime) / 1000;
    const isCorrect = chosenAnswer === q.correctAnswer;

    if (isCorrect) {
      this.sound.playCorrect();
      this.triggerFlash('correct');
    } else {
      this.sound.playWrong();
      this.triggerFlash('wrong');
    }

    this.state.userAnswers.push({
      question: q,
      answer: chosenAnswer,
      isCorrect: isCorrect,
      timeSpent: timeSpent,
      timeout: false
    });

    this.updateLiveStats();
    this.state.currentIndex++;

    if (this.config.autoMode) {
      setTimeout(() => {
        this.displayCurrentQuestion();
      }, 100);
    } else {
      this.displayCurrentQuestion();
    }
  }

  handleTimeout() {
    cancelAnimationFrame(this.state.rafId);
    this.sound.playWrong();
    this.triggerFlash('wrong');

    const q = this.state.questions[this.state.currentIndex];
    this.state.userAnswers.push({
      question: q,
      answer: 'TIMEOUT',
      isCorrect: false,
      timeSpent: this.config.timePerQuestion,
      timeout: true
    });

    this.updateLiveStats();
    this.state.currentIndex++;

    setTimeout(() => {
      this.displayCurrentQuestion();
    }, 120);
  }

  triggerFlash(type) {
    const cls = type === 'correct' ? 'flash-correct' : 'flash-wrong';
    this.elTestContainer.classList.add(cls);
    setTimeout(() => {
      this.elTestContainer.classList.remove(cls);
    }, 300);
  }

  updateLiveStats() {
    const correctCount = this.state.userAnswers.filter(a => a.isCorrect).length;
    const wrongCount = this.state.userAnswers.filter(a => !a.isCorrect).length;
    this.elStatCorrect.textContent = correctCount;
    this.elStatWrong.textContent = wrongCount;
  }

  finishTest() {
    this.state.isRunning = false;
    cancelAnimationFrame(this.state.rafId);
    this.sound.playFinish();

    const total = this.state.userAnswers.length;
    const correct = this.state.userAnswers.filter(a => a.isCorrect).length;
    const wrong = this.state.userAnswers.filter(a => !a.isCorrect && !a.timeout).length;
    const timeout = this.state.userAnswers.filter(a => a.timeout).length;

    const accuracyPct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const totalTime = this.state.userAnswers.reduce((acc, cur) => acc + cur.timeSpent, 0);
    const avgSpeed = total > 0 ? (totalTime / total).toFixed(2) : '0.00';

    // Skor & Kategori Psikotes
    this.elResultScore.textContent = accuracyPct;
    this.elStatBenar.textContent = correct;
    this.elStatSalah.textContent = wrong;
    this.elStatTimeout.textContent = timeout;
    this.elStatSpeed.textContent = `${avgSpeed}s`;

    let gradeClass = "grade-b";
    let gradeText = "Grade B: Teliti";
    let kategoriText = "Baik / Memenuhi Standar Seleksi Kerja";

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

    this.elResultGradeBadge.className = `grade-badge ${gradeClass}`;
    this.elResultGradeBadge.textContent = gradeText;
    this.elResultKategori.textContent = kategoriText;

    // Render daftar review jawaban dengan visual highlight perbedaan data
    this.renderReviewList();

    // Tampilkan tombol retry wrong jika ada yang salah
    const hasMistakes = (wrong + timeout) > 0;
    this.elBtnRetryWrong.style.display = hasMistakes ? 'inline-block' : 'none';

    // Buka Modal Hasil
    this.elModalResults.classList.add('active');
  }

  renderReviewList() {
    this.elReviewList.innerHTML = "";
    this.state.userAnswers.forEach((ans, index) => {
      const q = ans.question;
      const item = document.createElement('div');
      item.className = `review-item ${ans.isCorrect ? 'correct' : (ans.timeout ? 'timeout' : 'wrong')}`;

      let statusBadge = "";
      if (ans.isCorrect) {
        statusBadge = `<span style="color:#059669;">✓ Benar (${ans.timeSpent.toFixed(2)}s)</span>`;
      } else if (ans.timeout) {
        statusBadge = `<span style="color:#d97706;">⌛ Waktu Habis (${ans.timeSpent.toFixed(2)}s)</span>`;
      } else {
        statusBadge = `<span style="color:#dc2626;">✗ Salah (${ans.timeSpent.toFixed(2)}s)</span>`;
      }

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
      this.elReviewList.appendChild(item);
    });
  }

  getDiffHighlightedString(strA, strB) {
    if (strA === strB) {
      return this.escapeHtml(strB);
    }

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

  retryWrongQuestions() {
    const wrongQuestions = this.state.userAnswers
      .filter(a => !a.isCorrect)
      .map(a => a.question);

    if (wrongQuestions.length === 0) return;

    this.elModalResults.classList.remove('active');
    this.startNewTest(wrongQuestions);
  }

  openSettings() {
    this.state.isPaused = true;

    this.setRadioValue('q-count', this.config.questionCount.toString());
    this.setRadioValue('q-type', this.config.dataType);
    this.setRadioValue('q-diff', this.config.difficulty);
    this.updateCustomTime(this.config.timePerQuestion);

    this.elModalSettings.classList.add('active');
  }

  closeSettings() {
    this.elModalSettings.classList.remove('active');
    this.state.isPaused = false;
    if (this.state.isRunning) {
      this.startCountdownLoop();
    }
  }

  saveSettings() {
    const count = parseInt(this.getRadioValue('q-count') || "5", 10);
    const radioTime = this.getRadioValue('q-time');
    const time = radioTime ? parseFloat(radioTime) : this.config.timePerQuestion;
    const type = this.getRadioValue('q-type') || "numeric";
    const diff = this.getRadioValue('q-diff') || "medium";

    this.config.questionCount = count;
    this.config.timePerQuestion = time;
    this.config.dataType = type;
    this.config.difficulty = diff;

    this.savePreferences();
    this.syncUIWithConfig();
    this.closeSettings();

    if (this.state.currentView === 'test') {
      this.startNewTest();
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

// Inisialisasi aplikasi saat DOM siap
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AccuracyTestApp();
});
