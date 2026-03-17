/**
 * Controller Contact — Envoi d'email via Nodemailer
 */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.send = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: `[Contact] ${subject || 'Nouveau message'}`,
      html: `
        <h3>Nouveau message de contact</h3>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject || 'Non précisé'}</p>
        <hr>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    res.json({ message: 'Message envoyé avec succès' });
  } catch (err) {
    console.error('Erreur envoi email:', err);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
};
