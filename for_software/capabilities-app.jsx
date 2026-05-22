const { useState, useMemo, useEffect, useRef } = React;

// ============================================================
// Small inline icons
// ============================================================
const CapIcon = {
  Arrow: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" {...p}><path d="M5 12 H17 M13 8 L17 12 L13 16" /></svg>),
  ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" {...p}><path d="M19 12 H7 M11 8 L7 12 L11 16" /></svg>),
  Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" {...p}><path d="M12 4 V14 M8 10 L12 14 L16 10 M5 19 H19" /></svg>),
  Book: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M4 4 H10 C11 4 12 5 12 6 V20 C12 19 11 18 10 18 H4 Z" /><path d="M20 4 H14 C13 4 12 5 12 6 V20 C12 19 13 18 14 18 H20 Z" /></svg>),
  Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M5 12 L10 17 L19 7" /></svg>),
  Star: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2 L14.5 8.5 L21 9 L16 13.5 L17.5 20 L12 16.5 L6.5 20 L8 13.5 L3 9 L9.5 8.5 Z" /></svg>),
  Dot: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><circle cx="12" cy="12" r="4" /></svg>),
};

// ============================================================
// Header
// ============================================================
function CapHeader() {
  return (
    <header className="cap-nav">
      <a className="cap-back" href="Mechanical ExpertEase.html">
        <CapIcon.ArrowLeft width={16} height={16} />
        <span>Επιστροφή</span>
      </a>
      <div className="brand">
        <span className="brand-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9 H21 M9 3 V21" />
            <circle cx="15" cy="15" r="3" fill="currentColor" stroke="none" opacity=".4" />
          </svg>
        </span>
        <span className="brand-name">easemanual<span className="brand-tld">.eu</span></span>
      </div>
      <div className="cap-nav-cta">
        <button className="btn btn-ghost btn-sm">
          <CapIcon.Book width={14} height={14} /> Οδηγός
        </button>
        <button className="btn btn-primary btn-sm">
          <CapIcon.Download width={14} height={14} /> Λήψη
        </button>
      </div>
    </header>
  );
}

// ============================================================
// Hero / Title
// ============================================================
function CapTitle({ filter, setFilter, counts }) {
  return (
    <section className="cap-title">
      <div className="cap-eyebrow">
        <span className="eyebrow-rule" />
        <span>ΔΥΝΑΤΟΤΗΤΕΣ &nbsp;·&nbsp; v 4.2.1</span>
      </div>
      <h1 className="cap-h1">
        <span>Δεκαεπτά υπολογιστικά</span>
        <span className="cap-h1-accent">εργαλεία σε ένα.</span>
      </h1>
      <p className="cap-lede">
        Ένα πλήρες περιβάλλον αυτοματοποίησης τεχνικών μελετών για οχήματα ειδικής χρήσης
        — από τα φορτία πλαισίου μέχρι την ευστάθεια σε στροφή και τις συγκολλήσεις.
      </p>

      <div className="cap-stats">
        <Stat n="17" l="Υπολογιστικά εργαλεία" />
        <Stat n="04" l="Κατηγορίες" />
        <Stat n="12+" l="Ευρωπαϊκά πρότυπα" />
        <Stat n="100%" l="Συμμόρφωση ΥΑ 2020" />
      </div>

      <div className="cap-filters">
        {window.CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`cap-chip ${filter === c.id ? "is-on" : ""}`}
            onClick={() => setFilter(c.id)}
          >
            <span>{c.label}</span>
            <span className="cap-chip-n">{counts[c.id]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div className="cap-stat">
      <div className="cap-stat-n">{n}</div>
      <div className="cap-stat-l">{l}</div>
    </div>
  );
}

// ============================================================
// Featured Spotlight
// ============================================================
function Spotlight({ mod }) {
  const PreviewComp = window.Preview[mod.preview];
  return (
    <section className="cap-spotlight">
      <div className="cap-spot-visual">
        <div className="spot-corner spot-corner-tl" />
        <div className="spot-corner spot-corner-br" />
        <PreviewComp />
        {/* HUD overlays */}
        <div className="spot-hud spot-hud-tr">
          <span className="hud-dot" />
          <span>LIVE</span>
        </div>
        <div className="spot-hud spot-hud-bl">
          <span>MODULE · {mod.num}</span>
        </div>
      </div>

      <div className="cap-spot-text">
        <div className="cap-spot-num">{mod.num}</div>
        <h2 className="cap-spot-h">{mod.title}</h2>
        <p className="cap-spot-sub">{mod.sub}</p>
        <p className="cap-spot-body">{mod.summary}</p>

        {mod.highlights && (
          <ul className="cap-highlights">
            {mod.highlights.map((h, i) => (
              <li key={i}>
                <span className="hl-mark"><CapIcon.Check width={12} height={12} /></span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

// ============================================================
// Module grid card
// ============================================================
function ModuleCard({ mod, active, onClick }) {
  const PreviewComp = window.Preview[mod.preview];
  return (
    <button className={`cap-card ${active ? "is-active" : ""}`} onClick={onClick}>
      <div className="card-preview">
        <PreviewComp />
        <div className="card-corner card-corner-tl" />
        <div className="card-corner card-corner-br" />
      </div>
      <div className="card-body">
        <div className="card-head">
          <span className="card-num">{mod.num}</span>
          <span className="card-cat">{categoryLabel(mod.category)}</span>
        </div>
        <h3 className="card-title">{mod.title}</h3>
        <p className="card-sub">{mod.sub}</p>
        <div className="card-cta">
          <span>Προβολή</span>
          <CapIcon.Arrow width={14} height={14} />
        </div>
      </div>
    </button>
  );
}

function categoryLabel(id) {
  return (window.CATEGORIES.find((c) => c.id === id) || {}).label || "";
}

// ============================================================
// Footer band
// ============================================================
function CapFooter() {
  return (
    <footer className="cap-footer">
      <div className="cap-footer-card">
        <div className="cap-footer-text">
          <div className="cap-eyebrow">
            <span className="eyebrow-rule" />
            <span>ΕΤΟΙΜΟΙ ΝΑ ΞΕΚΙΝΗΣΕΤΕ;</span>
          </div>
          <h2>Δοκιμάστε το Mechanical ExpertEase δωρεάν για 30 ημέρες.</h2>
          <p>Πλήρης πρόσβαση σε όλα τα 17 υπολογιστικά εργαλεία και στη βιβλιοθήκη προτύπων.</p>
        </div>
        <div className="cap-footer-cta">
          <a className="btn btn-primary" href="Mechanical ExpertEase.html">
            <CapIcon.Download width={18} height={18} />
            <span>Ζητήστε Δοκιμαστική</span>
            <CapIcon.Arrow width={18} height={18} className="btn-arrow" />
          </a>
          <a className="btn btn-ghost" href="Mechanical ExpertEase.html">
            <CapIcon.Book width={18} height={18} />
            <span>Πλήρης Οδηγός</span>
          </a>
        </div>
      </div>
      <div className="cap-foot-strip">
        <span>© 2026 easemanual.eu</span>
        <span>ΥΑ 80255/4693/19/2020</span>
        <span>v 4.2.1</span>
      </div>
    </footer>
  );
}

// ============================================================
// Carousel — 3 visible, slow right-to-left auto, manual nudge
// ============================================================
function CapCarousel({ modules, activeId, onPick }) {
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const offsetRef = useRef(0);          // current translateX (negative)
  const halfWidthRef = useRef(0);       // width of the first (unduplicated) set
  const cardStepRef = useRef(0);        // width of one card + gap, for nudges
  const pausedRef = useRef(false);
  const nudgeUntilRef = useRef(0);      // ts; while > now, autoscroll paused after a manual nudge

  // Pair up modules into columns of 2 (3 columns visible = 6 cards)
  const columns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < modules.length; i += 2) {
      cols.push(modules.slice(i, i + 2));
    }
    return cols;
  }, [modules]);

  // Duplicate the columns so we can loop seamlessly
  const looped = useMemo(() => [...columns, ...columns], [columns]);

  // Measure card step + half width
  useEffect(() => {
    function measure() {
      const track = trackRef.current;
      if (!track) return;
      const cells = track.querySelectorAll(".carousel-cell");
      if (cells.length < 2) return;
      const a = cells[0].getBoundingClientRect();
      const b = cells[1].getBoundingClientRect();
      cardStepRef.current = b.left - a.left;
      halfWidthRef.current = cardStepRef.current * columns.length;
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [columns]);

  // RAF loop — slow continuous scroll
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const SPEED = 22; // px per second — slow

    function tick(t) {
      const dt = (t - last) / 1000;
      last = t;
      const half = halfWidthRef.current;
      if (half > 0 && !pausedRef.current && t > nudgeUntilRef.current) {
        offsetRef.current -= SPEED * dt;
        // wrap
        if (offsetRef.current <= -half) offsetRef.current += half;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function nudge(dir) {
    const step = cardStepRef.current || 320;
    const half = halfWidthRef.current;
    offsetRef.current -= dir * step;
    if (half > 0) {
      if (offsetRef.current <= -half) offsetRef.current += half;
      if (offsetRef.current > 0) offsetRef.current -= half;
    }
    if (trackRef.current) {
      trackRef.current.style.transition = "transform .45s cubic-bezier(.4,.0,.2,1)";
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      setTimeout(() => { if (trackRef.current) trackRef.current.style.transition = ""; }, 460);
    }
    // Pause auto-scroll briefly after a nudge so the animation reads cleanly
    nudgeUntilRef.current = performance.now() + 1200;
  }

  return (
    <div
      className="cap-carousel"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <button className="carousel-arrow carousel-prev" onClick={() => nudge(-1)} aria-label="Προηγούμενο">
        <CapIcon.ArrowLeft width={18} height={18} />
      </button>
      <button className="carousel-arrow carousel-next" onClick={() => nudge(1)} aria-label="Επόμενο">
        <CapIcon.Arrow width={18} height={18} />
      </button>

      <div className="carousel-viewport" ref={viewportRef}>
        <div className="carousel-track" ref={trackRef}>
          {looped.map((col, i) => (
            <div className="carousel-cell" key={`col-${i}`}>
              {col.map((m) => (
                <ModuleCard
                  key={`${m.id}-${i}`}
                  mod={m}
                  active={m.id === activeId}
                  onClick={() => onPick(m.id)}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="carousel-fade carousel-fade-l" />
        <div className="carousel-fade carousel-fade-r" />
      </div>
    </div>
  );
}

// ============================================================
// App
// ============================================================
function CapApp() {
  const MODULES = window.MODULES;
  const [activeId, setActiveId] = useState("mnq");
  const userOverrodeRef = useRef(false);

  // Auto-cycle the spotlight every 6s; pause permanently once the user picks.
  useEffect(() => {
    const t = setInterval(() => {
      if (userOverrodeRef.current) return;
      setActiveId((cur) => {
        const i = MODULES.findIndex((m) => m.id === cur);
        return MODULES[(i + 1) % MODULES.length].id;
      });
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const active = MODULES.find((m) => m.id === activeId);

  function pick(id) {
    userOverrodeRef.current = true;
    setActiveId(id);
    const el = document.querySelector(".cap-spotlight");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <div className="cap-app">
      <Spotlight mod={active} />

      <section className="cap-grid-section">
        <div className="cap-grid-head">
          <h2>Όλες οι Δυνατότητες</h2>
          <span className="cap-grid-count">{MODULES.length}</span>
        </div>
        <CapCarousel modules={MODULES} activeId={activeId} onPick={pick} />
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CapApp />);
