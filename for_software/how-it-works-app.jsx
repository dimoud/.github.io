const { useState, useEffect, useRef } = React;

const STEPS = [
  { n: "01", label: "Εισαγωγή τεχνικών χαρακτηριστικών οχήματος",        doc: "data" },
  { n: "02", label: "Εισαγωγή φορτίων στους άξονες και το πλαίσιο",       doc: "loads" },
  { n: "03", label: "Αυτόματη εκτέλεση υπολογισμών",                       doc: "calc" },
  { n: "04", label: "Δημιουργία διαγραμμάτων τεμνουσών και ροπών κάμψης", doc: "diag" },
  { n: "05", label: "Ανασκόπηση συνοπτικού πίνακα αποτελεσμάτων",         doc: "summary" },
  { n: "06", label: "Δημιουργία πλήρους τεχνικής μελέτης με ένα κλικ",     doc: "report" },
];

// ============================================================
// Document stack — six layered sheets, active one is on top
// ============================================================
function DocStack({ activeIdx }) {
  const Docs = window.HIWDoc;

  // Layout each doc with a fanned offset; the active one comes to front.
  const layouts = STEPS.map((s, i) => {
    // Distance from the active item; >0 = below active, <0 = above
    const d = i - activeIdx;
    // fanned x/y offset & rotation based on d (further = more offset, lower zIndex)
    const direction = d > 0 ? 1 : -1;
    const mag = Math.abs(d);
    const x = mag === 0 ? 0 : direction * (60 + mag * 18);
    const y = mag === 0 ? 0 : direction * (24 + mag * 16);
    const rot = mag === 0 ? -2 : direction * (4 + mag * 2);
    const scale = 1 - mag * 0.04;
    return {
      transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`,
      zIndex: STEPS.length - mag,
      opacity: mag > 3 ? 0 : 1 - mag * 0.12,
    };
  });

  return (
    <div className="hiw-stack">
      {STEPS.map((s, i) => {
        const DocComp = Docs[s.doc];
        const active = i === activeIdx;
        return (
          <div
            key={s.n}
            className={`hiw-doc ${active ? "is-on" : ""}`}
            style={layouts[i]}
            aria-hidden={!active}
          >
            <div className="hiw-doc-shadow" />
            <DocComp />
            <div className="hiw-doc-tag">
              <span className="hiw-doc-dot" />
              <span>{s.n}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Steps list
// ============================================================
function StepsList({ activeIdx, setActiveIdx }) {
  return (
    <div className="hiw-steps">
      <div className="hiw-eyebrow">
        <span className="eyebrow-rule" />
        <span>ΠΩΣ&nbsp;&nbsp;ΛΕΙΤΟΥΡΓΕΙ</span>
      </div>

      <h1 className="hiw-h1">
        <span>Από τα τεχνικά</span>
        <span>χαρακτηριστικά</span>
        <span>στην τεχνική μελέτη</span>
        <span className="hiw-h1-accent">σε έξι βήματα.</span>
      </h1>

      <ul className="hiw-list">
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            className={`hiw-item ${i === activeIdx ? "is-on" : ""}`}
            onMouseEnter={() => setActiveIdx(i)}
            onClick={() => setActiveIdx(i)}
          >
            <span className="hiw-num">{s.n}</span>
            <span className="hiw-label">{s.label}</span>
            <span className="hiw-marker" />
          </li>
        ))}
      </ul>

      <div className="hiw-cta-row">
        <a className="hiw-cta-link" href="Mechanical ExpertEase.html">
          <span>Πλήρης Οδηγός Χρήσης</span>
          <window.HIWIcon.Arrow width={16} height={16} />
        </a>
        <a className="hiw-cta-link hiw-cta-secondary" href="Capabilities.html">
          <span>Όλες οι Δυνατότητες</span>
          <window.HIWIcon.Arrow width={16} height={16} />
        </a>
      </div>
    </div>
  );
}

// ============================================================
// App
// ============================================================
function HIWApp() {
  const [activeIdx, setActiveIdx] = useState(0);
  const userOverrodeRef = useRef(false);

  // Auto-cycle every 4.5s until the user interacts
  useEffect(() => {
    const t = setInterval(() => {
      if (userOverrodeRef.current) return;
      setActiveIdx((i) => (i + 1) % STEPS.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  function pick(i) {
    userOverrodeRef.current = true;
    setActiveIdx(i);
  }

  return (
    <div className="hiw-app">
      <div className="hiw-card">
        <DocStack activeIdx={activeIdx} />
        <StepsList activeIdx={activeIdx} setActiveIdx={pick} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<HIWApp />);
