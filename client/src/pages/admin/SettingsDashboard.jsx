import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../App';

const SETTINGS_META = {
  ga_measurement_id: {
    label: 'Google Analytics ID',
    placeholder: 'G-XXXXXXXXXX',
    help: 'Identifiant Google Analytics 4. Laissez vide pour désactiver.'
  },
  site_name: {
    label: 'Nom du site',
    placeholder: 'Athermelec',
    help: 'Nom affiché dans les titres et métas.'
  },
  contact_phone: {
    label: 'Téléphone affiché',
    placeholder: '04 74 94 19 89',
    help: 'Numéro de téléphone principal affiché sur le site.'
  },
  contact_email_display: {
    label: 'Email de contact affiché',
    placeholder: 'contact@atherm-elec.com',
    help: 'Email affiché publiquement sur le site.'
  }
};

export default function SettingsDashboard() {
  const [settings, setSettings] = useState({});
  const [saved, setSaved] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const { authFetch } = useAuth();

  useEffect(() => {
    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadSettings() {
    try {
      const res = await authFetch('/api/admin/settings');
      const data = await res.json();
      setSettings(data);
      setSaved(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  async function handleSave(key) {
    try {
      const res = await authFetch(`/api/admin/settings/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: settings[key] || '' })
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');
      setSaved(s => ({ ...s, [key]: settings[key] }));
      setStatus({ type: 'success', message: `Paramètre "${key}" sauvegardé.` });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  }

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <section className="section">
      <div className="admin-header">
        <h1>Paramètres du site</h1>
        <Link to="/admin" className="btn btn-outline btn-sm">← Dashboard</Link>
      </div>

      {status && (
        <div className={`alert alert-${status.type}`}>{status.message}</div>
      )}

      <div className="settings-grid">
        {Object.entries(SETTINGS_META).map(([key, meta]) => (
          <div key={key} className="setting-item">
            <div className="setting-key">{meta.label}</div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', marginBottom: '0.75rem' }}>
              {meta.help}
            </p>
            <div className="form-group" style={{ marginBottom: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder={meta.placeholder}
                value={settings[key] || ''}
                onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
              />
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleSave(key)}
              disabled={settings[key] === saved[key]}
            >
              Sauvegarder
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
