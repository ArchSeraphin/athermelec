import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../App';

export default function PartnersDashboard() {
  const [partners, setPartners] = useState([]);
  const { authFetch } = useAuth();

  useEffect(() => { loadPartners(); }, []);

  async function loadPartners() {
    try {
      const res = await fetch('/api/partners');
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer ce partenaire ?')) return;
    await authFetch(`/api/admin/partners/${id}`, { method: 'DELETE' });
    loadPartners();
  }

  return (
    <section className="section admin-dashboard">
      <div className="admin-header">
        <h1>Partenaires</h1>
        <div className="admin-actions">
          <Link to="/admin/partenaires/new" className="btn btn-primary">+ Nouveau partenaire</Link>
          <Link to="/admin" className="btn">← Dashboard</Link>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Site web</th>
            <th>Ordre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.website_url || '—'}</td>
              <td>{p.display_order}</td>
              <td className="admin-table-actions">
                <Link to={`/admin/partenaires/${p.id}`} className="btn btn-sm">Modifier</Link>
                <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-danger">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {partners.length === 0 && (
        <p className="empty-state">Aucun partenaire.</p>
      )}
    </section>
  );
}
