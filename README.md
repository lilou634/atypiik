# ATYPIIK — Marketplace d'art

Front-end ATYPIIK, thème **« Studio »** : graphique et net, inspiré du streetwear. Angles vifs,
filets noirs, titres en capitales condensées ;
bordeaux, beige, blanc, noir et le chrome en détail.

**Le plus simple :** ouvrez `dist/ATYPIIK.html` d'un double-clic (tout le site en un seul fichier).
Après une modification des sources, régénérez-le avec `python3 tools/build.py`.

## Projet INSEEC (épreuve IA)

Le site sert de livrable pour l'épreuve « créer et lancer un produit ». Il réunit les quatre
espaces demandés, accessibles depuis la barre noire en haut de chaque page :

| Espace | Adresse | Contenu |
| --- | --- | --- |
| Projet | `#/projet` | Page d'entrée de la présentation |
| 1. Vente | `#/offre`, `#/galerie` | Promesse, offres et prix HT/TTC, achat d'une œuvre et abonnement Atelier Pro simulés jusqu'à la confirmation, FAQ (`#/aide`) et contact |
| 2. CRM | `#/crm` | 22 contacts fictifs, recherche et filtres, fiche contact, pipeline, tableau de bord. Les commandes et abonnements passés sur le site y arrivent |
| 3. Stratégie | `#/strategie` | Problème, personas, marché sourcé, concurrents, prix, modèle économique |
| 4. Communication | `#/communication` | Plateforme de marque, canaux, 9 posts, calendrier, partenariats, 10 premiers clients, indicateurs |

Le bandeau « Projet étudiant INSEEC, démo sans vente réelle » est affiché en haut de chaque page.
Aucun vrai paiement, aucune donnée personnelle réelle (adresses en `example.com`, téléphones fictifs),
aucune clé d'API. Les données du projet sont dans `js/projet-data.js`, les vues dans `js/projet.js`.

**Avant le rendu : ouvrir chaque lien de source** de la page Stratégie (liste en bas de page) et
vérifier que le chiffre y figure bien.

### Mettre en ligne sur Vercel

Le site est statique : aucune commande de build n'est nécessaire.

1. Se connecter sur vercel.com avec son compte GitHub.
2. « Add New… » → « Project » → importer le dépôt `atypiik`.
3. Framework Preset : « Other ». Laisser Build Command et Output Directory vides. Deploy.
4. Dans Settings → Git, choisir la branche de production (celle qui contient ce travail), ou fusionner cette branche dans `main`.
5. Envoyer l'adresse de production `nom-du-projet.vercel.app` (pas l'adresse longue d'un déploiement).

## Lancer en local

Aucune dépendance ni build. Il faut juste un petit serveur, au choix :

```bash
python3 -m http.server 8000
# ou
npx serve .
```

Puis ouvrir http://localhost:8000

## Palette

| Rôle | Couleur | Usage |
| --- | --- | --- |
| Fond | `#ffffff` blanc | fond de page, header |
| Mur | `#ebe6dd` beige | fond des visuels (œuvres « accrochées ») |
| Encre | `#111010` noir | texte, filets, boutons, footer, panneau d'accueil |
| Bordeaux | `#6d1a2a` | bande éditoriale, bouton panier, survols, compteurs, alertes |
| Chrome | dégradé `--chrome` | bouton secondaire, badge « Plusieurs versions », avatars, logo géant du footer |

Toutes les couleurs sont des variables CSS dans `css/theme.css`.

Polices : **Cubao** (titres), **Le Petit Cochon** (quelques mots d'accent) et **Archivo** (logo élargi,
texte et petites étiquettes). Cubao et Le Petit Cochon ne sont
pas sur Google Fonts : déposez leurs fichiers dans `assets/fonts/` (voir le README du dossier).
En attendant, Big Shoulders Display et Gluten les remplacent.

## Photos

Le catalogue de démonstration (29 pièces, 8 artistes, 7 catégories : Peinture, Photographie,
Céramique, Mode, Crochet, Bijoux, Maison & déco) est illustré par des photos de référence dans
`assets/photos/` (`a1.jpg` … `a29.jpg`, recadrées en 4:5). Elles servent uniquement à la maquette :
pour la mise en ligne, il faudra les remplacer par les photos des artistes, avec leur accord.

Chaque œuvre a un champ `img` dans `js/data.js` ; `js/photos.js` permet aussi de remplacer une
photo sans toucher au catalogue. Le build intègre les photos dans `dist/ATYPIIK.html`.

## Structure

```
index.html       squelette : header, menu mobile, barre basse, footer, bandeau cookies
css/theme.css    variables de couleurs / typo
css/style.css    composants
js/data.js       œuvres, artistes et données de démo (à remplacer par l'API)
js/projet-data.js  offre, CRM fictif, dossier stratégique et plan de communication
js/projet.js     vues du projet : offre, abonnement, CRM, stratégie, communication
js/photos.js     photos associées aux œuvres
assets/photos/   fichiers photo
js/app.js        routage, vues, espaces acheteur / artiste / admin
tools/build.py   génère dist/ATYPIIK.html (version en un seul fichier)
```
