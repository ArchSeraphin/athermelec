/**
 * Routes publiques — /api/*
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validationResult } = require('express-validator');

const articleController = require('../controllers/articleController');
const partnerController = require('../controllers/partnerController');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');
const realisationController = require('../controllers/realisationController');
const settingController = require('../controllers/settingController');
const { apiLimiter, loginLimiter, contactLimiter } = require('../middleware/rateLimiter');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// ─── Articles (public) ───
router.get('/articles', apiLimiter, articleController.getPublished);
router.get('/articles/:slug', apiLimiter, articleController.getBySlug);

// ─── Réalisations (public) ───
router.get('/realisations', apiLimiter, realisationController.getPublished);
router.get('/realisations/:slug', apiLimiter, realisationController.getBySlug);

// ─── Partenaires (public) ───
router.get('/partners', apiLimiter, partnerController.getAll);

// ─── Settings (public — clés non sensibles) ───
router.get('/settings/:key', apiLimiter, settingController.getPublic);

// ─── Contact ───
router.post('/contact',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Le nom est requis'),
    body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
    body('message').trim().notEmpty().isLength({ max: 5000 }).withMessage('Message requis (max 5000 car.)')
  ],
  validate,
  contactController.send
);

// ─── Auth ───
router.post('/auth/login',
  loginLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  validate,
  authController.login
);

router.post('/auth/refresh', authController.refresh);
router.post('/auth/logout', authController.logout);

module.exports = router;
