// Keeps pagination + filter state in the URL query string, so lists are
// shareable/bookmarkable and the browser back button works. Backed by
// react-router's useSearchParams.
//
//   const { page, size, sort, get, setParams, setPage } = usePaginatedQuery({ defaultSize: 12 });
//   ... listListings({ page, size, sort, category: get('category') })

import React from 'react';
import { useSearchParams } from 'react-router-dom';

export function usePaginatedQuery({ defaultSize = 12, defaultSort } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(0, parseInt(searchParams.get('page') ?? '0', 10) || 0);
  const size = parseInt(searchParams.get('size') ?? String(defaultSize), 10) || defaultSize;
  const sort = searchParams.get('sort') || defaultSort;

  const get = React.useCallback((key) => searchParams.get(key) || '', [searchParams]);

  // Merge a patch of params. Setting a value to '' / null removes the key.
  // Changing anything other than `page` resets to page 0.
  const setParams = React.useCallback(
    (patch, { replace = false } = {}) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          const touchesOnlyPage = Object.keys(patch).every((k) => k === 'page');
          Object.entries(patch).forEach(([key, value]) => {
            if (value === '' || value == null) next.delete(key);
            else next.set(key, String(value));
          });
          if (!touchesOnlyPage) next.set('page', '0');
          return next;
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  const setPage = React.useCallback((p) => setParams({ page: p }), [setParams]);

  return { page, size, sort, get, setParams, setPage, searchParams };
}
