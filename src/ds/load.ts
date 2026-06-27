import React from 'react';
import bundleSrc from './_ds_bundle.js?raw';

// The Yala design-system bundle is pre-transpiled to classic React.createElement
// and references `React` as a free global. Importing it as an ES module would
// fail under strict mode, so we execute it with `React` injected via closure:
// every component it defines captures the SAME React instance the app uses,
// which keeps hooks and context working. It assigns to window.YalaDesignSystem_e5dc9e.
new Function('React', bundleSrc)(React);
