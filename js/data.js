/* Données de démonstration — à remplacer par l'API (PostgreSQL) plus tard. */

const ARTISTS = [
  {
    id: "nova", name: "Nova Lune", city: "Marseille", followers: 1840,
    bio: "Peintre de l'aube numérique, entre lumières urbaines et matières brutes.",
    videos: ["Atelier : préparation des pigments", "Making-of de Bordeaux Protocol"],
    press: ["Dossier de presse 2026.pdf", "Article — Beaux Arts Magazine.pdf"],
  },
  {
    id: "kairo", name: "Kairo Sato", city: "Lyon", followers: 960,
    bio: "Sculpteur métal, obsédé par les surfaces miroir.",
    videos: ["Polissage miroir en 4 minutes"],
    press: ["Portfolio Kairo Sato.pdf"],
  },
  {
    id: "ines", name: "Inès Vale", city: "Paris", followers: 2310,
    bio: "Photographe argentique des villes la nuit.",
    videos: ["Une nuit de prise de vue à Pigalle", "Tirage en chambre noire"],
    press: ["Dossier de presse Inès Vale.pdf"],
  },
  {
    id: "milo", name: "Milo Arden", city: "Bordeaux", followers: 640,
    bio: "Abstraction géométrique et couleurs saturées.",
    videos: [],
    press: ["CV artistique.pdf"],
  },
  {
    id: "zia", name: "Zia Okafor", city: "Lille", followers: 1205,
    bio: "Textile, résine et installations lumineuses.",
    videos: ["Coulisses de l'expo Fréquence"],
    press: [],
  },
];

/* Chaque œuvre est « peinte » en CSS pour ne dépendre d'aucune image externe. */
const ARTWORKS = [
  {
    id: "a1", title: "Bordeaux Protocol", artist: "nova", type: "Peinture", color: "bordeaux", size: "M", price: 480,
    technique: "Acrylique et pigments sur toile", dims: "60 × 80 cm",
    art: "radial-gradient(circle at 30% 30%, #9b3446, transparent 45%), radial-gradient(circle at 70% 70%, #6d1a2a, transparent 50%), linear-gradient(160deg, #1d0a0e, #3a0f19)",
    variants: [{ label: "Original", stock: 1 }],
  },
  {
    id: "a2", title: "Liquid Chrome", artist: "kairo", type: "Sculpture", color: "argent", size: "L", price: 1650,
    technique: "Acier inoxydable poli miroir", dims: "45 × 45 × 120 cm",
    art: "conic-gradient(from 200deg at 40% 40%, #f6f7f9, #6f747e, #ffffff, #3b3f47, #d5d8de, #f6f7f9)",
    variants: [{ label: "Original", stock: 0 }],
    sold: true,
  },
  {
    id: "a3", title: "Néon 3 h du matin", artist: "ines", type: "Photographie", color: "bordeaux", size: "S", price: 120,
    technique: "Tirage fine art, papier baryté", dims: "30 × 40 cm",
    art: "linear-gradient(180deg, #05050a 0%, #1a0c10 45%, #6d1a2a 46%, #2b0d14 48%, #05050a 100%)",
    variants: [
      { label: "30 × 40 cm", stock: 4 },
      { label: "50 × 70 cm", stock: 2 },
      { label: "70 × 100 cm", stock: 0 },
    ],
  },
  {
    id: "a4", title: "Grille Infinie", artist: "milo", type: "Peinture", color: "beige", size: "M", price: 690,
    technique: "Huile et feuille d'argent", dims: "70 × 70 cm",
    art: "repeating-linear-gradient(45deg, #6d1a2a 0 14px, #141111 14px 28px), linear-gradient(#6d1a2a, #141111)",
    variants: [{ label: "Original", stock: 1 }],
  },
  {
    id: "a5", title: "Halo Mercure", artist: "kairo", type: "Sculpture", color: "argent", size: "S", price: 340,
    technique: "Aluminium anodisé", dims: "20 × 20 × 30 cm",
    art: "radial-gradient(circle at 50% 45%, #ffffff 0 8%, #bfc3cb 20%, #5b5f68 42%, #0c0c12 70%)",
    variants: [
      { label: "Argent", stock: 3 },
      { label: "Bordeaux chromé", stock: 0 },
    ],
  },
  {
    id: "a6", title: "Fréquence", artist: "zia", type: "Textile", color: "ardoise", size: "L", price: 920,
    technique: "Tissage, fibre optique", dims: "100 × 150 cm",
    art: "repeating-radial-gradient(circle at 50% 120%, #3a3f4a 0 6px, #151213 6px 18px)",
    variants: [{ label: "Original", stock: 1 }],
  },
  {
    id: "a7", title: "Velours Noir", artist: "nova", type: "Peinture", color: "bordeaux", size: "L", price: 1250,
    technique: "Aérosol et vernis satiné", dims: "100 × 120 cm",
    art: "radial-gradient(ellipse at 20% 80%, #c48a86, transparent 50%), radial-gradient(ellipse at 80% 20%, #9b3446, transparent 45%), linear-gradient(135deg, #160a0c, #33101a)",
    variants: [{ label: "Original", stock: 1 }],
  },
  {
    id: "a8", title: "Pluie d'argent", artist: "ines", type: "Photographie", color: "argent", size: "M", price: 210,
    technique: "Tirage pigmentaire", dims: "50 × 70 cm",
    art: "repeating-linear-gradient(100deg, rgba(255,255,255,.55) 0 1px, transparent 1px 9px), linear-gradient(180deg, #2a2d33, #08080c)",
    variants: [
      { label: "50 × 70 cm", stock: 5 },
      { label: "Encadré", stock: 1 },
    ],
  },
  {
    id: "a9", title: "Cellule Beige", artist: "milo", type: "Peinture", color: "beige", size: "S", price: 260,
    technique: "Gouache sur papier", dims: "30 × 30 cm",
    art: "radial-gradient(circle at 50% 50%, #d9c9b0 0 18%, #6d1a2a 19% 34%, #141111 35% 52%, #d9c9b0 53% 56%, #141111 57%)",
    variants: [{ label: "Original", stock: 0 }],
  },
  {
    id: "a10", title: "Résine Aurore", artist: "zia", type: "Sculpture", color: "bordeaux", size: "M", price: 780,
    technique: "Résine teintée, LED", dims: "35 × 35 × 50 cm",
    art: "linear-gradient(200deg, #6d1a2a 0%, #e6d2c3 30%, #e6e8ec 55%, #7a7f89 80%, #141111 100%)",
    variants: [
      { label: "Bordeaux", stock: 2 },
      { label: "Argent", stock: 1 },
    ],
  },
  {
    id: "a11", title: "Interférence", artist: "milo", type: "Peinture", color: "ardoise", size: "L", price: 1420,
    technique: "Acrylique sur aluminium", dims: "90 × 120 cm",
    art: "repeating-conic-gradient(from 0deg at 50% 50%, #3a3f4a 0 10deg, #151213 10deg 20deg, #6d1a2a 20deg 30deg, #151213 30deg 40deg)",
    variants: [{ label: "Original", stock: 1 }],
  },
  {
    id: "a12", title: "Miroir Noir", artist: "kairo", type: "Sculpture", color: "noir", size: "M", price: 990,
    technique: "Obsidienne et chrome", dims: "30 × 30 × 60 cm",
    art: "linear-gradient(135deg, #000 0%, #2b2e35 40%, #e9ebef 50%, #2b2e35 60%, #000 100%)",
    variants: [{ label: "Original", stock: 1 }],
  },
  {
    id: "a13", title: "Veste Atelier", artist: "zia", type: "Mode", color: "noir", size: "M", price: 540,
    technique: "Toile de coton peinte à la main, pièce unique", dims: "Taille M",
    art: "linear-gradient(160deg, #1a1717 0%, #3a2a28 55%, #6d1a2a 100%)",
    variants: [
      { label: "S", stock: 0 },
      { label: "M", stock: 1 },
      { label: "L", stock: 1 },
    ],
  },
  {
    id: "a14", title: "Robe Dune", artist: "zia", type: "Mode", color: "beige", size: "M", price: 690,
    technique: "Lin teint à la main", dims: "Taille unique",
    art: "linear-gradient(180deg, #efe8dc 0%, #d9c9b0 60%, #b9a587 100%)",
    variants: [{ label: "Taille unique", stock: 2 }],
  },
  {
    id: "a15", title: "Bague Mercure", artist: "kairo", type: "Bijoux", color: "argent", size: "S", price: 180,
    technique: "Argent 925 poli miroir", dims: "Tailles 50 à 58",
    art: "radial-gradient(circle at 50% 50%, #ffffff 0 10%, #c4c8cf 22%, #7d828c 34%, #efe8dc 35%)",
    variants: [
      { label: "52", stock: 2 },
      { label: "54", stock: 3 },
      { label: "56", stock: 0 },
    ],
  },
  {
    id: "a16", title: "Créoles Bordeaux", artist: "nova", type: "Bijoux", color: "bordeaux", size: "S", price: 145,
    technique: "Laiton doré et émail bordeaux", dims: "Ø 3,5 cm",
    art: "radial-gradient(circle at 50% 50%, #efe8dc 0 26%, #6d1a2a 27% 36%, #efe8dc 37%)",
    variants: [{ label: "Paire", stock: 4 }],
  },
  {
    id: "a17", title: "Vase Sillon", artist: "milo", type: "Céramique", color: "beige", size: "M", price: 230,
    technique: "Grès émaillé, tourné à la main", dims: "18 × 32 cm",
    art: "linear-gradient(180deg, #faf8f4 0%, #e4dacb 50%, #c9b79c 100%)",
    variants: [{ label: "Original", stock: 1 }],
  },
];

const COLORS = {
  bordeaux: "#6d1a2a",
  beige: "#d9c9b0",
  argent: "linear-gradient(135deg,#fff,#8c9099)",
  ardoise: "#3a3f4a",
  noir: "#141111",
};

/* Données de démo pour l'espace administrateur. */
const SEED_PENDING_SELLERS = [
  { id: "p1", name: "Léa Moreau", email: "lea.moreau@exemple.fr", city: "Nantes", discipline: "Céramique", status: "en attente" },
  { id: "p2", name: "Studio Ghost", email: "hello@studioghost.fr", city: "Toulouse", discipline: "Sérigraphie", status: "en attente" },
];

/* Litiges (démo). Les photos de démonstration réutilisent le visuel de l'œuvre concernée ;
   les vraies photos envoyées par les acheteurs sont stockées en image (data URL). */
const SEED_DISPUTES = [
  {
    id: "L-1042",
    order: "CMD-2026-0975",
    work: "a8",
    buyer: "Jade P.",
    date: "2026-10-12",
    reason: "Colis abîmé à la livraison",
    description:
      "Le carton était enfoncé sur un côté et le verre du cadre est fêlé dans le coin inférieur droit. Le tirage lui-même a l'air intact mais je ne peux pas l'accrocher comme ça.",
    amount: 210,
    status: "ouvert",
    photos: [
      { work: "a8", caption: "Œuvre à la réception" },
      { work: "a8", caption: "Détail du coin fêlé", zoom: true },
      { work: "a8", caption: "Emballage", tone: "carton" },
    ],
    messages: [
      { from: "buyer", date: "2026-10-12", text: "Bonjour, le colis est arrivé abîmé, j'ai mis les photos. Que peut-on faire ?" },
      { from: "artist", date: "2026-10-13", text: "Je suis désolée ! Je peux renvoyer un nouveau cadre, ou vous rembourser la différence si vous gardez le tirage." },
    ],
    history: [
      { date: "2026-10-12", text: "Litige ouvert par l'acheteur" },
      { date: "2026-10-13", text: "Réponse de l'artiste" },
    ],
  },
];

/* Posts des artistes : nouvelles, coulisses, expositions. */
const SEED_POSTS = [
  {
    id: "p-nova-1", artist: "nova", date: "2026-10-10", title: "Une nouvelle série en préparation",
    text: "Je travaille depuis cet été sur une série de six toiles autour des lumières de Marseille la nuit. Les premières sont presque sèches, je vous montre bientôt le résultat. Merci à toutes les personnes qui suivent l'atelier !",
    media: { work: "a7" },
  },
  {
    id: "p-nova-2", artist: "nova", date: "2026-09-21", title: "Dans l'atelier",
    text: "Petite visite de l'atelier : les pigments, les toiles en attente, et la fameuse table pleine de pots. Une vidéo des coulisses est disponible sur ma page.",
    media: { work: "a1", video: true },
  },
  {
    id: "p-nova-3", artist: "nova", date: "2026-08-30", title: "Exposition au Panier",
    text: "Trois de mes toiles sont exposées tout le mois de septembre dans une petite galerie du quartier du Panier. Venez dire bonjour le samedi !",
    media: { work: "a16" },
  },
  {
    id: "p-ines-1", artist: "ines", date: "2026-10-08", title: "Nuit de prise de vue",
    text: "Toute une nuit à Pigalle pour la nouvelle série. Quarante pellicules, trois images retenues. C'est ça aussi, l'argentique.",
    media: { work: "a3", video: true },
  },
  {
    id: "p-ines-2", artist: "ines", date: "2026-09-15", title: "Les tirages encadrés arrivent",
    text: "Vous me l'avez beaucoup demandé : « Pluie d'argent » existe maintenant en version encadrée, en série limitée.",
    media: { work: "a8" },
  },
  {
    id: "p-kairo-1", artist: "kairo", date: "2026-10-02", title: "Le polissage, étape par étape",
    text: "Une pièce miroir, c'est environ vingt heures de polissage. Je vous explique les grains, les pâtes et la patience qu'il faut.",
    media: { work: "a5", video: true },
  },
  {
    id: "p-zia-1", artist: "zia", date: "2026-09-27", title: "Fréquence, la suite",
    text: "Après l'exposition de Lille, je reprends le tissage avec de la fibre optique pour une pièce encore plus grande.",
    media: { work: "a6" },
  },
];
/* Ventes passées (démo) pour l'espace artiste et les commissions. */
const SEED_SALES = [
  { order: "CMD-2026-0912", date: "2026-09-28", buyer: "Hugo L.", work: "a7", qty: 1, price: 1250, status: 3 },
  { order: "CMD-2026-0944", date: "2026-10-03", buyer: "Sarah B.", work: "a1", qty: 1, price: 480, status: 2 },
  { order: "CMD-2026-0961", date: "2026-10-06", buyer: "Marc D.", work: "a3", qty: 2, price: 120, status: 1 },
  { order: "CMD-2026-0975", date: "2026-10-09", buyer: "Jade P.", work: "a8", qty: 1, price: 210, status: 1 },
  { order: "CMD-2026-0980", date: "2026-10-10", buyer: "Yanis K.", work: "a2", qty: 1, price: 1650, status: 3 },
];

/* « Notre histoire » — la citation est une proposition, à ajuster librement. */
const STORY = {
  founder: "Lilou Capanni",
  role: "Fondatrice d'ATYPIIK",
  photo: "assets/photos/fondatrice.jpg",
  intro:
    "J'ai lancé ATYPIIK pour que les artistes et les esprits créatifs aient enfin un endroit à eux : un lieu pour montrer leur talent, leur savoir-faire, et vendre ce qu'ils créent.",
  quote: "Tout le monde n'a pas les moyens de créer sa marque. Tout le monde mérite d'être vu.",
  chapters: [
    {
      title: "Le constat",
      text: "Autour de moi, je vois des gens incroyablement doués : peintres, créatrices de bijoux, couturiers, photographes. Beaucoup n'ont ni site, ni marque, ni budget pour se lancer, et leur travail reste dans l'atelier ou sur un compte Instagram.",
    },
    {
      title: "L'idée",
      text: "Créer un espace qui leur appartient, où l'on vient pour l'art dans sa globalité. Chaque artiste y a sa page, ses œuvres, ses coulisses, et vend en direct, sans avoir à tout construire seul.",
    },
    {
      title: "La mission",
      text: "Mettre en avant le talent et le savoir-faire, permettre à chacun de vendre et de partager son art, et donner aux acheteurs l'envie de vivre avec des pièces qui ont une histoire.",
    },
  ],
};
