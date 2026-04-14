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

    // Update progress text
    document.getElementById('chapter-progress').textContent =
      `Chapter ${chapterId} of ${CHAPTERS.length - 1}`;

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

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
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
    setTheme('landing');
    currentChapter = 0;
    updateNav(0);
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
});
