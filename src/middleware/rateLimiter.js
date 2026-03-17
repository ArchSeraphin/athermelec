/**
 * Rate Limiters — Protection contre les abus
 */

const rateLimit = require('express-rate-limit');

// Login : 5 tentatives / 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Contact : 3 messages / heure
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'Trop de messages envoyés. Réessayez plus tard.' },
  standardHeaders: true,
  legacyHeaders: false
});

// API publique : 100 requêtes / 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Trop de requêtes. Réessayez plus tard.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Admin CRUD : 60 requêtes / minute
const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Trop de requêtes admin. Réessayez dans une minute.' },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { loginLimiter, contactLimiter, apiLimiter, adminLimiter };
