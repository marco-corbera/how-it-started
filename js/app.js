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
    const names = [
      'How a Page Loads', 'HTML', 'CSS', 'JavaScript', 'APIs', 'The Modern Stack'
    ];
    pillsEl.innerHTML = names.map(n => `<span class="completion-ch-pill">${n}</span>`).join('');
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
      'How JSON became the universal data format of the web',
    ],
    sections: [
      {
        type: 'text',
        heading: 'Static vs Dynamic Servers',
        body: `A <strong>static server</strong> serves files exactly as they are on disk: HTML, CSS, JS, images. Fast, simple, no code to run. This site is static — GitHub Pages serves the files directly. A <strong>dynamic server</strong> runs code to generate responses. When you load your Twitter feed, a server runs Python or Node.js or Go, queries a database, checks your preferences, and constructs a unique HTML response for you. Every request can produce different output.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'REST APIs and HTTP Verbs',
        body: `REST (Representational State Transfer) is a set of conventions for building web APIs. The core idea: use HTTP's built-in verbs to express intent.<br><br><code>GET    /users        → list all users<br>GET    /users/42     → get user 42<br>POST   /users        → create a new user<br>PUT    /users/42     → update user 42<br>DELETE /users/42     → delete user 42</code><br><br>No new protocols needed — just the HTTP you already understand, used consistently. REST became the default way to expose data on the web because it maps naturally to things developers already know.`,
      },
      {
        type: 'text',
        heading: 'JSON — The Web\'s Data Format',
        body: `When an API returns data, it needs a format both sides understand. JSON (JavaScript Object Notation) won this competition completely. It looks like JavaScript objects, it's human-readable, and every programming language can parse it.<br><br><code>{<br>  "name": "Marco",<br>  "role": "developer",<br>  "skills": ["Django", "React", "PostgreSQL"]<br>}</code><br><br>Before JSON, APIs used XML — verbose, hard to read, tedious to parse in JavaScript. JSON is simpler in every dimension. By 2010, it was the default for virtually all web APIs.`,
      },
      {
        type: 'fun-fact',
        label: 'Curious fact',
        body: `The GitHub API is one of the most used public APIs in the world and returns JSON. You can call it from any browser console right now with <code>fetch('https://api.github.com/users/torvalds').then(r=>r.json()).then(console.log)</code>. The response includes Linus Torvalds' public GitHub data. No authentication needed for public data. Open APIs built this ecosystem.`,
      },
      {
        type: 'lab',
        label: 'Try It — DevTools Lab',
        heading: 'Call a Real API from the Console',
        steps: [
          'Open DevTools → Console tab',
          'Paste: <code>fetch(\'https://api.github.com/users/octocat\').then(r=>r.json()).then(console.log)</code>',
          'Press Enter — you\'ll see a Promise, then the result logs below it',
          'Expand the logged object to explore the API response',
        ],
        explain: `You just made a real HTTP GET request to GitHub's API from your browser console, received JSON back, parsed it, and logged it. This is exactly what JavaScript in a web app does when it fetches data. The Network tab will show the request — you can see the full URL, headers, and response there too.`,
      },
    ],
    quiz: [
      { q: 'What is a REST API?', opts: ['A server that only serves static files', 'A database query language for web apps', 'An API that uses HTTP verbs to express intent on resources', 'A JavaScript framework for building backends'], correct: 2 },
      { q: 'What HTTP verb should you use to create a new resource?', opts: ['GET', 'PUT', 'POST', 'PATCH'], correct: 2 },
      { q: 'Why did JSON replace XML as the dominant data format for web APIs?', opts: ['JSON is encrypted by default', 'JSON is faster to transmit over the network', 'JSON is simpler, human-readable, and native to JavaScript', 'JSON was mandated by the W3C standard in 2005'], correct: 2 },
    ],
  },
  {
    id: 6,
    eyebrow: 'Module 06',
    title: 'The Modern Stack',
    intro: 'The web today is not just HTML, CSS, and JavaScript. It\'s an ecosystem of frameworks, package managers, build tools, and deployment platforms layered on top of those foundations. Understanding this stack means knowing what each layer does — and being honest about when you actually need it.',
    objectives: [
      'What npm does and why package management exists',
      'What a JavaScript framework is and what problem it solves',
      'What build tools do and why they became necessary',
    ],
    sections: [
      {
        type: 'text',
        heading: 'npm — The Package Registry',
        body: `Almost no web project starts from scratch. Developers reuse shared code through <strong>packages</strong>. npm (Node Package Manager) is the registry where over 2.5 million JavaScript packages live. A <code>package.json</code> file lists what your project depends on. Running <code>npm install</code> downloads them all into <code>node_modules/</code>.<br><br>The upside: instant access to solved problems (date formatting, animation, authentication). The downside: a simple project can have hundreds of transitive dependencies, each one a potential security or compatibility issue.`,
      },
      {
        type: 'text',
        heading: 'Build Tools — Why They Exist',
        body: `Modern JavaScript needs to be transformed before it can run in a browser: TypeScript must be compiled, JSX (React's HTML-in-JS syntax) must be transpiled, imports must be bundled into single files, images optimized, CSS preprocessed. <strong>Build tools</strong> (Webpack, Vite, esbuild) automate all of this.<br><br>The tradeoff is real: more capability, more complexity. A 2020 "simple web project" might require a config file, a build step, a dev server, and a deployment pipeline before you write a single line of application code.`,
      },
      {
        type: 'concept',
        label: 'Core Concept',
        heading: 'What a Framework Actually Does',
        body: `Frameworks like React, Vue, and Svelte solve a real problem: as web UIs grow, managing state (the data your app holds) and keeping the UI in sync with that state becomes very complex with vanilla JavaScript.<br><br>React's model: UI is a <em>pure function</em> of state. Change the state, the framework re-renders the affected components. You don't manually manipulate the DOM — you declare what the UI should look like given certain data, and React handles the rest. Fewer bugs, clearer mental model, at the cost of a new abstraction to learn.`,
      },
      {
        type: 'text',
        heading: 'The Counter-Argument: HTMX',
        body: `By 2020, a question emerged: did we actually need all this complexity? Could most web apps be built with server-rendered HTML and a small amount of JavaScript to handle interactions? <strong>HTMX</strong> is the most prominent answer. It extends HTML with attributes that let any element make HTTP requests and swap content into the page — no full JavaScript framework required.<br><br>This site is built with HTMX, on purpose, as a demonstration. The web's original model — request, receive HTML, render — was correct. We invented a problem, then built elaborate solutions for it. HTMX asks: what if we hadn't?`,
      },
      {
        type: 'lab',
        label: 'Try It — DevTools Lab',
        heading: 'See What a Build Tool Does',
        steps: [
          'Go to any React app (like vercel.com or linear.app)',
          'Open DevTools → Sources tab',
          'Find the main JavaScript bundle — it will be a minified file',
          'Compare the bundle size to what you\'d write by hand for the same feature',
        ],
        explain: `What you see is the output of a build process: thousands of files from hundreds of packages, minified and bundled into as few files as possible. This is the reality of the modern frontend stack. Now look at this page\'s source — it\'s a single JS file of ~600 lines. Both approaches are valid. The question is whether the complexity is justified.`,
      },
    ],
    quiz: [
      { q: 'What does npm install do?', opts: ['Installs Node.js on your computer', 'Downloads all dependencies listed in package.json', 'Builds and bundles your JavaScript files', 'Publishes your package to the npm registry'], correct: 1 },
      { q: 'What core problem do JavaScript frameworks like React solve?', opts: ['Writing CSS without conflicts', 'Managing state and keeping the UI in sync with it', 'Making HTTP requests faster', 'Replacing HTML with a better syntax'], correct: 1 },
      { q: 'What is HTMX\'s core argument?', opts: ['JavaScript frameworks should be written in TypeScript', 'The browser should replace the operating system', 'The web\'s original HTML/HTTP model was sufficient for most apps', 'Server-side rendering always outperforms client-side rendering'], correct: 2 },
    ],
  },
];

// ---- ERA → AUDIO CHAPTER ----

function startCourse(era) {
  closeEraSelector();
  courseMode = true;
  courseEra  = era;
  currentModule = 1;

  eraTransition(() => {
    setTheme(era);

    document.getElementById('landing-screen').style.display = 'none';
    document.getElementById('chapter-screen').style.display = 'block';

    progressBar.classList.add('visible');
    progressBar.style.width = '0%';

    // Load era audio
    const audioChapter = ERA_AUDIO[era] || 1;
    loadAudio(audioChapter);

    // Update nav for course mode
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
