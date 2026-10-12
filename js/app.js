/* =========================================================
   ATYPIIK — application front (vanilla JS, routage par hash)
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const app = $("#app");

const euro = (n) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const artistOf = (w) => ARTISTS.find((a) => a.id === w.artist);
const byId = (id) => ARTWORKS.find((w) => w.id === id);

/* ---------- Persistance (localStorage, tolérant aux erreurs) ---------- */
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

const state = {
  favs: store.get("favs", []),
  cart: store.get("cart", []), // [{ id, variant, qty }]
  views: store.get("views", []),
  follows: store.get("follows", []),
  messages: store.get("messages", [
    { me: false, text: "Bonjour ! Merci pour votre intérêt pour « Rose Protocol ». Une question sur l'œuvre ?" },
  ]),
  gallery: { type: [], color: [], size: [], artist: "", max: 2000, view: "grid", q: "" },
};

function save() {
  store.set("favs", state.favs);
  store.set("cart", state.cart);
  store.set("views", state.views);
  store.set("follows", state.follows);
  store.set("messages", state.messages);
  updateCounts();
}

function updateCounts() {
  const n = { fav: state.favs.length, cart: state.cart.reduce((s, l) => s + l.qty, 0) };
  $$("[data-count]").forEach((el) => {
    el.textContent = n[el.dataset.count] || "";
    el.dataset.n = n[el.dataset.count];
  });
}

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- Stock ---------- */
const totalStock = (w) => w.variants.reduce((s, v) => s + v.stock, 0);
function badgesFor(w) {
  const b = [];
  if (w.sold) b.push('<span class="badge badge-sold">Vendu</span>');
  else if (totalStock(w) === 0) b.push('<span class="badge badge-out">Rupture de stock</span>');
  else b.push('<span class="badge badge-stock">En stock</span>');
  if (w.variants.length > 1) b.push('<span class="badge badge-variants">Plusieurs versions</span>');
  return b.join("");
}

/* ---------- Composants ---------- */
const heartIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-9.5-9.3C1.2 8.4 3.3 5 6.8 5c2 0 3.4 1.1 4.2 2.4h2C13.8 6.1 15.2 5 17.2 5c3.5 0 5.6 3.4 4.3 6.7C19.5 16.4 12 21 12 21Z"/></svg>';

function card(w, extra = "") {
  const a = artistOf(w);
  const fav = state.favs.includes(w.id);
  return `
    <article class="card ${w.sold ? "sold" : ""}" data-tilt>
      <a class="card-media" href="#/oeuvre/${w.id}" aria-label="${esc(w.title)}">
        <div class="art" style="background:${w.art}"></div>
      </a>
      <div class="badges">${badgesFor(w)}</div>
      <button class="fav-btn ${fav ? "on" : ""}" data-fav="${w.id}" aria-pressed="${fav}" aria-label="Ajouter aux favoris">${heartIcon}</button>
      <div class="card-body">
        <h3 class="card-title"><a href="#/oeuvre/${w.id}">${esc(w.title)}</a></h3>
        <div class="card-artist">${esc(a.name)} · ${esc(w.type)}</div>
        ${extra}
        <div class="card-row">
          <span class="price">${euro(w.price)}</span>
        </div>
      </div>
    </article>`;
}

/* ---------- Vues ---------- */
function viewHome() {
  const pick = ARTWORKS.slice(0, 8);
  const words = ["Peinture", "Sculpture", "Photographie", "Textile", "Pièces uniques", "Artistes indépendants"];
  const marquee = [...words, ...words].map((w) => `<span>${w} ✦</span>`).join("");
  return `
    <section class="hero">
      <div>
        <span class="eyebrow">Marketplace d'art · Nouvelle génération</span>
        <h1><span class="chrome-text">L'art</span><span class="neon">atypique.</span></h1>
        <p>ATYPIIK connecte les collectionneurs en quête de pièces uniques ou déclinées avec des artistes indépendants. Un espace d'exposition digital, sécurisé, pensé pour la découverte.</p>
        <div class="hero-cta">
          <a href="#/galerie" class="btn btn-pink">Explorer la galerie</a>
          <a href="#/profil" class="btn btn-chrome">Devenir artiste</a>
        </div>
        <div class="hero-stats">
          <div><strong class="chrome-text">${ARTWORKS.length * 104}+</strong><span>œuvres</span></div>
          <div><strong class="chrome-text">${ARTISTS.length * 61}</strong><span>artistes</span></div>
          <div><strong class="neon">90 %</strong><span>reversés à l'artiste</span></div>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="ring"></div>
        <div class="ring r2"></div>
        <div class="orb"></div>
        <div class="hero-tag t1 chrome-frame"><b>Nouveau</b>Rose Protocol — Nova Lune</div>
        <div class="hero-tag t2 chrome-frame"><b>Live</b>12 artistes connectés</div>
      </div>
    </section>

    <div class="marquee" aria-hidden="true"><div class="marquee-track">${marquee}</div></div>

    <section>
      <div class="page-head">
        <span class="eyebrow">Section</span>
        <h2 class="section-title chrome-text">Art</h2>
        <p>Une sélection d'œuvres originales, exposées sans filtre.</p>
      </div>
      <div class="grid">${pick.map((w) => card(w)).join("")}</div>
      <div style="text-align:center;margin-top:32px"><a href="#/galerie" class="btn btn-ghost">Voir toute la galerie →</a></div>
    </section>

    <section class="feature-grid">
      <div class="feature chrome-frame"><span class="num">01</span><h3>Exposition sécurisée</h3><p>Profils d'artistes validés, dossier de presse et vidéos coulisses.</p></div>
      <div class="feature chrome-frame"><span class="num">02</span><h3>Paiement transparent</h3><p>Stripe Connect : 90 % pour l'artiste, 10 % de commission plateforme.</p></div>
      <div class="feature chrome-frame"><span class="num">03</span><h3>Lien direct</h3><p>Messagerie privée avec les artistes et notifications de nouveautés.</p></div>
    </section>`;
}

function filteredWorks() {
  const g = state.gallery;
  const q = g.q.trim().toLowerCase();
  return ARTWORKS.filter(
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
  const types = [...new Set(ARTWORKS.map((w) => w.type))];
  const chip = (group, v, label = v) =>
    `<button class="chip ${g[group].includes(v) ? "on" : ""}" data-filter="${group}" data-value="${v}">${label}</button>`;
  return `
    <div class="page-head">
      <span class="eyebrow">Catalogue</span>
      <h1 class="section-title chrome-text">Galerie</h1>
    </div>
    <div class="gallery-layout">
      <aside class="filters chrome-frame" aria-label="Filtres">
        <h3>Type d'art</h3>
        <div class="chips">${types.map((t) => chip("type", t)).join("")}</div>
        <h3>Couleur</h3>
        <div class="chips">${Object.entries(COLORS)
          .map(([k, c]) => `<button class="swatch ${g.color.includes(k) ? "on" : ""}" style="background:${c}" data-filter="color" data-value="${k}" aria-label="${k}" title="${k}"></button>`)
          .join("")}</div>
        <h3>Taille</h3>
        <div class="chips">${chip("size", "S", "Petit")}${chip("size", "M", "Moyen")}${chip("size", "L", "Grand")}</div>
        <h3>Prix max</h3>
        <input class="range" type="range" min="100" max="2000" step="50" value="${g.max}" id="price-max" />
        <div class="range-labels"><span>100 €</span><span id="price-val">${euro(g.max)}</span></div>
        <h3>Artiste</h3>
        <select class="select" id="artist-filter">
          <option value="">Tous les artistes</option>
          ${ARTISTS.map((a) => `<option value="${a.id}" ${g.artist === a.id ? "selected" : ""}>${esc(a.name)}</option>`).join("")}
        </select>
        <div style="margin-top:18px"><button class="link-btn" id="reset-filters">Réinitialiser les filtres</button></div>
      </aside>
      <section>
        <div class="toolbar">
          <span id="result-count"></span>
          <div class="toggle" role="group" aria-label="Affichage">
            <button data-view="grid" class="${g.view === "grid" ? "on" : ""}">Grille</button>
            <button data-view="list" class="${g.view === "list" ? "on" : ""}">Liste</button>
          </div>
        </div>
        <div id="results"></div>
      </section>
    </div>`;
}

function renderResults() {
  const works = filteredWorks();
  const box = $("#results");
  if (!box) return;
  $("#result-count").textContent = `${works.length} œuvre${works.length > 1 ? "s" : ""}`;
  box.innerHTML = works.length
    ? `<div class="grid ${state.gallery.view === "list" ? "list" : ""}">${works.map((w) => card(w)).join("")}</div>`
    : `<div class="empty chrome-frame"><h3>Aucune œuvre ne correspond</h3><p>Essayez d'élargir vos filtres.</p></div>`;
  bindCards(box);
}

function viewProduct(id) {
  const w = byId(id);
  if (!w) return viewNotFound();
  const a = artistOf(w);
  if (!state.views.includes(w.id)) state.views = [w.id, ...state.views].slice(0, 20);
  save();
  const firstAvail = Math.max(0, w.variants.findIndex((v) => v.stock > 0));
  const fromGallery = sessionStorage.getItem("atypiik:from") === "galerie";
  return `
    <a class="back-link" href="${fromGallery ? "#/galerie" : "#/"}" data-back>← Retour ${fromGallery ? "à la galerie" : ""}</a>
    <div class="product">
      <div>
        <div class="zoom chrome-frame" id="zoom"><div class="art" style="background:${w.art}"></div></div>
        <div class="thumbs">
          ${[0, 1, 2]
            .map((i) => `<button class="${i === 0 ? "on" : ""}" data-thumb="${i}" aria-label="Vue ${i + 1}"><div class="art" style="background:${w.art};filter:hue-rotate(${i * 25}deg) brightness(${1 - i * 0.08})"></div></button>`)
            .join("")}
        </div>
      </div>
      <div class="product-info">
        <div class="badges" style="position:static;flex-direction:row;margin-bottom:14px">${badgesFor(w)}</div>
        <h1 class="chrome-text">${esc(w.title)}</h1>
        <div class="product-price">${euro(w.price)} <small>TTC</small></div>
        <dl class="specs chrome-frame">
          <dt>Artiste</dt><dd>${esc(a.name)}</dd>
          <dt>Type</dt><dd>${esc(w.type)}</dd>
          <dt>Technique</dt><dd>${esc(w.technique)}</dd>
          <dt>Dimensions</dt><dd>${esc(w.dims)}</dd>
        </dl>
        <span class="variant-label">Déclinaisons</span>
        <div class="chips" id="variants">
          ${w.variants
            .map((v, i) => `<button class="chip ${i === firstAvail ? "on" : ""} ${v.stock ? "" : "na"}" data-variant="${i}">${esc(v.label)}<span class="dot"></span></button>`)
            .join("")}
        </div>
        <div class="availability" id="availability"></div>
        <div class="actions">
          <button class="btn btn-pink" id="add-cart">Ajouter au panier</button>
          <button class="btn btn-chrome" id="buy-now">Acheter maintenant</button>
          <button class="btn btn-ghost btn-icon fav-btn-inline ${state.favs.includes(w.id) ? "on" : ""}" data-fav="${w.id}" aria-label="Favori">${heartIcon}</button>
        </div>
        <div class="artist-mini chrome-frame">
          <div class="avatar"></div>
          <div style="flex:1">
            <strong>${esc(a.name)}</strong>
            <div class="card-artist">${esc(a.city)} — ${esc(a.bio)}</div>
          </div>
          <a class="btn btn-ghost" href="#/contact">Écrire</a>
        </div>
      </div>
    </div>`;
}

function bindProduct(id) {
  const w = byId(id);
  if (!w) return;
  let current = Math.max(0, w.variants.findIndex((v) => v.stock > 0));
  const avail = () => {
    const v = w.variants[current];
    const ok = !w.sold && v.stock > 0;
    $("#availability").innerHTML = w.sold
      ? '<span class="neon">Cette œuvre a été vendue.</span>'
      : ok
        ? `<span style="color:var(--green-neon)">● Disponible</span> — ${v.stock} exemplaire${v.stock > 1 ? "s" : ""}`
        : '<span class="neon">● Rupture de stock pour cette déclinaison</span>';
    $("#add-cart").disabled = !ok;
    $("#buy-now").disabled = !ok;
  };
  avail();
  $$("[data-variant]").forEach((b) =>
    b.addEventListener("click", () => {
      current = +b.dataset.variant;
      $$("[data-variant]").forEach((x) => x.classList.toggle("on", x === b));
      avail();
    }),
  );
  $$("[data-thumb]").forEach((b) =>
    b.addEventListener("click", () => {
      $$("[data-thumb]").forEach((x) => x.classList.toggle("on", x === b));
      $("#zoom .art").style.filter = b.firstElementChild.style.filter;
    }),
  );
  const zoom = $("#zoom");
  zoom.addEventListener("mousemove", (e) => {
    const r = zoom.getBoundingClientRect();
    $(".art", zoom).style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  });
  const add = () => {
    const line = state.cart.find((l) => l.id === w.id && l.variant === current);
    const max = w.variants[current].stock;
    if (line) line.qty = Math.min(max, line.qty + 1);
    else state.cart.push({ id: w.id, variant: current, qty: 1 });
    save();
  };
  $("#add-cart").addEventListener("click", () => {
    add();
    toast("Ajouté au panier ✦");
  });
  $("#buy-now").addEventListener("click", () => {
    add();
    location.hash = "#/panier";
  });
}

function viewSelection() {
  // Recommandation : type/artistes des œuvres vues, favorites et artistes suivis.
  const seen = [...state.views, ...state.favs].map(byId).filter(Boolean);
  const types = new Set(seen.map((w) => w.type));
  const artists = new Set([...seen.map((w) => w.artist), ...state.follows]);
  const scored = ARTWORKS.filter((w) => !w.sold)
    .map((w) => {
      let score = 0;
      let reason = "Tendance sur ATYPIIK";
      if (types.has(w.type)) (score += 2), (reason = `Parce que vous aimez : ${w.type}`);
      if (artists.has(w.artist)) (score += 3), (reason = `Artiste que vous suivez ou consultez`);
      if (state.favs.includes(w.id)) score -= 1;
      return { w, score, reason };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
  return `
    <div class="page-head">
      <span class="eyebrow">Pour vous</span>
      <h1 class="section-title chrome-text">Notre sélection</h1>
      <p>${seen.length ? "Calculée à partir de vos vues, favoris et abonnements." : "Parcourez la galerie et ajoutez des favoris pour affiner vos recommandations."}</p>
    </div>
    <div class="grid">${scored
      .map(({ w, reason }) =>
        card(
          w,
          `<div class="reason">✦ ${esc(reason)}</div>
           <div class="card-row" style="gap:6px"><a class="btn btn-ghost" style="padding:.5em .9em;font-size:.62rem" href="#/oeuvre/${w.id}">Voir l'œuvre</a><a class="btn btn-ghost" style="padding:.5em .9em;font-size:.62rem" href="#/contact">Profil artiste</a></div>`,
        ),
      )
      .join("")}</div>`;
}

function viewFavs() {
  const works = state.favs.map(byId).filter(Boolean);
  return `
    <div class="page-head">
      <span class="eyebrow">Collection</span>
      <h1 class="section-title chrome-text">Favoris</h1>
    </div>
    ${
      works.length
        ? `<div class="grid">${works.map((w) => card(w)).join("")}</div>`
        : `<div class="empty chrome-frame"><h3>Aucun favori pour l'instant</h3><p>Touchez le cœur sur une œuvre pour la retrouver ici.</p><a class="btn btn-pink" href="#/galerie">Explorer</a></div>`
    }`;
}

function viewCart() {
  const lines = state.cart.map((l) => ({ ...l, w: byId(l.id) })).filter((l) => l.w);
  if (!lines.length)
    return `
      <div class="page-head"><span class="eyebrow">Commande</span><h1 class="section-title chrome-text">Panier</h1></div>
      <div class="empty chrome-frame"><h3>Votre panier est vide</h3><p>Les articles sont conservés même après rafraîchissement.</p><a class="btn btn-pink" href="#/galerie">Découvrir des œuvres</a></div>`;
  const total = lines.reduce((s, l) => s + l.w.price * l.qty, 0);
  return `
    <div class="page-head"><span class="eyebrow">Commande</span><h1 class="section-title chrome-text">Panier</h1></div>
    <div class="cart">
      <div>
        ${lines
          .map((l, i) => {
            const v = l.w.variants[l.variant];
            const ko = l.w.sold || v.stock === 0;
            return `
            <div class="cart-line chrome-frame">
              <div class="art" style="background:${l.w.art}"></div>
              <div>
                <strong>${esc(l.w.title)}</strong>
                <div class="card-artist">${esc(v.label)} · ${euro(l.w.price)}</div>
                ${ko ? '<div class="alert">⚠ Cet article n\'est plus disponible.</div>' : ""}
                <button class="link-btn" data-remove="${i}">Supprimer</button>
              </div>
              <div class="qty">
                <button data-qty="${i}" data-d="-1" aria-label="Moins">−</button>
                <span>${l.qty}</span>
                <button data-qty="${i}" data-d="1" aria-label="Plus" ${l.qty >= v.stock ? "disabled" : ""}>+</button>
              </div>
            </div>`;
          })
          .join("")}
      </div>
      <aside class="summary chrome-frame">
        <h3 class="display" style="font-size:1.8rem">Récapitulatif</h3>
        <div class="summary-row"><span>Sous-total</span><span>${euro(total)}</span></div>
        <div class="summary-row"><span>Dont artistes (90 %)</span><span>${euro(total * 0.9)}</span></div>
        <div class="summary-row"><span>Dont commission ATYPIIK (10 %)</span><span>${euro(total * 0.1)}</span></div>
        <div class="summary-row"><span>Livraison</span><span>Calculée à l'étape suivante</span></div>
        <div class="summary-row total"><span>Total TTC</span><span class="neon">${euro(total)}</span></div>
        <button class="btn btn-pink" style="width:100%;margin-top:18px" id="checkout">Passer au paiement</button>
        <p class="card-artist" style="text-align:center;margin:12px 0 0">🔒 Paiement sécurisé via Stripe Connect</p>
      </aside>
    </div>`;
}

function viewProfile() {
  return `
    <div class="page-head"><span class="eyebrow">Espace membre</span><h1 class="section-title chrome-text">Profil</h1></div>
    <div class="two-col">
      <form class="panel chrome-frame" onsubmit="event.preventDefault();toast('Connexion simulée ✦')">
        <h3 class="display" style="font-size:2rem">Connexion</h3>
        <div class="field"><label for="em">E-mail</label><input id="em" type="email" required placeholder="vous@exemple.fr" /></div>
        <div class="field"><label for="pw">Mot de passe</label><input id="pw" type="password" required /></div>
        <button class="btn btn-pink">Se connecter</button>
      </form>
      <form class="panel chrome-frame" onsubmit="event.preventDefault();toast('Demande envoyée : validation par un administrateur ✦')">
        <h3 class="display" style="font-size:2rem">Créer un compte</h3>
        <div class="field"><label for="role">Je suis</label><select id="role"><option>Acheteur</option><option>Artiste (vendeur)</option></select></div>
        <div class="field"><label for="nm">Nom</label><input id="nm" required /></div>
        <div class="field"><label for="em2">E-mail</label><input id="em2" type="email" required /></div>
        <button class="btn btn-chrome">Créer mon compte</button>
        <p class="card-artist">Les comptes artistes sont validés par l'équipe ATYPIIK.</p>
      </form>
    </div>`;
}

function viewContact() {
  return `
    <div class="page-head"><span class="eyebrow">Messagerie</span><h1 class="section-title chrome-text">Contact</h1>
    <p>Discutez directement avec les artistes depuis une fiche œuvre ou un profil.</p></div>
    <div class="panel chrome-frame" style="max-width:720px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px"><div class="avatar" style="width:40px;height:40px"></div><strong>Nova Lune</strong><span class="card-artist">· en ligne</span></div>
      <div class="chat" id="chat">${state.messages.map((m) => `<div class="bubble ${m.me ? "me" : ""}">${esc(m.text)}</div>`).join("")}</div>
      <form id="chat-form" style="display:flex;gap:10px">
        <div class="field" style="flex:1;margin:0"><input id="chat-input" placeholder="Votre message…" aria-label="Votre message" autocomplete="off" /></div>
        <button class="btn btn-pink">Envoyer</button>
      </form>
    </div>`;
}

const LEGAL = {
  mentions: ["Mentions légales", "Éditeur du site, hébergeur et contact. À compléter avec les informations légales de la société."],
  rgpd: ["Confidentialité (RGPD)", "Registre des traitements, droits d'accès, de rectification et de suppression, gestion des cookies tiers."],
  cgu: ["CGU / CGV", "Conditions générales d'utilisation et de vente de la marketplace, commission de 10 % par transaction."],
};
function viewLegal(key) {
  const [t, p] = LEGAL[key] || LEGAL.mentions;
  return `<div class="page-head"><span class="eyebrow">Informations</span><h1 class="section-title chrome-text">${t}</h1><p>${p}</p></div>`;
}

function viewNotFound() {
  return `<div class="empty chrome-frame"><h1 class="section-title neon">404</h1><p>Cette page s'est perdue dans le chrome.</p><a class="btn btn-pink" href="#/">Accueil</a></div>`;
}

/* ---------- Interactions ---------- */
function bindCards(root = app) {
  $$("[data-fav]", root).forEach((b) =>
    b.addEventListener("click", (e) => {
      e.preventDefault();
      const id = b.dataset.fav;
      const on = !state.favs.includes(id);
      state.favs = on ? [...state.favs, id] : state.favs.filter((x) => x !== id);
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on);
      save();
      toast(on ? "Ajouté aux favoris ♥" : "Retiré des favoris");
    }),
  );
  // Effet d'inclinaison 3D au survol
  if (matchMedia("(hover: hover)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $$("[data-tilt]", root).forEach((c) => {
      c.addEventListener("mousemove", (e) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });
      c.addEventListener("mouseleave", () => (c.style.transform = ""));
    });
  }
}

function bindGallery() {
  const g = state.gallery;
  $$("[data-filter]").forEach((b) =>
    b.addEventListener("click", () => {
      const list = g[b.dataset.filter];
      const v = b.dataset.value;
      const i = list.indexOf(v);
      i >= 0 ? list.splice(i, 1) : list.push(v);
      b.classList.toggle("on", i < 0);
      renderResults();
    }),
  );
  $("#price-max").addEventListener("input", (e) => {
    g.max = +e.target.value;
    $("#price-val").textContent = euro(g.max);
    renderResults();
  });
  $("#artist-filter").addEventListener("change", (e) => {
    g.artist = e.target.value;
    renderResults();
  });
  $("#reset-filters").addEventListener("click", () => {
    Object.assign(g, { type: [], color: [], size: [], artist: "", max: 2000, q: "" });
    $("#search").value = "";
    render();
  });
  $$("[data-view]").forEach((b) =>
    b.addEventListener("click", () => {
      g.view = b.dataset.view;
      $$("[data-view]").forEach((x) => x.classList.toggle("on", x === b));
      renderResults();
    }),
  );
  renderResults();
}

function bindCart() {
  $$("[data-qty]").forEach((b) =>
    b.addEventListener("click", () => {
      const l = state.cart[+b.dataset.qty];
      const max = byId(l.id).variants[l.variant].stock;
      l.qty = Math.min(max, l.qty + +b.dataset.d);
      if (l.qty <= 0) state.cart.splice(+b.dataset.qty, 1);
      save();
      render();
    }),
  );
  $$("[data-remove]").forEach((b) =>
    b.addEventListener("click", () => {
      state.cart.splice(+b.dataset.remove, 1);
      save();
      render();
    }),
  );
  const c = $("#checkout");
  if (c) c.addEventListener("click", () => toast("Redirection vers Stripe… (démo)"));
}

function bindChat() {
  const chat = $("#chat");
  chat.scrollTop = chat.scrollHeight;
  $("#chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#chat-input");
    const text = input.value.trim();
    if (!text) return;
    state.messages.push({ me: true, text });
    input.value = "";
    save();
    chat.insertAdjacentHTML("beforeend", `<div class="bubble me">${esc(text)}</div>`);
    chat.scrollTop = chat.scrollHeight;
    setTimeout(() => {
      const reply = "Merci pour votre message ! Je vous réponds très vite ✦";
      state.messages.push({ me: false, text: reply });
      save();
      chat.insertAdjacentHTML("beforeend", `<div class="bubble">${reply}</div>`);
      chat.scrollTop = chat.scrollHeight;
    }, 900);
  });
}

/* ---------- Routeur ---------- */
let currentRoute = null;

function render() {
  const [route = "", param] = location.hash.replace(/^#\/?/, "").split("/");

  // Mémorise la position de défilement de la galerie avant de la quitter.
  if (currentRoute === "galerie" && route !== "galerie") {
    sessionStorage.setItem("atypiik:galleryScroll", String(window.scrollY));
  }
  if (route === "oeuvre") sessionStorage.setItem("atypiik:from", currentRoute === "galerie" ? "galerie" : currentRoute || "");
  const restoring = route === "galerie" && currentRoute === "oeuvre";
  currentRoute = route;

  const views = {
    "": [viewHome, () => bindCards()],
    galerie: [viewGallery, bindGallery],
    oeuvre: [() => viewProduct(param), () => (bindCards(), bindProduct(param))],
    selection: [viewSelection, () => bindCards()],
    favoris: [viewFavs, () => bindCards()],
    panier: [viewCart, bindCart],
    profil: [viewProfile, () => {}],
    contact: [viewContact, bindChat],
    legal: [() => viewLegal(param), () => {}],
  };
  const [view, bind] = views[route] || [viewNotFound, () => {}];

  app.innerHTML = `<div class="view">${view()}</div>`;
  bind();

  $$("[data-route]").forEach((a) => a.classList.toggle("active", a.dataset.route === route));
  $("#drawer").classList.remove("open");

  if (restoring) {
    const y = +sessionStorage.getItem("atypiik:galleryScroll") || 0;
    requestAnimationFrame(() => window.scrollTo(0, y));
  } else {
    window.scrollTo(0, 0);
  }
}

/* ---------- Démarrage ---------- */
$("#year").textContent = new Date().getFullYear();
$("#burger").addEventListener("click", () => $("#drawer").classList.add("open"));
$("#drawer-close").addEventListener("click", () => $("#drawer").classList.remove("open"));
$("#search").addEventListener("input", (e) => {
  state.gallery.q = e.target.value;
  if (currentRoute !== "galerie") location.hash = "#/galerie";
  else renderResults();
});
window.addEventListener("hashchange", render);
updateCounts();
render();
