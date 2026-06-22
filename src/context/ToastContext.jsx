// Global toast feedback. Any screen can call useToast().show({ tone, title,
// message, icon }) without prop-drilling. Toasts auto-dismiss after a few
// seconds; the provider renders them in a fixed stack.

import React from 'react';
import { Toast, Icon } from '../ds';

const ToastContext = React.createContext(null);

let seq = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const timers = React.useRef({});

  const dismiss = React.useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const show = React.useCallback(
    (toast) => {
      const id = ++seq;
      setToasts((list) => [...list, { id, ...toast }]);
      timers.current[id] = setTimeout(() => dismiss(id), toast.duration || 4200);
      return id;
    },
    [dismiss],
  );

  // Convenience helpers for the two common cases.
  const success = React.useCallback(
    (title, message, icon = 'Check') => show({ tone: 'success', title, message, icon }),
    [show],
  );
  const error = React.useCallback(
    (title, message, icon = 'AlertTriangle') => show({ tone: 'danger', title, message, icon }),
    [show],
  );

  React.useEffect(() => () => Object.values(timers.current).forEach(clearTimeout), []);

  const value = React.useMemo(() => ({ show, success, error, dismiss }), [show, success, error, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div style={{ position: 'fixed', top: 78, right: 20, zIndex: 300, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            tone={t.tone}
            title={t.title}
            message={t.message}
            icon={t.icon && Icon[t.icon] ? React.createElement(Icon[t.icon], { size: 16 }) : null}
            onClose={() => dismiss(t.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (ctx === null) {
    throw new Error('useToast debe usarse dentro de <ToastProvider>');
  }
  return ctx;
}
