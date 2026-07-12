/* ════════════════════════════════════════════════════════════════
   TANTRA · interactive guide
   Vanilla ES module. Three.js loaded via importmap CDN.
   Everything degrades gracefully if WebGL / three fails to load.
   ════════════════════════════════════════════════════════════════ */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────────────────────── DATA ───────────────────────── */

const PRINCIPLES = [
  ['Non-duality', 'Only one reality: Shiva–Shakti. Nothing is truly separate. The search ends in recognition, not acquisition.'],
  ['Immanence', 'The Divine is here — in the body, world, and senses, not only "beyond." You look more deeply in, not away.'],
  ['Shakti is supreme', 'Reach the Absolute through its Power — the Goddess. Energy and life-force are doorways, not distractions.'],
  ['Microcosm = macrocosm', '"As in the body, so in the universe." Working on yourself is working on the cosmos. The body is a temple.'],
  ['Everything vibrates', 'Reality is spanda — pulse. Sound and mantra literally re-tune your inner state. It is technology, not superstition.'],
  ['Transformation', 'No part of you is "bad." Anger, desire, fear are fuel to be redirected upward. Bhoga becomes yoga.'],
  ['Embodied freedom', 'Liberation is realized now, while alive — jivanmukti. Not postponed to after death.'],
  ['Transmission', 'Realization passes guru → disciple, living, not from books alone. Find a real teacher; books orient, a guru transmits.'],
];

const MAHAVIDYAS = [
  ['Kali', 'काली', 'Time · Death · Transformation', 'The fiercest, most direct face — She who is Time, devouring all forms back to their source. Her terror is compassion: it cuts away the false, fast. Stands upon Shiva — energy animating still consciousness.', 'fierce'],
  ['Tara', 'तारा', 'The Saving Word', 'The compassionate guide who ferries the seeker across the chaos and the void. The star that gives voice and rescue in the dark.', 'benign'],
  ['Tripura Sundari', 'त्रिपुरसुन्दरी', 'Radiant Beauty', 'The Beautiful One of the Three Worlds — the Goddess of Shri Vidya and the Sri Chakra. Abundance, harmony, and the union of Shiva and Shakti embodied.', 'benign'],
  ['Bhuvaneshvari', 'भुवनेश्वरी', 'Vast Space', 'The world-mother — infinite space itself, the expansion of vision, the womb in which all worlds appear.', 'benign'],
  ['Bhairavi', 'भैरवी', 'Fierce Inner Fire', 'Tapas and discipline — the fierce heat that burns away impurity. The fire of focused spiritual effort.', 'fierce'],
  ['Chhinnamasta', 'छिन्नमस्ता', 'Ego-Sacrifice', 'The self-decapitated Goddess — explosive kundalini and radical self-surrender. Life feeding life; the ego offered so awareness may flow free.', 'fierce'],
  ['Dhumavati', 'धूमावती', 'The Void · Endings', 'The widow, the smoke, the great void. Wisdom hidden in loss and endings — what remains when everything is stripped away.', 'fierce'],
  ['Bagalamukhi', 'बगलामुखी', 'Stillness · Stopping', 'She who stills — the power to halt, to master negativity, to freeze the restless mind and the enemy alike.', 'fierce'],
  ['Matangi', 'मातंगी', 'The Inner Voice', 'The outcaste wisdom — raw authenticity, art, and the inner voice that speaks beneath convention.', 'benign'],
  ['Kamalatmika', 'कमला', 'Grace · Prosperity', 'The Lotus Goddess, Lakshmi-like — prosperity, sweetness, and grace. Abundance as an expression of the sacred.', 'benign'],
];

// name, meaning, dev, body, color, description
const KOSHAS = [
  ['Annamaya', '"made of food"', 'अन्नमय', 'Gross body · sthūla', '#e0663f',
   'The physical, flesh body — built from food, sustained by food, and returning to food. The outermost sheath, the one born and dying, the vessel every other layer is wrapped inside.'],
  ['Pranamaya', '"made of prana"', 'प्राणमय', 'Subtle body · sūkṣma', '#ee9a34',
   'The vital-energy body. Prana moves as breath and life-force through the subtle channels (nadis), animating the physical form. When breath is steadied, this whole sheath grows calm.'],
  ['Manomaya', '"made of mind"', 'मनोमय', 'Subtle body · sūkṣma', '#e8cf3c',
   'The instinctive mind — sensation, emotion, and the ceaseless movement of liking and disliking. It processes the senses and colours experience with feeling.'],
  ['Vijnanamaya', '"made of wisdom"', 'विज्ञानमय', 'Subtle body · sūkṣma', '#4fae67',
   'The discerning intellect (buddhi) — the faculty of judgement, insight, and the sense of "I". Subtler than the emotional mind, it is where wisdom and choice arise.'],
  ['Anandamaya', '"made of bliss"', 'आनन्दमय', 'Causal body · kāraṇa', '#9a6fe0',
   'The causal sheath of bliss — a deep, thought-free peace that persists beneath all experience, felt most purely in dreamless sleep and deep meditation. The final, subtlest veil.'],
];

// The Self beyond the five sheaths — the scrolly finale.
const ATMAN = ['Atman', 'the Self', 'आत्मन्', 'Beyond all sheaths', '#ffffff',
  'Not a sheath at all — pure, unchanging awareness. Not something you have; the one who has the five sheaths, the light in which they appear and dissolve. Tantra adds: this innermost Self is not separate from Shiva–Shakti. You were always That.'];

// 7 chakras: name, sanskrit, location, element, bija(dev), bija(rom), petals, color, theme
const CHAKRAS = [
  ['Muladhara', 'मूलाधार', 'Base of spine', 'Earth', 'लं', 'LAM', 4, '#e34a4a', 'Survival & grounding. The root, where kundalini sleeps coiled.'],
  ['Svadhisthana', 'स्वाधिष्ठान', 'Sacrum', 'Water', 'वं', 'VAM', 6, '#f08a3c', 'Emotion & creativity. Flow, desire, and the waters of feeling.'],
  ['Manipura', 'मणिपूर', 'Navel', 'Fire', 'रं', 'RAM', 10, '#f0d43c', 'Will & power. The solar plexus — drive, transformation, digestion of life.'],
  ['Anahata', 'अनाहत', 'Heart', 'Air', 'यं', 'YAM', 12, '#4caf6a', 'Love & compassion. The bridge between the lower and upper worlds.'],
  ['Vishuddha', 'विशुद्ध', 'Throat', 'Ether', 'हं', 'HAM', 16, '#3c9ad4', 'Truth & expression. Pure space, sound, and authentic voice.'],
  ['Ajna', 'आज्ञा', 'Between eyebrows', 'Light / Mind', 'ॐ', 'OM', 2, '#5a5ad4', 'Insight & intuition — the third eye. Where Ida, Pingala & Sushumna meet.'],
  ['Sahasrara', 'सहस्रार', 'Crown', 'Pure consciousness', '·', '(silent)', 1000, '#b28bff', 'Union & transcendence. Where Shakti reunites with Shiva. 1000 petals.'],
];

const BIJAS = [
  ['ॐ', 'OM', 'the primordial sound', 261.63, '#e8c37a'],
  ['ह्रीं', 'HRĪṂ', 'dissolves illusion', 293.66, '#b28bff'],
  ['श्रीं', 'ŚRĪṂ', 'abundance, beauty', 329.63, '#e8c37a'],
  ['क्लीं', 'KLĪṂ', 'attraction, desire', 349.23, '#d96a8f'],
  ['क्रीं', 'KRĪṂ', 'power, transformation', 392.00, '#e34a4a'],
  ['ऐं', 'AIṂ', 'speech, knowledge', 440.00, '#3c9ad4'],
  ['दुं', 'DUṂ', 'protection', 493.88, '#f08a3c'],
  ['गं', 'GAṂ', 'removes obstacles', 523.25, '#4caf6a'],
];

const ROADMAP = [
  ['Study & orient', 'Understand the worldview before touching practice. This guide, then the reading list.'],
  ['Ethical foundation', 'Yama & niyama — truth, non-harm, moderation, contentment. Without this, subtle work is unstable.'],
  ['Body & breath', 'Hatha / asana for steadiness, plus simple alternate-nostril breathing to balance Ida & Pingala.'],
  ['Daily japa & meditation', 'An open mantra (Om Namah Shivaya / OM). Consistency at a fixed time beats intensity.'],
  ['Devotion & form', 'Choose an ishta devata — a form of the Divine you genuinely love.'],
  ['A genuine guru & diksha', 'Only when you find a verified teacher in a living lineage — receive a real sadhana mantra.'],
  ['Advanced practice', 'Shri Vidya, kundalini, kaula — ONLY under guidance. Never force. Never chase experiences.'],
];

/* ───────────────────────── DOM BUILDERS ───────────────────────── */

function el(tag, cls, html){
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

function buildPrinciples(){
  const wrap = document.getElementById('principle-cards');
  PRINCIPLES.forEach(([title, body], i) => {
    const c = el('div', 'card reveal');
    c.innerHTML = `<div class="num">${String(i+1).padStart(2,'0')}</div><h4>${title}</h4><p>${body}</p>`;
    c.style.transitionDelay = `${(i%4)*70}ms`;
    wrap.appendChild(c);
  });
}

function buildMahavidyas(){
  const grid = document.getElementById('mahavidya-grid');
  MAHAVIDYAS.forEach(([name, dev, title, essence, kind], i) => {
    const cell = el('button', `mv-cell ${kind} reveal`);
    cell.style.transitionDelay = `${(i%5)*60}ms`;
    cell.innerHTML = `<span class="mv-glyph">${dev}</span><span class="mv-nm">${name}</span><span class="mv-tag">${title}</span>`;
    cell.addEventListener('click', () => openMahavidya(i));
    grid.appendChild(cell);
  });
  // modal wiring
  const modal = document.getElementById('mahavidya-modal');
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openMahavidya(i){
  const [name, dev, title, essence, kind] = MAHAVIDYAS[i];
  document.getElementById('mv-dev').textContent = dev;
  document.getElementById('mv-name').textContent = name;
  document.getElementById('mv-title').textContent = title;
  document.getElementById('mv-essence').textContent = essence;
  document.getElementById('mv-meta').innerHTML =
    `<span>#${i+1} of 10</span><span>${kind === 'fierce' ? 'Fierce face' : 'Benign face'}</span>`;
  document.getElementById('mahavidya-modal').classList.add('open');
}
function closeModal(){ document.getElementById('mahavidya-modal').classList.remove('open'); }

// Shared scroll state for the kosha section (read by the 3D scene each frame).
const koshaState = { stage: 0 };       // 0 .. KOSHAS.length  (integer stages = one sheath each; final = Atman)

function buildKoshaScrolly(){
  const cardsWrap = document.getElementById('kosha-cards');
  const rail = document.getElementById('kosha-rail');
  const all = [...KOSHAS, ATMAN];

  all.forEach(([name, meaning, dev, body, color, desc], i) => {
    const isAtman = (i === KOSHAS.length);
    const card = el('article', 'kosha-card' + (isAtman ? ' atman' : ''));
    card.dataset.idx = i;
    card.style.setProperty('--kc', color);
    card.innerHTML = `
      <div class="kc-top"><span class="kc-dev" style="color:${color}">${dev}</span>
        <span class="kc-name">${name}</span></div>
      <div class="kc-meaning">${meaning}</div>
      <span class="kc-body">${body}</span>
      <p>${desc}</p>`;
    cardsWrap.appendChild(card);

    const dot = el('div', 'kr-dot');
    dot.style.setProperty('--kc', color);
    dot.innerHTML = `<span>${isAtman ? 'Ātman' : name}</span><i></i>`;
    rail.appendChild(dot);
  });

  const cards = [...cardsWrap.children];
  const dots = [...rail.children];
  cards[0].classList.add('active');
  dots[0].classList.add('on');

  const section = document.getElementById('koshas');
  const N = KOSHAS.length;              // 5 sheaths; stage runs 0..N (N = Atman)
  let active = 0;

  function onScroll(){
    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    // p: 0 when section top hits viewport top, 1 at the end
    const p = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    koshaState.stage = p * N;
    const idx = Math.min(Math.round(koshaState.stage), N);
    if (idx !== active){
      active = idx;
      cards.forEach((c, i) => c.classList.toggle('active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('on', i === idx));
    }
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

function buildBijas(){
  const grid = document.getElementById('bija-grid');
  BIJAS.forEach(([syl, name, use, freq, color], i) => {
    const cell = el('button', 'bija-cell reveal');
    cell.style.transitionDelay = `${(i%4)*60}ms`;
    cell.style.setProperty('--glow', hexToGlow(color));
    cell.innerHTML = `<span class="b-syl" style="color:${color}">${syl}</span><span class="b-nm">${name}</span><span class="b-use">${use}</span>`;
    cell.addEventListener('click', () => { playTone(freq); ring(cell); });
    grid.appendChild(cell);
  });
}

function buildRoadmap(){
  const ol = document.getElementById('roadmap');
  ROADMAP.forEach(([title, body]) => {
    const li = el('li', 'reveal');
    li.innerHTML = `<strong>${title}</strong><span>${body}</span>`;
    ol.appendChild(li);
  });
}

function hexToGlow(hex){
  const n = parseInt(hex.slice(1),16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},.6)`;
}
function ring(cell){
  cell.classList.add('ringing');
  setTimeout(() => cell.classList.remove('ringing'), 700);
}

/* ───────────────────────── AUDIO (bija tones) ───────────────────────── */
let audioCtx = null;
function playTone(freq){
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const t = audioCtx.currentTime;
    const gain = audioCtx.createGain();
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.18, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
    // fundamental + a soft fifth for a "sung" resonance
    [[freq,1],[freq*1.5,0.4],[freq*2,0.2]].forEach(([f,a]) => {
      const o = audioCtx.createOscillator();
      o.type = 'sine'; o.frequency.value = f;
      const g2 = audioCtx.createGain(); g2.gain.value = a;
      o.connect(g2); g2.connect(gain);
      o.start(t); o.stop(t + 2.4);
    });
  }catch(e){/* audio unsupported — silent */}
}

/* ───────────────────────── SCROLL / NAV / DOTS ───────────────────────── */

function initReveal(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(n => io.observe(n));
}

function initProgress(){
  const bar = document.getElementById('progress-bar');
  const nav = document.getElementById('topnav');
  const onScroll = () => {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
    bar.style.width = (p*100) + '%';
    nav.classList.toggle('scrolled', h.scrollTop > 40);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initNavToggle(){
  const btn = document.getElementById('nav-toggle');
  const nav = document.querySelector('#topnav nav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); btn.textContent = '☰'; btn.setAttribute('aria-expanded', false);
  }));
}

function initDots(){
  const dotsWrap = document.getElementById('dots');
  const sections = [...document.querySelectorAll('main section')];
  const labels = { hero:'Start', meaning:'Not two', principles:'Principles', 'shiva-shakti':'Shiva·Shakti',
    families:'Lineages', mahavidyas:'Mahavidyas', sriyantra:'Sri Yantra', koshas:'Koshas',
    chakras:'Chakras', mantra:'Mantra', goal:'The Goal', path:'Path' };
  sections.forEach(s => {
    const b = el('button');
    b.dataset.label = labels[s.id] || s.id;
    b.setAttribute('aria-label', labels[s.id] || s.id);
    b.addEventListener('click', () => s.scrollIntoView({ behavior: prefersReduced ? 'auto':'smooth' }));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];
  // Center-band detection: a section is "active" while it crosses the viewport's
  // vertical middle — works for both short sections and the tall pinned koshas.
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        const i = sections.indexOf(e.target);
        dots.forEach((d,di) => d.classList.toggle('active', di === i));
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  sections.forEach(s => io.observe(s));
}

/* ═══════════════════════════════════════════════════════════════
   THREE.JS SCENES
   ═══════════════════════════════════════════════════════════════ */

async function initThree(){
  let THREE;
  try{
    THREE = await import('three');
  }catch(e){
    console.warn('three.js failed to load — running in 2D fallback mode.', e);
    return;
  }

  // Render only when a scene's mount is on screen, to save the GPU.
  const runners = [];
  function register(mount, api){
    let visible = false;
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { visible = e.isIntersecting; });
    }, { threshold: 0.05 });
    io.observe(mount);
    runners.push({ get visible(){ return visible; }, api });
  }

  heroScene(THREE, register);
  sriYantraScene(THREE, register);
  koshaScene(THREE, register);
  chakraScene(THREE, register);

  let last = performance.now();
  function loop(now){
    const dt = Math.min((now - last)/1000, 0.05); last = now;
    runners.forEach(r => { if (r.visible) r.api.tick(dt, now/1000); });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/* helper: standard renderer bound to a mount that owns its own <canvas> */
function makeRenderer(THREE, mount, canvas){
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const resize = () => {
    const w = mount.clientWidth || window.innerWidth;
    const h = mount.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    return { w, h };
  };
  return { renderer, resize };
}

/* ─── HERO: nebula of particles + rotating luminous triangles + bindu ─── */
function heroScene(THREE, register){
  const canvas = document.getElementById('bg-canvas');
  const mount = document.getElementById('hero');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  cam.position.z = 26;

  // particle field
  const N = 1400;
  const pos = new Float32Array(N*3);
  const col = new Float32Array(N*3);
  const cA = new THREE.Color('#8a63d2'), cB = new THREE.Color('#e8c37a');
  for (let i=0;i<N;i++){
    const r = 8 + Math.pow(Math.random(),.6)*26;
    const th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1);
    pos[i*3]   = r*Math.sin(ph)*Math.cos(th);
    pos[i*3+1] = r*Math.sin(ph)*Math.sin(th)*0.65;
    pos[i*3+2] = r*Math.cos(ph);
    const c = cA.clone().lerp(cB, Math.random());
    col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color', new THREE.BufferAttribute(col,3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.14, vertexColors: true, transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(pts);

  // interlocking triangles (Shiva up / Shakti down) — luminous wireframe
  const triGroup = new THREE.Group();
  function triangle(radius, up, color){
    const s = up ? 1 : -1;
    const v = [];
    for (let k=0;k<3;k++){
      const a = s*(Math.PI/2 + k*2*Math.PI/3);
      v.push(new THREE.Vector3(radius*Math.cos(a), radius*Math.sin(a), 0));
    }
    v.push(v[0].clone());
    const g = new THREE.BufferGeometry().setFromPoints(v);
    return new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent:true, opacity:.5 }));
  }
  triGroup.add(triangle(6.5, true, '#bcd4ff'));
  triGroup.add(triangle(6.5, false, '#d96a8f'));
  triGroup.add(triangle(4.2, true, '#8a63d2'));
  triGroup.add(triangle(4.2, false, '#e8c37a'));
  scene.add(triGroup);

  // bindu
  const bindu = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 24, 24),
    new THREE.MeshBasicMaterial({ color: '#fff' })
  );
  scene.add(bindu);
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 24, 24),
    new THREE.MeshBasicMaterial({ color: '#e8c37a', transparent:true, opacity:.25, blending:THREE.AdditiveBlending })
  );
  scene.add(glow);

  let mx = 0, my = 0;
  window.addEventListener('pointermove', e => {
    mx = (e.clientX/window.innerWidth - .5);
    my = (e.clientY/window.innerHeight - .5);
  });

  function resize(){
    const w = mount.clientWidth, h = mount.clientHeight || window.innerHeight;
    cam.aspect = w/h; cam.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener('resize', resize); resize();

  register(mount, { tick: (dt, t) => {
    pts.rotation.y = t*0.04;
    pts.rotation.x = Math.sin(t*0.1)*0.1;
    triGroup.rotation.z = t*0.08;
    if (prefersReduced){ triGroup.rotation.z = 0; }
    const s = 1 + Math.sin(t*1.5)*0.18;
    glow.scale.setScalar(s);
    glow.material.opacity = 0.18 + Math.sin(t*1.5)*0.08;
    cam.position.x += (mx*6 - cam.position.x)*0.04;
    cam.position.y += (-my*4 - cam.position.y)*0.04;
    cam.lookAt(0,0,0);
    renderer.render(scene, cam);
  }});
}

/* ─── SRI YANTRA: layered line geometry, slow rotate + breathing bindu ─── */
function sriYantraScene(THREE, register){
  const mount = document.getElementById('sriyantra-mount');
  if (!mount) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'kosha-mount-canvas';
  mount.appendChild(canvas);
  const { renderer, resize } = makeRenderer(THREE, mount, canvas);
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  cam.position.set(0, 0, 12);

  const group = new THREE.Group();
  scene.add(group);
  const gold = '#e8c37a', violet = '#b28bff', rose = '#d96a8f', blue='#bcd4ff';

  function addLine(points, color, opacity=0.9){
    const g = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p[0], p[1], 0)));
    group.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent:true, opacity })));
  }
  function poly(cx, cy, r, sides, rot, color, op){
    const pts=[];
    for (let i=0;i<=sides;i++){ const a = rot + i*2*Math.PI/sides; pts.push([cx+r*Math.cos(a), cy+r*Math.sin(a)]); }
    addLine(pts, color, op);
  }
  // Outer square (bhupura) with gates
  const S=4.6;
  [S-0.5, S].forEach((s,i)=>addLine([[-s,-s],[s,-s],[s,s],[-s,s],[-s,-s]], gold, i?0.9:0.5));
  // gates (T-shapes on 4 sides)
  const g=0.7;
  [[0,1],[0,-1],[1,0],[-1,0]].forEach(([dx,dy])=>{
    addLine([[dx*S-dy*g, dy*S-dx*g],[dx*S+dy*g, dy*S+dx*g]], gold, 0.9);
  });
  // Lotus rings (16 and 8 petals) — draw as small arcs/circles around ring
  function petals(radius, count, petalR, color){
    for (let i=0;i<count;i++){
      const a = i*2*Math.PI/count;
      poly(radius*Math.cos(a), radius*Math.sin(a), petalR, 12, 0, color, 0.5);
    }
    poly(0,0,radius,64,0,color,0.35);
  }
  petals(3.55, 16, 0.42, rose);
  petals(2.85, 8, 0.42, violet);
  poly(0,0,2.35,64,0,gold,0.6); // inner boundary circle

  // Nine interlocking triangles — 4 up (Shiva), 5 down (Shakti). Stylised, concentric.
  const ups = [2.15, 1.5, 0.95, 0.5];
  const downs = [2.2, 1.65, 1.1, 0.68, 0.32];
  function tri(r, up, color){
    const s = up?1:-1; const pts=[];
    for (let k=0;k<=3;k++){ const a = s*(Math.PI/2 + k*2*Math.PI/3); pts.push([r*Math.cos(a), r*Math.sin(a)]); }
    addLine(pts, color, 0.85);
  }
  ups.forEach(r=>tri(r,true,blue));
  downs.forEach(r=>tri(r,false,rose));

  // Bindu
  const bindu = new THREE.Mesh(new THREE.CircleGeometry(0.14, 24), new THREE.MeshBasicMaterial({ color:'#fff' }));
  group.add(bindu);
  const halo = new THREE.Mesh(new THREE.CircleGeometry(0.4, 24),
    new THREE.MeshBasicMaterial({ color: gold, transparent:true, opacity:.4, blending:THREE.AdditiveBlending }));
  group.add(halo);

  function fit(){
    const { w, h } = resize();
    cam.aspect = w/h; cam.updateProjectionMatrix();
    // scale group to fit
    const fov = cam.fov*Math.PI/180;
    cam.position.z = 5.2 / Math.tan(fov/2) / Math.min(1, w/h) * 0.62;
  }
  window.addEventListener('resize', fit); fit();

  register(mount, { tick: (dt, t) => {
    if (!prefersReduced) group.rotation.z = t*0.05;
    const s = 1 + Math.sin(t*1.2)*0.35;
    halo.scale.setScalar(s);
    halo.material.opacity = 0.25 + Math.sin(t*1.2)*0.15;
    renderer.render(scene, cam);
  }});
}

/* ─── KOSHAS: five nested shells that peel away as you scroll (Apple-style) ─── */
function koshaScene(THREE, register){
  const mount = document.getElementById('koshas-mount');
  if (!mount) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'kosha-mount-canvas';
  mount.appendChild(canvas);
  const { renderer, resize } = makeRenderer(THREE, mount, canvas);
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  cam.position.set(0, 0, 7);
  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const key = new THREE.PointLight(0xffffff, 1.3); key.position.set(5,6,7); scene.add(key);
  const rim = new THREE.PointLight(0x8a63d2, 0.8); rim.position.set(-6,-3,4); scene.add(rim);

  const N = KOSHAS.length;
  const shells = [];
  const radii = [2.5, 2.02, 1.56, 1.12, 0.7];   // outer → inner
  KOSHAS.forEach(([name,,,,color], i) => {
    const c = new THREE.Color(color);
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(radii[i], 3),
      new THREE.MeshStandardMaterial({
        color:c, transparent:true, opacity:0.2, roughness:0.32, metalness:0.15,
        side:THREE.DoubleSide, emissive:c, emissiveIntensity:0.2, depthWrite:false,
      })
    );
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(radii[i]+0.01, 1),
      new THREE.MeshBasicMaterial({ color:c, wireframe:true, transparent:true, opacity:0.25, depthWrite:false })
    );
    mesh.add(wire);
    mesh.renderOrder = N - i;           // draw inner shells last so they read through
    scene.add(mesh);
    shells.push({ mesh, wire, color:c, radius:radii[i] });
  });

  // Atman — luminous core + halo
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 32),
    new THREE.MeshBasicMaterial({ color:0xffffff }));
  core.renderOrder = 999; scene.add(core);
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32),
    new THREE.MeshBasicMaterial({ color:0xffe9b0, transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false }));
  halo.renderOrder = 998; scene.add(halo);

  const clamp = (v,a,b)=>Math.min(Math.max(v,a),b);
  const smooth = x => x*x*(3-2*x);

  function fit(){ const {w,h}=resize(); cam.aspect=w/h; cam.updateProjectionMatrix(); }
  window.addEventListener('resize', fit); fit();

  register(mount, { tick: (dt, t) => {
    const stage = koshaState.stage;            // 0 .. N
    // subtle dolly inward as we descend the sheaths
    const zoom = 7 - clamp(stage/N,0,1)*2.4;
    cam.position.z += (zoom - cam.position.z)*0.08;

    shells.forEach((s, i) => {
      const d = stage - i;                     // <0 upcoming (inner), 0 focus, →1 peeling away
      const peeled = smooth(clamp(d, 0, 1));
      const focus = 1 - clamp(Math.abs(d), 0, 1);
      // opacity: fade in as it becomes focus (d:-1→0), fade out as it peels (d:0→1)
      const op = d <= 0 ? (0.06 + 0.52*clamp(1+d,0,1)) : 0.58*(1-peeled);
      s.mesh.material.opacity += (op - s.mesh.material.opacity)*0.12;
      s.mesh.material.emissiveIntensity = 0.15 + focus*0.7;
      s.wire.material.opacity += ((op*0.8 + focus*0.25) - s.wire.material.opacity)*0.12;
      const sc = 1 + peeled*0.9;                // opened shells expand outward
      s.mesh.scale.setScalar(s.mesh.scale.x + (sc - s.mesh.scale.x)*0.14);
      if (!prefersReduced){
        s.mesh.rotation.y += dt*(0.12 + i*0.02);
        s.mesh.rotation.x = Math.sin(t*0.15 + i)*0.12;
      }
    });

    // Atman blooms during the final sheath → finale
    const bloom = smooth(clamp(stage-(N-1), 0, 1));
    core.scale.setScalar((0.6 + bloom*1.1) * (1 + Math.sin(t*2)*0.06));
    halo.material.opacity = bloom*0.5 * (0.7 + Math.sin(t*1.5)*0.3);
    halo.scale.setScalar((1 + bloom*1.4) * (1 + Math.sin(t*1.5)*0.08));
    renderer.render(scene, cam);
  }});
}

/* ─── CHAKRAS: vertical column of glowing lotus nodes + kundalini rise ─── */
function chakraScene(THREE, register){
  const mount = document.getElementById('chakra-mount');
  if (!mount) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'kosha-mount-canvas';
  mount.appendChild(canvas);
  const { renderer, resize } = makeRenderer(THREE, mount, canvas);
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  cam.position.set(0, 0, 9);
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));

  // spine / sushumna
  const spineTop = 4.2, spineBot = -4.2;
  const spineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, spineBot, 0), new THREE.Vector3(0, spineTop, 0)
  ]);
  scene.add(new THREE.Line(spineGeo, new THREE.LineBasicMaterial({ color:'#5a4a7a', transparent:true, opacity:0.5 })));

  // ida / pingala helices
  function helix(sign, color){
    const pts=[]; const turns=3.2;
    for (let i=0;i<=160;i++){
      const u=i/160; const y=spineBot+(spineTop-spineBot)*u;
      const a=sign*u*turns*Math.PI*2;
      pts.push(new THREE.Vector3(Math.cos(a)*0.55, y, Math.sin(a)*0.55));
    }
    const g=new THREE.BufferGeometry().setFromPoints(pts);
    return new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent:true, opacity:0.35 }));
  }
  scene.add(helix(1, '#f0a83c'));   // pingala (solar)
  scene.add(helix(-1, '#7a9ad4'));  // ida (lunar)

  const nodes = [];
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  CHAKRAS.forEach((c, i) => {
    const color = c[7];
    const y = spineBot + (spineTop - spineBot) * (i/(CHAKRAS.length-1));
    const grp = new THREE.Group();
    grp.position.y = y;

    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 24, 24),
      new THREE.MeshStandardMaterial({ color, emissive:new THREE.Color(color), emissiveIntensity:0.6, roughness:0.4 })
    );
    orb.userData.idx = i;
    grp.add(orb);

    // petal ring
    const petalCount = Math.min(c[6], 24);
    const ring = new THREE.Group();
    for (let k=0;k<petalCount;k++){
      const a = k*2*Math.PI/petalCount;
      const petal = new THREE.Mesh(
        new THREE.CircleGeometry(0.12, 12),
        new THREE.MeshBasicMaterial({ color, transparent:true, opacity:0.4, side:THREE.DoubleSide, blending:THREE.AdditiveBlending })
      );
      petal.position.set(Math.cos(a)*0.62, Math.sin(a)*0.62, 0);
      ring.add(petal);
    }
    grp.add(ring);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 20, 20),
      new THREE.MeshBasicMaterial({ color, transparent:true, opacity:0.12, blending:THREE.AdditiveBlending })
    );
    grp.add(halo);

    scene.add(grp);
    nodes.push({ grp, orb, ring, halo, color, y, lit: 0 });
  });

  // kundalini serpent (a rising point light + trail sphere)
  const kund = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16),
    new THREE.MeshBasicMaterial({ color:'#fff', transparent:true, opacity:0 }));
  kund.position.y = spineBot;
  scene.add(kund);
  let rising = false, riseP = 0;
  const btn = document.getElementById('kundalini-btn');
  if (btn) btn.addEventListener('click', () => { rising = true; riseP = 0; nodes.forEach(n=>n.lit=0); });

  // interaction: click a chakra
  function pick(clientX, clientY){
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((clientX-rect.left)/rect.width)*2 - 1;
    pointer.y = -((clientY-rect.top)/rect.height)*2 + 1;
    raycaster.setFromCamera(pointer, cam);
    const hits = raycaster.intersectObjects(nodes.map(n=>n.orb));
    if (hits.length){ selectChakra(hits[0].object.userData.idx); }
  }
  canvas.addEventListener('click', e => pick(e.clientX, e.clientY));
  canvas.style.cursor = 'pointer';

  let selected = -1;
  function selectChakra(i){
    selected = i;
    const c = CHAKRAS[i];
    const box = document.getElementById('chakra-detail');
    box.style.borderColor = c[7];
    box.innerHTML = `
      <h3 style="color:${c[7]}">${c[0]} <span class="cd-sanskrit">${c[1]}</span></h3>
      <div class="cd-meta">
        <span>${c[2]}</span><span>${c[3]}</span><span>${c[6]} petals</span>
        <span class="cd-bija" style="color:${c[7]}">${c[4]} · ${c[5]}</span>
      </div>
      <p>${c[8]}</p>`;
  }

  function fit(){ const {w,h}=resize(); cam.aspect=w/h; cam.updateProjectionMatrix(); }
  window.addEventListener('resize', fit); fit();

  register(mount, { tick: (dt, t) => {
    // gentle sway
    scene.rotation.y = Math.sin(t*0.2)*0.25;

    if (rising){
      riseP += dt*0.28;
      const y = spineBot + (spineTop - spineBot)*Math.min(riseP,1);
      kund.position.y = y;
      kund.material.opacity = riseP < 1 ? 1 : Math.max(0, 1-(riseP-1)*2);
      kund.scale.setScalar(1 + Math.sin(t*10)*0.15);
      nodes.forEach(n => { if (y >= n.y - 0.15) n.lit = Math.min(1, n.lit + dt*2.5); });
      if (riseP > 1.6){ rising = false; kund.material.opacity = 0; }
    }

    nodes.forEach((n, i) => {
      n.ring.rotation.z += dt*0.3*(i%2?1:-1);
      const sel = (i === selected);
      const base = 0.5 + Math.sin(t*1.5 + i)*0.1;
      const emis = base + n.lit*0.9 + (sel?0.6:0);
      n.orb.material.emissiveIntensity = emis;
      n.halo.material.opacity = 0.1 + n.lit*0.25 + (sel?0.15:0);
      const targetScale = 1 + n.lit*0.25 + (sel?0.2:0);
      n.grp.scale.setScalar(n.grp.scale.x + (targetScale - n.grp.scale.x)*0.15);
    });
    renderer.render(scene, cam);
  }});

  // preselect root
  selectChakra(0);
}

/* ───────────────────────── BOOT ───────────────────────── */

function boot(){
  buildPrinciples();
  buildMahavidyas();
  buildKoshaScrolly();
  buildBijas();
  buildRoadmap();
  initReveal();
  initProgress();
  initNavToggle();
  initDots();
  initThree();

  // hide loader
  const hide = () => {
    const l = document.getElementById('loader');
    if (l){ l.classList.add('done'); setTimeout(()=>l.remove(), 900); }
  };
  window.addEventListener('load', () => setTimeout(hide, 500));
  setTimeout(hide, 3500); // safety net
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
