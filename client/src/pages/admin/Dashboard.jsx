import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const { authFetch, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadArticles() {
    try {
      const res = await authFetch('/api/admin/articles');
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {}
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer cet article ?')) return;
    await authFetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
    loadArticles();
  }

  async function handleTogglePublish(id) {
    await authFetch(`/api/admin/articles/${id}/publish`, { method: 'PATCH' });
    loadArticles();
  }

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  return (
    <section className="section admin-dashboard">
      <div className="admin-header">
        <h1>Dashboard Athermelec</h1>
        <div className="admin-actions">
          <button onClick={handleLogout} className="btn btn-outline btn-sm">Déconnexion</button>
        </div>
      </div>

      {/* Navigation rapide */}
      <div className="admin-sections">
        <Link to="/admin/articles/new" className="admin-section-link">
          <span className="admin-section-icon">📝</span>
          Nouvel article
        </Link>
        <Link to="/admin/realisations" className="admin-section-link">
          <span className="admin-section-icon">🏗️</span>
          Réalisations
        </Link>
        <Link to="/admin/partenaires" className="admin-section-link">
          <span className="admin-section-icon">🤝</span>
          Partenaires
        </Link>
        <Link to="/admin/settings" className="admin-section-link">
          <span className="admin-section-icon">⚙️</span>
          Paramètres
        </Link>
      </div>

      {/* Articles */}
      <div className="admin-header">
        <h2 style={{ fontSize: '1.25rem', color: 'var(--color-navy)' }}>Articles</h2>
        <Link to="/admin/articles/new" className="btn btn-primary btn-sm">+ Nouvel article</Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>
                <span className={`badge ${article.published ? 'badge-success' : 'badge-draft'}`}>
                  {article.published ? 'Publié' : 'Brouillon'}
                </span>
              </td>
              <td>{new Date(article.created_at).toLocaleDateString('fr-FR')}</td>
              <td className="admin-table-actions">
                <Link to={`/admin/articles/${article.id}`} className="btn btn-sm">Modifier</Link>
                <button onClick={() => handleTogglePublish(article.id)} className="btn btn-sm btn-outline">
                  {article.published ? 'Dépublier' : 'Publier'}
                </button>
                <button onClick={() => handleDelete(article.id)} className="btn btn-sm btn-danger">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {articles.length === 0 && (
        <p className="empty-state">Aucun article. Créez le premier !</p>
      )}
    </section>
  );
}
