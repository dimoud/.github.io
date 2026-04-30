/* ═══════════════════════════════════════════════════════════════
   wd-animation.js
   "Particle → Wireframe → Website → Dissolve" build animation
   for webdesign.html
   Canvas is position:fixed full-viewport so particles stream from
   the true page borders and overlay all page content.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const canvas = document.getElementById('wdAnimCanvas');
  if (!canvas) return;

  const ctx   = canvas.getContext('2d');
  let W, H, raf, frame = 0;

  /* container rect — where the wireframe lives in the viewport */
  let CX = 0, CY = 0, CW = 700, CH = 520;

  /* ── PALETTE ─────────────────────────────────────────────── */
  const C = {
    navy:   [8,  15,  30],
    navyMid:[15, 29,  56],
    blue:   [37, 99,  235],
    lt:     [96, 165, 250],
    white:  [255,255, 255],
    amber:  [251,191,  36],
    red:    [239, 68,  68],
    green:  [34,  197,  94],
    gold:   [251,191,  36],
  };
  const SPHERE_COLORS = [C.lt, C.blue, C.amber, C.red, C.green, C.gold];
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

  /* ── PHASE ENGINE ────────────────────────────────────────── */
  const PHASES = ['chaos', 'assemble', 'wireframe', 'render', 'hold', 'dissolve'];
  const DUR    = { chaos:170, assemble:140, wireframe:65, render:85, hold:180, dissolve:120 };
  let pIdx = 0, pFrame = 0;
  let scrollUnlocked = false;

  const phase = () => PHASES[pIdx];
  const prog  = () => Math.min(1, pFrame / DUR[phase()]);
  const tick  = () => {
    if (++pFrame >= DUR[phase()]) { pIdx = (pIdx+1) % PHASES.length; pFrame = 0; }
    /* unlock scroll on mobile once the animation has reached 'hold' */
    if (!scrollUnlocked && phase() === 'hold' && window.innerWidth <= 820) {
      scrollUnlocked = true;
      document.body.style.overflow = '';
    }
  };

  const easeOut  = t => 1 - (1-t)**3;
  const easeIn   = t => t**3;
  const easeInOut= t => t < .5 ? 4*t**3 : 1 - (-2*t+2)**3/2;
  const lerp     = (a, b, t) => a + (b - a) * t;
  const clamp    = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /* wireframe scale, horizontal shift & vertical offset (recalculated on resize for mobile) */
  let WIRE_SCALE    = 1.1;
  let WIRE_SHIFT    = -0.05;
  const WIRE_OFFSET_Y = 50;   /* px — shift wireframe down */

  /* ── WIREFRAME LAYOUT (normalised 0-1 relative to container) */
  function getLayout() {
    const sm = CW < 560;
    const p  = sm ? 0.04 : 0.055;
    const T  = 0.035;
    const MR = 0.60;

    return [
      { x:p,    y:T,          w:1-2*p,      h:0.050, t:'nav',    tag:'<nav>' },
      { x:p,    y:T+0.068,    w:MR-p-0.025, h:0.235, t:'hero',   tag:'<section>' },
      { x:p+.02,y:T+0.082,    w:0.290,      h:0.023, t:'line',   tag:null },
      { x:p+.02,y:T+0.113,    w:0.240,      h:0.023, t:'line',   tag:null },
      { x:p+.02,y:T+0.150,    w:0.175,      h:0.014, t:'line',   tag:null },
      { x:p+.02,y:T+0.173,    w:0.095,      h:0.024, t:'btn',    tag:null },
      { x:p+.13,y:T+0.173,    w:0.080,      h:0.024, t:'btn',    tag:null },
      { x:MR,   y:T+0.068,    w:1-p-MR,     h:0.235, t:'canvas', tag:'<canvas>' },
      { x:MR+.01,y:T+0.085,   w:1-p-MR-.02, h:0.200, t:'inner',  tag:null },
      ...[0,1,2].map(i => {
        const cw = (1-2*p-2*.022)/3;
        return { x:p+i*(cw+.022), y:T+0.325, w:cw, h:0.165, t:'card', tag:'<div>' };
      }),
      ...[0,1,2].flatMap(i => {
        const cw = (1-2*p-2*.022)/3;
        const cx = p+i*(cw+.022);
        return [
          { x:cx+.015, y:T+0.352, w:cw*.55, h:0.013, t:'line', tag:null },
          { x:cx+.015, y:T+0.373, w:cw*.75, h:0.011, t:'line', tag:null },
          { x:cx+.015, y:T+0.390, w:cw*.65, h:0.011, t:'line', tag:null },
        ];
      }),
      { x:p,    y:T+0.512,    w:1-2*p,      h:0.044, t:'footer', tag:'<footer>' },
    ];
  }

  /* ── TARGET POINT GENERATION (coords in viewport/canvas space) */
  function makeTargets(layout) {
    const pts = [];

    layout.forEach(r => {
      /* map normalised layout to container pixels */
      const rx = r.x*CW, ry = r.y*CH, rw = r.w*CW, rh = r.h*CH;

      if (r.t === 'line' || r.t === 'btn' || r.t === 'inner') {
        const cols = Math.max(2, Math.round(rw / 8));
        const rows = Math.max(1, Math.round(rh / 8));
        for (let c = 0; c < cols; c++)
          for (let ro = 0; ro < rows; ro++)
            pts.push({ x: rx + (c+.5)*rw/cols, y: ry + (ro+.5)*rh/rows, r });
        return;
      }

      const perim = 2*(rw+rh);
      const n     = Math.max(10, Math.round(perim / 7));
      for (let i = 0; i < n; i++) {
        const t = (i / n) * perim;
        let px, py;
        if      (t < rw)      { px = rx + t;             py = ry; }
        else if (t < rw+rh)   { px = rx + rw;            py = ry + (t-rw); }
        else if (t < 2*rw+rh) { px = rx + rw-(t-rw-rh); py = ry + rh; }
        else                   { px = rx;                 py = ry + rh-(t-2*rw-rh); }
        pts.push({ x: px, y: py, r });
      }

      const area = rw * rh;
      const ni   = Math.round(area / 3800);
      for (let i = 0; i < ni; i++)
        pts.push({ x: rx + Math.random()*rw, y: ry + Math.random()*rh, r });
    });

    return pts;
  }

  /* ── PARTICLES ───────────────────────────────────────────── */
  const N = 480;
  let pts = [];

  function initParticles() {
    const layout  = getLayout();
    const targets = makeTargets(layout);

    /* shift & scale into viewport coords using container position */
    targets.forEach(t => {
      t.x = CX + CW * WIRE_SHIFT + t.x * WIRE_SCALE;
      t.y = CY + WIRE_OFFSET_Y + t.y * WIRE_SCALE;
    });

    pts = Array.from({ length: N }, (_, i) => {
      const tgt = targets[i % targets.length];
      const col = SPHERE_COLORS[Math.floor(Math.random() * SPHERE_COLORS.length)];
      const isBig = Math.random() > 0.75;

      /* start from true viewport (page) borders — left, right, top */
      const edge = Math.floor(Math.random() * 3);
      let sx, sy;
      if      (edge === 0) { sx = 0;                 sy = Math.random() * H; }
      else if (edge === 1) { sx = W;                 sy = Math.random() * H; }
      else                 { sx = Math.random() * W; sy = 0; }

      return {
        x:  sx,
        y:  sy,
        vx: (Math.random()-.5) * 1.4,
        vy: (Math.random()-.5) * 1.4,
        tx: tgt.x,
        ty: tgt.y,
        rect: tgt.r,
        sz: isBig ? 1.8 + Math.random()*0.6 : 0.9 + Math.random()*0.8,
        col,
        a:  0.45 + Math.random() * 0.45,
        φ:  Math.random() * Math.PI * 2,
        speed: 0.7 + Math.random() * 0.6,
      };
    });
  }

  /* ── WIREFRAME DRAW ─────────────────────────────────────── */
  function drawWireframe(ph, pr) {
    const layout = getLayout();

    let wireA = 0, fillA = 0, labelA = 0, cornerA = 0;

    if (ph === 'assemble')  { wireA = easeOut(pr) * 0.35; }
    if (ph === 'wireframe') { wireA = 0.35 + easeOut(pr) * 0.60; cornerA = easeOut(pr); }
    if (ph === 'render')    { wireA = 0.95; fillA = easeOut(pr) * 0.22; labelA = easeOut(clamp((pr-0.4)/0.6,0,1)); cornerA = 1; }
    if (ph === 'hold')      { wireA = 0.95; fillA = 0.22; labelA = 1; cornerA = 1; }
    if (ph === 'dissolve')  { wireA = (1-pr) * 0.95; fillA = (1-pr) * 0.22; labelA = (1-pr); cornerA = (1-pr); }


    /* transform: place wireframe in container, scaled */
    ctx.save();
    ctx.translate(CX + CW * WIRE_SHIFT, CY + WIRE_OFFSET_Y);
    ctx.scale(WIRE_SCALE, WIRE_SCALE);

    layout.forEach(r => {
      const rx = r.x*CW, ry = r.y*CH, rw = r.w*CW, rh = r.h*CH;
      const isStructural = (r.t !== 'line' && r.t !== 'btn' && r.t !== 'inner');

      if (fillA > 0) {
        let fa = fillA;
        if (r.t === 'hero' || r.t === 'canvas') fa *= 0.6;
        if (r.t === 'nav'  || r.t === 'footer') fa *= 0.5;
        if (r.t === 'card') fa *= 0.7;
        if (r.t === 'line' || r.t === 'btn')    fa *= 1.1;
        if (r.t === 'inner') fa *= 0.15;
        const fillCol = (r.t === 'btn') ? C.blue : C.lt;
        ctx.fillStyle = rgba(fillCol, clamp(fa, 0, 0.9));
        ctx.fillRect(rx, ry, rw, rh);
      }

      if (wireA > 0 && isStructural) {
        ctx.save();
        ctx.strokeStyle = rgba(C.lt, wireA * 0.75);
        ctx.lineWidth   = 1.2;
        if (ph === 'wireframe') {
          const dashLen = 2*(rw+rh);
          ctx.setLineDash([dashLen * easeOut(pr), dashLen]);
          ctx.lineDashOffset = 0;
        } else {
          if (ph === 'hold') {
            const pulse = (Math.sin(frame * 0.045) + 1) / 2;
            ctx.shadowBlur  = 4 + pulse * 6;
            ctx.shadowColor = rgba(C.lt, 0.55);
          }
          ctx.setLineDash([]);
        }
        ctx.strokeRect(rx, ry, rw, rh);
        ctx.restore();
      }

      if (cornerA > 0 && isStructural && r.t !== 'footer') {
        const s = 6;
        ctx.save();
        ctx.strokeStyle = rgba(C.amber, cornerA * 0.9);
        ctx.lineWidth = 1.5;
        [[rx,ry],[rx+rw,ry],[rx,ry+rh],[rx+rw,ry+rh]].forEach(([cx,cy], ci) => {
          const sx = (ci%2 === 0) ? 1 : -1;
          const sy = (ci < 2)     ? 1 : -1;
          ctx.beginPath();
          ctx.moveTo(cx + sx*s, cy);
          ctx.lineTo(cx, cy);
          ctx.lineTo(cx, cy + sy*s);
          ctx.stroke();
        });
        ctx.restore();
      }

      if (labelA > 0 && r.tag && isStructural) {
        const fs = clamp(Math.round(rh * 0.22), 7, 10);
        ctx.font      = `${fs}px 'IBM Plex Mono', monospace`;
        ctx.fillStyle = rgba(C.lt, labelA * 0.55);
        ctx.fillText(r.tag, rx + 5, ry + fs + 3);
      }
    });

    ctx.restore();
  }

  /* ── CONNECTION LINES during assembly ───────────────────── */
  function drawConnections(pr) {
    if (pr < 0.3) return;
    const alpha  = easeOut((pr - 0.3) / 0.7) * 0.12;
    const thresh = 28;
    ctx.strokeStyle = rgba(C.lt, alpha);
    ctx.lineWidth   = 0.5;
    ctx.beginPath();
    const step = Math.max(1, Math.floor(N / 120));
    for (let i = 0; i < N; i += step) {
      const a = pts[i];
      for (let j = i + step; j < N; j += step) {
        const b  = pts[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        if (dx*dx + dy*dy < thresh*thresh) {
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
      }
    }
    ctx.stroke();
  }

  /* ── MAIN DRAW LOOP ─────────────────────────────────────── */
  function draw() {
    raf = requestAnimationFrame(draw);
    frame++;
    tick();

    const ph = phase();
    const pr = prog();

    /* Track container position every frame so the wireframe stays
       locked to the element even when the page is scrolled */
    const cr = canvas.parentElement.getBoundingClientRect();
    const dX = cr.left - CX;
    const dY = cr.top  - CY;
    if (dX !== 0 || dY !== 0) {
      CX = cr.left;
      CY = cr.top;
      pts.forEach(p => { p.tx += dX; p.ty += dY; p.x += dX; p.y += dY; });
    }

    ctx.clearRect(0, 0, W, H);

    pts.forEach(p => {
      if (ph === 'chaos') {
        p.x += p.vx * p.speed;
        p.y += p.vy * p.speed;
        if (p.x < -2)  p.x = W+2;
        if (p.x > W+2) p.x = -2;
        if (p.y < -2)  p.y = H+2;
        if (p.y > H+2) p.y = -2;

      } else if (ph === 'assemble') {
        const k = 0.052 + 0.038 * pr;
        p.x += (p.tx - p.x) * k;
        p.y += (p.ty - p.y) * k;

      } else if (ph === 'wireframe' || ph === 'render') {
        p.x += (p.tx - p.x) * 0.14;
        p.y += (p.ty - p.y) * 0.14;

      } else if (ph === 'hold') {
        const wobble = 0.35;
        p.x += (p.tx - p.x) * 0.12 + Math.sin(frame*.055 + p.φ) * wobble;
        p.y += (p.ty - p.y) * 0.12 + Math.cos(frame*.043 + p.φ) * wobble;

      } else if (ph === 'dissolve') {
        /* explode outward from container centre */
        const dx = p.tx - (CX + CW * 0.5);
        const dy = p.ty - (CY + CH * 0.5);
        const d  = Math.sqrt(dx*dx + dy*dy) || 1;
        const force = easeIn(pr) * 6;
        p.vx += (dx/d) * force * 0.12;
        p.vy += (dy/d) * force * 0.12;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x  += p.vx;
        p.y  += p.vy;
      }

      let alpha = p.a;
      let glow  = 0;

      if (ph === 'dissolve') alpha *= clamp(1 - pr * 1.1, 0, 1);
      if (ph === 'assemble') glow  = 3 * easeOut(pr);
      if (ph === 'hold') {
        const pulse = (Math.sin(frame * 0.048 + p.φ) + 1) / 2;
        glow  = pulse * 7;
        alpha = p.a * (0.65 + 0.35 * pulse);
      }
      if (ph === 'wireframe') glow = easeOut(pr) * 4;

      if (glow > 0.5) {
        ctx.shadowBlur  = glow;
        ctx.shadowColor = rgba(p.col, 0.8);
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
      ctx.fillStyle = rgba(p.col, alpha);
      ctx.fill();

      if (glow > 0.5) ctx.shadowBlur = 0;
    });

    if (ph === 'assemble') drawConnections(pr);
    if (ph !== 'chaos')    drawWireframe(ph, pr);
  }

  /* ── RESIZE ─────────────────────────────────────────────── */
  function resize() {
    /* canvas = full viewport */
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;

    /* container panel position within the viewport */
    const wrap = canvas.parentElement;
    const cr   = wrap.getBoundingClientRect();
    CX = cr.left;
    CY = cr.top;
    CW = cr.width  || 700;
    CH = cr.height || 520;

    /* on mobile, don't scale or shift — keep animation inside the container */
    WIRE_SCALE = CW < 520 ? 0.88 : 1.1;
    WIRE_SHIFT = CW < 520 ? 0.06 : -0.05;

    initParticles();
  }

  /* ── INIT ───────────────────────────────────────────────── */
  function init() {
    /* lock scroll on mobile until the animation forms */
    if (window.innerWidth <= 820) {
      document.body.style.overflow = 'hidden';
    }

    requestAnimationFrame(() => {
      resize();

      if (window.ResizeObserver) {
        new ResizeObserver(resize).observe(canvas.parentElement);
      } else {
        window.addEventListener('resize', resize);
      }

      draw();
    });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
