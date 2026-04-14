// ============================================================
// How It Started — app.js
// Handles chapter navigation, theme switching, HTMX loading
// ============================================================

const CHAPTERS = [
  { id: 0,  theme: 'landing',   title: 'How It Started',       years: '' },
  { id: 1,  theme: 'terminal',  title: 'Before the Web',        years: '1960s – 1989' },
  { id: 2,  theme: 'early-web', title: 'The First Web',         years: '1989 – 1995' },
  { id: 3,  theme: 'late-90s',  title: 'The Browser Wars',      years: '1993 – 2001' },
  { id: 4,  theme: 'flash-era', title: 'The Dynamic Web',       years: '1995 – 2004' },
  { id: 5,  theme: 'web20',     title: 'Web 2.0',               years: '2004 – 2010' },
  { id: 6,  theme: 'modern',    title: 'The Modern Web',        years: '2010 – Now' },
];

const CHAPTERS_ES = [
  { id: 0,  theme: 'landing',   title: 'Cómo Empezó',                      years: '' },
  { id: 1,  theme: 'terminal',  title: 'Antes de la Web',                   years: 'Años 60 – 1989' },
  { id: 2,  theme: 'early-web', title: 'La Primera Web',                    years: '1989 – 1995' },
  { id: 3,  theme: 'late-90s',  title: 'La Guerra de Navegadores',          years: '1993 – 2001' },
  { id: 4,  theme: 'flash-era', title: 'La Web Dinámica',                   years: '1995 – 2004' },
  { id: 5,  theme: 'web20',     title: 'Web 2.0',                           years: '2004 – 2010' },
  { id: 6,  theme: 'modern',    title: 'La Web Moderna',                    years: '2010 – Hoy' },
];

// ---- LANGUAGE / i18n ----
let currentLang = localStorage.getItem('lang') || 'en';

const TRANSLATIONS = {
  en: {
    'kicker':        'A history of the web',
    'title-line1':   'How It',
    'title-accent':  'Started',
    'subtitle':      'From a cold-war military network to the app on your screen. Every era lived in. Every concept explained. Six chapters through 60 years of the web.',
    'stat-chapters': 'Chapters',
    'stat-years':    'Years covered',
    'stat-eras':     'Visual eras',
    'start-btn':     'Start from the beginning →',
    'footnote':      'Use arrow keys to navigate between chapters',
    'prev-btn':      '← Back',
    'next-btn':      'Next →',
    'finish-btn':    'Finish',
    'no-track':      'No track loaded',
    'home-title':    'How It Started',
    'coming-soon':   'Content coming soon.',
    'chapter-label': 'Chapter',
  },
  es: {
    'kicker':        'Una historia de la web',
    'title-line1':   'Cómo',
    'title-accent':  'Empezó',
    'subtitle':      'De una red militar de la Guerra Fría a la app en tu pantalla. Cada era, vivida por dentro. Cada concepto, explicado. Seis capítulos y 60 años de historia de la web.',
    'stat-chapters': 'Capítulos',
    'stat-years':    'Años cubiertos',
    'stat-eras':     'Eras visuales',
    'start-btn':     'Empezar desde el principio →',
    'footnote':      'Usa las teclas de flecha para navegar entre capítulos',
    'prev-btn':      '← Atrás',
    'next-btn':      'Siguiente →',
    'finish-btn':    'Finalizar',
    'no-track':      'Sin pista cargada',
    'home-title':    'Cómo Empezó',
    'coming-soon':   'Contenido próximamente.',
    'chapter-label': 'Capítulo',
  }
};

function getChapters() {
  return currentLang === 'es' ? CHAPTERS_ES : CHAPTERS;
}

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['en'][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = TRANSLATIONS[lang][key];
    if (val !== undefined) el.textContent = val;
  });

  // Update lang toggle button label
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'en' ? 'ES' : 'EN';

  // Update chapter card titles/years on landing
  const chapters = getChapters();
  document.querySelectorAll('.chapter-card[data-chapter]').forEach(card => {
    const id = parseInt(card.dataset.chapter);
    const ch = chapters[id];
    if (!ch) return;
    const h3   = card.querySelector('.card-info h3');
    const span = card.querySelector('.card-info span');
    if (h3)   h3.textContent   = ch.title;
    if (span) span.textContent = ch.years;
  });

  // If a chapter is open, reload its content and refresh nav/progress
  if (currentChapter > 0) {
    fetchChapterContent(currentChapter);
    updateNav(currentChapter);
    updateChapterProgress(currentChapter);
  }
}

function toggleLang() {
  setLang(currentLang === 'en' ? 'es' : 'en');
}

function fetchChapterContent(chapterId) {
  const path = currentLang === 'es'
    ? `chapters/es/ch${chapterId}.html`
    : `chapters/ch${chapterId}.html`;
  fetch(path)
    .then(res => { if (!res.ok) throw new Error('not found'); return res.text(); })
    .then(html => {
      document.getElementById('chapter-content').innerHTML = html;
      setTimeout(initScrollAnimations, 100);
    })
    .catch(() => {
      // Fall back to English if Spanish file missing
      if (currentLang === 'es') {
        fetch(`chapters/ch${chapterId}.html`)
          .then(res => res.text())
          .then(html => {
            document.getElementById('chapter-content').innerHTML = html;
            setTimeout(initScrollAnimations, 100);
          });
      }
    });
}

function updateChapterProgress(chapterId) {
  const chapters = getChapters();
  document.getElementById('chapter-progress').textContent =
    `${chapters[chapterId].title}  ·  ${chapterId} / ${CHAPTERS.length - 1}`;
  document.getElementById('prev-btn').textContent = t('prev-btn');
  document.getElementById('next-btn').textContent =
    chapterId < CHAPTERS.length - 1 ? t('next-btn') : t('finish-btn');
}

const THEME_STYLESHEETS = {
  'landing':   'css/themes/landing.css',
  'terminal':  'css/themes/terminal.css',
  'early-web': 'css/themes/early-web.css',
  'late-90s':  'css/themes/late-90s.css',
  'flash-era': 'css/themes/flash-era.css',
  'web20':     'css/themes/web20.css',
  'modern':    'css/themes/modern.css',
};

let currentChapter = 0;

// ---- THEME SWITCHING ----
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  const link = document.getElementById('theme-css');
  link.href = THEME_STYLESHEETS[themeName] || THEME_STYLESHEETS['landing'];
}

// ---- ERA TRANSITION (flash overlay) ----
function eraTransition(callback) {
  const overlay = document.getElementById('era-overlay');
  overlay.classList.add('flash');
  setTimeout(() => {
    callback();
    overlay.classList.remove('flash');
  }, 300);
}

// ---- UPDATE NAV INDICATORS ----
function updateNav(chapterId) {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.remove('active', 'visited');
    if (i === chapterId) dot.classList.add('active');
    else if (i < chapterId) dot.classList.add('visited');
  });

  const navTitle = document.getElementById('nav-title');
  if (chapterId === 0) {
    navTitle.textContent = t('home-title');
  } else {
    navTitle.textContent = `${String(chapterId).padStart(2,'0')} — ${getChapters()[chapterId].title}`;
  }
  navTitle.onclick = chapterId > 0 ? () => backToLanding() : null;
  navTitle.style.cursor = chapterId > 0 ? 'pointer' : 'default';
}

// ---- READING PROGRESS BAR ----
const progressBar = document.getElementById('reading-progress');

function updateProgress() {
  if (currentChapter === 0) return;
  const content = document.getElementById('chapter-content');
  if (!content) return;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const pct = docHeight > 0 ? Math.min(100, (scrolled / docHeight) * 100) : 0;
  progressBar.style.width = pct + '%';
}

window.addEventListener('scroll', updateProgress, { passive: true });

// ---- SCROLL-IN ANIMATIONS via IntersectionObserver ----
let animObserver = null;

function initScrollAnimations() {
  if (animObserver) animObserver.disconnect();

  const els = document.querySelectorAll(
    '#chapter-content h2, #chapter-content h3, #chapter-content .concept-box, #chapter-content .fun-fact, #chapter-content .key-dates, #chapter-content blockquote, #chapter-content pre'
  );

  animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    animObserver.observe(el);
  });
}

// ---- LOAD CHAPTER ----
async function loadChapter(chapterId) {
  if (chapterId < 1 || chapterId > CHAPTERS.length - 1) return;

  const chapter = CHAPTERS[chapterId];

  eraTransition(async () => {
    setTheme(chapter.theme);
    currentChapter = chapterId;
    updateNav(chapterId);

    // Show chapter screen, hide landing
    document.getElementById('landing-screen').style.display = 'none';
    document.getElementById('chapter-screen').style.display = 'block';

    // Show progress bar
    progressBar.classList.add('visible');
    progressBar.style.width = '0%';

    // Update progress text and nav buttons
    document.getElementById('prev-btn').style.visibility = chapterId > 1 ? 'visible' : 'hidden';
    updateChapterProgress(chapterId);

    // Load chapter content via fetch (language-aware)
    const langPath = currentLang === 'es'
      ? `chapters/es/ch${chapterId}.html`
      : `chapters/ch${chapterId}.html`;
    try {
      const res = await fetch(langPath);
      if (!res.ok) throw new Error('not found');
      const html = await res.text();
      document.getElementById('chapter-content').innerHTML = html;
    } catch (e) {
      const ch = getChapters()[chapterId];
      document.getElementById('chapter-content').innerHTML =
        `<p class="chapter-eyebrow">${t('chapter-label')} ${chapterId}</p>
         <h1>${ch.title}</h1>
         <p class="chapter-intro">${ch.years}</p>
         <p>${t('coming-soon')}</p>`;
    }

    // Load audio for this chapter (shows player only if file exists)
    loadAudio(chapterId);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Init scroll animations after content loads
    setTimeout(initScrollAnimations, 100);
    updateProgress();
  });
}

// ---- WINAMP AUDIO PLAYER ----
let audioReady = false;

function audioFmtTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function audioToggle() {
  const el = document.getElementById('audio-el');
  if (!audioReady) return;
  el.paused ? el.play() : el.pause();
}

function audioStop() {
  const el = document.getElementById('audio-el');
  el.pause();
  el.currentTime = 0;
}

function audioToggleMute() {
  const el = document.getElementById('audio-el');
  el.muted = !el.muted;
  document.getElementById('audio-vol-btn').textContent = el.muted ? '🔇' : '🔊';
}

function audioVolume(val) {
  const el = document.getElementById('audio-el');
  el.volume = val / 100;
  el.muted = (val == 0);
  document.getElementById('audio-vol-btn').textContent = (val == 0) ? '🔇' : '🔊';
}

function audioSeekRel(secs) {
  const el = document.getElementById('audio-el');
  if (!audioReady) return;
  el.currentTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + secs));
}

function winampMinimize() {
  const player = document.getElementById('audio-player');
  player.classList.toggle('wa-minimized');
}

function winampSetPlaying(playing) {
  const spectrum = document.getElementById('wa-spectrum');
  const playBtn = document.getElementById('audio-play-btn');
  const marquee = document.getElementById('audio-track-title');
  if (playing) {
    spectrum.classList.add('playing');
    playBtn.textContent = '⏸';
    playBtn.classList.remove('wa-play');
    marquee.classList.remove('paused');
  } else {
    spectrum.classList.remove('playing');
    playBtn.textContent = '▶';
    playBtn.classList.add('wa-play');
    marquee.classList.add('paused');
  }
}

function loadAudio(chapterId) {
  const chapter = CHAPTERS[chapterId];
  const el = document.getElementById('audio-el');
  const player = document.getElementById('audio-player');
  const src = `audio/ch${chapterId}.mp3`;

  el.pause();
  audioReady = false;
  player.classList.remove('visible');
  winampSetPlaying(false);
  document.getElementById('audio-seek').value = 0;
  document.getElementById('audio-current').textContent = '0:00';
  document.getElementById('audio-duration').textContent = '0:00';

  fetch(src, { method: 'HEAD' })
    .then(res => {
      if (!res.ok) return;
      el.src = src;
      el.load();
      const ch = getChapters()[chapterId];
      const title = `${ch.title}  ·  ${ch.years}  ·  ${t('home-title')}`;
      document.getElementById('audio-track-title').textContent = title;
      player.classList.add('visible');
    })
    .catch(() => {});
}

// ---- WINAMP DRAG ----
function initWinampDrag() {
  const player = document.getElementById('audio-player');
  const titlebar = player.querySelector('.wa-titlebar');
  let dragging = false, startX, startY, origLeft, origBottom;

  titlebar.addEventListener('mousedown', e => {
    if (e.target.classList.contains('wa-tb-btn')) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = player.getBoundingClientRect();
    origLeft = rect.left;
    origBottom = window.innerHeight - rect.bottom;
    player.style.right = 'auto';
    player.style.left = origLeft + 'px';
    player.style.bottom = origBottom + 'px';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const newLeft = Math.max(0, Math.min(window.innerWidth - player.offsetWidth, origLeft + dx));
    const newBottom = Math.max(0, Math.min(window.innerHeight - player.offsetHeight, origBottom - dy));
    player.style.left = newLeft + 'px';
    player.style.bottom = newBottom + 'px';
  });

  document.addEventListener('mouseup', () => { dragging = false; });
}

// Wire up audio element events after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved language preference on load
  setLang(currentLang);

  const el = document.getElementById('audio-el');
  const seekEl = document.getElementById('audio-seek');

  el.addEventListener('canplay', () => { audioReady = true; });

  el.addEventListener('timeupdate', () => {
    if (!isNaN(el.duration) && el.duration > 0) {
      seekEl.value = (el.currentTime / el.duration) * 100;
    }
    document.getElementById('audio-current').textContent = audioFmtTime(el.currentTime);
  });

  el.addEventListener('durationchange', () => {
    document.getElementById('audio-duration').textContent = audioFmtTime(el.duration);
  });

  el.addEventListener('play',  () => winampSetPlaying(true));
  el.addEventListener('pause', () => winampSetPlaying(false));
  el.addEventListener('ended', () => {
    winampSetPlaying(false);
    seekEl.value = 0;
  });

  seekEl.addEventListener('input', () => {
    if (!isNaN(el.duration) && el.duration > 0) {
      el.currentTime = (seekEl.value / 100) * el.duration;
    }
  });

  initWinampDrag();
});

// ---- CORS LAB ----
function triggerCorsDemo() {
  // Intentional cross-origin fetch — will fail with CORS error visible in DevTools Console
  fetch('https://www.bbc.com/').catch(() => {});
}

// ---- NAVIGATION ----
function nextChapter() {
  if (currentChapter < CHAPTERS.length - 1) {
    loadChapter(currentChapter + 1);
  }
}

function prevChapter() {
  if (currentChapter > 1) {
    loadChapter(currentChapter - 1);
  } else {
    backToLanding();
  }
}

function backToLanding() {
  eraTransition(() => {
    // Stop audio when leaving chapter view
    const audioEl = document.getElementById('audio-el');
    audioEl.pause();
    winampSetPlaying(false);
    document.getElementById('audio-player').classList.remove('visible');

    setTheme('landing');
    currentChapter = 0;
    updateNav(0);
    progressBar.classList.remove('visible');
    progressBar.style.width = '0%';
    document.getElementById('chapter-screen').style.display = 'none';
    document.getElementById('landing-screen').style.display = 'flex';
    window.scrollTo({ top: 0 });
    document.getElementById('nav-title').textContent = t('home-title');
  });
}

// ---- CHAPTER LIST CLICKS ON LANDING ----
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.chapter-entry').forEach(entry => {
    entry.addEventListener('click', () => {
      const ch = parseInt(entry.dataset.chapter);
      if (ch) loadChapter(ch);
    });
  });

  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (i === 0) backToLanding();
      else loadChapter(i);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (currentChapter === 0) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextChapter();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevChapter();
    if (e.key === 'Escape') backToLanding();
  });

  // Landing card entrance animation
  document.querySelectorAll('.chapter-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + i * 60);
  });
});
