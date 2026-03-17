import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Page non trouvée" noindex />

      <section className="section not-found">
        <h1>404</h1>
        <p>Cette page n'existe pas ou a été déplacée.</p>
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
      </section>
    </>
  );
}
