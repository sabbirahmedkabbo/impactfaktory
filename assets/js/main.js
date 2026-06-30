/**
 * Impact Faktory — main.js
 * Theme toggle, mobile nav, active link, year, work filter, contact form, scroll reveal.
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

/* ── Theme ──────────────────────────────────────────────────────── */
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const stored   = localStorage.getItem('if-theme');
  const sysDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark   = stored ? stored === 'dark' : sysDark;
  applyTheme(isDark);

  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') !== 'dark';
    applyTheme(next);
    localStorage.setItem('if-theme', next ? 'dark' : 'light');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('if-theme')) applyTheme(e.matches);
  });
}

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.setAttribute('aria-pressed', dark ? 'true' : 'false');

  // Update nav logo mark dark squares
  document.querySelectorAll('.nav-logo-mark .dark-sq').forEach(el => {
    el.setAttribute('fill', dark ? '#FFFFFF' : '#0A0A0A');
  });

  window.dispatchEvent(new CustomEvent('themechanged', { detail: { dark } }));
}

/* ── Mobile Nav ─────────────────────────────────────────────────── */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav     = document.getElementById('mobile-nav');
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Active Nav Link ────────────────────────────────────────────── */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}

/* ── Year ───────────────────────────────────────────────────────── */
function setYear() {
  document.querySelectorAll('#year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ── Work Filter ────────────────────────────────────────────────── */
function initWorkFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.case-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity .35s ease, transform .35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }
      });
    });
  });
}

/* ── Contact Form ───────────────────────────────────────────────── */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const action = form.getAttribute('action');
    if (action && action !== '#') {
      try {
        const res = await fetch(action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });
        if (res.ok) { showSuccess(form, success); return; }
        btn.textContent = orig;
        btn.disabled = false;
        return;
      } catch (_) {}
    }
    // Formspree not connected yet — show success for demo
    setTimeout(() => showSuccess(form, success), 700);
  });
}

function showSuccess(form, success) {
  form.style.display = 'none';
  if (success) success.style.display = 'block';
}

/* ── Scroll Reveal ──────────────────────────────────────────────── */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.card, .stat-item, .service-row, .case-card, .team-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });
}
