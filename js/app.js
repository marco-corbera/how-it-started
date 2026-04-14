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
  if (completed === COURSE_MODULES.length) {
    setTimeout(showCompletionModal, 800);
  }
}

// ============================================================
// QUIZ SYSTEM (shared by chapters + course)
// ============================================================

// Per-session answer state
const quizAnswers = {};

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
              onclick="submitQuiz('${id}', ${JSON.stringify(questions).replace(/</g,'\\u003c')}, ${isCourse})"
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

function submitQuiz(id, questions, isCourse) {
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
      ${!passed ? `<button class="quiz-retry" onclick="retryQuiz('${id}', ${JSON.stringify(questions).replace(/</g,'\\u003c')}, ${isCourse})">${retryTxt}</button>` : ''}`;
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

function retryQuiz(id, questions, isCourse) {
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
    pillsEl.innerHTML = COURSE_MODULES.map(m =>
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
  const mod = COURSE_MODULES.find(m => m.id === moduleId);
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
  const total = COURSE_MODULES.length;
  const mod   = COURSE_MODULES.find(m => m.id === moduleId);

  document.getElementById('nav-title').textContent =
    `${mod.eyebrow} — ${mod.title}`;

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
  const pct = ((moduleId - 1) / COURSE_MODULES.length) * 100;
  progressBar.style.width = pct + '%';
}

function nextCourseModule() {
  if (currentModule < COURSE_MODULES.length) {
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
