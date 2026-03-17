/**
 * CMS Starter — Point d'entrée Passenger / Node.js
 * Basé sur l'architecture Express + React (Vite)
 */

require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// ─── Vérification des variables d'environnement critiques ───
const requiredEnv = [
  'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME',
  'JWT_SECRET', 'JWT_REFRESH_SECRET',
  'SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_EMAIL',
  'ALLOWED_ORIGIN'
];

for (const key of requiredEnv) {
  if (!process.env[key] || process.env[key].length < 2) {
    console.error(`❌ Variable d'environnement manquante ou trop courte : ${key}`);
    process.exit(1);
  }
}

// JWT secrets : minimum 32 caractères
if (process.env.JWT_SECRET.length < 32 || process.env.JWT_REFRESH_SECRET.length < 32) {
  console.error('❌ JWT_SECRET et JWT_REFRESH_SECRET doivent faire au moins 32 caractères.');
  process.exit(1);
}

// ─── Sécurité ───
const isProduction = process.env.NODE_ENV === 'production';

app.use(helmet({
  contentSecurityPolicy: isProduction ? {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
      styleSrc:    ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:     ["'self'", "https://fonts.gstatic.com"],
      imgSrc:      ["'self'", "data:", "https://images.unsplash.com", "https://www.google-analytics.com"],
      connectSrc:  ["'self'", "https://www.google-analytics.com", "https://analytics.google.com"],
      frameSrc:    ["'self'", "https://www.google.com"],
      objectSrc:   ["'none'"],
      upgradeInsecureRequests: []
    }
  } : false,
  hsts: isProduction ? { maxAge: 31536000, includeSubDomains: true } : false,
  frameguard: { action: 'deny' }
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Fichiers statiques ───
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// ─── Routes API ───
const apiRoutes = require('./src/routes/api');
const adminRoutes = require('./src/routes/admin');
const sitemapRoute = require('./src/routes/sitemap');

app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);
app.use(sitemapRoute);

// ─── Servir le frontend React (build Vite) ───
const clientBuildPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// ─── Error handler global (masquer stack trace en production) ───
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  if (isProduction) {
    res.status(status).json({ error: 'Erreur interne du serveur' });
  } else {
    res.status(status).json({ error: err.message, stack: err.stack });
  }
});

// ─── Démarrage ───
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT} (${isProduction ? 'production' : 'développement'})`);
});

module.exports = app;
