/* Données de démonstration — à remplacer par l'API (PostgreSQL) plus tard. */

const ARTISTS = [
  { id: "nova", name: "Nova Lune", city: "Marseille", bio: "Peintre de l'aube numérique, entre néons et matières brutes." },
  { id: "kairo", name: "Kairo Sato", city: "Lyon", bio: "Sculpteur métal, obsédé par les surfaces miroir." },
  { id: "ines", name: "Inès Vale", city: "Paris", bio: "Photographe argentique des villes la nuit." },
  { id: "milo", name: "Milo Arden", city: "Bordeaux", bio: "Abstraction géométrique et couleurs saturées." },
  { id: "zia", name: "Zia Okafor", city: "Lille", bio: "Textile, résine et installations lumineuses." },
];

/* Chaque œuvre est « peinte » en CSS pour ne dépendre d'aucune image externe. */
const ARTWORKS = [
  {
    id: "a1", title: "Rose Protocol", artist: "nova", type: "Peinture", color: "rose", size: "M", price: 480,
    technique: "Acrylique et pigments fluo sur toile", dims: "60 × 80 cm",
    art: "radial-gradient(circle at 30% 30%, #ff2bd6, transparent 45%), radial-gradient(circle at 70% 70%, #ff1f8f, transparent 50%), linear-gradient(160deg, #1a0010, #3d0026)",
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
    id: "a3", title: "Néon 3h du matin", artist: "ines", type: "Photographie", color: "rose", size: "S", price: 120,
    technique: "Tirage fine art, papier baryté", dims: "30 × 40 cm",
    art: "linear-gradient(180deg, #05050a 0%, #160822 45%, #ff1f8f 46%, #2a0b2e 48%, #05050a 100%)",
    variants: [
      { label: "30 × 40 cm", stock: 4 },
      { label: "50 × 70 cm", stock: 2 },
      { label: "70 × 100 cm", stock: 0 },
    ],
  },
  {
    id: "a4", title: "Grille Infinie", artist: "milo", type: "Peinture", color: "vert", size: "M", price: 690,
    technique: "Huile et feuille d'argent", dims: "70 × 70 cm",
    art: "repeating-linear-gradient(45deg, #07af4f 0 14px, #0b0b12 14px 28px), linear-gradient(#07af4f, #0b0b12)",
    variants: [{ label: "Original", stock: 1 }],
  },
  {
    id: "a5", title: "Halo Mercure", artist: "kairo", type: "Sculpture", color: "argent", size: "S", price: 340,
    technique: "Aluminium anodisé", dims: "20 × 20 × 30 cm",
    art: "radial-gradient(circle at 50% 45%, #ffffff 0 8%, #bfc3cb 20%, #5b5f68 42%, #0c0c12 70%)",
    variants: [
      { label: "Argent", stock: 3 },
      { label: "Rose chromé", stock: 0 },
    ],
  },
  {
    id: "a6", title: "Fréquence", artist: "zia", type: "Textile", color: "bleu", size: "L", price: 920,
    technique: "Tissage, fibre optique", dims: "100 × 150 cm",
    art: "repeating-radial-gradient(circle at 50% 120%, #2b6bff 0 6px, #0a0a14 6px 18px)",
    variants: [{ label: "Original", stock: 1 }],
  },
  {
    id: "a7", title: "Bubblegum Void", artist: "nova", type: "Peinture", color: "rose", size: "L", price: 1250,
    technique: "Aérosol et vernis holographique", dims: "100 × 120 cm",
    art: "radial-gradient(ellipse at 20% 80%, #ff7ac0, transparent 50%), radial-gradient(ellipse at 80% 20%, #ff2bd6, transparent 45%), linear-gradient(135deg, #0c0010, #2a0030)",
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
    id: "a9", title: "Cellule Verte", artist: "milo", type: "Peinture", color: "vert", size: "S", price: 260,
    technique: "Gouache sur papier", dims: "30 × 30 cm",
    art: "radial-gradient(circle at 50% 50%, #19f57a 0 18%, #07af4f 19% 34%, #0b0b12 35% 52%, #19f57a 53% 56%, #0b0b12 57%)",
    variants: [{ label: "Original", stock: 0 }],
  },
  {
    id: "a10", title: "Résine Aurore", artist: "zia", type: "Sculpture", color: "rose", size: "M", price: 780,
    technique: "Résine teintée, LED", dims: "35 × 35 × 50 cm",
    art: "linear-gradient(200deg, #ff1f8f 0%, #ffb3d9 30%, #e6e8ec 55%, #7a7f89 80%, #0b0b12 100%)",
    variants: [
      { label: "Rose", stock: 2 },
      { label: "Argent", stock: 1 },
    ],
  },
  {
    id: "a11", title: "Interférence", artist: "milo", type: "Peinture", color: "bleu", size: "L", price: 1420,
    technique: "Acrylique sur aluminium", dims: "90 × 120 cm",
    art: "repeating-conic-gradient(from 0deg at 50% 50%, #2b6bff 0 10deg, #0a0a14 10deg 20deg, #ff1f8f 20deg 30deg, #0a0a14 30deg 40deg)",
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
  rose: "#ff1f8f",
  argent: "linear-gradient(135deg,#fff,#8c9099)",
  vert: "#07af4f",
  bleu: "#2b6bff",
  noir: "#111",
};
