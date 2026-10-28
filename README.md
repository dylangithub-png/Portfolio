# Guide Complet & Documentation du Portfolio (Hugo)

Ce guide détaille le fonctionnement, l'arborescence, la gestion du contenu au quotidien, ainsi que toutes les étapes et commandes nécessaires pour déployer ce portfolio sur les différents hébergeurs (**Infomaniak**, **pCloud Public**, **GitHub Pages**, **Cloudflare Pages**, **Netlify**) et configurer un serveur web (**Nginx** ou **Apache**).

---

## Sommaire

1. [Commandes Utiles avec Hugo](#1-commandes-utiles-avec-hugo)
2. [Arborescence du Projet & Rôles des Fichiers](#2-arborescence-du-projet--rôles-des-fichiers)
3. [Gestion du Contenu au Quotidien](#3-gestion-du-contenu-au-quotidien)
   - [Créer un nouvel album](#créer-un-nouvel-album)
   - [Ajouter des photos à un album existant](#ajouter-des-photos-à-un-album-existant)
   - [Modifier les légendes des photos et l'ordre](#modifier-les-légendes-des-photos-et-lordre)
   - [Gérer les langues (Français & Anglais)](#gérer-les-langues-français--anglais)
   - [Modifier la page « À propos » et la vidéo d'accueil](#modifier-la-page--à-propos--et-la-vidéo-daccueil)
4. [Mise en Ligne & Déploiement](#4-mise-en-ligne--déploiement)
   - [Option 1 : Infomaniak (Hébergement Web / Mutualisé ou Cloud)](#option-1--infomaniak-hébergement-web--mutualisé-ou-cloud)
   - [Option 2 : Cloudflare Pages (Recommandé & Gratuit)](#option-2--cloudflare-pages-recommandé--gratuit)
   - [Option 3 : GitHub Pages (Gratuit avec GitHub Actions)](#option-3--github-pages-gratuit-avec-github-actions)
   - [Option 4 : Netlify (Gratuit)](#option-4--netlify-gratuit)
   - [Option 5 : pCloud Public Folder](#option-5--pcloud-public-folder)
   - [Lier votre nom de domaine Infomaniak à ces services (DNS)](#lier-votre-nom-de-domaine-infomaniak-à-ces-services-dns)
5. [Configuration d'un Serveur Web Dédié / VPS (Nginx & Apache)](#5-configuration-dun-serveur-web-dédié--vps-nginx--apache)
   - [Configuration Nginx](#configuration-nginx)
   - [Configuration Apache](#configuration-apache)
6. [Fonctionnalités & Possibilités avec Hugo et le Thème Gallery](#6-fonctionnalités--possibilités-avec-hugo-et-le-thème-gallery)

---

## 1. Commandes Utiles avec Hugo

### En phase de développement (sur votre machine)

| Commande | Description |
| :--- | :--- |
| `hugo server` | Lance le serveur local sur `http://localhost:1313` avec rechargement automatique en direct (*LiveReload*). |
| `hugo server -D` | Inclut également les pages marquées comme brouillons (`draft: true`). |
| `hugo server --disableFastRender` | Force un recalcul complet de toutes les pages à chaque sauvegarde (recommandé lors de modifications de menus ou de templates globaux). |
| `hugo server --bind="0.0.0.0"` | Permet de visualiser le site depuis un smartphone ou une tablette sur le même réseau Wi-Fi local (ex: `http://192.168.1.XX:1313`). |

### Pour compiler et générer le site final (Production)

| Commande | Description |
| :--- | :--- |
| `hugo --minify --cleanDestinationDir` | Compile l'intégralité du site dans le dossier `public/`, minifie le code (HTML, CSS, JS) et nettoie les anciens fichiers obsolètes. |
| `hugo --minify -b "https://votre-domaine.ch/"` | Remplace temporairement l'URL de base (`baseURL`) par votre vrai domaine de production sans devoir modifier `hugo.toml`. |
| `hugo version` | Affiche la version d'Hugo installée (nécessite *Hugo Extended* >= 0.123.0). |

---

## 2. Arborescence du Projet & Rôles des Fichiers

```plain
mon-portfolio/
├── hugo.toml                  <-- Configuration globale du site (titres, langues, menus, options images)
├── content/                   <-- Tous vos contenus textuels et albums
│   ├── _index.md              <-- Accueil en Français
│   ├── _index.en.md           <-- Accueil en Anglais
│   ├── a-propos.md            <-- Page "À propos" en Français
│   ├── a-propos.en.md         <-- Page "About Us" en Anglais
│   ├── categories/            <-- Catégories par artiste (Duo, Delphine, Dylan)
│   │   ├── collaborations/    <-- Catégorie Duo & Collaborations (_index.md + _index.en.md)
│   │   ├── delphine-moyard/   <-- Catégorie Delphine Moyard (_index.md + _index.en.md)
│   │   └── dylan-peruffo/     <-- Catégorie Dylan Peruffo (_index.md + _index.en.md)
│   ├── shootings-duo/         <-- Album Duo (index.md, index.en.md + photos)
│   ├── delphine-photographie/ <-- Album Delphine Photos
│   ├── delphine-tableaux/     <-- Album Delphine Tableaux
│   ├── dylan-photographie/    <-- Album Dylan Photos
│   ├── dylan-design-3d/       <-- Album Dylan Design 3D
│   └── dylan-formations/      <-- Album Dylan Ateliers & Formations
├── static/                    <-- Fichiers bruts copiés directement à la racine web
│   └── video.mp4              <-- Vidéo d'introduction de la page d'accueil
├── layouts/                   <-- Surcharges des templates du thème (prioritaires sur le thème)
│   ├── _default/
│   │   └── home.html          <-- Template d'accueil personnalisé avec la vidéo et les albums
│   └── partials/
│       ├── header.html        <-- En-tête avec sélecteur de langue FR/EN et bouton sombre/clair
│       └── head-custom.html   <-- Scripts anti-clignotement pour le thème et la langue
├── assets/                    <-- Fichiers compilés par Hugo Pipes
│   ├── css/
│   │   └── custom.css         <-- Styles personnalisés (sélecteur de langue, vidéo, prose)
│   └── js/
│       └── custom.js          <-- Logique du changement de thème et sauvegarde localStorage
├── themes/gallery/            <-- Thème Hugo Gallery (sous-module Git)
└── public/                    <-- DOSSIER GÉNÉRÉ : c'est ce dossier qui est mis en ligne
```

---

## 3. Gestion du Contenu au Quotidien

### Créer un nouvel album

Pour créer un nouvel album (par exemple un voyage au Japon) :

1. Créez un nouveau dossier sous `content/` :
   ```sh
   mkdir content/voyage-japon
   ```
2. Ajoutez vos photos (`.jpg` ou `.jpeg`) dans ce dossier.
3. Créez le fichier **`index.md`** (version française) :
   ```yaml
   ---
   title: "Voyage au Japon"
   date: 2026-10-25
   description: "Exploration des ruelles de Kyoto et de l'architecture tokyoïte."
   categories: ["Dylan Peruffo"]
   weight: 15
   resources:
     - src: photo1.jpg
       title: "Temple au lever du jour"
       params:
         cover: true
     - src: photo2.jpg
       title: "Lumières de Shinjuku"
   ---
   ```
4. Créez le fichier **`index.en.md`** (version anglaise) :
   ```yaml
   ---
   title: "Journey to Japan"
   date: 2026-10-25
   description: "Exploring the historic streets of Kyoto and Tokyo architecture."
   categories: ["Dylan Peruffo"]
   weight: 15
   resources:
     - src: photo1.jpg
       title: "Temple at sunrise"
       params:
         cover: true
     - src: photo2.jpg
       title: "Neon lights in Shinjuku"
   ---
   ```
5. Relancez `hugo server` : le nouvel album apparaît instantanément sur l'accueil et dans la catégorie sélectionnée.

---

### Ajouter des photos à un album existant

1. Glissez-déposez simplement votre nouvelle image (ex: `photo4.jpg`) dans le dossier de l'album souhaité (ex: `content/delphine-photographie/`).
2. *Optionnel mais conseillé :* Ajoutez la légende de cette photo dans les fichiers `index.md` et `index.en.md` de cet album sous le bloc `resources:`.

---

### Modifier les légendes des photos et l'ordre

Les légendes et les couvertures d'album se définissent dans la section `resources:` du fichier `index.md` de l'album :

```yaml
resources:
  - src: photo1.jpg
    title: "Titre de la photo affiché dans la visionneuse plein écran"
    params:
      cover: true     # Définit cette image comme photo de couverture de l'album
  - src: photo2.jpg
    title: "Autre photo"
    params:
      hidden: true    # Cache l'image de la galerie pour ne l'utiliser qu'en couverture
```

#### Définir l'ordre d'affichage des photos
Dans le front matter de l'album, vous pouvez choisir la méthode de tri avec :
* `params.sort_by: "Name"` (par défaut, tri alphabétique par nom de fichier).
* `params.sort_by: "Date"` (tri par date de prise de vue issue des données EXIF).
* `params.sort_order: "asc"` (croissant) ou `"desc"` (décroissant).

---

### Gérer les langues (Français & Anglais)

Le site est configuré en mode multilingue natif dans `hugo.toml` :
* **Fichiers Français** : `_index.md`, `a-propos.md`, `index.md`
* **Fichiers Anglais** : `_index.en.md`, `a-propos.en.md`, `index.en.md`

Les menus de chaque langue sont définis dans [`hugo.toml`](file:///Users/dylan/Documents/mon-portfolio/hugo.toml) sous `[languages.fr]` et `[languages.en]`. Pour ajouter un lien dans le menu en haut à droite, ajoutez un bloc :

```toml
[[languages.fr.menu.main]]
  name = "Nouveau Lien"
  url = "/votre-url/"
  weight = 60

[[languages.en.menu.main]]
  name = "New Link"
  url = "/en/votre-url/"
  weight = 60
```

---

### Modifier la page « À propos » et la vidéo d'accueil

* **Textes « À propos » :** Modifiez directement en Markdown les fichiers [`content/a-propos.md`](file:///Users/dylan/Documents/mon-portfolio/content/a-propos.md) (français) et [`content/a-propos.en.md`](file:///Users/dylan/Documents/mon-portfolio/content/a-propos.en.md) (anglais).
* **Remplacer la vidéo d'accueil :** Remplacez le fichier [`static/video.mp4`](file:///Users/dylan/Documents/mon-portfolio/static/video.mp4) par votre nouvelle vidéo (format MP4 H.264 recommandé pour une compatibilité totale sur tous les navigateurs).

---

## 4. Mise en Ligne & Déploiement

---

### Option 1 : Infomaniak (Hébergement Web / Mutualisé ou Cloud)

Infomaniak est un hébergeur suisse réputé, écologique et performant.

#### Méthode 1.A : Déploiement par SFTP / FTP (Simple et rapide)
1. Sur votre Mac, générez les fichiers de production avec votre vrai nom de domaine :
   ```sh
   hugo --minify -b "https://www.votre-domaine.ch/"
   ```
2. Ouvrez un client FTP comme **Cyberduck** ou **FileZilla**.
3. Connectez-vous avec vos identifiants FTP Infomaniak (disponibles dans votre *Manager Infomaniak* > *Hébergement Web* > *Accès FTP*).
4. Déposez **le contenu intérieur du dossier `public/`** (et non le dossier `public` lui-même) dans le répertoire racine web de votre hébergement Infomaniak (généralement nommé **`web/`** ou **`sites/votre-domaine.ch/`**).

#### Méthode 1.B : Déploiement automatique par Rsync (Pour utilisateurs avancés)
Si vous avez activé l'accès SSH dans la console Infomaniak :
```sh
hugo --minify -b "https://www.votre-domaine.ch/"
rsync -avz --delete public/ mon-utilisateur@monserveur.infomaniak.com:~/web/
```

---

### Option 2 : Cloudflare Pages (Recommandé & Gratuit)

Cloudflare Pages offre un CDN mondial ultra-rapide, une sécurité renforcée et un certificat HTTPS automatique.

1. Poussez votre projet sur **GitHub** :
   ```sh
   git add .
   git commit -m "Mon portfolio Hugo"
   git push origin main
   ```
2. Connectez-vous sur [dash.cloudflare.com](https://dash.cloudflare.com/) > **Compute (Workers & Pages)** > **Create application** > onglet **Pages** > **Connect to Git**.
3. Sélectionnez votre dépôt GitHub.
4. Dans les paramètres de compilation (*Build settings*) :
   * **Framework preset** : `Hugo`
   * **Build command** : `hugo --minify`
   * **Build output directory** : `public`
   * **Environment variables** : Ajoutez la variable `HUGO_VERSION` avec la valeur `0.168.0` (ou votre version actuelle).
5. Cliquez sur **Save and Deploy**. Votre site est en ligne en moins d'une minute sur une adresse `https://mon-portfolio.pages.dev`.

---

### Option 3 : GitHub Pages (Gratuit avec GitHub Actions)

1. Sur votre dépôt GitHub, allez dans **Settings** > **Pages**.
2. Sous **Build and deployment** > **Source**, choisissez : **GitHub Actions**.
3. Créez dans votre projet le fichier `.github/workflows/hugo.yml` :
   ```yaml
   name: Déploiement Hugo sur GitHub Pages

   on:
     push:
       branches: ["main"]
     workflow_dispatch:

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
             submodules: recursive
             fetch-depth: 0

         - name: Setup Hugo
           uses: peaceiris/actions-hugo@v3
           with:
             hugo-version: 'latest'
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
4. Poussez sur GitHub : chaque `git push` déploie automatiquement le site.

---

### Option 4 : Netlify (Gratuit)

1. Connectez-vous sur [netlify.com](https://www.netlify.com/) > **Add new site** > **Import an existing project** > **GitHub**.
2. Configurez les options de build :
   * **Build command** : `hugo --minify`
   * **Publish directory** : `public`
3. Dans **Environment variables**, définissez `HUGO_VERSION` = `0.168.0`.
4. Cliquez sur **Deploy site**.

---

### Option 5 : pCloud Public Folder

Le dossier public de pCloud permet d'héberger des fichiers HTML statiques :
1. Activez le **Public Folder** dans votre compte pCloud.
2. Compilez votre site en local :
   ```sh
   hugo --minify
   ```
3. Copiez tout le contenu de votre dossier local `public/` dans le répertoire `pCloud Drive/Public Folder/portfolio/`.
4. Faites un clic droit sur le fichier `index.html` dans pCloud > **Copy Public Link**. L'URL fournie permettra d'accéder directement au site.

*(Note : Pour un site professionnel avec un nom de domaine personnalisé et HTTPS, préférez Cloudflare Pages, Infomaniak ou GitHub Pages).*

---

### Lier votre nom de domaine Infomaniak à ces services (DNS)

Si vous avez acheté votre nom de domaine chez Infomaniak (ex: `peruffo-moyard.ch`) et souhaitez l'utiliser avec l'un des services ci-dessus :

1. Connectez-vous sur le **Manager Infomaniak** (`manager.infomaniak.com`).
2. Allez dans **Domaines** > Cliquez sur votre nom de domaine > **Zone DNS**.

#### Cas 1 : Lier à Cloudflare Pages
1. Dans Cloudflare Pages > Votre projet > **Custom domains** > Cliquez sur **Set up a custom domain**.
2. Saisissez votre domaine (ex: `www.peruffo-moyard.ch`).
3. Dans la zone DNS Infomaniak, ajoutez un enregistrement :
   * **Type** : `CNAME`
   * **Source / Nom** : `www`
   * **Cible / Valeur** : `votre-projet.pages.dev.`

#### Cas 2 : Lier à GitHub Pages
1. Dans GitHub > **Settings** > **Pages** > **Custom domain** : entrez `www.peruffo-moyard.ch`.
2. Dans la zone DNS Infomaniak :
   * Ajoutez un enregistrement `CNAME` pour `www` pointant vers `votre-pseudo.github.io.`.
   * Pour le domaine racine (`peruffo-moyard.ch`), ajoutez 4 enregistrements de **Type A** pointant vers les IP de GitHub :
     * `185.199.108.153`
     * `185.199.109.153`
     * `185.199.110.153`
     * `185.199.111.153`

#### Cas 3 : Lier à Netlify
1. Dans Netlify > **Domain management** > **Add a domain**.
2. Dans la zone DNS Infomaniak, créez un enregistrement `CNAME` pour `www` pointant vers `votre-site.netlify.app.`.

---

## 5. Configuration d'un Serveur Web Dédié / VPS (Nginx & Apache)

Si vous disposez d'un serveur privé virtuel (VPS) sous Ubuntu/Debian :

### Configuration Nginx

1. Installez Nginx :
   ```sh
   sudo apt update && sudo apt install nginx
   ```
2. Créez le fichier de configuration de votre site :
   ```sh
   sudo nano /etc/nginx/sites-available/mon-portfolio.conf
   ```
3. Collez la configuration optimisée ci-dessous :

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name peruffo-moyard.ch www.peruffo-moyard.ch;

    # Racine pointant vers le dossier public d'Hugo
    root /var/www/mon-portfolio/public;
    index index.html;

    # Sécurité et types MIME
    charset utf-8;

    location / {
        try_files $uri $uri/ =404;
    }

    # Mise en cache agressive des images, vidéos et polices
    location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc|woff2|woff)$ {
        expires 1y;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Mise en cache des styles CSS et scripts JS
    location ~* \.(?:css|js)$ {
        expires 1M;
        access_log off;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Compression gzip pour accélérer le chargement
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    error_page 404 /404.html;
}
```

4. Activez le site et rechargez Nginx :
   ```sh
   sudo ln -s /etc/nginx/sites-available/mon-portfolio.conf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```
5. Activez le certificat SSL gratuit Let's Encrypt (HTTPS) :
   ```sh
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d peruffo-moyard.ch -d www.peruffo-moyard.ch
   ```

---

### Configuration Apache

1. Installez Apache :
   ```sh
   sudo apt update && sudo apt install apache2
   ```
2. Activez les modules recommandés :
   ```sh
   sudo a2enmod rewrite expires deflate headers ssl
   ```
3. Créez le VirtualHost :
   ```sh
   sudo nano /etc/apache2/sites-available/mon-portfolio.conf
   ```
4. Collez la configuration :

```apache
<VirtualHost *:80>
    ServerName peruffo-moyard.ch
    ServerAlias www.peruffo-moyard.ch

    # Racine pointant vers le dossier public généré par Hugo
    DocumentRoot /var/www/mon-portfolio/public

    <Directory /var/www/mon-portfolio/public>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        # Gestion des erreurs 404
        ErrorDocument 404 /404.html
    </Directory>

    # Mise en cache des médias
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType video/mp4 "access plus 1 year"
        ExpiresByType text/css "access plus 1 month"
        ExpiresByType application/javascript "access plus 1 month"
    </IfModule>

    ErrorLog ${APACHE_LOG_DIR}/portfolio_error.log
    CustomLog ${APACHE_LOG_DIR}/portfolio_access.log combined
</VirtualHost>
```

5. Activez le site et relancez Apache :
   ```sh
   sudo a2ensite mon-portfolio.conf
   sudo apache2ctl configtest
   sudo systemctl reload apache2
   ```
6. Activez le HTTPS automatique :
   ```sh
   sudo apt install certbot python3-certbot-apache
   sudo certbot --apache -d peruffo-moyard.ch -d www.peruffo-moyard.ch
   ```

---

## 6. Fonctionnalités & Possibilités avec Hugo et le Thème Gallery

Ce portfolio bénéficie des meilleures fonctionnalités pour artistes et photographes :

1. **Multilingue instantané avec mémoire (`localStorage`) :**
   * Choix de langue `[ FR | EN ]` accessible sur chaque page.
   * La langue choisie est sauvegardée dans le navigateur et réactivée lors des visites ultérieures.
2. **Mode Sombre / Clair (Dark & Light Mode) :**
   * Commutateur avec icônes Soleil / Lune en haut à droite.
   * Détection automatique de la préférence système de l'ordinateur/mobile.
   * Mémorisation dans le navigateur sans clignotement au chargement.
3. **Vidéo Showreel en page d'accueil :**
   * Vidéo d'introduction HD 16:9 fluide, en lecture automatique muette en boucle (`autoplay muted loop playsinline`) avec contrôles disponibles.
4. **Optimisation automatique des photographies :**
   * Hugo génère automatiquement les miniatures adaptées (résolution retina, redimensionnement intelligent, extraction de la couleur dominante d'arrière-plan).
5. **Visionneuse plein écran PhotoSwipe :**
   * Navigation au clavier, swipe sur smartphone, zoom haute définition, affichage des légendes et bouton de téléchargement.
6. **Catégorisation des artistes :**
   * Filtres par artiste et par duo sous le titre d'accueil.
7. **Albums privés ou en vedette :**
   * `params.private: true` dans un album : l'album est caché de la liste publique et n'est accessible que par son lien direct.
   * `params.featured: true` : l'album s'affiche en grand format « En vedette » au sommet de la page d'accueil.
8. **SEO & Réseaux Sociaux :**
   * Balises Open Graph générées automatiquement avec image de prévisualisation pour le partage sur WhatsApp, Facebook, LinkedIn, etc.
