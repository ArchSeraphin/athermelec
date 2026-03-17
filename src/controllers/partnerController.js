/**
 * Controller Partenaires — CRUD
 */

const pool = require('../config/database');

// ─── Liste partenaires (public) ───

exports.getAll = async (req, res) => {
  try {
    const [partners] = await pool.execute(
      'SELECT * FROM partners ORDER BY display_order ASC, name ASC'
    );
    res.json(partners);
  } catch (err) {
    console.error('Erreur getAll partners:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Créer un partenaire (admin) ───

exports.create = async (req, res) => {
  try {
    const { name, logo_url, website_url, description, display_order } = req.body;

    // Validation URLs
    if (logo_url && !/^(\/uploads\/|\/img\/|https:\/\/)/.test(logo_url)) {
      return res.status(400).json({ error: 'URL du logo invalide' });
    }
    if (website_url && !/^https?:\/\//.test(website_url)) {
      return res.status(400).json({ error: 'URL du site invalide' });
    }

    const [result] = await pool.execute(
      `INSERT INTO partners (name, logo_url, website_url, description, display_order)
       VALUES (?, ?, ?, ?, ?)`,
      [name, logo_url || null, website_url || null, description || null, display_order || 0]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Erreur create partner:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Modifier un partenaire (admin) ───

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }

    const { name, logo_url, website_url, description, display_order } = req.body;

    if (logo_url && !/^(\/uploads\/|\/img\/|https:\/\/)/.test(logo_url)) {
      return res.status(400).json({ error: 'URL du logo invalide' });
    }
    if (website_url && !/^https?:\/\//.test(website_url)) {
      return res.status(400).json({ error: 'URL du site invalide' });
    }

    await pool.execute(
      `UPDATE partners SET name = ?, logo_url = ?, website_url = ?,
       description = ?, display_order = ? WHERE id = ?`,
      [name, logo_url || null, website_url || null, description || null, display_order || 0, id]
    );

    res.json({ message: 'Partenaire modifié' });
  } catch (err) {
    console.error('Erreur update partner:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Supprimer un partenaire (admin) ───

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }

    await pool.execute('DELETE FROM partners WHERE id = ?', [id]);
    res.json({ message: 'Partenaire supprimé' });
  } catch (err) {
    console.error('Erreur delete partner:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
