import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import FilterSidebar from '../components/FilterSidebar';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    category: 'All', search: '', minPrice: 0, maxPrice: 2000, sortBy: 'default',
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    productService.getAll(filter)
      .then(data => { if (!cancelled) { setProducts(data); setLoading(false); } })
      .catch(err  => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [filter]);

  const handleFilter = useCallback((f) => setFilter(f), []);

  return (
    <div className="page-container py-10 animate-fade-in">
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-1">Our Collection</p>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Shop All Products</h1>
      </div>

      <div className="flex gap-8 items-start">
        <FilterSidebar onFilter={handleFilter} />

        <div className="flex-1 min-w-0">
          {!loading && !error && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{products.length}</span> products
            </p>
          )}

          {error && (
            <div className="card p-8 text-center">
              <p className="text-red-500 font-medium">Failed to load products. Please try again.</p>
            </div>
          )}

          {!error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <ProductSkeleton count={9} />
              ) : products.length === 0 ? (
                <div className="col-span-full flex flex-col items-center py-24">
                  <span className="text-5xl mb-4">😕</span>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">No products found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
