import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { useToast } from './context/ToastContext';
import ProtectedRoute from './auth/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import AppShell from './screens/AppShell';
import Footer from './components/Footer';
import { buildRoutes } from './routes';

function Loading() {
  return (
    <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
      Cargando…
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const toast = useToast();
  const { user, loading, isAuthenticated, logout } = auth;

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada', 'Cerraste sesión en Yala.');
    navigate('/');
  };

  const navDest = { home: '/', seller: '/seller', notifications: '/notifications', profile: '/seller/me', login: '/login' };

  // Wait for the stored session to hydrate before painting the shell, so the
  // navbar shows the real user (or the guest state) instead of flickering.
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
        Cargando…
      </div>
    );
  }

  const shellUser = isAuthenticated ? { name: user.name, verified: !!user.isVerifiedSeller } : null;
  const routes = buildRoutes({ navigate, toast, auth });

  return (
    <>
      <AppShell
        user={shellUser}
        onNav={(d) => navigate(navDest[d] || '/')}
        onCat={() => navigate('/')}
        onLogout={handleLogout}
      />
      <div style={{ minHeight: 'calc(100vh - 112px)', paddingBottom: 80 }}>
        <ErrorBoundary resetKey={location.pathname}>
          <React.Suspense fallback={<Loading />}>
            <Routes>
              {routes.map(({ path, element, protect, roles }) => (
                <Route
                  key={path}
                  path={path}
                  element={protect ? <ProtectedRoute roles={roles}>{element}</ProtectedRoute> : element}
                />
              ))}
            </Routes>
          </React.Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
    </>
  );
}
