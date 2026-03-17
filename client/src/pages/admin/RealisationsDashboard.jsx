import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../App';

export default function RealisationsDashboard() {
  const [realisations, setRealisations] = useState([]);
  const { authFetch } = useAuth();

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    try {
      const res = await authFetch('/api/admin/realisations');
      const data = await res.json();
      setRealisations(Array.isArray(data) ? data : []);
    } catch (err) {}
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer cette réalisation ?')) return;
    await authFetch(`/api/admin/realisations/${id}`, { method: 'DELETE' });
    load();
  }

  async function handleTogglePublish(id) {
    await authFetch(`/api/admin/realisations/${id}/publish`, { method: 'PATCH' });
    load();
  }

  return (
    <section className="section">
      <div className="admin-header">
        <h1>Réalisations</h1>
        <div className="admin-actions">
          <Link to="/admin/realisations/new" className="btn btn-primary">+ Nouvelle réalisation</Link>
          <Link to="/admin" className="btn btn-outline">← Dashboard</Link>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Catégorie</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {realisations.map(r => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td>{r.category || '—'}</td>
              <td>
                <span className={`badge ${r.published ? 'badge-success' : 'badge-draft'}`}>
                  {r.published ? 'Publié' : 'Brouillon'}
                </span>
              </td>
              <td>{new Date(r.created_at).toLocaleDateString('fr-FR')}</td>
              <td className="admin-table-actions">
                <Link to={`/admin/realisations/${r.id}`} className="btn btn-sm">Modifier</Link>
                <button onClick={() => handleTogglePublish(r.id)} className="btn btn-sm btn-outline">
                  {r.published ? 'Dépublier' : 'Publier'}
                </button>
                <button onClick={() => handleDelete(r.id)} className="btn btn-sm btn-danger">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {realisations.length === 0 && (
        <p className="empty-state">Aucune réalisation. Créez la première !</p>
      )}
    </section>
  );
}
