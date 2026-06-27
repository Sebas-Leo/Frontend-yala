// Centralized route configuration. Screens are code-split with React.lazy so
// each view ships in its own chunk (loaded on demand under <Suspense>). Each
// entry declares whether it needs auth (`protect`) and which roles may enter
// (`roles`). App.jsx maps these into <Route> elements.

import React from 'react';

const Home = React.lazy(() => import('./screens/Home'));
const Landing = React.lazy(() => import('./screens/Landing'));
const AuctionLive = React.lazy(() => import('./screens/AuctionLive'));
const LiveView = React.lazy(() => import('./screens/LiveView'));
const GoLive = React.lazy(() => import('./screens/GoLive'));
const ListingDetail = React.lazy(() => import('./screens/ListingDetail'));
const SellerProfile = React.lazy(() => import('./screens/SellerProfile'));
const Auth = React.lazy(() => import('./screens/Auth'));
const Checkout = React.lazy(() => import('./screens/Checkout'));
const MyOrders = React.lazy(() => import('./screens/MyOrders'));
const Notifications = React.lazy(() => import('./screens/Notifications'));
const SellerDashboard = React.lazy(() => import('./screens/SellerDashboard'));
const CreateListing = React.lazy(() => import('./screens/CreateListing'));
const CreateAuction = React.lazy(() => import('./screens/CreateAuction'));
const Review = React.lazy(() => import('./screens/Review'));
const DniVerify = React.lazy(() => import('./screens/DniVerify'));
const Admin = React.lazy(() => import('./screens/Admin'));

function NotFound() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--text-strong)', fontFamily: 'var(--font-sans)' }}>Página no encontrada</h2>
    </div>
  );
}

const SELLER = ['SELLER', 'ADMIN'];
const ADMIN_ONLY = ['ADMIN'];

// A single route entry consumed by App.tsx.
export interface RouteDef {
  path: string;
  element: React.ReactElement;
  protect?: boolean;
  roles?: string[];
}

// Builds the route list. `ctx` carries the navigation + feedback helpers the
// screens need, so this stays the single source of truth for routing.
export function buildRoutes(ctx: any): RouteDef[] {
  const { navigate, toast, auth } = ctx;

  const handleAuth = (profile: any) => navigate(profile && profile.role === 'SELLER' ? '/seller' : '/');
  const verifyIdentity = () => {
    auth.setIdentityVerified(true);
    toast.success('Identidad verificada', 'Ya puedes pujar y comprar en Yala.', 'Shield');
  };

  return [
    {
      path: '/',
      element: (
        <Home
          onOpenAuction={(id) => navigate('/auction/' + id)}
          onOpenLive={(id) => navigate('/live/' + id)}
        />
      ),
    },
    { path: '/inicio', element: <Landing onOpenAuction={(id) => navigate('/auction/' + id)} /> },
    {
      path: '/live/:id',
      element: (
        <LiveView
          verified={auth.isIdentityVerified}
          onRequireDni={() => navigate('/verify-dni')}
          onBack={() => navigate('/')}
        />
      ),
    },
    {
      path: '/auction/:id',
      element: (
        <AuctionLive
          verified={auth.isIdentityVerified}
          onRequireDni={() => navigate('/verify-dni')}
          onBack={() => navigate('/')}
        />
      ),
    },
    {
      path: '/listing/:id',
      element: (
        <ListingDetail
          verified={auth.isIdentityVerified}
          onRequireDni={() => navigate('/verify-dni')}
          onBack={() => navigate('/')}
        />
      ),
    },
    {
      path: '/seller/:id',
      element: <SellerProfile onBack={() => navigate(-1)} onOpenAuction={(id) => navigate('/auction/' + id)} />,
    },
    { path: '/login', element: <Auth onAuth={handleAuth} /> },

    { path: '/checkout', protect: true, element: <Checkout onBack={() => navigate('/orders')} /> },
    {
      path: '/orders',
      protect: true,
      element: <MyOrders onOpenOrder={(id) => (id === 'home' ? navigate('/') : navigate('/checkout?orderId=' + id))} />,
    },
    { path: '/notifications', protect: true, element: <Notifications /> },
    {
      path: '/seller',
      protect: true,
      roles: SELLER,
      element: (
        <SellerDashboard
          onNew={() => navigate('/seller/new-listing')}
          onGoLive={() => navigate('/seller/go-live')}
          onOpenAuction={(id) => navigate('/auction/' + id)}
          onOpenOrder={(id) => navigate('/checkout?orderId=' + id)}
        />
      ),
    },
    {
      path: '/seller/go-live',
      protect: true,
      roles: SELLER,
      element: <GoLive onBack={() => navigate('/seller')} />,
    },
    {
      path: '/seller/new-listing',
      protect: true,
      roles: SELLER,
      element: (
        <CreateListing
          onBack={() => navigate('/seller')}
          onCreate={() => {
            toast.success('Ítem creado', 'Ahora define el precio inicial y la duración de la subasta.');
            navigate('/seller/new-auction');
          }}
        />
      ),
    },
    {
      path: '/seller/new-auction',
      protect: true,
      roles: SELLER,
      element: (
        <CreateAuction
          onBack={() => navigate('/seller')}
          onCreate={() => {
            toast.success('Subasta creada', 'La subasta arranca según lo que programaste.', 'Gavel');
            navigate('/seller');
          }}
        />
      ),
    },
    {
      path: '/review/:orderId',
      protect: true,
      element: (
        <Review
          onBack={() => navigate('/orders')}
          onSubmit={() => {
            toast.success('Reseña publicada', 'Gracias por calificar tu experiencia.', 'Star');
            navigate('/orders');
          }}
        />
      ),
    },
    {
      path: '/verify-dni',
      protect: true,
      element: (
        <DniVerify
          onVerify={() => {
            verifyIdentity();
            navigate(-1);
          }}
          onBack={() => navigate(-1)}
        />
      ),
    },
    { path: '/admin', protect: true, roles: ADMIN_ONLY, element: <Admin onAction={(m) => toast.success('Listo', m)} /> },

    { path: '*', element: <NotFound /> },
  ];
}
