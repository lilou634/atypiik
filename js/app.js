/* =========================================================
   ATYPIIK — application front (vanilla JS)
   Toutes les données sont simulées et stockées dans le
   navigateur (localStorage) en attendant le vrai back-end.
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const app = $("#app");

const euro = (n) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: n % 1 ? 2 : 0 });
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const today = () => new Date().toISOString().slice(0, 10);
const frDate = (d) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
const clone = (o) => JSON.parse(JSON.stringify(o));
const initials = (name) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/* ---------- Persistance ---------- */
const DATA_VERSION = 4;
const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem("atypiik:" + key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem("atypiik:" + key, JSON.stringify(value));
    } catch {}
  },
};
if (store.get("version", 0) !== DATA_VERSION) {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("atypiik:"))
      .forEach((k) => localStorage.removeItem(k));
  } catch {}
  store.set("version", DATA_VERSION);
}

const PERSISTED = [
  "user", "favs", "cart", "views", "follows", "orders", "threads", "notifs", "works", "artists",
  "pending", "disputes", "sales", "cookies", "prefs", "media",
];
const state = {
  user: store.get("user", null),
  favs: store.get("favs", ["a3"]),
  cart: store.get("cart", []),
  views: store.get("views", []),
  follows: store.get("follows", ["ines"]),
  orders: store.get("orders", [
    {
      id: "CMD-2026-0944", date: "2026-10-03", status: 2, buyer: "Camille Roux",
      address: "12 rue des Arts, 13001 Marseille",
      lines: [{ id: "a1", variant: 0, qty: 1, price: 480 }], total: 480,
    },
  ]),
  threads: store.get("threads", {
    nova: [
      { from: "artist", text: "Bonjour ! Merci pour votre intérêt pour « Bordeaux Protocol ». Une question sur l'œuvre ?" },
    ],
    support: [{ from: "artist", text: "Bonjour, l'équipe ATYPIIK vous répond ici du lundi au vendredi, de 9 h à 18 h." }],
  }),
  notifs: store.get("notifs", [
    { id: 1, date: "2026-10-11", text: "Inès Vale, que vous suivez, a publié une nouvelle œuvre : « Pluie d'argent ».", link: "#/oeuvre/a8", read: false },
    { id: 2, date: "2026-10-09", text: "Week-end photo : −15 % sur une sélection de tirages jusqu'à dimanche.", link: "#/galerie", read: false },
    { id: 3, date: "2026-10-05", text: "Votre commande CMD-2026-0944 a été livrée.", link: "#/profil", read: true },
  ]),
  works: store.get("works", clone(ARTWORKS)),
  artists: store.get("artists", clone(ARTISTS)),
  pending: store.get("pending", clone(SEED_PENDING_SELLERS)),
  disputes: store.get("disputes", clone(SEED_DISPUTES)),
  sales: store.get("sales", clone(SEED_SALES)),
  cookies: store.get("cookies", null),
  prefs: store.get("prefs", { orders: true, prices: true, news: true, promos: false, email: true }),
  media: store.get("media", {}),
  gallery: { type: [], color: [], size: [], artist: "", max: 2000, view: "grid", q: "" },
  tab: {},
  checkout: { step: 1, address: null },
};

function save() {
  PERSISTED.forEach((k) => store.set(k, state[k]));
  updateChrome();
}

/* ---------- Accès aux données ---------- */
const isAdmin = () => state.user?.role === "admin";
const visibleWorks = () => state.works.filter((w) => !w.hidden);
const byId = (id) => state.works.find((w) => w.id === id);
const artistById = (id) => state.artists.find((a) => a.id === id);
const artistOf = (w) => artistById(w.artist) || { id: w.artist, name: "Artiste", city: "", bio: "", followers: 0, videos: [], press: [] };
const shippingOf = (w) => w.ship ?? SHIPPING_BY_SIZE[w.size] ?? 15;
const COMMISSION = 0.1;
const totalStock = (w) => w.variants.reduce((s, v) => s + v.stock, 0);
const STEPS = ["Confirmée", "En préparation", "Expédiée", "Livrée"];

function notify(text, link = "#/notifications") {
  state.notifs.unshift({ id: Date.now() + Math.random(), date: today(), text, link, read: false });
}

/* ---------- UI globale ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

function updateChrome() {
  const n = {
    fav: state.favs.length,
    cart: state.cart.reduce((s, l) => s + l.qty, 0),
    notif: state.notifs.filter((x) => !x.read).length,
  };
  $$("[data-count]").forEach((el) => {
    el.textContent = n[el.dataset.count] || "";
    el.dataset.n = n[el.dataset.count] || 0;
  });
  const roles = { acheteur: "Acheteur", vendeur: "Artiste", admin: "Admin", attente: "En validation" };
  $("#user-pill").innerHTML = state.user
    ? `<a href="#/profil" class="user-pill"><span class="role-dot" style="${state.user.role === "admin" ? "background:var(--accent)" : ""}"></span><span class="name">${esc(roles[state.user.role])}</span></a>`
    : "";
  $("#cookie").hidden = state.cookies !== null;
}

/* ---------- Composants ---------- */
/* Référence catalogue affichée en mono, ex. « N°A01 ». */
const ref = (w) => "N°" + w.id.toUpperCase().replace(/^A(\d)$/, "A0$1").slice(0, 6);
/* Visuel d'une œuvre : la photo si elle existe (js/photos.js), sinon un aplat généré. */
function visual(w, style = "") {
  if (!w) return `<div class="art" style="background:var(--chrome);${style}"></div>`;
  const src = (typeof PHOTOS !== "undefined" && PHOTOS[w.id]) || w.img;
  return src
    ? `<img class="art" src="${src}" alt="${esc(w.title)}" loading="lazy" style="${style}" />`
    : `<div class="art" style="background:${w.art};${style}"></div>`;
}
const heart =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-9.5-9.3C1.2 8.4 3.3 5 6.8 5c2 0 3.4 1.1 4.2 2.4h2C13.8 6.1 15.2 5 17.2 5c3.5 0 5.6 3.4 4.3 6.7C19.5 16.4 12 21 12 21Z"/></svg>';

function badgesFor(w) {
  const b = [];
  if (w.sold) b.push('<span class="badge badge-sold">Vendu</span>');
  else if (totalStock(w) === 0) b.push('<span class="badge badge-out">Rupture de stock</span>');
  else b.push('<span class="badge badge-stock">● En stock</span>');
  if (w.variants.length > 1) b.push('<span class="badge badge-variants">Plusieurs versions</span>');
  if (w.isNew) b.push('<span class="badge badge-new">Nouveau</span>');
  return b.join("");
}

function card(w, extra = "") {
  const a = artistOf(w);
  const fav = state.favs.includes(w.id);
  return `
    <article class="card ${w.sold ? "sold" : ""}">
      <a class="card-media" href="#/oeuvre/${w.id}" aria-label="${esc(w.title)}">${visual(w)}</a>
      <div class="badges">${badgesFor(w)}</div>
      <button class="fav-btn ${fav ? "on" : ""}" data-act="fav" data-id="${w.id}" aria-pressed="${fav}" aria-label="Favori">${heart}</button>
      <div class="card-body">
        <span class="ref">${ref(w)} · ${esc(w.type)}</span>
        <h3 class="card-title"><a href="#/oeuvre/${w.id}">${esc(w.title)}</a></h3>
        <div class="card-artist"><a href="#/artiste/${a.id}">${esc(a.name)}</a></div>
        <span class="price">${euro(w.price)}</span>
        ${extra}
      </div>
    </article>`;
}

function followBtn(id, small = false) {
  const on = state.follows.includes(id);
  return `<button class="btn ${on ? "btn-outline" : ""} ${small ? "btn-small" : ""}" data-act="follow" data-id="${id}">${on ? "✓ Abonné·e" : "Suivre"}</button>`;
}

function tabs(key, list, current) {
  return `<div class="tabs" role="tablist">${list
    .map(([id, label, n]) => `<button role="tab" class="${id === current ? "on" : ""}" data-act="tab" data-key="${key}" data-id="${id}">${label}${n ? ` <span class="count" data-n="${n}">${n}</span>` : ""}</button>`)
    .join("")}</div>`;
}

function emptyBox(title, text, cta = "") {
  return `<div class="empty"><h3>${title}</h3><p>${text}</p>${cta}</div>`;
}

/* =========================================================
   VUES
   ========================================================= */

function viewHome() {
  const works = visibleWorks();
  const hero = byId("a1");
  const cats = [
    ["Peinture", "a1"],
    ["Mode", "a13"],
    ["Bijoux", "a15"],
    ["Photographie", "a8"],
  ];
  const disciplines = ["Nouveautés", "Peinture", "Sculpture", "Photographie", "Mode", "Bijoux", "Céramique", "Textile"];
  return `
    <section class="hero">
      <div class="hero-wall">
        <div class="hero-corner mono"><span>Collection 01</span><span>Automne 2026</span></div>
        <a class="hero-frame" href="#/oeuvre/${hero.id}" aria-label="${esc(hero.title)}">${visual(hero)}</a>
        <div class="hero-plate mono"><span>${esc(hero.title)} — ${esc(artistOf(hero).name)}</span><span>${ref(hero)} · ${euro(hero.price)}</span></div>
      </div>
      <div class="hero-panel">
        <span class="ref">ATYPIIK / Marketplace d'art indépendant</span>
        <div>
          <h1>L'art<br />sans<br /><span class="accent">filtre.</span></h1>
          <p>Peinture, mode, bijoux, céramique&nbsp;: des pièces uniques ou en série limitée, vendues en direct par les artistes qui les créent.</p>
          <div class="hero-cta">
            <a href="#/galerie" class="btn btn-light">Explorer la galerie</a>
            <a href="#/profil" class="btn btn-chrome">Vendre mes œuvres</a>
          </div>
        </div>
        <div class="hero-stats">
          <div><b>${state.works.length * 73}</b><span>Œuvres</span></div>
          <div><b>${state.artists.length * 61}</b><span>Artistes</span></div>
          <div><b class="accent">${new Set(state.works.map((w) => w.type)).size}</b><span>Disciplines</span></div>
        </div>
      </div>
    </section>

    <nav class="catbar" aria-label="Disciplines">${disciplines
      .map((d) => (d === "Nouveautés" ? `<a href="#/galerie" data-act="reset-gallery">${d}</a>` : `<a href="#/galerie" data-act="cat" data-type="${d}">${d}</a>`))
      .join("")}</nav>

    <section class="section">
      <div class="section-head"><div><span class="ref">01 — Nouveautés</span><h2>Nouvelles <span class="fun">pièces</span></h2></div><a href="#/galerie">Tout voir</a></div>
      <div class="grid">${works.slice(0, 8).map((w) => card(w)).join("")}</div>
    </section>

    <section class="section story">
      <div class="story-media">
        <div class="portrait">${STORY.photo ? `<img src="${STORY.photo}" alt="${esc(STORY.founder)}, ${esc(STORY.role.toLowerCase())}" />` : `<span>${initials(STORY.founder)}</span>`}</div>
        <div class="story-caption mono"><span>${esc(STORY.founder)}</span><span>${esc(STORY.role)}</span></div>
      </div>
      <div class="story-text">
        <span class="ref">02 — Notre histoire</span>
        <h2>Née d'une <span class="fun">conviction</span></h2>
        <p>${esc(STORY.intro)}</p>
        <blockquote>« ${esc(STORY.quote)} »</blockquote>
        <a href="#/histoire" class="btn btn-light">Lire notre histoire</a>
      </div>
    </section>

    <section class="section tone tone-wall">
      <div class="section-head"><div><span class="ref">03 — Disciplines</span><h2>Par <span class="fun">catégorie</span></h2></div><a href="#/galerie">Toute la galerie</a></div>
      <div class="cats">${cats
        .map(([t, id]) => {
          const n = visibleWorks().filter((w) => w.type === t).length;
          return `<a class="cat" href="#/galerie" data-act="cat" data-type="${t}"><div class="cat-media">${visual(byId(id))}</div><div class="cat-label"><span>${t}</span><span class="mono">${String(n).padStart(2, "0")}</span></div></a>`;
        })
        .join("")}</div>
    </section>

    <section class="section tone tone-ink">
      <div class="section-head"><div><span class="ref">04 — Communauté</span><h2>Les <span class="fun">artistes</span></h2></div><a href="#/artistes">Tous les artistes</a></div>
      <div class="grid">${state.artists.slice(0, 4).map(artistCard).join("")}</div>
    </section>

    <section class="section values">
      <div><span class="tag">Vérifié</span><h3>Exposition protégée</h3><p>Chaque artiste est validé par notre équipe avant de pouvoir vendre.</p></div>
      <div><span class="tag pink">Transparent</span><h3>Paiement sécurisé</h3><p>Stripe Connect, HTTPS et conformité PCI-DSS. Vos données bancaires ne transitent jamais par nos serveurs.</p></div>
      <div><span class="tag">Direct</span><h3>Parlez à l'artiste</h3><p>Messagerie privée, vidéos coulisses et alertes à chaque nouvelle œuvre.</p></div>
    </section>`;
}

function artistCard(a) {
  const n = visibleWorks().filter((w) => w.artist === a.id).length;
  return `
    <article class="card artist-card">
      <a href="#/artiste/${a.id}" class="card-media">
        <div class="avatar">${initials(a.name)}</div>
      </a>
      <div class="card-body">
        <h3 class="card-title"><a href="#/artiste/${a.id}">${esc(a.name)}</a></h3>
        <div class="card-artist">${esc(a.city)} · ${n} œuvre${n > 1 ? "s" : ""}</div>
        <div class="card-actions">${followBtn(a.id, true)}</div>
      </div>
    </article>`;
}

/* ---------- Galerie ---------- */
function filteredWorks() {
  const g = state.gallery;
  const q = g.q.trim().toLowerCase();
  return visibleWorks().filter(
    (w) =>
      (!g.type.length || g.type.includes(w.type)) &&
      (!g.color.length || g.color.includes(w.color)) &&
      (!g.size.length || g.size.includes(w.size)) &&
      (!g.artist || g.artist === w.artist) &&
      w.price <= g.max &&
      (!q || (w.title + " " + artistOf(w).name + " " + w.type).toLowerCase().includes(q)),
  );
}

function viewGallery() {
  const g = state.gallery;
  const types = [...new Set(state.works.map((w) => w.type))];
  const chip = (group, v, label = v) =>
    `<button class="chip ${g[group].includes(v) ? "on" : ""}" data-act="filter" data-group="${group}" data-value="${v}">${label}</button>`;
  return `
    <div class="page-head"><h1>La <span class="fun">galerie</span></h1><p>${g.q ? `Résultats pour « ${esc(g.q)} »` : "Toutes les œuvres disponibles, filtrées en direct."}</p></div>
    <div class="gallery-layout">
      <aside class="filters" aria-label="Filtres">
        <details open><summary>Type d'art</summary><div class="opts">${types.map((t) => chip("type", t)).join("")}</div></details>
        <details open><summary>Couleur</summary><div class="opts">${Object.entries(COLORS)
          .map(([k, c]) => `<button class="swatch ${g.color.includes(k) ? "on" : ""}" style="background:${c}" data-act="filter" data-group="color" data-value="${k}" aria-label="${k}" title="${k}"></button>`)
          .join("")}</div></details>
        <details open><summary>Taille</summary><div class="opts">${chip("size", "S", "Petit")}${chip("size", "M", "Moyen")}${chip("size", "L", "Grand")}</div></details>
        <details open><summary>Prix</summary>
          <div class="opts" style="display:block">
            <input class="range" type="range" min="100" max="2000" step="50" value="${g.max}" id="price-max" aria-label="Prix maximum" />
            <div class="range-labels"><span>100 €</span><span id="price-val">jusqu'à ${euro(g.max)}</span></div>
          </div>
        </details>
        <details open><summary>Artiste</summary>
          <div class="opts"><select class="select" id="artist-filter" aria-label="Artiste">
            <option value="">Tous les artistes</option>
            ${state.artists.map((a) => `<option value="${a.id}" ${g.artist === a.id ? "selected" : ""}>${esc(a.name)}</option>`).join("")}
          </select></div>
        </details>
        <button class="link-btn" data-act="reset-filters">Réinitialiser les filtres</button>
      </aside>
      <section>
        <div class="toolbar">
          <span id="result-count" class="label"></span>
          <div class="toggle" role="group" aria-label="Affichage">
            <button data-act="view" data-id="grid" class="${g.view === "grid" ? "on" : ""}">Grille</button>
            <button data-act="view" data-id="list" class="${g.view === "list" ? "on" : ""}">Liste</button>
          </div>
        </div>
        <div id="results"></div>
      </section>
    </div>`;
}

function renderResults() {
  const box = $("#results");
  if (!box) return;
  const works = filteredWorks();
  $("#result-count").textContent = `${works.length} œuvre${works.length > 1 ? "s" : ""}`;
  box.innerHTML = works.length
    ? `<div class="grid cols-3 ${state.gallery.view === "list" ? "list" : ""}">${works.map((w) => card(w)).join("")}</div>`
    : emptyBox("Rien ici", "Aucune œuvre ne correspond. Essayez d'élargir vos filtres.");
}

function bindGallery() {
  const g = state.gallery;
  $("#price-max").addEventListener("input", (e) => {
    g.max = +e.target.value;
    $("#price-val").textContent = "jusqu'à " + euro(g.max);
    renderResults();
  });
  $("#artist-filter").addEventListener("change", (e) => {
    g.artist = e.target.value;
    renderResults();
  });
  renderResults();
}

/* ---------- Fiche œuvre ---------- */
function viewProduct(id) {
  const w = byId(id);
  if (!w || (w.hidden && !isAdmin())) return viewNotFound();
  const a = artistOf(w);
  state.views = [w.id, ...state.views.filter((x) => x !== w.id)].slice(0, 20);
  store.set("views", state.views);
  const first = Math.max(0, w.variants.findIndex((v) => v.stock > 0));
  return `
    <a class="back-link" href="#/galerie">← Retour à la galerie</a>
    <div class="product">
      <div>
        <div class="zoom" id="zoom">${visual(w)}</div>
        <div class="thumbs">${[0, 1, 2]
          .map((i) => `<button class="${i ? "" : "on"}" data-act="thumb" data-i="${i}" aria-label="Vue ${i + 1}">${visual(w, `filter:brightness(${1 - i * 0.07}) saturate(${1 - i * 0.15})`)}</button>`)
          .join("")}</div>
      </div>
      <div class="product-info">
        <div class="badges inline">${badgesFor(w)}</div>
        <h1>${esc(w.title)}</h1>
        <span class="ref muted">${ref(w)} · ${esc(w.type)}</span>
        <div class="by">par <a href="#/artiste/${a.id}">${esc(a.name)}</a> · ${esc(a.city)}</div>
        <div class="product-price">${euro(w.price)} <small>TTC</small></div>
        <span class="variant-label label">Déclinaisons</span>
        <div class="opts" style="display:flex;flex-wrap:wrap;gap:6px" id="variants">
          ${w.variants.map((v, i) => `<button class="chip ${i === first ? "on" : ""} ${v.stock ? "" : "na"}" data-act="variant" data-i="${i}">${esc(v.label)}<span class="dot"></span></button>`).join("")}
        </div>
        <div class="availability" id="availability"></div>
        <div class="actions">
          <button class="btn" id="add-cart" data-act="add-cart" data-id="${w.id}">Ajouter au panier</button>
          <button class="btn btn-chrome" id="buy-now" data-act="buy-now" data-id="${w.id}">Acheter maintenant</button>
          <button class="btn fav-inline ${state.favs.includes(w.id) ? "on" : ""}" data-act="fav" data-id="${w.id}" aria-label="Favori">${heart}</button>
        </div>
        <dl class="specs">
          <dt>Description</dt><dd>${esc(w.description || `${w.type} originale de ${a.name}.`)}</dd>
          <dt>Technique</dt><dd>${esc(w.technique)}</dd>
          <dt>Dimensions</dt><dd>${esc(w.dims)}</dd>
          <dt>Type</dt><dd>${esc(w.type)}</dd>
        </dl>
        <div class="artist-mini">
          <div class="avatar sm">${initials(a.name)}</div>
          <div><strong>${esc(a.name)}</strong><div class="card-artist">${esc(a.bio)}</div></div>
          <a class="btn btn-small btn-outline" href="#/messages/${a.id}">Écrire</a>
        </div>
      </div>
    </div>`;
}

let currentVariant = 0;
function bindProduct(id) {
  const w = byId(id);
  if (!w) return;
  currentVariant = Math.max(0, w.variants.findIndex((v) => v.stock > 0));
  refreshAvailability(w);
  const zoom = $("#zoom");
  zoom.addEventListener("mousemove", (e) => {
    const r = zoom.getBoundingClientRect();
    $(".art", zoom).style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  });
}
function refreshAvailability(w) {
  const v = w.variants[currentVariant];
  const ok = !w.sold && v.stock > 0;
  $("#availability").innerHTML = w.sold
    ? '<span class="ko">Cette œuvre a été vendue.</span>'
    : ok
      ? `<span class="ok">✓ Disponible</span> — ${v.stock} exemplaire${v.stock > 1 ? "s" : ""} en « ${esc(v.label)} »`
      : `<span class="ko">● Rupture de stock pour « ${esc(v.label)} »</span>`;
  $("#add-cart").disabled = !ok;
  $("#buy-now").disabled = !ok;
}

/* ---------- Artistes ---------- */
function viewArtists() {
  return `
    <div class="page-head"><h1>Les <span class="fun">artistes</span></h1><p>Suivez vos artistes préférés pour être alerté·e de chaque nouvelle œuvre.</p></div>
    <div class="grid">${state.artists.map(artistCard).join("")}</div>`;
}

function viewArtist(id) {
  const a = artistById(id);
  if (!a) return viewNotFound();
  const works = visibleWorks().filter((w) => w.artist === id);
  const media = state.media[id] || {};
  const videos = [...a.videos, ...(media.videos || [])];
  const press = [...a.press, ...(media.press || [])];
  const tab = state.tab.artist || "oeuvres";
  let body = "";
  if (tab === "oeuvres") body = works.length ? `<div class="grid">${works.map((w) => card(w)).join("")}</div>` : emptyBox("Bientôt", "Cet artiste n'a pas encore publié d'œuvre.");
  if (tab === "coulisses")
    body = videos.length
      ? `<div class="grid cols-3">${videos
          .map((v, i) => `<button class="video-tile" style="border:0;padding:0" data-act="play" aria-label="Lire ${esc(v)}">${visual(works[i % Math.max(works.length, 1)])}<div class="play"></div><span>${esc(v)}</span></button>`)
          .join("")}</div>`
      : emptyBox("Pas encore de vidéo", "Les vidéos coulisses de l'artiste apparaîtront ici.");
  if (tab === "presse")
    body = press.length
      ? press.map((p) => `<div class="doc-row"><span><strong>${esc(p)}</strong> <span class="muted">· PDF</span></span><button class="btn btn-small btn-outline" data-act="download">Consulter</button></div>`).join("")
      : emptyBox("Aucun document", "Le dossier de presse sera bientôt disponible.");
  return `
    <div class="artist-head">
      <div class="avatar">${initials(a.name)}</div>
      <div>
        <span class="label muted">${esc(a.city)}</span>
        <h1>${esc(a.name)}</h1>
        <p>${esc(a.bio)}</p>
        <div class="artist-stats"><span><b>${a.followers + (state.follows.includes(id) ? 1 : 0)}</b> abonné·e·s</span><span><b>${works.length}</b> œuvres</span></div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${followBtn(id)}<a class="btn btn-outline" href="#/messages/${id}">Contacter</a></div>
    </div>
    ${tabs("artist", [["oeuvres", "Œuvres"], ["coulisses", "Coulisses"], ["presse", "Dossier de presse"]], tab)}
    ${body}`;
}

/* ---------- Notre histoire ---------- */
function viewStory() {
  return `
    <div class="page-head"><h1>Notre <span class="fun">histoire</span></h1><p>${esc(STORY.intro)}</p></div>
    <div class="story-page">
      <aside class="story-media">
        <div class="portrait">${STORY.photo ? `<img src="${STORY.photo}" alt="${esc(STORY.founder)}, ${esc(STORY.role.toLowerCase())}" />` : `<span>${initials(STORY.founder)}</span>`}</div>
        <div class="story-caption mono"><span>${esc(STORY.founder)}</span><span>${esc(STORY.role)}</span></div>
      </aside>
      <div class="chapters">
        ${STORY.chapters
          .map((c, i) => `<section class="chapter"><span class="ref">${String(i + 1).padStart(2, "0")}</span><h2>${esc(c.title)}</h2><p>${esc(c.text)}</p></section>`)
          .join("")}
        <blockquote class="story-quote">« ${esc(STORY.quote)} »<cite class="mono">— ${esc(STORY.founder)}</cite></blockquote>
        <div class="hero-cta">
          <a class="btn" href="#/galerie">Explorer la galerie</a>
          <a class="btn btn-outline" href="#/profil">Rejoindre en tant qu'artiste</a>
        </div>
      </div>
    </div>`;
}

/* ---------- Sélection ---------- */
function viewSelection() {
  const seen = [...state.views, ...state.favs].map(byId).filter(Boolean);
  const types = new Set(seen.map((w) => w.type));
  const artists = new Set([...seen.map((w) => w.artist), ...state.follows]);
  const scored = visibleWorks()
    .filter((w) => !w.sold)
    .map((w) => {
      let score = 0;
      let reason = "Tendance sur ATYPIIK";
      if (types.has(w.type)) (score += 2), (reason = `Vous aimez : ${w.type}`);
      if (state.follows.includes(w.artist)) (score += 3), (reason = `Vous suivez ${artistOf(w).name}`);
      else if (artists.has(w.artist)) (score += 2), (reason = `Artiste consulté·e récemment`);
      if (state.favs.includes(w.id)) score -= 2;
      return { w, score, reason };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
  return `
    <div class="page-head"><h1>Notre sélection<br />pour vous</h1>
      <p>${seen.length || state.follows.length ? "Calculée à partir de vos recherches, des œuvres vues, de vos favoris et de vos abonnements." : "Parcourez la galerie, ajoutez des favoris et suivez des artistes pour affiner vos recommandations."}</p></div>
    <div class="grid">${scored
      .map(({ w, reason }) =>
        card(
          w,
          `<div class="reason">${esc(reason)}</div>
           <div class="card-actions"><a class="btn btn-small" href="#/oeuvre/${w.id}">Voir l'œuvre</a><a class="btn btn-small btn-outline" href="#/artiste/${w.artist}">Profil de l'artiste</a></div>`,
        ),
      )
      .join("")}</div>`;
}

/* ---------- Favoris ---------- */
function viewFavs() {
  const works = state.favs.map(byId).filter((w) => w && !w.hidden);
  return `
    <div class="page-head"><h1>Mes <span class="fun">favoris</span></h1><p>Vous serez prévenu·e en cas de baisse de prix ou de retour en stock.</p></div>
    ${works.length ? `<div class="grid">${works.map((w) => card(w)).join("")}</div>` : emptyBox("Aucun favori", "Touchez le cœur sur une œuvre pour la retrouver ici.", '<a class="btn" href="#/galerie">Explorer</a>')}`;
}

/* ---------- Panier ---------- */
function cartLines() {
  return state.cart.map((l) => ({ ...l, w: byId(l.id) })).filter((l) => l.w);
}
function viewCart() {
  const lines = cartLines();
  if (!lines.length)
    return `<div class="page-head"><h1>Mon <span class="fun">panier</span></h1></div>${emptyBox("Panier vide", "Vos articles sont conservés même après fermeture du navigateur.", '<a class="btn" href="#/galerie">Découvrir des œuvres</a>')}`;
  const total = lines.reduce((s, l) => s + l.w.price * l.qty, 0);
  const blocked = lines.some((l) => l.w.sold || l.w.variants[l.variant].stock < l.qty);
  return `
    <div class="page-head"><h1>Mon <span class="fun">panier</span></h1></div>
    <div class="cart">
      <div>${lines
        .map((l, i) => {
          const v = l.w.variants[l.variant];
          const ko = l.w.sold || v.stock === 0;
          return `
          <div class="cart-line">
            <a class="thumb" href="#/oeuvre/${l.w.id}">${visual(l.w)}</a>
            <div>
              <div class="card-title">${esc(l.w.title)}</div>
              <div class="card-artist">${esc(artistOf(l.w).name)} · ${esc(v.label)} · ${euro(l.w.price)}</div>
              ${ko ? '<div class="alert">⚠ Cet article n\'est plus disponible.</div>' : v.stock < l.qty ? `<div class="alert">⚠ Plus que ${v.stock} en stock.</div>` : ""}
              <button class="link-btn" data-act="cart-remove" data-i="${i}">Supprimer</button>
            </div>
            <div class="qty">
              <button data-act="cart-qty" data-i="${i}" data-d="-1" aria-label="Moins">−</button>
              <span>${l.qty}</span>
              <button data-act="cart-qty" data-i="${i}" data-d="1" aria-label="Plus" ${l.qty >= v.stock ? "disabled" : ""}>+</button>
            </div>
          </div>`;
        })
        .join("")}</div>
      ${summaryBox(lines, `<a class="btn btn-block" href="#/paiement" ${blocked ? "data-blocked" : ""} style="margin-top:16px${blocked ? ";opacity:.35;pointer-events:none" : ""}">Passer au paiement</a>`)}
    </div>`;
}
function cartShipping(lines) {
  return lines.reduce((sum, l) => sum + shippingOf(l.w), 0);
}
/* split = true sur la page de paiement : on y détaille la répartition du montant. */
function summaryBox(lines, cta = "", split = false) {
  const total = lines.reduce((s, l) => s + l.w.price * l.qty, 0);
  const ship = cartShipping(lines);
  return `
    <aside class="summary">
      <h3>Récapitulatif</h3>
      <div class="summary-row"><span>Sous-total</span><span>${euro(total)}</span></div>
      <div class="summary-row"><span>Livraison suivie</span><span>${euro(ship)}</span></div>
      <div class="summary-row total"><span>Total TTC</span><span>${euro(total + ship)}</span></div>
      ${
        split
          ? `<div class="split">
              <span class="mono">Où va votre argent</span>
              <div class="summary-row sub"><span>Aux artistes (90 % des œuvres)</span><span>${euro(total * (1 - COMMISSION))}</span></div>
              <div class="summary-row sub"><span>Frais de port, reversés aux artistes</span><span>${euro(ship)}</span></div>
              <div class="summary-row sub"><span>ATYPIIK (10 % des œuvres)</span><span>${euro(total * COMMISSION)}</span></div>
            </div>`
          : ""
      }
      ${cta}
      <p class="secure">🔒 Paiement sécurisé Stripe Connect · PCI-DSS</p>
    </aside>`;
}

/* ---------- Tunnel de paiement ---------- */
function viewCheckout() {
  if (!state.user) return needLogin("Connectez-vous pour finaliser votre commande.");
  const lines = cartLines();
  if (!lines.length) return viewCart();
  const total = lines.reduce((s, l) => s + l.w.price * l.qty, 0);
  const c = state.checkout;
  const steps = ["Adresse", "Paiement", "Confirmation"]
    .map((s, i) => `<span class="${i + 1 === c.step ? "on" : i + 1 < c.step ? "done" : ""}">${i + 1}. ${s}</span>`)
    .join("");
  const a = c.address || { name: state.user.name, street: "", zip: "", city: "", same: true };
  const form =
    c.step === 1
      ? `<form class="panel" id="address-form">
          <h2>Livraison</h2>
          <div class="field"><label for="ad-name">Nom complet</label><input id="ad-name" required value="${esc(a.name)}" autocomplete="name" /></div>
          <div class="field"><label for="ad-street">Adresse</label><input id="ad-street" required value="${esc(a.street)}" autocomplete="street-address" placeholder="12 rue des Arts" /></div>
          <div class="field-row">
            <div class="field"><label for="ad-zip">Code postal</label><input id="ad-zip" required pattern="[0-9]{5}" value="${esc(a.zip)}" autocomplete="postal-code" placeholder="13001" /></div>
            <div class="field"><label for="ad-city">Ville</label><input id="ad-city" required value="${esc(a.city)}" autocomplete="address-level2" /></div>
          </div>
          <label class="check"><input type="checkbox" id="ad-same" ${a.same ? "checked" : ""} /> Adresse de facturation identique</label>
          <div id="billing" ${a.same ? "hidden" : ""}>
            <div class="field"><label for="ad-bill">Adresse de facturation</label><input id="ad-bill" value="${esc(a.bill || "")}" /></div>
          </div>
          <button class="btn btn-block">Continuer vers le paiement</button>
        </form>`
      : `<form class="panel" id="pay-form">
          <h2>Paiement</h2>
          <p class="hint">Livraison : ${esc(a.name)}, ${esc(a.street)}, ${esc(a.zip)} ${esc(a.city)} · <button type="button" class="link-btn" data-act="checkout-step" data-id="1">Modifier</button></p>
          <div class="field"><label for="cc-num">Numéro de carte</label><input id="cc-num" required inputmode="numeric" placeholder="4242 4242 4242 4242" autocomplete="cc-number" /></div>
          <div class="field-row">
            <div class="field"><label for="cc-exp">Expiration</label><input id="cc-exp" required placeholder="MM/AA" autocomplete="cc-exp" /></div>
            <div class="field"><label for="cc-cvc">CVC</label><input id="cc-cvc" required inputmode="numeric" placeholder="123" autocomplete="cc-csc" /></div>
          </div>
          <p class="hint">Démo : aucun paiement réel n'est effectué. En production, la saisie de la carte est gérée par Stripe.</p>
          <button class="btn btn-block">Payer ${euro(total + cartShipping(lines))}</button>
        </form>`;
  return `
    <div class="page-head"><h1>Commande</h1></div>
    <div class="checkout-steps">${steps}</div>
    <div class="cart">${form}${summaryBox(lines, "", true)}</div>`;
}

function bindCheckout() {
  const af = $("#address-form");
  if (af) {
    $("#ad-same").addEventListener("change", (e) => ($("#billing").hidden = e.target.checked));
    af.addEventListener("submit", (e) => {
      e.preventDefault();
      state.checkout.address = {
        name: $("#ad-name").value.trim(), street: $("#ad-street").value.trim(), zip: $("#ad-zip").value.trim(),
        city: $("#ad-city").value.trim(), same: $("#ad-same").checked, bill: $("#ad-bill").value.trim(),
      };
      state.checkout.step = 2;
      render();
    });
  }
  const pf = $("#pay-form");
  if (pf)
    pf.addEventListener("submit", (e) => {
      e.preventDefault();
      placeOrder();
    });
}

function placeOrder() {
  const lines = cartLines();
  const bad = lines.find((l) => l.w.sold || l.w.variants[l.variant].stock < l.qty);
  if (bad) {
    toast(`« ${bad.w.title} » n'est plus disponible en quantité suffisante.`);
    return nav("#/panier");
  }
  const total = lines.reduce((s, l) => s + l.w.price * l.qty, 0) + cartShipping(lines);
  const a = state.checkout.address;
  const id = "CMD-2026-" + String(1000 + state.orders.length + Math.floor(Math.random() * 8000)).padStart(4, "0");
  lines.forEach((l) => {
    l.w.variants[l.variant].stock -= l.qty;
    if (l.w.variants.length === 1 && l.w.variants[0].label === "Original" && l.w.variants[0].stock === 0) l.w.sold = true;
  });
  state.orders.unshift({
    id, date: today(), status: 0, buyer: state.user.name,
    address: `${a.street}, ${a.zip} ${a.city}`,
    lines: lines.map((l) => ({ id: l.id, variant: l.variant, qty: l.qty, price: l.w.price })), total,
  });
  state.cart = [];
  state.checkout = { step: 1, address: a };
  if (state.prefs.orders) notify(`Commande ${id} confirmée — ${euro(total)}. L'artiste prépare votre colis.`, "#/profil");
  save();
  nav("#/commande/" + id);
}

function viewOrderDone(id) {
  const o = state.orders.find((x) => x.id === id);
  if (!o) return viewNotFound();
  return `
    <div class="empty" style="border-style:solid;border-color:var(--ink)">
      <span class="label muted">Merci</span>
      <h3 style="font-size:3rem;margin-top:12px">Commande confirmée</h3>
      <p>Commande <strong>${o.id}</strong> · ${euro(o.total)}. Un e-mail de confirmation vient de vous être envoyé.<br />Vous suivrez chaque étape depuis votre profil et vos notifications.</p>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><a class="btn" href="#/profil">Suivre ma commande</a><a class="btn btn-outline" href="#/galerie">Continuer mes découvertes</a></div>
    </div>`;
}

/* ---------- Notifications ---------- */
function viewNotifs() {
  const list = state.notifs;
  return `
    <div class="page-head"><h1>Mes <span class="fun">alertes</span></h1>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-small btn-outline" data-act="notifs-read">Tout marquer comme lu</button><a class="btn btn-small btn-outline" href="#/profil" data-act="tab-link" data-key="profile" data-id="prefs">Préférences</a></div>
    </div>
    ${
      list.length
        ? list
            .map(
              (n) => `
        <div class="notif ${n.read ? "" : "unread"}">
          <span class="n-dot"></span>
          <div><strong>${esc(n.text)}</strong><small>${frDate(n.date)}</small></div>
          <a class="btn btn-small btn-outline" href="${n.link}" data-act="notif-open" data-id="${n.id}">Voir</a>
        </div>`,
            )
            .join("")
        : emptyBox("Rien de neuf", "Suivi de commande, baisses de prix, nouveautés de vos artistes : tout arrivera ici.")
    }`;
}

/* ---------- Messagerie ---------- */
function threadName(key) {
  return key === "support" ? "Équipe ATYPIIK" : artistById(key)?.name || "Artiste";
}
function viewMessages(param) {
  if (!state.user) return needLogin("Connectez-vous pour écrire aux artistes ou à notre équipe.");
  const seller = state.user.role === "vendeur";
  let keys;
  if (seller) keys = [state.user.artistId, "support"];
  else keys = [...new Set([...(param ? [param] : []), ...Object.keys(state.threads)])];
  keys = keys.filter((k) => k === "support" || artistById(k));
  const current = param && keys.includes(param) ? param : keys[0];
  const msgs = state.threads[current] || [];
  const meFrom = seller && current !== "support" ? "artist" : "buyer";
  const label = (k) => (seller && k !== "support" ? "Acheteurs — Camille R." : threadName(k));
  return `
    <div class="page-head"><h1>Mes <span class="fun">messages</span></h1><p>${seller ? "Répondez aux questions des acheteurs sur vos œuvres." : "Échangez en privé avec les artistes, ou contactez l'équipe ATYPIIK."}</p></div>
    <div class="inbox">
      <div class="threads">${keys
        .map((k) => {
          const last = (state.threads[k] || []).slice(-1)[0];
          return `<a class="thread ${k === current ? "on" : ""}" href="#/messages/${k}"><div class="avatar sm">${k === "support" ? "A" : initials(label(k))}</div><div><strong>${esc(label(k))}</strong><small>${esc(last?.text || "Nouvelle conversation")}</small></div></a>`;
        })
        .join("")}</div>
      <div class="conv">
        <div class="conv-head"><div class="avatar sm">${current === "support" ? "A" : initials(label(current))}</div><strong>${esc(label(current))}</strong>${current !== "support" && !seller ? `<a class="link-btn" style="margin-left:auto" href="#/artiste/${current}">Voir le profil</a>` : ""}</div>
        <div class="chat" id="chat">${msgs.length ? msgs.map((m) => `<div class="bubble ${m.from === meFrom ? "me" : ""}">${esc(m.text)}</div>`).join("") : '<p class="hint">Posez votre question : dimensions, livraison, commande personnalisée…</p>'}</div>
        <form class="chat-form" id="chat-form" data-key="${current}" data-from="${meFrom}">
          <input id="chat-input" placeholder="Votre message…" aria-label="Votre message" autocomplete="off" />
          <button class="btn btn-small">Envoyer</button>
        </form>
      </div>
    </div>`;
}

function bindMessages() {
  const chat = $("#chat");
  if (!chat) return;
  chat.scrollTop = chat.scrollHeight;
  const form = $("#chat-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = $("#chat-input").value.trim();
    if (!text) return;
    const key = form.dataset.key;
    const from = form.dataset.from;
    (state.threads[key] = state.threads[key] || []).push({ from, text });
    save();
    render();
    if (from === "buyer") {
      setTimeout(() => {
        const reply = key === "support" ? "Merci, un membre de l'équipe vous répond sous 24 h." : "Merci pour votre message ! Je vous réponds très vite.";
        state.threads[key].push({ from: "artist", text: reply });
        notify(`Nouveau message de ${threadName(key)}.`, "#/messages/" + key);
        save();
        if (currentRoute === "messages") render();
      }, 1200);
    }
  });
}

/* ---------- Connexion ---------- */
function needLogin(text) {
  return `<div class="page-head"><h1>Connexion requise</h1><p>${text}</p></div>${loginForms()}`;
}
function loginForms() {
  return `
    <div class="two-col">
      <form class="panel" id="login-form">
        <h2>Se connecter</h2>
        <div class="field"><label for="li-email">E-mail</label><input id="li-email" type="email" required autocomplete="email" placeholder="vous@exemple.fr" /></div>
        <div class="field"><label for="li-pass">Mot de passe</label><input id="li-pass" type="password" required autocomplete="current-password" /></div>
        <button class="btn btn-block">Se connecter</button>
        <div class="demo-box">
          <strong>Mode démo</strong> — entrez directement dans un espace :
          <div class="btns">
            <button type="button" class="btn btn-small" data-act="demo-login" data-id="acheteur">Acheteur</button>
            <button type="button" class="btn btn-small btn-chrome" data-act="demo-login" data-id="vendeur">Artiste</button>
            <button type="button" class="btn btn-small btn-outline" data-act="demo-login" data-id="admin">Administrateur</button>
          </div>
        </div>
      </form>
      <form class="panel" id="signup-form">
        <h2>Créer un compte</h2>
        <div class="field"><label for="su-role">Je suis</label>
          <select id="su-role"><option value="acheteur">Acheteur·se</option><option value="vendeur">Artiste (vendeur)</option></select></div>
        <div class="field"><label for="su-name">Nom</label><input id="su-name" required autocomplete="name" /></div>
        <div class="field"><label for="su-email">E-mail</label><input id="su-email" type="email" required autocomplete="email" /></div>
        <div class="field" id="su-artist" hidden>
          <div class="field-row">
            <div class="field"><label for="su-city">Ville</label><input id="su-city" /></div>
            <div class="field"><label for="su-disc">Discipline</label><input id="su-disc" placeholder="Peinture, photo…" /></div>
          </div>
          <div class="seller-terms">
            <strong>Comment vous êtes payé·e</strong>
            <p>Vous fixez votre prix. Sur chaque vente, ATYPIIK prélève une commission de <b>10 %</b> et vous recevez <b>90 %</b>, versés par Stripe après la livraison. Les frais de port sont payés par l'acheteur et vous sont reversés en totalité.</p>
          </div>
        </div>
        <div class="field"><label for="su-pass">Mot de passe</label><input id="su-pass" type="password" required minlength="8" autocomplete="new-password" /></div>
        <label class="check"><input type="checkbox" required id="su-cgu" /> J'accepte les&nbsp;<a href="#/legal/cgu" style="text-decoration:underline">CGU / CGV</a></label>
        <button class="btn btn-block btn-chrome">Créer mon compte</button>
        <p class="hint">Les comptes artistes sont validés par l'équipe ATYPIIK avant la mise en vente.</p>
      </form>
    </div>`;
}
function bindLogin() {
  const lf = $("#login-form");
  if (!lf) return;
  lf.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#li-email").value.trim();
    login({ name: email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()), email, role: "acheteur" });
  });
  $("#su-role").addEventListener("change", (e) => ($("#su-artist").hidden = e.target.value !== "vendeur"));
  $("#signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#su-name").value.trim();
    const email = $("#su-email").value.trim();
    if ($("#su-role").value === "vendeur") {
      state.pending.push({ id: "p" + Date.now(), name, email, city: $("#su-city").value.trim() || "—", discipline: $("#su-disc").value.trim() || "—", status: "en attente" });
      login({ name, email, role: "attente" });
      toast("Compte créé : votre profil artiste attend la validation d'un administrateur.");
    } else {
      login({ name, email, role: "acheteur" });
      toast("Bienvenue sur ATYPIIK !");
    }
  });
}
const DEMO_USERS = {
  acheteur: { name: "Camille Roux", email: "camille@exemple.fr", role: "acheteur" },
  vendeur: { name: "Nova Lune", email: "nova@exemple.fr", role: "vendeur", artistId: "nova" },
  admin: { name: "Équipe ATYPIIK", email: "admin@atypiik.fr", role: "admin" },
};
function login(user) {
  state.user = user;
  save();
  const back = afterLogin;
  afterLogin = null;
  if (back && back !== currentHash) nav(back);
  else render();
}

/* ---------- Profil (routage par rôle) ---------- */
function viewProfile() {
  if (!state.user) return `<div class="page-head"><h1>Mon compte</h1><p>Connectez-vous ou créez un compte acheteur ou artiste.</p></div>${loginForms()}`;
  const u = state.user;
  const head = (title, sub) => `
    <div class="page-head">
      <div><span class="label muted">${sub}</span><h1>${title}</h1></div>
      <button class="btn btn-small btn-outline" data-act="logout">Se déconnecter</button>
    </div>`;
  if (u.role === "attente") {
    const p = state.pending.find((x) => x.email === u.email);
    if (p?.status === "validé") {
      state.user = { ...u, role: "vendeur", artistId: p.artistId };
      save();
      return viewProfile();
    }
    return `${head(esc(u.name), "Compte artiste")}${emptyBox("En cours de validation", p?.status === "refusé" ? "Votre demande n'a pas été retenue. Contactez-nous pour en savoir plus." : "Notre équipe vérifie votre profil. Vous pourrez publier vos œuvres dès sa validation.", '<a class="btn btn-outline" href="#/messages/support">Contacter l\'équipe</a>')}`;
  }
  if (u.role === "vendeur") return head(esc(u.name), "Espace artiste") + sellerSpace();
  if (u.role === "admin") return head("Administration", "Back-office ATYPIIK") + adminSpace();
  return head(esc(u.name), "Espace acheteur") + buyerSpace();
}

/* ---------- Espace acheteur ---------- */
function orderCard(o, withActions = true) {
  return `
    <div class="order">
      <div class="order-top">
        <div><strong>${o.id}</strong> <span class="muted">· ${frDate(o.date)}</span></div>
        <span class="price">${euro(o.total)}</span>
      </div>
      <div class="steps">${STEPS.map((s, i) => `<div class="${i < o.status ? "done" : i === o.status ? (o.status === 3 ? "done" : "current") : ""}">${s}</div>`).join("")}</div>
      <div class="order-lines">${o.lines
        .map((l) => {
          const w = byId(l.id);
          return w ? `<a href="#/oeuvre/${w.id}" title="${esc(w.title)}">${visual(w)}</a><span class="hint">${esc(w.title)} × ${l.qty}</span>` : "";
        })
        .join("")}</div>
      ${
        withActions
          ? `<div class="order-foot"><span class="hint">Livraison : ${esc(o.address)}</span>
              <div style="display:flex;gap:6px;flex-wrap:wrap">
                ${o.status === 3 ? `<button class="btn btn-small btn-outline" data-act="return" data-id="${o.id}">Demander un retour</button>` : ""}
                <button class="btn btn-small btn-outline" data-act="dispute" data-id="${o.id}">Signaler un problème</button>
              </div></div>`
          : ""
      }
    </div>`;
}

function buyerSpace() {
  const tab = state.tab.profile || "commandes";
  const mine = state.orders;
  let body = "";
  if (tab === "commandes") body = mine.length ? mine.map((o) => orderCard(o)).join("") : emptyBox("Aucune commande", "Vos achats et leur suivi apparaîtront ici.", '<a class="btn" href="#/galerie">Explorer</a>');
  if (tab === "favoris") body = viewFavs().replace(/<div class="page-head">[\s\S]*?<\/div>/, "");
  if (tab === "abonnements") {
    const list = state.follows.map(artistById).filter(Boolean);
    body = list.length ? `<div class="grid">${list.map(artistCard).join("")}</div>` : emptyBox("Aucun abonnement", "Suivez des artistes pour être alerté·e de leurs nouvelles œuvres.", '<a class="btn" href="#/artistes">Voir les artistes</a>');
  }
  if (tab === "messages")
    body = Object.keys(state.threads).length
      ? Object.keys(state.threads)
          .map((k) => `<div class="doc-row"><span><strong>${esc(threadName(k))}</strong> <span class="muted">· ${esc((state.threads[k].slice(-1)[0] || {}).text || "")}</span></span><a class="btn btn-small btn-outline" href="#/messages/${k}">Ouvrir</a></div>`)
          .join("")
      : emptyBox("Aucune conversation", "Écrivez à un artiste depuis une fiche œuvre.");
  if (tab === "prefs") body = prefsPanel();
  if (tab === "compte") body = accountPanel();
  return (
    tabs(
      "profile",
      [
        ["commandes", "Commandes", mine.filter((o) => o.status < 3).length],
        ["favoris", "Favoris"],
        ["abonnements", "Abonnements"],
        ["messages", "Messages"],
        ["prefs", "Notifications"],
        ["compte", "Compte & RGPD"],
      ],
      tab,
    ) + body
  );
}

function prefsPanel() {
  const p = state.prefs;
  const row = (k, label) => `<label class="check"><input type="checkbox" data-act="pref" data-id="${k}" ${p[k] ? "checked" : ""} /> ${label}</label>`;
  return `
    <div class="panel" style="max-width:640px">
      <h3>Mes alertes</h3>
      ${row("orders", "Suivi de commande : confirmation, expédition, livraison, retours")}
      ${row("prices", "Baisse de prix et retour en stock de mes favoris")}
      ${row("news", "Nouvelles œuvres des artistes que je suis")}
      ${row("promos", "Offres et événements de la plateforme")}
      <hr style="border:0;border-top:1px solid var(--rule-soft);margin:14px 0" />
      ${row("email", "Recevoir aussi ces alertes par e-mail")}
    </div>`;
}

function accountPanel() {
  const u = state.user;
  return `
    <div class="two-col">
      <form class="panel" id="account-form">
        <h3>Mes informations</h3>
        <div class="field"><label for="ac-name">Nom</label><input id="ac-name" required value="${esc(u.name)}" /></div>
        <div class="field"><label for="ac-email">E-mail</label><input id="ac-email" type="email" required value="${esc(u.email)}" /></div>
        <button class="btn">Enregistrer</button>
      </form>
      <div class="panel">
        <h3>Mes données (RGPD)</h3>
        <p class="hint">Vous pouvez à tout moment accéder à vos données, les rectifier ou demander leur suppression.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
          <button class="btn btn-small btn-outline" data-act="export">Voir mes données</button>
          <button class="btn btn-small btn-outline" data-act="delete-account">Supprimer mon compte</button>
        </div>
        <div id="export-box"></div>
      </div>
    </div>`;
}

/* ---------- Espace artiste ---------- */
function sellerSales(artistId) {
  const fromSeed = state.sales.filter((s) => byId(s.work)?.artist === artistId).map((s) => ({ ...s, src: "seed" }));
  const fromOrders = state.orders.flatMap((o) =>
    o.lines.filter((l) => byId(l.id)?.artist === artistId).map((l) => ({ order: o.id, date: o.date, buyer: o.buyer, work: l.id, qty: l.qty, price: l.price, status: o.status, src: "order" })),
  );
  return [...fromOrders, ...fromSeed];
}

function sellerSpace() {
  const id = state.user.artistId;
  const a = artistById(id);
  const tab = state.tab.seller || "dashboard";
  const works = state.works.filter((w) => w.artist === id);
  const sales = sellerSales(id);
  const gross = sales.reduce((s, x) => s + x.price * x.qty, 0);
  const toShip = sales.filter((s) => s.status < 2).length;
  let body = "";
  if (tab === "dashboard") {
    body = `
      <div class="kpis">
        <div><b>${euro(gross * 0.9)}</b><span>Revenus nets (90 %)</span></div>
        <div><b>${sales.length}</b><span>Ventes</span></div>
        <div><b class="${toShip ? "pink" : ""}">${toShip}</b><span>À expédier</span></div>
        <div><b>${a.followers}</b><span>Abonné·e·s</span></div>
      </div>
      <div class="two-col">
        <div class="panel"><h3>À faire</h3>
          ${toShip ? `<p>${toShip} commande${toShip > 1 ? "s" : ""} à préparer ou expédier.</p><button class="btn btn-small" data-act="tab" data-key="seller" data-id="ventes">Voir les ventes</button>` : '<p class="hint">Aucune commande en attente.</p>'}
        </div>
        <div class="panel"><h3>Votre vitrine</h3><p class="hint">${works.length} œuvre${works.length > 1 ? "s" : ""} en ligne · ${works.filter((w) => totalStock(w) === 0).length} en rupture.</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-small btn-chrome" data-act="tab" data-key="seller" data-id="ajouter">Publier une œuvre</button><a class="btn btn-small btn-outline" href="#/artiste/${id}">Voir ma page publique</a></div>
        </div>
      </div>`;
  }
  if (tab === "oeuvres") {
    body = works.length
      ? `<div class="table-wrap"><table>
          <thead><tr><th>Œuvre</th><th>Déclinaisons & stock</th><th class="num">Prix (€)</th><th>Statut</th><th></th></tr></thead>
          <tbody>${works
            .map(
              (w) => `<tr>
              <td><a href="#/oeuvre/${w.id}" style="display:flex;gap:10px;align-items:center">${visual(w, "display:block;width:44px;height:44px;flex:none")}<strong>${esc(w.title)}</strong></a></td>
              <td>${w.variants.map((v, i) => `<label style="display:flex;gap:6px;align-items:center;margin:2px 0"><span style="min-width:90px">${esc(v.label)}</span><input type="number" min="0" value="${v.stock}" style="width:64px;padding:4px;border:1px solid var(--ink)" data-act="edit-stock" data-id="${w.id}" data-i="${i}" aria-label="Stock ${esc(v.label)}" /></label>`).join("")}</td>
              <td class="num"><input type="number" min="1" value="${w.price}" style="width:90px;padding:4px;border:1px solid var(--ink);text-align:right" data-act="edit-price" data-id="${w.id}" aria-label="Prix" /><div class="mono muted" style="margin-top:4px">net ${euro(w.price * (1 - COMMISSION))} + port</div></td>
              <td>${w.hidden ? '<span class="tag pink">Masquée</span>' : w.sold ? '<span class="tag grey">Vendue</span>' : totalStock(w) ? '<span class="tag green">En ligne</span>' : '<span class="tag pink">Rupture</span>'}</td>
              <td class="num"><button class="btn btn-small btn-outline" data-act="save-work" data-id="${w.id}">Enregistrer</button></td>
            </tr>`,
            )
            .join("")}</tbody></table></div>`
      : emptyBox("Aucune œuvre", "Publiez votre première œuvre.");
  }
  if (tab === "ajouter") body = addWorkForm();
  if (tab === "ventes") {
    body = sales.length
      ? `<div class="table-wrap"><table>
          <thead><tr><th>Commande</th><th>Date</th><th>Acheteur</th><th>Œuvre</th><th class="num">Vente</th><th class="num">Net (90 %)</th><th>Statut</th><th></th></tr></thead>
          <tbody>${sales
            .map(
              (s) => `<tr><td>${s.order}</td><td>${frDate(s.date)}</td><td>${esc(s.buyer)}</td><td>${esc(byId(s.work)?.title)} × ${s.qty}</td>
              <td class="num">${euro(s.price * s.qty)}</td><td class="num">${euro(s.price * s.qty * 0.9)}</td>
              <td><span class="tag ${s.status === 3 ? "green" : s.status === 2 ? "grey" : "pink"}">${STEPS[s.status]}</span></td>
              <td class="num">${s.status < 3 ? `<button class="btn btn-small" data-act="advance" data-src="${s.src}" data-id="${s.order}">${s.status < 2 ? "Marquer expédiée" : "Marquer livrée"}</button>` : ""}</td></tr>`,
            )
            .join("")}</tbody></table></div>`
      : emptyBox("Pas encore de vente", "Vos ventes apparaîtront ici avec votre part nette.");
  }
  if (tab === "profil") {
    const media = state.media[id] || {};
    body = `
      <div class="two-col">
        <form class="panel" id="artist-form">
          <h3>Profil public</h3>
          <div class="field"><label for="ar-name">Nom d'artiste</label><input id="ar-name" required value="${esc(a.name)}" /></div>
          <div class="field"><label for="ar-city">Ville</label><input id="ar-city" value="${esc(a.city)}" /></div>
          <div class="field"><label for="ar-bio">Biographie</label><textarea id="ar-bio" rows="4">${esc(a.bio)}</textarea></div>
          <button class="btn">Enregistrer</button>
        </form>
        <div class="stack">
          <div class="panel"><h3>Dossier de presse</h3>
            ${[...a.press, ...(media.press || [])].map((p) => `<div class="doc-row"><span>${esc(p)}</span><span class="tag green">En ligne</span></div>`).join("") || '<p class="hint">Aucun document.</p>'}
            <div class="field" style="margin-top:14px"><label for="up-press">Ajouter un PDF</label><input id="up-press" type="file" accept="application/pdf" data-act="upload" data-kind="press" /></div>
          </div>
          <div class="panel"><h3>Vidéos coulisses</h3>
            ${[...a.videos, ...(media.videos || [])].map((v) => `<div class="doc-row"><span>${esc(v)}</span><span class="tag green">En ligne</span></div>`).join("") || '<p class="hint">Aucune vidéo.</p>'}
            <div class="field" style="margin-top:14px"><label for="up-video">Ajouter une vidéo</label><input id="up-video" type="file" accept="video/*" data-act="upload" data-kind="videos" /></div>
          </div>
        </div>
      </div>`;
  }
  if (tab === "messages") body = `<p><a class="btn" href="#/messages/${id}">Ouvrir la messagerie</a></p>`;
  return (
    tabs(
      "seller",
      [
        ["dashboard", "Tableau de bord"],
        ["oeuvres", "Mes œuvres"],
        ["ajouter", "Publier"],
        ["ventes", "Ventes", toShip],
        ["profil", "Profil & médias"],
        ["messages", "Messages"],
      ],
      tab,
    ) + body
  );
}

function addWorkForm() {
  return `
    <form class="panel" id="work-form" style="max-width:820px">
      <h3>Publier une œuvre</h3>
      <div class="field"><label for="wk-title">Titre</label><input id="wk-title" required /></div>
      <div class="field"><label for="wk-desc">Description</label><textarea id="wk-desc" rows="3"></textarea></div>
      <div class="field-row">
        <div class="field"><label for="wk-type">Type d'art</label><select id="wk-type"><option>Peinture</option><option>Sculpture</option><option>Photographie</option><option>Textile</option><option>Mode</option><option>Bijoux</option><option>Céramique</option><option>Dessin</option></select></div>
        <div class="field"><label for="wk-price">Prix de vente TTC (€)</label><input id="wk-price" type="number" min="1" required /></div>
      </div>
      <div class="field-row">
        <div class="field"><label for="wk-ship">Frais de port payés par l'acheteur (€)</label><input id="wk-ship" type="number" min="0" step="0.5" value="15" /></div>
        <div class="payout" id="payout" aria-live="polite"></div>
      </div>
      <div class="field-row">
        <div class="field"><label for="wk-color">Couleur dominante</label><select id="wk-color">${Object.keys(COLORS).map((c) => `<option>${c}</option>`).join("")}</select></div>
        <div class="field"><label for="wk-size">Format</label><select id="wk-size"><option value="S">Petit</option><option value="M">Moyen</option><option value="L">Grand</option></select></div>
      </div>
      <div class="field-row">
        <div class="field"><label for="wk-tech">Technique</label><input id="wk-tech" placeholder="Acrylique sur toile" /></div>
        <div class="field"><label for="wk-dims">Dimensions</label><input id="wk-dims" placeholder="60 × 80 cm" /></div>
      </div>
      <div class="field"><label for="wk-photo">Photos HD</label><input id="wk-photo" type="file" accept="image/*" multiple /></div>
      <div class="field"><span>Déclinaisons et stock</span>
        <div id="variant-rows">
          <div class="vrow"><input placeholder="Original" aria-label="Nom de la déclinaison" value="Original" /><input type="number" min="0" value="1" aria-label="Stock" /><button type="button" class="btn btn-small btn-outline" data-act="vrow-del">✕</button></div>
        </div>
        <button type="button" class="link-btn" data-act="vrow-add" style="justify-self:start">+ Ajouter une déclinaison (taille, couleur, support…)</button>
      </div>
      <button class="btn btn-chrome">Publier l'œuvre</button>
      <p class="hint">Vos abonné·e·s recevront une notification dès la publication.</p>
    </form>`;
}

function payoutHtml(price, ship) {
  if (!price) return `<span class="mono">Ce que vous recevez</span><p class="hint">Saisissez un prix pour voir le calcul.</p>`;
  return `
    <span class="mono">Ce que vous recevez</span>
    <div class="summary-row sub"><span>Prix de vente</span><span>${euro(price)}</span></div>
    <div class="summary-row sub"><span>Commission ATYPIIK (10 %)</span><span>− ${euro(price * COMMISSION)}</span></div>
    <div class="summary-row sub"><span>Frais de port reversés</span><span>+ ${euro(ship)}</span></div>
    <div class="summary-row total"><span>Vous recevez</span><span>${euro(price * (1 - COMMISSION) + ship)}</span></div>`;
}

function bindSeller() {
  const wf = $("#work-form");
  if (wf) {
    const update = () => ($("#payout").innerHTML = payoutHtml(+$("#wk-price").value || 0, Math.max(0, +$("#wk-ship").value || 0)));
    $("#wk-size").addEventListener("change", (e) => {
      $("#wk-ship").value = SHIPPING_BY_SIZE[e.target.value];
      update();
    });
    $("#wk-price").addEventListener("input", update);
    $("#wk-ship").addEventListener("input", update);
    update();
  }
  if (wf)
    wf.addEventListener("submit", (e) => {
      e.preventDefault();
      const variants = $$("#variant-rows .vrow")
        .map((r) => {
          const [l, s] = $$("input", r);
          return { label: l.value.trim() || "Original", stock: Math.max(0, +s.value || 0) };
        })
        .filter(Boolean);
      const palette = ["#6d1a2a", "#d9c9b0", "#141111", "#c9ccd3", "#efe8dc", "#ffffff"];
      const pick = () => palette[Math.floor(Math.random() * palette.length)];
      const w = {
        id: "u" + Date.now(), title: $("#wk-title").value.trim(), artist: state.user.artistId, type: $("#wk-type").value,
        color: $("#wk-color").value, size: $("#wk-size").value, price: +$("#wk-price").value, ship: Math.max(0, +$("#wk-ship").value || 0),
        technique: $("#wk-tech").value.trim() || "—", dims: $("#wk-dims").value.trim() || "—", description: $("#wk-desc").value.trim(),
        art: `linear-gradient(${Math.floor(Math.random() * 360)}deg, ${pick()}, ${pick()} 55%, ${pick()})`,
        variants: variants.length ? variants : [{ label: "Original", stock: 1 }], isNew: true,
      };
      state.works.unshift(w);
      if (state.follows.includes(w.artist) && state.prefs.news) notify(`${artistOf(w).name}, que vous suivez, a publié « ${w.title} ».`, "#/oeuvre/" + w.id);
      save();
      toast("Œuvre publiée");
      state.tab.seller = "oeuvres";
      render();
    });
  const af = $("#artist-form");
  if (af)
    af.addEventListener("submit", (e) => {
      e.preventDefault();
      const a = artistById(state.user.artistId);
      Object.assign(a, { name: $("#ar-name").value.trim(), city: $("#ar-city").value.trim(), bio: $("#ar-bio").value.trim() });
      state.user.name = a.name;
      save();
      toast("Profil mis à jour");
    });
}

/* ---------- Espace administrateur ---------- */
function allSales() {
  const fromOrders = state.orders.flatMap((o) => o.lines.map((l) => ({ order: o.id, date: o.date, buyer: o.buyer, work: l.id, qty: l.qty, price: l.price, status: o.status })));
  return [...fromOrders, ...state.sales].sort((a, b) => (a.date < b.date ? 1 : -1));
}

function adminSpace() {
  const tab = state.tab.admin || "vendeurs";
  const sales = allSales();
  const gmv = sales.reduce((s, x) => s + x.price * x.qty, 0);
  const pending = state.pending.filter((p) => p.status === "en attente");
  const openDisputes = state.disputes.filter((d) => d.status === "ouvert");
  let body = "";
  if (tab === "vendeurs") {
    body = state.pending.length
      ? `<div class="table-wrap"><table><thead><tr><th>Artiste</th><th>E-mail</th><th>Ville</th><th>Discipline</th><th>Statut</th><th></th></tr></thead><tbody>${state.pending
          .map(
            (p) => `<tr><td><strong>${esc(p.name)}</strong></td><td>${esc(p.email)}</td><td>${esc(p.city)}</td><td>${esc(p.discipline)}</td>
            <td><span class="tag ${p.status === "validé" ? "green" : p.status === "refusé" ? "grey" : "pink"}">${p.status}</span></td>
            <td class="num">${p.status === "en attente" ? `<button class="btn btn-small" data-act="seller-ok" data-id="${p.id}">Valider</button><button class="btn btn-small btn-outline" data-act="seller-ko" data-id="${p.id}">Refuser</button>` : ""}</td></tr>`,
          )
          .join("")}</tbody></table></div>`
      : emptyBox("Aucune demande", "Les nouvelles candidatures d'artistes apparaîtront ici.");
  }
  if (tab === "moderation") {
    body = `<div class="table-wrap"><table><thead><tr><th>Œuvre</th><th>Artiste</th><th class="num">Prix</th><th>Visibilité</th><th></th></tr></thead><tbody>${state.works
      .map(
        (w) => `<tr><td><a href="#/oeuvre/${w.id}" style="display:flex;gap:10px;align-items:center">${visual(w, "display:block;width:40px;height:40px;flex:none")}${esc(w.title)}</a></td>
        <td>${esc(artistOf(w).name)}</td><td class="num">${euro(w.price)}</td>
        <td>${w.hidden ? '<span class="tag pink">Masquée</span>' : '<span class="tag green">Publique</span>'}</td>
        <td class="num"><button class="btn btn-small btn-outline" data-act="moderate" data-id="${w.id}">${w.hidden ? "Réafficher" : "Masquer"}</button></td></tr>`,
      )
      .join("")}</tbody></table></div>`;
  }
  if (tab === "finances") {
    body = `<div class="table-wrap"><table><thead><tr><th>Commande</th><th>Date</th><th>Œuvre</th><th>Artiste</th><th class="num">Montant</th><th class="num">Artiste 90 %</th><th class="num">Commission 10 %</th><th>Virement</th></tr></thead><tbody>${sales
      .map((s) => {
        const w = byId(s.work);
        const t = s.price * s.qty;
        return `<tr><td>${s.order}</td><td>${frDate(s.date)}</td><td>${esc(w?.title)}</td><td>${esc(w ? artistOf(w).name : "")}</td>
        <td class="num">${euro(t)}</td><td class="num">${euro(t * 0.9)}</td><td class="num"><strong>${euro(t * 0.1)}</strong></td>
        <td>${s.status === 3 ? '<span class="tag green">Versé</span>' : '<span class="tag grey">En séquestre</span>'}</td></tr>`;
      })
      .join("")}</tbody></table></div>`;
  }
  if (tab === "litiges") {
    body = state.disputes.length
      ? `<div class="table-wrap"><table><thead><tr><th>Litige</th><th>Commande</th><th>Acheteur</th><th>Motif</th><th class="num">Montant</th><th>Statut</th><th></th></tr></thead><tbody>${state.disputes
          .map(
            (d) => `<tr><td>${d.id}</td><td>${d.order}</td><td>${esc(d.buyer)}</td><td>${esc(d.reason)}</td><td class="num">${euro(d.amount)}</td>
            <td><span class="tag ${d.status === "ouvert" ? "pink" : "green"}">${d.status}</span></td>
            <td class="num">${d.status === "ouvert" ? `<button class="btn btn-small" data-act="dispute-refund" data-id="${d.id}">Rembourser</button><button class="btn btn-small btn-outline" data-act="dispute-close" data-id="${d.id}">Clore</button>` : ""}</td></tr>`,
          )
          .join("")}</tbody></table></div>`
      : emptyBox("Aucun litige", "Tout va bien.");
  }
  return `
    <div class="kpis">
      <div><b>${euro(gmv)}</b><span>Volume de ventes</span></div>
      <div><b class="pink">${euro(gmv * 0.1)}</b><span>Commissions (10 %)</span></div>
      <div><b>${state.artists.length}</b><span>Artistes actifs</span></div>
      <div><b class="${openDisputes.length ? "pink" : "green"}">${openDisputes.length}</b><span>Litiges ouverts</span></div>
    </div>
    ${tabs(
      "admin",
      [
        ["vendeurs", "Validation vendeurs", pending.length],
        ["moderation", "Modération"],
        ["finances", "Commissions & flux"],
        ["litiges", "Litiges", openDisputes.length],
      ],
      tab,
    )}
    ${body}`;
}

/* ---------- Pages légales ---------- */
function viewLegal(key) {
  const pages = {
    mentions: ["Mentions légales", "<p>Éditeur : ATYPIIK SAS (à compléter : capital, RCS, siège social, directeur de la publication).</p><p>Hébergement : à compléter (nom, adresse et téléphone de l'hébergeur).</p><p>Contact : via la messagerie ou l'adresse e-mail de la société.</p>"],
    cgu: ["CGU / CGV", "<p>Les présentes conditions encadrent l'utilisation de la marketplace ATYPIIK par les acheteurs et les artistes vendeurs.</p><p><strong>Commission :</strong> ATYPIIK prélève 10 % du prix de vente TTC de chaque transaction. L'artiste perçoit 90 %, versés via Stripe Connect après la livraison.</p><p><strong>Livraison :</strong> les frais de port sont fixés par l'artiste pour chaque œuvre, payés par l'acheteur et reversés intégralement à l'artiste ; ils n'entrent pas dans le calcul de la commission.</p><p><strong>Rétractation :</strong> 14 jours à compter de la réception, hors œuvres réalisées sur commande personnalisée.</p>"],
  };
  if (key === "rgpd")
    return `
      <div class="page-head"><h1>Confidentialité</h1><p>ATYPIIK tient un registre des traitements de données personnelles. Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité.</p></div>
      <div class="two-col">
        <form class="panel" id="rights-form">
          <h3>Exercer mes droits</h3>
          <div class="field"><label for="rg-email">E-mail du compte</label><input id="rg-email" type="email" required value="${esc(state.user?.email || "")}" /></div>
          <div class="field"><label for="rg-type">Ma demande</label><select id="rg-type"><option>Accès à mes données</option><option>Rectification</option><option>Suppression</option><option>Portabilité</option></select></div>
          <div class="field"><label for="rg-msg">Précisions</label><textarea id="rg-msg" rows="3"></textarea></div>
          <button class="btn">Envoyer la demande</button>
          <p class="hint">Réponse sous 30 jours maximum.</p>
        </form>
        <div class="panel">
          <h3>Cookies</h3>
          <label class="check"><input type="checkbox" checked disabled /> Nécessaires (panier, connexion) — toujours actifs</label>
          <label class="check"><input type="checkbox" id="ck-stats" ${state.cookies === "accept" ? "checked" : ""} /> Mesure d'audience</label>
          <label class="check"><input type="checkbox" id="ck-ads" ${state.cookies === "accept" ? "checked" : ""} /> Réseaux sociaux et vidéos tierces</label>
          <button class="btn btn-outline" data-act="cookies-save">Enregistrer mes choix</button>
        </div>
      </div>`;
  const [t, p] = pages[key] || pages.mentions;
  return `<div class="page-head"><h1>${t}</h1></div><div style="max-width:68ch">${p}</div>`;
}

function viewNotFound() {
  return emptyBox("404", "Cette page n'existe pas.", '<a class="btn" href="#/">Accueil</a>');
}

/* =========================================================
   ACTIONS (délégation d'événements)
   ========================================================= */
function requireUser(msg) {
  if (state.user && state.user.role !== "attente") return true;
  toast(msg);
  afterLogin = currentHash;
  nav("#/profil");
  return false;
}

function addToCart(id) {
  if (!requireUser("Connectez-vous pour ajouter des œuvres au panier.")) return false;
  const w = byId(id);
  const max = w.variants[currentVariant].stock;
  const line = state.cart.find((l) => l.id === id && l.variant === currentVariant);
  if (line) line.qty = Math.min(max, line.qty + 1);
  else state.cart.push({ id, variant: currentVariant, qty: 1 });
  save();
  return true;
}

function findSale(src, id) {
  if (src === "order") return state.orders.find((o) => o.id === id);
  return state.sales.find((s) => s.order === id);
}

const actions = {
  fav(el) {
    const id = el.dataset.id;
    const on = !state.favs.includes(id);
    state.favs = on ? [...state.favs, id] : state.favs.filter((x) => x !== id);
    $$(`[data-act="fav"][data-id="${id}"]`).forEach((b) => {
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on);
    });
    save();
    toast(on ? "Ajouté aux favoris" : "Retiré des favoris");
  },
  follow(el) {
    if (!requireUser("Connectez-vous pour suivre un artiste.")) return;
    const id = el.dataset.id;
    const on = !state.follows.includes(id);
    state.follows = on ? [...state.follows, id] : state.follows.filter((x) => x !== id);
    save();
    toast(on ? `Vous suivez ${artistById(id).name}` : "Abonnement retiré");
    render(true);
  },
  tab(el) {
    state.tab[el.dataset.key] = el.dataset.id;
    render(true);
  },
  "tab-link"(el) {
    state.tab[el.dataset.key] = el.dataset.id;
  },
  "reset-gallery"() {
    Object.assign(state.gallery, { type: [], color: [], size: [], artist: "", max: 2000, q: "" });
  },
  cat(el) {
    Object.assign(state.gallery, { type: [el.dataset.type], color: [], size: [], artist: "", max: 2000, q: "" });
  },
  filter(el) {
    const list = state.gallery[el.dataset.group];
    const i = list.indexOf(el.dataset.value);
    i >= 0 ? list.splice(i, 1) : list.push(el.dataset.value);
    el.classList.toggle("on", i < 0);
    renderResults();
  },
  "reset-filters"() {
    Object.assign(state.gallery, { type: [], color: [], size: [], artist: "", max: 2000, q: "" });
    $("#search").value = "";
    render(true);
  },
  view(el) {
    state.gallery.view = el.dataset.id;
    $$('[data-act="view"]').forEach((x) => x.classList.toggle("on", x === el));
    renderResults();
  },
  variant(el) {
    currentVariant = +el.dataset.i;
    $$('[data-act="variant"]').forEach((x) => x.classList.toggle("on", x === el));
    refreshAvailability(byId(currentParam));
  },
  thumb(el) {
    $$('[data-act="thumb"]').forEach((x) => x.classList.toggle("on", x === el));
    $("#zoom .art").style.filter = el.firstElementChild.style.filter;
  },
  "add-cart"(el) {
    if (addToCart(el.dataset.id)) toast("Ajouté au panier");
  },
  "buy-now"(el) {
    if (addToCart(el.dataset.id)) {
      state.checkout.step = 1;
      nav("#/paiement");
    }
  },
  "cart-qty"(el) {
    const l = state.cart[+el.dataset.i];
    const max = byId(l.id).variants[l.variant].stock;
    l.qty = Math.min(max, l.qty + +el.dataset.d);
    if (l.qty <= 0) state.cart.splice(+el.dataset.i, 1);
    save();
    render(true);
  },
  "cart-remove"(el) {
    state.cart.splice(+el.dataset.i, 1);
    save();
    render(true);
  },
  "checkout-step"(el) {
    state.checkout.step = +el.dataset.id;
    render(true);
  },
  "notifs-read"() {
    state.notifs.forEach((n) => (n.read = true));
    save();
    render(true);
  },
  "notif-open"(el) {
    const n = state.notifs.find((x) => String(x.id) === el.dataset.id);
    if (n) n.read = true;
    save();
  },
  "demo-login"(el) {
    login({ ...DEMO_USERS[el.dataset.id] });
    toast(`Connecté·e : espace ${el.textContent.trim().toLowerCase()}`);
  },
  logout() {
    state.user = null;
    state.tab = {};
    save();
    toast("Vous êtes déconnecté·e");
    render(true);
  },
  pref(el) {
    state.prefs[el.dataset.id] = el.checked;
    save();
    toast("Préférences enregistrées");
  },
  export() {
    const data = { compte: state.user, favoris: state.favs, abonnements: state.follows, commandes: state.orders.map((o) => o.id), preferences: state.prefs };
    $("#export-box").innerHTML = `<pre style="white-space:pre-wrap;font-size:.75rem;background:var(--paper-2);padding:12px;overflow-x:auto">${esc(JSON.stringify(data, null, 2))}</pre>`;
  },
  "delete-account"(el) {
    if (el.dataset.confirm) {
      state.user = null;
      state.favs = [];
      state.follows = [];
      state.cart = [];
      save();
      toast("Demande de suppression enregistrée. Vos données seront effacées sous 30 jours.");
      return render(true);
    }
    el.dataset.confirm = "1";
    el.textContent = "Confirmer la suppression";
    el.classList.remove("btn-outline");
  },
  return(el) {
    toast(`Demande de retour enregistrée pour ${el.dataset.id}. L'artiste vous contactera.`);
    if (state.prefs.orders) notify(`Retour demandé pour la commande ${el.dataset.id}.`, "#/profil");
    save();
  },
  dispute(el) {
    const o = state.orders.find((x) => x.id === el.dataset.id);
    if (state.disputes.some((d) => d.order === o.id && d.status === "ouvert")) return toast("Un signalement est déjà en cours pour cette commande.");
    state.disputes.unshift({ id: "L-" + (1043 + state.disputes.length), order: o.id, buyer: o.buyer, reason: "Signalé par l'acheteur", amount: o.total, status: "ouvert" });
    save();
    toast("Signalement transmis à l'équipe ATYPIIK.");
  },
  advance(el) {
    const s = findSale(el.dataset.src, el.dataset.id);
    s.status = s.status < 2 ? 2 : 3;
    if (el.dataset.src === "order" && state.prefs.orders) notify(`Votre commande ${s.id} est ${s.status === 2 ? "expédiée" : "livrée"}.`, "#/profil");
    save();
    toast(s.status === 2 ? "Commande marquée comme expédiée — l'acheteur est notifié." : "Commande marquée comme livrée.");
    render(true);
  },
  "save-work"(el) {
    const w = byId(el.dataset.id);
    const before = { price: w.price, stock: totalStock(w) };
    const newPrice = +$(`[data-act="edit-price"][data-id="${w.id}"]`).value;
    $$(`[data-act="edit-stock"][data-id="${w.id}"]`).forEach((inp) => (w.variants[+inp.dataset.i].stock = Math.max(0, +inp.value || 0)));
    if (newPrice > 0) w.price = newPrice;
    if (totalStock(w) > 0) w.sold = false;
    if (state.favs.includes(w.id) && state.prefs.prices) {
      if (w.price < before.price) notify(`Baisse de prix sur « ${w.title} » : ${euro(w.price)} au lieu de ${euro(before.price)}.`, "#/oeuvre/" + w.id);
      if (before.stock === 0 && totalStock(w) > 0) notify(`« ${w.title} » est de retour en stock.`, "#/oeuvre/" + w.id);
    }
    save();
    toast("Œuvre mise à jour");
    render(true);
  },
  "vrow-add"() {
    $("#variant-rows").insertAdjacentHTML(
      "beforeend",
      '<div class="vrow"><input placeholder="ex. 50 × 70 cm" aria-label="Nom de la déclinaison" /><input type="number" min="0" value="1" aria-label="Stock" /><button type="button" class="btn btn-small btn-outline" data-act="vrow-del">✕</button></div>',
    );
  },
  "vrow-del"(el) {
    if ($$("#variant-rows .vrow").length > 1) el.closest(".vrow").remove();
  },
  "seller-ok"(el) {
    const p = state.pending.find((x) => x.id === el.dataset.id);
    p.status = "validé";
    p.artistId = "art" + Date.now();
    state.artists.push({ id: p.artistId, name: p.name, city: p.city, bio: `${p.discipline}.`, followers: 0, videos: [], press: [] });
    save();
    toast(`${p.name} peut maintenant vendre sur ATYPIIK.`);
    render(true);
  },
  "seller-ko"(el) {
    state.pending.find((x) => x.id === el.dataset.id).status = "refusé";
    save();
    render(true);
  },
  moderate(el) {
    const w = byId(el.dataset.id);
    w.hidden = !w.hidden;
    save();
    toast(w.hidden ? "Œuvre masquée du catalogue" : "Œuvre de nouveau visible");
    render(true);
  },
  "dispute-refund"(el) {
    state.disputes.find((d) => d.id === el.dataset.id).status = "remboursé";
    save();
    toast("Remboursement lancé via Stripe.");
    render(true);
  },
  "dispute-close"(el) {
    state.disputes.find((d) => d.id === el.dataset.id).status = "clos";
    save();
    render(true);
  },
  "cookies-save"() {
    state.cookies = $("#ck-stats").checked || $("#ck-ads").checked ? "accept" : "refuse";
    save();
    toast("Vos choix de cookies sont enregistrés.");
  },
  play() {
    toast("Lecture vidéo (démo) — hébergée sur Cloudinary en production.");
  },
  download() {
    toast("Ouverture du PDF (démo) — hébergé sur AWS S3 en production.");
  },
};

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act]");
  if (el && actions[el.dataset.act] && el.tagName !== "INPUT") {
    if (el.tagName === "BUTTON") e.preventDefault();
    actions[el.dataset.act](el, e);
    if (e.defaultPrevented && el.tagName === "A") return;
  }
  const a = e.target.closest('a[href^="#/"]');
  if (a && !e.defaultPrevented) {
    e.preventDefault();
    nav(a.getAttribute("href"));
  }
  const ck = e.target.closest("[data-cookie]");
  if (ck) {
    state.cookies = ck.dataset.cookie;
    save();
  }
});
document.addEventListener("change", (e) => {
  const el = e.target;
  if (el.dataset.act === "pref") actions.pref(el);
  if (el.dataset.act === "upload" && el.files[0]) {
    const id = state.user.artistId;
    const m = (state.media[id] = state.media[id] || {});
    (m[el.dataset.kind] = m[el.dataset.kind] || []).push(el.files[0].name);
    save();
    toast(`« ${el.files[0].name} » ajouté à votre page.`);
    render(true);
  }
});
document.addEventListener("submit", (e) => {
  const f = e.target;
  if (f.id === "account-form") {
    e.preventDefault();
    Object.assign(state.user, { name: $("#ac-name").value.trim(), email: $("#ac-email").value.trim() });
    save();
    toast("Informations enregistrées");
  }
  if (f.id === "rights-form") {
    e.preventDefault();
    toast("Demande envoyée. Réponse sous 30 jours maximum.");
    f.reset();
  }
  if (f.id === "newsletter") {
    e.preventDefault();
    toast("Inscription confirmée");
    f.reset();
  }
});

/* =========================================================
   ROUTEUR
   ========================================================= */
let currentHash = "#/";
let currentRoute = null;
let currentParam = null;
let afterLogin = null;
const historyStack = [];
const scrollMemory = {};
let galleryScroll = 0;
let galleryLeftFor = null;

function nav(h) {
  if (h === currentHash) return render(true);
  historyStack.push(currentHash);
  scrollMemory[currentHash] = window.scrollY;
  currentHash = h;
  try {
    history.pushState({ h }, "", h);
  } catch {}
  render();
}
window.addEventListener("popstate", (e) => {
  scrollMemory[currentHash] = window.scrollY;
  currentHash = e.state?.h || location.hash || "#/";
  historyStack.pop();
  render(false, true);
});

function render(keepScroll = false, restoring = false) {
  const [route = "", param] = currentHash.replace(/^#\/?/, "").split("/");
  // Conservation du défilement : on mémorise la galerie quand on la quitte,
  // et on la restaure si l'on y revient depuis une fiche œuvre.
  if (currentRoute === "galerie" && route !== "galerie") {
    galleryScroll = window.scrollY;
    galleryLeftFor = route;
  }
  if (route === "galerie" && currentRoute !== "galerie" && (currentRoute === "oeuvre" || galleryLeftFor === "oeuvre")) restoring = true;
  if (route === "galerie") scrollMemory[currentHash] = galleryScroll;
  currentRoute = route;
  currentParam = param;
  if (route === "artiste" && !keepScroll) state.tab.artist = "oeuvres";

  const views = {
    "": [viewHome],
    galerie: [viewGallery, bindGallery],
    oeuvre: [() => viewProduct(param), () => bindProduct(param)],
    artistes: [viewArtists],
    histoire: [viewStory],
    artiste: [() => viewArtist(param)],
    selection: [viewSelection],
    favoris: [viewFavs],
    panier: [viewCart],
    paiement: [viewCheckout, () => (bindCheckout(), bindLogin())],
    commande: [() => viewOrderDone(param)],
    notifications: [viewNotifs],
    messages: [() => viewMessages(param), () => (bindMessages(), bindLogin())],
    profil: [viewProfile, () => (bindLogin(), bindSeller())],
    legal: [() => viewLegal(param)],
  };
  const [view, bind] = views[route] || [viewNotFound];
  const y = window.scrollY;
  app.innerHTML = `<div class="view"${keepScroll ? ' style="animation:none"' : ""}>${view()}</div>`;
  if (bind) bind();

  $$("[data-route]").forEach((a) => a.classList.toggle("active", a.dataset.route === route));
  $("#drawer").classList.remove("open");
  updateChrome();

  if (keepScroll) window.scrollTo(0, y);
  else if (restoring) requestAnimationFrame(() => window.scrollTo(0, scrollMemory[currentHash] || 0));
  else window.scrollTo(0, 0);
}

/* ---------- Démarrage ---------- */
$("#year").textContent = new Date().getFullYear();
$("#burger").addEventListener("click", () => $("#drawer").classList.add("open"));
$("#drawer-close").addEventListener("click", () => $("#drawer").classList.remove("open"));
$("#search-toggle").addEventListener("click", () => {
  const bar = $("#search-bar");
  bar.classList.toggle("open");
  if (bar.classList.contains("open")) $("#search").focus();
});
$("#search").addEventListener("input", (e) => {
  state.gallery.q = e.target.value;
  if (currentRoute !== "galerie") nav("#/galerie");
  else renderResults();
});
try {
  const h = location.hash;
  if (/^#\/[\w/-]*$/.test(h)) currentHash = h;
  history.replaceState({ h: currentHash }, "", currentHash);
} catch {}
render();
