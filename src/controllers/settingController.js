/**
 * Controller Settings — Paramètres clé/valeur configurables depuis l'admin
 */

const pool = require('../config/database');

// Clés autorisées en lecture publique (pas de données sensibles)
const PUBLIC_KEYS = ['ga_measurement_id', 'site_name', 'contact_phone', 'contact_email_display'];

// ─── Lire un paramètre public (GET /api/settings/:key) ───

exports.getPublic = async (req, res) => {
  try {
    const { key } = req.params;

    if (!PUBLIC_KEYS.includes(key)) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    const [rows] = await pool.execute(
      'SELECT value FROM settings WHERE `key` = ?',
      [key]
    );

    if (rows.length === 0) {
      return res.json({ value: null });
    }

    res.json({ value: rows[0].value });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Lire tous les paramètres (admin) ───

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT `key`, value, updated_at FROM settings ORDER BY `key`'
    );
    // Retourner comme objet { key: value }
    const settings = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Mettre à jour un paramètre (admin) ───

exports.upsert = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    // Validation clé : alphanumeric + underscore uniquement
    if (!/^[a-z0-9_]{1,100}$/.test(key)) {
      return res.status(400).json({ error: 'Clé invalide' });
    }

    // Pas de données sensibles via l'API
    const forbiddenKeys = ['jwt_secret', 'db_password', 'smtp_pass'];
    if (forbiddenKeys.includes(key)) {
      return res.status(403).json({ error: 'Clé non modifiable via l\'API' });
    }

    const cleanValue = typeof value === 'string' ? value.trim() : '';

    await pool.execute(
      `INSERT INTO settings (\`key\`, value) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = NOW()`,
      [key, cleanValue]
    );

    res.json({ message: 'Paramètre mis à jour', key, value: cleanValue });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
