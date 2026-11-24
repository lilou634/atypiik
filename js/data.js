/* Données de démonstration — à remplacer par l'API (PostgreSQL) plus tard. */

const ARTISTS = []; // site réel : rempli par les vrais comptes

/* Catalogue de démonstration, illustré par de vraies photos (assets/photos/). */
// Toutes les combinaisons de plusieurs options : [{Taille:"S",Couleur:"Noir"}, …].
function combine(options) {
  return options.reduce((acc, o) => acc.flatMap((a) => o.values.map((v) => ({ ...a, [o.name]: v }))), [{}]);
}
const ARTWORKS = []; // site réel : rempli par les vrais comptes

/* Livraison : chaque artiste fixe ses frais de port par œuvre, ou les inclut dans son prix.
   Valeurs de démonstration selon le format de l'œuvre. */
const SHIPPING_BY_SIZE = { S: 5.9, M: 8.9, L: 14.9 };
const SHIPPING_INCLUDED = [];
ARTWORKS.forEach((w) => {
  if (SHIPPING_INCLUDED.includes(w.id)) w.shippingIncluded = true;
  else w.shipping = SHIPPING_BY_SIZE[w.size] || 8.9;
});

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
const SEED_PENDING_SELLERS = []; // site réel : rempli par les vrais comptes

/* Litiges (démo). Les photos de démonstration réutilisent le visuel de l'œuvre concernée ;
   les vraies photos envoyées par les acheteurs sont stockées en image (data URL). */
const SEED_DISPUTES = []; // site réel : rempli par les vrais comptes

/* Posts des artistes : nouvelles, coulisses, expositions. */
const SEED_POSTS = []; // site réel : rempli par les vrais comptes
/* Ventes passées (démo) pour l'espace artiste et les commissions. */
const SEED_SALES = []; // site réel : rempli par les vrais comptes

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

/* Mise en avant éditoriale : l'artiste de la semaine et le prochain drop (édition limitée). */
const FEATURED = {
  artist: "rosa",
  week: "Semaine du 9 novembre",
  quote: "Je chine des canevas et des tapisseries oubliés, et je leur donne une deuxième vie sur des vestes qu'on a envie de porter tous les jours.",
  works: ["a22", "a23", "a25"],
};
// Drops programmés : le site affiche tout seul le prochain, puis passe au suivant une fois la vente terminée.
const DROPS = []; // site réel : rempli par les vrais comptes

/* Demandes de commande personnalisée (démo). */
const SEED_REQUESTS = []; // site réel : rempli par les vrais comptes

/* Avis clients (démo). Les vrais avis ne pourront être laissés qu'après une commande livrée. */
const SEED_REVIEWS = []; // site réel : rempli par les vrais comptes

/* Délai d'expédition indicatif par catégorie (en jours ouvrés). */
const LEAD_TIME = { Peinture: "3 à 5 jours", Photographie: "5 à 7 jours (tirage à la commande)", Céramique: "2 à 4 jours", Mode: "2 à 4 jours", Crochet: "Fait à la commande : 2 à 3 semaines", Bijoux: "1 à 3 jours", "Maison & déco": "2 à 4 jours" };

/* Témoignages d'artistes pour la page « Vendre sur ATYPIIK ». */
const ARTIST_QUOTES = []; // site réel : rempli par les vrais comptes

/* Questions fréquentes (page « Comment ça marche »). */
const FAQ = [
  ["Qui sont les artistes d'ATYPIIK ?", "Des créateurs et créatrices indépendants, sélectionnés un par un par notre équipe. Nous vérifions que chaque pièce est bien faite par l'artiste qui la vend : pas de revente, pas de production de masse."],
  ["Qui me vend l'œuvre ?", "L'artiste. ATYPIIK met en relation les artistes et les acheteurs et sécurise le paiement, mais c'est l'artiste qui vend, prépare et expédie votre commande. Sa fiche indique s'il vend en tant que professionnel ou particulier."],
  ["Combien coûte la livraison ?", "Chaque artiste fixe ses frais de livraison, affichés sous le prix de l'œuvre, ou les inclut dans son prix. Ils sont payés par l'acheteur et reversés à l'artiste. Si vous achetez plusieurs œuvres au même artiste, vous ne payez qu'un seul envoi."],
  ["Puis-je acheter chez plusieurs artistes en même temps ?", "Oui. Votre panier est regroupé par artiste : vous payez une seule fois, et chaque artiste vous envoie son colis avec ses propres frais de livraison."],
  ["Combien de temps pour recevoir ma commande ?", "Chaque fiche indique le délai d'expédition de l'artiste. Les pièces en stock partent en général sous 2 à 5 jours ouvrés, et vous suivez chaque étape depuis votre profil."],
  ["Puis-je demander une pièce sur mesure ?", "Oui, depuis la fiche d'une œuvre ou la page d'un artiste. Vous décrivez votre projet, l'artiste vous envoie un devis détaillé (prix, délai, livraison, retouches), puis vous l'acceptez et le payez sur ATYPIIK. L'artiste est payé après la livraison."],
  ["Puis-je retourner une œuvre ?", "Oui, vous disposez de 14 jours après réception pour changer d'avis, sauf pour les commandes sur mesure. Les frais de retour sont à votre charge, sauf si la pièce est abîmée ou ne correspond pas à sa description."],
  ["Et si j'ai un problème avec ma commande ?", "Ouvrez un litige depuis votre commande, avec des photos, dans les 48 h. Il se règle directement avec l'artiste, qui peut vous rembourser en tout ou en partie. ATYPIIK peut consulter les litiges et suspendre un artiste qui ne respecte pas ses engagements."],
  ["Pourquoi mes coordonnées sont-elles masquées dans les messages ?", "Pour vous protéger. Les numéros, e-mails, liens et comptes de réseaux sociaux sont masqués automatiquement : commande, paiement et livraison se font sur ATYPIIK. Une vente conclue en dehors du site n'est ni sécurisée ni protégée en cas de problème."],
  ["Puis-je être à la fois acheteur et artiste ?", "Oui, avec un seul compte. Depuis votre espace acheteur, cliquez sur « Devenir artiste » : vous gardez vos commandes et vos favoris, et votre espace artiste s'ouvre dès que l'équipe a validé votre travail. Un artiste peut aussi acheter les œuvres des autres artistes ; ses achats sont dans l'onglet « Mes achats »."],
  ["Le paiement est-il sécurisé ?", "Oui. Le paiement passe par un prestataire de paiement agréé : vos données bancaires ne transitent jamais par nos serveurs. L'artiste est payé une fois la commande livrée. Dans cette démo, aucun paiement n'est réellement effectué."],
];
