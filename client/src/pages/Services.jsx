import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import {
  IconBolt, IconPower, IconCpu, IconNetwork, IconCompass,
  IconBatteryCharging, IconSnowflake, IconLock,
  IconClipboard, IconMonitor, IconWrench, IconCheckCircle,
  IconCalendar, IconMapPin,
} from '../components/Icons';

const BASE_URL = 'https://www.atherm-elec.com';

const services = [
  {
    icon: <IconBolt />,
    title: 'Haute Tension (HT)',
    description: 'Installation et maintenance des équipements haute tension pour vos sites industriels.',
    items: [
      'Installation de cellules haute tension',
      'Création de postes HT complets',
      'Remplacement de transformateurs HT/BT',
      'Réalisation de têtes de câbles haute tension',
    ]
  },
  {
    icon: <IconPower />,
    title: 'Basse Tension (BT)',
    description: 'Câblage, conception et modernisation de vos installations basse tension.',
    items: [
      'Câblage TGBT (Tableau Général Basse Tension)',
      'Conception et réalisation d\'armoires électriques',
      'Retrofitting d\'armoires existantes',
      'Éclairage industriel & relamping',
    ]
  },
  {
    icon: <IconCpu />,
    title: 'Automatisme & Instrumentation',
    description: 'Programmation d\'automates et instrumentation pour vos lignes de production.',
    items: [
      'Études fonctionnelles & analyses',
      'Programmation automates (Schneider, Siemens, Rockwell)',
      'Instrumentation de cuves et capteurs',
      'Variation de vitesse & positionnement',
      'Régulation & gradation',
      'Supervision SCADA / IHM',
    ]
  },
  {
    icon: <IconNetwork />,
    title: 'Réseaux informatiques & VDI',
    description: 'Architecture et câblage de vos réseaux informatiques industriels.',
    items: [
      'Architecture de réseaux industriels',
      'Précâblage VDI (courant faible)',
      'Installation de baies informatiques',
      'Fibre optique (lovage, installation)',
      'Paramétrage switches & télécommunication',
      'Pose de points d\'accès WiFi',
    ]
  },
  {
    icon: <IconCompass />,
    title: 'Bureau d\'études',
    description: 'Gestion complète de vos projets clé en main, de l\'étude à la mise en service.',
    items: [
      'Élaboration du cahier des charges',
      'Rédaction d\'analyses fonctionnelles',
      'Programmation',
      'Installation',
      'Mise en service',
      'Logiciels : AutoCAD, SEE Electrical Expert Gold',
    ]
  },
  {
    icon: <IconBatteryCharging />,
    title: 'IRVE — Recharge Véhicules Électriques',
    description: 'Installation certifiée d\'infrastructures de recharge pour vos flottes d\'entreprise.',
    items: [
      'Certification IRVE niveaux 1 et 2',
      'Étude et dimensionnement',
      'Installation de bornes de recharge',
      'Mise en service et documentation',
    ]
  },
  {
    icon: <IconSnowflake />,
    title: 'Climatisation industrielle',
    description: 'Étude et installation de systèmes climatiques pour vos locaux industriels.',
    items: [
      'Étude des besoins thermiques',
      'Installation de systèmes CVC',
      'Maintenance et mise en service',
    ]
  },
  {
    icon: <IconLock />,
    title: 'Sécurité & Contrôle d\'accès',
    description: 'Sécurisation de vos sites industriels et gestion des accès.',
    items: [
      'Barrières automatiques & portails',
      'Contrôle d\'accès & tourniquet',
      'Interphonie',
      'Sécurisation mécanique des machines',
    ]
  }
];

const logiciels = [
  { cat: 'Plans / CAO', items: ['AutoCAD', 'SEE ELECTRICAL EXPERT (Gold)'] },
  { cat: 'Automates Schneider', items: ['UNITY', 'PL7 PRO', 'TWIDOSOFT', 'ZELIO SOFT'] },
  { cat: 'Automates Siemens', items: ['STEP 7', 'MICROWIN', 'LOGO'] },
  { cat: 'Automates Rockwell / autres', items: ['CODESYS', 'RS LOGIX 5000'] },
  { cat: 'IHM / Supervision', items: ['VIJEO DESIGNER / XBTL1000', 'GP PRO / FACTORY TALK VIEW'] },
  { cat: 'Variation de vitesse', items: ['SoMove'] },
  { cat: 'Bus de terrain', items: ['MODBUS TCP', 'PROFIBUS', 'ETHERNET', 'CANOPEN'] },
  { cat: 'Calculs électriques', items: ['SEE CALCULATION', 'CANECO'] },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Nos services — Électricité HT/BT, Automatisme, Réseaux VDI"
        description="ATHERMELEC propose l'électricité haute et basse tension, l'automatisme industriel, les réseaux VDI, le bureau d'études et l'IRVE. Interventions en Isère (38) et Haute-Garonne (31)."
        canonical={`${BASE_URL}/services`}
      />

      <section className="page-header page-header-img">
        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
          alt="Baie de serveurs et infrastructure réseau industrielle"
          className="page-header-bg"
          loading="eager"
        />
        <div className="page-header-content">
          <h1>Nos services</h1>
          <p>De la haute tension à l'automatisme, en passant par les réseaux — toute l'électricité industrielle</p>
        </div>
      </section>

      {/* Grille des services */}
      <ScrollReveal>
        <div className="section-full section-white">
          <section className="section">
            <div className="section-header centered">
              <span className="label-tag">Nos prestations</span>
              <h2 className="section-title">L'expertise électrique industrielle complète</h2>
              <p className="section-subtitle">
                Chaque prestation est réalisée par des techniciens habilités et certifiés,
                dans le respect des normes en vigueur et des exigences de sécurité MASE.
              </p>
            </div>
            <div className="services-grid">
              {services.map((s, i) => (
                <div key={i} className="service-card">
                  <div className="service-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <ul>
                    {s.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* Bureau d'études — logiciels */}
      <ScrollReveal>
        <div className="section-full section-gray">
          <section className="section">
            <div className="section-header centered">
              <span className="label-tag">Bureau d'études</span>
              <h2 className="section-title">Nos logiciels et technologies</h2>
              <p className="section-subtitle">
                Notre bureau d'études maîtrise l'ensemble des outils de conception
                et de programmation industrielle du marché.
              </p>
            </div>
            <div className="card-grid">
              {logiciels.map((l, i) => (
                <div key={i} className="card">
                  <div className="card-body">
                    <h3>{l.cat}</h3>
                    <ul style={{ marginTop: '0.75rem' }}>
                      {l.items.map((item, j) => (
                        <li key={j} style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', padding: '0.2rem 0 0.2rem 1rem', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--color-blue)' }}>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* Modèle commercial */}
      <ScrollReveal>
        <div className="section-full section-white">
          <section className="section">
            <div className="section-header centered">
              <span className="label-tag">Comment nous travaillons</span>
              <h2 className="section-title">Projets clé en main</h2>
              <p className="section-subtitle">
                ATHERMELEC prend en charge l'intégralité de vos projets, de la conception
                à la mise en service, en France et à l'international.
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon"><IconClipboard /></div>
                <h3>1. Étude & conception</h3>
                <p>Élaboration du cahier des charges, analyses fonctionnelles et conception avec AutoCAD et SEE Electrical.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconMonitor /></div>
                <h3>2. Programmation</h3>
                <p>Développement et tests des programmes automates et systèmes de supervision en atelier.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconWrench /></div>
                <h3>3. Installation</h3>
                <p>Câblage et installation sur site par des techniciens habilités, dans le respect des normes.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconCheckCircle /></div>
                <h3>4. Mise en service</h3>
                <p>Tests, réglages et validation de l'ensemble de l'installation avec formation des équipes.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconCalendar /></div>
                <h3>Conditions commerciales</h3>
                <p>Acompte de 30% à la signature — facturation mensuelle sur avancement — paiement 30 jours.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><IconMapPin /></div>
                <h3>Zone d'intervention</h3>
                <p>Interventions en France et à l'international, depuis nos deux sites de Frontonas (38) et Pechbonnieu (31).</p>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <div className="cta-section">
          <div className="cta-section-inner">
            <h2>Un projet à nous soumettre ?</h2>
            <p>Contactez notre bureau d'études pour une analyse de votre besoin et un devis personnalisé.</p>
            <div className="hero-ctas" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary btn-lg">Demander un devis</Link>
              <Link to="/realisations" className="btn btn-ghost btn-lg">Voir nos réalisations</Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}
