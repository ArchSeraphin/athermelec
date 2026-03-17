import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authFetch } = useAuth();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    published: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    authFetch('/api/admin/articles')
      .then(res => res.json())
      .then(articles => {
        const article = Array.isArray(articles) && articles.find(a => a.id === parseInt(id));
        if (article) {
          setForm({
            title: article.title || '',
            excerpt: article.excerpt || '',
            content: article.content || '',
            cover_image: article.cover_image || '',
            published: !!article.published
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
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await authFetch('/api/admin/media/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setForm(f => ({ ...f, cover_image: data.url }));
    } catch (err) {}
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit ? `/api/admin/articles/${id}` : '/api/admin/articles';
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

      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section admin-editor">
      <div className="admin-header">
        <h1>{isEdit ? "Modifier l'article" : 'Nouvel article'}</h1>
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
          <label htmlFor="excerpt">Extrait</label>
          <textarea
            id="excerpt" name="excerpt" rows="3"
            className="form-input"
            value={form.excerpt} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Contenu (HTML)</label>
          <textarea
            id="content" name="content" rows="14"
            className="form-input"
            value={form.content} onChange={handleChange}
            placeholder="Contenu de l'article en HTML — ex : <p>Texte</p> <h2>Titre</h2>"
          />
        </div>

        <div className="form-group">
          <label>Image de couverture</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {form.cover_image && (
            <div className="image-preview">
              <img src={form.cover_image} alt="Couverture" />
              <button type="button" className="btn btn-sm btn-danger mt-3" onClick={() => setForm(f => ({ ...f, cover_image: '' }))}>
                Supprimer
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
          <button type="button" className="btn btn-outline" onClick={() => navigate('/admin')}>
            Annuler
          </button>
        </div>
      </form>
    </section>
  );
}
