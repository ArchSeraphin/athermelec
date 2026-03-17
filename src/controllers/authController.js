/**
 * Controller Auth — Login / Refresh / Logout
 * JWT access token (15min) + refresh token (7j) en httpOnly cookie
 * Refresh tokens hashés (SHA-256) stockés en DB
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../config/database');

// ─── Helpers ───

function generateAccessToken(admin) {
  return jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
}

function generateRefreshToken() {
  return crypto.randomBytes(64).toString('hex');
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
  path: '/api/auth'
};

// ─── Login ───

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [admins] = await pool.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );

    if (admins.length === 0) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    const admin = admins[0];
    const validPassword = await bcrypt.compare(password, admin.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // Générer les tokens
    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken();
    const refreshTokenHash = hashToken(refreshToken);

    // Stocker le refresh token hashé en DB
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await pool.execute(
      'INSERT INTO refresh_tokens (admin_id, token_hash, expires_at) VALUES (?, ?, ?)',
      [admin.id, refreshTokenHash, expiresAt]
    );

    // Envoyer le refresh token en cookie httpOnly
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

    res.json({
      accessToken,
      admin: { id: admin.id, email: admin.email }
    });
  } catch (err) {
    console.error('Erreur login:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Refresh ───

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token manquant' });
    }

    const tokenHash = hashToken(refreshToken);

    const [tokens] = await pool.execute(
      `SELECT rt.*, a.email FROM refresh_tokens rt
       JOIN admins a ON a.id = rt.admin_id
       WHERE rt.token_hash = ? AND rt.expires_at > NOW()`,
      [tokenHash]
    );

    if (tokens.length === 0) {
      return res.status(401).json({ error: 'Refresh token invalide ou expiré' });
    }

    const tokenRow = tokens[0];
    const accessToken = generateAccessToken({
      id: tokenRow.admin_id,
      email: tokenRow.email
    });

    res.json({ accessToken });
  } catch (err) {
    console.error('Erreur refresh:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Logout ───

exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);
      await pool.execute(
        'DELETE FROM refresh_tokens WHERE token_hash = ?',
        [tokenHash]
      );
    }

    res.clearCookie('refreshToken', { path: '/api/auth' });
    res.json({ message: 'Déconnexion réussie' });
  } catch (err) {
    console.error('Erreur logout:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
