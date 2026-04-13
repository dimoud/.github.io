/* ═══════════════════════════════════════════════════════════════

   models.js — Three 3D models cycling every 10 s

   Planetary Gearbox · Turbofan Engine · V4 Piston Engine

═══════════════════════════════════════════════════════════════ */



let scene, camera, renderer, clock;

let rotGroup = null, parts = [];

let explodeT = 0, exploding = false, isDragging = false;

let prevMouse = { x: 0, y: 0 }, floatT = 0, crankT = 0;

/* global crank/crank-rod defaults (used by piston kinematics) */

let crankCenterY = -1.5, crankRadius = 0.72, conrodLen = 1.6;

let currentMode = 'rotate';

let currentModelIdx = 0;

let modelCycleTimer = null;

let rightHalfX = 4.5;
const GEAR_OFFSET_X = 1.0; // shift gear ~3cm left on desktop

let scrollExplodeActive = false, scrollExplodeT = 0, scrollTargetY = 0;

let animRunning = false; // set true once initThree fires, paused when hero off-screen

/* ── Gear intro slide-in ──────────────────────────────────────
   gearIntroT: 0 → 1 over ~1s. Position lerps from rightHalfX+14
   (off-screen right) to rightHalfX. Starts after a 0.3s delay.
──────────────────────────────────────────────────────────────── */
let gearIntroT = 0;
let gearIntroElapsed = 0;
const GEAR_INTRO_DELAY = 0.15;  // seconds before slide starts
const GEAR_INTRO_DUR   = 0.55;  // seconds for full slide
const GEAR_INTRO_DIST  = 5;     // world-units offset (subtle slide from right)

let _machinedTex = null;
function createMachinedTexture() {
  if (_machinedTex) return _machinedTex;          // reuse — never create twice

  const size = 256;                                // was 512: 4× fewer pixels
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Direct pixel writes — no arc() overhead (~10× faster than original)
  const id = ctx.createImageData(size, size);
  const d  = id.data;
  // Base mid-grey fill
  for (let i = 0; i < d.length; i += 4) { d[i] = d[i+1] = d[i+2] = 130; d[i+3] = 255; }
  // Fine speckle noise
  for (let i = 0; i < 24000; i++) {
    const x = (Math.random() * size) | 0;
    const y = (Math.random() * size) | 0;
    const v = ((Math.random() * 70) + 72) | 0;
    const p = (y * size + x) << 2;
    d[p] = d[p+1] = d[p+2] = v;
  }
  ctx.putImageData(id, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  tex.anisotropy = 4;                              // was 16: much cheaper sampling

  _machinedTex = tex;
  return tex;
}


/* ── Materials ──────────────────────────────────────────────── */

function makeMats() {

  const t = createMachinedTexture();

  return {

    /* planet shafts, washers, output flange — cool light grey */
    chrome:   new THREE.MeshStandardMaterial({ color: 0x6e7e8c, metalness: .78, roughness: .58, map: t }),

    /* bolts, keyway — medium slate grey-blue */
    steel:    new THREE.MeshStandardMaterial({ color: 0x48555f, metalness: .74, roughness: .62, map: t }),

    blue:     new THREE.MeshStandardMaterial({ color: 0x1e304a, metalness: .70, roughness: .65, map: t }),

    blueB:    new THREE.MeshStandardMaterial({ color: 0x263a58, metalness: .70, roughness: .63, map: t }),

    /* circlip retainers — neutral dark grey */
    gold:     new THREE.MeshStandardMaterial({ color: 0x3a4248, metalness: .78, roughness: .56, map: t }),

    brass:    new THREE.MeshStandardMaterial({ color: 0x343c44, metalness: .76, roughness: .60, map: t }),

    orange:   new THREE.MeshStandardMaterial({ color: 0x2e3a46, metalness: .72, roughness: .63, map: t }),

    /* housing plates, carrier — dark blue-grey */
    dark:     new THREE.MeshStandardMaterial({ color: 0x222e3a, metalness: .68, roughness: .68, map: t }),

    /* ring gear — deepest, near-black blue */
    darkB:    new THREE.MeshStandardMaterial({ color: 0x161e28, metalness: .66, roughness: .72, map: t }),

    /* bearing rings — medium blue-grey */
    titanium: new THREE.MeshStandardMaterial({ color: 0x3c4e5e, metalness: .72, roughness: .60, map: t }),

    /* input sprocket — lighter grey accent */
    silver:   new THREE.MeshStandardMaterial({ color: 0x5a6a78, metalness: .80, roughness: .52, map: t }),

    /* sun & planet gears — dark navy blue */
    red:      new THREE.MeshStandardMaterial({ color: 0x1a2c40, metalness: .78, roughness: .62, map: t }),

    /* carrier plate — dark red */
    darkRed:  new THREE.MeshStandardMaterial({ color: 0x4e0e0e, metalness: .74, roughness: .60, map: t }),

  };

}



/* ── Lights ─────────────────────────────────────────────────── */

function addLights(s) {
  // 5 lights — no shadows — big GPU savings
  s.add(new THREE.AmbientLight(0x9aa8c0, 12.0));

  const key = new THREE.DirectionalLight(0xfff8f0, 22.0);
  key.position.set(10, 16, 12); s.add(key);   // no castShadow

  const fill = new THREE.DirectionalLight(0x6090d8, 11.0);
  fill.position.set(-10, 6, -8); s.add(fill);

  const rim = new THREE.PointLight(0x70c0f0, 13.0, 80);
  rim.position.set(-6, 12, -12); s.add(rim);

  const bounce = new THREE.DirectionalLight(0x7898b8, 6.0);
  bounce.position.set(0, -10, 6); s.add(bounce);
}



/* ── Gear shape helpers ─────────────────────────────────────── */

function gearShape(teeth, pR, tH, hR, spokes) {

  const s = new THREE.Shape(), step = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {

    /* ±0.26/±0.17 gives ~50 % tooth / 50 % space for realistic interlocking */
    const a0=i*step-step*.26, a1=i*step-step*.17, a2=i*step+step*.17, a3=i*step+step*.26;

    const p = (a, r) => [Math.cos(a)*r, Math.sin(a)*r];

    i===0 ? s.moveTo(...p(a0,pR)) : s.lineTo(...p(a0,pR));

    s.lineTo(...p(a1,pR+tH)); s.lineTo(...p(a2,pR+tH)); s.lineTo(...p(a3,pR));

  }

  s.closePath();

  const hub = new THREE.Path(); hub.absarc(0,0,hR,0,Math.PI*2,true); s.holes.push(hub);

  const n = spokes || Math.max(4, Math.floor(teeth/3));

  for (let i=0; i<n; i++) {

    const a=(i/n)*Math.PI*2, r=pR*.55, sr=pR*.13;

    const sh = new THREE.Path(); sh.absarc(Math.cos(a)*r,Math.sin(a)*r,sr,0,Math.PI*2,true); s.holes.push(sh);

  }

  return s;

}



function ringShape(teeth, oR, tRR, tH) {

  const s = new THREE.Shape(); s.absarc(0,0,oR,0,Math.PI*2,false);

  const step = (Math.PI*2)/teeth, inner = new THREE.Path();

  for (let i=0; i<teeth; i++) {

    /* match external gear proportions for proper ring-planet interlocking */
    const a0=i*step-step*.26, a1=i*step-step*.17, a2=i*step+step*.17, a3=i*step+step*.26;

    const p = (a,r) => [Math.cos(a)*r, Math.sin(a)*r];

    i===0 ? inner.moveTo(...p(a0,tRR)) : inner.lineTo(...p(a0,tRR));

    inner.lineTo(...p(a1,tRR-tH)); inner.lineTo(...p(a2,tRR-tH)); inner.lineTo(...p(a3,tRR));

  }

  inner.closePath(); s.holes.push(inner); return s;

}



/* ═══════════════════════════════════════════════════════════════

   MODEL 0 — PLANETARY GEARBOX

═══════════════════════════════════════════════════════════════ */

function buildGearbox(group, m) {

  const ps = [];

  /* ── Module-based gear parameters ─────────────────────────────
     Ns=18, Np=18, Nr=54 → (Ns+Nr)=72, 72/3=24 ✓ (3 equal planets)
     Even tooth counts so half-pitch offset (PI/Np=10°) places spaces
     at BOTH 0° (ring contact) and 180° (sun contact) simultaneously.
     Clearance = 0.045 at both sun-planet and planet-ring meshes.    */
  const MOD  = 0.18;
  const Ns = 18, Np = 18, Nr = 54;
  const sunPR    = Ns * MOD / 2;           // 1.62 pitch radius
  const OR       = (Ns + Np) * MOD / 2;    // 3.24 planet orbit radius
  const ringPR   = Nr * MOD / 2;           // 4.86
  const ADD = MOD, DED = 1.25 * MOD;       // 0.18 / 0.225
  const FULLH    = ADD + DED;              // 0.405 full tooth height
  const sunRoot  = sunPR - DED;            // 1.395
  const ringRoot = ringPR + DED;           // 5.085 (outer base of ring teeth)
  const ringWall = ringRoot + 0.60;        // 5.685 solid outer wall
  const FACE     = 0.76;                   // gear face width
  const HELIX    = 0.24;                   // total helix twist across face (rad)
  const NSLICES  = 14;                     // slices for helical approximation
  const pA = [0, Math.PI*2/3, Math.PI*4/3];



  /* -- Helical gear helper -- */
  function helical(shape, twist, mat) {
    const g = new THREE.Group();
    const sd = FACE / NSLICES;
    for (let i = 0; i < NSLICES; i++) {
      const sl = new THREE.Mesh(
        new THREE.ExtrudeGeometry(shape, { depth: sd, bevelEnabled: false }), mat);
      sl.position.z = i * sd;
      sl.rotation.z  = (i / NSLICES) * twist;
      g.add(sl);
    }
    return g;
  }

  /* -- Sun gear -- */
  const sg = helical(gearShape(Ns, sunRoot, FULLH, 0.30, 5), HELIX, m.red);
  group.add(sg);
  ps.push({ mesh: sg, o: sg.position.clone(), d: new THREE.Vector3(0,0,0), spin: 0.18 });

  /* -- Carrier group created early so planets can be children of it.
     Planets inside cGroup orbit automatically as cGroup rotates.
     carrierSpin = ω_sun * Ns/(Ns+Nr) = 0.18*15/60 = 0.045 rad/s
     Planet world spin = carrierSpin + planet_local_spin = −0.09
     → planet_local_spin = −0.09 − 0.045 = −0.135
     This satisfies both sun-planet AND planet-ring mesh conditions.   */
  const carrierSpin = 0.18 * Ns / (Ns + Nr);  // 0.045
  const cGroup = new THREE.Group();
  group.add(cGroup);

  /* -- 3 Planet gears (inside carrier group, opposite helix hand) -- */
  pA.forEach((a, i) => {
    const pg = helical(gearShape(Np, sunRoot, FULLH, 0.21, 3), -HELIX, m.red);
    pg.position.set(Math.cos(a)*OR, Math.sin(a)*OR, 0);
    pg.rotation.z = Math.PI / Np;  // half-pitch offset for ring mesh alignment
    cGroup.add(pg);                 // child of carrier → orbits with it
    ps.push({ mesh: pg, o: pg.position.clone(),
              d: new THREE.Vector3(Math.cos(a)*5.2, Math.sin(a)*5.2, 1.5+i*.7),
              spin: -0.135 });      // local spin: world spin(-0.09) - carrierSpin(0.045)
  });

  /* -- Ring gear (fixed housing) -- */
  const eR = { depth: FACE+0.14, bevelEnabled:true,
               bevelThickness:.055, bevelSize:.042, bevelSegments:3 };
  const gr = new THREE.Mesh(
    new THREE.ExtrudeGeometry(ringShape(Nr, ringWall, ringRoot, FULLH), eR), m.darkB);
  gr.position.z = -0.07;
  group.add(gr);
  ps.push({ mesh: gr, o: gr.position.clone(), d: new THREE.Vector3(0,0,-5.2), spin: 0 });

  /* -- Carrier: flat annular disk plates front+back + planet pin bosses -- */
  /* Use RingGeometry (flat disk with hole) extruded thin via CylinderGeometry trick:
     outer radius = OR+0.28, inner radius = OR-0.28, thickness = 0.14             */
  function carrierDisk(z) {
    /* Build flat ring as a shape extrude */
    const ds = new THREE.Shape(); ds.absarc(0,0, OR+0.28, 0, Math.PI*2, false);
    const dh = new THREE.Path();  dh.absarc(0,0, OR-0.28, 0, Math.PI*2, true);
    ds.holes.push(dh);
    /* punch holes for planet pin bosses */
    pA.forEach(a => {
      const ph = new THREE.Path();
      ph.absarc(Math.cos(a)*OR, Math.sin(a)*OR, 0.23, 0, Math.PI*2, true);
      ds.holes.push(ph);
    });
    const disk = new THREE.Mesh(
      new THREE.ExtrudeGeometry(ds, { depth: 0.26, bevelEnabled: false }), m.darkRed);
    disk.position.z = z;
    return disk;
  }
  const bDisk = carrierDisk(-0.14);
  cGroup.add(bDisk);
  const fDisk = carrierDisk(FACE + 0.01);
  cGroup.add(fDisk);
  pA.forEach(a => {
    const px = Math.cos(a)*OR, py = Math.sin(a)*OR;
    const bossGeo = new THREE.CylinderGeometry(0.21, 0.21, FACE+0.42, 16);
    bossGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2));
    const boss = new THREE.Mesh(bossGeo, m.chrome);
    boss.position.set(px, py, FACE/2);
    cGroup.add(boss);
    [-0.08, FACE+0.08].forEach(z => {
      const cc = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.022, 2, 28), m.gold);
      cc.position.set(px, py, z);
      cGroup.add(cc);
    });
  });
  ps.push({ mesh: cGroup, o: cGroup.position.clone(),
            d: new THREE.Vector3(0,0,-2.8), spin: carrierSpin });

  /* -- Back plate (rough, complex, very dark) -- */
  const bPR = ringWall + 0.30;
  const bBC = bPR - 0.28;
  const backMat = new THREE.MeshStandardMaterial({
    color: 0x090d10, metalness: .48, roughness: .94, map: createMachinedTexture()
  });

  // Back plate — wide annular disk (large inner opening) with 12 bolt holes
  const bS = new THREE.Shape(); bS.absarc(0,0,bPR,0,Math.PI*2,false);
  const bRim = new THREE.Path(); bRim.absarc(0,0,ringRoot,0,Math.PI*2,true); bS.holes.push(bRim);
  for (let i=0; i<12; i++) {
    const a=(i/12)*Math.PI*2;
    const h=new THREE.Path(); h.absarc(Math.cos(a)*bBC,Math.sin(a)*bBC,.16,0,Math.PI*2,true);
    bS.holes.push(h);
  }
  const gBack = new THREE.Mesh(
    new THREE.ExtrudeGeometry(bS, { depth:1.04, bevelEnabled:true, bevelThickness:.06, bevelSize:.04, bevelSegments:2 }), backMat);
  gBack.position.z = -0.97;
  group.add(gBack);
  ps.push({ mesh:gBack, o:gBack.position.clone(), d:new THREE.Vector3(0,0,-6.2), spin:0 });

  // Raised inner boss ring
  const bossS = new THREE.Shape(); bossS.absarc(0,0,1.18,0,Math.PI*2,false);
  const bossH = new THREE.Path(); bossH.absarc(0,0,0.82,0,Math.PI*2,true); bossS.holes.push(bossH);
  const boss = new THREE.Mesh(
    new THREE.ExtrudeGeometry(bossS, { depth:.18, bevelEnabled:false }), backMat);
  boss.position.z = 0.07;
  group.add(boss);
  ps.push({ mesh:boss, o:boss.position.clone(), d:new THREE.Vector3(0,0,-6.2), spin:0 });

  /* -- Front cover (silver) -- */
  const fS = new THREE.Shape(); fS.absarc(0,0,bPR,0,Math.PI*2,false);
  const fRim = new THREE.Path(); fRim.absarc(0,0,4.10,0,Math.PI*2,true); fS.holes.push(fRim);
  [0,1,2,3,4,5,6,7].forEach(i=>{
    const a=(i/8)*Math.PI*2;
    const h=new THREE.Path(); h.absarc(Math.cos(a)*bBC,Math.sin(a)*bBC,.22,0,Math.PI*2,true);
    fS.holes.push(h);
  });
  const gFront = new THREE.Mesh(
    new THREE.ExtrudeGeometry(fS, { depth:.30, bevelEnabled:false }), m.silver);
  gFront.position.z = FACE + 0.10;
  group.add(gFront);
  ps.push({ mesh:gFront, o:gFront.position.clone(), d:new THREE.Vector3(0,0,5.2), spin:0 });

  /* -- 8 hex bolts -- */
  [0,1,2,3,4,5,6,7].forEach(i=>{
    const a=(i/8)*Math.PI*2, bx=Math.cos(a)*bBC, by=Math.sin(a)*bBC;
    const bolt=new THREE.Mesh(new THREE.CylinderGeometry(.130,.130,1.50,16),m.steel);
    bolt.rotation.x=Math.PI/2; bolt.position.set(bx,by,.38); group.add(bolt);
    ps.push({mesh:bolt,o:bolt.position.clone(),d:new THREE.Vector3(bx*.13,by*.13,0),spin:0});
    const head=new THREE.Mesh(new THREE.CylinderGeometry(.252,.252,.27,6),m.steel);
    head.rotation.x=Math.PI/2; head.position.set(bx,by,1.18); group.add(head);
    ps.push({mesh:head,o:head.position.clone(),d:new THREE.Vector3(bx*.13,by*.13,1.85),spin:0});
    const washer=new THREE.Mesh(new THREE.CylinderGeometry(.300,.300,.044,20),m.chrome);
    washer.rotation.x=Math.PI/2; washer.position.set(bx,by,1.06); group.add(washer);
    ps.push({mesh:washer,o:washer.position.clone(),d:new THREE.Vector3(bx*.13,by*.13,1.85),spin:0});
    const nut=new THREE.Mesh(new THREE.CylinderGeometry(.235,.235,.21,6),m.steel);
    nut.rotation.x=Math.PI/2; nut.position.set(bx,by,-.47); group.add(nut);
    ps.push({mesh:nut,o:nut.position.clone(),d:new THREE.Vector3(bx*.13,by*.13,-2.4),spin:0});
  });

  /* -- Bearing rings (central hub) -- */
  [-0.17, FACE+0.04].forEach(z => {
    const br = new THREE.Mesh(new THREE.TorusGeometry(.50,.055,2,40), m.gold);
    br.position.z = z; group.add(br);
    ps.push({ mesh:br, o:br.position.clone(), d:new THREE.Vector3(0,0,z*3.5), spin:0 });
  });

  /* -- Input shaft: geometry rotation baked in, spins correctly on Z axis -- */
  const shaftR = 0.34;
  const shaftGeo = new THREE.CylinderGeometry(shaftR, shaftR, 3.0, 22);
  shaftGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2));
  const shaft = new THREE.Mesh(shaftGeo, m.chrome);
  shaft.position.z = -0.40;
  group.add(shaft);
  ps.push({ mesh:shaft, o:shaft.position.clone(), d:new THREE.Vector3(0,0,0), spin:0.18 });

  /* -- Input sprocket -- */
  const sp = new THREE.Mesh(new THREE.TorusGeometry(1.32,.07,2,32), m.chrome);
  sp.position.z = 1.10; group.add(sp);
  ps.push({ mesh:sp, o:sp.position.clone(), d:new THREE.Vector3(0,0,4.8), spin:0.18 });

  /* -- Keyway -- */
  const kw = new THREE.Mesh(new THREE.BoxGeometry(.15,.11,.46), m.steel);
  kw.position.set(shaftR+0.06, 0, -1.52); group.add(kw);
  ps.push({ mesh:kw, o:kw.position.clone(), d:new THREE.Vector3(.8,0,-7.0), spin:0 });

  return ps;

}



/* ═══════════════════════════════════════════════════════════════

   MODEL 1 — TURBOFAN ENGINE

═══════════════════════════════════════════════════════════════ */

function buildTurbofan(group, m) {

  const ps = [];



  /* Outer nacelle casing */

  const nacelle=new THREE.Mesh(new THREE.CylinderGeometry(3.1,2.6,10.0,36,1,true),m.titanium);

  nacelle.rotation.x=Math.PI/2; group.add(nacelle);

  ps.push({mesh:nacelle,o:nacelle.position.clone(),d:new THREE.Vector3(0,0,0),spin:0});



  /* Front nacelle lip */

  const frontLip=new THREE.Mesh(new THREE.TorusGeometry(3.1,.18,18,52),m.chrome);

  frontLip.position.z=5.0; group.add(frontLip);

  ps.push({mesh:frontLip,o:frontLip.position.clone(),d:new THREE.Vector3(0,0,4.5),spin:0});



  /* Rear nacelle lip */

  const rearLip=new THREE.Mesh(new THREE.TorusGeometry(2.6,.15,14,44),m.steel);

  rearLip.position.z=-5.0; group.add(rearLip);

  ps.push({mesh:rearLip,o:rearLip.position.clone(),d:new THREE.Vector3(0,0,-5.5),spin:0});



  /* Nose cone (spinner) */

  const cone=new THREE.Mesh(new THREE.ConeGeometry(.82,1.9,22),m.silver);

  cone.rotation.x=-Math.PI/2; cone.position.z=5.6; group.add(cone);

  ps.push({mesh:cone,o:cone.position.clone(),d:new THREE.Vector3(0,0,8.0),spin:2.2});



  /* Fan hub disk */

  const fanHub=new THREE.Mesh(new THREE.CylinderGeometry(.76,.76,.5,24),m.steel);

  fanHub.rotation.x=Math.PI/2; fanHub.position.z=4.6; group.add(fanHub);

  ps.push({mesh:fanHub,o:fanHub.position.clone(),d:new THREE.Vector3(0,0,5.5),spin:2.2});



  /* 20 Fan blades */

  const fanDisc=new THREE.Group(); fanDisc.position.z=4.5; group.add(fanDisc);

  for (let i=0; i<20; i++) {

    const a=(i/20)*Math.PI*2;

    /* Blade: thin tapered box */

    const blade=new THREE.Mesh(new THREE.BoxGeometry(.20,2.1,.09),m.chrome);

    blade.position.set(Math.cos(a)*1.72,Math.sin(a)*1.72,0);

    blade.rotation.z=a+Math.PI*0.12; /* slight twist */

    fanDisc.add(blade);

  }

  ps.push({mesh:fanDisc,o:fanDisc.position.clone(),d:new THREE.Vector3(0,0,5.5),spin:2.2});



  /* Fan blade tips ring */

  const tipRing=new THREE.Mesh(new THREE.TorusGeometry(2.85,.06,8,44),m.silver);

  tipRing.position.z=4.5; group.add(tipRing);

  ps.push({mesh:tipRing,o:tipRing.position.clone(),d:new THREE.Vector3(0,0,5.5),spin:2.2});



  /* 3 Compressor stages */

  for (let s=0; s<3; s++) {

    const z=2.8-s*1.4, R=2.65-s*.22, nB=26+s*4;

    const disc=new THREE.Group(); disc.position.z=z; group.add(disc);

    for (let i=0; i<nB; i++) {

      const a=(i/nB)*Math.PI*2;

      const b=new THREE.Mesh(new THREE.BoxGeometry(.068,.52,.26),s%2===0?m.steel:m.titanium);

      b.position.set(Math.cos(a)*R,Math.sin(a)*R,0);

      b.rotation.z=a+Math.PI/2; disc.add(b);

    }

    /* Hub spool */

    const spool=new THREE.Mesh(new THREE.CylinderGeometry(.40,.40,.26,18),m.dark);

    disc.add(spool);

    const rate=.7+s*.35;

    ps.push({mesh:disc,o:disc.position.clone(),d:new THREE.Vector3(0,0,z-4.0),spin:s%2===0?rate:-rate});

  }



  /* Diffuser ring between compressor and combustor */

  const diffuser=new THREE.Mesh(new THREE.TorusGeometry(2.4,.22,12,44),m.steel);

  diffuser.position.z=.5; group.add(diffuser);

  ps.push({mesh:diffuser,o:diffuser.position.clone(),d:new THREE.Vector3(0,0,-2.5),spin:0});



  /* Combustion chamber (annular) */

  const comb=new THREE.Mesh(new THREE.TorusGeometry(1.85,.62,18,52),m.orange);

  comb.rotation.x=Math.PI/2; comb.position.z=-0.9; group.add(comb);

  ps.push({mesh:comb,o:comb.position.clone(),d:new THREE.Vector3(0,0,-4.0),spin:.07});



  /* 8 combustion cans */

  for (let i=0; i<8; i++) {

    const a=(i/8)*Math.PI*2;

    const can=new THREE.Mesh(new THREE.CylinderGeometry(.30,.26,1.55,14),m.orange);

    can.rotation.x=Math.PI/2; can.position.set(Math.cos(a)*1.85,Math.sin(a)*1.85,-.9); group.add(can);

    ps.push({mesh:can,o:can.position.clone(),d:new THREE.Vector3(Math.cos(a)*4.5,Math.sin(a)*4.5,-4.0),spin:.07});

  }



  /* 2 Turbine stages (gold blades — bright!) */

  for (let s=0; s<2; s++) {

    const z=-2.6-s*1.2, nB=36+s*4;

    const disc=new THREE.Group(); disc.position.z=z; group.add(disc);

    for (let i=0; i<nB; i++) {

      const a=(i/nB)*Math.PI*2;

      const b=new THREE.Mesh(new THREE.BoxGeometry(.060,.65,.24),s===0?m.gold:m.brass);

      b.position.set(Math.cos(a)*2.05,Math.sin(a)*2.05,0);

      b.rotation.z=a+Math.PI/2; disc.add(b);

    }

    disc.add(new THREE.Mesh(new THREE.CylinderGeometry(.40,.40,.24,18),m.dark));

    const rate=1.4-s*.5;

    ps.push({mesh:disc,o:disc.position.clone(),d:new THREE.Vector3(0,0,z-3.5),spin:rate});

  }



  /* Exhaust nozzle */

  const nozzle=new THREE.Mesh(new THREE.CylinderGeometry(2.2,1.5,2.2,28,1,true),m.steel);

  nozzle.rotation.x=Math.PI/2; nozzle.position.z=-5.8; group.add(nozzle);

  ps.push({mesh:nozzle,o:nozzle.position.clone(),d:new THREE.Vector3(0,0,-9.0),spin:0});



  /* Inner nozzle cone */

  const nCone=new THREE.Mesh(new THREE.ConeGeometry(.65,1.8,18),m.titanium);

  nCone.rotation.x=Math.PI/2; nCone.position.z=-5.9; group.add(nCone);

  ps.push({mesh:nCone,o:nCone.position.clone(),d:new THREE.Vector3(0,0,-8.5),spin:0});



  /* Central shaft */

  const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,12.5,12),m.chrome);

  shaft.rotation.x=Math.PI/2; group.add(shaft);

  ps.push({mesh:shaft,o:shaft.position.clone(),d:new THREE.Vector3(0,0,0),spin:2.2});



  /* Rear bearing support ring */

  const bearRing=new THREE.Mesh(new THREE.TorusGeometry(.80,.08,10,32),m.steel);

  bearRing.position.z=-4.2; group.add(bearRing);

  ps.push({mesh:bearRing,o:bearRing.position.clone(),d:new THREE.Vector3(0,0,-5.5),spin:0});



  return ps;

}



/* ═══════════════════════════════════════════════════════════════

   MODEL 2 — V4 PISTON ENGINE

═══════════════════════════════════════════════════════════════ */

function buildPistonEngine(group, m) {

  const ps = [];

  const CX = [-2.1, -0.7, 0.7, 2.1];



  /* Engine block */

  const block=new THREE.Mesh(new THREE.BoxGeometry(6.0,2.6,3.0),m.dark);

  block.position.y=-.4; group.add(block);

  ps.push({mesh:block,o:block.position.clone(),d:new THREE.Vector3(0,-5.0,0),spin:0});



  /* Block ribbing lines */

  for (let i=0; i<5; i++) {

    const rib=new THREE.Mesh(new THREE.BoxGeometry(.055,2.62,3.05),m.darkB);

    rib.position.set(-2.52+i*1.26,-.4,0); group.add(rib);

  }



  /* 4 Cylinder liners */

  CX.forEach((cx,i)=>{

    const liner=new THREE.Mesh(new THREE.CylinderGeometry(.50,.50,3.0,24,1,true),m.steel);

    liner.position.set(cx,1.0,0); group.add(liner);

    ps.push({mesh:liner,o:liner.position.clone(),d:new THREE.Vector3(cx*1.5,5.5,i*.5-.75),spin:0});

    /* Cylinder head per cylinder */

    const head=new THREE.Mesh(new THREE.BoxGeometry(1.05,.35,2.92),m.titanium);

    head.position.set(cx,2.66,0); group.add(head);

    ps.push({mesh:head,o:head.position.clone(),d:new THREE.Vector3(cx*1.5,6.0,i*.5-.75),spin:0});

  });



  /* 4 Pistons + connecting rods (paired objects for correct kinematics) */

  CX.forEach((cx,i)=>{

    const piston=new THREE.Mesh(new THREE.CylinderGeometry(.44,.44,.65,24),m.chrome);

    piston.position.set(cx,.5,0); group.add(piston);



    const rodGeom=new THREE.BoxGeometry(.12,1.4,.12);

    const rod=new THREE.Mesh(rodGeom,m.steel);

    rod.position.set(cx,-.1,0); group.add(rod);



    ps.push({

      pistonMesh: piston,

      rodMesh: rod,

      oP: piston.position.clone(),

      oR: rod.position.clone(),

      d: new THREE.Vector3(cx*1.5,5.5,i*.5-.75),

      spin: 0,

      pistonPhase: (i/4)*Math.PI*2,

      conrodPhase: (i/4)*Math.PI*2,

      cx: cx

    });

  });



  /* Crankshaft main journal */

  const crankMain=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,4.8,14),m.brass);

  crankMain.rotation.z=Math.PI/2; crankMain.position.y=-1.5; group.add(crankMain);

  ps.push({mesh:crankMain,o:crankMain.position.clone(),d:new THREE.Vector3(0,-5.5,0),spin:1.5});



  /* Crank webs + pins */

  const crankGroup=new THREE.Group(); crankGroup.position.y=-1.5; group.add(crankGroup);

  CX.forEach((cx,i)=>{

    const w1=new THREE.Mesh(new THREE.BoxGeometry(.22,.72,.28),m.gold);

    w1.position.set(cx,.36,0); crankGroup.add(w1);

    const pin=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.38,12),m.brass);

    pin.rotation.z=Math.PI/2; pin.position.set(cx,.72,0); crankGroup.add(pin);

    const w2=new THREE.Mesh(new THREE.BoxGeometry(.22,.72,.28),m.gold);

    w2.position.set(cx,-.36,0); crankGroup.add(w2);

    /* Main bearing webs between cylinders */

    const bWeb=new THREE.Mesh(new THREE.BoxGeometry(.14,.50,.32),m.brass);

    bWeb.position.set(cx-.7,0,0); crankGroup.add(bWeb);

  });

  ps.push({mesh:crankGroup,o:crankGroup.position.clone(),d:new THREE.Vector3(0,-5.0,0),spin:1.5});



  /* Valve cover */

  const valveCover=new THREE.Mesh(new THREE.BoxGeometry(6.2,.38,3.0),m.blue);

  valveCover.position.y=2.88; group.add(valveCover);

  ps.push({mesh:valveCover,o:valveCover.position.clone(),d:new THREE.Vector3(0,5.5,0),spin:0});



  /* Cam cover bolts */

  for (let i=0; i<7; i++) {

    const cb=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.58,8),m.brass);

    cb.position.set(-2.7+i*.9,3.04,1.25); group.add(cb);

  }



  /* Intake manifold */

  const intake=new THREE.Mesh(new THREE.BoxGeometry(5.2,.55,1.0),m.blue);

  intake.position.set(0,3.5,1.4); intake.rotation.x=-.2; group.add(intake);

  ps.push({mesh:intake,o:intake.position.clone(),d:new THREE.Vector3(0,6.0,3.0),spin:0});



  /* Intake runners */

  CX.forEach((cx,i)=>{

    const runner=new THREE.Mesh(new THREE.CylinderGeometry(.18,.22,.9,12),m.blueB);

    runner.rotation.x=-.3; runner.position.set(cx,3.12,.95); group.add(runner);

  });



  /* Exhaust headers (gold — bright!) */

  CX.forEach((cx,i)=>{

    const header=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,1.1,10),m.gold);

    header.rotation.x=.3; header.position.set(cx,2.88,-1.1); group.add(header);

  });



  /* Flywheel */

  const fw=new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,.30,36),m.dark);

  fw.rotation.z=Math.PI/2; fw.position.set(-3.25,-1.5,0); group.add(fw);

  ps.push({mesh:fw,o:fw.position.clone(),d:new THREE.Vector3(-6.5,-2.0,0),spin:1.5});



  /* Flywheel ring gear teeth */

  const fwRing=new THREE.Mesh(new THREE.TorusGeometry(1.3,.09,10,44),m.chrome);

  fwRing.rotation.x=Math.PI/2; fwRing.position.set(-3.25,-1.5,0); group.add(fwRing);

  ps.push({mesh:fwRing,o:fwRing.position.clone(),d:new THREE.Vector3(-6.5,-2.0,0),spin:1.5});



  /* Oil pan */

  const oilPan=new THREE.Mesh(new THREE.BoxGeometry(5.8,.72,2.8),m.darkB);

  oilPan.position.y=-2.42; group.add(oilPan);

  ps.push({mesh:oilPan,o:oilPan.position.clone(),d:new THREE.Vector3(0,-6.5,0),spin:0});



  /* Oil drain bolt */

  const drain=new THREE.Mesh(new THREE.CylinderGeometry(.10,.10,.28,8),m.brass);

  drain.position.set(0,-2.85,0); group.add(drain);



  return ps;

}



/* ═══════════════════════════════════════════════════════════════

   INIT — shared renderer, camera, controls

═══════════════════════════════════════════════════════════════ */

function initThree() {

  const canvas=document.getElementById('hero3d');

  if (!canvas || typeof THREE==='undefined') { console.warn('Three.js not ready'); return; }

  animRunning = true;

  const parent=canvas.parentElement, W=parent.clientWidth||1280, H=parent.clientHeight||700;

  const dragEl=document.getElementById('hero3d-drag')||canvas;



  renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // was 2: saves GPU fill-rate
  renderer.setSize(W,H); renderer.setClearColor(0x000000,0);
  // No shadow map — display model only, saves a full render pass

  camera=new THREE.PerspectiveCamera(38,W/H,.1,300);

  camera.position.set(0,2.5,20); camera.lookAt(0,.5,0);

  rightHalfX = Math.tan(19*Math.PI/180) * 20 * (W/H) * 0.5 - GEAR_OFFSET_X;

  clock=new THREE.Clock();



  loadModel();

  setupDrag(dragEl, parent);

  animate();

  // Pause render loop when hero is off-screen (e.g. user scrolled past)
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!animRunning) { animRunning = true; animate(); }
      } else {
        /* On mobile the canvas is position:fixed (always visible),
           so keep the loop running for the scroll-driven explode */
        if (window.innerWidth > 960) animRunning = false;
      }
    }, { threshold: 0 }).observe(heroSection);
  }

  // Cycle models disabled; keep only gearbox.
  modelCycleTimer = null;

}



function loadModel() {

  scene=new THREE.Scene();

  addLights(scene);

  rotGroup=new THREE.Group();

  rotGroup.rotation.x=0.32; rotGroup.rotation.y=-(25*Math.PI/180); rotGroup.scale.set(0.76,0.76,0.76);

  /* Start off-screen to the right for intro animation */
  gearIntroT = 0; gearIntroElapsed = 0;
  rotGroup.position.x = rightHalfX + GEAR_INTRO_DIST;

  scene.add(rotGroup);

  parts=[];

  explodeT=0; exploding=false; floatT=0; crankT=0;

  currentMode='rotate';



  const m=makeMats();

  // Keep only gearbox model for this site.
  parts=buildGearbox(rotGroup,m);


  /* Reset controls UI */

  document.querySelectorAll('.vctrl').forEach(b=>b.classList.remove('active'));

  const rb=document.getElementById('btn-rotate'); if(rb) rb.classList.add('active');



  /* Update model indicator */

  const ind=document.getElementById('model-indicator');

  if (ind) ind.textContent='PLANETARY GEARBOX';

}



/* ── Drag controls ──────────────────────────────────────────── */

function setupDrag(dragEl, parent) {

  let msx=0, msy=0;

  let didDrag = false;

  dragEl.addEventListener('mousedown',e=>{isDragging=true;didDrag=false;msx=e.clientX;msy=e.clientY;prevMouse={x:e.clientX,y:e.clientY};});

  window.addEventListener('mouseup',()=>{isDragging=false;});

  window.addEventListener('mousemove',e=>{

    if(!isDragging)return;

    if(Math.abs(e.clientX-msx)>4||Math.abs(e.clientY-msy)>4) didDrag=true;

    rotGroup.rotation.y+=(e.clientX-prevMouse.x)*.010;

    rotGroup.rotation.x+=(e.clientY-prevMouse.y)*.007;

    rotGroup.rotation.x=Math.max(-.9,Math.min(.9,rotGroup.rotation.x));

    prevMouse={x:e.clientX,y:e.clientY};

  });

  /* Click (no drag) — toggle explode / reset */
  dragEl.addEventListener('click',()=>{

    if(didDrag){didDrag=false;return;}

    if(scrollExplodeActive)return;

    if(explodeT<0.01&&!exploding){setMode('explode');}

    else{resetModel();}

  });

  dragEl.addEventListener('touchstart',e=>{isDragging=true;prevMouse={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});

  window.addEventListener('touchend',()=>isDragging=false);

  window.addEventListener('touchmove',e=>{if(!isDragging)return;rotGroup.rotation.y+=(e.touches[0].clientX-prevMouse.x)*.010;prevMouse={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});

  window.addEventListener('resize',()=>{const W2=parent.clientWidth||1280,H2=parent.clientHeight||700;camera.aspect=W2/H2;camera.updateProjectionMatrix();renderer.setSize(W2,H2);rightHalfX=Math.tan(19*Math.PI/180)*20*(W2/H2)*0.5-GEAR_OFFSET_X;if(rotGroup&&!scrollExplodeActive)rotGroup.position.x=rightHalfX;});

}



/* ── Render loop ────────────────────────────────────────────── */

function animate() {

  if (!animRunning) return;          // paused when hero off-screen

  requestAnimationFrame(animate);

  const dt=Math.min(clock.getDelta(),.05);

  floatT+=dt; crankT+=dt;



  /* ── Gear intro slide easing ───────────────────────────── */
  if (gearIntroT < 1) {
    gearIntroElapsed += dt;
    const t = Math.max(0, (gearIntroElapsed - GEAR_INTRO_DELAY) / GEAR_INTRO_DUR);
    // ease-out cubic
    gearIntroT = Math.min(1, 1 - Math.pow(1 - Math.min(t, 1), 3));
  }
  const gearIntroOffset = (1 - gearIntroT) * GEAR_INTRO_DIST;

  if (scrollExplodeActive) {

    /* fast snap toward the pre-explode angle */
    rotGroup.rotation.y += (scrollTargetY - rotGroup.rotation.y) * Math.min(1, dt * 14);
    rotGroup.position.y = 0;
    rotGroup.position.x = rightHalfX + gearIntroOffset;

  } else if (!isDragging && currentMode==='rotate') {

    rotGroup.rotation.y+=.0007;

    rotGroup.position.y=Math.sin(floatT*.52)*.04;

    rotGroup.position.x=rightHalfX + gearIntroOffset;

  }



  parts.forEach(p=>{

    if (p.spin && p.mesh) p.mesh.rotation.z += p.spin * dt;



    /* Piston + connecting-rod kinematics (only when assembled) */

    if (p.pistonMesh !== undefined && explodeT < .01) {

      const crankAngle = crankT * 3.0 + p.pistonPhase;

      const pistonY = p.oP.y + Math.sin(crankAngle) * 0.65;

      p.pistonMesh.position.y = pistonY;



      /* simple crank pin position (small X offset to give rod an angle) */

      const pinX = p.cx + Math.cos(crankAngle) * (crankRadius * 0.5);

      const pinY = crankCenterY + Math.sin(crankAngle) * crankRadius;

      const pistonPos = new THREE.Vector3(p.cx, pistonY, 0);

      const pinPos = new THREE.Vector3(pinX, pinY, 0);



      const rodVec = new THREE.Vector3().subVectors(pistonPos, pinPos);

      const rodLen = rodVec.length();

      const baseLen = 1.4; /* original rod geometry length */



      p.rodMesh.position.set((pistonPos.x + pinPos.x) * 0.5, (pistonPos.y + pinPos.y) * 0.5, 0);

      p.rodMesh.scale.y = rodLen / baseLen;

      p.rodMesh.rotation.z = Math.atan2(rodVec.x, rodVec.y);

    }

  });



  if (scrollExplodeActive) {

    if (explodeT !== scrollExplodeT) { explodeT = scrollExplodeT; applyExplode(explodeT); }

  } else if (exploding&&explodeT<1) {

    explodeT=Math.min(1,explodeT+dt*.55); applyExplode(explodeT);

  } else if (!exploding&&explodeT>0) {

    /* Graduated assembly: fast when far apart, progressively slower as parts
       approach their seated position — final 30% is very careful and deliberate.
       Above 0.4: normal approach speed.
       0.4 → 0.15: slow (~0.45 base).
       Below 0.15: very slow final seating (~0.15 base). */
    let assembleBase;
    if (explodeT > 0.4) {
      assembleBase = 1.4;
    } else if (explodeT > 0.15) {
      const f = (explodeT - 0.15) / 0.25; // 1→0 as we approach 0.15
      assembleBase = 0.45 + f * 0.95;
    } else {
      assembleBase = 0.15;
    }
    const assembleSpeed = assembleBase * (0.10 + 0.90 * explodeT);
    explodeT=Math.max(0,explodeT-dt*assembleSpeed); applyExplode(explodeT);

  }



  renderer.render(scene,camera);

}



function applyExplode(t) {

  const e=t<.5?2*t*t:-1+(4-2*t)*t;

  parts.forEach(p=>{

    if (p.mesh) {

      p.mesh.position.x = p.o.x + p.d.x * 3.0 * e;

      p.mesh.position.y = p.o.y + p.d.y * 3.0 * e;

      p.mesh.position.z = p.o.z + p.d.z * 3.0 * e;

    } else if (p.pistonMesh !== undefined) {

      p.pistonMesh.position.x = p.oP.x + p.d.x * 3.0 * e;

      p.pistonMesh.position.y = p.oP.y + p.d.y * 3.0 * e;

      p.pistonMesh.position.z = p.oP.z + p.d.z * 3.0 * e;

      p.rodMesh.position.x = p.oR.x + p.d.x * 3.0 * e;

      p.rodMesh.position.y = p.oR.y + p.d.y * 3.0 * e;

      p.rodMesh.position.z = p.oR.z + p.d.z * 3.0 * e;

    }

  });

}



/* ── Public API (called from HTML buttons) ──────────────────── */

function setMode(mode) {

  currentMode=mode; if(mode==='explode') exploding=true;

  document.querySelectorAll('.vctrl').forEach(b=>b.classList.remove('active'));

  const b=document.getElementById('btn-'+mode); if(b) b.classList.add('active');

}



function resetModel() {

  exploding=false; currentMode='rotate'; scrollExplodeActive=false; scrollExplodeT=0;

  if(rotGroup) { rotGroup.rotation.set(.32,-(25*Math.PI/180),0); rotGroup.position.set(rightHalfX,0,0); }

  document.querySelectorAll('.vctrl').forEach(b=>b.classList.remove('active'));

  const rb=document.getElementById('btn-rotate'); if(rb) rb.classList.add('active');

}

function setScrollExplode(t) {

  const SPIN_END = 0.15; /* first 15 % of scroll = spin phase */
  const TARGET_Y = -1.27; /* ~-73°: 20° more before explode */

  if (t < 0.005) {
    scrollExplodeActive = false; exploding = false;
    scrollExplodeT = 0; scrollTargetY = 0;
    return;
  }

  scrollExplodeActive = true;

  if (t <= SPIN_END) {
    /* spin phase — ease toward target angle, no explode yet */
    const sp = t / SPIN_END;
    const ease = sp < 0.5 ? 2*sp*sp : -1+(4-2*sp)*sp;
    scrollTargetY = ease * TARGET_Y;
    scrollExplodeT = 0;
  } else {
    /* explode phase — angle locked, expand */
    scrollTargetY = TARGET_Y;
    scrollExplodeT = Math.min(1, (t - SPIN_END) / (1 - SPIN_END));
  }

}
