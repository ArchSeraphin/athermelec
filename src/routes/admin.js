/**
 * Routes admin protégées — /api/admin/*
 */

const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articleController');
const partnerController = require('../controllers/partnerController');
const mediaController = require('../controllers/mediaController');
const realisationController = require('../controllers/realisationController');
const settingController = require('../controllers/settingController');
const { requireAuth } = require('../middleware/auth');
const { adminLimiter } = require('../middleware/rateLimiter');

// Toutes les routes admin nécessitent une authentification
router.use(requireAuth);
router.use(adminLimiter);

// ─── Articles ───
router.get('/articles', articleController.getAll);
router.post('/articles', articleController.create);
router.put('/articles/:id', articleController.update);
router.delete('/articles/:id', articleController.remove);
router.patch('/articles/:id/publish', articleController.togglePublish);

// ─── Partenaires ───
router.post('/partners', partnerController.create);
router.put('/partners/:id', partnerController.update);
router.delete('/partners/:id', partnerController.remove);

// ─── Réalisations ───
router.get('/realisations', realisationController.getAll);
router.post('/realisations', realisationController.create);
router.put('/realisations/:id', realisationController.update);
router.delete('/realisations/:id', realisationController.remove);
router.patch('/realisations/:id/publish', realisationController.togglePublish);

// ─── Settings ───
router.get('/settings', settingController.getAll);
router.put('/settings/:key', settingController.upsert);

// ─── Médias ───
router.post('/media/upload', mediaController.uploadMiddleware, mediaController.uploadImage);

module.exports = router;
