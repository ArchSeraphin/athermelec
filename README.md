# CMS Starter

Squelette de webapp CMS basé sur Node.js/Express + React/Vite.
Prêt à personnaliser pour n'importe quel site vitrine avec administration.

## Stack technique

| Couche | Technologie |
|---|---|
| Backend | Node.js 18+ / Express.js 4 |
| Frontend | React 18 + Vite 5 |
| Base de données | MySQL 8+ |
| Auth | JWT 15min access + 7j refresh (httpOnly cookies) |
| Upload images | Multer + Sharp (WebP auto) |
| Email | Nodemailer (SMTP) |
| SEO | react-helmet-async, Schema.org JSON-LD, sitemap dynamique |

## Fonctionnalités

- **Articles** : CRUD complet, éditeur WYSIWYG (Quill), publication/brouillon, slug auto
- **Partenaires** : CRUD complet, logo upload, ordre d'affichage
- **Contact** : Formulaire avec envoi email SMTP
- **Médias** : Upload images avec conversion automatique WebP
- **Auth** : JWT access + refresh token hashé en DB, révocation au logout
- **SEO** : Meta tags, Open Graph, Twitter Cards, Schema.org, sitemap XML dynamique
- **Sécurité** : Helmet, rate limiting, XSS sanitization, validation, bcrypt 12 rounds
- **Admin** : Dashboard protégé avec gestion articles et partenaires

## Installation

### 1. Cloner et installer

```bash
git clone <votre-repo>
cd cms-starter
npm install
cd client && npm install && cd ..
```

### 2. Configuration

```bash
cp .env.example .env
# Remplir toutes les variables dans .env
```

### 3. Base de données + compte admin

```bash
node seed/seed.js votre@email.com VotreMotDePasse!
```

### 4. Développement

```bash
# Terminal 1 : Backend
npm run dev

# Terminal 2 : Frontend
cd client && npm run dev
```

### 5. Production

```bash
npm run build   # Build le frontend React
npm start       # Démarre le serveur
```

## Personnalisation

Cherchez `TODO` dans tout le projet pour trouver les endroits à personnaliser :

- **Couleurs / polices** : `client/src/styles/main.css` (variables CSS)
- **Nom du site** : `client/index.html`, `client/src/components/SEO.jsx`, `Navbar.jsx`, `Footer.jsx`
- **Schema.org** : `client/src/App.jsx`
- **Pages** : `client/src/pages/` (contenu Home, About, Legal...)
- **Sitemap** : `src/routes/sitemap.js` (URL de base)
- **robots.txt** : URL du sitemap

## Structure

```
cms-starter/
├── app.js                          # Point d'entrée serveur
├── src/
│   ├── config/database.js          # Pool MySQL
│   ├── controllers/
│   │   ├── articleController.js     # CRUD articles + XSS
│   │   ├── authController.js        # Login/refresh/logout JWT
│   │   ├── contactController.js     # Email Nodemailer
│   │   ├── mediaController.js       # Upload → Sharp WebP
│   │   └── partnerController.js     # CRUD partenaires
│   ├── middleware/
│   │   ├── auth.js                  # requireAuth JWT
│   │   └── rateLimiter.js           # Rate limits
│   └── routes/
│       ├── api.js                   # Routes publiques
│       ├── admin.js                 # Routes admin protégées
│       └── sitemap.js               # Sitemap XML dynamique
├── client/
│   ├── src/
│   │   ├── App.jsx                  # Router + Auth + Schema.org
│   │   ├── components/              # Navbar, Footer, SEO, ScrollReveal
│   │   ├── pages/                   # Pages publiques
│   │   ├── pages/admin/             # Dashboard, ArticleEditor, etc.
│   │   └── styles/main.css          # Design system CSS
│   ├── index.html
│   └── vite.config.js
├── seed/seed.js                     # Init DB + admin
├── scripts/convert-photos.js        # Batch JPG → WebP
└── img/                             # Assets statiques
```

## Tables MySQL

- `admins` (id, email, password_hash, created_at)
- `articles` (id, title, slug, excerpt, content, cover_image, published, published_at, created_at, updated_at)
- `refresh_tokens` (id, admin_id, token_hash, expires_at, created_at)
- `partners` (id, name, logo_url, website_url, description, display_order, created_at)

## API

### Routes publiques
- `GET /api/articles?page=N&limit=N` — Articles publiés
- `GET /api/articles/:slug` — Détail article
- `GET /api/partners` — Partenaires
- `POST /api/contact` — Envoi email
- `POST /api/auth/login` — Connexion
- `POST /api/auth/refresh` — Refresh token
- `POST /api/auth/logout` — Déconnexion
- `GET /sitemap.xml` — Sitemap dynamique

### Routes admin (JWT requis)
- `GET/POST /api/admin/articles` — Liste / Créer
- `PUT/DELETE /api/admin/articles/:id` — Modifier / Supprimer
- `PATCH /api/admin/articles/:id/publish` — Publier/Dépublier
- `POST/PUT/DELETE /api/admin/partners` — CRUD partenaires
- `POST /api/admin/media/upload` — Upload image → WebP

## Licence

MIT
