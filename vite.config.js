import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Yala frontend — Vite + React. The design-system bundle is loaded at runtime
// from src/ds (see src/ds/load.js), tokens via src/ds/styles.css.
export default defineConfig(({ mode }) => {
  // Load ALL env vars (third arg '' = no prefix filter) so DIDIT_API_KEY is
  // readable HERE in the Node config without ever reaching the browser bundle
  // (only VITE_-prefixed vars are exposed to import.meta.env on the client).
  const env = loadEnv(mode, process.cwd(), '');
  const diditKey = env.DIDIT_API_KEY;

  return {
    plugins: [react()],
    server: {
      port: 5173,
      open: false,
      proxy: {
        // Dev proxy: the browser calls same-origin /api, Vite forwards it to the
        // Spring Boot backend on :8081 (openapi profile). Avoids CORS in dev.
        '/api': 'http://localhost:8081',

        // Didit identity API as a thin BFF. Didit is server-to-server: it needs
        // a secret `x-api-key` and does not allow browser CORS. We inject the key
        // here (Node side) and forward; the app only ever calls same-origin
        // /didit/*, so the secret never reaches the client and CORS is a non-issue.
        // Configure the key in a .env file at the frontend root: DIDIT_API_KEY=...
        // (no VITE_ prefix on purpose). Without it, dni.js falls back to demo mode.
        '/didit': {
          target: 'https://verification.didit.me',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/didit/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (diditKey) proxyReq.setHeader('x-api-key', diditKey);
            });
          },
        },
      },
    },
  };
});
