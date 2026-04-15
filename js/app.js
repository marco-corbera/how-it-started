// ============================================================
// How It Started — app.js
// Handles chapter navigation, theme switching, course mode
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
    'kicker':            'A history of the web',
    'title-line1':       'How It',
    'title-accent':      'Started',
    'subtitle':          'From a cold-war military network to the app on your screen. Every era lived in. Every concept explained. Six chapters through 60 years of the web.',
    'stat-chapters':     'Chapters',
    'stat-years':        'Years covered',
    'stat-eras':         'Visual eras',
    'start-btn':         'Start from the beginning →',
    'or-divider':        'or',
    'learn-btn':         'Learn How the Web Works →',
    'footnote':          'Use arrow keys to navigate between chapters',
    'prev-btn':          '← Back',
    'next-btn':          'Next →',
    'finish-btn':        'Finish',
    'no-track':          'No track loaded',
    'home-title':        'How It Started',
    'coming-soon':       'Content coming soon.',
    'chapter-label':     'Chapter',
    'era-title':         'Choose your study era',
    'era-subtitle':      'Same course. Six different aesthetics. Pick the vibe you want to learn in.',
    'era-terminal':      'Terminal',
    'era-earlyweb':      'Early Web',
    'era-90s':           '90s Web',
    'era-flash':         'Flash Era',
    'era-web20':         'Web 2.0',
    'era-modern':        'Modern',
    'era-cancel':        'Cancel',
    'quiz-label':        'Knowledge Check',
    'quiz-subheader':    'Test what you learned',
    'quiz-submit':       'Check answers →',
    'quiz-retry':        'Try again',
    'quiz-passed':       'Great work — you got it.',
    'quiz-failed':       'Almost there — review and retry.',
    'objectives-label':  'In this module',
    'course-module':     'Module',
    'complete-title':    'Course Complete',
    'complete-subtitle': 'You covered how the web works — from the first HTTP request to the modern stack.',
    'complete-home':     'Back to home',
    'complete-review':   'Keep reading',
    'next-module':       'Next Module →',
    'finish-course':     'Finish Course',
  },
  es: {
    'kicker':            'Una historia de la web',
    'title-line1':       'Cómo',
    'title-accent':      'Empezó',
    'subtitle':          'De una red militar de la Guerra Fría a la app en tu pantalla. Cada era, vivida por dentro. Cada concepto, explicado. Seis capítulos y 60 años de historia de la web.',
    'stat-chapters':     'Capítulos',
    'stat-years':        'Años cubiertos',
    'stat-eras':         'Eras visuales',
    'start-btn':         'Empezar desde el principio →',
    'or-divider':        'o',
    'learn-btn':         'Aprende cómo funciona la web →',
    'footnote':          'Usa las teclas de flecha para navegar entre capítulos',
    'prev-btn':          '← Atrás',
    'next-btn':          'Siguiente →',
    'finish-btn':        'Finalizar',
    'no-track':          'Sin pista cargada',
    'home-title':        'Cómo Empezó',
    'coming-soon':       'Contenido próximamente.',
    'chapter-label':     'Capítulo',
    'era-title':         'Elige tu era de estudio',
    'era-subtitle':      'El mismo curso. Seis estéticas distintas. Elige cómo quieres aprender.',
    'era-terminal':      'Terminal',
    'era-earlyweb':      'Web Inicial',
    'era-90s':           'Web 90s',
    'era-flash':         'Era Flash',
    'era-web20':         'Web 2.0',
    'era-modern':        'Moderno',
    'era-cancel':        'Cancelar',
    'quiz-label':        'Verificar conocimientos',
    'quiz-subheader':    'Pon a prueba lo que aprendiste',
    'quiz-submit':       'Ver resultados →',
    'quiz-retry':        'Intentar de nuevo',
    'quiz-passed':       'Muy bien — lo tienes.',
    'quiz-failed':       'Casi — revisa y vuelve a intentar.',
    'objectives-label':  'En este módulo',
    'course-module':     'Módulo',
    'complete-title':    'Curso completado',
    'complete-subtitle': 'Cubriste cómo funciona la web — desde la primera petición HTTP hasta el stack moderno.',
    'complete-home':     'Volver al inicio',
    'complete-review':   'Seguir leyendo',
    'next-module':       'Siguiente módulo →',
    'finish-course':     'Finalizar curso',
  }
};

function getChapters() {
  return currentLang === 'es' ? CHAPTERS_ES : CHAPTERS;
}

function getCourseModules() {
  return currentLang === 'es' ? COURSE_MODULES_ES : COURSE_MODULES;
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

  // If a course module is open, re-render it in the new language
  if (courseMode && currentModule > 0) {
    renderCourseModule(currentModule);
    return;
  }

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
let courseMode     = false;
let currentModule  = 0;
let courseEra      = 'modern';

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
  if (courseMode) { nextCourseModule(); return; }
  if (currentChapter < CHAPTERS.length - 1) {
    loadChapter(currentChapter + 1);
  }
}

function prevChapter() {
  if (courseMode) { prevCourseModule(); return; }
  if (currentChapter > 1) {
    loadChapter(currentChapter - 1);
  } else {
    backToLanding();
  }
}

// ---- CHAPTER DOT CLICK HANDLERS ----
function initChapterDots() {
  document.querySelectorAll('.dot[data-chapter]').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (i === 0) backToLanding();
      else loadChapter(i);
    });
  });
}

const CHAPTER_DOTS_HTML = [
  `<span class="dot" data-chapter="0" title="Home"></span>`,
  `<span class="dot" data-chapter="1" title="Before the Web"></span>`,
  `<span class="dot" data-chapter="2" title="The First Web"></span>`,
  `<span class="dot" data-chapter="3" title="Browser Wars &amp; Forums"></span>`,
  `<span class="dot" data-chapter="4" title="The Dynamic Web"></span>`,
  `<span class="dot" data-chapter="5" title="Web 2.0"></span>`,
  `<span class="dot" data-chapter="6" title="The Modern Web"></span>`,
].join('');

function backToLanding() {
  courseMode    = false;
  currentModule = 0;
  eraTransition(() => {
    // Stop audio when leaving chapter view
    const audioEl = document.getElementById('audio-el');
    audioEl.pause();
    winampSetPlaying(false);
    document.getElementById('audio-player').classList.remove('visible');

    // Hide theme switcher
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) themeBtn.style.display = 'none';

    setTheme('landing');
    currentChapter = 0;

    // Restore chapter indicator dots (course mode replaces them with module dots)
    const indicators = document.getElementById('chapter-indicators');
    indicators.innerHTML = CHAPTER_DOTS_HTML;
    initChapterDots();

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

  initChapterDots();

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (courseMode) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextCourseModule();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevCourseModule();
      if (e.key === 'Escape') backToLanding();
      return;
    }
    if (currentChapter === 0) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextChapter();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevChapter();
    if (e.key === 'Escape') backToLanding();
  });

  // Load chapter completion progress on landing
  loadChapterProgress();

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

// ============================================================
// PROGRESS TRACKING (localStorage)
// ============================================================

const PROGRESS_KEY = 'how-it-started-progress';

function getProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch { return {}; }
}

function saveProgress(p) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

function loadChapterProgress() {
  const p = getProgress();
  let completed = 0;
  for (let i = 1; i <= 6; i++) {
    const card = document.querySelector(`.chapter-card[data-chapter="${i}"]`);
    if (!card) continue;
    if (p[`ch${i}`]?.passed) {
      card.classList.add('completed');
      completed++;
    } else {
      card.classList.remove('completed');
    }
  }
  updateLandingProgress(completed);
}

function updateLandingProgress(completed) {
  const fill    = document.getElementById('lcp-fill');
  const count   = document.getElementById('lcp-count');
  const bar     = document.getElementById('landing-course-progress');
  if (fill)  fill.style.width = `${(completed / 6) * 100}%`;
  if (count) count.textContent = `${completed} / 6`;
  if (bar)   bar.style.display = completed > 0 ? 'flex' : 'none';
}

function markChapterPassed(chapterId) {
  const p = getProgress();
  p[`ch${chapterId}`] = { passed: true };
  saveProgress(p);
  const card = document.querySelector(`.chapter-card[data-chapter="${chapterId}"]`);
  if (card) card.classList.add('completed');
  const completed = Object.keys(p).filter(k => k.startsWith('ch') && p[k].passed).length;
  updateLandingProgress(completed);
}

function markCourseModulePassed(moduleId) {
  const p = getProgress();
  p[`module${moduleId}`] = { passed: true };
  saveProgress(p);
  const completed = Object.keys(p).filter(k => k.startsWith('module') && p[k].passed).length;
  if (completed === getCourseModules().length) {
    setTimeout(showCompletionModal, 800);
  }
}

// ============================================================
// QUIZ SYSTEM (shared by chapters + course)
// ============================================================

// Per-session answer state
const quizAnswers = {};
const quizRegistry = {};

function renderObjectives(moduleId, objectives) {
  if (!objectives || !objectives.length) return;
  const label = t('objectives-label');
  const html = `
    <div class="objectives-block">
      <span class="objectives-label">${label}</span>
      <ul class="objectives-list">
        ${objectives.map(o => `<li class="obj-item">${o}</li>`).join('')}
      </ul>
    </div>`;
  const container = document.getElementById('chapter-content');
  const firstH2 = container.querySelector('h2');
  if (firstH2) firstH2.insertAdjacentHTML('beforebegin', html);
  else container.insertAdjacentHTML('afterbegin', html);
}

function renderQuiz(id, questions, isCourse) {
  if (!questions || !questions.length) return;
  quizAnswers[id] = {};
  quizRegistry[id] = questions;
  const label     = t('quiz-label');
  const subheader = t('quiz-subheader');
  const submitTxt = t('quiz-submit');

  const questionsHtml = questions.map((qObj, qIdx) => `
    <div class="quiz-q" data-q="${qIdx}">
      <p class="q-text">${qIdx + 1}. ${qObj.q}</p>
      <div class="q-options">
        ${qObj.opts.map((opt, oIdx) => `
          <button class="q-opt"
                  onclick="quizSelectAnswer('${id}', ${qIdx}, ${oIdx}, this)">
            ${opt}
          </button>`).join('')}
      </div>
    </div>`).join('');

  const html = `
    <div class="quiz-block" id="quiz-${id}">
      <div class="quiz-header">
        <span class="quiz-label">${label}</span>
        <p class="quiz-subheader">${subheader}</p>
      </div>
      <div class="quiz-questions">${questionsHtml}</div>
      <button class="quiz-submit" id="quiz-submit-${id}"
              onclick="submitQuiz('${id}', ${isCourse})"
              disabled>${submitTxt}</button>
      <div class="quiz-result" id="quiz-result-${id}"></div>
    </div>`;

  document.getElementById('chapter-content').insertAdjacentHTML('beforeend', html);
}

function quizSelectAnswer(id, qIdx, optIdx, btn) {
  if (!quizAnswers[id]) quizAnswers[id] = {};
  quizAnswers[id][qIdx] = optIdx;
  btn.closest('.q-options').querySelectorAll('.q-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  const submitBtn = document.getElementById(`quiz-submit-${id}`);
  if (submitBtn) {
    const totalQs = btn.closest('.quiz-questions').querySelectorAll('.quiz-q').length;
    submitBtn.disabled = Object.keys(quizAnswers[id]).length < totalQs;
  }
}

function submitQuiz(id, isCourse) {
  const questions = quizRegistry[id] || [];
  const answers = quizAnswers[id] || {};
  let score = 0;

  questions.forEach((qObj, qIdx) => {
    const selected = answers[qIdx];
    const correct  = selected === qObj.correct;
    if (correct) score++;

    const qEl = document.querySelector(`#quiz-${id} [data-q="${qIdx}"]`);
    if (!qEl) return;
    qEl.querySelectorAll('.q-opt').forEach((btn, oIdx) => {
      btn.disabled = true;
      btn.classList.remove('selected');
      if (oIdx === qObj.correct) btn.classList.add('correct');
      else if (oIdx === selected && !correct) btn.classList.add('wrong');
    });
  });

  const passed = score >= Math.ceil(questions.length * 0.66);
  const submitBtn = document.getElementById(`quiz-submit-${id}`);
  if (submitBtn) submitBtn.style.display = 'none';

  const resultEl = document.getElementById(`quiz-result-${id}`);
  if (resultEl) {
    const feedbackClass = passed ? 'pass' : 'fail';
    const feedbackText  = passed ? t('quiz-passed') : t('quiz-failed');
    const retryTxt      = t('quiz-retry');
    resultEl.innerHTML = `
      <div class="quiz-score-num" style="color:${passed ? '#22c55e' : '#f59e0b'}">${score}/${questions.length}</div>
      <div class="quiz-score-label">${score === questions.length ? 'Perfect score' : `${score} out of ${questions.length} correct`}</div>
      <p class="quiz-feedback ${feedbackClass}">${feedbackText}</p>
      ${!passed ? `<button class="quiz-retry" onclick="retryQuiz('${id}', ${isCourse})">${retryTxt}</button>` : ''}`;
    resultEl.style.display = 'block';
  }

  if (passed) {
    if (isCourse) {
      markCourseModulePassed(parseInt(id.replace('course-', '')));
    } else {
      markChapterPassed(parseInt(id.replace('chapter-', '')));
    }
  }
}

function retryQuiz(id, isCourse) {
  quizAnswers[id] = {};
  const block = document.getElementById(`quiz-${id}`);
  if (!block) return;
  block.querySelectorAll('.q-opt').forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('selected', 'correct', 'wrong');
  });
  const submitBtn = document.getElementById(`quiz-submit-${id}`);
  if (submitBtn) { submitBtn.style.display = ''; submitBtn.disabled = true; }
  const resultEl = document.getElementById(`quiz-result-${id}`);
  if (resultEl) { resultEl.style.display = 'none'; resultEl.innerHTML = ''; }
}

// ============================================================
// COMPLETION MODAL + CONFETTI
// ============================================================

function showCompletionModal() {
  const modal = document.getElementById('completion-modal');
  if (!modal) return;
  modal.classList.add('visible');
  const pillsEl = document.getElementById('completion-chapters-list');
  if (pillsEl) {
    pillsEl.innerHTML = getCourseModules().map(m =>
      `<span class="completion-ch-pill">${m.title}</span>`).join('');
  }
  launchConfetti();
}

function closeCompletionModal() {
  const modal = document.getElementById('completion-modal');
  if (modal) modal.classList.remove('visible');
}

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  container.innerHTML = '';
  const colors = ['#22c55e','#4f8eff','#f59e0b','#ef4444','#a855f7','#06b6d4'];
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 6}px;
      height: ${6 + Math.random() * 6}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${2 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 0.8}s;`;
    container.appendChild(p);
  }
  setTimeout(() => { container.innerHTML = ''; }, 4000);
}

// ============================================================
// ERA SELECTOR
// ============================================================

function openEraSelector() {
  document.getElementById('era-selector-modal').classList.add('visible');
}

function closeEraSelector() {
  document.getElementById('era-selector-modal').classList.remove('visible');
}

// ============================================================
// COURSE MODE
// ============================================================

// Era → audio chapter mapping
const ERA_AUDIO = {
  'terminal':  1,
  'early-web': 2,
  'late-90s':  3,
  'flash-era': 4,
  'web20':     5,
  'modern':    6,
};

// ---- COURSE DATA ----
const COURSE_MODULES = [
  {
    id: 1,
    eyebrow: 'Module 01',
    title: 'How a Page Loads',
    intro: 'Every time you type a URL and press Enter, a precise sequence unfolds — DNS lookups, TCP connections, HTTP conversations, parsing, rendering. It all happens in under a second. Understanding this sequence is the foundation for understanding everything else about the web.',
    objectives: [
      'What DNS is and why you type names instead of numbers',
      'What an HTTP request and response look like',
      'Why a single page load triggers many separate requests',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Step 1 — Parsing the URL',
        body: `The URL you type is actually three things in one. Take <code>https://example.com/about</code>. The <strong>scheme</strong> (<code>https://</code>) tells the browser which protocol to use. The <strong>host</strong> (<code>example.com</code>) is where the server lives. The <strong>path</strong> (<code>/about</code>) is the specific resource you're requesting. The browser separates these before it does anything else.`,
      },
      {
        type: 'text',
        heading: 'Step 2 — DNS: Turning Names into Numbers',
        body: `Computers don't use <code>example.com</code>. They use IP addresses — numbers like <code>93.184.216.34</code>. DNS (Domain Name System) is the distributed phonebook that translates one to the other. Your browser checks its local cache first, then the OS cache, then asks a DNS resolver (usually your ISP or Google's <code>8.8.8.8</code>). The whole lookup typically takes single-digit milliseconds.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'What is an IP Address?',
        body: `Every device on the internet has an IP address — a unique number identifying its network location. IPv4 addresses look like <code>93.184.216.34</code> (four numbers, 0–255 each). There are ~4.3 billion possible IPv4 addresses. We've run out, which is why IPv6 exists (128-bit addresses, vastly more combinations). Your laptop has one. The server you're connecting to has one. Even your router has two — one facing your home network, one facing the internet.`,
      },
      {
        type: 'text',
        heading: 'Step 3 — The HTTP Conversation',
        body: `With the IP address, the browser opens a TCP connection (a three-way handshake confirming both sides are ready). Then it sends an HTTP request — a structured text message:<br><br><code>GET /about HTTP/1.1<br>Host: example.com<br>User-Agent: Mozilla/5.0...</code><br><br>The server reads this, finds the resource, and responds:<br><br><code>HTTP/1.1 200 OK<br>Content-Type: text/html<br><br>&lt;!DOCTYPE html&gt;...</code><br><br>That's the whole web. A structured text conversation, billions of times per day.`,
      },
      {
        type: 'text',
        heading: 'Step 4 — Rendering',
        body: `The browser parses the HTML top to bottom. Every <code>&lt;link&gt;</code>, <code>&lt;script&gt;</code>, and <code>&lt;img&gt;</code> triggers a new HTTP request. A single page load can involve 50–100+ separate requests — HTML, CSS, JavaScript, fonts, images, analytics. The browser prioritizes them, loads critical ones first, and renders progressively as data arrives.`,
      },
      {
        type: 'lab',
        label: 'Try It — DevTools Lab',
        heading: 'Watch a Page Load in Real Time',
        steps: [
          'Open DevTools: <code>F12</code> on Windows, <code>Cmd ⌥ I</code> on Mac',
          'Click the <strong>Network</strong> tab',
          'Reload this page (<code>Cmd+R</code> or <code>Ctrl+R</code>)',
          'Watch every request appear — HTML first, then CSS, JS, fonts, images...',
        ],
        explain: `The first row is the HTML document. Everything else was discovered as the browser parsed that HTML. The waterfall chart shows each request's timing. Click any row to see the full request and response headers.`,
      },
    ],
    quiz: [
      { q: 'What does DNS do?', opts: ['Encrypts data between client and server', 'Translates hostnames like example.com into IP addresses', 'Manages HTTP cookies and sessions', 'Compresses HTML before sending it'], correct: 1 },
      { q: 'What does a 200 status code in an HTTP response mean?', opts: ['The response is 200 bytes', 'The request was successful', 'The server is located at address 200', 'The page requires authentication'], correct: 1 },
      { q: 'Loading one web page typically requires how many HTTP requests?', opts: ['Exactly one — the HTML document', 'Two — HTML and CSS', 'Dozens — HTML plus every linked resource', 'Hundreds — one per character on screen'], correct: 2 },
    ],
  },
  {
    id: 2,
    eyebrow: 'Module 02',
    title: 'HTML — Structure',
    intro: 'HTML is not a programming language. It has no loops, no conditions, no functions. It\'s a markup language — its job is to describe what content is: this is a heading, this is a paragraph, this is a link. The browser reads that description and decides how to present it.',
    objectives: [
      'The difference between HTML and a programming language',
      'What the DOM is and why it matters',
      'What semantic HTML means and why it\'s important',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Tags, Elements, Attributes',
        body: `HTML is built from <strong>tags</strong> — angle-bracket labels that wrap content and give it meaning. Most tags come in pairs: an opening tag and a closing tag.<br><br><code>&lt;h1&gt;This is a heading&lt;/h1&gt;<br>&lt;p&gt;This is a paragraph.&lt;/p&gt;<br>&lt;a href="https://example.com"&gt;This is a link&lt;/a&gt;</code><br><br>The tag tells the browser what the content <em>is</em>. The browser decides how to display it. That separation — content vs. presentation — is intentional and fundamental.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'The DOM — Document Object Model',
        body: `When the browser parses HTML, it doesn't keep the text. It builds a <strong>tree</strong> of objects in memory called the DOM. Every element becomes a node. The <code>&lt;html&gt;</code> is the root. <code>&lt;head&gt;</code> and <code>&lt;body&gt;</code> are its children. Every tag inside becomes a child of its parent tag.<br><br>This matters because CSS and JavaScript don't interact with the HTML text — they interact with the DOM tree. When JavaScript changes something on screen, it's modifying the DOM, not rewriting HTML.`,
      },
      {
        type: 'text',
        heading: 'Semantic HTML',
        body: `HTML has many tags. You could technically put all your content in <code>&lt;div&gt;</code> tags. But the language provides specific tags for specific meanings: <code>&lt;article&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;main&gt;</code>.<br><br>Using the right tag matters for three reasons: <strong>accessibility</strong> (screen readers use semantic tags to navigate), <strong>SEO</strong> (search engines weigh semantic content more heavily), and <strong>maintainability</strong> (code that says what it means is easier to understand).`,
      },
      {
        type: 'fun-fact',
        label: 'Curious fact',
        body: `The very first version of HTML, written by Tim Berners-Lee in 1991, had 18 tags. Modern HTML5 has over 110. The most important tag ever added was <code>&lt;a&gt;</code> — the hyperlink. Without it, HTML would just be a formatting language. With it, it became a web.`,
      },
      {
        type: 'lab',
        label: 'Try It — DevTools Lab',
        heading: 'Inspect the DOM Live',
        steps: [
          'Right-click anywhere on this page and choose <strong>Inspect</strong>',
          'The Elements panel shows the live DOM tree',
          'Hover over any element in the panel — the browser highlights it on screen',
          'Double-click on any text inside a tag to edit it live',
        ],
        explain: `What you're looking at is not the original HTML file. It's the live DOM. Any changes JavaScript has made since the page loaded are reflected here. The original HTML is in View Source (<code>Cmd+U</code> / <code>Ctrl+U</code>) — compare the two.`,
      },
    ],
    quiz: [
      { q: 'What is the DOM?', opts: ['The HTML file stored on the server', 'A tree of objects the browser builds from parsing HTML', 'A design pattern for organizing JavaScript', 'A CSS preprocessor built into modern browsers'], correct: 1 },
      { q: 'Why does semantic HTML matter?', opts: ['It loads faster than non-semantic HTML', 'It\'s required by modern browsers', 'It improves accessibility, SEO, and maintainability', 'It enables CSS to work properly'], correct: 2 },
      { q: 'What was the single most important tag Tim Berners-Lee added to HTML?', opts: ['<img> — images made the web visual', '<div> — without it layout is impossible', '<a> — the hyperlink that made the web a web', '<html> — the root element every page needs'], correct: 2 },
    ],
  },
  {
    id: 3,
    eyebrow: 'Module 03',
    title: 'CSS — Style',
    intro: 'HTML gives content structure. CSS gives it style. They were intentionally separated — content and presentation are different concerns, and keeping them separate makes both easier to change independently.',
    objectives: [
      'How CSS selectors target elements in the DOM',
      'What "cascading" means and how specificity resolves conflicts',
      'What the box model is and why it matters for layout',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Selectors — Targeting Elements',
        body: `CSS works with two parts: a <strong>selector</strong> that targets elements, and a <strong>declaration block</strong> that defines styles. The browser finds every element matching the selector and applies the styles.<br><br><code>h1 { color: #333; }<br>.card { border-radius: 8px; }<br>#nav { position: fixed; }</code><br><br>You can target by element type (<code>h1</code>), by class (<code>.card</code>), by ID (<code>#nav</code>), by attribute, by relationship, by state (<code>:hover</code>, <code>:focus</code>). The selector system is where CSS gets its power — and its complexity.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'The Cascade and Specificity',
        body: `Multiple CSS rules can match the same element. When they conflict, the browser uses <strong>specificity</strong> to decide which wins. The rough hierarchy:<br><br><code>inline styles &gt; #id &gt; .class &gt; element</code><br><br>A rule targeting <code>#nav</code> beats one targeting <code>.nav</code>. Both beat a rule targeting <code>nav</code>. The "cascading" in CSS refers to this layered resolution — rules flow down and the most specific wins. When specificity is equal, the rule that appears later in the file wins.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'The Box Model',
        body: `Every HTML element is a rectangular box. That box has four layers, from inside out:<br><br><strong>Content</strong> — the actual text or image.<br><strong>Padding</strong> — space between content and the border (inside the element).<br><strong>Border</strong> — a line around the padding (can be invisible).<br><strong>Margin</strong> — space outside the border (between this element and others).<br><br>Understanding the box model is mandatory for doing layout. When an element is "bigger than expected" it's almost always padding or border you forgot about.`,
      },
      {
        type: 'text',
        heading: 'Responsive Design — One CSS, All Screens',
        body: `<strong>Media queries</strong> let CSS apply different rules at different screen sizes. The principle: design for the smallest screen first, then add complexity for larger screens.<br><br><code>@media (max-width: 768px) {<br>  .grid { flex-direction: column; }<br>}</code><br><br>Ethan Marcotte coined "Responsive Web Design" in 2010. Within two years it was the standard approach. Before it, most sites had a separate <code>m.example.com</code> mobile version that was always outdated.`,
      },
      {
        type: 'lab',
        label: 'Try It — DevTools Lab',
        heading: 'Edit Styles Live',
        steps: [
          'Right-click any element on this page and choose <strong>Inspect</strong>',
          'In the Styles panel on the right, find any CSS property',
          'Click the value and change it — the page updates immediately',
          'Try adding a new property: click after the last rule in a block and type anything',
        ],
        explain: `These changes are only in your browser's memory — they disappear on reload. But this live editing loop (change CSS → see result instantly) is how all frontend developers work. No reload needed. The Computed tab shows the final resolved value for every property on the selected element.`,
      },
    ],
    quiz: [
      { q: 'When two CSS rules conflict on the same element, what determines which wins?', opts: ['The rule that appears earlier in the file', 'The rule with higher specificity', 'The rule with more properties', 'The rule attached to the HTML element directly'], correct: 1 },
      { q: 'In the CSS box model, what is "padding"?', opts: ['Space outside the element border', 'Space between the content and the element\'s border', 'The border width itself', 'The minimum size of the content area'], correct: 1 },
      { q: 'What is a CSS media query used for?', opts: ['Querying the database for content', 'Applying different styles at different screen sizes', 'Loading CSS files asynchronously', 'Caching CSS rules in the browser'], correct: 1 },
    ],
  },
  {
    id: 4,
    eyebrow: 'Module 04',
    title: 'JavaScript — Behavior',
    intro: 'HTML describes structure. CSS defines style. JavaScript makes pages react. It\'s the only programming language that runs natively in the browser — and it can read and modify anything in the DOM, respond to user events, make network requests, and run code on a timer.',
    objectives: [
      'How JavaScript interacts with the DOM',
      'What event-driven programming means',
      'How to use the browser console as a live JS environment',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Manipulating the DOM',
        body: `JavaScript can find any element, read its content, change it, move it, add new ones, or remove them. The two most used methods:<br><br><code>// Find an element<br>const el = document.querySelector('.my-class');<br><br>// Change its content<br>el.textContent = 'Hello';<br><br>// Change its style<br>el.style.color = 'red';<br><br>// Add a CSS class<br>el.classList.add('active');</code><br><br>Every interactive thing you've ever done on a web page — a dropdown opening, a modal appearing, a counter incrementing — was JavaScript doing this.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'Event-Driven Programming',
        body: `JavaScript doesn't run top-to-bottom and stop. It runs, sets up <strong>event listeners</strong>, and then waits. When something happens — a click, a keypress, a timer firing, a network request completing — the relevant listener runs.<br><br><code>document.querySelector('#btn').addEventListener('click', () => {<br>  alert('Button clicked!');<br>});</code><br><br>This model is why JavaScript feels "alive." The code is reactive — it responds to things as they happen. The browser's event loop is the engine running all of this.`,
      },
      {
        type: 'text',
        heading: 'Fetch — Making Requests from JS',
        body: `JavaScript can make HTTP requests without the user navigating anywhere. The <code>fetch()</code> API is the modern way:<br><br><code>fetch('/api/data')<br>  .then(res => res.json())<br>  .then(data => {<br>    console.log(data);<br>  });</code><br><br>This is how every modern web app works. The page loads once. Then JavaScript fetches data in the background and updates the DOM. No full reload. This is Ajax — the technique that made Gmail and Google Maps possible.`,
      },
      {
        type: 'fun-fact',
        label: 'Curious fact',
        body: `JavaScript was created by Brendan Eich at Netscape in 10 days in 1995. The first version was written to ship with Netscape Navigator 2.0 — the deadline was real. The language's quirks (type coercion, <code>this</code> behavior, <code>null == undefined</code>) are partly explained by this origin story. Yet it became the most deployed programming language in history. Sometimes speed beats purity.`,
      },
      {
        type: 'lab',
        label: 'Try It — DevTools Lab',
        heading: 'Run JavaScript in the Console',
        steps: [
          'Open DevTools and go to the <strong>Console</strong> tab',
          'Type: <code>document.title = "hacked"</code> and press Enter',
          'Look at the browser tab — the title changed',
          'Type: <code>document.body.style.background = "hotpink"</code>',
        ],
        explain: `The Console is a live JavaScript REPL (Read-Eval-Print Loop). Every line you type runs immediately in the context of the current page. You have full access to the DOM, all loaded JavaScript, and all the browser APIs. This is the most powerful debugging and exploration tool available to a web developer.`,
      },
    ],
    quiz: [
      { q: 'What does document.querySelector(\'.btn\') do?', opts: ['Creates a new button element', 'Returns the first element matching the CSS selector .btn', 'Queries the server for button data', 'Deletes all elements with class "btn"'], correct: 1 },
      { q: 'What is an event listener?', opts: ['A background process that monitors server health', 'A function registered to run when a specific event occurs', 'A CSS rule that triggers on user interaction', 'A network request that polls for updates'], correct: 1 },
      { q: 'What does the fetch() API do?', opts: ['Fetches the entire page and reloads it', 'Makes an HTTP request from JavaScript without reloading the page', 'Retrieves data from localStorage', 'Downloads files to the user\'s computer'], correct: 1 },
    ],
  },
  {
    id: 5,
    eyebrow: 'Module 05',
    title: 'APIs and the Server',
    intro: 'When you load a social media feed, the HTML isn\'t stored in a file. A server runs code that generates it dynamically — checking who you are, querying a database, assembling a response just for you. And when JavaScript needs more data without reloading the page, it talks to an API.',
    objectives: [
      'The difference between static and dynamic servers',
      'What a REST API is and what HTTP verbs mean',
      'Why servers use async calls — and what that means in practice',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Static vs Dynamic Servers',
        body: `A <strong>static server</strong> serves files exactly as they are on disk — HTML, CSS, JS, images. Fast, simple, no code runs. This site is static: GitHub Pages just delivers the files. A <strong>dynamic server</strong> runs code to generate each response. When you open your Twitter feed, a server runs Python or Node.js or Go, queries a database, checks your session, and constructs a unique HTML or JSON response just for you. Every request can produce completely different output.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'REST APIs and HTTP Verbs',
        body: `REST (Representational State Transfer) is a set of conventions for building web APIs. The idea: use HTTP's built-in verbs to express intent clearly.<br><br><code>GET    /orders        → list all orders<br>GET    /orders/42     → get order 42<br>POST   /orders        → create a new order<br>PUT    /orders/42     → update order 42<br>DELETE /orders/42     → delete order 42</code><br><br>No new protocols. Just HTTP used consistently. REST became the default because every developer already understands HTTP, and it maps naturally onto the operations any app needs.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'Why Servers Use Async Calls',
        body: `A server handling a request often needs to do several slow things: query a database, call an external API, read a file. Each takes milliseconds — but with thousands of simultaneous users, blocking and waiting serially would kill performance.<br><br><strong>Async (asynchronous) programming</strong> lets the server say "start this database query, and while you're waiting for it to come back, go handle other requests." When the query finishes, resume where you left off.<br><br>This is why modern backends are written with async in mind (async/await in Node.js and Python, coroutines in Go). A server that handles 10,000 simultaneous users without crashing isn't running 10,000 threads — it's using async to do many things at once on far fewer resources.`,
      },
      {
        type: 'text',
        heading: 'JSON — The Web\'s Data Format',
        body: `When an API returns data, it needs a format both sides understand. JSON (JavaScript Object Notation) won this competition completely. It looks like JavaScript objects, it's human-readable, and every programming language can parse it natively.<br><br><code>{<br>  "name": "Marco",<br>  "role": "developer",<br>  "skills": ["Django", "React", "PostgreSQL"]<br>}</code><br><br>Before JSON, APIs used XML — verbose, deeply nested, tedious to work with in JavaScript. JSON is simpler in every dimension. By 2010 it was the default for virtually all web APIs.`,
      },
      {
        type: 'lab',
        label: 'Try It — DevTools Lab',
        heading: 'Call a Real API from the Console',
        steps: [
          'Open DevTools → Console tab',
          'Paste: <code>fetch(\'https://api.github.com/users/octocat\').then(r=>r.json()).then(console.log)</code>',
          'Press Enter — you\'ll see a Promise, then the JSON result logs below it',
          'Expand the logged object to explore: repos, followers, created_at...',
        ],
        explain: `You just made a real HTTP GET request to GitHub's API, received JSON, parsed it, and logged it — the exact same thing JavaScript in any web app does when fetching data. Notice the Network tab also shows the request: URL, status 200, response headers, full response body. That's the full request-response cycle from Module 1 happening live.`,
      },
    ],
    quiz: [
      { q: 'What is the difference between a static and a dynamic server?', opts: ['Static servers are faster; dynamic servers are slower', 'Static servers serve files as-is; dynamic servers run code to generate each response', 'Static servers only serve images; dynamic servers serve HTML', 'Static servers are free; dynamic servers cost money'], correct: 1 },
      { q: 'Why do backend servers use async programming?', opts: ['To encrypt data before sending it', 'To handle many simultaneous requests without blocking while waiting for slow operations', 'To compress responses for faster delivery', 'To avoid writing callbacks in JavaScript'], correct: 1 },
      { q: 'What HTTP verb should you use to create a new resource?', opts: ['GET', 'PUT', 'POST', 'DELETE'], correct: 2 },
    ],
  },
  {
    id: 6,
    eyebrow: 'Module 06',
    title: 'Databases',
    intro: 'Every app that needs to remember something — who\'s logged in, what was ordered, what was posted — needs a database. Databases are the long-term memory of your application. Understanding the types that exist and when to use each one is one of the most useful things a non-developer can know about how software is built.',
    objectives: [
      'Why files aren\'t enough and what databases solve',
      'The difference between relational (SQL) and NoSQL databases',
      'What database transactions are and why they matter',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Why Files Aren\'t Enough',
        body: `You could store your app's data in plain files — text files, JSON files, CSVs. For a personal project with one user, it works. But it falls apart fast at scale. Multiple users writing simultaneously corrupts data. Searching a million records in a flat file is slow. Representing relationships ("this order belongs to this user who lives at this address") becomes deeply messy. Recovering from partial writes (the app crashed mid-save) is fragile.<br><br>Databases were built to solve exactly these problems. They handle concurrency, search, relationships, and crash recovery correctly — so you don't have to.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'Relational Databases (SQL)',
        body: `The dominant type for 50 years. Data lives in <strong>tables</strong> (like spreadsheets: rows and columns). Tables relate to each other via keys.<br><br><code>users table:  id | name  | email<br>orders table: id | user_id | total | date</code><br><br><code>user_id</code> in orders links back to <code>id</code> in users — that's a relationship. SQL (Structured Query Language) is how you talk to the database:<br><br><code>SELECT * FROM orders WHERE user_id = 42;</code><br><br>Top choices: <strong>PostgreSQL</strong> (most powerful, open source, used in most production apps), <strong>MySQL</strong> (widely used, especially with PHP), <strong>SQLite</strong> (embedded, no server needed — used in mobile apps and local tools).`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'Transactions — Why Data Integrity Matters',
        body: `A <strong>transaction</strong> is a unit of work that either completes entirely or not at all. Classic example: a bank transfer. Step 1: deduct $100 from account A. Step 2: add $100 to account B. If the server crashes between steps 1 and 2, the money vanishes. A transaction wraps both steps — if anything fails, the whole thing rolls back as if it never happened.<br><br>This is called <strong>ACID</strong> compliance (Atomicity, Consistency, Isolation, Durability). Every serious relational database is ACID compliant. It's why banks, e-commerce, and healthcare systems run on SQL databases.`,
      },
      {
        type: 'text',
        heading: 'NoSQL Databases — When Flexibility Wins',
        body: `Relational databases have a fixed schema: you define columns upfront and every row must fit. NoSQL databases trade that rigidity for flexibility.<br><br><strong>Document databases</strong> (MongoDB, Firestore): store JSON-like documents. No fixed schema — each document can have different fields. Great for content, user profiles, product catalogs where data shape varies.<br><br><strong>Key-value stores</strong> (Redis): store data by key, extremely fast reads. Used for caching, session storage, rate limiting, real-time leaderboards. Redis can serve millions of reads per second from memory.<br><br><strong>When to use what:</strong> financial data, orders, user accounts → PostgreSQL. Caching, sessions, real-time counters → Redis. Flexible content, rapid iteration → MongoDB.`,
      },
      {
        type: 'fun-fact',
        label: 'Curious fact',
        body: `PostgreSQL was first released in 1996 and is still the most recommended database for new projects today — nearly 30 years later. The <em>Stack Overflow Developer Survey</em> has ranked it the most-used database by professional developers for several years running, overtaking MySQL. Despite dozens of newer alternatives, the fundamentals it was built on in the 1970s (relational model, ACID transactions, SQL) remain unbeaten for the vast majority of applications.`,
      },
    ],
    quiz: [
      { q: 'What problem do databases solve that plain files cannot?', opts: ['Databases are smaller in size than files', 'Databases handle concurrency, relationships, search, and crash recovery correctly at scale', 'Databases are stored in the cloud automatically', 'Databases encrypt data by default'], correct: 1 },
      { q: 'What is a database transaction?', opts: ['A payment processed by the database', 'A type of SQL query for reading data', 'A unit of work that either completes fully or rolls back entirely — protecting data integrity', 'A connection between two database servers'], correct: 2 },
      { q: 'When would you choose Redis over PostgreSQL?', opts: ['When you need complex relational queries across many tables', 'For caching, sessions, and real-time counters where extreme read speed matters', 'For storing financial transactions that require ACID compliance', 'When your data has a fixed, well-defined schema'], correct: 1 },
    ],
  },
  {
    id: 7,
    eyebrow: 'Module 07',
    title: 'Third-Party Services',
    intro: 'Modern applications almost never build everything from scratch. Sending emails, processing payments, showing maps, authenticating users, sending SMS — these are all solved problems with entire companies dedicated to doing them reliably. Knowing which services exist and why you\'d use them instead of building in-house is essential product knowledge.',
    objectives: [
      'Why the "build vs buy" tradeoff almost always favors buying for commodity problems',
      'The most important service categories: email, payments, auth, maps, and more',
      'What a webhook is and why third-party services use them',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Why Third-Party Services Exist',
        body: `Every application eventually needs to send email, process a payment, or show a map. You could build all of these yourself — but you'd spend months solving problems that have already been solved. The <strong>build vs buy</strong> tradeoff is almost always buy for commodity infrastructure:<br><br>• Email delivery has spam filters, reputation scores, bounce handling, DKIM/SPF authentication — an entire discipline.<br>• Payment processing requires PCI-DSS compliance, fraud detection, chargeback handling, support for 200+ payment methods.<br>• Authentication requires secure password hashing, session management, MFA, OAuth flows, and constant security patches.<br><br>Third-party services let your team focus on what makes your product unique — not on reinventing solved problems.`,
      },
      {
        type: 'concept',
        label: 'Email',
        heading: 'Transactional Email Services',
        body: `Email delivery is surprisingly hard. Gmail and Outlook aggressively filter email from unknown servers. Maintaining a good sending reputation, handling bounces, managing unsubscribes, and passing spam filters is a full-time job.<br><br><strong>SendGrid</strong> (now Twilio) — the most widely used. Simple API, good deliverability, generous free tier.<br><strong>Mailgun</strong> — developer-friendly, strong analytics, popular for high volume.<br><strong>Postmark</strong> — laser-focused on transactional email (receipts, password resets), excellent deliverability.<br><strong>AWS SES</strong> — cheapest at scale, but requires more setup.<br><br><em>Transactional email</em> (order confirmations, password resets) and <em>marketing email</em> (newsletters, campaigns) often use different services — mixing them risks your transactional deliverability.`,
      },
      {
        type: 'concept',
        label: 'Payments',
        heading: 'Payment Processing',
        body: `You almost never build your own payment processing. The reasons: PCI-DSS compliance (a full security audit standard), fraud detection systems, chargeback management, support for credit cards, wallets, bank transfers across 150+ countries.<br><br><strong>Stripe</strong> — the developer-friendly standard. Beautiful API, excellent documentation, handles cards, bank transfers, subscriptions, invoices, marketplaces. Used by Amazon, Shopify, Lyft, and thousands of startups.<br><strong>PayPal / Braintree</strong> — widely recognized by consumers, broader global reach in some markets.<br><strong>Culqi, Mercado Pago</strong> — regional leaders in Latin America.<br><br>Stripe's model: your frontend collects card data directly into Stripe's servers (never touches yours), Stripe charges the card and sends you a webhook confirming success.`,
      },
      {
        type: 'concept',
        label: 'Authentication',
        heading: 'Auth as a Service',
        body: `Rolling your own authentication is one of the most common sources of security vulnerabilities. Password hashing (bcrypt, not MD5), session tokens, OAuth flows for "Sign in with Google," MFA, account recovery — all must be done correctly.<br><br><strong>Auth0</strong> — enterprise-grade, supports every OAuth provider, rich rule engine for custom auth logic.<br><strong>Clerk</strong> — modern, beautiful pre-built UI components, very fast to integrate.<br><strong>Firebase Auth</strong> — Google's offering, tightly integrated with the Firebase ecosystem.<br><strong>Supabase Auth</strong> — open source alternative, self-hostable.<br><br>Most products at the early stage benefit enormously from delegating auth entirely. The time saved — and the security vulnerabilities avoided — are both substantial.`,
      },
      {
        type: 'text',
        heading: 'Maps, SMS, Storage, and More',
        body: `<strong>Maps & Location:</strong> Google Maps Platform (most features, usage-based pricing), Mapbox (more design flexibility, also paid), OpenStreetMap + Leaflet.js (free, open source, good for custom maps).<br><br><strong>SMS & Voice:</strong> Twilio — the dominant player. Phone number provisioning, SMS, WhatsApp, voice calls, all via API.<br><br><strong>File Storage:</strong> AWS S3 — the standard for storing uploaded files, images, documents. Cloudinary adds automatic image resizing and optimization on top of storage.<br><br><strong>Analytics:</strong> Google Analytics (free, widely used), Mixpanel (event-based, better product analytics), PostHog (open source, self-hostable, full control over your data).<br><br><strong>Feature Flags:</strong> LaunchDarkly, Flagsmith — toggle features on/off in production without deploying code. Essential for gradual rollouts and A/B testing.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'Webhooks — How Services Notify Your App',
        body: `When something happens in a third-party service — a payment succeeds, an email bounces, a file finishes processing — your app needs to know. But your app can't constantly poll "did anything happen yet?"<br><br>The solution: <strong>webhooks</strong>. You tell the service "when X happens, send an HTTP POST to this URL on my server." The service calls your endpoint with the event data. Your server processes it.<br><br>Example: user pays via Stripe → Stripe sends POST to <code>yourapp.com/webhooks/stripe</code> with payment details → your server marks the order as paid. You don't poll Stripe — Stripe notifies you. This is the backbone of how the service ecosystem stays in sync.`,
      },
    ],
    quiz: [
      { q: 'Why do most companies use Stripe instead of building their own payment system?', opts: ['Stripe is the only payment processor legally permitted to operate', 'Building payments requires PCI compliance, fraud detection, and years of infrastructure most teams can\'t justify', 'Stripe payments settle faster than direct bank transfers', 'Stripe is free for all transaction volumes'], correct: 1 },
      { q: 'What is a webhook?', opts: ['A browser API for detecting scroll events', 'A type of authentication token', 'An HTTP request sent by a third-party service to notify your app when an event occurs', 'A method for caching API responses'], correct: 2 },
      { q: 'What is the key difference between transactional email and marketing email?', opts: ['Transactional email is free; marketing email is paid', 'Transactional email is triggered by user actions (receipts, resets); marketing email is bulk campaigns — and mixing them risks deliverability', 'Transactional email uses HTML; marketing email uses plain text', 'There is no difference — both use the same sending infrastructure'], correct: 1 },
    ],
  },
  {
    id: 8,
    eyebrow: 'Module 08',
    title: 'Hosting & Domains',
    intro: 'Your code works locally. Getting it onto the internet means deciding where it runs, how people find it, and who manages it. These decisions affect cost, performance, reliability, and deployment speed — and the right answer depends entirely on what you\'re building.',
    objectives: [
      'How domains and DNS records work in practice',
      'The spectrum from static hosting to managed cloud infrastructure',
      'When to use Vercel/Netlify vs when to use AWS/GCP/Azure',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Domains — What They Are and Where to Register',
        body: `A <strong>domain</strong> is a name you rent (not own) from a registrar, renewed annually. Popular registrars: Namecheap, Cloudflare Registrar (at-cost), GoDaddy, Google Domains (now Squarespace).<br><br>Once registered, you configure <strong>DNS records</strong> to point the domain at your hosting:<br><br><strong>A record</strong> — maps your domain to an IP address (<code>mysite.com → 192.0.2.1</code>).<br><strong>CNAME</strong> — maps a subdomain to another domain (<code>www.mysite.com → mysite.com</code>). Used heavily by Vercel and Netlify.<br><strong>MX record</strong> — routes email to your mail provider.<br><strong>TXT record</strong> — proves domain ownership (Google, Stripe, and others use this for verification).<br><br>DNS changes have a <strong>TTL (Time to Live)</strong> — a cache expiry. A TTL of 3600 means it takes up to an hour to propagate globally. Lower it before migrations; raise it when stable.`,
      },
      {
        type: 'concept',
        label: 'Tier 1 — Static Hosting',
        heading: 'Netlify, Vercel, GitHub Pages, Cloudflare Pages',
        body: `For sites with no server-side code — HTML/CSS/JS, docs, marketing pages, portfolios — static hosting is the simplest and cheapest option. You push code to git, they build and deploy it.<br><br><strong>Vercel</strong> — built around Next.js, but works with any framework. Global CDN, automatic HTTPS, preview deployments on every PR, serverless functions at the edge.<br><strong>Netlify</strong> — similar feature set, slightly more ecosystem-agnostic. Excellent for JAMstack sites.<br><strong>GitHub Pages</strong> — free, simple, no build pipeline. Great for docs and static demos (this course runs on it).<br><strong>Cloudflare Pages</strong> — global CDN with Cloudflare's network, very fast, generous free tier.<br><br><strong>When to use:</strong> marketing sites, documentation, portfolios, client demos, anything without a dynamic backend.`,
      },
      {
        type: 'concept',
        label: 'Tier 2 — Platform-as-a-Service',
        heading: 'Render, Railway, Fly.io, Heroku',
        body: `When you have server-side code — a Django API, a Node backend, a background job worker — you need something that can run it. PaaS platforms handle the server configuration for you: you give them your code (via git or Docker), they run it.<br><br><strong>Render</strong> — modern Heroku replacement. Supports Node, Python, Ruby, Go, Docker. Free tier available, managed PostgreSQL included, automatic deploys from git.<br><strong>Railway</strong> — fast setup, great DX, generous pricing, supports databases alongside services.<br><strong>Fly.io</strong> — runs Docker containers at the edge worldwide, more control than Render, slightly more setup.<br><strong>Heroku</strong> — the original PaaS, once dominant, now expensive relative to alternatives.<br><br><strong>When to use:</strong> APIs, dynamic apps, early-stage products, small to medium scale.`,
      },
      {
        type: 'concept',
        label: 'Tier 3 — Cloud Infrastructure',
        heading: 'AWS, GCP, Azure — and When You Actually Need Them',
        body: `The big cloud providers offer raw infrastructure: virtual machines (EC2, Compute Engine), object storage (S3, GCS), managed databases (RDS, Cloud SQL), CDN (CloudFront, Cloud CDN), and hundreds of other services.<br><br><strong>AWS</strong> — the market leader (~33% share). Widest service catalog. S3 for file storage is nearly universal even outside AWS. Complex, but every DevOps engineer knows it.<br><strong>Google Cloud (GCP)</strong> — strong on data/ML (BigQuery, Vertex AI), Kubernetes origins, competitive on pricing.<br><strong>Azure</strong> — dominant in enterprises with existing Microsoft contracts (Office 365, Active Directory integration).<br><br><strong>When you actually need them:</strong> compliance requirements (HIPAA, SOC2, PCI), regulated industries, very high scale, complex multi-service architectures, existing enterprise agreements, advanced ML/data needs.`,
      },
      {
        type: 'text',
        heading: 'CDNs — Why Your Files Come From Nearby',
        body: `A <strong>CDN (Content Delivery Network)</strong> caches your static files (images, CSS, JS, fonts) on servers distributed worldwide — edge nodes. When a user in Lima requests an image, they get it from São Paulo, not a server in Virginia. Latency drops from 200ms to 20ms.<br><br><strong>Cloudflare</strong> — the most widely used CDN, also provides DDoS protection, DNS, and security. Free tier covers most sites.<br><strong>AWS CloudFront</strong> — tightly integrated with S3 and EC2, the standard for AWS-hosted assets.<br><strong>Fastly</strong> — used by GitHub, Twitter, and large platforms where CDN performance is critical.<br><br>All the Tier 1 hosting platforms (Vercel, Netlify, Cloudflare Pages) have a CDN built in — you get global delivery automatically with no extra configuration.`,
      },
      {
        type: 'concept',
        label: 'Decision Framework',
        heading: 'Choosing the Right Hosting',
        body: `<strong>Static site, no backend</strong> → Vercel, Netlify, or GitHub Pages. Free, instant, globally distributed.<br><br><strong>API + database, early stage</strong> → Render or Railway. Simple deployment, managed database included, no DevOps needed.<br><br><strong>Full-stack app, medium scale</strong> → Render or Fly.io. More control, Docker support, scales reasonably.<br><br><strong>High scale, compliance requirements, or complex architecture</strong> → AWS, GCP, or Azure. Accept the complexity in exchange for control and compliance certifications.<br><br><strong>Enterprise with existing Microsoft stack</strong> → Azure, almost always.<br><br>The most common mistake: using AWS for a project that would have been perfectly served by Render. The second most common: outgrowing a PaaS and not migrating to AWS soon enough. The goal is to match infrastructure complexity to actual product needs.`,
      },
    ],
    quiz: [
      { q: 'What is a DNS CNAME record used for?', opts: ['Mapping a domain to an IP address', 'Routing email to a mail server', 'Mapping a subdomain to another domain name', 'Verifying domain ownership for third-party services'], correct: 2 },
      { q: 'When should you choose Vercel or Netlify over AWS?', opts: ['When you need HIPAA compliance', 'For static sites and frontend apps — they\'re simpler, faster to set up, and often free', 'When your app handles over 1 million users', 'When you need a managed relational database'], correct: 1 },
      { q: 'What does a CDN do for your site\'s performance?', opts: ['Reduces the size of your JavaScript files', 'Caches your static files on servers worldwide so users get them from a nearby location', 'Automatically optimizes your SQL queries', 'Compresses HTML responses before sending them'], correct: 1 },
    ],
  },
  {
    id: 9,
    eyebrow: 'Module 09',
    title: 'Security — What PMs Must Know',
    intro: 'Security is not just a developer concern — it\'s a product concern. PMs make decisions that directly affect the attack surface of their product: what data gets collected, how authentication works, what third parties get access. Understanding the most common threats and how they work makes you a more effective partner to your engineering team — and protects your users.',
    objectives: [
      'What HTTPS/TLS actually protects (and what it doesn\'t)',
      'The most common web attacks: XSS, CSRF, SQL injection — how they work and what prevents them',
      'The difference between authentication and authorization',
    ],
    sections: [
      {
        type: 'text',
        heading: 'HTTPS — The Lock Icon Explained',
        body: `The padlock in your browser\'s address bar means the connection is encrypted using <strong>TLS (Transport Layer Security)</strong>. Specifically, it means two things:<br><br><strong>1. Encryption:</strong> data flowing between your browser and the server is encrypted. An attacker intercepting the network traffic sees gibberish, not your password or credit card number.<br><br><strong>2. Authentication:</strong> a trusted Certificate Authority (CA) has verified that the domain you\'re connecting to is actually controlled by the entity it claims to be. You\'re not talking to an impersonator.<br><br><strong>What HTTPS does NOT protect:</strong> it doesn\'t protect against vulnerabilities in the application itself — an attacker who compromises the server still has your data. Encryption is transport-layer security, not application-layer security. A site can have a green padlock and still be full of bugs.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'Authentication vs Authorization',
        body: `These two terms get conflated constantly, but they\'re distinct:<br><br><strong>Authentication</strong> — who are you? This is the login step. Proving identity via password, OAuth (Sign in with Google), magic link, or biometric.<br><br><strong>Authorization</strong> — what are you allowed to do? After logging in, are you a free user, a paid user, or an admin? Can you edit this document or only view it? Authorization is about permissions and roles.<br><br>A classic PM mistake: building a feature and forgetting authorization. "Any logged-in user can edit any profile" is an auth bug — authentication was correct (you knew who they were), but authorization was broken (they had permissions they shouldn\'t). These are separate systems and must be designed separately.`,
      },
      {
        type: 'concept',
        label: 'Attack: XSS',
        heading: 'Cross-Site Scripting (XSS)',
        body: `XSS happens when an attacker injects malicious JavaScript into a page that other users then load. The browser has no way to distinguish between the page\'s legitimate JavaScript and the injected code — both run with the same permissions.<br><br><strong>Example:</strong> a comment box that doesn\'t sanitize input. User submits: <code>&lt;script&gt;document.cookie&lt;/script&gt;</code>. That comment gets stored in the database and rendered for every user who views the page. The attacker\'s script now runs in every viewer\'s browser — stealing session cookies, redirecting to phishing pages, or logging keystrokes.<br><br><strong>Prevention:</strong> escape user-generated content before rendering it. Modern frameworks (React, Vue) do this automatically — they treat user content as text, not HTML, by default. This is one reason frameworks exist. Raw HTML string concatenation is dangerous.`,
      },
      {
        type: 'concept',
        label: 'Attack: SQL Injection',
        heading: 'SQL Injection',
        body: `When user input is inserted directly into a database query without sanitization, an attacker can inject SQL commands that change what the query does.<br><br><strong>Classic example:</strong><br><code>SELECT * FROM users WHERE email = \\'$input\\';</code><br><br>If the input is <code>admin\\'--</code>, the query becomes:<br><code>SELECT * FROM users WHERE email = \\'admin\\'--\\';</code><br><br>The <code>--</code> comments out the rest. The attacker logs in as admin with no password.<br><br><strong>Prevention:</strong> parameterized queries / prepared statements. The database treats user input as data, never as SQL commands. Every modern ORM (SQLAlchemy, Django ORM, Prisma) does this by default. Writing raw SQL with string interpolation is the red flag to watch for in a code review.`,
      },
      {
        type: 'concept',
        label: 'Attack: CSRF',
        heading: 'Cross-Site Request Forgery (CSRF)',
        body: `CSRF tricks an authenticated user\'s browser into making a request they didn\'t intend. Because the browser automatically sends cookies with requests, a malicious page can make authenticated requests to another site the user is logged into.<br><br><strong>Example:</strong> you\'re logged into your bank. You visit a malicious site that has a hidden form that submits a transfer request to your bank\'s endpoint. The bank receives the request with your valid session cookie and processes it.<br><br><strong>Prevention:</strong> CSRF tokens — a unique, unpredictable value embedded in every form that the server validates before processing. Also: <code>SameSite</code> cookie attribute, which prevents cookies from being sent in cross-site requests by default in modern browsers.<br><br>This is why most form-based frameworks include CSRF protection by default.`,
      },
      {
        type: 'fun-fact',
        label: 'Curious fact',
        body: `The most infamous SQL injection attack in history was on Sony Pictures in 2011. Hackers stole 77 million PlayStation Network accounts — names, addresses, credit card data — by injecting SQL into a login form. Sony\'s response time was criticized as severely slow. The attack was relatively unsophisticated: an automated SQL injection scanner found the vulnerability. It wasn\'t a targeted zero-day; it was basic hygiene that wasn\'t applied.`,
      },
      {
        type: 'lab',
        label: 'Try It — DevTools Lab',
        heading: 'Inspect the HTTPS Certificate',
        steps: [
          'Click the padlock icon in your browser\'s address bar on any HTTPS site',
          'Click "Connection is secure" → "Certificate is valid"',
          'See: who issued the certificate, what domain it\'s valid for, when it expires',
          'In DevTools → Security tab: see certificate details, TLS version, and cipher suite used',
        ],
        explain: `Every HTTPS site has a certificate signed by a Certificate Authority. The browser checks: is this CA trusted? Is the certificate for the right domain? Is it expired? If any check fails, you get the "Not secure" warning. The Security tab also shows if any resources on the page were loaded over HTTP (mixed content) — a common bug that undermines the page\'s security.`,
      },
    ],
    quiz: [
      { q: 'What does HTTPS/TLS actually protect?', opts: ['The application code from having bugs', 'Data in the database from being accessed', 'Data in transit between browser and server from being intercepted or tampered with', 'The server from being hacked'], correct: 2 },
      { q: 'A user can view any document on your platform but somehow can also edit other users\' documents. This is a failure of:', opts: ['Authentication — the user\'s identity wasn\'t verified properly', 'Authorization — the user was correctly identified but has permissions they shouldn\'t', 'Encryption — the data wasn\'t encrypted', 'DNS — the request went to the wrong server'], correct: 1 },
      { q: 'What is the primary defense against SQL injection?', opts: ['Encrypting the database at rest', 'Using HTTPS for all database connections', 'Parameterized queries that treat user input as data, never as SQL', 'Requiring passwords of at least 8 characters'], correct: 2 },
    ],
  },
  {
    id: 10,
    eyebrow: 'Module 10',
    title: 'Performance & Monitoring',
    intro: 'A feature that works but loads in 8 seconds is broken from a user\'s perspective. Performance is a product decision, not a purely technical one — and it\'s measurable. Google has standardized how to measure it, browser DevTools can benchmark it in seconds, and monitoring tools alert you when things degrade in production. This module gives you the vocabulary and tools to make performance a first-class product concern.',
    objectives: [
      'What Core Web Vitals are and why Google uses them for search ranking',
      'How to read a Lighthouse report and what each metric means',
      'What error monitoring and observability mean — and why you need both',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Why Performance Is a Product Problem',
        body: `Every 100ms of additional load time costs real money. Amazon measured that every 100ms of latency costs 1% of sales. Google found that a 0.5-second slowdown in search caused a 20% drop in traffic. Akamai found that a 2-second delay in load time increases bounce rates by 87%.<br><br>For mobile users on slower networks, performance differences between a fast and slow app are enormous. In many markets — Latin America, Southeast Asia, India — the median user is on a 4G connection that performs significantly worse than a North American average. Building for the global median, not the Silicon Valley engineer with fiber and a MacBook Pro, is a product decision that requires intentional effort.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'Core Web Vitals — Google\'s Performance Standard',
        body: `Google defines three Core Web Vitals that measure real user experience, not just technical benchmarks:<br><br><strong>LCP (Largest Contentful Paint)</strong> — how long until the main content of the page is visible. Measures perceived load speed. Target: under 2.5 seconds.<br><br><strong>INP (Interaction to Next Paint)</strong> — how responsive the page is to user input. Replaced FID in 2024. Measures interaction delay. Target: under 200ms.<br><br><strong>CLS (Cumulative Layout Shift)</strong> — how much the page jumps around as it loads. A layout shift of 0.1 means something moved 10% of the viewport. Target: under 0.1.<br><br>These metrics affect Google search ranking directly — poor Core Web Vitals mean lower organic search rankings. This makes performance a business metric, not just a technical one.`,
      },
      {
        type: 'lab',
        label: 'Try It — DevTools Lab',
        heading: 'Run a Lighthouse Audit',
        steps: [
          'Open DevTools and click the <strong>Lighthouse</strong> tab (or "Performance insights")',
          'Select "Mobile" mode, check "Performance" category, click "Analyze page load"',
          'Wait 30-60 seconds while Lighthouse simulates a mobile load',
          'Read the score (0-100) and expand each failing diagnostic for specifics',
        ],
        explain: `Lighthouse is Google\'s automated tool for measuring Core Web Vitals and other performance, accessibility, and SEO metrics. The score is a weighted average. The "Opportunities" section shows specific fixes with estimated time savings. The "Diagnostics" section shows issues that don\'t directly affect the score but are worth addressing. When a dev tells you "Lighthouse score is 38," this is what they mean.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'The Network Tab — Where Performance Lives',
        body: `The Network tab in DevTools is where you see every resource the page loads. For performance analysis, the key metrics:<br><br><strong>Waterfall</strong> — a visual timeline of when each resource starts and finishes loading. Long bars are slow resources. Bars that start late (because they were discovered late in the HTML) are candidates for preloading.<br><br><strong>DOMContentLoaded (blue line)</strong> — when the HTML is fully parsed. Everything before this blocks the initial render.<br><br><strong>Load (red line)</strong> — when all resources have loaded including images. This is when the browser fires the <code>load</code> event.<br><br><strong>Size vs Transfer</strong> — "Size" is the actual file size. "Transfer" is compressed size over the wire. If a 500KB JS file transfers as 150KB, it\'s using gzip compression.`,
      },
      {
        type: 'text',
        heading: 'Error Monitoring — Knowing When Things Break in Production',
        body: `No matter how well tested your code is, errors happen in production. Users run unusual browsers, have network timeouts, hit edge cases you didn\'t anticipate. Without error monitoring, you find out about bugs from customer support tickets — which means the bug has been silently failing for hours or days.<br><br><strong>Sentry</strong> is the most widely used error monitoring tool. It captures JavaScript exceptions, backend errors, and crashes, including the full stack trace, the browser/device that caused the error, the URL, and the number of users affected. You get an alert the moment something breaks.<br><br>The PM\'s job with error monitoring: set up alerting thresholds and make sure errors are triaged into the backlog with the right priority. A bug hitting 1000 users/hour is a different conversation than a bug hitting 3 power users.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'Observability — Logs, Metrics, Traces',
        body: `Observability is the ability to understand what your system is doing from its outputs. Three pillars:<br><br><strong>Logs</strong> — timestamped records of events. "User 4821 checked out at 14:32:01." "Payment webhook failed with 500." Logs answer "what happened?"<br><br><strong>Metrics</strong> — numerical measurements over time. "API response time: 340ms average, 1200ms 99th percentile." "Error rate: 0.3%." Metrics answer "how is it performing right now?"<br><br><strong>Traces</strong> — the path a single request took through the system. In a microservices architecture, one user action might touch 12 services. A trace shows how long each step took and where it failed. Traces answer "why is this request slow?"<br><br><strong>Tools:</strong> Datadog, Grafana, New Relic for full-stack observability. Vercel Analytics and Netlify Analytics for frontend metrics without instrumentation.`,
      },
      {
        type: 'fun-fact',
        label: 'Curious fact',
        body: `The term "five nines" (99.999% uptime) means your system is allowed to be down for just 5.26 minutes per year. One nine (90%) allows 36.5 days of downtime. This is why SLA tiers matter: the infrastructure and engineering investment to go from 99% to 99.99% uptime is enormous. Most consumer products aim for 99.9% (about 8.7 hours/year of downtime). The products that need five nines — air traffic control, hospital systems, payment rails — are the ones where downtime directly costs lives or large sums of money.`,
      },
    ],
    quiz: [
      { q: 'What does LCP (Largest Contentful Paint) measure?', opts: ['How long until all JavaScript has executed', 'How long until the main content of the page is visually complete', 'How long until the first byte arrives from the server', 'How many layout shifts occur as the page loads'], correct: 1 },
      { q: 'Why do Core Web Vitals matter beyond just user experience?', opts: ['They are required by GDPR regulations', 'They directly affect Google search rankings', 'They determine whether a site can use HTTPS', 'They control how much a CDN caches your content'], correct: 1 },
      { q: 'What is the difference between error monitoring (Sentry) and observability (Datadog)?', opts: ['They are the same thing with different names', 'Error monitoring captures specific crashes and exceptions; observability measures system-wide performance patterns through logs, metrics, and traces', 'Observability is for frontend; error monitoring is for backend', 'Error monitoring is free; observability always costs money'], correct: 1 },
    ],
  },
];

// ---- COURSE DATA (SPANISH) ----
const COURSE_MODULES_ES = [
  {
    id: 1,
    eyebrow: 'Módulo 01',
    title: 'Cómo Carga una Página',
    intro: 'Cada vez que escribes una URL y presionas Enter, se desencadena una secuencia precisa — búsquedas DNS, conexiones TCP, conversaciones HTTP, análisis y renderizado. Todo ocurre en menos de un segundo. Entender esta secuencia es la base para comprender todo lo demás sobre la web.',
    objectives: [
      'Qué es DNS y por qué escribes nombres en lugar de números',
      'Cómo se ve una petición y respuesta HTTP',
      'Por qué una sola carga de página genera muchas peticiones separadas',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Paso 1 — Analizar la URL',
        body: `La URL que escribes son en realidad tres cosas en una. Toma <code>https://example.com/about</code>. El <strong>esquema</strong> (<code>https://</code>) le dice al navegador qué protocolo usar. El <strong>host</strong> (<code>example.com</code>) es donde vive el servidor. La <strong>ruta</strong> (<code>/about</code>) es el recurso específico que estás solicitando. El navegador los separa antes de hacer cualquier otra cosa.`,
      },
      {
        type: 'text',
        heading: 'Paso 2 — DNS: Convertir Nombres en Números',
        body: `Las computadoras no usan <code>example.com</code>. Usan direcciones IP — números como <code>93.184.216.34</code>. El DNS (Sistema de Nombres de Dominio) es la guía telefónica distribuida que traduce uno en el otro. Tu navegador primero revisa su caché local, luego la caché del SO, y luego consulta a un resolvedor DNS (generalmente tu proveedor de internet o el <code>8.8.8.8</code> de Google). La búsqueda completa suele tomar milisegundos de un solo dígito.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: '¿Qué es una Dirección IP?',
        body: `Cada dispositivo en internet tiene una dirección IP — un número único que identifica su ubicación en la red. Las direcciones IPv4 se ven así: <code>93.184.216.34</code> (cuatro números entre 0 y 255). Hay ~4.300 millones de direcciones IPv4 posibles. Ya las agotamos, por eso existe IPv6 (direcciones de 128 bits, con combinaciones vastamente mayores). Tu laptop tiene una. El servidor al que te conectas tiene una. Incluso tu router tiene dos — una hacia tu red doméstica y otra hacia internet.`,
      },
      {
        type: 'text',
        heading: 'Paso 3 — La Conversación HTTP',
        body: `Con la dirección IP, el navegador abre una conexión TCP (un protocolo de enlace de tres vías que confirma que ambos lados están listos). Luego envía una petición HTTP — un mensaje de texto estructurado:<br><br><code>GET /about HTTP/1.1<br>Host: example.com<br>User-Agent: Mozilla/5.0...</code><br><br>El servidor lo lee, encuentra el recurso y responde:<br><br><code>HTTP/1.1 200 OK<br>Content-Type: text/html<br><br>&lt;!DOCTYPE html&gt;...</code><br><br>Eso es toda la web. Una conversación de texto estructurada, miles de millones de veces por día.`,
      },
      {
        type: 'text',
        heading: 'Paso 4 — Renderizado',
        body: `El navegador analiza el HTML de arriba a abajo. Cada <code>&lt;link&gt;</code>, <code>&lt;script&gt;</code> e <code>&lt;img&gt;</code> genera una nueva petición HTTP. Una sola carga de página puede implicar 50 a 100+ peticiones separadas — HTML, CSS, JavaScript, fuentes, imágenes, analíticas. El navegador las prioriza, carga primero las críticas y renderiza progresivamente a medida que llegan los datos.`,
      },
      {
        type: 'lab',
        label: 'Pruébalo — Lab DevTools',
        heading: 'Observa una Carga de Página en Tiempo Real',
        steps: [
          'Abre DevTools: <code>F12</code> en Windows, <code>Cmd ⌥ I</code> en Mac',
          'Haz clic en la pestaña <strong>Network</strong>',
          'Recarga esta página (<code>Cmd+R</code> o <code>Ctrl+R</code>)',
          'Observa cómo aparece cada petición — primero el HTML, luego CSS, JS, fuentes, imágenes...',
        ],
        explain: `La primera fila es el documento HTML. Todo lo demás fue descubierto mientras el navegador analizaba ese HTML. El gráfico de cascada muestra el tiempo de cada petición. Haz clic en cualquier fila para ver las cabeceras completas de petición y respuesta.`,
      },
    ],
    quiz: [
      { q: '¿Qué hace el DNS?', opts: ['Cifra datos entre cliente y servidor', 'Traduce nombres de host como example.com a direcciones IP', 'Gestiona las cookies HTTP y las sesiones', 'Comprime el HTML antes de enviarlo'], correct: 1 },
      { q: '¿Qué significa un código de estado 200 en una respuesta HTTP?', opts: ['La respuesta tiene 200 bytes', 'La petición fue exitosa', 'El servidor está ubicado en la dirección 200', 'La página requiere autenticación'], correct: 1 },
      { q: '¿Cuántas peticiones HTTP requiere normalmente cargar una página web?', opts: ['Exactamente una — el documento HTML', 'Dos — HTML y CSS', 'Decenas — el HTML más todos los recursos vinculados', 'Cientos — una por cada carácter en pantalla'], correct: 2 },
    ],
  },
  {
    id: 2,
    eyebrow: 'Módulo 02',
    title: 'HTML — Estructura',
    intro: 'HTML no es un lenguaje de programación. No tiene bucles, ni condiciones, ni funciones. Es un lenguaje de marcado — su trabajo es describir qué es el contenido: esto es un encabezado, esto es un párrafo, esto es un enlace. El navegador lee esa descripción y decide cómo presentarla.',
    objectives: [
      'La diferencia entre HTML y un lenguaje de programación',
      'Qué es el DOM y por qué importa',
      'Qué significa HTML semántico y por qué es importante',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Etiquetas, Elementos, Atributos',
        body: `HTML está construido con <strong>etiquetas</strong> — etiquetas con corchetes angulares que envuelven contenido y le dan significado. La mayoría vienen en pares: una etiqueta de apertura y una de cierre.<br><br><code>&lt;h1&gt;Esto es un encabezado&lt;/h1&gt;<br>&lt;p&gt;Esto es un párrafo.&lt;/p&gt;<br>&lt;a href="https://example.com"&gt;Esto es un enlace&lt;/a&gt;</code><br><br>La etiqueta le dice al navegador qué <em>es</em> el contenido. El navegador decide cómo mostrarlo. Esa separación — contenido vs. presentación — es intencional y fundamental.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'El DOM — Modelo de Objeto del Documento',
        body: `Cuando el navegador analiza el HTML, no conserva el texto. Construye un <strong>árbol</strong> de objetos en memoria llamado el DOM. Cada elemento se convierte en un nodo. El <code>&lt;html&gt;</code> es la raíz. <code>&lt;head&gt;</code> y <code>&lt;body&gt;</code> son sus hijos. Cada etiqueta interior se convierte en hijo de su etiqueta padre.<br><br>Esto importa porque CSS y JavaScript no interactúan con el texto HTML — interactúan con el árbol DOM. Cuando JavaScript cambia algo en pantalla, está modificando el DOM, no reescribiendo HTML.`,
      },
      {
        type: 'text',
        heading: 'HTML Semántico',
        body: `HTML tiene muchas etiquetas. Podrías técnicamente poner todo tu contenido en etiquetas <code>&lt;div&gt;</code>. Pero el lenguaje ofrece etiquetas específicas para significados específicos: <code>&lt;article&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;main&gt;</code>.<br><br>Usar la etiqueta correcta importa por tres razones: <strong>accesibilidad</strong> (los lectores de pantalla usan etiquetas semánticas para navegar), <strong>SEO</strong> (los motores de búsqueda dan más peso al contenido semántico) y <strong>mantenibilidad</strong> (el código que dice lo que significa es más fácil de entender).`,
      },
      {
        type: 'fun-fact',
        label: 'Dato curioso',
        body: `La primera versión de HTML, escrita por Tim Berners-Lee en 1991, tenía 18 etiquetas. El HTML5 moderno tiene más de 110. La etiqueta más importante jamás añadida fue <code>&lt;a&gt;</code> — el hipervínculo. Sin ella, HTML sería solo un lenguaje de formato. Con ella, se convirtió en una web.`,
      },
      {
        type: 'lab',
        label: 'Pruébalo — Lab DevTools',
        heading: 'Inspecciona el DOM en Vivo',
        steps: [
          'Haz clic derecho en cualquier parte de esta página y elige <strong>Inspeccionar</strong>',
          'El panel Elements muestra el árbol DOM en vivo',
          'Pasa el cursor sobre cualquier elemento en el panel — el navegador lo resalta en pantalla',
          'Haz doble clic en cualquier texto dentro de una etiqueta para editarlo en vivo',
        ],
        explain: `Lo que estás viendo no es el archivo HTML original. Es el DOM en vivo. Cualquier cambio que JavaScript haya hecho desde que se cargó la página se refleja aquí. El HTML original está en Ver código fuente (<code>Cmd+U</code> / <code>Ctrl+U</code>) — compara los dos.`,
      },
    ],
    quiz: [
      { q: '¿Qué es el DOM?', opts: ['El archivo HTML almacenado en el servidor', 'Un árbol de objetos que el navegador construye al analizar el HTML', 'Un patrón de diseño para organizar JavaScript', 'Un preprocesador CSS integrado en los navegadores modernos'], correct: 1 },
      { q: '¿Por qué importa el HTML semántico?', opts: ['Carga más rápido que el HTML no semántico', 'Es requerido por los navegadores modernos', 'Mejora la accesibilidad, el SEO y la mantenibilidad', 'Permite que CSS funcione correctamente'], correct: 2 },
      { q: '¿Cuál fue la etiqueta más importante que Tim Berners-Lee añadió al HTML?', opts: ['&lt;img&gt; — las imágenes hicieron la web visual', '&lt;div&gt; — sin ella el diseño es imposible', '&lt;a&gt; — el hipervínculo que hizo de la web una red', '&lt;html&gt; — el elemento raíz que necesita cada página'], correct: 2 },
    ],
  },
  {
    id: 3,
    eyebrow: 'Módulo 03',
    title: 'CSS — Estilo',
    intro: 'HTML le da estructura al contenido. CSS le da estilo. Fueron separados intencionalmente — el contenido y la presentación son preocupaciones diferentes, y mantenerlos separados hace que ambos sean más fáciles de cambiar de forma independiente.',
    objectives: [
      'Cómo los selectores CSS apuntan a elementos en el DOM',
      'Qué significa "cascada" y cómo la especificidad resuelve conflictos',
      'Qué es el modelo de caja y por qué importa para el diseño',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Selectores — Apuntar a Elementos',
        body: `CSS funciona con dos partes: un <strong>selector</strong> que apunta a elementos y un <strong>bloque de declaración</strong> que define los estilos. El navegador encuentra cada elemento que coincide con el selector y aplica los estilos.<br><br><code>h1 { color: #333; }<br>.card { border-radius: 8px; }<br>#nav { position: fixed; }</code><br><br>Puedes apuntar por tipo de elemento (<code>h1</code>), por clase (<code>.card</code>), por ID (<code>#nav</code>), por atributo, por relación, por estado (<code>:hover</code>, <code>:focus</code>). El sistema de selectores es donde CSS obtiene su poder — y su complejidad.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'La Cascada y la Especificidad',
        body: `Múltiples reglas CSS pueden coincidir con el mismo elemento. Cuando entran en conflicto, el navegador usa la <strong>especificidad</strong> para decidir cuál gana. La jerarquía aproximada:<br><br><code>estilos en línea &gt; #id &gt; .clase &gt; elemento</code><br><br>Una regla que apunta a <code>#nav</code> supera a una que apunta a <code>.nav</code>. Ambas superan a una regla que apunta a <code>nav</code>. El "cascada" en CSS se refiere a esta resolución por capas — las reglas fluyen hacia abajo y gana la más específica. Cuando la especificidad es igual, gana la regla que aparece más tarde en el archivo.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'El Modelo de Caja',
        body: `Cada elemento HTML es una caja rectangular. Esa caja tiene cuatro capas, de adentro hacia afuera:<br><br><strong>Contenido</strong> — el texto o imagen real.<br><strong>Padding</strong> — espacio entre el contenido y el borde (dentro del elemento).<br><strong>Borde</strong> — una línea alrededor del padding (puede ser invisible).<br><strong>Margen</strong> — espacio fuera del borde (entre este elemento y otros).<br><br>Entender el modelo de caja es obligatorio para hacer diseño. Cuando un elemento es "más grande de lo esperado" casi siempre es por el padding o el borde que olvidaste.`,
      },
      {
        type: 'text',
        heading: 'Diseño Responsivo — Un CSS, Todas las Pantallas',
        body: `Las <strong>media queries</strong> permiten aplicar diferentes reglas CSS según el tamaño de pantalla. El principio: diseñar para la pantalla más pequeña primero y luego agregar complejidad para pantallas más grandes.<br><br><code>@media (max-width: 768px) {<br>  .grid { flex-direction: column; }<br>}</code><br><br>Ethan Marcotte acuñó "Diseño Web Responsivo" en 2010. En dos años se convirtió en el enfoque estándar. Antes, la mayoría de los sitios tenían una versión móvil separada en <code>m.example.com</code> que siempre estaba desactualizada.`,
      },
      {
        type: 'lab',
        label: 'Pruébalo — Lab DevTools',
        heading: 'Edita Estilos en Vivo',
        steps: [
          'Haz clic derecho en cualquier elemento de esta página y elige <strong>Inspeccionar</strong>',
          'En el panel Styles a la derecha, encuentra cualquier propiedad CSS',
          'Haz clic en el valor y cámbialo — la página se actualiza inmediatamente',
          'Intenta agregar una nueva propiedad: haz clic después de la última regla en un bloque y escribe lo que quieras',
        ],
        explain: `Estos cambios solo están en la memoria de tu navegador — desaparecen al recargar. Pero este ciclo de edición en vivo (cambiar CSS → ver resultado al instante) es como trabajan todos los desarrolladores frontend. Sin recargar. La pestaña Computed muestra el valor final resuelto de cada propiedad en el elemento seleccionado.`,
      },
    ],
    quiz: [
      { q: 'Cuando dos reglas CSS entran en conflicto en el mismo elemento, ¿qué determina cuál gana?', opts: ['La regla que aparece antes en el archivo', 'La regla con mayor especificidad', 'La regla con más propiedades', 'La regla adjunta directamente al elemento HTML'], correct: 1 },
      { q: 'En el modelo de caja CSS, ¿qué es el "padding"?', opts: ['Espacio fuera del borde del elemento', 'Espacio entre el contenido y el borde del elemento', 'El ancho del borde en sí', 'El tamaño mínimo del área de contenido'], correct: 1 },
      { q: '¿Para qué se usa una media query en CSS?', opts: ['Consultar la base de datos para obtener contenido', 'Aplicar diferentes estilos según el tamaño de pantalla', 'Cargar archivos CSS de forma asíncrona', 'Cachear reglas CSS en el navegador'], correct: 1 },
    ],
  },
  {
    id: 4,
    eyebrow: 'Módulo 04',
    title: 'JavaScript — Comportamiento',
    intro: 'HTML describe la estructura. CSS define el estilo. JavaScript hace que las páginas reaccionen. Es el único lenguaje de programación que se ejecuta de forma nativa en el navegador — y puede leer y modificar cualquier cosa del DOM, responder a eventos del usuario, hacer peticiones de red y ejecutar código en un temporizador.',
    objectives: [
      'Cómo JavaScript interactúa con el DOM',
      'Qué significa la programación basada en eventos',
      'Cómo usar la consola del navegador como un entorno JS en vivo',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Manipular el DOM',
        body: `JavaScript puede encontrar cualquier elemento, leer su contenido, cambiarlo, moverlo, agregar nuevos o eliminarlos. Los dos métodos más usados:<br><br><code>// Encontrar un elemento<br>const el = document.querySelector('.mi-clase');<br><br>// Cambiar su contenido<br>el.textContent = 'Hola';<br><br>// Cambiar su estilo<br>el.style.color = 'red';<br><br>// Agregar una clase CSS<br>el.classList.add('activo');</code><br><br>Cada cosa interactiva que hayas hecho en una página web — un menú desplegable abriéndose, un modal apareciendo, un contador incrementando — fue JavaScript haciendo esto.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'Programación Basada en Eventos',
        body: `JavaScript no se ejecuta de arriba a abajo y se detiene. Se ejecuta, configura <strong>escuchadores de eventos</strong> y luego espera. Cuando algo sucede — un clic, una tecla presionada, un temporizador que dispara, una petición de red que se completa — se ejecuta el escuchador correspondiente.<br><br><code>document.querySelector('#btn').addEventListener('click', () => {<br>  alert('¡Botón clickeado!');<br>});</code><br><br>Este modelo es por qué JavaScript se siente "vivo". El código es reactivo — responde a las cosas a medida que ocurren. El bucle de eventos del navegador es el motor que ejecuta todo esto.`,
      },
      {
        type: 'text',
        heading: 'Fetch — Hacer Peticiones desde JS',
        body: `JavaScript puede hacer peticiones HTTP sin que el usuario navegue a ningún lado. La API <code>fetch()</code> es la forma moderna:<br><br><code>fetch('/api/datos')<br>  .then(res => res.json())<br>  .then(datos => {<br>    console.log(datos);<br>  });</code><br><br>Así funciona toda aplicación web moderna. La página carga una vez. Luego JavaScript obtiene datos en segundo plano y actualiza el DOM. Sin recarga completa. Esto es Ajax — la técnica que hizo posible Gmail y Google Maps.`,
      },
      {
        type: 'fun-fact',
        label: 'Dato curioso',
        body: `JavaScript fue creado por Brendan Eich en Netscape en 10 días en 1995. La primera versión fue escrita para enviarse con Netscape Navigator 2.0 — el plazo era real. Las peculiaridades del lenguaje (coerción de tipos, comportamiento de <code>this</code>, <code>null == undefined</code>) se explican en parte por esta historia. Sin embargo, se convirtió en el lenguaje de programación más desplegado de la historia. A veces la velocidad supera a la pureza.`,
      },
      {
        type: 'lab',
        label: 'Pruébalo — Lab DevTools',
        heading: 'Ejecuta JavaScript en la Consola',
        steps: [
          'Abre DevTools y ve a la pestaña <strong>Console</strong>',
          'Escribe: <code>document.title = "hackeado"</code> y presiona Enter',
          'Mira la pestaña del navegador — el título cambió',
          'Escribe: <code>document.body.style.background = "hotpink"</code>',
        ],
        explain: `La Consola es un REPL (Read-Eval-Print Loop) de JavaScript en vivo. Cada línea que escribes se ejecuta inmediatamente en el contexto de la página actual. Tienes acceso completo al DOM, todo el JavaScript cargado y todas las APIs del navegador. Esta es la herramienta de depuración y exploración más poderosa disponible para un desarrollador web.`,
      },
    ],
    quiz: [
      { q: '¿Qué hace document.querySelector(\'.btn\')?', opts: ['Crea un nuevo elemento botón', 'Devuelve el primer elemento que coincide con el selector CSS .btn', 'Consulta al servidor datos de botones', 'Elimina todos los elementos con clase "btn"'], correct: 1 },
      { q: '¿Qué es un escuchador de eventos?', opts: ['Un proceso en segundo plano que monitorea la salud del servidor', 'Una función registrada para ejecutarse cuando ocurre un evento específico', 'Una regla CSS que se activa con la interacción del usuario', 'Una petición de red que sondea actualizaciones'], correct: 1 },
      { q: '¿Qué hace la API fetch()?', opts: ['Obtiene la página completa y la recarga', 'Hace una petición HTTP desde JavaScript sin recargar la página', 'Recupera datos de localStorage', 'Descarga archivos a la computadora del usuario'], correct: 1 },
    ],
  },
  {
    id: 5,
    eyebrow: 'Módulo 05',
    title: 'APIs y el Servidor',
    intro: 'Cuando cargas un feed de redes sociales, el HTML no está almacenado en un archivo. Un servidor ejecuta código que lo genera dinámicamente — verificando quién eres, consultando una base de datos, ensamblando una respuesta solo para ti. Y cuando JavaScript necesita más datos sin recargar la página, habla con una API.',
    objectives: [
      'La diferencia entre servidores estáticos y dinámicos',
      'Qué es una API REST y qué significan los verbos HTTP',
      'Por qué los servidores usan llamadas asíncronas — y qué significa eso en la práctica',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Servidores Estáticos vs Dinámicos',
        body: `Un <strong>servidor estático</strong> sirve archivos exactamente como están en disco — HTML, CSS, JS, imágenes. Rápido, simple, no se ejecuta código. Este sitio es estático: GitHub Pages simplemente entrega los archivos. Un <strong>servidor dinámico</strong> ejecuta código para generar cada respuesta. Cuando abres tu feed de Twitter, un servidor ejecuta Python, Node.js o Go, consulta una base de datos, verifica tu sesión y construye una respuesta HTML o JSON única solo para ti. Cada petición puede producir una salida completamente diferente.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'APIs REST y Verbos HTTP',
        body: `REST (Transferencia de Estado Representacional) es un conjunto de convenciones para construir APIs web. La idea: usar los verbos incorporados de HTTP para expresar la intención con claridad.<br><br><code>GET    /pedidos        → listar todos los pedidos<br>GET    /pedidos/42     → obtener pedido 42<br>POST   /pedidos        → crear un nuevo pedido<br>PUT    /pedidos/42     → actualizar pedido 42<br>DELETE /pedidos/42     → eliminar pedido 42</code><br><br>Sin nuevos protocolos. Solo HTTP usado de forma consistente. REST se convirtió en el estándar porque todos los desarrolladores ya entienden HTTP y se mapea naturalmente a las operaciones que cualquier aplicación necesita.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'Por Qué los Servidores Usan Llamadas Asíncronas',
        body: `Un servidor que maneja una petición a menudo necesita hacer varias cosas lentas: consultar una base de datos, llamar a una API externa, leer un archivo. Cada una toma milisegundos — pero con miles de usuarios simultáneos, bloquear y esperar en serie arruinaría el rendimiento.<br><br>La <strong>programación asíncrona</strong> permite al servidor decir "inicia esta consulta de base de datos y mientras esperas que regrese, ve a manejar otras peticiones". Cuando la consulta termina, retoma desde donde lo dejaste.<br><br>Por eso los backends modernos se escriben con lo asíncrono en mente (async/await en Node.js y Python, corrutinas en Go). Un servidor que maneja 10.000 usuarios simultáneos sin colapsar no ejecuta 10.000 hilos — usa async para hacer muchas cosas a la vez con muchos menos recursos.`,
      },
      {
        type: 'text',
        heading: 'JSON — El Formato de Datos de la Web',
        body: `Cuando una API devuelve datos, necesita un formato que ambas partes entiendan. JSON (Notación de Objetos de JavaScript) ganó esta competencia por completo. Se parece a los objetos de JavaScript, es legible por humanos y todos los lenguajes de programación pueden analizarlo de forma nativa.<br><br><code>{<br>  "nombre": "Marco",<br>  "rol": "desarrollador",<br>  "habilidades": ["Django", "React", "PostgreSQL"]<br>}</code><br><br>Antes de JSON, las APIs usaban XML — verboso, profundamente anidado, tedioso de trabajar en JavaScript. JSON es más simple en todas las dimensiones. Para 2010 era el estándar predeterminado para prácticamente todas las APIs web.`,
      },
      {
        type: 'lab',
        label: 'Pruébalo — Lab DevTools',
        heading: 'Llama a una API Real desde la Consola',
        steps: [
          'Abre DevTools → pestaña Console',
          'Pega: <code>fetch(\'https://api.github.com/users/octocat\').then(r=>r.json()).then(console.log)</code>',
          'Presiona Enter — verás una Promise, luego el resultado JSON aparece abajo',
          'Expande el objeto registrado para explorar: repos, followers, created_at...',
        ],
        explain: `Acabas de hacer una petición HTTP GET real a la API de GitHub, recibiste JSON, lo analizaste y lo registraste — exactamente lo mismo que hace JavaScript en cualquier aplicación web al obtener datos. Nota que la pestaña Network también muestra la petición: URL, estado 200, cabeceras de respuesta, cuerpo completo. Ese es el ciclo completo de petición-respuesta del Módulo 1 ocurriendo en vivo.`,
      },
    ],
    quiz: [
      { q: '¿Cuál es la diferencia entre un servidor estático y uno dinámico?', opts: ['Los servidores estáticos son más rápidos; los dinámicos son más lentos', 'Los servidores estáticos sirven archivos tal como están; los dinámicos ejecutan código para generar cada respuesta', 'Los servidores estáticos solo sirven imágenes; los dinámicos sirven HTML', 'Los servidores estáticos son gratuitos; los dinámicos tienen costo'], correct: 1 },
      { q: '¿Por qué los servidores backend usan programación asíncrona?', opts: ['Para cifrar datos antes de enviarlos', 'Para manejar muchas peticiones simultáneas sin bloquear mientras esperan operaciones lentas', 'Para comprimir respuestas para entrega más rápida', 'Para evitar escribir callbacks en JavaScript'], correct: 1 },
      { q: '¿Qué verbo HTTP deberías usar para crear un nuevo recurso?', opts: ['GET', 'PUT', 'POST', 'DELETE'], correct: 2 },
    ],
  },
  {
    id: 6,
    eyebrow: 'Módulo 06',
    title: 'Bases de Datos',
    intro: 'Toda aplicación que necesita recordar algo — quién está conectado, qué se ordenó, qué se publicó — necesita una base de datos. Las bases de datos son la memoria a largo plazo de tu aplicación. Entender los tipos que existen y cuándo usar cada uno es uno de los conocimientos más útiles que puede tener alguien que no es desarrollador sobre cómo se construye el software.',
    objectives: [
      'Por qué los archivos no son suficientes y qué resuelven las bases de datos',
      'La diferencia entre bases de datos relacionales (SQL) y NoSQL',
      'Qué son las transacciones de bases de datos y por qué importan',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Por Qué los Archivos No Son Suficientes',
        body: `Podrías almacenar los datos de tu app en archivos simples — archivos de texto, JSON, CSVs. Para un proyecto personal con un usuario, funciona. Pero se desmorona rápido a escala. Múltiples usuarios escribiendo simultáneamente corrompe los datos. Buscar en un millón de registros en un archivo plano es lento. Representar relaciones ("este pedido pertenece a este usuario que vive en esta dirección") se vuelve profundamente complicado. Recuperarse de escrituras parciales (la app se cayó a mitad de guardar) es frágil.<br><br>Las bases de datos fueron construidas para resolver exactamente estos problemas. Manejan la concurrencia, la búsqueda, las relaciones y la recuperación ante fallos correctamente — para que tú no tengas que hacerlo.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'Bases de Datos Relacionales (SQL)',
        body: `El tipo dominante por 50 años. Los datos viven en <strong>tablas</strong> (como hojas de cálculo: filas y columnas). Las tablas se relacionan entre sí a través de claves.<br><br><code>tabla usuarios:  id | nombre | email<br>tabla pedidos: id | usuario_id | total | fecha</code><br><br><code>usuario_id</code> en pedidos apunta de vuelta a <code>id</code> en usuarios — esa es una relación. SQL (Lenguaje de Consulta Estructurado) es cómo hablas con la base de datos:<br><br><code>SELECT * FROM pedidos WHERE usuario_id = 42;</code><br><br>Principales opciones: <strong>PostgreSQL</strong> (el más potente, código abierto, usado en la mayoría de las apps de producción), <strong>MySQL</strong> (ampliamente usado, especialmente con PHP), <strong>SQLite</strong> (integrado, sin servidor necesario — usado en apps móviles y herramientas locales).`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'Transacciones — Por Qué Importa la Integridad de los Datos',
        body: `Una <strong>transacción</strong> es una unidad de trabajo que se completa completamente o no se ejecuta en absoluto. Ejemplo clásico: una transferencia bancaria. Paso 1: descontar $100 de la cuenta A. Paso 2: agregar $100 a la cuenta B. Si el servidor se cae entre los pasos 1 y 2, el dinero desaparece. Una transacción envuelve ambos pasos — si algo falla, todo se revierte como si nunca hubiera ocurrido.<br><br>Esto se llama cumplimiento <strong>ACID</strong> (Atomicidad, Consistencia, Aislamiento, Durabilidad). Toda base de datos relacional seria cumple con ACID. Por eso los bancos, el comercio electrónico y los sistemas de salud funcionan con bases de datos SQL.`,
      },
      {
        type: 'text',
        heading: 'Bases de Datos NoSQL — Cuando Gana la Flexibilidad',
        body: `Las bases de datos relacionales tienen un esquema fijo: defines las columnas por adelantado y cada fila debe ajustarse. Las bases de datos NoSQL cambian esa rigidez por flexibilidad.<br><br><strong>Bases de datos de documentos</strong> (MongoDB, Firestore): almacenan documentos tipo JSON. Sin esquema fijo — cada documento puede tener diferentes campos. Excelentes para contenido, perfiles de usuario, catálogos de productos donde la forma de los datos varía.<br><br><strong>Almacenes clave-valor</strong> (Redis): almacenan datos por clave, lecturas extremadamente rápidas. Usados para caché, almacenamiento de sesiones, limitación de tasa, tablas de líderes en tiempo real. Redis puede servir millones de lecturas por segundo desde memoria.<br><br><strong>Cuándo usar cuál:</strong> datos financieros, pedidos, cuentas de usuario → PostgreSQL. Caché, sesiones, contadores en tiempo real → Redis. Contenido flexible, iteración rápida → MongoDB.`,
      },
      {
        type: 'fun-fact',
        label: 'Dato curioso',
        body: `PostgreSQL fue lanzado por primera vez en 1996 y sigue siendo la base de datos más recomendada para nuevos proyectos hoy — casi 30 años después. La <em>Encuesta de Desarrolladores de Stack Overflow</em> lo ha clasificado como la base de datos más usada por desarrolladores profesionales durante varios años consecutivos, superando a MySQL. A pesar de docenas de alternativas más nuevas, los fundamentos sobre los que fue construido en la década de 1970 (modelo relacional, transacciones ACID, SQL) siguen sin ser superados para la gran mayoría de las aplicaciones.`,
      },
    ],
    quiz: [
      { q: '¿Qué problema resuelven las bases de datos que los archivos planos no pueden?', opts: ['Las bases de datos son más pequeñas en tamaño que los archivos', 'Las bases de datos manejan correctamente la concurrencia, las relaciones, la búsqueda y la recuperación ante fallos a escala', 'Las bases de datos se almacenan automáticamente en la nube', 'Las bases de datos cifran los datos por defecto'], correct: 1 },
      { q: '¿Qué es una transacción de base de datos?', opts: ['Un pago procesado por la base de datos', 'Un tipo de consulta SQL para leer datos', 'Una unidad de trabajo que se completa completamente o se revierte en su totalidad — protegiendo la integridad de los datos', 'Una conexión entre dos servidores de base de datos'], correct: 2 },
      { q: '¿Cuándo elegirías Redis sobre PostgreSQL?', opts: ['Cuando necesitas consultas relacionales complejas en muchas tablas', 'Para caché, sesiones y contadores en tiempo real donde importa la velocidad extrema de lectura', 'Para almacenar transacciones financieras que requieren cumplimiento ACID', 'Cuando tus datos tienen un esquema fijo y bien definido'], correct: 1 },
    ],
  },
  {
    id: 7,
    eyebrow: 'Módulo 07',
    title: 'Servicios de Terceros',
    intro: 'Las aplicaciones modernas casi nunca construyen todo desde cero. Enviar emails, procesar pagos, mostrar mapas, autenticar usuarios, enviar SMS — todos son problemas resueltos con empresas enteras dedicadas a hacerlos de forma confiable. Saber qué servicios existen y por qué los usarías en lugar de construirlos internamente es conocimiento esencial de producto.',
    objectives: [
      'Por qué el dilema "construir vs comprar" casi siempre favorece comprar para problemas de infraestructura básica',
      'Las categorías de servicios más importantes: email, pagos, autenticación, mapas y más',
      'Qué es un webhook y por qué los servicios de terceros los usan',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Por Qué Existen los Servicios de Terceros',
        body: `Toda aplicación eventualmente necesita enviar email, procesar un pago o mostrar un mapa. Podrías construir todos estos tú mismo — pero pasarías meses resolviendo problemas que ya han sido resueltos. El dilema <strong>construir vs comprar</strong> casi siempre favorece comprar para la infraestructura básica:<br><br>• La entrega de emails tiene filtros de spam, puntuaciones de reputación, manejo de rebotes, autenticación DKIM/SPF — toda una disciplina.<br>• El procesamiento de pagos requiere cumplimiento PCI-DSS, detección de fraude, manejo de contracargos, soporte para más de 200 métodos de pago.<br>• La autenticación requiere hash seguro de contraseñas, gestión de sesiones, flujos OAuth, MFA y parches de seguridad constantes.<br><br>Los servicios de terceros permiten que tu equipo se enfoque en lo que hace único a tu producto — no en reinventar problemas resueltos.`,
      },
      {
        type: 'concept',
        label: 'Email',
        heading: 'Servicios de Email Transaccional',
        body: `La entrega de email es sorprendentemente difícil. Gmail y Outlook filtran agresivamente el email de servidores desconocidos. Mantener una buena reputación de envío, manejar rebotes, gestionar cancelaciones de suscripción y pasar los filtros de spam es un trabajo de tiempo completo.<br><br><strong>SendGrid</strong> (ahora Twilio) — el más ampliamente usado. API simple, buena entregabilidad, generoso nivel gratuito.<br><strong>Mailgun</strong> — amigable para desarrolladores, buenas analíticas, popular para alto volumen.<br><strong>Postmark</strong> — enfocado en email transaccional (recibos, restablecimiento de contraseñas), excelente entregabilidad.<br><strong>AWS SES</strong> — el más barato a escala, pero requiere más configuración.<br><br>El <em>email transaccional</em> (confirmaciones de pedidos, restablecimiento de contraseñas) y el <em>email de marketing</em> (boletines, campañas) a menudo usan servicios diferentes — mezclarlos arriesga la entregabilidad de tu email transaccional.`,
      },
      {
        type: 'concept',
        label: 'Pagos',
        heading: 'Procesamiento de Pagos',
        body: `Casi nunca construyes tu propio procesamiento de pagos. Las razones: cumplimiento PCI-DSS (un estándar de auditoría de seguridad completo), sistemas de detección de fraude, gestión de contracargos, soporte para tarjetas de crédito, billeteras, transferencias bancarias en más de 150 países.<br><br><strong>Stripe</strong> — el estándar amigable para desarrolladores. API hermosa, excelente documentación, maneja tarjetas, transferencias bancarias, suscripciones, facturas, marketplaces. Usado por Amazon, Shopify, Lyft y miles de startups.<br><strong>PayPal / Braintree</strong> — ampliamente reconocido por los consumidores, mayor alcance global en algunos mercados.<br><strong>Culqi, Mercado Pago</strong> — líderes regionales en Latinoamérica.<br><br>El modelo de Stripe: tu frontend recopila los datos de la tarjeta directamente en los servidores de Stripe (nunca toca los tuyos), Stripe cobra la tarjeta y te envía un webhook confirmando el éxito.`,
      },
      {
        type: 'concept',
        label: 'Autenticación',
        heading: 'Auth como Servicio',
        body: `Implementar tu propia autenticación es una de las fuentes más comunes de vulnerabilidades de seguridad. Hash de contraseñas (bcrypt, no MD5), tokens de sesión, flujos OAuth para "Iniciar sesión con Google", MFA, recuperación de cuenta — todo debe hacerse correctamente.<br><br><strong>Auth0</strong> — nivel empresarial, soporta todos los proveedores OAuth, motor de reglas rico para lógica de autenticación personalizada.<br><strong>Clerk</strong> — moderno, hermosos componentes de UI preconstruidos, muy rápido de integrar.<br><strong>Firebase Auth</strong> — la oferta de Google, estrechamente integrada con el ecosistema Firebase.<br><strong>Supabase Auth</strong> — alternativa de código abierto, auto-hospedable.<br><br>La mayoría de los productos en etapas tempranas se benefician enormemente de delegar la autenticación completamente. El tiempo ahorrado — y las vulnerabilidades de seguridad evitadas — son ambos sustanciales.`,
      },
      {
        type: 'text',
        heading: 'Mapas, SMS, Almacenamiento y Más',
        body: `<strong>Mapas y Ubicación:</strong> Google Maps Platform (más funciones, precios por uso), Mapbox (más flexibilidad de diseño, también de pago), OpenStreetMap + Leaflet.js (gratuito, código abierto, bueno para mapas personalizados).<br><br><strong>SMS y Voz:</strong> Twilio — el jugador dominante. Aprovisionamiento de números de teléfono, SMS, WhatsApp, llamadas de voz, todo vía API.<br><br><strong>Almacenamiento de Archivos:</strong> AWS S3 — el estándar para almacenar archivos subidos, imágenes, documentos. Cloudinary agrega redimensionamiento y optimización automática de imágenes sobre el almacenamiento.<br><br><strong>Analíticas:</strong> Google Analytics (gratuito, ampliamente usado), Mixpanel (basado en eventos, mejores analíticas de producto), PostHog (código abierto, auto-hospedable, control total de tus datos).<br><br><strong>Feature Flags:</strong> LaunchDarkly, Flagsmith — activa o desactiva funciones en producción sin desplegar código. Esencial para lanzamientos graduales y pruebas A/B.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'Webhooks — Cómo los Servicios Notifican a tu App',
        body: `Cuando algo sucede en un servicio de terceros — un pago se completa, un email rebota, un archivo termina de procesarse — tu app necesita saberlo. Pero tu app no puede preguntar constantemente "¿ya pasó algo?"<br><br>La solución: los <strong>webhooks</strong>. Le dices al servicio "cuando ocurra X, envía un HTTP POST a esta URL en mi servidor". El servicio llama a tu endpoint con los datos del evento. Tu servidor lo procesa.<br><br>Ejemplo: el usuario paga vía Stripe → Stripe envía POST a <code>tuapp.com/webhooks/stripe</code> con los detalles del pago → tu servidor marca el pedido como pagado. No sondeas a Stripe — Stripe te notifica. Esta es la columna vertebral de cómo el ecosistema de servicios se mantiene sincronizado.`,
      },
    ],
    quiz: [
      { q: '¿Por qué la mayoría de las empresas usan Stripe en lugar de construir su propio sistema de pagos?', opts: ['Stripe es el único procesador de pagos legalmente permitido para operar', 'Construir pagos requiere cumplimiento PCI, detección de fraude e infraestructura que la mayoría de los equipos no puede justificar', 'Los pagos de Stripe se liquidan más rápido que las transferencias bancarias directas', 'Stripe es gratuito para todos los volúmenes de transacciones'], correct: 1 },
      { q: '¿Qué es un webhook?', opts: ['Una API del navegador para detectar eventos de scroll', 'Un tipo de token de autenticación', 'Una petición HTTP enviada por un servicio de terceros para notificar a tu app cuando ocurre un evento', 'Un método para cachear respuestas de API'], correct: 2 },
      { q: '¿Cuál es la diferencia clave entre email transaccional y email de marketing?', opts: ['El email transaccional es gratuito; el de marketing es de pago', 'El email transaccional es activado por acciones del usuario (recibos, restablecimientos); el de marketing son campañas masivas — y mezclarlos arriesga la entregabilidad', 'El email transaccional usa HTML; el de marketing usa texto plano', 'No hay diferencia — ambos usan la misma infraestructura de envío'], correct: 1 },
    ],
  },
  {
    id: 8,
    eyebrow: 'Módulo 08',
    title: 'Alojamiento y Dominios',
    intro: 'Tu código funciona localmente. Llevarlo a internet significa decidir dónde se ejecuta, cómo la gente lo encuentra y quién lo gestiona. Estas decisiones afectan el costo, el rendimiento, la fiabilidad y la velocidad de despliegue — y la respuesta correcta depende completamente de lo que estás construyendo.',
    objectives: [
      'Cómo funcionan los dominios y los registros DNS en la práctica',
      'El espectro desde el alojamiento estático hasta la infraestructura cloud gestionada',
      'Cuándo usar Vercel/Netlify vs cuándo usar AWS/GCP/Azure',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Dominios — Qué Son y Dónde Registrarlos',
        body: `Un <strong>dominio</strong> es un nombre que alquilas (no compras) de un registrador, renovado anualmente. Registradores populares: Namecheap, Cloudflare Registrar (al costo), GoDaddy, Google Domains (ahora Squarespace).<br><br>Una vez registrado, configuras <strong>registros DNS</strong> para apuntar el dominio a tu alojamiento:<br><br><strong>Registro A</strong> — mapea tu dominio a una dirección IP (<code>misitio.com → 192.0.2.1</code>).<br><strong>CNAME</strong> — mapea un subdominio a otro dominio (<code>www.misitio.com → misitio.com</code>). Muy usado por Vercel y Netlify.<br><strong>Registro MX</strong> — dirige el email a tu proveedor de correo.<br><strong>Registro TXT</strong> — prueba la propiedad del dominio (Google, Stripe y otros usan esto para verificación).<br><br>Los cambios de DNS tienen un <strong>TTL (Tiempo de Vida)</strong> — un tiempo de expiración de caché. Un TTL de 3600 significa que tarda hasta una hora en propagarse globalmente. Bájalo antes de migraciones; súbelo cuando esté estable.`,
      },
      {
        type: 'concept',
        label: 'Nivel 1 — Alojamiento Estático',
        heading: 'Netlify, Vercel, GitHub Pages, Cloudflare Pages',
        body: `Para sitios sin código del lado del servidor — HTML/CSS/JS, documentación, páginas de marketing, portafolios — el alojamiento estático es la opción más simple y económica. Subes código a git, ellos lo construyen y despliegan.<br><br><strong>Vercel</strong> — construido alrededor de Next.js, pero funciona con cualquier framework. CDN global, HTTPS automático, despliegues de vista previa en cada PR, funciones serverless en el edge.<br><strong>Netlify</strong> — conjunto de funciones similar, ligeramente más agnóstico al ecosistema. Excelente para sitios JAMstack.<br><strong>GitHub Pages</strong> — gratuito, simple, sin pipeline de construcción. Ideal para documentación y demostraciones estáticas (este curso funciona sobre él).<br><strong>Cloudflare Pages</strong> — CDN global con la red de Cloudflare, muy rápido, generoso nivel gratuito.<br><br><strong>Cuándo usarlo:</strong> sitios de marketing, documentación, portafolios, demos de clientes, cualquier cosa sin un backend dinámico.`,
      },
      {
        type: 'concept',
        label: 'Nivel 2 — Plataforma como Servicio',
        heading: 'Render, Railway, Fly.io, Heroku',
        body: `Cuando tienes código del lado del servidor — una API Django, un backend Node, un worker de trabajos en segundo plano — necesitas algo que pueda ejecutarlo. Las plataformas PaaS manejan la configuración del servidor por ti: les das tu código (vía git o Docker), ellos lo ejecutan.<br><br><strong>Render</strong> — reemplazo moderno de Heroku. Soporta Node, Python, Ruby, Go, Docker. Nivel gratuito disponible, PostgreSQL gestionado incluido, despliegues automáticos desde git.<br><strong>Railway</strong> — configuración rápida, excelente DX, precios generosos, soporta bases de datos junto a servicios.<br><strong>Fly.io</strong> — ejecuta contenedores Docker en el edge a nivel mundial, más control que Render, ligeramente más configuración.<br><strong>Heroku</strong> — el PaaS original, una vez dominante, ahora caro en comparación con las alternativas.<br><br><strong>Cuándo usarlo:</strong> APIs, aplicaciones dinámicas, productos en etapa temprana, escala pequeña a mediana.`,
      },
      {
        type: 'concept',
        label: 'Nivel 3 — Infraestructura Cloud',
        heading: 'AWS, GCP, Azure — y Cuándo Realmente los Necesitas',
        body: `Los grandes proveedores de cloud ofrecen infraestructura pura: máquinas virtuales (EC2, Compute Engine), almacenamiento de objetos (S3, GCS), bases de datos gestionadas (RDS, Cloud SQL), CDN (CloudFront, Cloud CDN) y cientos de otros servicios.<br><br><strong>AWS</strong> — el líder del mercado (~33% de cuota). El catálogo de servicios más amplio. S3 para almacenamiento de archivos es casi universal incluso fuera de AWS. Complejo, pero todos los ingenieros DevOps lo conocen.<br><strong>Google Cloud (GCP)</strong> — sólido en datos/ML (BigQuery, Vertex AI), orígenes de Kubernetes, competitivo en precios.<br><strong>Azure</strong> — dominante en empresas con contratos Microsoft existentes (integración con Office 365, Active Directory).<br><br><strong>Cuándo realmente los necesitas:</strong> requisitos de cumplimiento (HIPAA, SOC2, PCI), industrias reguladas, muy alta escala, arquitecturas multi-servicio complejas, acuerdos empresariales existentes, necesidades avanzadas de ML/datos.`,
      },
      {
        type: 'text',
        heading: 'CDNs — Por Qué Tus Archivos Vienen de Cerca',
        body: `Una <strong>CDN (Red de Distribución de Contenidos)</strong> almacena en caché tus archivos estáticos (imágenes, CSS, JS, fuentes) en servidores distribuidos por todo el mundo — nodos edge. Cuando un usuario en Lima solicita una imagen, la obtiene de São Paulo, no de un servidor en Virginia. La latencia baja de 200ms a 20ms.<br><br><strong>Cloudflare</strong> — la CDN más ampliamente usada, también proporciona protección DDoS, DNS y seguridad. El nivel gratuito cubre la mayoría de los sitios.<br><strong>AWS CloudFront</strong> — estrechamente integrado con S3 y EC2, el estándar para recursos alojados en AWS.<br><strong>Fastly</strong> — usado por GitHub, Twitter y grandes plataformas donde el rendimiento de la CDN es crítico.<br><br>Todas las plataformas de alojamiento de Nivel 1 (Vercel, Netlify, Cloudflare Pages) tienen una CDN integrada — obtienes distribución global automáticamente sin configuración adicional.`,
      },
      {
        type: 'concept',
        label: 'Marco de Decisión',
        heading: 'Elegir el Alojamiento Correcto',
        body: `<strong>Sitio estático, sin backend</strong> → Vercel, Netlify o GitHub Pages. Gratuito, instantáneo, distribuido globalmente.<br><br><strong>API + base de datos, etapa temprana</strong> → Render o Railway. Despliegue simple, base de datos gestionada incluida, sin necesidad de DevOps.<br><br><strong>App full-stack, escala media</strong> → Render o Fly.io. Más control, soporte Docker, escala razonablemente.<br><br><strong>Alta escala, requisitos de cumplimiento o arquitectura compleja</strong> → AWS, GCP o Azure. Acepta la complejidad a cambio de control y certificaciones de cumplimiento.<br><br><strong>Empresa con stack Microsoft existente</strong> → Azure, casi siempre.<br><br>El error más común: usar AWS para un proyecto que habría servido perfectamente con Render. El segundo más común: superar un PaaS y no migrar a AWS con suficiente anticipación. El objetivo es ajustar la complejidad de la infraestructura a las necesidades reales del producto.`,
      },
    ],
    quiz: [
      { q: '¿Para qué se usa un registro DNS CNAME?', opts: ['Mapear un dominio a una dirección IP', 'Dirigir el email a un servidor de correo', 'Mapear un subdominio a otro nombre de dominio', 'Verificar la propiedad del dominio para servicios de terceros'], correct: 2 },
      { q: '¿Cuándo deberías elegir Vercel o Netlify sobre AWS?', opts: ['Cuando necesitas cumplimiento HIPAA', 'Para sitios estáticos y aplicaciones frontend — son más simples, más rápidos de configurar y a menudo gratuitos', 'Cuando tu app maneja más de 1 millón de usuarios', 'Cuando necesitas una base de datos relacional gestionada'], correct: 1 },
      { q: '¿Qué hace una CDN por el rendimiento de tu sitio?', opts: ['Reduce el tamaño de tus archivos JavaScript', 'Almacena en caché tus archivos estáticos en servidores de todo el mundo para que los usuarios los obtengan desde una ubicación cercana', 'Optimiza automáticamente tus consultas SQL', 'Comprime las respuestas HTML antes de enviarlas'], correct: 1 },
    ],
  },
  {
    id: 9,
    eyebrow: 'Módulo 09',
    title: 'Seguridad — Lo Que Todo PM Debe Saber',
    intro: 'La seguridad no es solo una preocupación de los desarrolladores — es una preocupación de producto. Los PMs toman decisiones que afectan directamente la superficie de ataque de su producto: qué datos se recopilan, cómo funciona la autenticación, qué acceso tienen los terceros. Entender las amenazas más comunes y cómo funcionan te convierte en un socio más efectivo para tu equipo de ingeniería — y protege a tus usuarios.',
    objectives: [
      'Qué protege realmente HTTPS/TLS (y qué no)',
      'Los ataques web más comunes: XSS, CSRF, inyección SQL — cómo funcionan y qué los previene',
      'La diferencia entre autenticación y autorización',
    ],
    sections: [
      {
        type: 'text',
        heading: 'HTTPS — El Ícono del Candado Explicado',
        body: `El candado en la barra de direcciones de tu navegador significa que la conexión está cifrada usando <strong>TLS (Seguridad de la Capa de Transporte)</strong>. Específicamente, significa dos cosas:<br><br><strong>1. Cifrado:</strong> los datos que fluyen entre tu navegador y el servidor están cifrados. Un atacante que intercepte el tráfico de red ve texto incomprensible, no tu contraseña ni tu número de tarjeta de crédito.<br><br><strong>2. Autenticación:</strong> una Autoridad de Certificación (CA) de confianza ha verificado que el dominio al que te conectas está realmente controlado por la entidad que dice ser. No estás hablando con un impostor.<br><br><strong>Lo que HTTPS NO protege:</strong> no protege contra vulnerabilidades en la propia aplicación — un atacante que compromete el servidor aún tiene tus datos. El cifrado es seguridad en la capa de transporte, no en la capa de aplicación. Un sitio puede tener el candado verde y aun así estar lleno de errores.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'Autenticación vs Autorización',
        body: `Estos dos términos se confunden constantemente, pero son distintos:<br><br><strong>Autenticación</strong> — ¿quién eres? Este es el paso de inicio de sesión. Probar identidad mediante contraseña, OAuth (Iniciar sesión con Google), enlace mágico o biometría.<br><br><strong>Autorización</strong> — ¿qué se te permite hacer? Después de iniciar sesión, ¿eres un usuario gratuito, de pago o administrador? ¿Puedes editar este documento o solo verlo? La autorización trata sobre permisos y roles.<br><br>Un error clásico de PM: construir una función y olvidar la autorización. "Cualquier usuario autenticado puede editar cualquier perfil" es un error de auth — la autenticación fue correcta (sabías quién era), pero la autorización estaba rota (tenían permisos que no deberían). Son sistemas separados y deben diseñarse por separado.`,
      },
      {
        type: 'concept',
        label: 'Ataque: XSS',
        heading: 'Cross-Site Scripting (XSS)',
        body: `XSS ocurre cuando un atacante inyecta JavaScript malicioso en una página que otros usuarios luego cargan. El navegador no tiene forma de distinguir entre el JavaScript legítimo de la página y el código inyectado — ambos se ejecutan con los mismos permisos.<br><br><strong>Ejemplo:</strong> una caja de comentarios que no sanitiza la entrada. El usuario envía: <code>&lt;script&gt;document.cookie&lt;/script&gt;</code>. Ese comentario se almacena en la base de datos y se renderiza para cada usuario que vea la página. El script del atacante ahora se ejecuta en el navegador de cada espectador — robando cookies de sesión, redirigiendo a páginas de phishing o registrando pulsaciones de teclas.<br><br><strong>Prevención:</strong> escapar el contenido generado por usuarios antes de renderizarlo. Los frameworks modernos (React, Vue) hacen esto automáticamente — tratan el contenido del usuario como texto, no como HTML, por defecto. Esta es una de las razones por las que existen los frameworks. La concatenación de cadenas HTML sin procesar es peligrosa.`,
      },
      {
        type: 'concept',
        label: 'Ataque: Inyección SQL',
        heading: 'Inyección SQL',
        body: `Cuando la entrada del usuario se inserta directamente en una consulta de base de datos sin sanitización, un atacante puede inyectar comandos SQL que cambian lo que hace la consulta.<br><br><strong>Ejemplo clásico:</strong><br><code>SELECT * FROM usuarios WHERE email = \\'$entrada\\';</code><br><br>Si la entrada es <code>admin\\'--</code>, la consulta se convierte en:<br><code>SELECT * FROM usuarios WHERE email = \\'admin\\'--\\';</code><br><br>El <code>--</code> comenta el resto. El atacante inicia sesión como administrador sin contraseña.<br><br><strong>Prevención:</strong> consultas parametrizadas / declaraciones preparadas. La base de datos trata la entrada del usuario como datos, nunca como comandos SQL. Cada ORM moderno (SQLAlchemy, Django ORM, Prisma) hace esto por defecto. Escribir SQL crudo con interpolación de cadenas es la señal de alerta a vigilar en una revisión de código.`,
      },
      {
        type: 'concept',
        label: 'Ataque: CSRF',
        heading: 'Cross-Site Request Forgery (CSRF)',
        body: `CSRF engaña al navegador de un usuario autenticado para que haga una solicitud que no pretendía hacer. Dado que el navegador envía automáticamente cookies con las solicitudes, una página maliciosa puede hacer solicitudes autenticadas a otro sitio en el que el usuario haya iniciado sesión.<br><br><strong>Ejemplo:</strong> estás conectado a tu banco. Visitas un sitio malicioso que tiene un formulario oculto que envía una solicitud de transferencia al endpoint de tu banco. El banco recibe la solicitud con tu cookie de sesión válida y la procesa.<br><br><strong>Prevención:</strong> tokens CSRF — un valor único e impredecible integrado en cada formulario que el servidor valida antes de procesar. También: el atributo de cookie <code>SameSite</code>, que evita que las cookies se envíen en solicitudes entre sitios por defecto en los navegadores modernos.<br><br>Por eso la mayoría de los frameworks basados en formularios incluyen protección CSRF por defecto.`,
      },
      {
        type: 'fun-fact',
        label: 'Dato curioso',
        body: `El ataque de inyección SQL más infame de la historia fue contra Sony Pictures en 2011. Los hackers robaron 77 millones de cuentas de PlayStation Network — nombres, direcciones, datos de tarjetas de crédito — inyectando SQL en un formulario de inicio de sesión. El tiempo de respuesta de Sony fue criticado como gravemente lento. El ataque fue relativamente poco sofisticado: un escáner automatizado de inyección SQL encontró la vulnerabilidad. No era un zero-day dirigido; era higiene básica que no se aplicó.`,
      },
      {
        type: 'lab',
        label: 'Pruébalo — Lab DevTools',
        heading: 'Inspecciona el Certificado HTTPS',
        steps: [
          'Haz clic en el ícono del candado en la barra de direcciones de tu navegador en cualquier sitio HTTPS',
          'Haz clic en "La conexión es segura" → "El certificado es válido"',
          'Ve: quién emitió el certificado, para qué dominio es válido, cuándo vence',
          'En DevTools → pestaña Security: ve los detalles del certificado, versión TLS y conjunto de cifrado usado',
        ],
        explain: `Cada sitio HTTPS tiene un certificado firmado por una Autoridad de Certificación. El navegador verifica: ¿es confiable esta CA? ¿Es el certificado para el dominio correcto? ¿Ha expirado? Si alguna verificación falla, aparece la advertencia "No es seguro". La pestaña Security también muestra si algún recurso en la página se cargó a través de HTTP (contenido mixto) — un error común que socava la seguridad de la página.`,
      },
    ],
    quiz: [
      { q: '¿Qué protege realmente HTTPS/TLS?', opts: ['El código de la aplicación de tener errores', 'Los datos en la base de datos de ser accedidos', 'Los datos en tránsito entre el navegador y el servidor de ser interceptados o manipulados', 'El servidor de ser hackeado'], correct: 2 },
      { q: 'Un usuario puede ver cualquier documento en tu plataforma pero de alguna manera también puede editar los documentos de otros usuarios. Esto es un fallo de:', opts: ['Autenticación — la identidad del usuario no se verificó correctamente', 'Autorización — el usuario fue correctamente identificado pero tiene permisos que no debería', 'Cifrado — los datos no estaban cifrados', 'DNS — la solicitud fue al servidor equivocado'], correct: 1 },
      { q: '¿Cuál es la defensa principal contra la inyección SQL?', opts: ['Cifrar la base de datos en reposo', 'Usar HTTPS para todas las conexiones de base de datos', 'Consultas parametrizadas que tratan la entrada del usuario como datos, nunca como SQL', 'Requerir contraseñas de al menos 8 caracteres'], correct: 2 },
    ],
  },
  {
    id: 10,
    eyebrow: 'Módulo 10',
    title: 'Rendimiento y Monitoreo',
    intro: 'Una función que funciona pero carga en 8 segundos está rota desde la perspectiva del usuario. El rendimiento es una decisión de producto, no puramente técnica — y es medible. Google ha estandarizado cómo medirlo, las DevTools del navegador pueden evaluarlo en segundos, y las herramientas de monitoreo te alertan cuando las cosas se degradan en producción. Este módulo te da el vocabulario y las herramientas para hacer del rendimiento una preocupación de producto de primera clase.',
    objectives: [
      'Qué son los Core Web Vitals y por qué Google los usa para el ranking de búsqueda',
      'Cómo leer un informe de Lighthouse y qué significa cada métrica',
      'Qué significan el monitoreo de errores y la observabilidad — y por qué necesitas ambos',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Por Qué el Rendimiento Es un Problema de Producto',
        body: `Cada 100ms de tiempo de carga adicional tiene un costo real. Amazon midió que cada 100ms de latencia cuesta 1% de ventas. Google descubrió que una desaceleración de 0.5 segundos en la búsqueda causó una caída del 20% en el tráfico. Akamai encontró que un retraso de 2 segundos en la carga aumenta las tasas de rebote en un 87%.<br><br>Para los usuarios móviles con redes más lentas, las diferencias de rendimiento entre una aplicación rápida y una lenta son enormes. En muchos mercados — América Latina, Sudeste Asiático, India — el usuario mediano está en una conexión 4G que funciona significativamente peor que el promedio norteamericano. Construir para la mediana global, no para el ingeniero de Silicon Valley con fibra y MacBook Pro, es una decisión de producto que requiere un esfuerzo intencional.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'Core Web Vitals — El Estándar de Rendimiento de Google',
        body: `Google define tres Core Web Vitals que miden la experiencia real del usuario, no solo benchmarks técnicos:<br><br><strong>LCP (Largest Contentful Paint)</strong> — cuánto tiempo hasta que el contenido principal de la página es visible. Mide la velocidad de carga percibida. Objetivo: menos de 2.5 segundos.<br><br><strong>INP (Interaction to Next Paint)</strong> — qué tan receptiva es la página a la entrada del usuario. Reemplazó al FID en 2024. Mide el retraso de interacción. Objetivo: menos de 200ms.<br><br><strong>CLS (Cumulative Layout Shift)</strong> — cuánto salta la página mientras carga. Un cambio de diseño de 0.1 significa que algo se movió el 10% del viewport. Objetivo: menos de 0.1.<br><br>Estas métricas afectan el ranking de búsqueda de Google directamente — los malos Core Web Vitals significan rankings de búsqueda orgánica más bajos. Esto convierte el rendimiento en una métrica de negocio, no solo técnica.`,
      },
      {
        type: 'lab',
        label: 'Pruébalo — Lab DevTools',
        heading: 'Ejecuta una Auditoría de Lighthouse',
        steps: [
          'Abre DevTools y haz clic en la pestaña <strong>Lighthouse</strong>',
          'Selecciona el modo "Móvil", marca "Rendimiento", haz clic en "Analizar carga de página"',
          'Espera 30-60 segundos mientras Lighthouse simula una carga móvil',
          'Lee la puntuación (0-100) y expande cada diagnóstico fallido para ver los detalles',
        ],
        explain: `Lighthouse es la herramienta automatizada de Google para medir los Core Web Vitals y otras métricas de rendimiento, accesibilidad y SEO. La puntuación es un promedio ponderado. La sección "Oportunidades" muestra correcciones específicas con ahorros de tiempo estimados. La sección "Diagnósticos" muestra problemas que no afectan directamente la puntuación pero vale la pena abordar. Cuando un dev te dice "la puntuación de Lighthouse es 38", esto es lo que significa.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'La Pestaña Network — Donde Vive el Rendimiento',
        body: `La pestaña Network en DevTools es donde ves cada recurso que carga la página. Para el análisis de rendimiento, las métricas clave:<br><br><strong>Cascada (Waterfall)</strong> — una línea de tiempo visual de cuándo comienza y termina de cargar cada recurso. Las barras largas son recursos lentos. Las barras que comienzan tarde (porque se descubrieron tarde en el HTML) son candidatos para precarga.<br><br><strong>DOMContentLoaded (línea azul)</strong> — cuándo el HTML está completamente analizado. Todo lo que está antes de esto bloquea el renderizado inicial.<br><br><strong>Load (línea roja)</strong> — cuándo todos los recursos han cargado incluyendo imágenes. Esto es cuando el navegador dispara el evento <code>load</code>.<br><br><strong>Tamaño vs Transferencia</strong> — "Tamaño" es el tamaño real del archivo. "Transferencia" es el tamaño comprimido por la red. Si un archivo JS de 500KB se transfiere como 150KB, está usando compresión gzip.`,
      },
      {
        type: 'text',
        heading: 'Monitoreo de Errores — Saber Cuándo Las Cosas Se Rompen en Producción',
        body: `No importa cuán bien probado esté tu código, los errores ocurren en producción. Los usuarios usan navegadores inusuales, tienen tiempos de espera en la red, llegan a casos extremos que no anticipaste. Sin monitoreo de errores, te enteras de los bugs por tickets de soporte al cliente — lo que significa que el bug ha estado fallando silenciosamente durante horas o días.<br><br><strong>Sentry</strong> es la herramienta de monitoreo de errores más ampliamente usada. Captura excepciones de JavaScript, errores de backend y bloqueos, incluyendo el stack trace completo, el navegador/dispositivo que causó el error, la URL y el número de usuarios afectados. Recibes una alerta en el momento en que algo se rompe.<br><br>El trabajo del PM con el monitoreo de errores: configurar umbrales de alerta y asegurarse de que los errores sean clasificados en el backlog con la prioridad correcta. Un bug que afecta a 1000 usuarios/hora es una conversación diferente a un bug que afecta a 3 usuarios avanzados.`,
      },
      {
        type: 'concept',
        label: 'Concepto clave',
        heading: 'Observabilidad — Logs, Métricas, Trazas',
        body: `La observabilidad es la capacidad de entender lo que hace tu sistema a partir de sus salidas. Tres pilares:<br><br><strong>Logs</strong> — registros con marca de tiempo de eventos. "El usuario 4821 realizó el pago a las 14:32:01." "El webhook de pago falló con 500." Los logs responden "¿qué pasó?"<br><br><strong>Métricas</strong> — mediciones numéricas a lo largo del tiempo. "Tiempo de respuesta de API: promedio de 340ms, percentil 99 de 1200ms." "Tasa de error: 0.3%." Las métricas responden "¿cómo está funcionando ahora mismo?"<br><br><strong>Trazas</strong> — el camino que tomó una sola solicitud a través del sistema. En una arquitectura de microservicios, una acción del usuario puede tocar 12 servicios. Una traza muestra cuánto tiempo tardó cada paso y dónde falló. Las trazas responden "¿por qué esta solicitud es lenta?"<br><br><strong>Herramientas:</strong> Datadog, Grafana, New Relic para observabilidad de stack completo. Vercel Analytics y Netlify Analytics para métricas de frontend sin instrumentación.`,
      },
      {
        type: 'fun-fact',
        label: 'Dato curioso',
        body: `El término "cinco nueves" (99.999% de disponibilidad) significa que tu sistema puede estar caído solo 5.26 minutos por año. Un nueve (90%) permite 36.5 días de tiempo de inactividad. Por eso importan los niveles de SLA: la inversión en infraestructura e ingeniería para pasar de 99% a 99.99% de disponibilidad es enorme. La mayoría de los productos de consumo apuntan al 99.9% (alrededor de 8.7 horas/año de tiempo de inactividad). Los productos que necesitan cinco nueves — control de tráfico aéreo, sistemas hospitalarios, redes de pago — son los que el tiempo de inactividad cuesta directamente vidas o grandes sumas de dinero.`,
      },
    ],
    quiz: [
      { q: '¿Qué mide el LCP (Largest Contentful Paint)?', opts: ['Cuánto tiempo hasta que todo el JavaScript se ha ejecutado', 'Cuánto tiempo hasta que el contenido principal de la página es visualmente completo', 'Cuánto tiempo hasta que llega el primer byte del servidor', 'Cuántos cambios de diseño ocurren mientras carga la página'], correct: 1 },
      { q: '¿Por qué los Core Web Vitals importan más allá de la experiencia del usuario?', opts: ['Son requeridos por las regulaciones GDPR', 'Afectan directamente el ranking de búsqueda de Google', 'Determinan si un sitio puede usar HTTPS', 'Controlan cuánto almacena en caché tu contenido una CDN'], correct: 1 },
      { q: '¿Cuál es la diferencia entre el monitoreo de errores (Sentry) y la observabilidad (Datadog)?', opts: ['Son lo mismo con nombres diferentes', 'El monitoreo de errores captura bloqueos y excepciones específicos; la observabilidad mide patrones de rendimiento de todo el sistema a través de logs, métricas y trazas', 'La observabilidad es para frontend; el monitoreo de errores es para backend', 'El monitoreo de errores es gratuito; la observabilidad siempre tiene costo'], correct: 1 },
    ],
  },
];

// ---- ERA → AUDIO CHAPTER ----

function startCourse(era) {
  const alreadyInCourse = courseMode;
  closeEraSelector();
  courseEra = era;

  eraTransition(() => {
    setTheme(era);

    if (alreadyInCourse) {
      // Just a theme switch — don't restart the module
      return;
    }

    courseMode    = true;
    currentModule = 1;

    document.getElementById('landing-screen').style.display = 'none';
    document.getElementById('chapter-screen').style.display = 'block';

    progressBar.classList.add('visible');
    progressBar.style.width = '0%';

    // Load era audio
    const audioChapter = ERA_AUDIO[era] || 1;
    loadAudio(audioChapter);
    const ch = CHAPTERS[audioChapter];
    const trackTitle = `Learn the Web  ·  ${ch ? ch.title : ''}  ·  How It Started`;
    const marquee = document.getElementById('audio-track-title');
    if (marquee) marquee.textContent = trackTitle;

    // Show theme switcher in nav
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) themeBtn.style.display = 'inline-flex';

    updateCourseNav(1);
    renderCourseModule(1);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function renderCourseModule(moduleId) {
  const mod = getCourseModules().find(m => m.id === moduleId);
  if (!mod) return;

  currentModule = moduleId;

  // Build module HTML
  let html = `<p class="chapter-eyebrow">${mod.eyebrow}</p><h1>${mod.title}</h1>
    <p class="chapter-intro">${mod.intro}</p>`;

  mod.sections.forEach(sec => {
    if (sec.type === 'text') {
      html += `<h2>${sec.heading}</h2><p>${sec.body}</p>`;
    } else if (sec.type === 'concept') {
      html += `<div class="concept-box">
        <div class="concept-label">${sec.label}</div>
        <h4>${sec.heading}</h4>
        <p>${sec.body}</p>
      </div>`;
    } else if (sec.type === 'fun-fact') {
      html += `<div class="fun-fact">
        <span class="fun-fact-label">${sec.label}</span>
        <p>${sec.body}</p>
      </div>`;
    } else if (sec.type === 'lab') {
      const stepsHtml = sec.steps.map((step, i) =>
        `<div class="lab-step"><span class="step-num">${i+1}</span><span>${step}</span></div>`
      ).join('');
      html += `<div class="lab-box">
        <div class="lab-label">${sec.label}</div>
        <h4>${sec.heading}</h4>
        <div class="lab-steps">${stepsHtml}</div>
        <div class="lab-explain"><p>${sec.explain}</p></div>
      </div>`;
    }
  });

  document.getElementById('chapter-content').innerHTML = html;

  // Prepend objectives
  renderObjectives(moduleId, mod.objectives);

  // Append quiz
  renderQuiz(`course-${moduleId}`, mod.quiz, true);

  // Scroll animations
  setTimeout(initScrollAnimations, 100);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Reading progress
  updateCourseProgress(moduleId);
}

function updateCourseNav(moduleId) {
  const modules = getCourseModules();
  const total   = modules.length;
  const mod     = modules.find(m => m.id === moduleId);

  document.getElementById('nav-title').textContent =
    `${mod.eyebrow} — ${mod.title}`;

  // Rebuild indicator dots to reflect course modules
  const indicators = document.getElementById('chapter-indicators');
  indicators.innerHTML = modules.map(m => {
    let cls = 'dot';
    if (m.id === moduleId) cls += ' active';
    else if (m.id < moduleId) cls += ' visited';
    return `<span class="${cls}" title="${m.title}" onclick="eraTransition(()=>renderCourseModule(${m.id}))"></span>`;
  }).join('');

  document.getElementById('chapter-progress').textContent =
    `${mod.title}  ·  ${moduleId} / ${total}`;
  document.getElementById('chapter-progress').classList.add('course-mode');

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  prevBtn.style.visibility = moduleId > 1 ? 'visible' : 'hidden';
  prevBtn.textContent = '← Back';
  nextBtn.textContent = moduleId < total ? t('next-module') : t('finish-course');
}

function updateCourseProgress(moduleId) {
  updateCourseNav(moduleId);
  const pct = ((moduleId - 1) / getCourseModules().length) * 100;
  progressBar.style.width = pct + '%';
}

function nextCourseModule() {
  if (currentModule < getCourseModules().length) {
    eraTransition(() => {
      renderCourseModule(currentModule + 1);
    });
  } else {
    // Finished last module
    backToLanding();
  }
}

function prevCourseModule() {
  if (currentModule > 1) {
    eraTransition(() => {
      renderCourseModule(currentModule - 1);
    });
  } else {
    backToLanding();
  }
}

// backToLanding already resets courseMode — see its definition above
