# Polices de marque

Le site utilise deux polices qui ne sont pas sur Google Fonts :

| Police | Usage | Fichier attendu ici |
| --- | --- | --- |
| **Cubao** | titres en capitales | `Cubao.woff2`, `Cubao.otf` ou `Cubao.ttf` |
| **Le Petit Cochon** | quelques mots d'accent (accueil, bande bordeaux, footer) | `LePetitCochon.woff2`, `.otf` ou `.ttf` |

Déposez les fichiers ici avec exactement ces noms, puis relancez `python3 tools/build.py`.
Si la police est installée sur l'ordinateur, elle est aussi reconnue automatiquement.

Tant qu'elles manquent, le site affiche des polices proches : Big Shoulders Display à la place
de Cubao, Gluten à la place de Le Petit Cochon.

Vérifiez la licence de chaque police avant une mise en ligne commerciale : beaucoup de polices
gratuites ne le sont que pour un usage personnel.
