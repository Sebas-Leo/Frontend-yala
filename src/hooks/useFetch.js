// Data-fetching hook with built-in cancellation (AbortController) to avoid
// memory leaks / state updates after unmount. Pass a fetcher that receives an
// AbortSignal and returns a promise; re-runs when `deps` change.
//
//   const { data, loading, error, refetch } = useFetch(
//     (signal) => listListings({ page, signal }), [page]);

import React from 'react';

export function useFetch(fetcher, deps = [], { enabled = true } = {}) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(!!enabled);
  const [error, setError] = React.useState(null);
  const [nonce, setNonce] = React.useState(0);

  const fetcherRef = React.useRef(fetcher);
  fetcherRef.current = fetcher;

  const refetch = React.useCallback(() => setNonce((n) => n + 1), []);

  React.useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return undefined;
    }
    const ctrl = new AbortController();
    let alive = true;
    setLoading(true);
    setError(null);

    Promise.resolve(fetcherRef.current(ctrl.signal))
      .then((result) => {
        if (alive) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!alive) return;
        // Ignore cancellations triggered by unmount / dep changes.
        if (err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError' || err?.name === 'AbortError') {
          return;
        }
        setError(err);
        setLoading(false);
      });

    return () => {
      alive = false;
      ctrl.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce, enabled]);

  return { data, loading, error, refetch };
}
