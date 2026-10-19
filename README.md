# ATYPIIK — Marketplace d'art

Front-end ATYPIIK, thème **« Studio »** : graphique et net, inspiré du streetwear. Angles vifs,
filets noirs, titres en capitales condensées, références catalogue en police mono ;
bordeaux, beige, blanc, noir et le chrome en détail.

**Le plus simple :** ouvrez `dist/ATYPIIK.html` d'un double-clic (tout le site en un seul fichier).
Après une modification des sources, régénérez-le avec `python3 tools/build.py`.

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

Polices : **Cubao** (titres), **Le Petit Cochon** (quelques mots d'accent), **Archivo** (logo élargi
et texte) et **IBM Plex Mono** (références, détails techniques). Cubao et Le Petit Cochon ne sont
pas sur Google Fonts : déposez leurs fichiers dans `assets/fonts/` (voir le README du dossier).
En attendant, Big Shoulders Display et Gluten les remplacent.

## Photos

Chaque œuvre affiche un visuel généré tant qu'elle n'a pas de photo. Pour mettre de vraies
photos, déposez-les dans `assets/photos/` et déclarez-les dans `js/photos.js`
(mode d'emploi dans `assets/photos/README.md`).

## Mode démo

Sur la page Profil, trois boutons permettent d'entrer directement dans chaque espace :
**Acheteur**, **Artiste** (Nova Lune) ou **Administrateur**. Les données sont simulées
et enregistrées dans le navigateur (localStorage).

## Fonctionnalités (cahier des charges)

- **Visiteur** : navigation, recherche, galerie filtrable (type, couleur, taille, prix, artiste),
  grille / liste, badges de stock, conservation du défilement, pages artistes.
  L'ajout au panier demande une connexion.
- **Acheteur** : favoris, abonnements aux artistes, messagerie, panier persistant,
  tunnel de paiement (adresse → paiement → confirmation), suivi de commande en 4 étapes,
  retours et signalement de problème, préférences de notifications, export / suppression des données.
- **Artiste** : tableau de bord, publication d'œuvres avec déclinaisons et stock, modification
  prix / stock, ventes avec part nette (90 %) et expédition, profil public, dossier de presse
  et vidéos coulisses, messages des acheteurs.
- **Administrateur** : validation des comptes vendeurs, modération des œuvres,
  commissions (10 %) et flux financiers, gestion des litiges.
- **Notifications** : commande, expédition, livraison, baisse de prix, retour en stock,
  nouvelle œuvre d'un artiste suivi, offres.
- **RGPD** : bandeau cookies, formulaire d'exercice des droits, pages légales.

## Structure

```
index.html       squelette : header, menu mobile, barre basse, footer, bandeau cookies
css/theme.css    variables de couleurs / typo
css/style.css    composants
js/data.js       œuvres, artistes et données de démo (à remplacer par l'API)
js/photos.js     photos associées aux œuvres
assets/photos/   fichiers photo
js/app.js        routage, vues, espaces acheteur / artiste / admin
tools/build.py   génère dist/ATYPIIK.html (version en un seul fichier)
```
