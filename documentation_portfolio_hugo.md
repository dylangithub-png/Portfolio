# Documentation & Guide de Déploiement : Portfolio Photographie Hugo (FR/EN)

Guide complet pour la gestion, la personnalisation, l'administration au quotidien et le déploiement multi-plateforme du portfolio photographique bilingue de **Dylan Peruffo & Delphine Moyard**, construit avec **Hugo Extended** et le thème **Gallery**.

---

## 1. Fiche Technique & Fonctionnalités du Projet

* **Moteur Statique :** Hugo Extended (`v0.168.0` / Apple Silicon ARM64 sur macOS).
* **Thème Principal :** `hugo-theme-gallery` (Nicokaiser) géré via sous-module Git.
* **Multilingue Natif (FR / EN) :**
  * Version française : Fichiers `.md` (ex: `index.md`, `a-propos.md`, `_index.md`).
  * Version anglaise : Fichiers `.en.md` (ex: `index.en.md`, `a-propos.en.md`, `_index.en.md`).
* **Thème Visuel :** Mode Sombre / Mode Clair (*Dark & Light Mode*) automatique ou sélectionnable.
* **Page d'Accueil Hero :** Vidéo d'arrière-plan haute définition (`static/video.mp4`) intégrée dans la surcharge de template `layouts/_default/home.html`.
* **Galeries & Portfolio :**
  * Architecture en *Page Bundles* (albums autonomes contenant leurs propres visuels).
  * Génération automatique par Hugo des miniatures WebP / AVIF et déclinaisons HD lors de la compilation.
  * Visionneuse interactive (*Lightbox*) responsive basée sur PhotoSwipe.
  * Extraction et affichage automatique des métadonnées EXIF des visuels.

---

## 2. Arborescence Détaillée du Projet Hugo

```text
mon-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow de déploiement GitHub Actions (Optionnel)
├── archetypes/
│   └── default.md              # Modèle de base pour la création de nouveaux bundles
├── assets/                     # Fichiers sources traités et minifiés par Hugo
│   ├── css/
│   │   └── custom.css          # Surcouche CSS (Design Tokens, variables du thème)
│   ├── js/
│   │   └── custom.js           # Scripts JavaScript sur-mesure
│   └── jsconfig.json
├── content/                    # Contenu du site en Markdown
│   ├── _index.md               # Page d'accueil FR
│   ├── _index.en.md            # Page d'accueil EN
│   ├── a-propos.md             # Page À Propos FR
│   ├── a-propos.en.md          # Page About EN
│   ├── categories/             # Taxonomies & Filtres par créateur / projet
│   │   ├── collaborations/
│   │   │   ├── _index.md / _index.en.md / cover.jpg
│   │   ├── delphine-moyard/
│   │   │   ├── _index.md / _index.en.md / cover.jpg
│   │   └── dylan-peruffo/
│   │       ├── _index.md / _index.en.md / cover.jpg
│   ├── delphine-photographie/  # Album : Photographie Delphine Moyard
│   │   ├── index.md / index.en.md / feature.jpg / photo1.jpg / photo2.jpg
│   ├── delphine-tableaux/      # Album : Peintures & Tableaux Delphine
│   │   ├── index.md / index.en.md / feature.jpg / photo1.jpg / photo2.jpg
│   ├── dylan-design-3d/        # Album : Créations & Rendus 3D Dylan
│   │   ├── index.md / index.en.md / feature.jpg / photo1.jpg / photo2.jpg
│   ├── dylan-formations/       # Album : Formations & Workshops Dylan
│   │   ├── index.md / index.en.md / feature.jpg / photo1.jpg / photo2.jpg
│   ├── dylan-photographie/     # Album : Photographie Dylan Peruffo
│   │   ├── index.md / index.en.md / feature.jpg / photo1.jpg / photo2.jpg
│   └── shootings-duo/          # Album : Projets Collaboratifs Duo
│       └── index.md / index.en.md / feature.jpg / photo1.jpg / photo2.jpg
├── layouts/                    # Surcharges des templates HTML du thème
│   ├── _default/
│   │   └── home.html           # Structure de la page d'accueil (Section Hero + Vidéo)
│   └── partials/
│       ├── head-custom.html    # Injection des balises HEAD, meta et styles
│       └── header.html         # Menu de navigation et sélecteur de langues
├── static/                     # Fichiers copiés bruts vers /public à la compilation
│   └── video.mp4               # Vidéo d'arrière-plan de la section Hero
├── themes/
│   └── gallery/                # Sous-module Git du thème principal Hugo Gallery
├── hugo.toml                   # Configuration globale (Multilingue, menus, optimisation)
└── public/                     # Dossier généré après compilation de production (`hugo`)
```

### Zones d'intervention rapides

| Action souhaitée | Fichier ou Dossier concerné |
| :--- | :--- |
| **Modifier les paramètres généraux (Titre, menus, langues)** | `hugo.toml` |
| **Ajouter ou modifier un album photo/3D** | `content/nom-de-l-album/` |
| **Editer la page À Propos (FR / EN)** | `content/a-propos.md` et `content/a-propos.en.md` |
| **Ajouter / Changer des catégories/artistes** | `content/categories/nom-categorie/` |
| **Changer la vidéo d'accueil** | `static/video.mp4` |
| **Personnaliser le style CSS / Couleurs / Marges** | `assets/css/custom.css` |
| **Modifier la disposition de la page d'accueil** | `layouts/_default/home.html` |

---

## 3. Guide de Gestion du Contenu au Quotidien

### A. Créer un nouvel album photo ou projet

Chaque album est représenté par un dossier dédié dans `content/`.

1. Créez un nouveau dossier dans `content/` (ex: `content/architecture-geneve/`).
2. Ajoutez votre image de couverture sous le nom `feature.jpg`.
3. Créez le fichier de configuration français **`index.md`** :

```markdown
---
title: "Architecture Genève"
date: 2026-10-25
description: "Série de clichés architecturaux modernes à Genève."
categories: ["dylan-peruffo"]
featured_image: "feature.jpg"
weight: 10
---
```

4. Créez le fichier de configuration anglais **`index.en.md`** dans le même dossier :

```markdown
---
title: "Geneva Architecture"
date: 2026-10-25
description: "Series of modern architectural photographs shot in Geneva."
categories: ["dylan-peruffo"]
featured_image: "feature.jpg"
weight: 10
---
```

---

### B. Ajouter et nommer des visuels dans un album

Glissez directement vos fichiers images (`.jpg`, `.jpeg`, `.png`, `.webp`) à l'intérieur du dossier de l'album (ex: `content/dylan-photographie/`).

*Remarque : Grâce au système de ressources d'Hugo, les images sont partagées entre les versions FR et EN. Nul besoin de dupliquer les fichiers images lourds !*

---

### C. Personnaliser les légendes et titres individuels des photos

Vous pouvez spécifier un titre et une légende détaillée pour chaque visuel au sein du Front Matter du fichier `index.md` :

```markdown
---
title: "Photographie — Dylan Peruffo"
date: 2026-10-25
featured_image: "feature.jpg"
categories: ["dylan-peruffo"]

resources:
  - src: "photo1.jpg"
    title: "Lumière d'Automne"
    params:
      caption: "Prise de vue au 35mm f/1.4 en lumière naturelle."
      alt: "Paysage d'automne embrumé"
  - src: "photo2.jpg"
    title: "Ombres Portées"
    params:
      caption: "Étude géométrique des ombres en milieu urbain."
      alt: "Bâtiment moderne et ombres"
---
```

Dans le fichier `index.en.md`, traduisez simplement les paramètres `title`, `caption` et `alt` pour la version anglaise.

---

## 4. Commandes Hugo Indispensables

Toutes les commandes s'exécutent dans le **Terminal** de votre MacBook, à la racine du projet (`/Users/dylan/Documents/mon-portfolio`).

| Commande | Description |
| :--- | :--- |
| `hugo server -D` | Lance le serveur local de développement avec rechargement automatique en direct (*Live-Reload*) et affichage des brouillons (`-D`). |
| `hugo server --environment development` | Lance le serveur local en forçant l'environnement de développement. |
| `hugo` | Compile l'intégralité du site pour la production dans le dossier `/public`. |
| `hugo --minify` | Compile et compresse les fichiers HTML, CSS, JS et SVG pour des performances web maximales. |
| `hugo --cleanDestinationDir` | Supprime les anciens fichiers du dossier `public/` avant la recompilation pour garantir un dossier propre. |

L'accès local se fait sur `http://localhost:1313/` (FR) et `http://localhost:1313/en/` (EN).

---

## 5. Guides de Déploiement & Mise en Ligne

### Préalable : Publier les sources sur GitHub

```bash
cd /Users/dylan/Documents/mon-portfolio
git add .
git commit -m "Mise à jour des albums et configurations multilingues"
git branch -M main
git remote add origin https://github.com/votre-compte/mon-portfolio.git
git push -u origin main
```

---

### Option A : Cloudflare Pages *(Recommandé — Gratuit & Performances Maximales)*

1. Rendez-vous sur le tableau de bord **Cloudflare** > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Sélectionnez le dépôt `mon-portfolio`.
3. Paramètres de Build :
   * **Framework preset :** `Hugo`
   * **Build command :** `hugo --minify`
   * **Build output directory :** `public`
4. Dans **Environment variables**, ajoutez la clé :
   * `HUGO_VERSION` = `0.168.0`
5. Cliquez sur **Save and Deploy**.

---

### Option B : Netlify

1. Connectez-vous sur **Netlify** > **Add new site** > **Import an existing project** > **GitHub**.
2. Configurez les options de build :
   * **Build command :** `hugo --minify`
   * **Publish directory :** `public`
3. Créez un fichier `netlify.toml` à la racine de votre projet pour fixer la version d'Hugo :

```toml
[build]
  publish = "public"
  command = "hugo --minify"

[build.environment]
  HUGO_VERSION = "0.168.0"
  HUGO_ENABLEGITINFO = "true"
```

---

### Option C : GitHub Pages via GitHub Actions

Un workflow d'intégration continue peut recompiler votre site automatiquement à chaque push sur GitHub. 

Fichier `.github/workflows/deploy.yml` :

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: '0.168.0'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Activez GitHub Pages dans les paramètres de votre dépôt : **Settings > Pages > Source : GitHub Actions**.

---

### Option D : Hébergement SFTP Infomaniak

Pour héberger directement sur votre espace web Infomaniak :

1. Générez le site en local :
   ```bash
   hugo --minify
   ```
2. Ouvrez votre client SFTP (FileZilla, Cyberduck ou Transmit).
3. Connectez-vous avec vos identifiants SFTP Infomaniak.
4. Transférez la totalité du contenu du dossier local **`public/`** dans le dossier distant **`web/`** (ou **`sites/votre-domaine.com/`**).

---

### Option E : pCloud Public

pCloud offre la possibilité de partager un dossier Public :

1. Exécutez `hugo --minify`.
2. Déposez l'intégralité du dossier `public/` dans le dossier **Public** de pCloud.
3. Obtenez le lien public du fichier `index.html`.
4. *Remarque :* Option idéale pour des démonstrations ou prévisualisations temporaires (pCloud ne gère pas nativement les noms de domaine personnalisés avec certificat SSL automatique).

---

## 6. Configuration du Nom de Domaine Infomaniak

Pour lier votre nom de domaine acheté chez **Infomaniak** aux plateformes cloud :

1. Connectez-vous à la **Console Infomaniak** > **Domaines** > Sélectionner votre domaine.
2. Ouvrez la rubrique **Zone DNS**.

### Selon la plateforme choisie :

#### Pour Cloudflare Pages :
* Ajoutez un enregistrement **CNAME** :
  * **Nom :** `@` (ou `www`)
  * **Cible :** `mon-portfolio.pages.dev`

#### Pour Netlify :
* Ajoutez un enregistrement **A** :
  * **Nom :** `@`
  * **Cible IP :** `75.2.60.5`
* Ajoutez un enregistrement **CNAME** :
  * **Nom :** `www`
  * **Cible :** `mon-portfolio.netlify.app`

#### Pour GitHub Pages :
* Ajoutez 4 enregistrements **A** pour la racine `@` :
  * `185.199.108.153`
  * `185.199.109.153`
  * `185.199.110.153`
  * `185.199.111.153`
* Ajoutez un enregistrement **CNAME** pour `www` :
  * **Cible :** `votre-utilisateur.github.io`

---

## 7. Configuration d'un Serveur Web Dédié (Nginx / Apache)

Si vous hébergez le dossier `public/` sur votre propre VPS ou serveur dédié :

### Configuration Nginx (`/etc/nginx/sites-available/portfolio.conf`)

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name votre-domaine.ch www.votre-domaine.ch;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name votre-domaine.ch www.votre-domaine.ch;

    # Pointage direct sur le dossier public généré par Hugo
    root /var/www/mon-portfolio/public;
    index index.html;

    # Certificats SSL (Certbot / Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/votre-domaine.ch/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre-domaine.ch/privkey.pem;

    # Compression et performances
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    # Mise en cache des ressources médias et statiques
    location ~* \.(jpg|jpeg|png|gif|ico|webp|avif|mp4|webm|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # Redirection propre des routes bilingues d'Hugo
    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;
}
```

### Configuration Apache (`.htaccess` dans le dossier `public/`)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Forcer le trafic HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

  # Gestion de la page 404
  ErrorDocument 404 /404.html
</IfModule>

# Caching agressif des visuels de la galerie
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## 8. Fonctionnalités Évolutives de Hugo & du Thème Gallery

1. **Génération d'images responsive automatique :**
   En déposant vos fichiers originaux haute définition dans les bundles, Hugo génère automatiquement les déclinaisons légères WebP/AVIF pour mobile, tablette et écran Retina.
2. **Gestion des Catégories & Artistes :**
   Grâce au dossier `content/categories/`, vous filtrez automatiquement les visuels par artiste (`dylan-peruffo`, `delphine-moyard`) ou projet (`collaborations`).
3. **Flux RSS & Sitemaps Bilingues :**
   Génération automatique des fichiers `sitemap.xml` et flux RSS pour un référencement naturel (SEO) optimal en français et anglais.
4. **Sécurité et Vitesse Ultime :**
   Sans base de données MySQL ni script serveur réactif, le site est incassable, instantané et ne demande aucune maintenance de plugins.