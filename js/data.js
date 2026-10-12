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

const SEED_DISPUTES = [
  { id: "L-1042", order: "CMD-2025-0871", buyer: "Camille R.", reason: "Colis abîmé à la livraison", amount: 210, status: "ouvert" },
];

/* Ventes passées (démo) pour l'espace artiste et les commissions. */
const SEED_SALES = [
  { order: "CMD-2026-0912", date: "2026-09-28", buyer: "Hugo L.", work: "a7", qty: 1, price: 1250, status: 3 },
  { order: "CMD-2026-0944", date: "2026-10-03", buyer: "Sarah B.", work: "a1", qty: 1, price: 480, status: 2 },
  { order: "CMD-2026-0961", date: "2026-10-06", buyer: "Marc D.", work: "a3", qty: 2, price: 120, status: 1 },
  { order: "CMD-2026-0975", date: "2026-10-09", buyer: "Jade P.", work: "a8", qty: 1, price: 210, status: 1 },
  { order: "CMD-2026-0980", date: "2026-10-10", buyer: "Yanis K.", work: "a2", qty: 1, price: 1650, status: 3 },
];
