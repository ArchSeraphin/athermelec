import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';

export default function PartnerEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authFetch } = useAuth();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '',
    logo_url: '',
    website_url: '',
    description: '',
    display_order: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetch('/api/partners')
        .then(res => res.json())
        .then(partners => {
          const partner = partners.find(p => p.id === parseInt(id));
          if (partner) setForm(partner);
        })
        .catch(console.error);
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'display_order' ? parseInt(value) || 0 : value });
  };

  async function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await authFetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) setForm({ ...form, logo_url: data.url });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit ? `/api/admin/partners/${id}` : '/api/admin/partners';
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

      navigate('/admin/partenaires');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section admin-editor">
      <h1>{isEdit ? 'Modifier le partenaire' : 'Nouveau partenaire'}</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom *</label>
          <input
            type="text" id="name" name="name"
            className="form-input" required
            value={form.name} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="website_url">Site web</label>
          <input
            type="url" id="website_url" name="website_url"
            className="form-input" placeholder="https://..."
            value={form.website_url} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Logo</label>
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
          {form.logo_url && (
            <div className="image-preview">
              <img src={form.logo_url} alt="Logo" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description" name="description" rows="3"
            className="form-input"
            value={form.description || ''} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="display_order">Ordre d'affichage</label>
          <input
            type="number" id="display_order" name="display_order"
            className="form-input"
            value={form.display_order} onChange={handleChange}
          />
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          <button type="button" className="btn" onClick={() => navigate('/admin/partenaires')}>
            Annuler
          </button>
        </div>
      </form>
    </section>
  );
}
