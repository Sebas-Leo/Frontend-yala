// Returns a debounced copy of a value that only updates after `delay` ms of
// quiet — used for search inputs so we don't hit the API on every keystroke.

import React from 'react';

export function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
