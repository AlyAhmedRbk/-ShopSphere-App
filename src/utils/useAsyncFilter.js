import { useState, useEffect, useCallback, useRef } from 'react';

// Keeps filter state at module level so FilterSidebar can set it without prop drilling
let _setFilter = () => {};

export function useAsyncFilter(fetchFn) {
  const [filter, setFilter] = useState({ category: 'All', search: '', minPrice: 0, maxPrice: 2000, sortBy: 'default' });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  // Expose setter for FilterSidebar
  _setFilter = setFilter;
  useAsyncFilter.setFilter = setFilter;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchFn(filter)
      .then(data => { if (!cancelled) { setProducts(data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [filter]);

  return { products, loading, error, total: products.length };
}
