import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const BASE_URL = 'https://www.atherm-elec.com';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/articles?limit=3', { signal: controller.signal })
      .then(res => res.json())
      .then(data => setArticles(data.articles || []))
      .catch(err => { if (err.name !== 'AbortError') {} });
    return () => controller.abort();
  }, []);

  return (
    <>
      <SEO
        title="Électricité & Automatisme Industriel depuis 1983"
        description="ATHERMELEC — Expert en électricité industrielle haute et basse tension, automatisme, réseaux VDI et fibre optique. Certifié MASE. Isère (38) & Haute-Garonne (31)."
        canonical={`${BASE_URL}/`}
        ogImage={`${BASE_URL}/img/og-default.jpg`}
      />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="/img/photos/hero-industrie.jpg"
            alt="Technicien Athermelec intervenant sur armoire électrique industrielle"
            className="hero-bg-img"
            loading="eager"
          />
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">Certifié MASE depuis 2008</div>
          <h1 className="hero-title">
            L'expertise électrique<br />
            au service de <em>l'industrie</em>
          </h1>
          <p className="hero-subtitle">
            ATHERMELEC conçoit et installe vos équipements électriques industriels —
            haute tension, automatisme, réseaux VDI — depuis 1983, en Isère et Haute-Garonne.
          </p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn btn-primary btn-lg">Demander un devis</Link>
            <Link to="/services" className="btn btn-ghost btn-lg">Nos expertises</Link>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">↓</div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="stats-bar">
        <div className="stats-bar-inner">
          <div className="stat-item">
            <span className="stat-number">+35</span>
            <span className="stat-label">Années d'expérience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2</span>
            <span className="stat-label">Sites en France</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">MASE</span>
            <span className="stat-label">Certifié sécurité</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">HT/BT</span>
            <span className="stat-label">Courant fort & faible</span>
          </div>
        </div>
      </div>

      {/* ── Services ── */}
      <ScrollReveal>
        <div className="section-full section-white">
          <section className="section">
            <div className="section-header centered">
              <span className="label-tag">Nos expertises</span>
              <h2 className="section-title">Tout l'électrique industriel,<br />un seul interlocuteur</h2>
              <p className="section-subtitle">
                De l'étude à la mise en service, ATHERMELEC intervient sur l'ensemble
                de vos installations électriques et informatiques industrielles.
              </p>
            </div>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">⚡</div>
                <h3>Courant fort HT / BT</h3>
                <p>Installation de cellules haute tension, câblage TGBT, conception et retrofitting d'armoires, têtes de câbles HT.</p>
                <ul>
                  <li>Postes haute tension complets</li>
                  <li>Remplacement transformateurs HT/BT</li>
                  <li>Câblage TGBT & armoires électriques</li>
                </ul>
              </div>
              <div className="service-card">
                <div className="service-icon">🔧</div>
                <h3>Automatisme & Instrumentation</h3>
                <p>Programmation d'automates Schneider, Siemens et Rockwell, variation de vitesse, régulation et supervision SCADA.</p>
                <ul>
                  <li>Automates Schneider, Siemens, Rockwell</li>
                  <li>Variation de vitesse & positionnement</li>
                  <li>Supervision SCADA / IHM</li>
                </ul>
              </div>
              <div className="service-card">
                <div className="service-icon">🌐</div>
                <h3>Réseaux informatiques & VDI</h3>
                <p>Précâblage VDI, fibre optique, baies informatiques et paramétrage de switches pour vos environnements industriels.</p>
                <ul>
                  <li>Architecture réseau industriel</li>
                  <li>Fibre optique & lovage</li>
                  <li>Paramétrage switches & télécoms</li>
                </ul>
              </div>
              <div className="service-card">
                <div className="service-icon">📐</div>
                <h3>Bureau d'études</h3>
                <p>Gestion de projets clé en main : cahier des charges, analyses fonctionnelles, programmation, installation et mise en service.</p>
                <ul>
                  <li>Certification SEE Electrical Gold</li>
                  <li>CAO AutoCAD & SEE ELECTRICAL</li>
                  <li>Projets clé en main complets</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link to="/services" className="btn btn-outline">Découvrir toutes nos prestations</Link>
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* ── À propos snippet ── */}
      <ScrollReveal>
        <div className="section-full section-gray">
          <section className="section">
            <div className="two-col">
              <div className="two-col-text">
                <span className="label-tag">Qui sommes-nous</span>
                <h2 className="section-title">Fondée en 1983,<br />reprise par ses équipes</h2>
                <p>
                  ATHERMELEC est née sous le nom de JOC'elec en 1983 à Frontonas (Isère).
                  Après des décennies d'expertise en électricité industrielle, l'entreprise
                  a été reprise par MABAHJO, un groupement de salariés internes.
                </p>
                <p>
                  Avec deux sites — Frontonas (38) pour l'électricité industrielle et
                  Pechbonnieu (31) pour les réseaux informatiques — ATHERMELEC couvre
                  l'ensemble de la France et intervient également à l'international.
                </p>
                <div className="form-actions mt-4">
                  <Link to="/a-propos" className="btn btn-outline">Notre histoire</Link>
                  <Link to="/realisations" className="btn btn-outline-blue">Nos réalisations</Link>
                </div>
              </div>
              <div className="two-col-img">
                <img
                  src="/img/photos/equipe-athermelec.jpg"
                  alt="L'équipe Athermelec"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* ── Certifications ── */}
      <ScrollReveal>
        <div className="section-full section-white">
          <section className="section">
            <div className="section-header centered">
              <span className="label-tag">Qualifications</span>
              <h2 className="section-title">Des garanties de qualité et sécurité</h2>
            </div>
            <div className="certif-grid">
              <div className="certif-item">
                <div className="certif-badge">MASE</div>
                <h4>Sécurité entreprise</h4>
                <p>Certifié depuis 2008 — Manuel d'Amélioration Sécurité des Entreprises</p>
              </div>
              <div className="certif-item">
                <div className="certif-badge">ATEX</div>
                <h4>Zones explosibles</h4>
                <p>Qualifié ISM ATEX — interventions en zones à atmosphère explosible</p>
              </div>
              <div className="certif-item">
                <div className="certif-badge">IRVE</div>
                <h4>Recharge électrique</h4>
                <p>Certification IRVE niveaux 1 et 2 — infrastructure recharge VE</p>
              </div>
              <div className="certif-item">
                <div className="certif-badge">SEE</div>
                <h4>CAO électrique Gold</h4>
                <p>Certification SEE Electrical Expert Gold — CAO électrique</p>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* ── Actualités ── */}
      {articles.length > 0 && (
        <ScrollReveal>
          <div className="section-full section-gray">
            <section className="section">
              <div className="section-header">
                <span className="label-tag">Actualités</span>
                <h2 className="section-title">Dernières nouvelles</h2>
              </div>
              <div className="card-grid">
                {articles.map(article => (
                  <Link to={`/actualites/${article.slug}`} key={article.id} className="card">
                    {article.cover_image && (
                      <img src={article.cover_image} alt={article.title} className="card-image" loading="lazy" />
                    )}
                    <div className="card-body">
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      {article.published_at && (
                        <span className="card-date">
                          {new Date(article.published_at).toLocaleDateString('fr-FR', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link to="/actualites" className="btn btn-outline">Toutes les actualités</Link>
              </div>
            </section>
          </div>
        </ScrollReveal>
      )}

      {/* ── CTA ── */}
      <ScrollReveal>
        <div className="cta-section">
          <div className="cta-section-inner">
            <h2>Un projet électrique ou automatisme ?</h2>
            <p>Contactez nos équipes à Frontonas (38) ou Pechbonnieu (31) pour une étude personnalisée de votre installation.</p>
            <div className="hero-ctas" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary btn-lg">Nous contacter</Link>
              <a href="tel:+33474941989" className="btn btn-ghost btn-lg">04 74 94 19 89</a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}
