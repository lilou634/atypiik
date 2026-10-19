# ATYPIIK — Marketplace d'art

Front-end ATYPIIK, thème **« Studio »** : graphique et net, inspiré du streetwear. Angles vifs,
filets noirs, titres en capitales condensées ;
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
js/photos.js     photos associées aux œuvres
assets/photos/   fichiers photo
js/app.js        routage, vues, espaces acheteur / artiste / admin
tools/build.py   génère dist/ATYPIIK.html (version en un seul fichier)
```
