/* ═══════════════════════════════════════════════════════════════
   print-estimator.js
   0. Hero slideshow
   1. Renders PRINT_PROJECTS using the exact same 2-column portfolio
      engine as index.html (thumb strip, drag-to-swap, modal,
      auto-cycle, coverflow on mobile)
   2. STL / STEP cost-estimator
═══════════════════════════════════════════════════════════════ */

/* ── 0. HERO SLIDESHOW ───────────────────────────────────────── */
(function initHeroSlider() {
  const LABELS = [
    'Bambu Lab X1 Series',
    'Multi-Colour Extruder',
  ];
  const INTERVAL = 5000;

  const slides    = document.querySelectorAll('.pr-hero-img');
  const dots      = document.querySelectorAll('.pr-hero-indicator');
  const labelEl   = document.getElementById('prHeroSlideLabel');
  const progressEl= document.getElementById('prHeroProgress');

  if (!slides.length) return;

  let current = 0;
  let timer   = null;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');

    /* update label */
    if (labelEl) {
      labelEl.classList.remove('visible');
      setTimeout(() => {
        labelEl.textContent = LABELS[current] || '';
        labelEl.classList.add('visible');
      }, 150);
    }

    /* restart progress bar */
    if (progressEl) {
      progressEl.classList.remove('running');
      progressEl.style.transition = 'none';
      progressEl.style.width = '0%';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        progressEl.style.transition = `width ${INTERVAL}ms linear`;
        progressEl.classList.add('running');
      }));
    }
  }

  function start() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  /* Dot clicks */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      start(); // reset auto-timer
    });
  });

  /* Kick off */
  goTo(0);
  start();
})();

/* ── 1. PRINT PORTFOLIO ENGINE ───────────────────────────────── */
(function initPrintPortfolio() {
  if (typeof PRINT_PROJECTS === 'undefined' || !PRINT_PROJECTS.length) return;

  const DATA = PRINT_PROJECTS;

  let pLeft  = 0;
  let pRight = 1 % DATA.length;
  let pTimer = null;
  const colImgIdx    = { prColLeft: 0, prColRight: 0 };
  const colImgTimers = { prColLeft: null, prColRight: null };
  let thumbScrollTimer    = null;
  let thumbScrollPaused   = false;
  let thumbScrollResumeId = null;

  /* ── Dots ── */
  function initDots() {
    const c = document.getElementById('prDots');
    if (!c) return;
    c.innerHTML = '';
    DATA.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'port-dot';
      d.dataset.idx = i;
      d.setAttribute('aria-label', 'Project ' + (i + 1));
      d.addEventListener('click', () => {
        if (pLeft === i || pRight === i) return;
        pLeft = i;
        renderCol(document.getElementById('prColLeft'), pLeft, true);
        updateDots();
        resetTimer();
      });
      c.appendChild(d);
    });
  }

  function updateDots() {
    document.querySelectorAll('#prDots .port-dot').forEach((d, i) => {
      d.classList.toggle('active', i === pLeft || i === pRight);
    });
  }

  /* ── Col image cycle ── */
  function startColCycle(colEl, project) {
    const id = colEl.id;
    clearInterval(colImgTimers[id]);
    colImgIdx[id] = 0;
    if (project.images.length <= 1) return;
    colImgTimers[id] = setInterval(() => {
      colImgIdx[id] = (colImgIdx[id] + 1) % project.images.length;
      const img = colEl.querySelector('.port-img');
      if (!img) return;
      img.style.opacity = '0';
      setTimeout(() => { img.src = project.images[colImgIdx[id]]; img.style.opacity = '1'; }, 500);
    }, 5200);
  }

  /* ── Render one column ── */
  function renderCol(colEl, idx, animate) {
    if (!colEl) return;
    const p = DATA[idx];

    function fill() {
      const img = colEl.querySelector('.port-img');
      if (img) { img.src = p.images[0]; img.alt = p.titleEn; img.style.opacity = '1'; }
      const badge = colEl.querySelector('.port-badge');
      if (badge) { badge.textContent = ''; badge.style.display = 'none'; }
      const cat = colEl.querySelector('.port-cat');
      if (cat) cat.textContent = p.catEn;
      const title = colEl.querySelector('.port-title');
      if (title) title.textContent = p.titleEn;
      const desc = colEl.querySelector('.port-desc');
      if (desc) desc.textContent = p.descEn;
      colEl.classList.remove('port-fade-out');
      startColCycle(colEl, p);
    }

    if (animate) {
      colEl.classList.add('port-fade-out');
      setTimeout(fill, 420);
    } else {
      fill();
    }
  }

  /* ── Thumb strip ── */
  function buildThumbStrip() {
    const container = document.getElementById('prThumbStrip');
    if (!container) return;
    container.innerHTML = '';
    clearInterval(thumbScrollTimer);

    function makeItem(p, i) {
      const item = document.createElement('button');
      item.className = 'port-thumb-item';
      item.dataset.idx = i;
      const num = String(i + 1).padStart(2, '0');
      item.innerHTML = `
        <div class="port-thumb-img-wrap">
          <img class="port-thumb-img" src="${p.images[0]}" alt="${p.titleEn}" loading="lazy">
        </div>
        <div class="port-thumb-label">
          <span class="port-thumb-num">${num} &nbsp;</span>${p.titleEn}
        </div>`;
      item.addEventListener('click', () => openModal(i));
      return item;
    }

    if (DATA.length >= 4) {
      const inner = document.createElement('div');
      inner.className = 'port-thumb-inner';
      DATA.forEach((p, i) => inner.appendChild(makeItem(p, i)));
      DATA.forEach((p, i) => inner.appendChild(makeItem(p, i))); // duplicate for loop
      container.appendChild(inner);
      thumbScrollTimer = setInterval(() => {
        if (thumbScrollPaused) return;
        container.scrollLeft += 1.1;
        const inn = container.querySelector('.port-thumb-inner');
        if (inn && container.scrollLeft >= inn.scrollWidth / 2) container.scrollLeft -= inn.scrollWidth / 2;
      }, 16);
    } else {
      DATA.forEach((p, i) => container.appendChild(makeItem(p, i)));
    }

    container.addEventListener('mouseenter',  () => { thumbScrollPaused = true; });
    container.addEventListener('mouseleave',  () => {
      clearTimeout(thumbScrollResumeId);
      thumbScrollResumeId = setTimeout(() => { thumbScrollPaused = false; }, 1200);
    });
    container.addEventListener('touchstart',  () => { thumbScrollPaused = true; },  { passive: true });
    container.addEventListener('touchend',    () => {
      clearTimeout(thumbScrollResumeId);
      thumbScrollResumeId = setTimeout(() => { thumbScrollPaused = false; }, 1800);
    }, { passive: true });
    container.addEventListener('touchcancel', () => {
      clearTimeout(thumbScrollResumeId);
      thumbScrollResumeId = setTimeout(() => { thumbScrollPaused = false; }, 1800);
    }, { passive: true });
  }

  function initThumbNav() {
    const strip = document.getElementById('prThumbStrip');
    const prev  = document.getElementById('prThumbPrev');
    const next  = document.getElementById('prThumbNext');
    if (!strip || !prev || !next) return;
    const amt = 304;
    prev.addEventListener('click', () => {
      thumbScrollPaused = true;
      clearTimeout(thumbScrollResumeId);
      thumbScrollResumeId = setTimeout(() => { thumbScrollPaused = false; }, 2000);
      const inn = strip.querySelector('.port-thumb-inner');
      if (inn && strip.scrollLeft < amt + 50) strip.scrollLeft = inn.scrollWidth / 2 + strip.scrollLeft;
      strip.scrollBy({ left: -amt, behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      thumbScrollPaused = true;
      clearTimeout(thumbScrollResumeId);
      thumbScrollResumeId = setTimeout(() => { thumbScrollPaused = false; }, 2000);
      strip.scrollBy({ left: amt, behavior: 'smooth' });
    });
  }

  function setThumbActive(idx) {
    document.querySelectorAll('#prThumbStrip .port-thumb-item').forEach(el => {
      el.classList.toggle('active', Number(el.dataset.idx) === idx);
    });
  }

  /* ── Full render ── */
  function renderAll() {
    renderCol(document.getElementById('prColLeft'),  pLeft,  false);
    renderCol(document.getElementById('prColRight'), pRight, false);
    updateDots();
    buildThumbStrip();
  }

  /* ── Auto-cycle timer ── */
  function resetTimer() { clearInterval(pTimer); setTimeout(startTimer, 400); }
  function startTimer() {
    pTimer = setInterval(() => {
      const avail = DATA.map((_, i) => i).filter(i => i !== pLeft && i !== pRight);
      if (!avail.length) return;
      const ni = avail[Math.floor(Math.random() * avail.length)];
      if (Math.random() < 0.5) {
        pLeft = ni;
        renderCol(document.getElementById('prColLeft'), pLeft, true);
      } else {
        pRight = ni;
        renderCol(document.getElementById('prColRight'), pRight, true);
      }
      updateDots();
    }, 7000);
  }

  /* ── Drag-to-swap ── */
  function initDrag() {
    const leftEl  = document.getElementById('prColLeft');
    const rightEl = document.getElementById('prColRight');
    if (!leftEl || !rightEl) return;
    let activeCol = null, startX = 0, dx = 0, dragged = false;

    const onDown = (col, x) => { activeCol = col; startX = x; dx = 0; dragged = false; col.style.transition = 'transform .1s ease, opacity .28s ease'; };
    const onMove = (x) => {
      if (!activeCol) return;
      dx = x - startX;
      if (Math.abs(dx) > 6) dragged = true;
      if (dragged) activeCol.style.transform = `translateX(${dx * 0.22}px)`;
    };
    const onUp = () => {
      if (!activeCol) return;
      activeCol.style.transition = 'transform .35s cubic-bezier(.19,1,.22,1), opacity .28s ease';
      activeCol.style.transform = '';
      const isLeft = activeCol.id === 'prColLeft';
      if (dragged) {
        if (isLeft  && dx >  90) { const t = pLeft; pLeft = pRight; pRight = t; renderCol(document.getElementById('prColLeft'), pLeft, true); renderCol(document.getElementById('prColRight'), pRight, true); updateDots(); resetTimer(); }
        if (!isLeft && dx < -90) { const t = pLeft; pLeft = pRight; pRight = t; renderCol(document.getElementById('prColLeft'), pLeft, true); renderCol(document.getElementById('prColRight'), pRight, true); updateDots(); resetTimer(); }
      }
      activeCol = null; dragged = false; dx = 0;
    };

    [leftEl, rightEl].forEach(col => {
      col.addEventListener('mousedown',  e => { if (e.button === 0) onDown(col, e.clientX); });
      col.addEventListener('touchstart', e => onDown(col, e.touches[0].clientX), { passive: true });
    });
    document.addEventListener('mousemove', e => onMove(e.clientX));
    document.addEventListener('touchmove', e => { if (activeCol) onMove(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('mouseup',  onUp);
    document.addEventListener('touchend', onUp, { passive: true });
  }

  /* ── Click image → modal ── */
  function addImageClickHandlers() {
    ['prColLeft', 'prColRight'].forEach(colId => {
      const colEl = document.getElementById(colId);
      if (!colEl) return;
      const imgWrap = colEl.querySelector('.port-image-wrap');
      if (imgWrap) imgWrap.addEventListener('click', () => {
        openModal(colId === 'prColLeft' ? pLeft : pRight);
      });
    });
  }

  /* ══ MODAL ══════════════════════════════════════════════════ */
  let modalProject = null, modalImgIdx = 0;
  let cflowIdx = 0, cflowImages = [];

  function buildModal() {
    if (document.getElementById('prModal')) return;
    const m = document.createElement('div');
    m.id = 'prModal';
    m.className = 'port-modal';
    m.innerHTML = `
      <div class="port-modal-backdrop"></div>
      <div class="port-modal-panel">
        <button class="port-modal-close" id="prModalClose" aria-label="Close">✕</button>
        <div class="port-modal-gallery">
          <button class="port-modal-nav port-modal-prev" id="prModalPrev">‹</button>
          <img class="port-modal-img" id="prModalImg" src="" alt="">
          <button class="port-modal-nav port-modal-next" id="prModalNext">›</button>
          <div class="port-modal-img-counter" id="prModalCounter"></div>
          <div class="cflow-stage" id="prCflowStage"></div>
        </div>
        <div class="port-modal-dots-row" id="prModalDots"></div>
        <div class="port-modal-info">
          <div class="port-modal-cat"   id="prModalCat"></div>
          <h2  class="port-modal-title" id="prModalTitle"></h2>
          <p   class="port-modal-desc"  id="prModalDesc"></p>
        </div>
      </div>`;
    document.body.appendChild(m);

    document.getElementById('prModalClose').addEventListener('click', closeModal);
    m.querySelector('.port-modal-backdrop').addEventListener('click', closeModal);
    document.getElementById('prModalPrev').addEventListener('click', () => modalNav(-1));
    document.getElementById('prModalNext').addEventListener('click', () => modalNav(+1));
    document.addEventListener('keydown', e => {
      if (!m.classList.contains('open')) return;
      if (e.key === 'Escape')     closeModal();
      if (e.key === 'ArrowLeft')  modalNav(-1);
      if (e.key === 'ArrowRight') modalNav(+1);
    });

    const gallery = m.querySelector('.port-modal-gallery');
    let touchStartX = 0, touchActive = false;
    gallery.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX; touchActive = true;
      const stage = document.getElementById('prCflowStage');
      if (stage) stage.querySelectorAll('.cflow-card').forEach(c => c.classList.remove('cflow-snap'));
    }, { passive: true });
    gallery.addEventListener('touchmove', e => {
      if (!touchActive || window.innerWidth > 768) return;
      const ddx = e.touches[0].clientX - touchStartX;
      const stage = document.getElementById('prCflowStage');
      const w = stage ? stage.offsetWidth * 0.74 : 220;
      prCflowRender(-(ddx / w));
    }, { passive: true });
    gallery.addEventListener('touchend', e => {
      if (!touchActive) return;
      touchActive = false;
      const ddx = e.changedTouches[0].clientX - touchStartX;
      if (window.innerWidth <= 768) {
        const stage = document.getElementById('prCflowStage');
        const w = stage ? stage.offsetWidth * 0.74 : 220;
        const progress = -(ddx / w);
        if (progress > 0.28 && cflowIdx < cflowImages.length - 1) modalNav(1);
        else if (progress < -0.28 && cflowIdx > 0) modalNav(-1);
        else prCflowGoTo(cflowIdx);
      } else {
        if (Math.abs(ddx) > 40) modalNav(ddx < 0 ? 1 : -1);
      }
    }, { passive: true });

    let wheelCooldown = false;
    gallery.addEventListener('wheel', e => {
      if (wheelCooldown) return;
      const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 20) return;
      e.preventDefault();
      modalNav(delta > 0 ? 1 : -1);
      wheelCooldown = true;
      setTimeout(() => { wheelCooldown = false; }, 350);
    }, { passive: false });
  }

  /* Coverflow helpers */
  function prCflowRender(dragOffset) {
    const stage = document.getElementById('prCflowStage');
    if (!stage) return;
    const sw = stage.offsetWidth || 300;
    stage.querySelectorAll('.cflow-card').forEach((card, i) => {
      const off = i - cflowIdx - (dragOffset || 0);
      const absOff = Math.abs(off);
      const tx      = off * (sw * 0.74);
      const scale   = Math.max(0.86, 1 - absOff * 0.08);
      const opacity = Math.max(0, 1 - absOff * 0.52);
      card.style.transform = `translateX(${tx.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      card.style.opacity   = opacity.toFixed(3);
      card.style.zIndex    = Math.round(100 - absOff * 18);
    });
  }

  function prCflowGoTo(idx) {
    const stage = document.getElementById('prCflowStage');
    if (!stage) return;
    cflowIdx = Math.max(0, Math.min(cflowImages.length - 1, idx));
    stage.querySelectorAll('.cflow-card').forEach(c => c.classList.add('cflow-snap'));
    prCflowRender(0);
    setTimeout(() => {
      const s = document.getElementById('prCflowStage');
      if (s) s.querySelectorAll('.cflow-card').forEach(c => c.classList.remove('cflow-snap'));
    }, 460);
    modalImgIdx = cflowIdx;
    const counter = document.getElementById('prModalCounter');
    if (counter) counter.textContent = `${cflowIdx + 1} / ${cflowImages.length}`;
    document.querySelectorAll('#prModalDots .port-modal-dot').forEach((d, i) => d.classList.toggle('active', i === cflowIdx));
  }

  function buildCflowCards(images) {
    const stage = document.getElementById('prCflowStage');
    if (!stage) return;
    stage.innerHTML = '';
    cflowImages = images; cflowIdx = 0;
    images.forEach((src, i) => {
      const card = document.createElement('div');
      card.className = 'cflow-card';
      const img = document.createElement('img');
      img.src = src; img.alt = '';
      card.appendChild(img);
      card.addEventListener('click', () => { if (Math.abs(i - cflowIdx) >= 0.5) prCflowGoTo(i); });
      stage.appendChild(card);
    });
    prCflowRender(0);
  }

  function openModal(idx) {
    modalProject = DATA[idx]; modalImgIdx = 0;
    document.getElementById('prModalCat').textContent   = modalProject.catEn;
    document.getElementById('prModalTitle').textContent = modalProject.titleEn;
    document.getElementById('prModalDesc').textContent  = modalProject.descEn;
    /* build dots */
    const dc = document.getElementById('prModalDots');
    if (dc) {
      dc.innerHTML = '';
      modalProject.images.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'port-modal-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Image ' + (i + 1));
        d.addEventListener('click', () => modalSetImage(i));
        dc.appendChild(d);
      });
    }
    if (window.innerWidth <= 768) buildCflowCards(modalProject.images);
    modalSetImage(0);
    setThumbActive(idx);
    document.getElementById('prModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const m = document.getElementById('prModal');
    if (m) m.classList.remove('open');
    document.body.style.overflow = '';
  }

  function modalSetImage(idx) {
    if (!modalProject) return;
    modalImgIdx = (idx + modalProject.images.length) % modalProject.images.length;
    if (window.innerWidth <= 768) { prCflowGoTo(modalImgIdx); return; }
    const img = document.getElementById('prModalImg');
    img.style.opacity = '0';
    setTimeout(() => { img.src = modalProject.images[modalImgIdx]; img.alt = ''; img.style.opacity = '1'; }, 180);
    document.getElementById('prModalCounter').textContent = `${modalImgIdx + 1} / ${modalProject.images.length}`;
    document.querySelectorAll('#prModalDots .port-modal-dot').forEach((d, i) => d.classList.toggle('active', i === modalImgIdx));
    const prev = document.getElementById('prModalPrev');
    const next = document.getElementById('prModalNext');
    if (prev) prev.disabled = modalImgIdx === 0;
    if (next) next.disabled = modalImgIdx === modalProject.images.length - 1;
  }

  function modalNav(dir) {
    if (!modalProject) return;
    const ni = modalImgIdx + dir;
    if (ni < 0 || ni >= modalProject.images.length) return;
    modalSetImage(ni);
  }

  /* ── Boot ── */
  function boot() {
    initDots();
    renderAll();
    initDrag();
    addImageClickHandlers();
    initThumbNav();
    buildModal();
    setTimeout(startTimer, 3200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();


/* ── 2. COST ESTIMATOR ───────────────────────────────────────── */
(function initEstimator() {
  /* ── Constants ─────────────────────────────────────────────── */
  const FILAMENT_DENSITY  = 1.25;   // g/cm³  (PLA baseline)
  const WASTE_BUFFER      = 1.20;   // +10% purge/skirt + 10% overestimate buffer
  const ELECTRICITY_RATE  = 0.20;   // €/kWh
  const PRINTER_KW        = 0.15;   // avg kW draw (P1S / X1)
  const SPEED_MM_S        = 110;    // mm/s effective avg extrusion speed (P1S real-world)
  const LINE_WIDTH_MM     = 0.42;   // mm
  const TIME_OVERHEAD     = 1.35;   // travel / layer-change / start-end overhead multiplier

  /* €/g per material  (€25=0.025, €28=0.028, €30=0.030) */
  const MAT_RATE = { pla: 0.025, 'pla+': 0.028, petg: 0.028, abs: 0.030 };

  /* Price multipliers — applied to base cost (material + electricity) */
  const STRENGTH_PRICE_MULT = { '1.0': 0.88, '1.1': 1.00, '1.3': 1.20, '1.5': 1.44 };
  const LAYER_PRICE_MULT    = { '0.08': 1.44, '0.16': 1.20, '0.20': 1.00, '0.25': 0.90 };
  const INFILL_PRICE_MULT   = { '0.15': 0.90, '0.20': 1.00, '0.40': 1.10, '1.00': 1.21 };

  let state = {
    material:   'pla',
    infill:     0.20,   // fraction
    layerMm:    0.20,   // mm
    strength:   1.1,
    colour:     'white',
    multicolor: false,
    qty:        1,
    volume:     0,      // cm³
    bbox:       null
  };

  const drop       = document.getElementById('prEstDrop');
  const fileInput  = document.getElementById('prEstFileInput');
  const dropText   = document.getElementById('prEstDropText');
  const params     = document.getElementById('prEstParams');
  const matSel     = document.getElementById('prEstMaterial');
  const infillBtns = document.querySelectorAll('.pr-est-infill-btn[data-infill]');
  const colourBtns = document.querySelectorAll('.pr-est-colour-btn');
  const qtyMinus   = document.getElementById('prEstQtyMinus');
  const qtyPlus    = document.getElementById('prEstQtyPlus');
  const qtyVal     = document.getElementById('prEstQtyVal');
  const result     = document.getElementById('prEstResult');
  const priceEl    = document.getElementById('prEstPrice');
  const timeEl     = document.getElementById('prEstTime');
  const dimsEl     = document.getElementById('prEstDims');
  const viewerWrap = document.getElementById('prEstViewerWrap');
  const viewerEmpty= document.getElementById('prEstViewerEmpty');
  const viewerHint = document.getElementById('prEstViewerHint');
  const canvas     = document.getElementById('prEstCanvas');

  if (!drop) return;

  drop.addEventListener('click', e => { if (!e.target.closest('label')) fileInput.click(); });
  fileInput.addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });
  drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('drag-over'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('drag-over'));
  drop.addEventListener('drop', e => {
    e.preventDefault(); drop.classList.remove('drag-over');
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });

  matSel.addEventListener('change', () => { state.material = matSel.value; updateResult(); });

  infillBtns.forEach(btn => btn.addEventListener('click', () => {
    infillBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.infill = parseFloat(btn.dataset.infill);
    updateResult();
  }));

  document.querySelectorAll('.pr-est-layer-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.pr-est-layer-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.layerMm = parseFloat(btn.dataset.layer);
    updateResult();
  }));

  document.querySelectorAll('.pr-est-strength-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.pr-est-strength-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.strength = parseFloat(btn.dataset.strength);
    updateResult();
  }));

  const multicolorBtn = document.getElementById('prEstMulticolor');
  if (multicolorBtn) {
    multicolorBtn.addEventListener('click', () => {
      state.multicolor = !state.multicolor;
      multicolorBtn.textContent = state.multicolor ? 'Multicolor (AMS)' : 'Single Colour';
      multicolorBtn.classList.toggle('pr-est-multicolor-active', state.multicolor);
      updateResult();
    });
  }

  colourBtns.forEach(btn => btn.addEventListener('click', () => {
    colourBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.colour = btn.dataset.colour;
    updateMeshColour(btn.style.background);
  }));

  qtyMinus.addEventListener('click', () => { if (state.qty > 1)  { state.qty--; qtyVal.textContent = state.qty; updateResult(); } });
  qtyPlus.addEventListener('click',  () => { if (state.qty < 99) { state.qty++; qtyVal.textContent = state.qty; updateResult(); } });

  function handleFile(file) {
    const name = file.name.toLowerCase();
    const isSTL  = name.endsWith('.stl');
    const isSTEP = name.endsWith('.stp') || name.endsWith('.step');
    if (!isSTL && !isSTEP) { dropText.textContent = 'Unsupported file type. Use STL, STP or STEP.'; return; }
    dropText.innerHTML = `<strong>${file.name}</strong> — parsing…`;
    const reader = new FileReader();
    reader.onload = e => {
      if (isSTL) {
        parseSTL(e.target.result, file.name);
      } else {
        state.volume = Math.max(0.5, (file.size / 1024) * 0.12);
        state.bbox   = null;
        dropText.innerHTML = `<strong>${file.name}</strong> — STEP: upload STL for accurate estimate`;
        showStepPlaceholder();
        updateResult();
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function parseSTL(buffer, filename) {
    let geo;
    try { geo = isBinarySTL(buffer) ? parseBinarySTL(buffer) : parseAsciiSTL(buffer); }
    catch (e) { dropText.innerHTML = `<strong>${filename}</strong> — could not parse STL.`; return; }
    state.volume = Math.abs(geo.volume) / 1000;
    state.bbox   = geo.bbox;
    dropText.innerHTML = `<strong>${filename}</strong> — ready`;
    buildThreeScene(geo.vertices, geo.bbox);
    updateResult();
  }

  function isBinarySTL(buf) {
    const v = new DataView(buf);
    return buf.byteLength === 84 + v.getUint32(80, true) * 50;
  }

  function parseBinarySTL(buf) {
    const v = new DataView(buf);
    const n = v.getUint32(80, true);
    const verts = new Float32Array(n * 9);
    let vol = 0, x0=Infinity,y0=Infinity,z0=Infinity,x1=-Infinity,y1=-Infinity,z1=-Infinity;
    for (let i = 0; i < n; i++) {
      const b = 84 + i * 50 + 12;
      const ax=v.getFloat32(b,true),    ay=v.getFloat32(b+4,true),  az=v.getFloat32(b+8,true);
      const bx=v.getFloat32(b+12,true), by=v.getFloat32(b+16,true), bz=v.getFloat32(b+20,true);
      const cx=v.getFloat32(b+24,true), cy=v.getFloat32(b+28,true), cz=v.getFloat32(b+32,true);
      const idx = i * 9;
      verts[idx]=ax;verts[idx+1]=ay;verts[idx+2]=az;
      verts[idx+3]=bx;verts[idx+4]=by;verts[idx+5]=bz;
      verts[idx+6]=cx;verts[idx+7]=cy;verts[idx+8]=cz;
      vol += (ax*(by*cz-bz*cy) - ay*(bx*cz-bz*cx) + az*(bx*cy-by*cx)) / 6;
      x0=Math.min(x0,ax,bx,cx); x1=Math.max(x1,ax,bx,cx);
      y0=Math.min(y0,ay,by,cy); y1=Math.max(y1,ay,by,cy);
      z0=Math.min(z0,az,bz,cz); z1=Math.max(z1,az,bz,cz);
    }
    return { vertices: verts, volume: vol, bbox: { x: x1-x0, y: y1-y0, z: z1-z0 } };
  }

  function parseAsciiSTL(buf) {
    const text = new TextDecoder().decode(buf);
    const re = /vertex\s+([\d.eE+\-]+)\s+([\d.eE+\-]+)\s+([\d.eE+\-]+)/g;
    const pts = []; let m;
    while ((m = re.exec(text)) !== null) pts.push(+m[1], +m[2], +m[3]);
    const verts = new Float32Array(pts);
    let vol = 0, x0=Infinity,y0=Infinity,z0=Infinity,x1=-Infinity,y1=-Infinity,z1=-Infinity;
    for (let i = 0; i < pts.length; i += 9) {
      const ax=pts[i],ay=pts[i+1],az=pts[i+2], bx=pts[i+3],by=pts[i+4],bz=pts[i+5], cx=pts[i+6],cy=pts[i+7],cz=pts[i+8];
      vol += (ax*(by*cz-bz*cy) - ay*(bx*cz-bz*cx) + az*(bx*cy-by*cx)) / 6;
      x0=Math.min(x0,ax,bx,cx); x1=Math.max(x1,ax,bx,cx);
      y0=Math.min(y0,ay,by,cy); y1=Math.max(y1,ay,by,cy);
      z0=Math.min(z0,az,bz,cz); z1=Math.max(z1,az,bz,cz);
    }
    return { vertices: verts, volume: vol, bbox: { x: x1-x0, y: y1-y0, z: z1-z0 } };
  }

  /* ── Three.js viewer ── */
  let renderer = null, scene = null, camera = null, mesh = null, rafId = null;
  let isDragging = false, lastMX = 0, lastMY = 0, rotX = 0.4, rotY = 0.4;

  function buildThreeScene(vertices, bbox) {
    if (typeof THREE === 'undefined') {
      if (viewerEmpty) { viewerEmpty.style.display = 'flex'; viewerEmpty.querySelector('span').textContent = 'Three.js unavailable'; }
      return;
    }
    if (renderer) { renderer.dispose(); renderer = null; }
    cancelAnimationFrame(rafId);
    if (viewerEmpty) viewerEmpty.style.display = 'none';
    if (viewerHint)  viewerHint.style.display  = '';

    const W = viewerWrap.clientWidth  || 480;
    const H = viewerWrap.clientHeight || 360;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 10000);
    camera.position.set(0, 0, 2.2);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.computeVertexNormals();

    const colBtn = document.querySelector('.pr-est-colour-btn.active');
    const colHex = colBtn ? colBtn.style.background : '#2563eb';
    const mat = new THREE.MeshPhongMaterial({ color: new THREE.Color(colHex), specular: 0x334466, shininess: 30, side: THREE.DoubleSide });
    mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    geo.computeBoundingBox();
    const centre = new THREE.Vector3(); geo.boundingBox.getCenter(centre);
    mesh.position.set(-centre.x, -centre.y, -centre.z);
    const size = new THREE.Vector3(); geo.boundingBox.getSize(size);
    mesh.scale.setScalar(2 / Math.max(size.x, size.y, size.z));

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dl1 = new THREE.DirectionalLight(0xffffff, 0.9); dl1.position.set(1, 2, 3); scene.add(dl1);
    const dl2 = new THREE.DirectionalLight(0x6688cc, 0.4); dl2.position.set(-2,-1,-2); scene.add(dl2);

    function loop() { rafId = requestAnimationFrame(loop); if (mesh) { mesh.rotation.x = rotX; mesh.rotation.y = rotY; } renderer.render(scene, camera); }
    loop();

    canvas.addEventListener('mousedown', e => { isDragging=true; lastMX=e.clientX; lastMY=e.clientY; });
    window.addEventListener('mouseup',   () => { isDragging=false; });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      rotY += (e.clientX - lastMX) * 0.01; rotX += (e.clientY - lastMY) * 0.01;
      lastMX=e.clientX; lastMY=e.clientY;
    });
    canvas.addEventListener('touchstart', e => { isDragging=true; lastMX=e.touches[0].clientX; lastMY=e.touches[0].clientY; }, { passive:true });
    canvas.addEventListener('touchend',   () => { isDragging=false; }, { passive:true });
    canvas.addEventListener('touchmove',  e => {
      if (!isDragging) return;
      rotY += (e.touches[0].clientX - lastMX) * 0.012; rotX += (e.touches[0].clientY - lastMY) * 0.012;
      lastMX=e.touches[0].clientX; lastMY=e.touches[0].clientY;
    }, { passive:true });
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      camera.position.z = Math.max(0.5, Math.min(20, camera.position.z + e.deltaY * 0.003));
    }, { passive:false });
  }

  function updateMeshColour(css) {
    if (!mesh) return;
    mesh.material.color.set(new THREE.Color(css));
  }

  function showStepPlaceholder() {
    if (viewerEmpty) { viewerEmpty.style.display = 'flex'; viewerEmpty.querySelector('span').textContent = 'STEP: upload STL for accurate 3D preview & estimate'; }
  }

  function updateResult() {
    if (!state.volume) return;
    const V = state.volume; // cm³

    /* ── A. Filament weight ────────────────────────────────────
       STL volume is the true geometric solid volume of the shape.
       The slicer fills it with: infill core + perimeter/skin shells.
       Shell walls are an additive offset on top of infill (they exist
       regardless of infill %). Shell addition scales with strength.
       Calibrated: real part 262cm³ → 120g at 20% infill default strength
       → effFrac = 0.366 → shell_addition = 0.366 - 0.20 = 0.166
    ──────────────────────────────────────────────────────────── */
    const SHELL_ADD_BASE = 0.14; // additive shell/skin fraction at strength=1.0
    const shellAdd  = SHELL_ADD_BASE * state.strength;
    const effFrac   = Math.min(1.0, state.infill + shellAdd);
    const W = V * FILAMENT_DENSITY * effFrac * WASTE_BUFFER;

    /* ── B. Print time (hours) ─────────────────────────────────
       Drive time from extruded plastic volume, not bounding-box volume.
       Flow rate (mm³/s) = speed × layer_height × line_width
    ──────────────────────────────────────────────────────────── */
    const flowMm3s   = SPEED_MM_S * state.layerMm * LINE_WIDTH_MM;
    const plasticMm3 = (W / FILAMENT_DENSITY) * 1000;
    const timeHrs    = (plasticMm3 / flowMm3s) * TIME_OVERHEAD / 3600;

    /* ── C. Costs per part ─────────────────────────────────────*/
    const filamentRate    = MAT_RATE[state.material] || 0.025;
    const matCostPerPart  = W * filamentRate * (state.multicolor ? 2.0 : 1.0);
    const elecCostPerPart = timeHrs * PRINTER_KW * ELECTRICITY_RATE;
    const baseCostPerPart = matCostPerPart + elecCostPerPart;

    /* ── Price adjustment multipliers ─────────────────────────*/
    const strengthKey = String(state.strength);
    const layerKey    = state.layerMm.toFixed(2);
    const infillKey   = state.infill.toFixed(2);
    const priceMult   = (STRENGTH_PRICE_MULT[strengthKey] || 1.0)
                      * (LAYER_PRICE_MULT[layerKey]        || 1.0)
                      * (INFILL_PRICE_MULT[infillKey]      || 1.0);

    /* ── D. Profit tier ────────────────────────────────────────*/
    const N = state.qty;
    let profit;
    if (N < 5)        profit = 10;
    else if (N < 10)  profit = 8;
    else if (N < 15)  profit = 6;
    else              profit = 4;

    /* ── E. Total ──────────────────────────────────────────────*/
    const total = (baseCostPerPart * priceMult + profit) * N;

    /* ── Filament length (1.75mm dia, 0.4mm nozzle) ───────────
       Filament rod volume = plastic volume extruded
       L = plasticMm³ / (π × r²)  where r = 0.875mm
    ──────────────────────────────────────────────────────────── */
    const filamentLenMm = plasticMm3 / (Math.PI * 0.875 * 0.875);
    const filamentLenM  = (filamentLenMm / 1000).toFixed(2);

    /* ── Display ───────────────────────────────────────────────*/
    priceEl.textContent = `€${total.toFixed(2)}`;

    const totalTimeHrs = timeHrs * N;
    const hh = Math.floor(totalTimeHrs);
    const mm = Math.round((totalTimeHrs - hh) * 60);
    // timeEl.textContent = hh > 0 ? `${hh}h ${mm}m` : `${mm}m`;

    dimsEl.textContent = state.bbox
      ? `Bounding box: ${state.bbox.x.toFixed(1)} × ${state.bbox.y.toFixed(1)} × ${state.bbox.z.toFixed(1)} mm  ·  Volume ≈ ${V.toFixed(2)} cm³`
      : `Estimated volume: ~${V.toFixed(2)} cm³`;

    // const filamentEl = document.getElementById('prEstFilamentRow');
    // if (filamentEl) {
    //   const totalW = (W * N).toFixed(1);
    //   const totalL = ((filamentLenMm * N) / 1000).toFixed(2);
    //   filamentEl.innerHTML =
    //     `Material: <span>${totalW}g</span>&nbsp;&nbsp;·&nbsp;&nbsp;Filament: <span>${totalL}m</span>&nbsp;&nbsp;·&nbsp;&nbsp;1.75mm / 0.4mm nozzle`;
    // }

    result.style.display = '';
  }
})();
