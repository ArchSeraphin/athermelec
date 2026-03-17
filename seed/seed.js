/**
 * Seed — Création des tables MySQL + compte admin initial
 *
 * Usage : node seed/seed.js <email> <password>
 */

require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function seed() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error('Usage : node seed/seed.js <email> <password>');
    process.exit(1);
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  });

  console.log('📦 Création des tables...');

  // Table admins
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Table articles
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      excerpt TEXT,
      content LONGTEXT,
      cover_image VARCHAR(500),
      published TINYINT(1) DEFAULT 0,
      published_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Table refresh_tokens
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id INT AUTO_INCREMENT PRIMARY KEY,
      admin_id INT NOT NULL,
      token_hash VARCHAR(64) NOT NULL UNIQUE,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_token_hash (token_hash),
      FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Table partners
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS partners (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      logo_url VARCHAR(500),
      website_url VARCHAR(500),
      description TEXT,
      display_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Table realisations
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS realisations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      content LONGTEXT,
      cover_image VARCHAR(500),
      category VARCHAR(100),
      date_realisation DATE,
      published TINYINT(1) DEFAULT 0,
      display_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_category (category),
      INDEX idx_published (published)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Table settings
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      \`key\` VARCHAR(100) NOT NULL UNIQUE,
      value TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Paramètres par défaut
  const defaultSettings = [
    ['site_name', 'Athermelec'],
    ['contact_phone', '04 74 94 19 89'],
    ['contact_email_display', 'contact@atherm-elec.com'],
    ['ga_measurement_id', '']
  ];

  for (const [key, value] of defaultSettings) {
    await connection.execute(
      'INSERT IGNORE INTO settings (`key`, value) VALUES (?, ?)',
      [key, value]
    );
  }

  console.log('✅ Tables créées');

  // Créer ou mettre à jour le compte admin
  const passwordHash = await bcrypt.hash(password, 12);

  const [existing] = await connection.execute(
    'SELECT id FROM admins WHERE email = ?',
    [email]
  );

  if (existing.length > 0) {
    await connection.execute(
      'UPDATE admins SET password_hash = ? WHERE email = ?',
      [passwordHash, email]
    );
    console.log(`🔄 Compte admin mis à jour : ${email}`);
  } else {
    await connection.execute(
      'INSERT INTO admins (email, password_hash) VALUES (?, ?)',
      [email, passwordHash]
    );
    console.log(`🆕 Compte admin créé : ${email}`);
  }

  await connection.end();
  console.log('🎉 Seed terminé !');
}

seed().catch(err => {
  console.error('❌ Erreur seed:', err);
  process.exit(1);
});
