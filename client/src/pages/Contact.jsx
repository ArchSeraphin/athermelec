import React, { useState } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const BASE_URL = 'https://www.atherm-elec.com';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.errors?.[0]?.msg || 'Erreur lors de l\'envoi');
      }

      setStatus({ type: 'success', message: 'Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact — Frontonas (38) & Pechbonnieu (31)"
        description="Contactez ATHERMELEC pour vos projets en électricité industrielle, automatisme et réseaux. Siège à Frontonas (38) — 04 74 94 19 89. Site de Pechbonnieu (31) — 05 61 71 15 32."
        canonical={`${BASE_URL}/contact`}
      />

      <section className="page-header page-header-img">
        <img
          src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1600&q=80"
          alt="Armoire électrique industrielle et câblage"
          className="page-header-bg"
          loading="eager"
        />
        <div className="page-header-content">
          <h1>Contactez-nous</h1>
          <p>Deux sites à votre service — Frontonas (38) et Pechbonnieu (31)</p>
        </div>
      </section>

      <ScrollReveal>
        <div className="section-full section-white">
          <section className="section">
            <div className="contact-grid">
              {/* Formulaire */}
              <div>
                <div className="section-header">
                  <span className="label-tag">Formulaire de contact</span>
                  <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Envoyez-nous un message</h2>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Nom / Société *</label>
                    <input
                      type="text" id="name" name="name"
                      className="form-input" required
                      placeholder="Votre nom ou raison sociale"
                      value={form.name} onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email" id="email" name="email"
                      className="form-input" required
                      placeholder="votre@email.com"
                      value={form.email} onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Sujet</label>
                    <input
                      type="text" id="subject" name="subject"
                      className="form-input"
                      placeholder="Objet de votre demande"
                      value={form.subject} onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message" name="message" rows="6"
                      className="form-input" required maxLength="5000"
                      placeholder="Décrivez votre projet ou votre demande..."
                      value={form.message} onChange={handleChange}
                    />
                  </div>

                  {status && (
                    <div className={`alert alert-${status.type}`}>{status.message}</div>
                  )}

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </form>
              </div>

              {/* Infos de contact */}
              <div className="contact-info">
                <div className="contact-site">
                  <h3>
                    Frontonas (38)
                    <span className="contact-site-tag">Siège social</span>
                  </h3>
                  <address>
                    <strong>ATHERMELEC SAS</strong><br />
                    328 route de la Verpillière<br />
                    38290 FRONTONAS<br /><br />
                    <strong>Tél :</strong> <a href="tel:+33474941989">04 74 94 19 89</a><br />
                    <strong>Fax :</strong> 04 74 99 04 95<br />
                    <a href="mailto:contact@atherm-elec.com">contact@atherm-elec.com</a>
                  </address>
                  <div className="contact-map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.5!2d5.1447!3d45.6272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4e0a0a0a0a0a0%3A0x0!2s328+Route+de+la+Verpilli%C3%A8re%2C+38290+Frontonas!5e0!3m2!1sfr!2sfr!4v1"
                      title="Athermelec Frontonas"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

                <div className="contact-site">
                  <h3>
                    Pechbonnieu (31)
                    <span className="contact-site-tag">ACTIF RÉSEAU</span>
                  </h3>
                  <address>
                    <strong>ACTIF RÉSEAU</strong><br />
                    ZA le Grands – 17 rue des artisans<br />
                    31140 PECHBONNIEU<br /><br />
                    <strong>Tél :</strong> <a href="tel:+33561711532">05 61 71 15 32</a><br />
                    <strong>Fax :</strong> 05 34 36 94 76
                  </address>
                  <div className="contact-map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.5!2d1.4756!3d43.7064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s17+Rue+des+Artisans%2C+31140+Pechbonnieu!5e0!3m2!1sfr!2sfr!4v1"
                      title="Actif Réseau Pechbonnieu"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>
    </>
  );
}
