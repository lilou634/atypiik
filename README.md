# ATYPIIK — Marketplace d'art

Front-end ATYPIIK, thème **« Chrome Flash »** : rose flash, chrome argenté, ambiance futuriste.

## Lancer en local

Aucune dépendance ni build. Il faut juste un petit serveur, au choix :

```bash
python3 -m http.server 8000
# ou
npx serve .
```

Puis ouvrir http://localhost:8000

## Palette

| Rôle | Ancien | Nouveau |
| --- | --- | --- |
| Primaire | `#f4c2c2` rose pâle | `#ff1f8f` rose flash (+ `#ff2bd6` néon) |
| Métal | — | dégradé chrome argenté (`--chrome`, `--chrome-text`) |
| Secondaire | `#07af4f` vert | `#07af4f` vert (+ `#19f57a` néon pour les badges) |
| Fond | `#181a1b` | `#07070b` noir profond |

Toutes les couleurs sont des variables CSS dans `css/theme.css`. Pour appliquer le thème à un
autre projet, il suffit de copier ce fichier et de remplacer l'ancien rose (`#f4c2c2`)
par `var(--pink)`.

Polices : **Modak** (titres, comme dans le cahier des charges), **Orbitron** (boutons, prix),
**Space Grotesk** (texte).

## Structure

```
index.html      squelette : header, menu mobile, barre basse, footer
css/theme.css   variables de couleurs / typo / effets
css/style.css   composants
js/data.js      œuvres et artistes de démo (à remplacer par l'API)
js/app.js       routage, galerie filtrable, fiche produit, panier, favoris, messagerie
```

## Pages couvertes (cahier des charges)

- Accueil : hero, section « Art », points clés
- Galerie : filtres dynamiques (type, couleur, taille, prix, artiste), grille / liste,
  badges de stock (En stock, Rupture, Vendu, Plusieurs versions), **conservation du scroll**
  au retour d'une fiche
- Fiche œuvre : zoom au survol, déclinaisons avec dispo en temps réel, Ajouter au panier /
  Acheter maintenant
- Notre sélection : recommandations basées sur les vues, favoris et abonnements
- Favoris, Panier (persisté en localStorage, répartition 90 % artiste / 10 % commission)
- Profil (connexion / création de compte), Contact (messagerie), pages légales
