/* ============================================================
   DEAR FUTURE JUANI — script.js
   Toda la personalización del sitio está en esta sección CONFIG.
   No hace falta tocar nada más abajo para cambiar nombre,
   fechas o textos.
   (Los comentarios de este archivo quedan en portugués, para
   quien esté armando el regalo — los textos que ve Juani en el
   sitio están todos en español.)
   ============================================================ */

const traveler = {
  name: "Juani",             // único usuário do site
  origin: "Argentina",
  destination: "Europa",
  departureDate: "2026-08-15"   // formato AAAA-MM-DD — data real da partida
};

// ------------------------------------------------------------
// BACKUP NA NUVEM (opcional)
// Como o site é 100% estático (sem servidor próprio), usamos o
// kvdb.io — um serviço gratuito de "chave e valor" que não exige
// cadastro — para guardar uma cópia de tudo o que for digitado,
// e assim acessar de qualquer dispositivo/navegador.
//
// Na primeira visita o site cria um "bucket" (uma gaveta só sua)
// sozinho e mostra o código na tela. Copie esse código e cole
// abaixo, em bucketId, para usar SEMPRE a mesma gaveta — inclusive
// em outros celulares/computadores. Se deixar em branco, cada
// navegador cria a sua própria gaveta na primeira vez que abrir.
//
// Importante: o kvdb.io não tem login nem senha — quem tiver o
// código do bucket consegue ler os dados. Trate o código como uma
// senha simples e não publique ele em lugares abertos.
// ------------------------------------------------------------
const cloudSync = {
  enabled: true,
  bucketId: ""   // ex: "a1b2c3d4e5f6" — cole aqui o código mostrado no primeiro acesso
};

// ------------------------------------------------------------
// CARTAS ATRAVÉS DO TEMPO
// ------------------------------------------------------------
// Existem dois tipos de carta nessa seção:
//
// 1) selfLetterPresets — datas sugeridas para as cartas que o
//    Juani escreve para o PRÓPRIO futuro. Essas cartas NUNCA
//    ficam guardadas neste site: ele escreve, o texto é copiado
//    para a área de transferência e o envio de verdade acontece
//    no FutureMe (futureme.org), que cuida do armazenamento e da
//    entrega. Isso é proposital — não existe API pública do
//    FutureMe para integrar automaticamente, e mesmo que
//    existisse, cartas pessoais não deveriam passar pelo nosso
//    servidor.
//
// 2) emailLetters — um AVISO de que você (quem está montando o
//    presente) já escreveu cartas para o Juani através do
//    FutureMe, e elas vão chegar direto no e-mail dele nessas
//    datas. O site só mostra o aviso — o conteúdo dessas cartas
//    não existe aqui, porque a entrega é por e-mail, fora do site.
//
// Os textos abaixo (label/desc/prompt) já estão em espanhol
// porque é o que o Juani vê na tela.
// ------------------------------------------------------------

const selfLetterPresets = [
  { id: "uma-semana", icon: "📮", label: "Una semana después", date: "2026-08-20",
    desc: "Para el vos que acaba de llegar." },
  { id: "aniversario", icon: "🎂", label: "Tu cumpleaños", date: "2026-09-12",
    desc: "Para el vos que va a estar festejando el primer cumpleaños lejos de casa." },
  { id: "natal", icon: "🎄", label: "Navidad", date: "2026-12-25",
    desc: "Para el vos que va a estar viviendo la primera Navidad de esta nueva etapa." },
  { id: "ano-novo", icon: "✨", label: "Año Nuevo", date: "2027-01-01",
    desc: "Para el vos que acaba de cerrar un capítulo y empezar otro." },
  { id: "seis-meses", icon: "🌙", label: "Seis meses en Europa", date: "2027-02-15",
    desc: "Seis meses después de haber viajado.",
    prompt: "Seis meses.\n\nMedio año desde que te fuiste." },
  { id: "um-ano", icon: "🌍", label: "Un año en Europa", date: "2027-08-15",
    desc: "Un año desde que llegaste.",
    promptTitle: "Carta de un año",
    prompt: "Hace exactamente un año te fuiste hacia una vida que todavía no conocías.\n\nQuien eras ese día probablemente no imaginaba todo lo que iba a pasar después.\n\nEscribile a esa persona." }
];

// As datas e os textos abaixo são exatamente os que você já
// escreveu e agendou no FutureMe. Se alguma data mudar, edite
// aqui também para o aviso no site continuar batendo com a
// realidade.
const emailLetters = [
  { icon: "📮", label: "Una semana después de llegar a Madrid", date: "2026-08-20" },
  { icon: "🎂", label: "Tu cumpleaños", date: "2026-09-12" },
  { icon: "🎄", label: "Navidad", date: "2026-12-25" },
  { icon: "✨", label: "Año Nuevo", date: "2027-01-01" },
  { icon: "🌙", label: "15 de febrero de 2027", date: "2027-02-15" },
  { icon: "🌍", label: "Un año desde que te fuiste a Europa", date: "2027-08-15" }
];

const ritualCategories = [
  { id: "comer", label: "Comer", icon: "🍷" },
  { id: "explorar", label: "Explorar", icon: "🌍" },
  { id: "sentir", label: "Sentir", icon: "❤️" },
  { id: "memorias", label: "Recuerdos", icon: "📸" }
];

const rituals = [
  {
    id: "cafe-desconhecido", cat: "comer", num: "01",
    title: "El café desconocido",
    prompt: "Entrá a un café sin mirar reseñas.",
    questions: ["¿Qué pediste?", "¿Qué olor te llamó la atención?", "¿Cómo era el lugar?", "¿Volverías?"]
  },
  {
    id: "prato-desconhecido", cat: "comer", num: "02",
    title: "El plato desconocido",
    prompt: "Pedí algo que nunca probarías en Argentina.",
    questions: ["¿Qué pediste?", "¿Te gustó?", "¿Le darías otra oportunidad?"]
  },
  {
    id: "memoria-de-alguem", cat: "comer", num: "03",
    title: "El recuerdo de alguien",
    prompt: "Descubrí qué plato de esa ciudad le hace acordar a alguien de su infancia.",
    questions: ["¿Quién te contó esa historia?", "¿Cuál era el plato?", "¿Por qué es importante para esa persona?"]
  },
  {
    id: "se-perder", cat: "explorar", num: "04",
    title: "Perderte",
    prompt: "Hoy vas a caminar por una calle sin usar GPS.",
    questions: ["¿A dónde llegaste?", "¿Qué encontraste?", "¿Te gustó perderte?"]
  },
  {
    id: "a-praca", cat: "explorar", num: "05",
    title: "La plaza",
    prompt: "Sentate en una plaza durante 20 minutos sin tocar el celular.",
    questions: ["¿Cuántos idiomas escuchaste?", "¿Qué estaba haciendo la gente?", "¿Qué pensaste durante esos 20 minutos?"]
  },
  {
    id: "lugar-secreto", cat: "explorar", num: "06",
    title: "El lugar secreto",
    prompt: "Encontrá un lugar que te gustaría mostrarle a alguien que querés.",
    questions: ["¿Dónde queda?", "¿Por qué elegirías mostrar ese lugar?"]
  },
  {
    id: "caminho-de-casa", cat: "explorar", num: "07",
    title: "El camino a casa",
    prompt: "Hacé una caminata sin destino. Elegí una calle solo porque te pareció linda.",
    questions: ["¿A dónde te llevó esa calle?", "¿Qué la hizo linda?"]
  },
  {
    id: "saudade", cat: "sentir", num: "08",
    title: "Nostalgia",
    prompt: "Escribí algo que extrañaste hoy.",
    questions: ["¿Qué fue?"]
  },
  {
    id: "presenca", cat: "sentir", num: "09",
    title: "Presencia",
    prompt: "Escribí algo que te hizo olvidar la nostalgia, aunque sea por un instante.",
    questions: ["¿Qué fue?"]
  },
  {
    id: "identidade", cat: "sentir", num: "10",
    title: "Identidad",
    prompt: "¿Hoy te sentiste más argentino o más europeo?",
    questions: ["¿Por qué?"]
  },
  {
    id: "solidao", cat: "sentir", num: "11",
    title: "Soledad",
    prompt: "¿Cuándo te sentiste solo hoy?",
    questions: ["¿Qué hiciste después?"]
  },
  {
    id: "felicidade-inesperada", cat: "sentir", num: "12",
    title: "Felicidad inesperada",
    prompt: "¿Cuál fue la cosa más simple que te hizo feliz hoy?",
    questions: ["Describí el momento."]
  },
  {
    id: "foto-invisivel", cat: "memorias", num: "13",
    title: "Fotografiá lo que nadie fotografiaría",
    prompt: "Nada de torres famosas, monumentos ni postales. Vale una ventana, un perro, una bicicleta, una panadería, un cartel gracioso, alguien leyendo, una calle vacía.",
    questions: ["¿Qué fotografiaste?", "¿Por qué te llamó la atención ese detalle?"],
    note: "Porque tal vez sean justo esas cosas las que algún día te hagan extrañar este lugar."
  }
];

const randomQuestions = [
  "¿Qué te está tratando de enseñar esta ciudad?",
  "¿Estás viviendo o solo visitando?",
  "¿Qué dejarías acá si pudieras?",
  "¿En quién te estás convirtiendo?",
  "¿Qué descubriste sobre vos hoy?",
  "¿Qué creías que necesitabas antes de viajar y descubriste que no necesitabas?",
  "¿Qué parte de tu vida anterior querés llevar para siempre?",
  "¿Qué te gustaría que alguien de acá supiera sobre vos?",
  "¿Qué versión tuya apareció desde que llegaste?",
  "¿Qué seguís buscando?"
];

const finalText = `Buscaste lugares.

Encontraste personas.

Probaste cosas.

Sentiste nostalgia.

Te perdiste.

Te encontraste.

Y probablemente cambiaste.


Tal vez esta máquina nunca fue capaz de viajar en el tiempo.


Tal vez solo sirvió para recordarte mirar el tiempo mientras pasaba.


El viaje continúa.`;

/* ============================================================
   ESTADO / PERSISTÊNCIA (localStorage)
   ============================================================ */

const STORAGE_KEY = "dear-future-juani-state";

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return {
    name: traveler.name || "",
    firstVisit: null,
    lastVisit: null,
    visitCount: 0,
    soundOn: false,
    musicOn: true,
    ritualLog: {},          // { ritualId: {answers, completedAt} }
    questionAnswers: [],    // [{question, answer, date}]
    pins: [],                // [{name, note, date}]
    restrictedNote: null,
    seenLettersIntro: false,
    seenFinal: false
  };
}

let state = loadState();
state = normalizeState(state);

// Garante que estados salvos por versões antigas do site (sem os
// campos usados hoje) não quebrem a página — completa qualquer
// campo que esteja faltando com um valor padrão seguro.
function normalizeState(s){
  s = s || {};
  s.name = s.name || traveler.name || "";
  s.firstVisit = s.firstVisit || null;
  s.lastVisit = s.lastVisit || null;
  s.visitCount = s.visitCount || 0;
  s.soundOn = !!s.soundOn;
  s.musicOn = s.musicOn === undefined ? true : !!s.musicOn;
  s.ritualLog = s.ritualLog || {};
  s.questionAnswers = s.questionAnswers || [];
  s.pins = s.pins || [];
  s.restrictedNote = s.restrictedNote || null;
  s.seenLettersIntro = !!s.seenLettersIntro;
  s.seenFinal = !!s.seenFinal;
  return s;
}

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  syncToCloud();
}

/* ---------------- backup na nuvem (kvdb.io) ---------------- */

const CLOUD_BASE = "https://kvdb.io";
const LOCAL_BUCKET_KEY = "dear-future-juani-bucket";
let cloudBucketId = cloudSync.bucketId || localStorage.getItem(LOCAL_BUCKET_KEY) || "";
let cloudStatus = "offline"; // offline | syncing | synced | error

function updateCloudIndicator(){
  const el = document.getElementById('cloud-status');
  if(!el) return;
  const map = {
    offline: { icon: '⚠️', title: 'Sin conexión con la copia en la nube — guardando solo en este navegador.' },
    syncing: { icon: '🔄', title: 'Sincronizando con la copia en la nube...' },
    synced:  { icon: '☁️', title: 'Copia en la nube al día.' },
    error:   { icon: '❌', title: 'No se pudo sincronizar con la nube.' }
  };
  const s = map[cloudStatus] || map.offline;
  el.textContent = s.icon;
  el.title = s.title;
}

function showCloudBanner(text){
  const banner = document.getElementById('cloud-banner');
  const textEl = document.getElementById('cloud-banner-text');
  if(!banner || !textEl) return;
  textEl.textContent = text;
  banner.removeAttribute('hidden');
}

document.getElementById('cloud-banner-close') && document.getElementById('cloud-banner-close').addEventListener('click', () => {
  document.getElementById('cloud-banner').setAttribute('hidden','');
});

async function ensureCloudBucket(){
  if(cloudBucketId) return cloudBucketId;
  const res = await fetch(CLOUD_BASE + '/', { method: 'POST' });
  if(!res.ok) throw new Error('no se pudo crear el bucket');
  const id = (await res.text()).trim();
  cloudBucketId = id;
  localStorage.setItem(LOCAL_BUCKET_KEY, id);
  showCloudBanner(`☁️ Copia de seguridad en la nube creada. Código: ${id} — copialo y pegalo en "cloudSync.bucketId" dentro de script.js para sincronizar en otros dispositivos.`);
  return id;
}

async function pullRemoteState(){
  if(!cloudBucketId) return null;
  const res = await fetch(`${CLOUD_BASE}/${cloudBucketId}/state`);
  if(res.status === 404) return null;
  if(!res.ok) throw new Error('falha ao ler o backup na nuvem');
  const text = await res.text();
  if(!text) return null;
  try{ return JSON.parse(text); }catch(e){ return null; }
}

let syncTimer = null;
function syncToCloud(){
  if(!cloudSync.enabled) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(async () => {
    try{
      cloudStatus = 'syncing';
      updateCloudIndicator();
      const bucket = await ensureCloudBucket();
      const res = await fetch(`${CLOUD_BASE}/${bucket}/state`, {
        method: 'PUT',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(state)
      });
      cloudStatus = res.ok ? 'synced' : 'error';
    }catch(e){
      cloudStatus = 'error';
    }
    updateCloudIndicator();
  }, 350);
}

async function bootCloudSync(){
  if(!cloudSync.enabled){ cloudStatus = 'offline'; updateCloudIndicator(); return; }
  try{
    cloudStatus = 'syncing';
    updateCloudIndicator();
    await ensureCloudBucket();
    const remote = await pullRemoteState();
    if(remote){
      state = normalizeState(remote);
    }else{
      // ainda não existe nada salvo na nuvem: envia o estado local como primeira versão
      await fetch(`${CLOUD_BASE}/${cloudBucketId}/state`, {
        method: 'PUT',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(state)
      });
    }
    cloudStatus = 'synced';
  }catch(e){
    cloudStatus = 'error';
  }
  updateCloudIndicator();
}

function todayISO(){
  return new Date().toISOString();
}

function fmtDate(iso){
  if(!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }).toUpperCase();
}

/* ============================================================
   NAVEGAÇÃO
   ============================================================ */

const screenPaths = {
  intro: 'De Sarang do presente, para',
  dashboard: 'Dear Future Juani',
  letters: 'Cartas a través del tiempo',
  compose: 'Nueva carta',
  rituals: 'Rituales',
  questions: 'Preguntas',
  map: 'El mapa',
  playlist: 'Playlist',
  restricted: 'Archivo restringido',
  final: 'Dear Future Juani'
};

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.setAttribute('hidden',''));
  const el = document.getElementById('screen-' + id);
  if(el) el.removeAttribute('hidden');
  const pathEl = document.getElementById('term-path');
  if(pathEl && screenPaths[id]) pathEl.textContent = screenPaths[id];
  if(id !== 'letters' && lettersCountdownTimer){
    clearInterval(lettersCountdownTimer);
    lettersCountdownTimer = null;
  }
  // a música do painel só toca enquanto o painel principal está aberto
  // (e só se o Juani não tiver desligado ela no botão 🎵)
  const panelAudio = document.getElementById('panel-audio');
  if(panelAudio){
    if(id === 'dashboard' && state.musicOn){
      panelAudio.play().catch(() => {});
    }else{
      panelAudio.pause();
    }
  }
  window.scrollTo(0,0);
}

document.addEventListener('click', (e) => {
  const nav = e.target.closest('[data-nav]');
  if(nav){
    const target = nav.getAttribute('data-nav');
    routeTo(target);
  }
});

function routeTo(target){
  if(target === 'dashboard') renderDashboard();
  if(target === 'letters') renderLettersHub();
  if(target === 'rituals') renderRitualsList();
  if(target === 'questions') renderQuestions();
  if(target === 'map') renderMap();
  if(target === 'playlist') renderPlaylist();
  if(target === 'restricted') showScreen('restricted');
  playTone('nav');
}

/* ============================================================
   SOM (procedural, via WebAudio — sem arquivos externos)
   ============================================================ */

let audioCtx = null;
function ensureAudio(){
  if(!audioCtx){
    try{ audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }catch(e){}
  }
}

function playTone(kind){
  if(!state.soundOn || !audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);

  let freq = 440, dur = 0.15, type = 'sine';
  if(kind === 'nav'){ freq = 300; dur = 0.06; type = 'sine'; }
  if(kind === 'unlock'){ freq = 660; dur = 0.35; type = 'triangle'; }
  if(kind === 'complete'){ freq = 520; dur = 0.2; type = 'square'; }

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.start(now);
  osc.stop(now + dur + 0.05);
}

function toggleSound(){
  ensureAudio();
  state.soundOn = !state.soundOn;
  saveState();
  document.getElementById('btn-sound').textContent = state.soundOn ? '🔊' : '🔈';
  if(state.soundOn) playTone('nav');
}

function toggleMusic(){
  state.musicOn = !state.musicOn;
  saveState();
  const btn = document.getElementById('btn-music');
  if(btn) btn.textContent = state.musicOn ? '🎵' : '🔇';

  const panelAudio = document.getElementById('panel-audio');
  const onDashboard = !document.getElementById('screen-dashboard').hasAttribute('hidden');
  if(panelAudio && onDashboard){
    if(state.musicOn){ panelAudio.play().catch(() => {}); }
    else{ panelAudio.pause(); }
  }
}

/* ============================================================
   STARFIELD (desativado no visual atual — função inofensiva
   caso alguém reative o canvas no CSS futuramente)
   ============================================================ */

function initStarfield(){
  const canvas = document.getElementById('stars');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.floor((w*h)/9000);
    stars = Array.from({length: count}, () => ({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.2 + 0.2,
      baseAlpha: Math.random()*0.6 + 0.15,
      phase: Math.random()*Math.PI*2,
      speed: Math.random()*0.0006 + 0.0002
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  function tick(t){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#000000';
    for(const s of stars){
      const a = s.baseAlpha + Math.sin(t*s.speed + s.phase) * 0.2;
      ctx.globalAlpha = Math.max(0, a);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ============================================================
   IDENTIDADE / INICIALIZAÇÃO
   (único usuário do site: Juani. O site abre na portada e, ao
   clicar em "Ir al panel", segue direto pro painel principal —
   sem sequência de boot.)
   ============================================================ */

function initIdentity(){
  if(!state.firstVisit){
    state.firstVisit = todayISO();
  }
  state.lastVisit = todayISO();
  state.visitCount = (state.visitCount || 0) + 1;
  state.name = traveler.name || state.name || "Juani";
  saveState();
  showScreen('intro');
}

document.getElementById('btn-go-dashboard').addEventListener('click', () => routeTo('dashboard'));

/* ============================================================
   DASHBOARD
   ============================================================ */

function renderDashboard(){
  showScreen('dashboard');
}

document.getElementById('btn-sound').addEventListener('click', toggleSound);
if(state.soundOn) document.getElementById('btn-sound').textContent = '🔊';

document.getElementById('btn-music').addEventListener('click', toggleMusic);
document.getElementById('btn-music').textContent = state.musicOn ? '🎵' : '🔇';

/* ============================================================
   RITUALS
   ============================================================ */

let activeCategory = 'todos';

function renderRitualsList(){
  document.getElementById('rituals-list-view').removeAttribute('hidden');
  document.getElementById('ritual-detail-view').setAttribute('hidden','');

  const tabs = document.getElementById('ritual-tabs');
  tabs.innerHTML = '';
  const allTab = document.createElement('button');
  allTab.className = 'tab' + (activeCategory === 'todos' ? ' active' : '');
  allTab.textContent = 'Todos';
  allTab.addEventListener('click', () => { activeCategory = 'todos'; renderRitualsList(); });
  tabs.appendChild(allTab);

  ritualCategories.forEach(c => {
    const t = document.createElement('button');
    t.className = 'tab' + (activeCategory === c.id ? ' active' : '');
    t.textContent = c.icon + ' ' + c.label;
    t.addEventListener('click', () => { activeCategory = c.id; renderRitualsList(); });
    tabs.appendChild(t);
  });

  const grid = document.getElementById('ritual-grid');
  grid.innerHTML = '';
  rituals
    .filter(r => activeCategory === 'todos' || r.cat === activeCategory)
    .forEach(r => {
      const done = !!state.ritualLog[r.id];
      const card = document.createElement('button');
      card.className = 'ritual-card' + (done ? ' completed' : '');
      card.innerHTML = `
        <div class="ritual-card-num mono">RITUAL N.º${r.num}</div>
        <div class="ritual-card-title serif">${r.title}</div>
        <div class="ritual-card-cat">${ritualCategories.find(c=>c.id===r.cat).icon} ${ritualCategories.find(c=>c.id===r.cat).label}</div>
      `;
      card.addEventListener('click', () => openRitual(r.id));
      grid.appendChild(card);
    });

  showScreen('rituals');
}

function openRitual(id){
  const r = rituals.find(x => x.id === id);
  const view = document.getElementById('ritual-detail-view');
  document.getElementById('rituals-list-view').setAttribute('hidden','');
  view.removeAttribute('hidden');
  view.innerHTML = '';

  const back = document.createElement('button');
  back.className = 'icon-btn mono detail-back';
  back.textContent = '← VOLVER A RITUALES';
  back.addEventListener('click', renderRitualsList);
  view.appendChild(back);

  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = 'RITUAL N.º' + r.num;
  view.appendChild(eyebrow);

  const title = document.createElement('h2');
  title.className = 'serif';
  title.textContent = r.title;
  view.appendChild(title);

  const prompt = document.createElement('p');
  prompt.className = 'poetic';
  prompt.textContent = r.prompt;
  view.appendChild(prompt);

  if(r.note){
    const note = document.createElement('p');
    note.className = 'subtle';
    note.textContent = r.note;
    view.appendChild(note);
  }

  const existing = state.ritualLog[r.id];

  if(existing){
    const done = document.createElement('p');
    done.className = 'subtle';
    done.textContent = 'Ritual completado el ' + fmtDate(existing.completedAt) + '.';
    view.appendChild(done);
    r.questions.forEach((q, idx) => {
      const block = document.createElement('div');
      block.className = 'field-block';
      block.innerHTML = `<label>${q}</label><div class="letter-body" style="font-size:1rem;margin:0;">${escapeHtml(existing.answers[idx] || '—')}</div>`;
      view.appendChild(block);
    });
    return;
  }

  const inputs = [];
  r.questions.forEach((q, idx) => {
    const block = document.createElement('div');
    block.className = 'field-block';
    block.innerHTML = `<label>${q}</label>`;
    const ta = document.createElement('textarea');
    ta.rows = 2;
    block.appendChild(ta);
    inputs.push(ta);
    view.appendChild(block);
  });

  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.textContent = 'COMPLETAR RITUAL';
  btn.addEventListener('click', () => {
    state.ritualLog[r.id] = {
      answers: inputs.map(i => i.value),
      completedAt: todayISO()
    };
    saveState();
    playTone('complete');
    openRitual(id);
  });
  view.appendChild(btn);
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ============================================================
   QUESTIONS (perguntas aleatórias)
   ============================================================ */

let usedQuestions = [];
let currentQuestion = null;

function renderQuestions(){
  document.getElementById('question-answer').value = '';
  renderQAHistory();
  showScreen('questions');
}

function renderQAHistory(){
  const wrap = document.getElementById('qa-history');
  if(!wrap) return;
  wrap.innerHTML = '';
  const entries = state.questionAnswers || [];
  if(entries.length === 0){
    wrap.innerHTML = '<p class="empty-state">Todavía no respondiste ninguna pregunta.</p>';
    return;
  }
  entries.forEach(e => {
    const card = document.createElement('div');
    card.className = 'qa-entry';
    card.innerHTML = `
      <div class="qa-entry-date mono">${fmtDate(e.date)}</div>
      <div class="qa-entry-question serif">${escapeHtml(e.question)}</div>
      <div class="qa-entry-answer">${escapeHtml(e.answer)}</div>
    `;
    wrap.appendChild(card);
  });
}

document.getElementById('btn-new-question').addEventListener('click', () => {
  if(usedQuestions.length >= randomQuestions.length) usedQuestions = [];
  let pool = randomQuestions.filter(q => !usedQuestions.includes(q));
  if(pool.length === 0) pool = randomQuestions;
  currentQuestion = pool[Math.floor(Math.random()*pool.length)];
  usedQuestions.push(currentQuestion);
  document.getElementById('question-display').textContent = currentQuestion;
  document.getElementById('question-answer').value = '';
  playTone('nav');
});

document.getElementById('btn-save-question').addEventListener('click', () => {
  const answer = document.getElementById('question-answer').value.trim();
  if(!currentQuestion || !answer) return;
  state.questionAnswers.push({ question: currentQuestion, answer, date: todayISO() });
  saveState();
  playTone('complete');
  document.getElementById('question-answer').value = '';
  document.getElementById('question-display').textContent = 'Respuesta guardada.';
  currentQuestion = null;
  renderQAHistory();
});

/* ============================================================
   CARTAS ATRAVÉS DO TEMPO
   ============================================================
   IMPORTANTE — PRIVACIDADE DAS CARTAS AUTORAIS (tipo "para você
   mesmo"): o conteúdo dessas cartas passa apenas pela memória da
   página. Ele nunca é atribuído a `state`, nunca é gravado em
   localStorage, nunca passa por saveState()/syncToCloud(), nunca
   entra em uma URL e nunca aparece em console.log. Assim que o
   fluxo termina (ou é cancelado), os campos são limpos.
   As cartas do tipo "que eu já escrevi" chegam por e-mail, através
   do FutureMe — o site nunca guarda nem exibe o conteúdo delas,
   só avisa as datas (definidas em emailLetters, lá em cima).
   ============================================================ */

let lettersCountdownTimer = null;

function timeRemaining(dateStr){
  const target = new Date(dateStr + 'T00:00:00').getTime();
  const now = Date.now();
  const diff = target - now;
  if(diff <= 0) return null;
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
  return { days, hours, minutes };
}

function fmtLongDate(dateStr){
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function renderLettersHub(){
  document.getElementById('letters-hub-view').removeAttribute('hidden');

  const note = document.getElementById('letters-first-note');
  if(!state.seenLettersIntro){
    note.hidden = false;
    note.textContent = 'Tal vez dentro de unos meses ni te acuerdes exactamente de cómo te sentías hoy. Por eso existen estas cartas — para que el vos de hoy pueda dejar pequeños pedazos de sí mismo en el camino, y para que, algún día, los puedas volver a encontrar.';
    state.seenLettersIntro = true;
    saveState();
  }else{
    note.hidden = true;
  }

  renderEmailLettersList();
  renderLettersTimeline();
  clearInterval(lettersCountdownTimer);
  lettersCountdownTimer = setInterval(() => { renderEmailLettersList(); renderLettersTimeline(); }, 60000);

  showScreen('letters');
}

function renderEmailLettersList(){
  const wrap = document.getElementById('email-letters-grid');
  if(!wrap) return;
  wrap.innerHTML = '';
  emailLetters.forEach(l => {
    const remaining = timeRemaining(l.date);
    const card = document.createElement('div');
    card.className = 'email-letter-card';
    card.innerHTML = `
      <div class="email-letter-icon">${l.icon}</div>
      <div class="email-letter-label serif">${escapeHtml(l.label)}</div>
      <div class="email-letter-date mono">${fmtLongDate(l.date)}</div>
      <div class="email-letter-status mono">${remaining ? `faltan ${remaining.days}d ${String(remaining.hours).padStart(2,'0')}h` : 'ya debería haber llegado 💌'}</div>
    `;
    wrap.appendChild(card);
  });
}

function renderLettersTimeline(){
  const wrap = document.getElementById('letters-timeline');
  if(!wrap) return;
  wrap.innerHTML = '';

  // nó inicial: a partida
  const start = document.createElement('div');
  start.className = 'tm-node opened';
  start.innerHTML = `
    <div class="tm-node-label mono">${fmtLongDate(traveler.departureDate).toUpperCase()}</div>
    <div class="tm-node-title serif">✈️ La partida</div>
    <div class="tm-node-status">Estás acá.</div>
  `;
  wrap.appendChild(start);

  selfLetterPresets.forEach(preset => {
    const node = document.createElement('div');
    node.className = 'tm-node';
    node.innerHTML = `
      <div class="tm-node-label mono">${fmtLongDate(preset.date).toUpperCase()}</div>
      <div class="tm-node-title serif">${preset.icon} ${preset.label}</div>
      <div class="tm-node-status">${escapeHtml(preset.desc)}</div>
      <div class="letter-actions"></div>
    `;

    const actions = node.querySelector('.letter-actions');
    const selfBtn = document.createElement('button');
    selfBtn.className = 'mini-action';
    selfBtn.textContent = '✉️ escribir para ese momento';
    selfBtn.addEventListener('click', (e) => { e.stopPropagation(); openCompose(preset); });
    actions.appendChild(selfBtn);

    wrap.appendChild(node);
  });
}

document.getElementById('btn-write-letter').addEventListener('click', () => openCompose(null));

/* ---------------- compositor (cartas para você mesmo) ---------------- */

function openCompose(preset){
  document.getElementById('compose-privacy-view').removeAttribute('hidden');
  document.getElementById('compose-form-view').setAttribute('hidden','');
  document.getElementById('compose-sent-view').setAttribute('hidden','');
  document.getElementById('compose-date').value = preset ? preset.date : '';
  document.getElementById('compose-text').value = '';
  document.getElementById('compose-prompt').setAttribute('hidden','');
  buildPresetChips(preset ? preset.id : null);
  showScreen('compose');
}

function buildPresetChips(activeId){
  const wrap = document.getElementById('preset-chips');
  wrap.innerHTML = '';
  selfLetterPresets.forEach(p => {
    const chip = document.createElement('button');
    chip.className = 'chip' + (p.id === activeId ? ' active' : '');
    chip.textContent = p.icon + ' ' + p.label;
    chip.addEventListener('click', () => {
      document.getElementById('compose-date').value = p.date;
      buildPresetChips(p.id);
      const promptEl = document.getElementById('compose-prompt');
      if(p.prompt){
        promptEl.textContent = (p.promptTitle ? p.promptTitle + ' — ' : '') + p.prompt;
        promptEl.removeAttribute('hidden');
      }else{
        promptEl.setAttribute('hidden','');
      }
    });
    wrap.appendChild(chip);
  });
}

document.getElementById('btn-compose-continue').addEventListener('click', () => {
  document.getElementById('compose-privacy-view').setAttribute('hidden','');
  document.getElementById('compose-form-view').removeAttribute('hidden');
});

function clearComposeFields(){
  const text = document.getElementById('compose-text');
  const date = document.getElementById('compose-date');
  if(text) text.value = '';
  if(date) date.value = '';
  const promptEl = document.getElementById('compose-prompt');
  if(promptEl) promptEl.setAttribute('hidden','');
}

document.getElementById('back-compose').addEventListener('click', clearComposeFields);

document.getElementById('btn-compose-send').addEventListener('click', async () => {
  const text = document.getElementById('compose-text').value.trim();
  if(!text) return;

  const statusEl = document.getElementById('compose-clipboard-status');
  try{
    await navigator.clipboard.writeText(text);
    statusEl.textContent = '📋 Tu carta se copió al portapapeles. Solo tenés que pegarla en FutureMe.';
  }catch(e){
    statusEl.textContent = '⚠️ No se pudo copiar automáticamente. Volvé y copiá el texto a mano antes de continuar.';
  }

  document.getElementById('compose-form-view').setAttribute('hidden','');
  document.getElementById('compose-sent-view').removeAttribute('hidden');
  playTone('complete');
});

document.getElementById('btn-goto-futureme').addEventListener('click', () => {
  window.open('https://www.futureme.org/letters/new', '_blank', 'noopener');
  clearComposeFields();
  routeTo('letters');
});

/* ============================================================
   PLAYLIST (Spotify)
   ============================================================
   O iframe só é criado no momento em que essa tela é aberta —
   de propósito. Se ele já existisse pronto no HTML desde o
   carregamento da página, escondido dentro da tela (display:none),
   vários navegadores nunca iniciam o carregamento dele, mesmo
   depois de a tela ficar visível. Criando-o na hora, isso não
   acontece.
   ============================================================ */

let playlistLoaded = false;

function renderPlaylist(){
  if(!playlistLoaded){
    try{
      const container = document.getElementById('spotify-embed-container');
      if(container){
        const iframe = document.createElement('iframe');
        iframe.src = 'https://open.spotify.com/embed/playlist/37i9dQZF1EJsHUNxyuJZHH?utm_source=generator&theme=0';
        iframe.width = '100%';
        iframe.height = '380';
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
        iframe.allowFullscreen = true;
        container.appendChild(iframe);
      }
      playlistLoaded = true;
    }catch(e){
      // se por qualquer motivo o iframe não puder ser criado (bloqueador
      // de anúncios, navegador restritivo, etc.), o link "Abrir en Spotify"
      // logo abaixo continua funcionando normalmente de qualquer forma.
    }
  }
  showScreen('playlist');
}

/* ============================================================
   MAP
   ============================================================ */

function renderMap(){
  const list = document.getElementById('pin-list');
  list.innerHTML = '';
  const pins = state.pins || [];
  if(pins.length === 0){
    list.innerHTML = '<p class="empty-state">Todavía no hay ningún lugar guardado.</p>';
  }else{
    pins.slice().reverse().forEach(p => {
      const card = document.createElement('div');
      card.className = 'pin-card';
      card.innerHTML = `
        <div class="pin-card-name serif">📍 ${escapeHtml(p.name)}</div>
        <div class="pin-card-note">${escapeHtml(p.note)}</div>
        <div class="pin-card-date mono">${fmtDate(p.date)}</div>
      `;
      list.appendChild(card);
    });
  }
  showScreen('map');
}

document.getElementById('btn-add-pin').addEventListener('click', () => {
  const name = prompt('Nombre del lugar:');
  if(!name) return;
  const note = prompt('¿Qué pasó ahí?') || '';
  state.pins = state.pins || [];
  state.pins.push({ name, note, date: todayISO() });
  saveState();
  playTone('complete');
  renderMap();
});

/* ============================================================
   RESTRICTED
   ============================================================ */

document.getElementById('btn-write-myself').addEventListener('click', () => {
  const ta = document.getElementById('restricted-note');
  ta.removeAttribute('hidden');
  ta.value = state.restrictedNote || '';
  ta.focus();
  ta.addEventListener('blur', () => {
    state.restrictedNote = ta.value;
    saveState();
  });
});

/* ============================================================
   INIT
   ============================================================ */

initStarfield();
updateCloudIndicator();
bootCloudSync().finally(initIdentity);
