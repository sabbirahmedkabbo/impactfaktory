/**
 * Impact Faktory — Pixel Bitmap Wordmark Generator
 * Renders "IMPACT FAKTORY" as crisp 1px SVG rects on a 5×9 grid per letter.
 * Applies a diagonal yellow gradient sweep (bottom-left → top-right).
 */

(function () {
  // 5-column × 9-row pixel matrices for each character
  const GLYPHS = {
    I: [
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [1,1,1,1,1],
    ],
    M: [
      [1,0,0,0,1],
      [1,1,0,1,1],
      [1,1,0,1,1],
      [1,0,1,0,1],
      [1,0,1,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    P: [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
    ],
    A: [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    C: [
      [0,1,1,1,1],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [0,1,1,1,1],
    ],
    T: [
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
    ],
    F: [
      [1,1,1,1,1],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
    ],
    K: [
      [1,0,0,0,1],
      [1,0,0,1,0],
      [1,0,1,0,0],
      [1,1,0,0,0],
      [1,1,0,0,0],
      [1,0,1,0,0],
      [1,0,0,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    O: [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0],
    ],
    R: [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0],
      [1,0,1,0,0],
      [1,0,0,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    Y: [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,0,1,0],
      [0,1,0,1,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
    ],
    SPACE: null, // 3px gap
  };

  const WORD1 = ['I','M','P','A','C','T'];
  const WORD2 = ['F','A','K','T','O','R','Y'];
  const LETTER_W = 5;
  const LETTER_H = 9;
  const GAP = 1;       // px gap between letters
  const WORD_GAP = 4;  // extra gap between words
  const NS = 'http://www.w3.org/2000/svg';

  function buildSVG(svgEl, scaleX = 2, scaleY = 2) {
    // Calculate total width
    const chars = [...WORD1, 'SPACE', ...WORD2];
    let totalW = 0;
    chars.forEach((c, i) => {
      if (c === 'SPACE') { totalW += WORD_GAP; return; }
      totalW += LETTER_W;
      if (i < chars.length - 1 && chars[i+1] !== 'SPACE') totalW += GAP;
    });

    const vW = totalW * scaleX;
    const vH = LETTER_H * scaleY;

    svgEl.setAttribute('viewBox', `0 0 ${vW} ${vH}`);
    svgEl.setAttribute('xmlns', NS);
    svgEl.setAttribute('shape-rendering', 'crispEdges');

    // Clear
    while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);

    // Gradient definition
    const defs = document.createElementNS(NS, 'defs');
    const grad = document.createElementNS(NS, 'linearGradient');
    grad.setAttribute('id', 'logo-sweep');
    grad.setAttribute('x1', '0%');
    grad.setAttribute('y1', '100%');
    grad.setAttribute('x2', '100%');
    grad.setAttribute('y2', '0%');

    const stops = [
      { offset: '0%',   color: 'var(--text)' },
      { offset: '52%',  color: 'var(--text)' },
      { offset: '72%',  color: '#FFE600' },
      { offset: '100%', color: '#FFE600' },
    ];
    stops.forEach(s => {
      const stop = document.createElementNS(NS, 'stop');
      stop.setAttribute('offset', s.offset);
      stop.setAttribute('stop-color', s.color);
      grad.appendChild(stop);
    });
    defs.appendChild(grad);
    svgEl.appendChild(defs);

    // Group
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('fill', 'url(#logo-sweep)');

    let curX = 0;
    chars.forEach(c => {
      if (c === 'SPACE') { curX += WORD_GAP * scaleX; return; }
      const matrix = GLYPHS[c];
      for (let row = 0; row < LETTER_H; row++) {
        for (let col = 0; col < LETTER_W; col++) {
          if (matrix[row][col]) {
            const rect = document.createElementNS(NS, 'rect');
            rect.setAttribute('x', curX + col * scaleX);
            rect.setAttribute('y', row * scaleY);
            rect.setAttribute('width', scaleX);
            rect.setAttribute('height', scaleY);
            g.appendChild(rect);
          }
        }
      }
      curX += (LETTER_W + GAP) * scaleX;
    });

    svgEl.appendChild(g);
  }

  function initLogos() {
    // Nav wordmark (small)
    const nav = document.getElementById('wordmark');
    if (nav) buildSVG(nav, 2, 2);

    // Hero wordmark (large — rendered into a wrapper)
    const heroWrap = document.getElementById('hero-wordmark-wrap');
    if (heroWrap) {
      const svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('xmlns', NS);
      heroWrap.appendChild(svg);
      buildSVG(svg, 4, 4);
    }

    // Footer wordmark (small)
    const footer = document.getElementById('footer-wordmark');
    if (footer) buildSVG(footer, 2, 2);

    // About / inner page small wordmarks
    document.querySelectorAll('.wordmark-inline').forEach(el => buildSVG(el, 2, 2));
  }

  // Re-draw on theme change so gradient CSS var resolves correctly
  function onThemeChange() {
    document.querySelectorAll('[id$="wordmark"], #hero-wordmark-wrap svg').forEach(el => {
      if (el.tagName === 'svg') buildSVG(el, el.viewBox.baseVal.width > 200 ? 4 : 2, el.viewBox.baseVal.height > 20 ? 4 : 2);
    });
  }

  document.addEventListener('DOMContentLoaded', initLogos);
  window.addEventListener('themechanged', onThemeChange);
})();
