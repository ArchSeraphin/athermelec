import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';

// Pages publiques
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Realisations from './pages/Realisations';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import RealisationDetail from './pages/RealisationDetail';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import Legal from './pages/Legal';
import CGV from './pages/CGV';
import NotFound from './pages/NotFound';

// Pages admin
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ArticleEditor from './pages/admin/ArticleEditor';
import PartnersDashboard from './pages/admin/PartnersDashboard';
import PartnerEditor from './pages/admin/PartnerEditor';
import RealisationsDashboard from './pages/admin/RealisationsDashboard';
import RealisationEditor from './pages/admin/RealisationEditor';
import SettingsDashboard from './pages/admin/SettingsDashboard';

// ─── Auth Context ───

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tenter le refresh uniquement sur les pages admin pour éviter le 401 en console sur les pages publiques
    if (window.location.pathname.startsWith('/admin')) {
      refreshToken().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    setAccessToken(data.accessToken);
    setAdmin(data.admin);
    return data;
  }

  async function refreshToken() {
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAccessToken(data.accessToken);
    } catch {
      setAccessToken(null);
      setAdmin(null);
    }
  }

  async function logout() {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setAccessToken(null);
    setAdmin(null);
  }

  async function authFetch(url, options = {}) {
    let token = accessToken;
    let res = await fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` }
    });

    if (res.status === 401) {
      await refreshToken();
      token = accessToken;
      res = await fetch(url, {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${token}` }
      });
    }

    return res;
  }

  return (
    <AuthContext.Provider value={{ accessToken, admin, loading, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Route protégée ───

function ProtectedRoute({ children }) {
  const { accessToken, loading } = useAuth();
  if (loading) return <div className="loading">Chargement...</div>;
  if (!accessToken) return <Navigate to="/admin/login" replace />;
  return children;
}

// ─── GA ID loader ───

function useGaId() {
  const [gaId, setGaId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/settings/ga_measurement_id', { signal: controller.signal })
      .then(res => res.json())
      .then(data => { if (data.value) setGaId(data.value); })
      .catch(err => { if (err.name !== 'AbortError') {} });
    return () => controller.abort();
  }, []);

  return gaId;
}

// ─── Schema.org LocalBusiness ───

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.atherm-elec.com/#organization',
  name: 'Athermelec',
  legalName: 'ATHERMELEC SAS',
  description: 'Expert en électricité industrielle haute et basse tension, automatisme et réseaux VDI. Certifié MASE depuis 2008.',
  url: 'https://www.atherm-elec.com',
  logo: 'https://www.atherm-elec.com/assets/img/logo-athermelec.webp',
  image: 'https://www.atherm-elec.com/img/og-default.jpg',
  telephone: '+33474941989',
  email: 'contact@atherm-elec.com',
  foundingDate: '1983',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '328 route de la Verpillière',
    addressLocality: 'Frontonas',
    postalCode: '38290',
    addressCountry: 'FR'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.6272,
    longitude: 5.1447
  },
  areaServed: ['Isère', 'Haute-Garonne', 'France'],
  sameAs: []
};

// ─── App ───

export default function App() {
  const gaId = useGaId();

  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <script type="application/ld+json">
            {JSON.stringify(localBusinessSchema)}
          </script>

          <ScrollToTop />
          <Navbar />
          <main>
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/realisations" element={<Realisations />} />
              <Route path="/realisations/:slug" element={<RealisationDetail />} />
              <Route path="/actualites" element={<News />} />
              <Route path="/actualites/:slug" element={<NewsDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/partenaires" element={<Partners />} />
              <Route path="/mentions-legales" element={<Legal />} />
              <Route path="/cgv" element={<CGV />} />

              {/* Routes admin */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/articles/new" element={<ProtectedRoute><ArticleEditor /></ProtectedRoute>} />
              <Route path="/admin/articles/:id" element={<ProtectedRoute><ArticleEditor /></ProtectedRoute>} />
              <Route path="/admin/partenaires" element={<ProtectedRoute><PartnersDashboard /></ProtectedRoute>} />
              <Route path="/admin/partenaires/new" element={<ProtectedRoute><PartnerEditor /></ProtectedRoute>} />
              <Route path="/admin/partenaires/:id" element={<ProtectedRoute><PartnerEditor /></ProtectedRoute>} />
              <Route path="/admin/realisations" element={<ProtectedRoute><RealisationsDashboard /></ProtectedRoute>} />
              <Route path="/admin/realisations/new" element={<ProtectedRoute><RealisationEditor /></ProtectedRoute>} />
              <Route path="/admin/realisations/:id" element={<ProtectedRoute><RealisationEditor /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><SettingsDashboard /></ProtectedRoute>} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner gaId={gaId} />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
