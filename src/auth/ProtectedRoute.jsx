import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

// Gate for routes that require an authenticated session. While the session is
// still hydrating from the stored token we render nothing (avoids a flash of
// the login screen). Unauthenticated users are sent to /login, remembering
// where they were headed so we can bounce them back after sign-in.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
