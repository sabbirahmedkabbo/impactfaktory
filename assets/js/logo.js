/**
 * Impact Faktory — Shared Header/Footer Injector
 * Injects nav logo mark SVG and activates current nav link.
 */

(function () {
  /* ── Inline logo mark SVG ── */
  const LOGO_SVG = `<svg class="nav-logo-mark" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" aria-hidden="true">
    <rect x="0"  y="0"  width="10" height="10" class="dark-sq"/>
    <rect x="12" y="0"  width="10" height="10" class="dark-sq"/>
    <rect x="24" y="0"  width="10" height="10" class="dark-sq"/>
    <rect x="36" y="0"  width="10" height="10" class="dark-sq"/>
    <rect x="48" y="0"  width="10" height="10" class="dark-sq"/>
    <rect x="60" y="0"  width="10" height="10" class="dark-sq"/>
    <rect x="0"  y="12" width="10" height="10" fill="#FFE600"/>
    <rect x="12" y="12" width="10" height="10" class="dark-sq"/>
    <rect x="24" y="12" width="10" height="10" class="dark-sq"/>
    <rect x="36" y="12" width="10" height="10" class="dark-sq"/>
    <rect x="48" y="12" width="10" height="10" class="dark-sq"/>
    <rect x="60" y="12" width="10" height="10" class="dark-sq"/>
    <rect x="0"  y="24" width="10" height="10" fill="#FFE600"/>
    <rect x="12" y="24" width="10" height="10" fill="#FFE600"/>
    <rect x="24" y="24" width="10" height="10" class="dark-sq"/>
    <rect x="36" y="24" width="10" height="10" class="dark-sq"/>
    <rect x="48" y="24" width="10" height="10" class="dark-sq"/>
    <rect x="60" y="24" width="10" height="10" class="dark-sq"/>
    <rect x="0"  y="36" width="10" height="10" fill="#FFE600"/>
    <rect x="12" y="36" width="10" height="10" fill="#FFE600"/>
    <rect x="24" y="36" width="10" height="10" fill="#FFE600"/>
    <rect x="36" y="36" width="10" height="10" class="dark-sq"/>
    <rect x="48" y="36" width="10" height="10" class="dark-sq"/>
    <rect x="60" y="36" width="10" height="10" class="dark-sq"/>
    <rect x="0"  y="48" width="10" height="10" fill="#FFE600"/>
    <rect x="12" y="48" width="10" height="10" fill="#FFE600"/>
    <rect x="24" y="48" width="10" height="10" fill="#FFE600"/>
    <rect x="36" y="48" width="10" height="10" fill="#FFE600"/>
    <rect x="48" y="48" width="10" height="10" class="dark-sq"/>
    <rect x="60" y="48" width="10" height="10" class="dark-sq"/>
    <rect x="0"  y="60" width="10" height="10" fill="#FFE600"/>
    <rect x="12" y="60" width="10" height="10" fill="#FFE600"/>
    <rect x="24" y="60" width="10" height="10" fill="#FFE600"/>
    <rect x="36" y="60" width="10" height="10" fill="#FFE600"/>
    <rect x="48" y="60" width="10" height="10" fill="#FFE600"/>
    <rect x="60" y="60" width="10" height="10" class="dark-sq"/>
  </svg>`;

  function applyThemeToLogo() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.nav-logo-mark .dark-sq').forEach(el => {
      el.setAttribute('fill', dark ? '#FFFFFF' : '#0A0A0A');
    });
  }

  window.addEventListener('themechanged', applyThemeToLogo);

  document.addEventListener('DOMContentLoaded', () => {
    // Inject logo into placeholder containers
    document.querySelectorAll('.logo-mark-placeholder').forEach(el => {
      el.innerHTML = LOGO_SVG;
    });
    applyThemeToLogo();
  });
})();
