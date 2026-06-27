import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Gate for routes that require an authenticated session, optionally restricted
// to specific roles. While the session is still hydrating from the stored token
// we render nothing (avoids a flash of the login screen). Unauthenticated users
// are sent to /login, remembering where they were headed so we can bounce them
// back after sign-in. Authenticated users without an allowed role are sent home.
export default function ProtectedRoute({ children, roles }: { children: React.ReactElement; roles?: string[] }) {
  const { isAuthenticated, loading, role } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (roles && roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
