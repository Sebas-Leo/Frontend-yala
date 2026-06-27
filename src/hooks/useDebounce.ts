// Returns a debounced copy of a value that only updates after `delay` ms of
// quiet — used for search inputs so we don't hit the API on every keystroke.

import React from 'react';

export function useDebounce<T = any>(value: T, delay = 350): T {
  const [debounced, setDebounced] = React.useState<T>(value);

  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
