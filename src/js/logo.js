/**
 * Impact Faktory — Shared nav & footer HTML snippets
 * Injected into every page via data-component attributes.
 * Usage: <header data-component="site-header"></header>
 */

(function () {

  /* ── Logo Mark SVG (theme-aware via .dark-sq) ── */
  function logoMark(cls = 'nav-logo-mark') {
    return `<svg class="${cls}" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" aria-hidden="true">
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
  }

  window.__IF_LOGO_MARK__ = logoMark;

})();
