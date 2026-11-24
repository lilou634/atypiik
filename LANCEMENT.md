# ATYPIIK — site réel : ce qui reste avant l'ouverture

Cette branche (`site-reel`) est le vrai site, sans données de démo.
La démo complète reste sur la branche `site-officiel`.
Rien n'est publié pour l'instant.

## Déjà prêt

- Design, pages et parcours : galerie, fiches œuvres, panier multi-artistes, sur mesure avec devis, litiges, espace artiste, espace admin, CRM.
- Règles : commission de 15 % (Atelier) ou 10 % (Atelier Pro), limite de 10 œuvres en Atelier, frais de livraison fixés par l'artiste, coordonnées masquées dans les messages.
- L'accueil se renouvelle tout seul : photo du jour, nouvelles pièces, artiste de la semaine, drops programmés.
- Aucune donnée inventée : le site démarre vide et se remplit avec les vrais comptes.

## À brancher avant l'ouverture (prévu sur WordPress + WooCommerce + Dokan chez OVH)

1. **Vrais comptes** : aujourd'hui, les comptes et les œuvres sont enregistrés dans le navigateur de chaque personne. Il faut une base de données sur le serveur.
2. **Paiements Stripe Connect** : encaisser l'acheteur, prélever la commission, reverser leur part aux artistes. Les champs de carte actuels ne débitent rien.
3. **Connexion admin sécurisée** : mot de passe + code de double authentification. Retirer le bouton « Accès de travail » de la page `#/gestion-atypiik`.
4. **E-mails** : confirmation d'inscription, validation des artistes, commandes, devis, litiges.
5. **Photos** : envoi des photos par les artistes, stockées sur le serveur.
6. **Masquage des coordonnées côté serveur** (aujourd'hui il est fait dans le navigateur, donc contournable).
7. **Drops** : à créer depuis l'espace admin (aujourd'hui la liste `DROPS` dans `js/data.js` est vide).

## Textes à compléter

- **Mentions légales** : forme juridique, capital, SIREN, adresse du siège (champs entre crochets).
- **CGU / CGV** : à faire relire par un juriste.
- **Témoignages d'artistes** (page Vendre) : la section réapparaît dès qu'on en ajoute dans `ARTIST_QUOTES`.

## Avant de publier

- Vérifier que Vercel ne publie pas automatiquement un aperçu de cette branche.
- Nom de domaine : atypiik.fr chez OVH.
