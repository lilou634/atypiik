# ATYPIIK — Marketplace d'art

Front-end ATYPIIK, thème **« Bordeaux »** : beige, blanc et noir, un bordeaux profond comme
seule couleur d'accent et quelques touches de chrome argenté.

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
| Fond | `#efe8dc` beige | fond de page |
| Surfaces | `#ffffff` blanc | cartes, panneaux, champs, header |
| Encre | `#141111` noir | texte, filets, boutons, footer |
| Accent | `#6d1a2a` bordeaux | bloc d'accueil, survols, alertes, compteurs, onglet actif |
| Chrome | dégradé `--chrome` | logo, avatars, bouton secondaire, badge « Plusieurs versions » |

Toutes les couleurs sont des variables CSS dans `css/theme.css`.

Polices : **Unbounded** (logo), **Anton** (titres en capitales), **Archivo** (texte).

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
js/app.js        routage, vues, espaces acheteur / artiste / admin
tools/build.py   génère dist/ATYPIIK.html (version en un seul fichier)
```
