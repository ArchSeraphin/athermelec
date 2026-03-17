import React from 'react';
import SEO from '../components/SEO';

export default function Legal() {
  return (
    <>
      <SEO title="Mentions légales" noindex />

      <section className="page-header">
        <h1>Mentions légales</h1>
      </section>

      <section className="section legal-content">
        <h2>Éditeur du site</h2>
        <p>
          <strong>Raison sociale :</strong> ATHERMELEC SAS<br />
          <strong>Siège social :</strong> 328 route de la Verpillière, 38290 FRONTONAS<br />
          <strong>Téléphone :</strong> 04 74 94 19 89<br />
          <strong>Email :</strong> contact@atherm-elec.com<br />
          <strong>Site web :</strong> www.atherm-elec.com<br />
          <strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)<br />
          <strong>Tribunal compétent :</strong> Tribunal de Commerce de Vienne (38)<br />
          <strong>Droit applicable :</strong> Droit français
        </p>

        <h2>Directeur de la publication</h2>
        <p>Le directeur de la publication est le représentant légal d'ATHERMELEC SAS.</p>

        <h2>Hébergement</h2>
        <p>
          Ce site est hébergé sur un serveur dédié.<br />
          Pour toute information concernant l'hébergeur, veuillez contacter ATHERMELEC SAS.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes)
          sont la propriété exclusive d'ATHERMELEC SAS ou de ses partenaires et sont protégés
          par les lois françaises et internationales relatives à la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication, transmission ou
          dénaturation totale ou partielle du site ou de son contenu, par quelque procédé
          que ce soit, sans l'autorisation préalable écrite d'ATHERMELEC SAS est interdite.
        </p>

        <h2>Limitation de responsabilité</h2>
        <p>
          ATHERMELEC SAS s'efforce d'assurer l'exactitude et la mise à jour des informations
          diffusées sur ce site. Toutefois, ATHERMELEC SAS ne peut garantir l'exactitude,
          la précision ou l'exhaustivité des informations mises à disposition sur ce site.
        </p>
        <p>
          ATHERMELEC SAS décline toute responsabilité pour toute imprécision, inexactitude
          ou omission portant sur des informations disponibles sur ce site.
        </p>

        <h2>Protection des données personnelles</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD)
          et à la loi Informatique et Libertés du 6 janvier 1978, vous disposez d'un droit
          d'accès, de rectification, de suppression et d'opposition aux données personnelles
          vous concernant.
        </p>
        <p>
          Les données collectées via le formulaire de contact (nom, email, message) sont
          utilisées exclusivement pour répondre à vos demandes et ne sont jamais transmises
          à des tiers. Elles sont conservées pour la durée nécessaire au traitement de votre
          demande.
        </p>
        <p>
          Pour exercer vos droits, contactez-nous à :{' '}
          <a href="mailto:contact@atherm-elec.com">contact@atherm-elec.com</a>
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site peut utiliser des cookies à des fins de mesure d'audience (Google Analytics).
          Ces cookies ne sont déposés qu'après votre consentement explicite via la bannière
          de cookies affichée lors de votre première visite.
        </p>
        <p>
          Vous pouvez à tout moment modifier vos préférences en effaçant les données de
          votre navigateur. Aucun cookie publicitaire ou de tracking tiers n'est utilisé
          sans votre consentement.
        </p>

        <h2>Liens hypertextes</h2>
        <p>
          Le site www.atherm-elec.com peut contenir des liens vers d'autres sites internet.
          ATHERMELEC SAS n'exerce aucun contrôle sur ces sites et décline toute responsabilité
          quant à leur contenu.
        </p>
      </section>
    </>
  );
}
