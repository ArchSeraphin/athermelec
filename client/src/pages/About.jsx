import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import {
  IconFactory, IconGlobe,
  IconFlask, IconFlame, IconCross, IconDiamond, IconWind, IconBuilding,
  IconShield, IconWheat,
} from '../components/Icons';

const BASE_URL = 'https://www.atherm-elec.com';

export default function About() {
  return (
    <>
      <SEO
        title="À propos — Notre histoire et nos valeurs"
        description="Fondée en 1983, ATHERMELEC est spécialisée en électricité industrielle haute tension, automatisme et réseaux. Certifiée MASE, reprise par ses salariés via MABAHJO."
        canonical={`${BASE_URL}/a-propos`}
      />

      <section className="page-header page-header-img">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
          alt="Composants électroniques et carte PCB industrielle"
          className="page-header-bg"
          loading="eager"
        />
        <div className="page-header-content">
          <h1>À propos d'Athermelec</h1>
          <p>Depuis 1983, l'expertise électrique industrielle au service de vos projets</p>
        </div>
      </section>

      {/* Histoire */}
      <ScrollReveal>
        <div className="section-full section-white">
          <section className="section">
            <div className="section-header">
              <span className="label-tag">Notre histoire</span>
              <h2 className="section-title">Plus de 35 ans d'expertise industrielle</h2>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-year">1983</span>
                <h3>Fondation de JOC'elec</h3>
                <p>Mr Jean-François JOCTEUR fonde JOC'elec à Frontonas (Isère), spécialisée dans l'électricité industrielle pour les entreprises de la région.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-year">Années 90 / 2000</span>
                <h3>Naissance d'ATHERMELEC</h3>
                <p>JOC'elec est reprise par le groupe ATHERM et devient ATHERMELEC. L'entreprise se développe et renforce son expertise en électricité industrielle haute tension.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-year">Expansion</span>
                <h3>Acquisition d'ACTIF Réseau</h3>
                <p>ATHERMELEC reprend ACI Réseaux et sa filiale toulousaine ACTIF Réseau, spécialisée en VDI et fibre optique, ouvrant un second site à Pechbonnieu (Haute-Garonne).</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-year">2008</span>
                <h3>Certification MASE</h3>
                <p>ATHERMELEC obtient la certification MASE (Manuel d'Amélioration Sécurité des Entreprises), attestant de son engagement fort pour la sécurité de ses équipes.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-year">Récent</span>
                <h3>Reprise par MABAHJO</h3>
                <p>ATHERMELEC est rachetée par MABAHJO, un groupement de salariés internes, garantissant la continuité et l'indépendance de l'entreprise, pilotée par ceux qui la font vivre au quotidien.</p>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* Deux sites */}
      <ScrollReveal>
        <div className="section-full section-gray">
          <section className="section">
            <div className="section-header centered">
              <span className="label-tag">Nos implantations</span>
              <h2 className="section-title">Deux sites, une expertise complémentaire</h2>
            </div>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon"><IconFactory /></div>
                <h3>Frontonas (38) — Siège social</h3>
                <p>328 route de la Verpillière, 38290 FRONTONAS</p>
                <ul>
                  <li>Électricité industrielle HT / BT</li>
                  <li>Automatisme & instrumentation</li>
                  <li>Réseaux VDI & fibre optique</li>
                  <li>Bureau d'études clé en main</li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
                  <strong>Tél :</strong> <a href="tel:+33474941989">04 74 94 19 89</a><br />
                  <a href="mailto:contact@atherm-elec.com">contact@atherm-elec.com</a><br />
                  <strong>Secteur :</strong> Industrie
                </p>
              </div>
              <div className="service-card">
                <div className="service-icon"><IconGlobe /></div>
                <h3>Saint-Jory (31) — ACTIF RÉSEAU</h3>
                <p>9 impasse de los Appares, 31790 SAINT-JORY</p>
                <ul>
                  <li>Câblage informatique VDI</li>
                  <li>Fibre optique & lovage</li>
                  <li>Milieu industriel & public</li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
                  <strong>Tél :</strong> <a href="tel:+33750125154">07 50 12 51 54</a><br />
                  <a href="mailto:actifreseau@orange.fr">actifreseau@orange.fr</a><br />
                  <strong>Secteur :</strong> Industrie + public
                </p>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* Marchés */}
      <ScrollReveal>
        <div className="section-full section-white">
          <section className="section">
            <div className="section-header centered">
              <span className="label-tag">Secteurs d'activité</span>
              <h2 className="section-title">Nos marchés</h2>
              <p className="section-subtitle">
                ATHERMELEC intervient principalement dans les secteurs industriels exigeants,
                où la fiabilité et la certification sont indispensables.
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon"><IconFlask /></div>
                <h3>Industrie chimique</h3>
                <p>Installations certifiées ATEX pour les environnements à risque explosif.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconFlame /></div>
                <h3>Pétrochimie</h3>
                <p>Câblage et automatisme pour les sites pétrochimiques et raffineries.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconCross /></div>
                <h3>Pharmaceutique</h3>
                <p>Précision et traçabilité pour les installations en milieu pharmaceutique.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconDiamond /></div>
                <h3>Cosmétique</h3>
                <p>Électricité et automatisme pour les sites de production cosmétique.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconWind /></div>
                <h3>Traitement de l'air</h3>
                <p>Instrumentation et régulation pour les systèmes de traitement d'air.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconBuilding /></div>
                <h3>Tertiaire & public</h3>
                <p>Réseaux VDI et câblage pour les bâtiments tertiaires et publics.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconShield /></div>
                <h3>Défense</h3>
                <p>Installations électriques et automatismes pour les sites et équipements de défense.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconWheat /></div>
                <h3>Agroalimentaire</h3>
                <p>Électricité industrielle et automatisme pour les lignes de production agroalimentaires.</p>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* Valeurs */}
      <ScrollReveal>
        <div className="section-full section-gray">
          <section className="section">
            <div className="section-header centered">
              <span className="label-tag">Nos valeurs</span>
              <h2 className="section-title">Ce qui nous engage chaque jour</h2>
            </div>
            <div className="values-grid">
              <div className="value-item">
                <h3>Respect du cahier des charges</h3>
                <p>Chaque projet est réalisé conformément aux spécifications définies avec le client, sans compromis sur la qualité.</p>
              </div>
              <div className="value-item">
                <h3>Respect des délais</h3>
                <p>Notre organisation industrielle et notre expérience nous permettent de tenir les plannings les plus contraints.</p>
              </div>
              <div className="value-item">
                <h3>Sécurité du personnel</h3>
                <p>Certifiés MASE, nous plaçons la sécurité de nos techniciens et de vos équipes au cœur de chaque intervention.</p>
              </div>
              <div className="value-item">
                <h3>Efficacité & réactivité</h3>
                <p>Des équipes expérimentées capables d'intervenir rapidement sur votre site pour minimiser les arrêts de production.</p>
              </div>
              <div className="value-item">
                <h3>Professionnalisme</h3>
                <p>Techniciens habilités et certifiés, utilisant les meilleurs outils de conception et de programmation du marché.</p>
              </div>
              <div className="value-item">
                <h3>Engagement client</h3>
                <p>Un interlocuteur dédié de l'étude à la mise en service, pour un suivi personnalisé de votre projet.</p>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* Certifications */}
      <ScrollReveal>
        <div className="section-full section-white">
          <section className="section">
            <div className="section-header centered">
              <span className="label-tag">Certifications</span>
              <h2 className="section-title">Nos qualifications</h2>
            </div>
            <div className="certif-grid">
              <div className="certif-item">
                <div className="certif-badge">MASE</div>
                <h4>Certifié depuis 2008</h4>
                <p>Manuel d'Amélioration Sécurité des Entreprises</p>
              </div>
              <div className="certif-item">
                <div className="certif-badge">ATEX</div>
                <h4>ISM ATEX</h4>
                <p>Zones à atmosphère explosible — chimie, pétrochimie</p>
              </div>
              <div className="certif-item">
                <div className="certif-badge">IRVE</div>
                <h4>Niveaux 1 & 2</h4>
                <p>Infrastructure de Recharge pour Véhicules Électriques</p>
              </div>
              <div className="certif-item">
                <div className="certif-badge">SEE</div>
                <h4>Gold — CAO électrique</h4>
                <p>Certification Gold SEE Electrical Expert</p>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <div className="cta-section">
          <div className="cta-section-inner">
            <h2>Travaillons ensemble</h2>
            <p>Contactez-nous pour discuter de votre projet électrique ou automatisme.</p>
            <Link to="/contact" className="btn btn-primary btn-lg">Prendre contact</Link>
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}
