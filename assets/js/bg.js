/**
 * Impact Faktory — Animated Grid Background (Canvas)
 * ~24px cells, each with an independent sine-wave opacity cycle.
 * ~12% cells are yellow (#FFE600), rest use current text colour.
 * Respects prefers-reduced-motion: freezes to a static faint grid.
 */

(function () {
  const CELL = 24;
  const YELLOW = [255, 230, 0];
  const YELLOW_RATIO = 0.12;

  let canvas, ctx, cells = [], raf = null;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function getConfig() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      maxOp:       dark ? 0.14 : 0.08,
      yellowMaxOp: dark ? 0.18 : 0.10,
      textRGB:     dark ? [250, 250, 250] : [24, 24, 27],
    };
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    buildGrid();
  }

  function buildGrid() {
    cells = [];
    const cols = Math.ceil(canvas.width  / CELL) + 1;
    const rows = Math.ceil(canvas.height / CELL) + 1;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        cells.push({
          x:        c * CELL,
          y:        r * CELL,
          yellow:   Math.random() < YELLOW_RATIO,
          duration: 3000 + Math.random() * 5000,  // 3-8 s cycle
          phase:    Math.random() * Math.PI * 2,   // staggered start
        });
      }
    }
  }

  function rgba([r, g, b], a) {
    return `rgba(${r},${g},${b},${a.toFixed(4)})`;
  }

  function drawFrame(ts) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cfg = getConfig();

    for (const cell of cells) {
      const sin = (Math.sin((ts + cell.phase) / cell.duration * Math.PI * 2) + 1) / 2;
      const color  = cell.yellow ? YELLOW      : cfg.textRGB;
      const maxOp  = cell.yellow ? cfg.yellowMaxOp : cfg.maxOp;
      ctx.fillStyle = rgba(color, sin * maxOp);
      ctx.fillRect(cell.x + 1, cell.y + 1, CELL - 2, CELL - 2);
    }

    raf = requestAnimationFrame(drawFrame);
  }

  function drawStatic() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cfg = getConfig();

    for (const cell of cells) {
      const color = cell.yellow ? YELLOW : cfg.textRGB;
      const op    = cell.yellow ? 0.04   : 0.02;
      ctx.fillStyle = rgba(color, op);
      ctx.fillRect(cell.x + 1, cell.y + 1, CELL - 2, CELL - 2);
    }
  }

  function start() {
    if (motionQuery.matches) {
      drawStatic();
    } else {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(drawFrame);
    }
  }

  function init() {
    canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    start();

    window.addEventListener('resize', () => { resize(); start(); });
    motionQuery.addEventListener('change', () => {
      if (motionQuery.matches) drawStatic(); else start();
    });
    // Re-render static grid immediately on theme change to pick up new opacity config
    window.addEventListener('themechanged', () => {
      if (motionQuery.matches) drawStatic();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
