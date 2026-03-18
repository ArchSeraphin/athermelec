import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../App';

const CATEGORIES = [
  'Haute Tension',
  'Basse Tension',
  'Automatisme',
  'Réseaux VDI',
  'Fibre optique',
  'Éclairage',
  'Sécurité',
  'Autre',
];

export default function RealisationEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authFetch } = useAuth();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    cover_image: '',
    category: '',
    date_realisation: '',
    published: false,
    display_order: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    authFetch('/api/admin/realisations')
      .then(res => res.json())
      .then(list => {
        const item = list.find(r => r.id === parseInt(id));
        if (item) {
          setForm({
            title: item.title || '',
            description: item.description || '',
            content: item.content || '',
            cover_image: item.cover_image || '',
            category: item.category || '',
            date_realisation: item.date_realisation
              ? item.date_realisation.split('T')[0]
              : '',
            published: !!item.published,
            display_order: item.display_order || 0
          });
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await authFetch('/api/admin/media/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Erreur serveur (${res.status})`);
      if (data.url) setForm(f => ({ ...f, cover_image: data.url }));
    } catch (err) {
      setUploadError(err.message || 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit ? `/api/admin/realisations/${id}` : '/api/admin/realisations';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erreur');
      }

      navigate('/admin/realisations');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section admin-editor">
      <div className="admin-header">
        <h1>{isEdit ? 'Modifier la réalisation' : 'Nouvelle réalisation'}</h1>
        <Link to="/admin/realisations" className="btn btn-outline btn-sm">← Retour</Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre *</label>
          <input
            type="text" id="title" name="title"
            className="form-input" required
            value={form.title} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie</label>
          <select id="category" name="category" className="form-input" value={form.category} onChange={handleChange}>
            <option value="">— Choisir une catégorie —</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description courte</label>
          <textarea
            id="description" name="description" rows="3"
            className="form-input"
            value={form.description} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Contenu détaillé (HTML)</label>
          <textarea
            id="content" name="content" rows="8"
            className="form-input"
            value={form.content} onChange={handleChange}
            placeholder="Optionnel — description détaillée du projet"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_realisation">Date de réalisation</label>
          <input
            type="date" id="date_realisation" name="date_realisation"
            className="form-input"
            value={form.date_realisation} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="display_order">Ordre d'affichage</label>
          <input
            type="number" id="display_order" name="display_order"
            className="form-input"
            value={form.display_order} onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Image principale</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
          {uploading && <p style={{ color: 'var(--text-2)', marginTop: '0.5rem' }}>Upload en cours…</p>}
          {uploadError && <div className="alert alert-error" style={{ marginTop: '0.5rem' }}>{uploadError}</div>}
          {form.cover_image && (
            <div className="image-preview">
              <img src={form.cover_image} alt="Aperçu" />
              <button type="button" className="btn btn-sm btn-danger mt-3" onClick={() => setForm(f => ({ ...f, cover_image: '' }))}>
                Supprimer l'image
              </button>
            </div>
          )}
        </div>

        <div className="form-group form-checkbox">
          <input
            type="checkbox" id="published" name="published"
            checked={form.published} onChange={handleChange}
          />
          <label htmlFor="published">Publier immédiatement</label>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/admin/realisations')}>
            Annuler
          </button>
        </div>
      </form>
    </section>
  );
}
