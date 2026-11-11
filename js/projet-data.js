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
    commission: 10,
    tagline: "Pour se lancer sans risque",
    included: [
      "Boutique et mini-site d'artiste",
      "Publication illimitée d'œuvres",
      "Paiement sécurisé et versement sous 7 jours après livraison",
      "Messagerie avec les acheteurs",
      "Médiation en cas de litige",
    ],
    excluded: [
      "Commission réduite à 7 %",
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
    commission: 7,
    tagline: "Pour vendre plus et plus souvent",
    included: [
      "Tout le contenu de l'offre Atelier",
      "Commission réduite à 7 % au lieu de 10 %",
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
const CRM_SEED = [
  { id: "c01", name: "Maëlle Garnier", type: "artiste", company: "Céramiste", city: "Lyon", source: "Instagram", stage: "gagne", plan: "pro", value: 154.8,
    history: [["2026-09-02", "Message Instagram après un post sur ses bols émaillés"], ["2026-09-05", "Appel découverte de 20 min"], ["2026-09-12", "Abonnement Atelier Pro activé"]],
    next: ["2026-11-18", "Point trimestriel : préparer le drop de Noël"] },
  { id: "c02", name: "Yanis Belkacem", type: "artiste", company: "Photographe", city: "Marseille", source: "Salon", stage: "proposition", plan: "pro", value: 154.8,
    history: [["2026-10-04", "Rencontré au salon d'art contemporain de Marseille"], ["2026-10-08", "Envoi de la présentation de l'offre Pro"]],
    next: ["2026-11-12", "Relance par téléphone"] },
  { id: "c03", name: "Clara Moreau", type: "acheteur", company: "", city: "Bordeaux", source: "Pinterest", stage: "gagne", value: 180,
    history: [["2026-10-01", "Inscription via une épingle « déco murale »"], ["2026-10-03", "Commande d'une sérigraphie (180 €)"]],
    next: ["2026-11-20", "Envoyer la sélection de Noël"] },
  { id: "c04", name: "Hugo Lambert", type: "artiste", company: "Illustrateur", city: "Nantes", source: "TikTok", stage: "contacte", plan: "atelier", value: 0,
    history: [["2026-10-20", "A commenté la vidéo « comment on sélectionne nos artistes »"], ["2026-10-22", "Réponse en message privé avec le lien d'inscription"]],
    next: ["2026-11-13", "Vérifier son portfolio et l'inviter à candidater"] },
  { id: "c05", name: "Sofia Mendes", type: "acheteur", company: "", city: "Paris", source: "Instagram", stage: "proposition", value: 240,
    history: [["2026-10-25", "Demande de commande sur mesure (portrait de chien)"], ["2026-10-27", "Devis de l'artiste transmis : 240 €"]],
    next: ["2026-11-11", "Relancer pour la validation du devis"] },
  { id: "c06", name: "Lucas Petit", type: "acheteur", company: "", city: "Lille", source: "Bouche-à-oreille", stage: "nouveau", value: 0,
    history: [["2026-11-06", "Inscription à la newsletter"]],
    next: ["2026-11-14", "Envoyer le code de bienvenue"] },
  { id: "c07", name: "Amandine Roche", type: "artiste", company: "Créatrice de bijoux", city: "Montpellier", source: "Partenaire", stage: "gagne", plan: "atelier", value: 0,
    history: [["2026-09-15", "Recommandée par une école d'art partenaire"], ["2026-09-20", "Boutique ouverte, offre Atelier"]],
    next: ["2026-11-25", "Lui proposer l'offre Pro après 5 ventes"] },
  { id: "c08", name: "Thomas Nguyen", type: "acheteur", company: "Café Les Voisins", city: "Toulouse", source: "Salon", stage: "contacte", value: 0,
    history: [["2026-10-10", "Gérant d'un café, cherche des œuvres pour ses murs"], ["2026-10-14", "Appel : budget 600 € pour 3 tableaux"]],
    next: ["2026-11-15", "Envoyer une sélection de 6 œuvres"] },
  { id: "c09", name: "Inès Rahmani", type: "artiste", company: "Peintre", city: "Marseille", source: "Instagram", stage: "gagne", plan: "pro", value: 154.8,
    history: [["2026-08-28", "Repérée sur Instagram"], ["2026-09-01", "Visio de présentation"], ["2026-09-03", "Abonnement Atelier Pro activé"]],
    next: ["2026-12-01", "Interview pour la rubrique « artiste de la semaine »"] },
  { id: "c10", name: "Paul Fontaine", type: "acheteur", company: "", city: "Rennes", source: "Site ATYPIIK", stage: "perdu", value: 0,
    history: [["2026-10-02", "Panier abandonné (tirage photo 75 €)"], ["2026-10-05", "Relance par e-mail sans réponse"]],
    next: ["2026-12-05", "Inclure dans la campagne de Noël"] },
  { id: "c11", name: "Julie Marchand", type: "artiste", company: "Crocheteuse", city: "Grenoble", source: "TikTok", stage: "proposition", plan: "pro", value: 154.8,
    history: [["2026-10-18", "Vidéo crochet repérée sur TikTok"], ["2026-10-21", "Appel découverte"], ["2026-10-24", "Proposition Atelier Pro envoyée"]],
    next: ["2026-11-12", "Répondre à ses questions sur la commission"] },
  { id: "c12", name: "Nadia Haddad", type: "acheteur", company: "", city: "Nice", source: "Instagram", stage: "gagne", value: 95,
    history: [["2026-10-03", "Clic sur une publicité Instagram"], ["2026-10-03", "Commande d'un tirage (95 €)"]],
    next: ["2026-11-19", "Demander un avis après réception"] },
  { id: "c13", name: "Romain Girard", type: "artiste", company: "Sculpteur", city: "Strasbourg", source: "Salon", stage: "perdu", plan: "atelier", value: 0,
    history: [["2026-09-25", "Rencontré au salon"], ["2026-10-02", "Préfère vendre uniquement en galerie physique"]],
    next: ["2027-03-01", "Reprendre contact au printemps"] },
  { id: "c14", name: "Emma Rousseau", type: "acheteur", company: "", city: "Paris", source: "Pinterest", stage: "nouveau", value: 0,
    history: [["2026-11-08", "Création de compte, 4 œuvres en favoris"]],
    next: ["2026-11-12", "Notifier si une œuvre en favori baisse de prix"] },
  { id: "c15", name: "Léo Barbier", type: "artiste", company: "Graveur", city: "Dijon", source: "Partenaire", stage: "contacte", plan: "atelier", value: 0,
    history: [["2026-10-28", "Contact via l'association d'artistes partenaire"], ["2026-11-02", "Premier échange par e-mail"]],
    next: ["2026-11-16", "Visio pour l'aider à photographier ses gravures"] },
  { id: "c16", name: "Chloé Lefèvre", type: "acheteur", company: "Agence Lumen (RH)", city: "Lyon", source: "Bouche-à-oreille", stage: "proposition", value: 900,
    history: [["2026-10-15", "Cherche des cadeaux de fin d'année pour 12 salariés"], ["2026-10-30", "Proposition : 12 tirages signés, 900 € TTC"]],
    next: ["2026-11-13", "Relance et envoi des visuels"] },
  { id: "c17", name: "Mathis Colin", type: "artiste", company: "Peintre", city: "Bordeaux", source: "Instagram", stage: "nouveau", plan: "atelier", value: 0,
    history: [["2026-11-07", "A suivi le compte et liké 6 posts"]],
    next: ["2026-11-14", "Lui écrire un message personnalisé"] },
  { id: "c18", name: "Sarah Benoît", type: "acheteur", company: "", city: "Tours", source: "TikTok", stage: "gagne", value: 320,
    history: [["2026-10-12", "Découvre ATYPIIK via une vidéo « dans l'atelier »"], ["2026-10-13", "Commande : vase + bol (320 €)"]],
    next: ["2026-11-21", "Lui présenter le drop céramique"] },
  { id: "c19", name: "Adrien Perrin", type: "acheteur", company: "", city: "Angers", source: "Instagram", stage: "contacte", value: 0,
    history: [["2026-11-01", "Question en commentaire sur les délais de livraison"], ["2026-11-01", "Réponse avec le lien vers la FAQ"]],
    next: ["2026-11-15", "Vérifier s'il a créé un compte"] },
  { id: "c20", name: "Zoé Martin", type: "artiste", company: "Couturière upcycling", city: "Lille", source: "Partenaire", stage: "gagne", plan: "pro", value: 154.8,
    history: [["2026-09-10", "Présentée par un concept store partenaire"], ["2026-09-18", "Abonnement Atelier Pro activé"]],
    next: ["2026-11-22", "Shooting de sa collection d'hiver"] },
  { id: "c21", name: "Karim Aït", type: "acheteur", company: "", city: "Marseille", source: "Salon", stage: "perdu", value: 0,
    history: [["2026-09-26", "Intéressé par un grand format au salon"], ["2026-10-06", "A acheté ailleurs"]],
    next: ["2027-01-10", "Envoyer les nouveautés grand format"] },
  { id: "c22", name: "Lina Dubois", type: "artiste", company: "Illustratrice", city: "Rennes", source: "Pinterest", stage: "proposition", plan: "pro", value: 154.8,
    history: [["2026-10-29", "Candidature reçue via le formulaire « Vendre »"], ["2026-11-03", "Portfolio validé, proposition Atelier Pro envoyée"]],
    next: ["2026-11-12", "Appel pour finaliser"] },
];
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
    ["L'artiste garde 90 %", "Sur chaque vente, 90 % du prix revient à l'artiste (93 % avec Atelier Pro). On le dit et on le montre."],
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
const POSTS = [
  { n: 1, network: "Instagram", format: "Carrousel 5 images (1080 × 1350)", date: "2026-11-16", goal: "Notoriété : présenter le concept",
    work: "a4", overlay: "L'art qui sort du rang",
    text: "ATYPIIK ouvre au public 🎨\nAprès deux mois de test avec nos premiers artistes, la boutique est ouverte à tous. Une boutique en ligne où chaque artiste est choisi à la main, et où 90 % du prix va directement à l'artiste.\n\nPeinture, céramique, bijoux, crochet, photo : des pièces uniques, au prix fixé par chaque artiste.\n\nSwipe pour rencontrer nos 8 premiers artistes 👉\n\n#art #artisteemergent #faitmain #artfrancais #decointerieure" },
  { n: 2, network: "TikTok", format: "Vidéo verticale 14 s (9:16)", video: "assets/com/post-2.mp4", poster: "assets/com/post-2.jpg", date: "2026-11-17", goal: "Notoriété : faire connaître un artiste",
    work: "a6", overlay: "Dans l'atelier de Margaux",
    text: "POV : tu entres dans l'atelier d'une céramiste à Nantes ✨\nDe la boule de faïence au vase rayé peint à la main, en 14 secondes.\nSes pièces sont sur ATYPIIK, lien en bio.\n\n#ceramique #pottery #artisan #atelier #tiktokart" },
  { n: 3, network: "Pinterest", format: "Épingle verticale (1000 × 1500)", date: "2026-11-18", goal: "Trafic vers la galerie",
    work: "a3", overlay: "Idées déco murale faites main",
    text: "Idées déco murale faites main : tirages photo signés, toiles et céramiques d'artistes émergents. Pièces uniques ou en édition limitée, livrées chez toi.\nLien : la galerie ATYPIIK." },
  { n: 4, network: "Instagram", format: "Reel 15 s (9:16)", video: "assets/com/post-4.mp4", poster: "assets/com/post-4.jpg", date: "2026-11-23", goal: "Recruter des artistes",
    work: "a1", overlay: "Artiste ? Garde 90 %",
    text: "Tu crées et tu veux vendre sans laisser la moitié du prix en commission ?\nSur ATYPIIK, tu gardes 90 % de chaque vente. Pas d'abonnement obligatoire.\n\nOn sélectionne nos artistes à la main : envoie ton portfolio via le lien en bio.\n\n#artistefrancais #vendresonart #illustration #creatrice" },
  { n: 5, network: "TikTok", format: "Vidéo verticale 16 s (9:16), texte animé", video: "assets/com/post-5.mp4", poster: "assets/com/post-5.jpg", date: "2026-11-25", goal: "Confiance : expliquer la sélection",
    work: "a7", overlay: "Comment on choisit nos artistes",
    text: "On reçoit des dizaines de candidatures, voilà comment on choisit 👇\n1. Des pièces faites main, pas revendues\n2. Une vraie patte, qu'on reconnaît\n3. Des photos honnêtes\nEt toi, tu postulerais ?\n\n#artiste #selection #faitmain #petitecreatrice" },
  { n: 6, network: "Pinterest", format: "Épingle idée (5 pages)", date: "2026-11-27", goal: "Trafic : cadeaux de Noël",
    work: "a29", overlay: "10 cadeaux faits main pour Noël",
    text: "10 idées de cadeaux faits main pour Noël : bijoux, crochet, céramique, tirages. Chaque pièce est faite par un artiste indépendant en France." },
  { n: 7, network: "Instagram", format: "Story vidéo 13 s (9:16) + sticker compte à rebours", video: "assets/com/post-7.mp4", poster: "assets/com/post-7.jpg", date: "2026-12-01", goal: "Conversion : annoncer le drop",
    work: "a14", overlay: "Drop céramique · 18 h",
    text: "DROP ce vendredi 18 h ⏰\nLes céramiques d'hiver de Margaux : 24 pièces, pas une de plus.\nActive le rappel pour être prévenu à l'ouverture 🔔" },
  { n: 8, network: "TikTok", format: "Vidéo verticale 12 s (9:16)", video: "assets/com/post-8.mp4", poster: "assets/com/post-8.jpg", date: "2026-12-04", goal: "Conversion : montrer la livraison",
    work: "a18", overlay: "Unboxing d'une pièce unique",
    text: "Unboxing d'une pièce unique 📦\nEmballée à la main par l'artiste, avec un petit mot.\nC'est ça, acheter à un artiste plutôt qu'à une usine.\n\n#unboxing #faitmain #cadeaudenoel #art" },
  { n: 9, network: "Instagram", format: "Post image (1080 × 1350)", date: "2026-12-07", goal: "Fidélisation : artiste de la semaine",
    work: "a20", overlay: "Artiste de la semaine",
    text: "Artiste de la semaine : Zia Okafor 🧶\nÀ Lille, elle crochète chaque pièce à la main, une par une : pulls, sacs, housses de coussin.\nSon record ? Un pull en 40 heures.\n\nSa boutique est sur ATYPIIK, lien en bio.\n\n#crochet #faitmain #tricot #artistedelasemaine" },
];

const CALENDAR = [
  ["Semaine 1 · 16-22 nov.", "Ouverture au public", ["Lun. 16 : post 1, carrousel d'ouverture (Instagram)", "Mar. 17 : post 2, dans l'atelier (TikTok)", "Mer. 18 : post 3, déco murale (Pinterest)", "Jeu. 19 : newsletter n° 1, « ATYPIIK ouvre au public »", "Sam. 21 : stand au marché de créateurs local"]],
  ["Semaine 2 · 23-29 nov.", "Recrutement d'artistes", ["Lun. 23 : post 4, artiste garde 90 % (Instagram)", "Mer. 25 : post 5, notre sélection (TikTok)", "Mer. 25 : visite d'une école d'art (piste de partenariat)", "Jeu. 26 : newsletter n° 2, coups de cœur", "Ven. 27 : post 6, cadeaux de Noël (Pinterest)"]],
  ["Semaine 3 · 30 nov.-6 déc.", "Drop de Noël", ["Mar. 1er : post 7, story du drop (Instagram)", "Jeu. 3 : newsletter n° 3, rappel du drop", "Ven. 4 : post 8, unboxing (TikTok)", "Ven. 4 à 18 h : ouverture du drop céramique", "Sam. 5 : live Instagram avec l'artiste du drop"]],
  ["Semaine 4 · 7-13 déc.", "Derniers cadeaux", ["Lun. 7 : post 9, artiste de la semaine (Instagram)", "Mer. 9 : rappel « commande avant le 15 pour Noël » (stories)", "Jeu. 10 : newsletter n° 4, idées cadeaux de dernière minute", "Ven. 11 : bilan des indicateurs et choix des posts à reconduire"]],
];

const PARTNERS = [
  { name: "Une école d'art (ex. : les Beaux-Arts de la ville)", kind: "École",
    offer: "Six mois d'Atelier Pro offerts aux diplômés et une vitrine « Jeunes diplômés » sur la page d'accueil.",
    gain: "Un débouché concret pour ses étudiants, valorisé dans son taux d'insertion professionnelle." },
  { name: "Ateliers d'Art de France", kind: "Organisation professionnelle",
    offer: "Une réduction sur l'offre Pro pour ses membres et un atelier en ligne « vendre ses créations sur internet ».",
    gain: "Un service numérique supplémentaire pour ses adhérents, sans développement à financer." },
  { name: "Un concept store de créateurs", kind: "Lieu",
    offer: "Une exposition éphémère d'artistes ATYPIIK un week-end par mois, avec QR codes vers les boutiques en ligne.",
    gain: "Des animations gratuites qui attirent du monde en boutique, et une commission sur les ventes faites sur place." },
  { name: "Une créatrice de contenu déco (20 000 à 80 000 abonnés)", kind: "Créatrice de contenu",
    offer: "Une pièce offerte, un code promo de 10 % pour sa communauté et 5 % des ventes générées par son code.",
    gain: "Un contenu original pour sa communauté et une rémunération liée aux ventes." },
  { name: "Un magazine ou média art et déco en ligne", kind: "Média",
    offer: "Une rubrique mensuelle « l'artiste à suivre » écrite avec nous, et un jeu-concours pour gagner une œuvre.",
    gain: "Du contenu exclusif et un jeu-concours qui fait grandir son audience." },
];

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
  cost: "Estimation : pour une œuvre vendue 200 €, l'artiste perd 80 € sur Saatchi Art (40 %) et 100 € sur Singulart (50 %), contre 20 € sur ATYPIIK (10 %).",
};

const PERSONAS = [
  { name: "Clara", age: 27, job: "Chargée de communication à Lyon", side: "Acheteuse", photo: "a19",
    budget: "40 à 150 € par achat, environ 400 € par an pour la déco et les cadeaux",
    info: "Instagram, Pinterest, TikTok, newsletters de concept stores",
    need: "Une pièce unique qui raconte une histoire, pour son appartement ou pour offrir, sans mettre le prix d'une galerie.",
    pain: "Sur les grandes plateformes, elle ne sait pas si l'objet est vraiment fait main ou revendu." },
  { name: "Hugo", age: 31, job: "Illustrateur et céramiste à Marseille", side: "Artiste", photo: "a12",
    budget: "0 à 20 € par mois pour ses outils de vente",
    info: "Instagram, YouTube, groupes Facebook d'artistes, salons et marchés de créateurs",
    need: "Vendre en ligne entre deux marchés, être payé vite et garder l'essentiel du prix.",
    pain: "Il vend surtout en direct sur Instagram : paiements à la main, pas de suivi, et il ne veut pas laisser 40 à 50 % à une galerie en ligne." },
];

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
  { name: "ATYPIIK", type: "Boutique d'artistes émergents sélectionnés", fee: "10 % (Atelier, sans abonnement) ou 7 % + 12,90 € HT / mois (Atelier Pro), frais de paiement inclus", buyer: "Prix fixé librement par chaque artiste, sans frais de service pour l'acheteur", diff: "Sélection à la main, artiste qui garde 90 à 93 %, drops et commandes sur mesure.", src: [], us: true },
];

const PRICING = [
  ["Concurrents", "Les galeries en ligne prennent 40 à 50 % ; Etsy, sans sélection, revient à environ 11 % sur une vente de 50 € (6,5 % + 4 % + 0,30 € + annonce). À 10 %, ATYPIIK est le moins cher des acteurs qui sélectionnent leurs artistes, et au niveau d'Etsy.", ["saatchi", "singulart", "etsyFees"]],
  ["Coûts", "Le paiement par carte européenne coûte environ 1,5 % + 0,25 € par transaction. Sur un panier de 90 €, notre commission de 9 € TTC fait 7,50 € HT ; après 1,60 € de frais de paiement, il reste 5,90 € de marge brute HT.", ["stripe"]],
  ["Valeur pour le client", "L'artiste qui vend 200 € garde 180 € chez nous contre 100 € à 120 € en galerie en ligne. L'offre Pro devient rentable pour lui au-delà de 430 € de ventes par mois : 3 % d'économie de commission × 430 € ≈ 12,90 € (516 € pour un artiste non assujetti à la TVA, qui paie 15,48 € TTC).", []],
];

const MODEL = {
  how: [
    "Une commission sur chaque vente : 10 % avec l'offre Atelier, 7 % avec Atelier Pro. L'acheteur ne paie aucun frais de service, seulement l'œuvre et la livraison.",
    "Un abonnement Atelier Pro à 12,90 € HT par mois pour les artistes qui vendent régulièrement.",
    "Plus tard : shootings photo et emballages vendus en option aux artistes.",
  ],
  goal: "Objectif à 12 mois : 3 000 € HT de chiffre d'affaires par mois (novembre 2027).",
  rows: [
    ["Artistes en Atelier Pro", "120 artistes × 12,90 € HT", 1548],
    ["Volume de ventes mensuel", "220 commandes × 90 € de panier moyen = 19 800 € TTC", null],
    ["Commissions", "19 800 € × 9,1 % de commission moyenne (70 % des artistes en Atelier à 10 %, 30 % en Pro à 7 %) = 1 801,80 € TTC, soit 1 501,50 € HT", 1501.5],
  ],
  hypotheses: "Hypothèses (estimations) : panier moyen de 90 €, au milieu du budget de notre persona acheteuse (40 à 150 € par achat), à confirmer avec les premières ventes ; 400 artistes inscrits dont 30 % en Pro (120) ; un artiste vend en moyenne 0,55 pièce par mois (220 commandes).",
};
