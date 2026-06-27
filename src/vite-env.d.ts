/// <reference types="vite/client" />

// The design-system bundle is imported as a raw string (?raw) and executed with
// React injected (see src/ds/load.ts).
declare module '*?raw' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_DEV_API_TARGET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Runtime globals registered by the design system (ds/load.ts, ds/icons.tsx,
// ds/data.ts). Typed loosely because they come from a pre-transpiled bundle.
interface Window {
  YalaDesignSystem_e5dc9e?: Record<string, any>;
  Icon?: Record<string, any>;
  YData?: Record<string, any>;
}
