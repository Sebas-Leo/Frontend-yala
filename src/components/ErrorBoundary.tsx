// Catches render-time errors in the routed screens so one broken view doesn't
// blank the whole app. Shows a friendly fallback with a retry that remounts the
// subtree. `resetKey` (e.g. the current pathname) auto-clears the error on nav.

import React from 'react';
import { Button } from '../ds';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  resetKey?: any;
}
interface ErrorBoundaryState {
  error: any;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { error };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      // Route changed after an error -> clear it so the new screen renders.
      this.setState({ error: null });
    }
  }

  componentDidCatch(error: any, info: any) {
    // Surface the stack in dev; in prod this is where a logger would hook in.
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '72px 24px', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
          <h2 style={{ color: 'var(--text-strong)', marginBottom: 8 }}>Algo salió mal</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
            Ocurrió un error inesperado al mostrar esta sección. Puedes reintentar o volver al inicio.
          </p>
          <Button onClick={() => this.setState({ error: null })}>Reintentar</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
