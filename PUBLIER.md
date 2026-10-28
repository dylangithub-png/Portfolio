# Modifier et publier le portfolio

Le dossier de travail est `/Users/dylan/Documents/mon-portfolio`.
Il est relié au dépôt https://github.com/dylangithub-png/Portfolio, branche `main`.

## Aperçu

Double-cliquez sur `apercu.command`, puis ouvrez http://localhost:1313/.
Les modifications enregistrées apparaissent automatiquement.
Arrêtez l’aperçu avec Ctrl+C dans Terminal.

## Publication

Double-cliquez sur `publier.command` après avoir vérifié vos modifications.
Le script vérifie la compilation, affiche les fichiers modifiés, demande une
description, enregistre les changements et les envoie sur GitHub.
Tous les changements non ignorés du dossier sont inclus : ne placez pas de
mots de passe ou de fichiers personnels dans les sources.
Cloudflare lance automatiquement la publication après l’envoi.
Si une commande échoue, le script s’arrête : conservez le message d’erreur.

Pour publier un contenu, son champ `draft` doit être `false`.
Modifiez les sources dans `content`, `assets`, `layouts` et `static`, pas `public`.
Le dossier `public` et les sauvegardes dans `work` ne sont pas envoyés sur GitHub.

## Commandes équivalentes

```sh
cd /Users/dylan/Documents/mon-portfolio
hugo --minify
git status
git add -A
git commit -m "Mise à jour du portfolio"
git push origin main
```

Si vous travaillez aussi depuis un autre ordinateur, lancez `git pull --ff-only`
avant de commencer vos modifications, avec un dossier de travail sans changements.

Le suivi des déploiements est dans Cloudflare : Workers & Pages →
portfoliomoyardperuffo → Deployments.

## Compilation des styles

Le thème utilise Dart Sass. Sur un nouveau Mac, installez la distribution
autonome depuis https://sass-lang.com/install/ et placez son exécutable `sass`
dans le PATH. Il est déjà installé sur ce Mac. Les commandes `hugo server`
et `hugo --minify` restent identiques.

Sur Cloudflare Pages, la commande de compilation est `bash build-cloudflare.sh`.
Le script installe Dart Sass 1.106.1 avant de compiler le site avec Hugo.
Le dossier de sortie reste `public` et la version de Hugo reste 0.168.0.
