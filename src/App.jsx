import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toast, Icon } from './ds';
import { useAuth } from './auth/AuthContext.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import AppShell from './screens/AppShell.jsx';
import Home from './screens/Home.jsx';
import AuctionLive from './screens/AuctionLive.jsx';
import Checkout from './screens/Checkout.jsx';
import SellerDashboard from './screens/SellerDashboard.jsx';
import MyOrders from './screens/MyOrders.jsx';
import Notifications from './screens/Notifications.jsx';
import Auth from './screens/Auth.jsx';
import SellerProfile from './screens/SellerProfile.jsx';
import Review from './screens/Review.jsx';
import CreateListing from './screens/CreateListing.jsx';
import CreateAuction from './screens/CreateAuction.jsx';
import Admin from './screens/Admin.jsx';
import DniVerify from './screens/DniVerify.jsx';

export default function App() {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, isIdentityVerified, setIdentityVerified, logout } = useAuth();
  const [toast, setToast] = React.useState(null);
  const ttRef = React.useRef();

  const showToast = (t) => {
    setToast(t);
    clearTimeout(ttRef.current);
    ttRef.current = setTimeout(() => setToast(null), 4200);
  };

  const verifyIdentity = () => {
    setIdentityVerified(true);
    showToast({ tone: 'success', title: 'Identidad verificada', message: 'Ya podés pujar y comprar en Yala.', icon: 'Shield' });
  };

  const handleLogout = () => {
    logout();
    showToast({ tone: 'success', title: 'Sesión cerrada', message: 'Cerraste sesión en Yala.', icon: 'Check' });
    navigate('/');
  };

  // After auth, sellers land on their dashboard; everyone else on Home.
  const handleAuth = (profile) => navigate(profile && profile.role === 'SELLER' ? '/seller' : '/');

  const navDest = { home: '/', seller: '/seller', notifications: '/notifications', profile: '/seller/marco', login: '/login' };

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

  return (
    <>
      <AppShell
        user={shellUser}
        onNav={(d) => navigate(navDest[d] || '/')}
        onCat={() => navigate('/')}
        onLogout={handleLogout}
        unread={3}
      />
      <div style={{ minHeight: 'calc(100vh - 112px)', paddingBottom: 80 }}>
        <Routes>
          {/* Public — anyone can browse the auctions */}
          <Route path="/" element={<Home onOpenAuction={(id) => navigate('/auction/' + id)} />} />
          <Route path="/auction/:id" element={<AuctionLive verified={isIdentityVerified} onRequireDni={() => navigate('/verify-dni')} onBack={() => navigate('/')} />} />
          <Route path="/seller/:id" element={<SellerProfile onBack={() => navigate(-1)} onOpenAuction={(id) => navigate('/auction/' + id)} />} />
          <Route path="/login" element={<Auth onAuth={handleAuth} />} />

          {/* Private — require an authenticated session */}
          <Route path="/checkout" element={<ProtectedRoute><Checkout role="buyer" onBack={() => navigate('/orders')} /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><MyOrders onOpenOrder={(id) => (id === 'home' ? navigate('/') : navigate('/checkout'))} /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/seller" element={<ProtectedRoute><SellerDashboard onNew={() => navigate('/seller/new-listing')} onOpenAuction={(id) => navigate('/auction/' + id)} onOpenOrder={() => navigate('/checkout')} /></ProtectedRoute>} />
          <Route path="/seller/new-listing" element={<ProtectedRoute><CreateListing onBack={() => navigate('/seller')} onCreate={() => { showToast({ tone: 'success', title: 'Ítem creado', message: 'Ahora definí el precio inicial y la duración de la subasta.', icon: 'Check' }); navigate('/seller/new-auction'); }} /></ProtectedRoute>} />
          <Route path="/seller/new-auction" element={<ProtectedRoute><CreateAuction onBack={() => navigate('/seller')} onCreate={() => { showToast({ tone: 'success', title: 'Subasta creada', message: 'La subasta arranca según lo que programaste.', icon: 'Gavel' }); navigate('/seller'); }} /></ProtectedRoute>} />
          <Route path="/review/:orderId" element={<ProtectedRoute><Review onBack={() => navigate('/orders')} onSubmit={() => { showToast({ tone: 'success', title: 'Reseña publicada', message: 'Gracias por calificar tu experiencia.', icon: 'Star' }); navigate('/orders'); }} /></ProtectedRoute>} />
          <Route path="/verify-dni" element={<ProtectedRoute><DniVerify onVerify={() => { verifyIdentity(); navigate(-1); }} onBack={() => navigate(-1)} /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin onAction={(message) => showToast({ tone: 'success', title: 'Listo', message, icon: 'Check' })} /></ProtectedRoute>} />

          <Route path="*" element={<div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}><h2 style={{ color: 'var(--text-strong)', fontFamily: 'var(--font-sans)' }}>Página no encontrada</h2></div>} />
        </Routes>
      </div>

      {toast && (
        <div style={{ position: 'fixed', top: 78, right: 20, zIndex: 300, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Toast tone={toast.tone} title={toast.title} message={toast.message}
            icon={toast.icon && Icon[toast.icon] ? React.createElement(Icon[toast.icon], { size: 16 }) : null}
            onClose={() => setToast(null)} />
        </div>
      )}
    </>
  );
}
