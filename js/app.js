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
    navTitle.textContent = 'How It Started';
  } else {
    navTitle.textContent = `${String(chapterId).padStart(2,'0')} — ${CHAPTERS[chapterId].title}`;
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

    // Update progress text
    document.getElementById('chapter-progress').textContent =
      `${CHAPTERS[chapterId].title}  ·  ${chapterId} / ${CHAPTERS.length - 1}`;

    // Update prev/next buttons
    document.getElementById('prev-btn').style.visibility = chapterId > 1 ? 'visible' : 'hidden';
    document.getElementById('next-btn').textContent =
      chapterId < CHAPTERS.length - 1 ? 'Next →' : 'Finish';

    // Load chapter content via fetch
    try {
      const res = await fetch(`chapters/ch${chapterId}.html`);
      if (!res.ok) throw new Error('not found');
      const html = await res.text();
      document.getElementById('chapter-content').innerHTML = html;
    } catch (e) {
      document.getElementById('chapter-content').innerHTML =
        `<p class="chapter-eyebrow">Chapter ${chapterId}</p>
         <h1>${chapter.title}</h1>
         <p class="chapter-intro">${chapter.years}</p>
         <p>Content coming soon.</p>`;
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

// ---- AUDIO PLAYER ----
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

function audioToggleMute() {
  const el = document.getElementById('audio-el');
  el.muted = !el.muted;
  document.getElementById('audio-vol-btn').textContent = el.muted ? '🔇' : '🔊';
}

function loadAudio(chapterId) {
  const chapter = CHAPTERS[chapterId];
  const el = document.getElementById('audio-el');
  const player = document.getElementById('audio-player');
  const src = `audio/ch${chapterId}.mp3`;

  // Pause and reset previous
  el.pause();
  audioReady = false;
  player.classList.remove('visible');
  document.getElementById('audio-play-btn').textContent = '▶';
  document.getElementById('audio-seek').value = 0;
  document.getElementById('audio-current').textContent = '0:00';
  document.getElementById('audio-duration').textContent = '0:00';

  // Check if audio file exists before showing player
  fetch(src, { method: 'HEAD' })
    .then(res => {
      if (!res.ok) return;
      el.src = src;
      el.load();
      document.getElementById('audio-track-title').textContent =
        `${chapter.title}  ·  ${chapter.years}`;
      player.classList.add('visible');
    })
    .catch(() => { /* no audio for this chapter */ });
}

// Wire up audio element events after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
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

  el.addEventListener('play', () => {
    document.getElementById('audio-play-btn').textContent = '⏸';
  });

  el.addEventListener('pause', () => {
    document.getElementById('audio-play-btn').textContent = '▶';
  });

  el.addEventListener('ended', () => {
    document.getElementById('audio-play-btn').textContent = '▶';
    document.getElementById('audio-seek').value = 0;
  });

  seekEl.addEventListener('input', () => {
    if (!isNaN(el.duration) && el.duration > 0) {
      el.currentTime = (seekEl.value / 100) * el.duration;
    }
  });
});

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
    document.getElementById('audio-player').classList.remove('visible');

    setTheme('landing');
    currentChapter = 0;
    updateNav(0);
    progressBar.classList.remove('visible');
    progressBar.style.width = '0%';
    document.getElementById('chapter-screen').style.display = 'none';
    document.getElementById('landing-screen').style.display = 'flex';
    window.scrollTo({ top: 0 });
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
