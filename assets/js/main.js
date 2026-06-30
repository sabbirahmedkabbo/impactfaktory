/**
 * Impact Faktory — Main Site JavaScript
 * Handles: theme toggle, mobile nav, active nav link, year, misc UX.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  setActiveNav();
  setYear();
  initWorkFilter();
  initContactForm();
  initScrollReveal();
});

/* ── Theme Toggle ────────────────────────────────────────────── */
function initTheme() {
  const root   = document.documentElement;
  const btn    = document.getElementById('theme-toggle');
  if (!btn) return;

  // Determine initial theme
  const stored = localStorage.getItem('if-theme');
  const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark  = stored ? stored === 'dark' : sysDark;

  setTheme(isDark);

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') !== 'dark';
    setTheme(next);
    localStorage.setItem('if-theme', next ? 'dark' : 'light');
  });

  // Sync system-preference changes when no stored override
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('if-theme')) setTheme(e.matches);
  });
}

function setTheme(dark) {
  const root = document.documentElement;
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
  window.dispatchEvent(new CustomEvent('themechanged', { detail: { dark } }));
}

/* ── Mobile Nav ──────────────────────────────────────────────── */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav     = document.getElementById('mobile-nav');
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Active Nav Link ─────────────────────────────────────────── */
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
  });
}

/* ── Current Year ────────────────────────────────────────────── */
function setYear() {
  document.querySelectorAll('#year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ── Work Page Filter ────────────────────────────────────────── */
function initWorkFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.case-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        // Animate in
        if (match) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity .4s ease, transform .4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }
      });
    });
  });
}

/* ── Contact Form ────────────────────────────────────────────── */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Use Formspree if action is set, otherwise simulate
    const action = form.getAttribute('action');
    if (action && action !== '#') {
      try {
        const res = await fetch(action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });
        if (res.ok) { showSuccess(form, success); return; }
      } catch (_) { /* fallback */ }
    }

    // Demo fallback (no real endpoint yet)
    setTimeout(() => showSuccess(form, success), 600);
  });
}

function showSuccess(form, success) {
  form.style.display = 'none';
  if (success) { success.style.display = 'block'; }
}

/* ── Scroll Reveal ───────────────────────────────────────────── */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.card, .stat-item, .service-row, .case-card, .team-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .55s var(--ease, ease), transform .55s var(--ease, ease)';
    observer.observe(el);
  });
}

// Handle reveal class
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .revealed { opacity: 1 !important; transform: none !important; }
  </style>
`);
