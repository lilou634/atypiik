/* =========================================================
   ATYPIIK — espaces du projet INSEEC
   Offre et abonnement simulé, CRM, dossier stratégique,
   plan de communication. Chargé avant app.js, qui enregistre
   ces vues et ces actions.
   ========================================================= */

const ht = (n) => euro(Math.round(n * 100) / 100) + " HT";
const ttc = (n) => euro(Math.round(n * (1 + VAT) * 100) / 100) + " TTC";
const src = (...keys) =>
  keys
    .filter((k) => SOURCES[k])
    .map((k) => `<a class="src" href="${SOURCES[k][1]}" target="_blank" rel="noopener" title="${esc(SOURCES[k][0])}">source</a>`)
    .join(" ");
const stageLabel = (id) => (CRM_STAGES.find((s) => s[0] === id) || [id, id])[1];
const crmById = (id) => state.crm.find((c) => c.id === id);

/* ---------- Accueil du projet : les quatre espaces ---------- */
function viewProject() {
  const spaces = [
    ["#/offre", "1. Vente", "Côté client", "La promesse, les offres et les prix, l'achat d'une œuvre ou d'un abonnement en démo jusqu'à la confirmation."],
    ["#/crm", "2. CRM", "Côté entreprise", "22 contacts fictifs, les fiches, le pipeline à faire avancer et le tableau de bord."],
    ["#/strategie", "3. Stratégie", "Pourquoi ce produit", "Le problème, les personas, le marché sourcé, les concurrents, le prix et le modèle économique."],
    ["#/communication", "4. Communication", "Comment le vendre", "La plateforme de marque, 9 posts prêts à publier, le calendrier, les partenariats et les indicateurs."],
  ];
  return `
    <div class="page-head"><span class="label muted">Projet étudiant INSEEC · Lilou Capanni</span><h1>ATYPIIK</h1><p class="lead">${esc(PROMISE)}</p></div>
    <div class="spaces">${spaces
      .map(([h, t, s, d]) => `<a class="space" href="${h}"><span class="label muted">${s}</span><h2>${t}</h2><p>${d}</p><span class="text-link">Ouvrir →</span></a>`)
      .join("")}</div>
    <p class="hint">Site de démonstration : aucun paiement réel, aucun compte réel, toutes les personnes du CRM sont fictives.</p>`;
}

/* ---------- 1. Offre ---------- */
function viewOffer() {
  const plan = (p) => `
    <article class="plan${p.id === "pro" ? " plan-pro" : ""}">
      <span class="label muted">${esc(p.tagline)}</span>
      <h2>${esc(p.name)}</h2>
      <p class="plan-price"><b>${p.price ? ht(p.price) : "0 €"}</b> / mois${p.price ? `<span class="muted"> soit ${ttc(p.price)}</span>` : "<span class=\"muted\"> sans abonnement</span>"}</p>
      <p class="plan-com">+ <b>${p.commission} %</b> de commission sur chaque vente (frais de paiement inclus)<br /><span class="muted">L'artiste garde ${100 - p.commission} % du prix.</span></p>
      <h3 class="label">Inclus</h3><ul class="incl">${p.included.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      <h3 class="label">Non inclus</h3><ul class="excl">${p.excluded.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      <a class="btn btn-block${p.id === "pro" ? "" : " btn-outline"}" href="#/abonnement/${p.id}">Choisir ${esc(p.name)}</a>
    </article>`;
  return `
    <div class="page-head"><span class="label muted">L'offre ATYPIIK</span><h1>Ce que l'on vend</h1><p class="lead">${esc(PROMISE)}</p></div>
    <section class="offer-buyer panel">
      <div><span class="label muted">Pour les acheteurs</span><h2>Acheter une œuvre</h2>
        <p>Inscription gratuite, aucun frais de service. Vous payez le prix de l'œuvre fixé par l'artiste, <b>TTC</b>, et la livraison, calculée selon la taille du colis.</p>
        <ul class="incl"><li>Pièces uniques et petites séries, au prix fixé par chaque artiste</li><li>Paiement sécurisé, argent versé à l'artiste après la livraison</li><li>Retour possible sous 14 jours</li><li>Commandes sur mesure auprès des artistes</li></ul>
        <ul class="excl"><li>Frais de livraison, à la charge de l'acheteur</li></ul>
      </div>
      <div class="offer-cta"><a class="btn" href="#/galerie">Voir la galerie</a><span class="hint">Parcours de démo : choisissez une œuvre, ajoutez-la au panier puis payez avec une carte fictive.</span></div>
    </section>
    <div class="section-head"><h2>Pour les artistes : deux formules</h2></div>
    <div class="plans">${PLANS.map(plan).join("")}</div>
    <p class="hint">Prix en euros. TVA de 20 % appliquée aux abonnements. La commission est prélevée sur le prix de vente, l'artiste reçoit le reste sous 7 jours après la livraison.</p>`;
}

/* ---------- Abonnement simulé ---------- */
function viewSubscribe(planId) {
  const p = PLANS.find((x) => x.id === planId) || PLANS[1];
  const s = state.sub || {};
  const step = s.plan === p.id ? s.step || 1 : 1;
  const steps = ["Votre atelier", "Paiement", "Confirmation"]
    .map((x, i) => `<span class="${i + 1 === step ? "on" : i + 1 < step ? "done" : ""}">${i + 1}. ${x}</span>`)
    .join("");
  const recap = `<aside class="summary"><h3>Récapitulatif</h3>
      <p><b>${esc(p.name)}</b></p>
      <div class="summary-row"><span>Abonnement mensuel</span><span>${p.price ? ht(p.price) : "0 €"}</span></div>
      ${p.price ? `<div class="summary-row"><span>TVA 20 %</span><span>${euro(Math.round(p.price * VAT * 100) / 100)}</span></div><div class="summary-row total"><span>Total par mois</span><span>${ttc(p.price)}</span></div>` : ""}
      <div class="summary-row"><span>Commission par vente</span><span>${p.commission} %</span></div>
      <p class="hint">Sans engagement, résiliable à tout moment.</p></aside>`;
  const form =
    step === 1
      ? `<form class="panel" id="sub-form">
          <h2>Votre atelier</h2>
          <div class="field"><label for="sub-name">Nom ou nom d'artiste</label><input id="sub-name" required value="${esc(s.name || "")}" /></div>
          <div class="field"><label for="sub-email">E-mail (fictif pour la démo)</label><input id="sub-email" type="email" required value="${esc(s.email || "")}" placeholder="artiste@example.com" /></div>
          <div class="field-row">
            <div class="field"><label for="sub-city">Ville</label><input id="sub-city" required value="${esc(s.city || "")}" /></div>
            <div class="field"><label for="sub-disc">Discipline</label><input id="sub-disc" required value="${esc(s.disc || "")}" placeholder="Céramique, peinture…" /></div>
          </div>
          <div class="field"><label for="sub-src">Comment nous avez-vous connus ?</label><select id="sub-src">${CRM_SOURCES.map((x) => `<option${x === (s.source || "Instagram") ? " selected" : ""}>${x}</option>`).join("")}</select></div>
          <button class="btn btn-block">${p.price ? "Continuer vers le paiement" : "Ouvrir mon atelier"}</button>
        </form>`
      : `<form class="panel" id="subpay-form">
          <h2>Paiement</h2>
          <div class="field"><label for="sp-num">Numéro de carte</label><input id="sp-num" required inputmode="numeric" placeholder="4242 4242 4242 4242" /></div>
          <div class="field-row">
            <div class="field"><label for="sp-exp">Expiration</label><input id="sp-exp" required placeholder="MM/AA" /></div>
            <div class="field"><label for="sp-cvc">CVC</label><input id="sp-cvc" required inputmode="numeric" placeholder="123" /></div>
          </div>
          <p class="hint">Démo : aucun paiement n'est effectué, n'entrez pas une vraie carte.</p>
          <button class="btn btn-block">Payer ${ttc(p.price)}</button>
        </form>`;
  return `<div class="page-head"><h1>${esc(p.name)}</h1><p>${esc(p.tagline)}</p></div><div class="checkout-steps">${steps}</div><div class="cart">${form}${recap}</div>`;
}
function bindSubscribe(planId) {
  const p = PLANS.find((x) => x.id === planId) || PLANS[1];
  const f = $("#sub-form");
  if (f)
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      state.sub = { plan: p.id, step: 2, name: $("#sub-name").value.trim(), email: $("#sub-email").value.trim(), city: $("#sub-city").value.trim(), disc: $("#sub-disc").value.trim(), source: $("#sub-src").value };
      if (!p.price) return confirmSub(p);
      render();
    });
  const pf = $("#subpay-form");
  if (pf)
    pf.addEventListener("submit", (e) => {
      e.preventDefault();
      confirmSub(p);
    });
}
function confirmSub(p) {
  const s = state.sub;
  const id = "ABO-2026-" + String(100 + Math.floor(Math.random() * 900));
  state.crm.unshift({
    id: "c" + Date.now(), name: s.name, type: "artiste", company: s.disc, city: s.city, source: s.source, stage: "gagne", plan: p.id,
    value: Math.round(p.price * 12 * 100) / 100, email: s.email, phone: "Non renseigné", fresh: true,
    history: [[today(), `Abonnement ${p.name} souscrit sur le site (${id})`]], next: [today(), "Appel de bienvenue et aide à la première mise en ligne"],
  });
  state.subDone = { id, plan: p.id, name: s.name };
  state.sub = null;
  save();
  nav("#/abonnement-ok/" + id);
}
function viewSubDone(id) {
  const d = state.subDone;
  if (!d || d.id !== id) return viewNotFound();
  const p = PLANS.find((x) => x.id === d.plan);
  return `
    <div class="empty" style="border-style:solid;border-color:var(--ink)">
      <span class="label muted">Merci ${esc(d.name)}</span>
      <h3 style="font-size:3rem;margin-top:12px">Atelier ouvert</h3>
      <p>Abonnement <b>${esc(p.name)}</b> confirmé, référence <b>${id}</b>${p.price ? ` · ${ttc(p.price)} par mois` : ""}.<br />Vous apparaissez maintenant dans le CRM d'ATYPIIK, à l'étape « Gagné ».</p>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><a class="btn" href="#/crm/contacts">Voir dans le CRM</a><a class="btn btn-outline" href="#/offre">Retour aux offres</a></div>
    </div>`;
}

/* Une commande passée dans la boutique arrive dans le CRM (bonus de la consigne). */
function crmFromOrder(o) {
  let c = state.crm.find((x) => x.type === "acheteur" && x.name.toLowerCase() === o.buyer.toLowerCase());
  const line = [o.date, `Commande ${o.id} passée sur le site (${euro(o.total)})`];
  if (c) {
    c.history.push(line);
    c.value = Math.round((c.value + o.total) * 100) / 100;
    c.stage = "gagne";
    c.fresh = true;
  } else {
    state.crm.unshift({
      id: "c" + Date.now(), name: o.buyer, type: "acheteur", company: "", city: o.address.split(" ").slice(-1)[0], source: "Site ATYPIIK", stage: "gagne",
      value: o.total, email: (state.user && state.user.email) || "acheteur@example.com", phone: "Non renseigné", fresh: true,
      history: [line], next: [today(), "Demander un avis après la livraison"],
    });
  }
}

/* ---------- 2. CRM ---------- */
function crmStats() {
  const won = state.crm.filter((c) => c.stage === "gagne");
  const lost = state.crm.filter((c) => c.stage === "perdu");
  const sales = won.filter((c) => c.type === "acheteur").reduce((s, c) => s + c.value, 0);
  const subs = won.filter((c) => c.type === "artiste").reduce((s, c) => s + c.value, 0);
  const open = state.crm.filter((c) => !["gagne", "perdu"].includes(c.stage));
  return { won, lost, sales, subs, ca: subs + sales * COMMISSION, open, pipe: open.reduce((s, c) => s + c.value, 0), rate: state.crm.length ? won.length / state.crm.length : 0 };
}
function viewCRM(param) {
  if (param && !["tableau", "contacts", "pipeline"].includes(param)) return viewContact(param);
  const tab = ["contacts", "pipeline"].includes(param) ? param : "tableau";
  const st = crmStats();
  const head = `<div class="page-head"><span class="label muted">Outil interne · accès démo sans identifiant</span><h1>CRM ATYPIIK</h1><p>Suivi des artistes et des acheteurs, de la prise de contact à la vente. Toutes les données sont fictives et restent dans votre navigateur.</p></div>
    <nav class="tabs crm-tabs">${[["tableau", "Tableau de bord"], ["contacts", "Contacts"], ["pipeline", "Pipeline"]].map(([id, l]) => `<a class="${id === tab ? "on" : ""}" href="#/crm/${id}">${l}</a>`).join("")}</nav>`;
  if (tab === "contacts") return head + crmContacts();
  if (tab === "pipeline") return head + crmPipeline();
  const byStage = CRM_STAGES.map(([id, l]) => [l, state.crm.filter((c) => c.stage === id).length]);
  const bySource = CRM_SOURCES.map((s) => [s, state.crm.filter((c) => c.source === s).length, state.crm.filter((c) => c.source === s && c.stage === "gagne").length]).filter((x) => x[1]);
  const max = Math.max(...byStage.map((x) => x[1]), 1);
  const maxS = Math.max(...bySource.map((x) => x[1]), 1);
  const todo = state.crm.filter((c) => !["perdu"].includes(c.stage) && c.next).sort((a, b) => a.next[0].localeCompare(b.next[0])).slice(0, 6);
  return `${head}
    <div class="kpis">
      <div><b class="pink">${ht(st.ca)}</b><span>Chiffre d'affaires ATYPIIK</span></div>
      <div><b>${st.won.length}</b><span>Clients (contacts gagnés)</span></div>
      <div><b>${Math.round(st.rate * 100)} %</b><span>Taux de conversion</span></div>
      <div><b>${euro(st.pipe)}</b><span>En négociation</span></div>
    </div>
    <p class="hint">Chiffre d'affaires = abonnements Atelier Pro signés sur 12 mois (${ht(st.subs)}) + 10 % des commandes des acheteurs (${euro(st.sales)} de ventes TTC). Taux de conversion = contacts gagnés ÷ ensemble des contacts (${st.won.length} ÷ ${state.crm.length}).</p>
    <div class="crm-dash">
      <section class="panel"><h2>Contacts par étape</h2>${byStage.map(([l, n]) => `<div class="bar"><span>${l}</span><i style="--w:${(n / max) * 100}%"></i><b>${n}</b></div>`).join("")}</section>
      <section class="panel"><h2>Contacts par source</h2>${bySource.map(([l, n, w]) => `<div class="bar"><span>${l}</span><i style="--w:${(n / maxS) * 100}%"></i><b>${n}<small> · ${w} gagné${w > 1 ? "s" : ""}</small></b></div>`).join("")}</section>
      <section class="panel crm-todo"><h2>Prochaines actions</h2>${todo.map((c) => `<a href="#/crm/${c.id}" class="todo"><span class="mono">${frDate(c.next[0])}</span><span><b>${esc(c.name)}</b> · ${esc(c.next[1])}</span></a>`).join("")}</section>
    </div>`;
}
function crmFilters() {
  return state.crmFilter || (state.crmFilter = { q: "", type: "", stage: "", source: "" });
}
function crmRows() {
  const f = crmFilters();
  const q = f.q.trim().toLowerCase();
  return state.crm.filter(
    (c) =>
      (!q || (c.name + " " + c.city + " " + c.company + " " + c.email).toLowerCase().includes(q)) &&
      (!f.type || c.type === f.type) && (!f.stage || c.stage === f.stage) && (!f.source || c.source === f.source),
  );
}
function crmTable() {
  const rows = crmRows();
  if (!rows.length) return emptyBox("Aucun contact", "Aucun contact ne correspond à ces filtres.");
  return `<div class="table-wrap"><table><thead><tr><th>Contact</th><th>Type</th><th>Ville</th><th>Source</th><th>Étape</th><th class="num">Montant</th><th>Prochaine action</th></tr></thead><tbody>${rows
    .map(
      (c) => `<tr><td><a href="#/crm/${c.id}"><strong>${esc(c.name)}</strong></a>${c.fresh ? ' <span class="tag pink">Nouveau sur le site</span>' : ""}<br /><span class="muted">${esc(c.company || c.email)}</span></td>
      <td>${c.type === "artiste" ? "Artiste" : "Acheteur"}</td><td>${esc(c.city)}</td><td>${esc(c.source)}</td>
      <td><span class="tag ${c.stage === "gagne" ? "green" : c.stage === "perdu" ? "grey" : "pink"}">${stageLabel(c.stage)}</span></td>
      <td class="num">${c.value ? euro(c.value) : "—"}</td><td><span class="mono">${frDate(c.next[0])}</span> ${esc(c.next[1])}</td></tr>`,
    )
    .join("")}</tbody></table></div>`;
}
function crmContacts() {
  const f = crmFilters();
  const opt = (list, cur) => list.map(([v, l]) => `<option value="${v}"${v === cur ? " selected" : ""}>${l}</option>`).join("");
  return `
    <div class="crm-filters">
      <input id="crm-q" type="search" placeholder="Rechercher un nom, une ville…" value="${esc(f.q)}" aria-label="Rechercher un contact" />
      <select data-crm="type" aria-label="Type">${opt([["", "Tous les types"], ["artiste", "Artistes"], ["acheteur", "Acheteurs"]], f.type)}</select>
      <select data-crm="stage" aria-label="Étape">${opt([["", "Toutes les étapes"], ...CRM_STAGES], f.stage)}</select>
      <select data-crm="source" aria-label="Source">${opt([["", "Toutes les sources"], ...CRM_SOURCES.map((s) => [s, s])], f.source)}</select>
      <button class="btn btn-small" data-act="crm-new">+ Nouveau contact</button>
    </div>
    <p class="hint" id="crm-count">${crmRows().length} contact(s) sur ${state.crm.length}</p>
    <div id="crm-table">${crmTable()}</div>`;
}
function bindCRM() {
  const q = $("#crm-q");
  if (q)
    q.addEventListener("input", (e) => {
      crmFilters().q = e.target.value;
      $("#crm-table").innerHTML = crmTable();
      $("#crm-count").textContent = `${crmRows().length} contact(s) sur ${state.crm.length}`;
    });
  $$("[data-crm]").forEach((s) =>
    s.addEventListener("change", (e) => {
      crmFilters()[e.target.dataset.crm] = e.target.value;
      $("#crm-table").innerHTML = crmTable();
      $("#crm-count").textContent = `${crmRows().length} contact(s) sur ${state.crm.length}`;
    }),
  );
  const nf = $("#note-form");
  if (nf)
    nf.addEventListener("submit", (e) => {
      e.preventDefault();
      const c = crmById(nf.dataset.id);
      const t = $("#note-text").value.trim();
      if (!t) return;
      c.history.push([today(), t]);
      save();
      render(true);
      toast("Échange ajouté à l'historique");
    });
  const xf = $("#next-form");
  if (xf)
    xf.addEventListener("submit", (e) => {
      e.preventDefault();
      const c = crmById(xf.dataset.id);
      c.next = [$("#next-date").value || today(), $("#next-text").value.trim() || c.next[1]];
      save();
      render(true);
      toast("Prochaine action mise à jour");
    });
  const cf = $("#contact-form");
  if (cf)
    cf.addEventListener("submit", (e) => {
      e.preventDefault();
      const c = {
        id: "c" + Date.now(), name: $("#nc-name").value.trim(), type: $("#nc-type").value, company: $("#nc-company").value.trim(), city: $("#nc-city").value.trim(),
        source: $("#nc-source").value, stage: "nouveau", plan: "atelier", value: Number($("#nc-value").value) || 0, email: $("#nc-email").value.trim(), phone: $("#nc-phone").value.trim() || "Non renseigné",
        history: [[today(), "Contact créé dans le CRM"]], next: [today(), "Premier contact"],
      };
      state.crm.unshift(c);
      save();
      nav("#/crm/" + c.id);
    });
}
function crmPipeline() {
  return `<p class="hint">Faites avancer un contact avec la flèche, ou ouvrez sa fiche pour choisir l'étape.</p>
    <div class="pipe">${CRM_STAGES.map(([id, l]) => {
      const list = state.crm.filter((c) => c.stage === id);
      return `<section class="pipe-col pipe-${id}"><h3><span>${l}</span><b>${list.length}</b></h3>
        <p class="mono muted">${euro(list.reduce((s, c) => s + c.value, 0))}</p>
        ${list
          .map(
            (c) => `<article class="pipe-card"><a href="#/crm/${c.id}"><b>${esc(c.name)}</b><span class="muted">${c.type === "artiste" ? "Artiste" : "Acheteur"} · ${esc(c.source)}</span></a>
            <div class="pipe-foot"><span class="mono">${c.value ? euro(c.value) : "—"}</span>
            ${id === "gagne" || id === "perdu" ? "" : `<span><button class="icon-btn" data-act="crm-lose" data-id="${c.id}" title="Marquer perdu" aria-label="Marquer perdu">✕</button><button class="icon-btn" data-act="crm-next" data-id="${c.id}" title="Étape suivante" aria-label="Étape suivante">→</button></span>`}</div></article>`,
          )
          .join("")}</section>`;
    }).join("")}</div>`;
}
function viewContact(id) {
  if (id === "cnouveau") return viewNewContact();
  const c = crmById(id);
  if (!c) return viewNotFound();
  const idx = CRM_STAGES.findIndex((s) => s[0] === c.stage);
  return `
    <div class="page-head"><span class="label muted"><a href="#/crm/contacts">CRM</a> · ${c.type === "artiste" ? "Artiste" : "Acheteur"}</span><h1>${esc(c.name)}</h1><p>${esc([c.company, c.city].filter(Boolean).join(" · "))}</p></div>
    <div class="steps-line">${CRM_STAGES.map(([sid, l], i) => `<button class="${sid === c.stage ? "on" : i < idx && c.stage !== "perdu" ? "done" : ""}" data-act="crm-stage" data-id="${c.id}" data-stage="${sid}">${l}</button>`).join("")}</div>
    <div class="contact-grid">
      <section class="panel"><h2>Coordonnées</h2>
        <dl class="dl">
          <dt>E-mail</dt><dd>${esc(c.email)}</dd><dt>Téléphone</dt><dd>${esc(c.phone)}</dd><dt>Ville</dt><dd>${esc(c.city)}</dd>
          <dt>Source</dt><dd>${esc(c.source)}</dd><dt>Étape</dt><dd>${stageLabel(c.stage)}</dd>
          ${c.type === "artiste" ? `<dt>Formule</dt><dd>${c.plan === "pro" ? "Atelier Pro" : "Atelier"}</dd>` : ""}
          <dt>${c.type === "artiste" ? "Abonnement sur 12 mois" : "Commandes"}</dt><dd>${c.value ? (c.type === "artiste" ? ht(c.value) : euro(c.value) + " TTC") : "—"}</dd>
        </dl>
        <p class="hint">Coordonnées fictives (démo).</p>
      </section>
      <section class="panel"><h2>Prochaine action</h2>
        <p><span class="mono">${frDate(c.next[0])}</span> · ${esc(c.next[1])}</p>
        <form id="next-form" data-id="${c.id}">
          <div class="field-row"><div class="field"><label for="next-date">Date</label><input id="next-date" type="date" value="${c.next[0]}" /></div>
          <div class="field"><label for="next-text">Action</label><input id="next-text" value="${esc(c.next[1])}" /></div></div>
          <button class="btn btn-small btn-outline">Mettre à jour</button>
        </form>
      </section>
      <section class="panel contact-history"><h2>Historique des échanges</h2>
        <ol class="history">${c.history.slice().reverse().map(([d, t]) => `<li><span class="mono">${frDate(d)}</span>${esc(t)}</li>`).join("")}</ol>
        <form id="note-form" data-id="${c.id}" class="note-form"><input id="note-text" placeholder="Ajouter un échange (appel, message…)" aria-label="Nouvel échange" /><button class="btn btn-small">Ajouter</button></form>
      </section>
    </div>`;
}
function viewNewContact() {
  return `<div class="page-head"><span class="label muted"><a href="#/crm/contacts">CRM</a></span><h1>Nouveau contact</h1></div>
    <form class="panel" id="contact-form" style="max-width:640px">
      <div class="field-row"><div class="field"><label for="nc-name">Nom</label><input id="nc-name" required /></div>
      <div class="field"><label for="nc-type">Type</label><select id="nc-type"><option value="artiste">Artiste</option><option value="acheteur">Acheteur</option></select></div></div>
      <div class="field-row"><div class="field"><label for="nc-company">Activité ou entreprise</label><input id="nc-company" /></div>
      <div class="field"><label for="nc-city">Ville</label><input id="nc-city" required /></div></div>
      <div class="field-row"><div class="field"><label for="nc-email">E-mail (fictif)</label><input id="nc-email" type="email" required placeholder="nom@example.com" /></div>
      <div class="field"><label for="nc-phone">Téléphone (fictif)</label><input id="nc-phone" placeholder="06 00 00 00 00" /></div></div>
      <div class="field-row"><div class="field"><label for="nc-source">Source</label><select id="nc-source">${CRM_SOURCES.map((s) => `<option>${s}</option>`).join("")}</select></div>
      <div class="field"><label for="nc-value">Montant estimé (€)</label><input id="nc-value" type="number" min="0" step="0.01" value="0" /></div></div>
      <button class="btn">Créer le contact</button>
    </form>`;
}
const PROJECT_ACTIONS = {
  "crm-next": (el) => {
    const c = crmById(el.dataset.id);
    const order = ["nouveau", "contacte", "proposition", "gagne"];
    const i = order.indexOf(c.stage);
    if (i < 0 || i >= order.length - 1) return;
    c.stage = order[i + 1];
    c.history.push([today(), `Passé à l'étape « ${stageLabel(c.stage)} »`]);
    save();
    render(true);
    toast(`${c.name} → ${stageLabel(c.stage)}`);
  },
  "crm-lose": (el) => {
    const c = crmById(el.dataset.id);
    c.stage = "perdu";
    c.history.push([today(), "Marqué comme perdu"]);
    save();
    render(true);
  },
  "crm-stage": (el) => {
    const c = crmById(el.dataset.id);
    if (c.stage === el.dataset.stage) return;
    c.stage = el.dataset.stage;
    c.history.push([today(), `Passé à l'étape « ${stageLabel(c.stage)} »`]);
    save();
    render(true);
  },
  "crm-new": () => nav("#/crm/cnouveau"),
  "crm-reset": () => {
    state.crm = clone(CRM_SEED);
    save();
    render(true);
    toast("Données de démo réinitialisées");
  },
  "post-copy": (el) => {
    const p = POSTS.find((x) => String(x.n) === el.dataset.id);
    try {
      navigator.clipboard.writeText(p.text);
      toast("Texte du post copié");
    } catch {
      toast("Copie impossible dans ce navigateur");
    }
  },
};

/* ---------- 3. Stratégie ---------- */
function viewStrategy() {
  const m = MODEL;
  const total = m.rows.reduce((s, r) => s + (r[2] || 0), 0);
  return `
    <div class="page-head"><span class="label muted">Dossier stratégique</span><h1>Pourquoi ATYPIIK</h1><p>Le problème, la cible, le marché, la concurrence, le prix et le modèle économique. Chaque chiffre de marché renvoie vers sa source ; nos propres calculs sont signalés comme estimations.</p></div>
    <nav class="toc">${[["probleme", "Problème"], ["cible", "Cible"], ["marche", "Marché"], ["concurrence", "Concurrence"], ["prix", "Prix"], ["modele", "Modèle économique"], ["sources", "Sources"]].map(([id, l]) => `<a href="#/strategie" data-act="scroll-to" data-id="${id}">${l}</a>`).join("")}</nav>

    <section class="strat" id="probleme"><h2 class="strat-h">1. Le problème</h2>
      <p class="lead">${esc(PROBLEM.who)}</p>
      <ul class="facts">${PROBLEM.facts.map(([t, ...k]) => `<li>${esc(t)} ${src(...k)}</li>`).join("")}</ul>
      <div class="two-col"><div class="panel"><h3>À quelle fréquence</h3><p>${esc(PROBLEM.frequency)}</p></div><div class="panel"><h3>Ce que ça coûte aujourd'hui</h3><p>${esc(PROBLEM.cost)}</p></div></div>
    </section>

    <section class="strat" id="cible"><h2 class="strat-h">2. La cible : deux personas</h2>
      <div class="personas">${PERSONAS.map(
        (p) => `<article class="persona"><div class="persona-img">${visual(byId(p.photo))}</div><div>
          <span class="label muted">${p.side} · persona fictif</span><h3>${p.name}, ${p.age} ans</h3><p><b>${esc(p.job)}</b></p>
          <dl class="dl"><dt>Budget</dt><dd>${esc(p.budget)}</dd><dt>S'informe sur</dt><dd>${esc(p.info)}</dd><dt>Ce qu'il ou elle veut</dt><dd>${esc(p.need)}</dd><dt>Ce qui bloque</dt><dd>${esc(p.pain)}</dd></dl></div></article>`,
      ).join("")}</div>
    </section>

    <section class="strat" id="marche"><h2 class="strat-h">3. Le marché</h2>
      <div class="figures">${MARKET.map((x) => `<div class="figure"><b>${x.figure}</b><p>${esc(x.label)}</p>${src(...x.src)}</div>`).join("")}</div>
      <h3 class="label">Tendances</h3>
      <div class="trends">${TRENDS.map(([t, d, k]) => `<div class="panel"><h3>${esc(t)}</h3><p>${esc(d)} ${src(...k)}</p></div>`).join("")}</div>
    </section>

    <section class="strat" id="concurrence"><h2 class="strat-h">4. La concurrence</h2>
      <div class="table-wrap"><table class="compare"><thead><tr><th>Acteur</th><th>Positionnement</th><th>Ce que paie l'artiste</th><th>Prix pour l'acheteur</th><th>Ce qui nous distingue</th></tr></thead><tbody>${COMPETITORS.map(
        (c) => `<tr class="${c.us ? "us" : ""}"><td><strong>${esc(c.name)}</strong></td><td>${esc(c.type)}</td><td>${esc(c.fee)} ${src(...c.src)}</td><td>${esc(c.buyer)}</td><td>${esc(c.diff)}</td></tr>`,
      ).join("")}</tbody></table></div>
      <p class="hint">Marques citées à titre de comparaison : aucune n'est partenaire d'ATYPIIK.</p>
    </section>

    <section class="strat" id="prix"><h2 class="strat-h">5. Le prix</h2>
      <p class="lead">Commission de 10 % sans abonnement, ou 7 % avec Atelier Pro à 12,90 € HT par mois. Gratuit pour les acheteurs.</p>
      <div class="trends">${PRICING.map(([t, d, k]) => `<div class="panel"><h3>${t}</h3><p>${esc(d)} ${src(...k)}</p></div>`).join("")}</div>
    </section>

    <section class="strat" id="modele"><h2 class="strat-h">6. Le modèle économique</h2>
      <ul class="facts">${m.how.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      <div class="panel model"><h3>${esc(m.goal)}</h3>
        <div class="table-wrap"><table><tbody>${m.rows.map(([a, b, v]) => `<tr><td><strong>${a}</strong></td><td>${b}</td><td class="num">${v ? ht(v) : ""}</td></tr>`).join("")}
        <tr class="total"><td><strong>Chiffre d'affaires mensuel</strong></td><td>Abonnements + commissions</td><td class="num"><strong>${ht(total)}</strong></td></tr></tbody></table></div>
        <p class="hint">${esc(m.hypotheses)}</p>
      </div>
    </section>

    <section class="strat" id="sources"><h2 class="strat-h">Sources</h2>
      <ol class="sources">${Object.values(SOURCES).map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join("")}</ol>
    </section>`;
}

/* ---------- 4. Communication ---------- */
const NET_ICON = { Instagram: "IG", TikTok: "TT", Pinterest: "PI" };
function postVisual(p) {
  const w = byId(p.work);
  if (p.video)
    return `<div class="post-visual post-video"><video src="${p.video}" poster="${p.poster}" muted loop playsinline autoplay preload="metadata" aria-label="Vidéo du post ${p.n}"></video></div>`;
  return `<div class="post-visual net-${p.network.toLowerCase()}">${visual(w)}<span class="post-logo">atypiik</span><div class="post-over"><b>${esc(p.overlay)}</b></div></div>`;
}
function viewCom() {
  return `
    <div class="page-head"><span class="label muted">Plan de communication</span><h1>Comment le vendre</h1><p>De quoi lancer la communication dès demain : la marque, les canaux, 9 posts prêts à publier, le calendrier de 4 semaines, les partenariats, les 10 premiers clients et les indicateurs.</p></div>
    <nav class="toc">${[["marque", "Marque"], ["canaux", "Canaux"], ["posts", "Posts"], ["calendrier", "Calendrier"], ["partenariats", "Partenariats"], ["acquisition", "10 premiers clients"], ["indicateurs", "Indicateurs"]].map(([id, l]) => `<a href="#/communication" data-act="scroll-to" data-id="${id}">${l}</a>`).join("")}</nav>

    <section class="strat" id="marque"><h2 class="strat-h">1. La plateforme de marque</h2>
      <div class="brand">
        <div class="panel"><h3>Le nom</h3><p><b>${BRAND.name}</b> · ${esc(BRAND.nameWhy)}</p></div>
        <div class="panel"><h3>La promesse</h3><p>${esc(BRAND.promise)}</p></div>
        <div class="panel"><h3>Le ton</h3><ul class="facts">${BRAND.tone.map(([t, d]) => `<li><b>${t}</b> : ${esc(d)}</li>`).join("")}</ul></div>
      </div>
      <h3 class="label">Trois messages clés</h3>
      <div class="trends">${BRAND.messages.map(([t, d], i) => `<div class="panel"><span class="label muted">Message ${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}</div>
    </section>

    <section class="strat" id="canaux"><h2 class="strat-h">2. Les canaux</h2>
      <div class="table-wrap"><table><thead><tr><th>Canal</th><th>Pourquoi pour notre cible</th><th>Rythme</th></tr></thead><tbody>${CHANNELS.map(([c, w, r]) => `<tr><td><strong>${c}</strong></td><td>${esc(w)}</td><td>${r}</td></tr>`).join("")}</tbody></table></div>
    </section>

    <section class="strat" id="posts"><h2 class="strat-h">3. Les 9 posts prêts à publier</h2>
      <div class="posts">${POSTS.map(
        (p) => `<article class="post">
          ${postVisual(p)}
          <div class="post-body">
            <div class="post-meta"><span class="tag">${p.network}</span><span class="mono">${frDate(p.date)}</span></div>
            <p class="post-format"><b>Format</b> ${esc(p.format)}<br /><b>Objectif</b> ${esc(p.goal)}</p>
            <p class="post-text">${esc(p.text).replace(/\n/g, "<br />")}</p>
            <div class="post-actions"><button class="btn btn-small btn-outline" data-act="post-copy" data-id="${p.n}">Copier le texte</button>${p.video ? `<a class="btn btn-small btn-outline" href="${p.video}" download>Télécharger la vidéo</a>` : ""}</div>
          </div></article>`,
      ).join("")}</div>
      <p class="hint">Visuels et vidéos réalisés avec les photos des œuvres du catalogue de démo. Les vidéos sont au format vertical 9:16, prêtes à publier.</p><p class="demo-note">Les artistes cités dans les posts (Margaux Pech, Rosa Mendes…), leurs œuvres et le drop sont fictifs (démo) ; les photos servent d'illustration.</p>
    </section>

    <section class="strat" id="calendrier"><h2 class="strat-h">4. Le calendrier éditorial</h2>
      <div class="calendar">${CALENDAR.map(([w, theme, items]) => `<div class="panel"><span class="label muted">${w}</span><h3>${theme}</h3><ul class="facts">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
    </section>

    <section class="strat" id="partenariats"><h2 class="strat-h">5. Les partenariats</h2>
      <p class="hint">Pistes de partenariat à démarcher : aucun accord n'existe à ce jour.</p>
      <div class="table-wrap"><table><thead><tr><th>Partenaire envisagé</th><th>Ce qu'on lui propose</th><th>Ce qu'il y gagne</th></tr></thead><tbody>${PARTNERS.map((p) => `<tr><td><strong>${esc(p.name)}</strong><br /><span class="muted">${p.kind}</span></td><td>${esc(p.offer)}</td><td>${esc(p.gain)}</td></tr>`).join("")}</tbody></table></div>
    </section>

    <section class="strat" id="acquisition"><h2 class="strat-h">6. Trouver les 10 premiers clients</h2>
      <div class="two-col">${ACQUISITION.map(([t, items]) => `<div class="panel"><h3>${t}</h3><ol class="facts">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></div>`).join("")}</div>
    </section>

    <section class="strat" id="indicateurs"><h2 class="strat-h">7. Les indicateurs</h2>
      <div class="table-wrap"><table><thead><tr><th>Indicateur</th><th>Calcul</th><th>Objectif du premier mois</th></tr></thead><tbody>${KPIS.map(([a, b, c]) => `<tr><td><strong>${a}</strong></td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join("")}</tbody></table></div>
    </section>`;
}
PROJECT_ACTIONS["scroll-to"] = (el, e) => {
  e.preventDefault();
  const t = document.getElementById(el.dataset.id);
  if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
};

const PROJECT_VIEWS = {
  projet: [viewProject],
  offre: [viewOffer],
  abonnement: [() => viewSubscribe(currentParam), () => bindSubscribe(currentParam)],
  "abonnement-ok": [() => viewSubDone(currentParam)],
  crm: [() => viewCRM(currentParam), bindCRM],
  strategie: [viewStrategy],
  communication: [viewCom],
};

/* ---------- Devenir artiste depuis un compte acheteur ---------- */
function becomeArtistBox() {
  const u = state.user;
  const p = u.applied && state.pending.find((x) => x.id === u.applied);
  if (p && p.status === "en attente")
    return `<div class="become panel"><div><span class="label muted">Votre candidature artiste</span><h2>En cours de validation</h2>
      <p>L'équipe vérifie votre portfolio, en général sous 48 h. Vous pouvez continuer à acheter normalement.</p></div>
      <div class="become-cta"><button class="btn btn-outline" data-act="demo-validate" data-id="${p.id}">Simuler la validation (démo)</button></div></div>`;
  if (p && p.status === "refusé")
    return `<div class="become panel"><div><span class="label muted">Votre candidature artiste</span><h2>Non retenue pour le moment</h2><p>Vous pourrez candidater de nouveau avec de nouvelles pièces.</p></div></div>`;
  return `<div class="become panel"><div><span class="label muted">Vous créez aussi ?</span><h2>Ouvrez votre atelier</h2>
    <p>Gardez votre compte, vos commandes et vos favoris : ajoutez simplement un espace artiste. Gratuit, 10 % de commission sur vos ventes.</p></div>
    <div class="become-cta"><a class="btn" href="#/devenir-artiste">Devenir artiste</a></div></div>`;
}
function viewBecomeArtist() {
  if (!state.user) {
    afterLogin = "#/devenir-artiste";
    return `<div class="page-head"><h1>Devenir artiste</h1><p>Créez un compte artiste, ou connectez-vous à votre compte acheteur pour y ajouter un espace artiste.</p></div>${loginForms()}`;
  }
  const u = state.user;
  if (u.role === "vendeur") return emptyBox("Vous êtes déjà artiste", "Votre espace artiste est dans votre profil.", '<a class="btn" href="#/profil">Mon espace artiste</a>');
  if (u.role !== "acheteur" || u.applied) return viewProfile();
  return `
    <div class="page-head"><span class="label muted">Compte de ${esc(u.name)}</span><h1>Devenir artiste</h1><p>Trois informations suffisent. Votre compte acheteur reste le même : vos commandes et vos favoris sont conservés.</p></div>
    <div class="cart">
      <form class="panel" id="become-form">
        <h2>Votre atelier</h2>
        <div class="field"><label for="ba-name">Nom d'artiste</label><input id="ba-name" required value="${esc(u.name)}" /></div>
        <div class="field-row">
          <div class="field"><label for="ba-city">Ville</label><input id="ba-city" required /></div>
          <div class="field"><label for="ba-disc">Discipline</label><input id="ba-disc" required placeholder="Céramique, peinture, crochet…" /></div>
        </div>
        <div class="field"><label for="ba-link">Lien vers votre travail (Instagram, portfolio)</label><input id="ba-link" placeholder="instagram.com/votre-atelier" /></div>
        <div class="field"><label>Formule</label>
          ${PLANS.map((p, i) => `<label class="check"><input type="radio" name="ba-plan" value="${p.id}" ${i === 0 ? "checked" : ""} /> <b>${esc(p.name)}</b> · ${p.price ? ht(p.price) + " / mois, " : "gratuit, "}${p.commission} % de commission</label>`).join("")}
        </div>
        <button class="btn btn-block">Envoyer ma candidature</button>
      </form>
      <aside class="summary"><h3>Comment ça se passe</h3>
        <ol class="facts"><li>Vous envoyez votre candidature.</li><li>L'équipe regarde votre travail, sous 48 h.</li><li>Une fois validé, votre espace artiste s'ouvre dans votre profil et vous publiez vos œuvres.</li></ol>
        <p class="hint">Vous gardez 90 % du prix de chaque vente (93 % avec Atelier Pro).</p></aside>
    </div>`;
}
function bindBecomeArtist() {
  const f = $("#become-form");
  if (!f) return bindLogin();
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = state.user;
    const plan = $('input[name="ba-plan"]:checked').value;
    const p = { id: "p" + Date.now(), name: $("#ba-name").value.trim(), email: u.email, city: $("#ba-city").value.trim(), discipline: $("#ba-disc").value.trim(), status: "en attente", plan };
    state.pending.push(p);
    state.user = { ...u, applied: p.id };
    state.crm.unshift({
      id: "c" + Date.now(), name: p.name, type: "artiste", company: p.discipline, city: p.city, source: "Site ATYPIIK", stage: "nouveau", plan,
      value: plan === "pro" ? Math.round(PLANS[1].price * 12 * 100) / 100 : 0, email: u.email, phone: "Non renseigné", fresh: true,
      history: [[today(), "Acheteur inscrit qui candidate pour devenir artiste" + ($("#ba-link").value.trim() ? ` (${$("#ba-link").value.trim()})` : "")]],
      next: [today(), "Regarder son portfolio et valider ou refuser"],
    });
    save();
    toast("Candidature envoyée : l'équipe la valide sous 48 h.");
    nav("#/profil");
  });
}
PROJECT_VIEWS["devenir-artiste"] = [viewBecomeArtist, bindBecomeArtist];
PROJECT_ACTIONS["demo-validate"] = (el) => {
  const p = state.pending.find((x) => x.id === el.dataset.id);
  if (!p) return;
  actions["seller-ok"]({ dataset: { id: p.id } });
  const c = state.crm.find((x) => x.email === p.email && x.type === "artiste");
  if (c) {
    c.stage = "gagne";
    c.history.push([today(), "Candidature validée, atelier ouvert"]);
  }
  state.user = { ...state.user, role: "vendeur", artistId: p.artistId, applied: null };
  save();
  toast("Candidature validée : votre espace artiste est ouvert.");
  render();
};
