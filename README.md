# Mon Précieux Vintage Shop

Site vitrine de la brocante Mon Précieux, Route de Larret 36, 1870 Monthey.
Objectif du site : faire venir les gens au hangar. Pas de vente en ligne.

## Structure

```
index.html            la page (accueil, chiner, Lorenzo, Coffre, trésor, venir)
css/style.css         tout le style
js/app.js             le comportement (navigation, fiches, flux Instagram simulé)
data/pieces.json      les pièces : c'est le seul fichier à modifier pour le catalogue
images/               photos des pièces et portraits
logo/                 logo en SVG et PNG
docs/CONVENTIONS.md   la méthode commune à tous les sites
.github/workflows/    déploiement automatique sur Hostinger
```

## Ajouter ou retirer une pièce

1. Ajouter la photo dans `images/` (carrée, 800 px, JPG).
2. Ouvrir `data/pieces.json` et copier un bloc dans `disponibles`.
3. Changer le numéro, le titre, le prix, la photo, l'univers.
4. Pièce vendue : déplacer son bloc dans `vendues`.
5. Enregistrer (commit) : le site se met à jour.

Univers possibles : `art`, `sculptures`, `cinema`, `mobilier`, `jouets`.

## Déploiement

Chaque envoi sur la branche `main` déploie le site sur Hostinger (dossier `public_html`),
par FTP, sans rien supprimer sur le serveur. On peut aussi lancer le déploiement à la main :
onglet Actions, « Déploiement Hostinger », « Run workflow ».

Secrets à créer dans GitHub (Settings, Secrets and variables, Actions) :

| Nom | Valeur |
|---|---|
| `FTP_HOST` | adresse FTP de l'hébergement (sans `ftp://`) |
| `FTP_USER` | nom d'utilisateur FTP |
| `FTP_PASS` | mot de passe FTP (jamais dans le code) |

## À faire avant la mise en ligne publique

- Retirer le bandeau « Maquette de démonstration » dans `index.html` (classe `demo`).
- Remplacer les photos tirées d'Instagram par de vraies photos, avec l'accord de Lorenzo.
- Remplacer les prix, numéros et descriptions d'exemple dans `data/pieces.json`.
- Relier le formulaire « Cherche-moi un trésor » à une adresse e-mail.
- Brancher le vrai flux Instagram (aujourd'hui simulé).
- Faire valider par Lorenzo les textes de sa page.
