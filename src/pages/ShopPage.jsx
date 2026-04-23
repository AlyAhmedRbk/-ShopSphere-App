import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import FilterSidebar from '../components/FilterSidebar';
import { motion, AnimatePresence } from 'framer-motion';

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
    productService.getAll(filter)
      .then(data => { if (!cancelled) { setProducts(data); setLoading(false); } })
      .catch(err  => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [filter]);

  const handleFilter = useCallback((f) => setFilter(f), []);

  return (
    <div className="bg-white dark:bg-dark-900 min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
           <div className="max-w-2xl">
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="inline-block px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-600 font-black text-[10px] uppercase tracking-widest mb-4">
                 Full Collection
              </motion.div>
              <h1 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-6 italic">
                 THE MARKETPLACE.
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                 Explore our complete catalog of {products.length} premium essentials, sorted by innovation and quality.
              </p>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inventory Status</p>
                 <p className="text-sm font-black text-gray-900 dark:text-white uppercase italic">All Tracks Live</p>
              </div>
              <div className="w-12 h-12 bg-white dark:bg-dark-800 border-2 border-gray-100 dark:border-dark-border rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
           </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-12 items-start">
          <FilterSidebar onFilter={handleFilter} />

          <div className="flex-1 min-w-0">
            {error && (
              <div className="p-20 text-center bg-red-50 dark:bg-red-900/10 rounded-[3rem] border border-red-100 dark:border-red-900/20">
                <span className="text-4xl mb-4 block">🚨</span>
                <p className="text-red-600 dark:text-red-400 font-black text-xl italic uppercase">Connection Lost</p>
                <p className="text-red-500/60 font-bold mt-2">Internal relay error. Please recalibrate your connection.</p>
                <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 bg-red-500 text-white font-black rounded-2xl shadow-glow-sm">RETRY SYNC</button>
              </div>
            )}

            {!error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-x-10 gap-y-16">
                {loading ? (
                  <ProductSkeleton count={9} />
                ) : products.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center py-40 bg-gray-50 dark:bg-dark-800/30 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-dark-border">
                    <span className="text-6xl mb-6">🔭</span>
                    <p className="text-2xl font-black text-gray-900 dark:text-white tracking-widest italic uppercase">NO MATCH FOUND</p>
                    <p className="text-gray-400 font-bold mt-2">Adjust your parameters to reveal hidden inventory.</p>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {products.map((p, i) => (
                      <motion.div 
                        layout
                        key={p.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: i * 0.03 }}
                      >
                        <ProductCard product={p} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
