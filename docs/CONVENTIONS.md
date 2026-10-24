# Méthode pour chaque nouveau site

Ces règles valent pour tous les sites de Martial. Elles sont reprises de neuro-odyssee.

## 1. Un dépôt par site

- Nom en minuscules avec tirets : `mon-precieux`, `neuro-odyssee`.
- Dépôt privé par défaut.
- Un site = un dépôt = un hébergement = ses propres secrets FTP. Rien n'est partagé entre sites.

## 2. Structure type

```
index.html
css/        style
js/         comportement
images/     visuels (JPG/PNG/SVG, jamais en base64 dans le HTML)
data/       contenu modifiable (JSON)
logo/       logo SVG + PNG
docs/       méthode, notes (non déployé)
.github/workflows/deploy.yml
README.md   comment modifier, comment déployer, ce qui reste à faire
.gitignore
```

## 3. Règles

- Le contenu qui change (pièces, articles, tarifs) vit dans `data/`, pas dans le code.
- Les images sont de vrais fichiers, légers, avec un nom lisible.
- Aucun mot de passe, clé ni identifiant dans le dépôt. Tout passe par les secrets GitHub.
- Dossiers qui contiennent l'état du serveur (données remplies par un admin, config.php) : jamais déployés ni écrasés.
- Le README dit toujours : la structure, comment mettre à jour, comment déployer, ce qu'il reste à faire.

## 4. Déploiement

- Branche de travail : `claude/<nom-du-site>-<id>`. Le déploiement part de `main`.
- Workflow `Déploiement Hostinger` : FTP par `lftp mirror --reverse`, envoi seul, aucune suppression.
- Secrets : `FTP_HOST`, `FTP_USER`, `FTP_PASS`. Dossier cible : `public_html`.
- Exclus du déploiement : `.git/`, `.github/`, `docs/`, `*.md`.
- Premier envoi : lancer à la main (Run workflow), vérifier l'adresse, puis laisser `main` déployer.

## 5. Mise en ligne

- Retirer tout bandeau « maquette » et les textes d'exemple.
- Vérifier téléphone, adresse, horaires, liens réseaux sociaux.
- Titre, description et favicon renseignés.
- Photos et textes de personnes réelles : accord écrit de la personne.
