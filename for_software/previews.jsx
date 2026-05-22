const { useState, useMemo } = React;

// ============================================================
// Shared bits used by the schematic previews
// ============================================================
const stroke = "#2E7BFF";
const strokeSoft = "#1a3a6b";
const strokeFaint = "#0e2247";

function GridBG({ w = 200, h = 120, step = 16 }) {
  const lines = [];
  for (let x = 0; x <= w; x += step) lines.push(<line key={`vx${x}`} x1={x} y1="0" x2={x} y2={h} stroke={strokeFaint} strokeWidth=".5" />);
  for (let y = 0; y <= h; y += step) lines.push(<line key={`hy${y}`} x1="0" y1={y} x2={w} y2={y} stroke={strokeFaint} strokeWidth=".5" />);
  return <g>{lines}</g>;
}

// ============================================================
// Schematic previews — small SVG mockups, one per module.
// All share the blueprint vocabulary: cyan stroke, dashed centerlines,
// grid background, mono annotations.
// ============================================================

const Preview = {
  // 01 MNQ — bending + shear plot over a chassis baseline
  mnq: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <path d="M10 60 H190" stroke={stroke} strokeWidth="1.2" strokeDasharray="3 3" opacity=".5" />
      {/* shear (sawtooth) */}
      <path d="M10 60 L40 60 L40 40 L80 40 L80 70 L120 70 L120 50 L160 50 L160 60 L190 60"
            stroke="#5aa6ff" fill="rgba(90,166,255,.15)" strokeWidth="1.4" />
      {/* bending (bell) */}
      <path d="M10 90 Q60 30 100 90 T190 90" stroke="#25d39a" fill="rgba(37,211,154,.12)" strokeWidth="1.4" />
      {/* axle marks */}
      {[40, 80, 120, 160].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="10" x2={x} y2="100" stroke="#ff5566" strokeWidth=".5" strokeDasharray="2 2" opacity=".7" />
          <text x={x + 2} y="16" fill="#ff5566" fontSize="5" fontFamily="ui-monospace, monospace">A{i + 1}</text>
        </g>
      ))}
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">M / Q · CHASSIS</text>
    </svg>
  ),

  // 02 Άξονες — top-down truck + axle load chips
  axles: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {/* truck body (top view) */}
      <rect x="30" y="40" width="140" height="40" rx="2" stroke={stroke} fill="rgba(46,123,255,.08)" />
      <rect x="30" y="40" width="30" height="40" stroke={stroke} fill="rgba(46,123,255,.18)" />
      {/* wheels */}
      {[[55, 32], [55, 84], [120, 32], [120, 84], [140, 32], [140, 84]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="14" height="8" rx="1" stroke={stroke} fill="#06122c" />
      ))}
      {/* load arrows */}
      {[[62, 26, "5.2t"], [127, 26, "9.5t"], [147, 26, "9.5t"]].map(([x, y, t], i) => (
        <g key={i}>
          <line x1={x} y1={y - 12} x2={x} y2={y - 2} stroke="#25d39a" strokeWidth="1" />
          <path d={`M${x - 2} ${y - 4} L${x} ${y - 1} L${x + 2} ${y - 4}`} stroke="#25d39a" strokeWidth="1" fill="none" />
          <text x={x - 5} y={y - 14} fill="#25d39a" fontSize="5" fontFamily="ui-monospace, monospace">{t}</text>
        </g>
      ))}
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">AXLE LOADS · TOP VIEW</text>
    </svg>
  ),

  // 03 Σχέδιο Α3 — A3 sheet preview
  a3: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <rect x="20" y="14" width="160" height="92" stroke={stroke} fill="#06122c" />
      {/* title block */}
      <rect x="120" y="80" width="56" height="22" stroke={stroke} fill="rgba(46,123,255,.08)" />
      <line x1="120" y1="88" x2="176" y2="88" stroke={stroke} strokeWidth=".5" />
      <line x1="120" y1="95" x2="176" y2="95" stroke={stroke} strokeWidth=".5" />
      {/* side-view truck silhouette */}
      <path d="M26 60 L40 60 L44 50 L70 50 L70 60 L150 60 L150 56 L165 56 L165 60 L172 60"
            stroke={stroke} fill="rgba(46,123,255,.10)" strokeWidth="1" />
      <circle cx="52" cy="64" r="4" stroke={stroke} fill="#06122c" />
      <circle cx="135" cy="64" r="4" stroke={stroke} fill="#06122c" />
      <circle cx="148" cy="64" r="4" stroke={stroke} fill="#06122c" />
      {/* chart strip */}
      <path d="M26 76 Q60 72 100 78 T172 74" stroke="#5aa6ff" fill="none" strokeWidth=".8" />
      <text x="20" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">A3 · 1:50 · PDF / DWG</text>
    </svg>
  ),

  // 04 Πλαίσιο — cross-section profiles
  frame: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {/* C profile */}
      <g transform="translate(30 30)">
        <path d="M0 0 H20 V4 H4 V40 H20 V44 H0 Z" stroke={stroke} fill="rgba(46,123,255,.15)" />
        <text y="56" x="2" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">C</text>
      </g>
      {/* I profile */}
      <g transform="translate(70 30)">
        <path d="M0 0 H24 V4 H14 V40 H24 V44 H0 V40 H10 V4 H0 Z" stroke={stroke} fill="rgba(46,123,255,.15)" />
        <text y="56" x="6" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">I</text>
      </g>
      {/* square tube */}
      <g transform="translate(110 30)">
        <rect width="24" height="44" stroke={stroke} fill="rgba(46,123,255,.15)" />
        <rect x="4" y="4" width="16" height="36" stroke={stroke} fill="#06122c" />
        <text y="56" x="6" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">RHS</text>
      </g>
      {/* O profile */}
      <g transform="translate(150 30)">
        <circle cx="12" cy="22" r="14" stroke={stroke} fill="rgba(46,123,255,.15)" />
        <circle cx="12" cy="22" r="10" stroke={stroke} fill="#06122c" />
        <text y="56" x="8" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">O</text>
      </g>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">SECTION LIBRARY · I, C, RHS, O</text>
    </svg>
  ),

  // 05 Τεχνικό Υπόμνημα — document preview
  memo: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <rect x="50" y="10" width="100" height="100" stroke={stroke} fill="#06122c" />
      <rect x="50" y="10" width="100" height="14" fill="rgba(46,123,255,.18)" stroke={stroke} />
      <text x="56" y="20" fill="#e8eefb" fontSize="6" fontFamily="ui-monospace, monospace" fontWeight="600">ΤΕΧΝΙΚΗ ΜΕΛΕΤΗ</text>
      {[32, 38, 44, 56, 62, 68, 74, 86, 92, 98].map((y, i) => (
        <line key={i} x1="56" y1={y} x2={140 - (i % 3) * 8} y2={y} stroke="#1a3a6b" strokeWidth=".5" />
      ))}
      <rect x="56" y="48" width="24" height="6" fill={stroke} opacity=".7" />
      <rect x="56" y="78" width="36" height="6" fill={stroke} opacity=".7" />
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">AUTO REPORT · DOCX / PDF</text>
    </svg>
  ),

  // 06 Δεξαμενή Άλατος — trapezoidal tank
  tank: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {/* truck */}
      <path d="M30 80 L40 80 L44 70 L60 70 L60 80 L130 80 L130 60 L70 60 L70 80" stroke={stroke} fill="rgba(46,123,255,.08)" />
      {/* tank trapezoid overlay */}
      <path d="M76 60 L124 60 L120 74 L80 74 Z" stroke="#25d39a" fill="rgba(37,211,154,.18)" strokeWidth="1.2" />
      <circle cx="45" cy="86" r="5" stroke={stroke} fill="#06122c" />
      <circle cx="115" cy="86" r="5" stroke={stroke} fill="#06122c" />
      <circle cx="128" cy="86" r="5" stroke={stroke} fill="#06122c" />
      {/* annotations */}
      <line x1="76" y1="54" x2="124" y2="54" stroke="#25d39a" strokeWidth=".5" />
      <text x="92" y="50" fill="#25d39a" fontSize="5" fontFamily="ui-monospace, monospace">V = 4.8 m³</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">TANK VOLUME · PRISMATIC</text>
    </svg>
  ),

  // 07 Αναρτήσεις — suspension diagram
  susp: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {/* chassis line */}
      <line x1="20" y1="40" x2="180" y2="40" stroke={stroke} strokeWidth="1.5" />
      <line x1="20" y1="90" x2="180" y2="90" stroke={stroke} strokeWidth="1.5" />
      {/* leaf springs */}
      {[55, 110, 150].map((x, i) => (
        <g key={i}>
          <path d={`M${x - 15} 45 Q${x} ${i === 0 ? 58 : 52} ${x + 15} 45`} stroke="#5aa6ff" fill="none" strokeWidth="1" />
          <path d={`M${x - 13} 47 Q${x} ${i === 0 ? 58 : 52} ${x + 13} 47`} stroke="#5aa6ff" fill="none" strokeWidth="1" />
          <rect x={x - 4} y="80" width="8" height="10" stroke={stroke} fill="rgba(46,123,255,.18)" />
          <line x1={x} y1="45" x2={x} y2="80" stroke={stroke} strokeWidth=".8" />
          <text x={x - 6} y="100" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">A{i + 1}</text>
        </g>
      ))}
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">SUSPENSION · LOAD PATHS</text>
    </svg>
  ),

  // 08 Ελατήρια — leaf spring profile + k value
  spring: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${30 + i * 4} ${60 + i * 4} Q100 ${30 - i * 2} ${170 - i * 4} ${60 + i * 4}`}
              stroke={i === 0 ? stroke : "#5aa6ff"} strokeWidth="1.2" fill="none" opacity={i === 0 ? 1 : 0.7 - i * 0.1} />
      ))}
      <circle cx="30" cy="60" r="3" stroke={stroke} fill="#06122c" />
      <circle cx="170" cy="60" r="3" stroke={stroke} fill="#06122c" />
      {/* force arrow */}
      <line x1="100" y1="20" x2="100" y2="38" stroke="#ff5566" strokeWidth="1.2" />
      <path d="M97 34 L100 40 L103 34" stroke="#ff5566" fill="none" strokeWidth="1.2" />
      <text x="104" y="28" fill="#ff5566" fontSize="6" fontFamily="ui-monospace, monospace">P</text>
      <text x="34" y="100" fill="#25d39a" fontSize="6" fontFamily="ui-monospace, monospace">k = 1.16 mm/kg</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">LEAF SPRING · DEFLECTION</text>
    </svg>
  ),

  // 09 Διάτμηση — bolt in shear
  shear: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <rect x="40" y="42" width="120" height="14" stroke={stroke} fill="rgba(46,123,255,.18)" />
      <rect x="40" y="62" width="120" height="14" stroke={stroke} fill="rgba(46,123,255,.10)" />
      {/* bolt */}
      <rect x="92" y="36" width="16" height="46" stroke={stroke} fill="rgba(46,123,255,.25)" />
      <rect x="86" y="32" width="28" height="6" stroke={stroke} fill="rgba(46,123,255,.35)" />
      <rect x="86" y="80" width="28" height="6" stroke={stroke} fill="rgba(46,123,255,.35)" />
      {/* arrows */}
      <line x1="20" y1="49" x2="36" y2="49" stroke="#ff5566" strokeWidth="1.5" />
      <path d="M32 47 L36 49 L32 51" stroke="#ff5566" strokeWidth="1.5" fill="none" />
      <line x1="180" y1="69" x2="164" y2="69" stroke="#ff5566" strokeWidth="1.5" />
      <path d="M168 67 L164 69 L168 71" stroke="#ff5566" strokeWidth="1.5" fill="none" />
      <text x="44" y="104" fill="#25d39a" fontSize="6" fontFamily="ui-monospace, monospace">τ = 9.98 N/mm²</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">BOLT · SINGLE SHEAR</text>
    </svg>
  ),

  // 10 Σύνθετη Κοχλία — combined load
  combined: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <rect x="90" y="20" width="20" height="80" stroke={stroke} fill="rgba(46,123,255,.18)" />
      <rect x="80" y="18" width="40" height="8" stroke={stroke} fill="rgba(46,123,255,.3)" />
      {/* tension */}
      <line x1="100" y1="14" x2="100" y2="2" stroke="#25d39a" strokeWidth="1.5" />
      <path d="M97 6 L100 2 L103 6" stroke="#25d39a" strokeWidth="1.5" fill="none" />
      <text x="106" y="8" fill="#25d39a" fontSize="6" fontFamily="ui-monospace, monospace">σ</text>
      {/* shear */}
      <line x1="60" y1="60" x2="84" y2="60" stroke="#ff5566" strokeWidth="1.5" />
      <path d="M80 58 L84 60 L80 62" stroke="#ff5566" strokeWidth="1.5" fill="none" />
      <line x1="140" y1="80" x2="116" y2="80" stroke="#ff5566" strokeWidth="1.5" />
      <path d="M120 78 L116 80 L120 82" stroke="#ff5566" strokeWidth="1.5" fill="none" />
      <text x="60" y="76" fill="#ff5566" fontSize="6" fontFamily="ui-monospace, monospace">τ</text>
      <text x="34" y="104" fill="#25d39a" fontSize="6" fontFamily="ui-monospace, monospace">σ_v = √(σ² + 3τ²)</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">COMBINED · TENSION + SHEAR</text>
    </svg>
  ),

  // 11 Συγκολλήσεις — weld bead
  weld: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <rect x="20" y="20" width="80" height="46" stroke={stroke} fill="rgba(46,123,255,.18)" />
      <rect x="100" y="56" width="80" height="46" stroke={stroke} fill="rgba(46,123,255,.18)" />
      {/* weld triangle */}
      <path d="M100 50 L100 66 L84 66 Z" stroke="#25d39a" fill="rgba(37,211,154,.4)" strokeWidth="1.2" />
      <path d="M100 50 L116 50 L100 66 Z" stroke="#25d39a" fill="rgba(37,211,154,.4)" strokeWidth="1.2" />
      {/* dim lines */}
      <line x1="86" y1="74" x2="100" y2="74" stroke="#25d39a" strokeWidth=".5" />
      <text x="88" y="82" fill="#25d39a" fontSize="5" fontFamily="ui-monospace, monospace">a = 5</text>
      <text x="120" y="48" fill="#25d39a" fontSize="6" fontFamily="ui-monospace, monospace">τ = 0.42 · σ</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">FILLET WELD · α=5mm</text>
    </svg>
  ),

  // 12 Ελάχιστη Ακτίνα Στροφής — turning circle
  turning: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <circle cx="100" cy="60" r="48" stroke={stroke} fill="none" strokeDasharray="3 3" />
      <circle cx="100" cy="60" r="28" stroke="#5aa6ff" fill="none" strokeDasharray="2 2" opacity=".6" />
      <circle cx="100" cy="60" r="2" fill={stroke} />
      {/* truck */}
      <rect x="140" y="46" width="24" height="28" rx="2" stroke={stroke} fill="rgba(46,123,255,.18)" transform="rotate(28 152 60)" />
      {/* radius */}
      <line x1="100" y1="60" x2="148" y2="60" stroke="#25d39a" strokeWidth=".8" />
      <text x="108" y="56" fill="#25d39a" fontSize="6" fontFamily="ui-monospace, monospace">R = 5.75 m</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">TURNING RADIUS · EU 1230/2012</text>
    </svg>
  ),

  // 13 Πέδηση — braking curve
  brake: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <line x1="20" y1="100" x2="180" y2="100" stroke={stroke} strokeWidth="1" />
      <line x1="20" y1="20" x2="20" y2="100" stroke={stroke} strokeWidth="1" />
      <path d="M20 30 Q50 30 80 50 T160 100" stroke="#25d39a" strokeWidth="1.4" fill="none" />
      <path d="M20 30 Q50 30 80 50 T160 100 L160 100 L20 100 Z" fill="rgba(37,211,154,.12)" stroke="none" />
      {/* dashed target */}
      <line x1="20" y1="50" x2="180" y2="50" stroke="#ff5566" strokeWidth=".5" strokeDasharray="3 3" />
      <text x="148" y="46" fill="#ff5566" fontSize="5" fontFamily="ui-monospace, monospace">a_min</text>
      <text x="24" y="28" fill="#25d39a" fontSize="6" fontFamily="ui-monospace, monospace">v(t)</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">BRAKING · DECELERATION</text>
    </svg>
  ),

  // 14 Ευστάθεια σε Στροφή — vehicle in turn (front view)
  stability: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <line x1="20" y1="100" x2="180" y2="100" stroke={stroke} strokeWidth="1" />
      <g transform="rotate(-14 100 90)">
        <rect x="70" y="40" width="60" height="50" stroke={stroke} fill="rgba(46,123,255,.18)" />
        <circle cx="80" cy="92" r="6" stroke={stroke} fill="#06122c" />
        <circle cx="120" cy="92" r="6" stroke={stroke} fill="#06122c" />
        {/* CoG */}
        <circle cx="100" cy="56" r="2.5" fill="#25d39a" />
        <line x1="100" y1="56" x2="100" y2="92" stroke="#25d39a" strokeWidth=".6" strokeDasharray="2 2" />
      </g>
      {/* lateral force */}
      <line x1="60" y1="60" x2="80" y2="60" stroke="#ff5566" strokeWidth="1.5" />
      <path d="M76 58 L80 60 L76 62" stroke="#ff5566" strokeWidth="1.5" fill="none" />
      <text x="48" y="56" fill="#ff5566" fontSize="6" fontFamily="ui-monospace, monospace">Fc</text>
      <text x="38" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">ROLL · v_max @ R</text>
    </svg>
  ),

  // 15 Κυκλική Βάση — boom + base
  boom: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <rect x="20" y="80" width="160" height="14" stroke={stroke} fill="rgba(46,123,255,.18)" />
      {/* base ring */}
      <ellipse cx="60" cy="80" rx="22" ry="6" stroke={stroke} fill="rgba(46,123,255,.3)" />
      {/* boom */}
      <line x1="60" y1="76" x2="130" y2="30" stroke={stroke} strokeWidth="3" />
      <line x1="130" y1="30" x2="170" y2="36" stroke={stroke} strokeWidth="2.5" />
      <rect x="166" y="32" width="14" height="10" stroke={stroke} fill="rgba(46,123,255,.18)" />
      {/* moment */}
      <path d="M70 80 a18 12 0 0 0 -18 -10" stroke="#ff5566" strokeWidth="1" fill="none" />
      <text x="62" y="100" fill="#ff5566" fontSize="6" fontFamily="ui-monospace, monospace">M_base</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">CRANE BASE · BOLT CIRCLE</text>
    </svg>
  ),

  // 16 Αξονικά Φορτία — table-ish
  axial: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <rect x="20" y="20" width="160" height="20" stroke={stroke} fill="rgba(46,123,255,.20)" />
      {[44, 60, 76, 92].map((y, i) => (
        <g key={i}>
          <rect x="20" y={y} width="160" height="14" stroke={strokeFaint} fill={i % 2 ? "rgba(46,123,255,.04)" : "transparent"} />
          <text x="26" y={y + 10} fill="#c7d3ec" fontSize="6" fontFamily="ui-monospace, monospace">A{i + 1}</text>
          <text x="60" y={y + 10} fill="#5a6f9a" fontSize="6" fontFamily="ui-monospace, monospace">{(5.2 + i * 1.4).toFixed(2)} t</text>
          <rect x="110" y={y + 4} width={50 - i * 4} height="6" fill="#5aa6ff" opacity={0.8 - i * 0.1} />
        </g>
      ))}
      <text x="26" y="32" fill="#e8eefb" fontSize="6" fontFamily="ui-monospace, monospace" fontWeight="600">AXLE  ·  LOAD  ·  %</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">AXIAL LOADS · PER AXLE</text>
    </svg>
  ),

  // 17 Εγκάρσια Φορτία — lateral
  lateral: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {/* rear view truck */}
      <rect x="60" y="36" width="80" height="50" stroke={stroke} fill="rgba(46,123,255,.18)" />
      <rect x="54" y="80" width="92" height="10" stroke={stroke} fill="rgba(46,123,255,.10)" />
      {/* tyres */}
      <rect x="50" y="86" width="10" height="6" stroke={stroke} fill="#06122c" />
      <rect x="140" y="86" width="10" height="6" stroke={stroke} fill="#06122c" />
      {/* lateral force */}
      <line x1="30" y1="60" x2="56" y2="60" stroke="#ff5566" strokeWidth="1.5" />
      <path d="M52 58 L56 60 L52 62" stroke="#ff5566" strokeWidth="1.5" fill="none" />
      <text x="20" y="56" fill="#ff5566" fontSize="6" fontFamily="ui-monospace, monospace">Fy</text>
      {/* reaction */}
      <line x1="144" y1="94" x2="156" y2="94" stroke="#25d39a" strokeWidth="1.2" />
      <line x1="56" y1="94" x2="44" y2="94" stroke="#25d39a" strokeWidth="1.2" />
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">LATERAL LOADS · REACTIONS</text>
    </svg>
  ),

  // 18 Νέα Μελέτη — folder structure
  newstudy: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {/* root folder */}
      <g>
        <path d="M30 30 L42 30 L46 34 L70 34 L70 50 L30 50 Z" stroke={stroke} fill="rgba(46,123,255,.22)" />
        <text x="74" y="44" fill="#e8eefb" fontSize="7" fontFamily="ui-monospace, monospace" fontWeight="600">VH-2026-04</text>
      </g>
      {/* tree connector */}
      <path d="M44 50 L44 100 M44 60 L60 60 M44 72 L60 72 M44 84 L60 84 M44 96 L60 96" stroke={stroke} strokeWidth=".6" />
      {/* sub folders */}
      {[
        ["Photos", 60],
        ["Drawings", 72],
        ["Diagrams", 84],
        ["Tech Data", 96],
      ].map(([label, y], i) => (
        <g key={i}>
          <path d={`M62 ${y - 4} L70 ${y - 4} L72 ${y - 2} L90 ${y - 2} L90 ${y + 4} L62 ${y + 4} Z`}
                stroke={stroke} fill="rgba(46,123,255,.12)" strokeWidth=".8" />
          <text x={94} y={y + 2} fill="#c7d3ec" fontSize="5.5" fontFamily="ui-monospace, monospace">{label}</text>
        </g>
      ))}
      {/* word doc */}
      <g transform="translate(150 38)">
        <rect width="22" height="28" stroke="#25d39a" fill="rgba(37,211,154,.15)" />
        <text x="3" y="10" fill="#25d39a" fontSize="5" fontFamily="ui-monospace, monospace">W</text>
        <line x1="3" y1="15" x2="19" y2="15" stroke="#25d39a" strokeWidth=".4" />
        <line x1="3" y1="19" x2="19" y2="19" stroke="#25d39a" strokeWidth=".4" />
        <line x1="3" y1="23" x2="14" y2="23" stroke="#25d39a" strokeWidth=".4" />
      </g>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">NEW STUDY · FOLDER TREE</text>
    </svg>
  ),

  // 19 Εισαγωγή Δεδομένων — CSV import flow
  importdata: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {/* CSV file */}
      <g transform="translate(20 40)">
        <rect width="40" height="40" stroke={stroke} fill="rgba(46,123,255,.18)" />
        <text x="6" y="14" fill="#e8eefb" fontSize="6" fontFamily="ui-monospace, monospace" fontWeight="600">CSV</text>
        <line x1="4" y1="20" x2="36" y2="20" stroke={stroke} strokeWidth=".4" />
        <line x1="4" y1="26" x2="36" y2="26" stroke={stroke} strokeWidth=".4" />
        <line x1="4" y1="32" x2="28" y2="32" stroke={stroke} strokeWidth=".4" />
      </g>
      {/* arrow */}
      <g>
        <line x1="66" y1="60" x2="100" y2="60" stroke="#25d39a" strokeWidth="1.4" strokeDasharray="3 2" />
        <path d="M96 56 L102 60 L96 64" stroke="#25d39a" strokeWidth="1.4" fill="none" />
        <text x="68" y="54" fill="#25d39a" fontSize="6" fontFamily="ui-monospace, monospace">IMPORT</text>
      </g>
      {/* destination cells */}
      <g transform="translate(110 30)">
        <rect width="70" height="60" stroke={stroke} fill="rgba(46,123,255,.08)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line x1="0" y1={12 * (i + 1)} x2="70" y2={12 * (i + 1)} stroke={strokeFaint} strokeWidth=".4" />
            <rect x="2" y={2 + i * 12} width="22" height="8" fill="rgba(46,123,255,.18)" />
            <rect x="26" y={2 + i * 12} width="42" height="8" fill={i % 2 ? "rgba(37,211,154,.18)" : "rgba(46,123,255,.06)"} />
          </g>
        ))}
      </g>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">IMPORT · PREVIOUS STUDY DATA</text>
    </svg>
  ),

  // 20 Τελικές Ρυθμίσεις — gear with refresh
  finalize: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {/* main gear */}
      <g transform="translate(64 60)">
        <circle r="26" stroke={stroke} fill="rgba(46,123,255,.12)" strokeWidth="1.2" />
        <circle r="10" stroke={stroke} fill="#06122c" strokeWidth="1" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((d, i) => (
          <rect key={i} x="-3" y="-30" width="6" height="8" fill={stroke} transform={`rotate(${d})`} />
        ))}
      </g>
      {/* checklist */}
      <g transform="translate(110 30)">
        {["REFRESH DIAGRAMS", "CLEAN TABLES", "AUTO AXES", "VALIDATE"].map((t, i) => (
          <g key={i} transform={`translate(0 ${i * 14})`}>
            <rect width="10" height="10" stroke="#25d39a" fill="rgba(37,211,154,.18)" />
            <path d="M2 5 L4 7 L8 3" stroke="#25d39a" strokeWidth="1.2" fill="none" />
            <text x="16" y="8" fill="#c7d3ec" fontSize="5.5" fontFamily="ui-monospace, monospace">{t}</text>
          </g>
        ))}
      </g>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">FINAL SETTINGS · PRE-REPORT</text>
    </svg>
  ),

  // 21 Αποθήκευση Διαγραμμάτων — JPEG stack
  savejpeg: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {/* stack of three image cards */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${52 + i * 14} ${30 + i * 6})`}>
          <rect width="76" height="50" stroke={stroke} fill="#06122c" strokeWidth="1" />
          {/* tiny chart inside */}
          <path d={`M6 ${36 + i * 2} Q${20 - i * 2} ${20 - i * 2} ${40 - i * 2} ${30 - i * 2} T70 ${28 + i * 2}`}
                stroke="#5aa6ff" strokeWidth=".8" fill="none" />
          <text x="6" y="12" fill={stroke} fontSize="5" fontFamily="ui-monospace, monospace">M / Q · {String(i + 1).padStart(2, "0")}</text>
          <rect x="56" y="40" width="14" height="6" stroke="#25d39a" fill="rgba(37,211,154,.18)" />
          <text x="58" y="45" fill="#25d39a" fontSize="4" fontFamily="ui-monospace, monospace">JPG</text>
        </g>
      ))}
      {/* download arrow */}
      <g transform="translate(154 80)">
        <line x1="0" y1="0" x2="0" y2="16" stroke="#25d39a" strokeWidth="1.4" />
        <path d="M-4 12 L0 18 L4 12" stroke="#25d39a" strokeWidth="1.4" fill="none" />
      </g>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">EXPORT · DIAGRAMS AS JPEG</text>
    </svg>
  ),

  // 22 Φύλλο Δεδομένων — data sheet with required cells
  datasheet: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <rect x="20" y="14" width="160" height="92" stroke={stroke} fill="rgba(46,123,255,.04)" />
      {/* header */}
      <rect x="20" y="14" width="160" height="10" fill="rgba(46,123,255,.22)" stroke={stroke} />
      <text x="26" y="21" fill="#e8eefb" fontSize="5.5" fontFamily="ui-monospace, monospace" fontWeight="600">ΦΥΛΛΟ ΔΕΔΟΜΕΝΩΝ</text>
      {/* rows */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const y = 28 + i * 8;
        const required = [0, 2, 3, 6].includes(i);
        return (
          <g key={i}>
            <line x1="20" y1={y + 6} x2="180" y2={y + 6} stroke={strokeFaint} strokeWidth=".3" />
            <line x1="80" y1={y} x2="80" y2={y + 6} stroke={strokeFaint} strokeWidth=".3" />
            <rect x="80" y={y} width="100" height="6" fill={required ? "rgba(255,85,102,.22)" : "rgba(46,123,255,.06)"} />
            <text x="24" y={y + 4.4} fill="#c7d3ec" fontSize="4.5" fontFamily="ui-monospace, monospace">
              {["Όχημα", "Μεταξόνιο", "Πλάτος", "Υλικό", "Διατομή", "Άξονες", "Μέγ. φορτίο", "Έκδοση"][i]}
            </text>
            {required && <circle cx="78" cy={y + 3} r="1.2" fill="#ff5566" />}
          </g>
        );
      })}
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">RED CELLS = REQUIRED</text>
    </svg>
  ),

  // 23 Φύλλο Ελέγχου — checklist control
  control: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <rect x="20" y="14" width="160" height="92" stroke={stroke} fill="rgba(46,123,255,.04)" />
      <rect x="20" y="14" width="160" height="10" fill="rgba(46,123,255,.22)" stroke={stroke} />
      <text x="26" y="21" fill="#e8eefb" fontSize="5.5" fontFamily="ui-monospace, monospace" fontWeight="600">ΦΥΛΛΟ ΕΛΕΓΧΟΥ</text>
      <text x="118" y="21" fill="#e8eefb" fontSize="5.5" fontFamily="ui-monospace, monospace" fontWeight="600">ΕΛΕΓΧΟΣ</text>
      {[
        ["Άξονες", true],
        ["Ελατήρια", false],
        ["Πλαίσιο", true],
        ["Αναρτήσεις 1ου", true],
        ["Διάτμηση κοχλιών", true],
        ["Συγκολλήσεις", false],
        ["Ευστάθεια γερανού", true],
        ["Πέδηση", true],
      ].map(([label, ok], i) => {
        const y = 28 + i * 8;
        return (
          <g key={i}>
            <line x1="20" y1={y + 6} x2="180" y2={y + 6} stroke={strokeFaint} strokeWidth=".3" />
            <text x="24" y={y + 4.4} fill="#c7d3ec" fontSize="4.5" fontFamily="ui-monospace, monospace">{label}</text>
            <g transform={`translate(140 ${y + 1})`}>
              {ok ? (
                <g>
                  <circle cx="3" cy="3" r="3" fill="rgba(37,211,154,.2)" />
                  <path d="M1 3 L2.5 4.5 L5 1.5" stroke="#25d39a" strokeWidth="1" fill="none" />
                </g>
              ) : (
                <g>
                  <circle cx="3" cy="3" r="3" fill="rgba(255,85,102,.2)" />
                  <path d="M1.5 1.5 L4.5 4.5 M4.5 1.5 L1.5 4.5" stroke="#ff5566" strokeWidth="1" fill="none" />
                </g>
              )}
            </g>
          </g>
        );
      })}
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">VALIDATION · ALL SHEETS</text>
    </svg>
  ),

  // 24 Οδική Βοήθεια — tow truck with trailer
  rescue: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {/* tow truck */}
      <rect x="22" y="48" width="56" height="26" stroke={stroke} fill="rgba(46,123,255,.18)" />
      <rect x="22" y="44" width="20" height="30" stroke={stroke} fill="rgba(46,123,255,.30)" />
      <circle cx="32" cy="78" r="5" stroke={stroke} fill="#06122c" />
      <circle cx="64" cy="78" r="5" stroke={stroke} fill="#06122c" />
      <circle cx="74" cy="78" r="5" stroke={stroke} fill="#06122c" />
      {/* hitch */}
      <line x1="78" y1="64" x2="98" y2="64" stroke={stroke} strokeWidth="1" />
      <circle cx="98" cy="64" r="2" fill={stroke} />
      {/* trailer */}
      <rect x="98" y="50" width="74" height="20" stroke="#5aa6ff" fill="rgba(90,166,255,.14)" />
      <rect x="106" y="40" width="58" height="14" stroke="#5aa6ff" fill="rgba(90,166,255,.20)" />
      <circle cx="118" cy="74" r="4" stroke="#5aa6ff" fill="#06122c" />
      <circle cx="158" cy="74" r="4" stroke="#5aa6ff" fill="#06122c" />
      {/* force arrows downward at axles */}
      {[32, 64, 74, 118, 158].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="86" x2={x} y2="96" stroke="#ff5566" strokeWidth=".8" />
          <path d={`M${x - 2} 92 L${x} 96 L${x + 2} 92`} stroke="#ff5566" strokeWidth=".8" fill="none" />
        </g>
      ))}
      {/* labels */}
      <text x="40" y="102" fill="#25d39a" fontSize="5" fontFamily="ui-monospace, monospace">TOW</text>
      <text x="124" y="102" fill="#25d39a" fontSize="5" fontFamily="ui-monospace, monospace">TRAILER</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">RESCUE · AXLE LOADS + TRAILER</text>
    </svg>
  ),

  // 25 Ευστάθεια από Εξοπλισμό — truck with rotated boom
  tipover: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      <line x1="20" y1="96" x2="180" y2="96" stroke={stroke} strokeWidth="1" />
      <g transform="rotate(-10 100 96)">
        {/* truck body */}
        <rect x="60" y="60" width="80" height="30" stroke={stroke} fill="rgba(46,123,255,.18)" />
        {/* boom arm extended sideways */}
        <line x1="100" y1="60" x2="40" y2="28" stroke={stroke} strokeWidth="2.5" />
        <line x1="40" y1="28" x2="36" y2="36" stroke={stroke} strokeWidth="1.5" />
        <rect x="32" y="34" width="10" height="8" stroke={stroke} fill="rgba(46,123,255,.22)" />
        {/* wheels */}
        <circle cx="74" cy="94" r="4" stroke={stroke} fill="#06122c" />
        <circle cx="126" cy="94" r="4" stroke={stroke} fill="#06122c" />
      </g>
      {/* CoG marker */}
      <circle cx="92" cy="68" r="3" fill="#25d39a" />
      <line x1="92" y1="68" x2="92" y2="96" stroke="#25d39a" strokeWidth=".6" strokeDasharray="2 2" />
      {/* tipping force */}
      <path d="M40 18 Q50 14 60 18" stroke="#ff5566" strokeWidth="1" fill="none" />
      <path d="M58 16 L60 18 L57 19.5" stroke="#ff5566" strokeWidth="1" fill="none" />
      <text x="36" y="14" fill="#ff5566" fontSize="6" fontFamily="ui-monospace, monospace">TIP</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">EQUIPMENT TIPOVER · MARGIN</text>
    </svg>
  ),

  // 26 Τετράγωνη Βάση Γερανού — rectangular base with 4 bolts
  rectbase: () => (
    <svg viewBox="0 0 200 120" className="cap-preview-svg">
      <GridBG />
      {/* base rectangle (top view) */}
      <rect x="50" y="34" width="100" height="60" stroke={stroke} fill="rgba(46,123,255,.10)" />
      {/* corner bolts */}
      {[[60, 44], [140, 44], [60, 84], [140, 84]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" stroke={stroke} fill="#06122c" strokeWidth="1" />
          <circle cx={x} cy={y} r="2" fill={i === 1 || i === 3 ? "#ff5566" : "#25d39a"} />
        </g>
      ))}
      {/* center load */}
      <circle cx="100" cy="64" r="6" stroke={stroke} fill="rgba(46,123,255,.40)" />
      <line x1="100" y1="64" x2="148" y2="44" stroke={stroke} strokeWidth=".6" />
      <line x1="100" y1="64" x2="148" y2="84" stroke={stroke} strokeWidth=".6" />
      {/* moment arrow */}
      <path d="M100 22 L132 22" stroke="#ff5566" strokeWidth="1" />
      <path d="M128 19 L132 22 L128 25" stroke="#ff5566" strokeWidth="1" fill="none" />
      <text x="108" y="18" fill="#ff5566" fontSize="6" fontFamily="ui-monospace, monospace">M_crane</text>
      {/* labels */}
      <text x="44" y="42" fill="#25d39a" fontSize="5" fontFamily="ui-monospace, monospace">B1</text>
      <text x="148" y="42" fill="#ff5566" fontSize="5" fontFamily="ui-monospace, monospace">B2*</text>
      <text x="44" y="92" fill="#25d39a" fontSize="5" fontFamily="ui-monospace, monospace">B3</text>
      <text x="148" y="92" fill="#ff5566" fontSize="5" fontFamily="ui-monospace, monospace">B4*</text>
      <text x="10" y="115" fill="#5a6f9a" fontSize="5" fontFamily="ui-monospace, monospace">RECT BASE · LOADED BOLTS</text>
    </svg>
  ),
};

window.Preview = Preview;
