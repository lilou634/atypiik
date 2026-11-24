/* =========================================================
   ATYPIIK — données du projet INSEEC (démo)
   CRM fictif, offre commerciale et plan de communication.
   Toutes les personnes et coordonnées ci-dessous sont inventées.
   ========================================================= */

/* ---------- Offre commerciale ---------- */
const PROMISE =
  "ATYPIIK aide les artistes émergents à vendre leurs créations en ligne sans y laisser leurs marges, et permet à chacun d'acheter une pièce unique choisie à la main, à prix accessible.";

const PLANS = [
  {
    id: "atelier",
    name: "Atelier",
    price: 0,
    commission: 15,
    tagline: "Pour se lancer sans risque",
    included: [
      "Boutique et mini-site d'artiste",
      "Jusqu'à 10 œuvres en vente en même temps",
      "Paiement sécurisé et versement sous 7 jours après livraison",
      "Messagerie avec les acheteurs",
      "Espace de résolution des litiges avec l'acheteur",
    ],
    excluded: [
      "Commission réduite à 10 %",
      "Publication illimitée d'œuvres",
      "Candidature prioritaire aux drops et à la Sélection",
      "Statistiques détaillées",
      "Conseil personnalisé",
      "Shooting photo (option prévue plus tard)",
      "Frais de livraison, payés par l'acheteur",
    ],
  },
  {
    id: "pro",
    name: "Atelier Pro",
    price: 12.9,
    commission: 10,
    tagline: "Pour vendre plus et plus souvent",
    included: [
      "Tout le contenu de l'offre Atelier",
      "Commission réduite à 10 % au lieu de 15 %",
      "Publication illimitée d'œuvres",
      "Candidature prioritaire aux drops et à la Sélection",
      "Statistiques de visites, favoris et ventes",
      "Un conseil personnalisé par trimestre (visio 30 min)",
    ],
    excluded: ["Shooting photo (option prévue plus tard)", "Frais de livraison, payés par l'acheteur"],
  },
];
const VAT = 0.2;

/* ---------- CRM : contacts fictifs ---------- */
const CRM_STAGES = [
  ["nouveau", "Nouveau"],
  ["contacte", "Contacté"],
  ["proposition", "Proposition envoyée"],
  ["gagne", "Gagné"],
  ["perdu", "Perdu"],
];
const CRM_SOURCES = ["Instagram", "TikTok", "Pinterest", "Partenaire", "Salon", "Bouche-à-oreille", "Site ATYPIIK"];

// type : "artiste" (vend sur ATYPIIK, valeur = abonnement annuel HT) ou "acheteur" (valeur = commandes TTC)
const CRM_SEED = []; // site réel : vide
CRM_SEED.forEach((c, i) => {
  const [first, ...rest] = c.name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().split(" ");
  c.email = `${first}.${rest.join("-")}@example.com`;
  c.phone = "06 00 00 " + String(10 + i).padStart(2, "0") + " " + String(20 + i * 3).padStart(2, "0");
});

/* ---------- Plan de communication ---------- */
const BRAND = {
  name: "ATYPIIK",
  nameWhy:
    "« Atypique » écrit avec deux i : on remarque tout de suite que le mot sort du rang, comme les artistes que l'on met en avant. Le double i rappelle aussi les deux côtés de la plateforme, l'artiste et l'acheteur.",
  promise: PROMISE,
  tone: [
    ["Chaleureux", "on parle comme dans un atelier, on tutoie sur les réseaux, on vouvoie sur le site"],
    ["Direct", "des phrases courtes, des prix clairs, pas de jargon d'art contemporain"],
    ["Fier", "on montre le travail des artistes en grand, avec leur nom, toujours"],
  ],
  messages: [
    ["L'artiste garde jusqu'à 90 %", "Sur chaque vente, 85 % du prix revient à l'artiste, et 90 % avec Atelier Pro. On le dit et on le montre."],
    ["Chaque artiste est choisi à la main", "Pas de revente ni de production de masse : chaque boutique est validée par l'équipe avant d'ouvrir."],
    ["De l'art qui entre dans votre vie", "Des pièces uniques pour offrir ou pour votre maison, achetées directement à ceux qui les créent, sans passer par une galerie."],
  ],
};

const CHANNELS = [
  ["Instagram", "Le réseau où les artistes montrent leur travail et où nos deux personas découvrent de nouvelles créations. Carrousels d'œuvres, Reels d'atelier, stories des drops.", "3 posts / semaine"],
  ["TikTok", "Le format vidéo « dans l'atelier » touche les 18-30 ans et fait connaître les artistes au-delà de leurs abonnés.", "2 vidéos / semaine"],
  ["Pinterest", "Les acheteurs y préparent leur déco et leurs cadeaux : chaque œuvre devient une épingle qui renvoie vers la boutique, longtemps après sa publication.", "10 épingles / semaine"],
  ["Newsletter", "Un e-mail par semaine aux inscrits : le drop, l'artiste de la semaine, trois coups de cœur. C'est le canal qui convertit le mieux une fois le contact obtenu.", "1 / semaine"],
  ["Partenariats et salons", "Écoles d'art, associations et salons pour recruter les artistes en face à face, là où les réseaux ne suffisent pas.", "2 actions / mois"],
];

// visuel : œuvre utilisée comme fond (id du catalogue), titre incrusté
const POSTS = []; // site réel : vide

const CALENDAR = []; // site réel : vide

const PARTNERS = []; // site réel : vide

const ACQUISITION = [
  ["Les 5 premiers artistes payants", [
    "Lister 50 artistes actifs sur Instagram et TikTok (5 000 à 30 000 abonnés) qui vendent déjà en direct.",
    "Leur écrire un message personnalisé citant une de leurs pièces, avec 3 mois d'Atelier Pro offerts.",
    "Proposer une visio de 15 min pour ouvrir leur boutique avec eux.",
    "Objectif : 10 boutiques ouvertes, dont 5 qui passent en Atelier Pro à la fin de l'offre.",
  ]],
  ["Les 5 premiers acheteurs", [
    "Lancer avec un drop de Noël limité (24 pièces), annoncé par les artistes eux-mêmes à leurs abonnés.",
    "Offrir 10 % sur la première commande aux inscrits à la newsletter.",
    "Démarcher 10 commerces (cafés, salons de coiffure, coworkings) pour décorer leurs murs avec des œuvres du site.",
    "Proposer des cadeaux d'entreprise de fin d'année à 15 PME locales (tirages signés).",
  ]],
];

const KPIS = [
  ["Taux d'engagement Instagram", "(likes + commentaires + partages) ÷ abonnés", "4 % et plus"],
  ["Vues moyennes par vidéo TikTok", "vues totales ÷ nombre de vidéos", "2 000 et plus"],
  ["Clics vers le site", "clics depuis les réseaux et Pinterest (liens suivis)", "500 / mois"],
  ["Inscriptions newsletter", "nouveaux inscrits par semaine", "50 / semaine"],
  ["Taux de conversion du site", "commandes ÷ visites", "1,5 %"],
  ["Coût d'acquisition client", "dépenses marketing ÷ nouveaux clients", "moins de 15 € (rentabilisé dès la 3e commande, ou par un abonnement Pro)"],
  ["Artistes recrutés", "boutiques ouvertes et passages en Atelier Pro", "10 boutiques au 1er mois, 5 passages en Pro au 4e mois (fin des 3 mois offerts)"],
];

/* ---------- Dossier stratégique ----------
   Chiffres de marché : chaque chiffre renvoie vers sa source.
   Les montants calculés par nous sont signalés comme estimations. */
const SOURCES = {
  artbasel: ["Art Basel & UBS, The Art Market Report 2026 (synthèse)", "https://www.artbasel.com/stories/art-basel-and-ubs-global-art-market-report-2026-art-market-trends"],
  artbaselPdf: ["Art Basel & UBS, The Art Market Report 2026 (rapport complet, PDF)", "https://theartmarket.artbasel.com/download/The-Art-Basel-and-UBS-Art-Market-Report-2026-by-Arts-Economics.pdf"],
  survey: ["Art Basel & UBS, Survey of Global Collecting 2026", "https://www.artbasel.com/stories/the-art-basel-and-ubs-survey-of-global-collecting-2026"],
  etsyQ3: ["Etsy, lettre aux actionnaires du 3e trimestre 2026 (SEC)", "https://www.sec.gov/Archives/edgar/data/0001370637/000137063726000090/q326shareholderletter.htm"],
  etsyFees: ["Etsy, frais de vente (page officielle)", "https://www.etsy.com/legal/fees/"],
  deps: ["Ministère de la Culture (DEPS), Les artistes-auteurs en 2023, décembre 2025", "https://www.culture.gouv.fr/espace-documentation/service-statistique-ministeriel-deps/publications/les-artistes-auteurs-en-2023-ce-2025-6"],
  aaf: ["Ateliers d'Art de France, étude sur l'économie des ateliers d'art", "https://ateliersdart.com/wp-content/uploads/2024/01/Etude-Economie-des-ateliers-dart.pdf"],
  saatchi: ["Saatchi Art, page « Why sell »", "https://www.saatchiart.com/whysell"],
  singulart: ["Singulart, centre d'aide artistes", "https://www.singulart.com/landing/en/singulart-artists-subscription-help-center"],
  artmajeur: ["Artmajeur, page « site gratuit » et formules", "https://www.artmajeur.com/fr/free-website"],
  stripe: ["Stripe, tarifs France", "https://stripe.com/fr/pricing"],
};

const PROBLEM = {
  who: "Les artistes et créateurs indépendants qui débutent, et les personnes qui veulent acheter une pièce unique sans passer par une galerie.",
  facts: [
    ["Près de 350 000 personnes ont perçu en 2023 des revenus liés à la création d'une œuvre (artistes-auteurs), et 67 % d'entre elles ont au moins un autre revenu d'activité : vivre de son art reste rare.", "deps"],
    ["Les galeries en ligne spécialisées prennent une part élevée de chaque vente : 40 % chez Saatchi Art, 50 % HT chez Singulart.", "saatchi", "singulart"],
    ["Les places de marché généralistes sont saturées : Etsy compte environ 5,8 millions de vendeurs actifs, ce qui rend un artiste débutant difficile à trouver.", "etsyQ3"],
  ],
  frequency: "À chaque vente pour l'artiste (la commission est prélevée sur chaque œuvre) et à chaque recherche de cadeau ou de déco pour l'acheteur, qui tombe surtout sur des produits fabriqués en série.",
  cost: "Estimation : pour une œuvre vendue 200 €, l'artiste perd 80 € sur Saatchi Art (40 %) et 100 € sur Singulart (50 %), contre 30 € sur ATYPIIK (15 %), et 20 € avec l'offre Atelier Pro (10 %).",
};

const PERSONAS = []; // site réel : vide

const MARKET = [
  { figure: "59,6 Md$", label: "Ventes mondiales d'art en 2025, en hausse de 4 % sur un an", src: ["artbasel"] },
  { figure: "9,2 Md$", label: "Ventes d'art en ligne en 2025, soit 15 % de la valeur du marché (25 % au pic de 2020)", src: ["artbasel"] },
  { figure: "19 %", label: "Part des dépenses des collectionneurs achetée directement aux artistes, deuxième canal après les galeries", src: ["survey"] },
  { figure: "≈ 88 M", label: "Acheteurs actifs sur Etsy au 3e trimestre 2026 : la demande pour le fait-main en ligne existe à grande échelle", src: ["etsyQ3"] },
  { figure: "350 000", label: "Artistes-auteurs en France en 2023 (toutes disciplines) : le vivier de vendeurs potentiels", src: ["deps"] },
  { figure: "38 000", label: "Entreprises de métiers d'art en France, pour environ 8 Md€ de chiffre d'affaires (étude Ateliers d'Art de France)", src: ["aaf"] },
];
const TRENDS = [
  ["Les jeunes collectionneurs achètent en ligne", "Selon l'enquête Art Basel & UBS 2026, la génération Z passe plus souvent que les autres par des places de marché en ligne.", ["survey"]],
  ["L'achat direct à l'artiste progresse", "Il représente 19 % des dépenses des collectionneurs, devant les foires (16 %) et les enchères (10 %).", ["survey"]],
  ["Le marché en ligne se concentre sur les petits prix", "Les ventes en ligne baissent en valeur car les pièces les plus chères repartent en salle, mais elles restent fortes sur les gammes de prix moyennes et basses, celles d'ATYPIIK.", ["artbasel"]],
];

const COMPETITORS = [
  { name: "Etsy", type: "Place de marché généraliste du fait-main", fee: "6,5 % de frais de transaction + 0,20 $ par annonce + frais de paiement (environ 4 % + 0,30 € en France)", buyer: "Prix fixé par le vendeur, livraison en plus", diff: "Pas de sélection : artistes noyés parmi des millions d'annonces et de produits revendus.", src: ["etsyFees", "etsyQ3"] },
  { name: "Saatchi Art", type: "Galerie en ligne internationale", fee: "40 % du prix de vente des originaux", buyer: "Œuvres souvent au-delà de 500 €", diff: "Commission quatre fois plus élevée, catalogue international, peu de petits prix.", src: ["saatchi"] },
  { name: "Singulart", type: "Galerie en ligne d'artistes sélectionnés", fee: "50 % HT du prix de vente", buyer: "Œuvres de plusieurs centaines à plusieurs milliers d'euros", diff: "Commission cinq fois plus élevée, ciblée sur les collectionneurs aisés.", src: ["singulart"] },
  { name: "Artmajeur", type: "Galerie en ligne ouverte à tous", fee: "Inscription gratuite, abonnements payants ; la commission varie selon la formule", buyer: "Très large choix, qualité inégale", diff: "Pas de sélection à l'entrée ; nous choisissons chaque artiste et mettons en avant des drops.", src: ["artmajeur"] },
  { name: "ATYPIIK", type: "Boutique d'artistes émergents sélectionnés", fee: "15 % (Atelier, sans abonnement) ou 10 % + 12,90 € HT / mois (Atelier Pro), frais de paiement inclus", buyer: "Prix fixé librement par chaque artiste, sans frais de service pour l'acheteur", diff: "Sélection à la main, artiste qui garde 85 à 90 %, drops et commandes sur mesure.", src: [], us: true },
];

const PRICING = [
  ["Concurrents", "Les galeries en ligne qui sélectionnent leurs artistes prennent 40 à 50 %. À 15 %, ou 10 % avec Atelier Pro, ATYPIIK prend trois à cinq fois moins. Etsy revient à environ 11 % sur une vente de 50 € (6,5 % + 4 % + 0,30 € + annonce), mais sans aucune sélection.", ["saatchi", "singulart", "etsyFees"]],
  ["Coûts", "Le paiement par carte européenne coûte environ 1,5 % + 0,25 € par transaction. Sur un panier de 90 €, notre commission de 15 % fait 13,50 € TTC, soit 11,25 € HT ; après 1,60 € de frais de paiement, il reste 9,65 € de marge brute HT (5,90 € avec un artiste en Atelier Pro).", ["stripe"]],
  ["Valeur pour le client", "L'artiste qui vend 200 € garde 170 € chez nous, et 180 € avec l'offre Pro, contre 100 € à 120 € en galerie en ligne. L'offre Pro s'adresse aux artistes qui vendent régulièrement : commission réduite, publication illimitée et mise en avant.", []],
];

const MODEL = {
  how: [
    "Une commission sur chaque vente : 15 % avec l'offre Atelier, 10 % avec Atelier Pro. L'acheteur ne paie aucun frais de service, seulement l'œuvre et la livraison.",
    "Un abonnement Atelier Pro à 12,90 € HT par mois pour les artistes qui vendent régulièrement.",
    "Plus tard : shootings photo et emballages vendus en option aux artistes.",
  ],
  goal: "Objectif à 12 mois : au moins 3 000 € HT de chiffre d'affaires par mois (scénario ci-dessous : 3 775,50 € HT).",
  rows: [
    ["Artistes en Atelier Pro", "120 artistes × 12,90 € HT", 1548],
    ["Volume de ventes mensuel", "220 commandes × 90 € de panier moyen = 19 800 € TTC", null],
    ["Commissions", "19 800 € × 13,5 % de commission moyenne (70 % des artistes en Atelier à 15 %, 30 % en Pro à 10 %) = 2 673 € TTC, soit 2 227,50 € HT", 2227.5],
  ],
  hypotheses: "Hypothèses (estimations) : panier moyen de 90 €, au milieu du budget de notre persona acheteuse (40 à 150 € par achat), à confirmer avec les premières ventes ; 400 artistes inscrits dont 30 % en Pro (120) ; un artiste vend en moyenne 0,55 pièce par mois (220 commandes).",
};

/* ---------- Vue 3D des œuvres plates ----------
   Texture = la photo redressée et recadrée sur l'œuvre (assets/3d/).
   ratio = largeur ÷ hauteur, depth = épaisseur ÷ grand côté, edge = couleur de la tranche. */
const VIEW3D = {}; // site réel : vues 3D ajoutées œuvre par œuvre
