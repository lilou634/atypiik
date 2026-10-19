/* Données de démonstration — à remplacer par l'API (PostgreSQL) plus tard. */

const ARTISTS = [
  {
    id: "nova", name: "Nova Lune", city: "Marseille", followers: 1840,
    bio: "Peintre. Des scènes calmes, des corps en mouvement, beaucoup d'eau et de lumière.",
    videos: ["Atelier : préparation des fonds", "Making-of de « Deux nageurs »"],
    press: ["Dossier de presse 2026.pdf", "Article — Beaux Arts Magazine.pdf"],
  },
  {
    id: "ines", name: "Inès Vale", city: "Paris", followers: 2310,
    bio: "Photographe de rue et de voyage. Tirages signés, en séries limitées.",
    videos: ["Une matinée sur le Tour de France", "Le tirage, étape par étape"],
    press: ["Dossier de presse Inès Vale.pdf"],
  },
  {
    id: "margaux", name: "Margaux Pech", city: "Nantes", followers: 3120,
    bio: "Céramiste. Faïence modelée et peinte à la main : jamais deux pièces pareilles.",
    videos: ["Tournage et peinture des vases rayés"],
    press: ["Portfolio Margaux Pech.pdf"],
  },
  {
    id: "oko", name: "Atelier Oko", city: "Bordeaux", followers: 980,
    bio: "Duo de céramistes : porcelaine, grès et objets de jeu pour la maison.",
    videos: ["Peindre une boîte d'allumettes"],
    press: [],
  },
  {
    id: "rosa", name: "Rosa Mendes", city: "Montpellier", followers: 2640,
    bio: "Upcycling. Des vestes et des pièces uniques taillées dans des tissus anciens et des vêtements chinés.",
    videos: ["Du canevas à la veste", "Essayage de la collection"],
    press: ["Dossier de presse Rosa Mendes.pdf"],
  },
  {
    id: "zia", name: "Zia Okafor", city: "Lille", followers: 1205,
    bio: "Crochet et maille. Chaque pièce est faite à la main, une par une.",
    videos: ["Un pull en 40 heures"],
    press: [],
  },
  {
    id: "kairo", name: "Kairo Sato", city: "Lyon", followers: 760,
    bio: "Objets et petites sculptures pour la maison, entre jeu et contemplation.",
    videos: [],
    press: ["Portfolio Kairo Sato.pdf"],
  },
  {
    id: "leonie", name: "Léonie Garnier", city: "Nice", followers: 1490,
    bio: "Bijoux en pierres naturelles et perles, montés à la main dans mon atelier.",
    videos: ["Monter un collier"],
    press: [],
  },
];

/* Catalogue de démonstration, illustré par de vraies photos (assets/photos/). */
const ARTWORKS = [
  {
    id: "a1", title: "Deux nageurs", artist: "nova", type: "Peinture", color: "vert", size: "L", price: 1450,
    technique: "Huile sur toile, caisse américaine en chêne", dims: "80 × 100 cm",
    description: "Deux silhouettes flottent dans une eau profonde peinte à grands coups de couteau.",
    img: "assets/photos/a1.jpg", art: "#768b74",
    variants: [{ label: "Original", stock: 1 }], isNew: true,
  },
  {
    id: "a2", title: "Promenade", artist: "nova", type: "Peinture", color: "bleu", size: "L", price: 1800,
    technique: "Huile sur toile", dims: "100 × 140 cm",
    description: "Un pas pressé, deux dalmatiens, un fond bleu ciel : une scène de rue figée en plein mouvement.",
    img: "assets/photos/a2.jpg", art: "#9b9693",
    variants: [{ label: "Original", stock: 1 }],
  },
  {
    id: "a3", title: "Fenêtre aux rosiers", artist: "nova", type: "Peinture", color: "jaune", size: "S", price: 95,
    technique: "Acrylique sur mini-toile", dims: "15 × 15 cm",
    description: "Une petite fenêtre provençale envahie de rosiers.",
    img: "assets/photos/a3.jpg", art: "#9f8b65",
    variants: [{ label: "Original", stock: 0 }], sold: true,
  },
  {
    id: "a4", title: "Café de la Poste", artist: "ines", type: "Photographie", color: "bleu", size: "M", price: 320,
    technique: "Tirage pigmentaire, cadre en noyer", dims: "40 × 50 cm",
    description: "Le passage du peloton devant un café de village, pris au 1/15e de seconde.",
    img: "assets/photos/a4.jpg", art: "#9e8f85",
    variants: [{ label: "40 × 50 cm encadré", stock: 3 }, { label: "60 × 80 cm encadré", stock: 1 }], isNew: true,
  },
  {
    id: "a5", title: "Lac, onze heures", artist: "ines", type: "Photographie", color: "bleu", size: "L", price: 890,
    technique: "Tirage fine art, caisse blanche", dims: "100 × 70 cm",
    description: "Une piscine au bord d'un lac italien, en fin de matinée.",
    img: "assets/photos/a5.jpg", art: "#797b7d",
    variants: [{ label: "70 × 50 cm", stock: 2 }, { label: "100 × 70 cm", stock: 1 }],
  },
  {
    id: "a6", title: "Vases rayés", artist: "margaux", type: "Céramique", color: "multicolore", size: "M", price: 85,
    technique: "Faïence modelée et peinte à la main", dims: "12 à 24 cm",
    description: "Des vases aux formes souples, rayés au pinceau.",
    img: "assets/photos/a6.jpg", art: "#ac998e",
    variants: [{ label: "Petit — jaune", stock: 3 }, { label: "Moyen — rose", stock: 2 }, { label: "Grand — bleu", stock: 0 }], isNew: true,
  },
  {
    id: "a7", title: "Tasses empilables", artist: "margaux", type: "Céramique", color: "noir", size: "S", price: 34,
    technique: "Grès émaillé", dims: "8 × 8 cm",
    description: "Des tasses qui s'empilent, à l'anse percée.",
    img: "assets/photos/a7.jpg", art: "#b3b0ab",
    variants: [{ label: "Mouchetée", stock: 6 }, { label: "Terracotta", stock: 4 }, { label: "Rayée", stock: 0 }],
  },
  {
    id: "a8", title: "Assiette Dalmatien", artist: "margaux", type: "Céramique", color: "noir", size: "S", price: 48,
    technique: "Faïence émaillée", dims: "Ø 22 cm",
    description: "Une assiette creuse à pois noirs, émail brillant.",
    img: "assets/photos/a8.jpg", art: "#443f3d",
    variants: [{ label: "À l'unité", stock: 5 }],
  },
  {
    id: "a9", title: "Repose-cuillères Ravioli", artist: "margaux", type: "Céramique", color: "jaune", size: "S", price: 28,
    technique: "Faïence émaillée", dims: "12 × 12 cm",
    description: "Un repose-cuillère en forme de ravioli, pour la cuisine.",
    img: "assets/photos/a9.jpg", art: "#a69256",
    variants: [{ label: "Uni", stock: 5 }, { label: "Rayé", stock: 3 }, { label: "Vichy", stock: 2 }],
  },
  {
    id: "a10", title: "Boîtes à œufs", artist: "oko", type: "Céramique", color: "vert", size: "S", price: 42,
    technique: "Grès émaillé", dims: "6 ou 12 œufs",
    description: "Des boîtes à œufs aux bords ondulés.",
    img: "assets/photos/a10.jpg", art: "#8e856c",
    variants: [{ label: "Céladon — 12 œufs", stock: 2 }, { label: "Moucheté — 6 œufs", stock: 4 }],
  },
  {
    id: "a11", title: "Échecs Bonbon", artist: "oko", type: "Maison & déco", color: "multicolore", size: "M", price: 260,
    technique: "Pièces en céramique, plateau en bois peint", dims: "40 × 40 cm",
    description: "Un jeu d'échecs aux pièces modelées une à une, rose et vert.",
    img: "assets/photos/a11.jpg", art: "#85715e",
    variants: [{ label: "Original", stock: 1 }], isNew: true,
  },
  {
    id: "a12", title: "Boîtes d'allumettes", artist: "oko", type: "Céramique", color: "bleu", size: "S", price: 39,
    technique: "Porcelaine peinte, rehauts d'or", dims: "6 × 4 cm",
    description: "Des boîtes d'allumettes en porcelaine, avec un message doré à l'intérieur.",
    img: "assets/photos/a12.jpg", art: "#958f88",
    variants: [{ label: "Léopard", stock: 2 }, { label: "Crabe", stock: 1 }, { label: "Lapin", stock: 3 }, { label: "Colombe", stock: 0 }],
  },
  {
    id: "a13", title: "Cadres galets", artist: "oko", type: "Céramique", color: "multicolore", size: "S", price: 45,
    technique: "Céramique émaillée", dims: "10 à 15 cm",
    description: "De petits cadres photo aux formes de galets.",
    img: "assets/photos/a13.jpg", art: "#90817a",
    variants: [{ label: "Rouge", stock: 3 }, { label: "Bleu", stock: 2 }, { label: "Vert", stock: 4 }],
  },
  {
    id: "a14", title: "Bougeoirs fleurs", artist: "margaux", type: "Céramique", color: "rouge", size: "S", price: 32,
    technique: "Faïence peinte à la main", dims: "Ø 10 cm",
    description: "Des bougeoirs pour bougies chauffe-plat, en forme de fleur.",
    img: "assets/photos/a14.jpg", art: "#b49c90",
    variants: [{ label: "Rayé rouge", stock: 4 }, { label: "Rayé noir", stock: 3 }, { label: "Brique", stock: 2 }],
  },
  {
    id: "a15", title: "Le lecteur", artist: "kairo", type: "Maison & déco", color: "beige", size: "S", price: 120,
    technique: "Résine minérale mouchetée", dims: "18 × 20 cm",
    description: "Une petite figure plongée dans son livre.",
    img: "assets/photos/a15.jpg", art: "#886644",
    variants: [{ label: "Pièce", stock: 3 }],
  },
  {
    id: "a16", title: "Serre-livres Pause", artist: "kairo", type: "Maison & déco", color: "noir", size: "M", price: 160,
    technique: "Résine minérale, vendus par paire", dims: "26 cm",
    description: "Deux personnages qui retiennent vos livres.",
    img: "assets/photos/a16.jpg", art: "#aba7a5",
    variants: [{ label: "Crème et brun", stock: 2 }],
  },
  {
    id: "a17", title: "Dominos peints", artist: "kairo", type: "Maison & déco", color: "multicolore", size: "S", price: 75,
    technique: "Bois de hêtre peint à la main", dims: "28 pièces",
    description: "Un jeu de dominos peint à la main, couleur par couleur.",
    img: "assets/photos/a17.jpg", art: "#c6a898",
    variants: [{ label: "Boîte complète", stock: 4 }],
  },
  {
    id: "a18", title: "Pull Granny", artist: "zia", type: "Crochet", color: "bleu", size: "M", price: 180,
    technique: "Crochet main, laine mérinos", dims: "Taille unique",
    description: "Un pull ajouré à volants, crocheté à la main.",
    img: "assets/photos/a18.jpg", art: "#69767f",
    variants: [{ label: "Bleu et jaune", stock: 1 }, { label: "Rose et rouge", stock: 2 }], isNew: true,
  },
  {
    id: "a19", title: "Sac Nuage", artist: "zia", type: "Crochet", color: "beige", size: "M", price: 95,
    technique: "Crochet en trapilho", dims: "30 × 18 cm",
    description: "Un sac à main bombé, en fil de t-shirt recyclé.",
    img: "assets/photos/a19.jpg", art: "#a49c96",
    variants: [{ label: "Noir", stock: 2 }, { label: "Camel", stock: 3 }, { label: "Crème", stock: 1 }],
  },
  {
    id: "a20", title: "Housse Popcorn", artist: "zia", type: "Crochet", color: "rouge", size: "S", price: 55,
    technique: "Crochet en laine, pour ordinateur 13 à 14 pouces", dims: "35 × 25 cm",
    description: "Une housse d'ordinateur en point popcorn.",
    img: "assets/photos/a20.jpg", art: "#98756b",
    variants: [{ label: "Rouge", stock: 4 }, { label: "Crème", stock: 0 }],
  },
  {
    id: "a21", title: "Veste Mimosa", artist: "rosa", type: "Mode", color: "jaune", size: "M", price: 210,
    technique: "Coton matelassé, biais crème", dims: "Tailles S à L",
    description: "Une veste matelassée légère, à porter ouverte.",
    img: "assets/photos/a21.jpg", art: "#9a7d5b",
    variants: [{ label: "S", stock: 1 }, { label: "M", stock: 2 }, { label: "L", stock: 0 }],
  },
  {
    id: "a22", title: "Veste Voilier", artist: "rosa", type: "Mode", color: "bleu", size: "M", price: 340,
    technique: "Denim brut et canevas brodé ancien", dims: "Taille M",
    description: "Une veste en denim brut, avec un canevas de voilier chiné au dos.",
    img: "assets/photos/a22.jpg", art: "#747069",
    variants: [{ label: "Pièce unique — M", stock: 1 }], isNew: true,
  },
  {
    id: "a23", title: "Veste Pastorale", artist: "rosa", type: "Mode", color: "multicolore", size: "M", price: 290,
    technique: "Tapisserie ancienne, denim et coton imprimé", dims: "Taille S/M",
    description: "Une veste courte, manches bouffantes aux citrons et tapisserie au dos.",
    img: "assets/photos/a23.jpg", art: "#9c8b6f",
    variants: [{ label: "Pièce unique — S/M", stock: 1 }],
  },
  {
    id: "a24", title: "Veste Ruban", artist: "rosa", type: "Mode", color: "rouge", size: "L", price: 260,
    technique: "Toile imprimée, poches et col en denim", dims: "Tailles S/M ou L/XL",
    description: "Une veste zippée à grand motif rouge et rose.",
    img: "assets/photos/a24.jpg", art: "#84414a",
    variants: [{ label: "S/M", stock: 1 }, { label: "L/XL", stock: 1 }],
  },
  {
    id: "a25", title: "Blazer Perles", artist: "rosa", type: "Mode", color: "jaune", size: "M", price: 240,
    technique: "Blazer en laine chiné, perles de verre cousues main", dims: "Taille M",
    description: "Un blazer vintage brodé de perles colorées.",
    img: "assets/photos/a25.jpg", art: "#b6945d",
    variants: [{ label: "Pièce unique — M", stock: 1 }],
  },
  {
    id: "a26", title: "Cravate Fleurs", artist: "rosa", type: "Mode", color: "rouge", size: "S", price: 75,
    technique: "Fleurs en tissu cousues main", dims: "Longueur 140 cm",
    description: "Une cravate entièrement couverte de petites fleurs rouges.",
    img: "assets/photos/a26.jpg", art: "#614040",
    variants: [{ label: "Rouge", stock: 3 }],
  },
  {
    id: "a27", title: "Maillot Dentelle", artist: "rosa", type: "Mode", color: "rouge", size: "S", price: 85,
    technique: "Maillot de foot recyclé, liens et dentelle", dims: "Tailles S ou M",
    description: "Un maillot de foot retravaillé avec liens et dentelle.",
    img: "assets/photos/a27.jpg", art: "#e5a367",
    variants: [{ label: "S", stock: 1 }, { label: "M", stock: 1 }],
  },
  {
    id: "a28", title: "Collier Sienne", artist: "leonie", type: "Bijoux", color: "bordeaux", size: "S", price: 120,
    technique: "Œil-de-tigre, perles baroques, laiton doré", dims: "42 cm + chaînette",
    description: "Un collier asymétrique : œil-de-tigre d'un côté, perles baroques de l'autre.",
    img: "assets/photos/a28.jpg", art: "#d2c6b8",
    variants: [{ label: "Pièce", stock: 3 }], isNew: true,
  },
  {
    id: "a29", title: "Créoles Lagune", artist: "leonie", type: "Bijoux", color: "vert", size: "S", price: 48,
    technique: "Apatite, perle d'eau douce, acier doré", dims: "Ø 3 cm",
    description: "De petites créoles en apatite, avec une perle d'eau douce.",
    img: "assets/photos/a29.jpg", art: "#bfae9b",
    variants: [{ label: "La paire", stock: 6 }],
  },
];

const COLORS = {
  rouge: "#c0392b",
  bordeaux: "#6d1a2a",
  jaune: "#e8c547",
  vert: "#3f7a4f",
  bleu: "#4a74b8",
  beige: "#d9c9b0",
  noir: "#141111",
  multicolore: "conic-gradient(#c0392b, #e8c547, #3f7a4f, #4a74b8, #c0392b)",
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
    work: "a4",
    buyer: "Jade P.",
    date: "2026-10-12",
    reason: "Colis abîmé à la livraison",
    description:
      "Le carton était enfoncé sur un côté et le verre du cadre est fêlé dans le coin inférieur droit. Le tirage lui-même a l'air intact mais je ne peux pas l'accrocher comme ça.",
    amount: 320,
    status: "ouvert",
    photos: [
      { work: "a4", caption: "Tirage à la réception" },
      { work: "a4", caption: "Détail du coin fêlé", zoom: true },
      { work: "a4", caption: "Emballage", tone: "carton" },
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
    text: "Je travaille depuis cet été sur une série de six toiles autour de l'eau et des nageurs. Les premières sont presque sèches, je vous montre bientôt le résultat. Merci à toutes les personnes qui suivent l'atelier !",
    media: { work: "a1" },
  },
  {
    id: "p-nova-2", artist: "nova", date: "2026-09-21", title: "Dans l'atelier",
    text: "Petite visite de l'atelier : les pigments, les toiles en attente, et la fameuse table pleine de pots. Une vidéo des coulisses est disponible sur ma page.",
    media: { work: "a2", video: true },
  },
  {
    id: "p-nova-3", artist: "nova", date: "2026-08-30", title: "Exposition au Panier",
    text: "Trois de mes toiles sont exposées tout le mois de septembre dans une petite galerie du quartier du Panier. Venez dire bonjour le samedi !",
    media: { work: "a3" },
  },
  {
    id: "p-ines-1", artist: "ines", date: "2026-10-08", title: "Sur le passage du Tour",
    text: "Une matinée entière devant le Café de la Poste à attendre le peloton. Trois secondes de passage, une seule image retenue.",
    media: { work: "a4", video: true },
  },
  {
    id: "p-ines-2", artist: "ines", date: "2026-09-15", title: "Les grands formats arrivent",
    text: "Vous me l'avez beaucoup demandé : « Lac, onze heures » existe maintenant en grand format, en série limitée.",
    media: { work: "a5" },
  },
  {
    id: "p-kairo-1", artist: "kairo", date: "2026-10-02", title: "Couler une figure, étape par étape",
    text: "Chaque figure est coulée, poncée puis patinée à la main. Je vous montre les étapes en vidéo.",
    media: { work: "a15", video: true },
  },
  {
    id: "p-zia-1", artist: "zia", date: "2026-09-27", title: "Nouveau coloris pour le pull Granny",
    text: "Le pull Granny existe maintenant en rose et rouge. Toujours fait main, comptez trois semaines de délai.",
    media: { work: "a18" },
  },
];
/* Ventes passées (démo) pour l'espace artiste et les commissions. */
const SEED_SALES = [
  { order: "CMD-2026-0912", date: "2026-09-28", buyer: "Hugo L.", work: "a2", qty: 1, price: 1800, status: 3 },
  { order: "CMD-2026-0944", date: "2026-10-03", buyer: "Sarah B.", work: "a1", qty: 1, price: 1450, status: 2 },
  { order: "CMD-2026-0961", date: "2026-10-06", buyer: "Marc D.", work: "a3", qty: 1, price: 95, status: 1 },
  { order: "CMD-2026-0975", date: "2026-10-09", buyer: "Jade P.", work: "a4", qty: 1, price: 320, status: 1 },
  { order: "CMD-2026-0980", date: "2026-10-10", buyer: "Yanis K.", work: "a6", qty: 2, price: 85, status: 3 },
  { order: "CMD-2026-0986", date: "2026-10-11", buyer: "Léa M.", work: "a22", qty: 1, price: 340, status: 1 },
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
