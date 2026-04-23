import { useState, useEffect } from 'react';
import { categories } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilterSidebar({ onFilter }) {
  const [filterState, setFilterState] = useState({
    category: 'All',
    search: '',
    minPrice: 0,
    maxPrice: 2000,
    sortBy: 'default'
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onFilter(filterState);
  }, [filterState]);

  const update = (key, val) => setFilterState(prev => ({ ...prev, [key]: val }));

  const SidebarContent = (
    <div className="flex flex-col gap-10">
      {/* Search */}
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Search Catalog</p>
        <div className="relative group">
          <input
            type="text"
            placeholder="Key, Brand, Feature..."
            className="w-full pl-11 pr-5 py-3.5 bg-gray-50 dark:bg-dark-800 border-2 border-transparent focus:border-brand-600/30 rounded-2xl outline-none transition-all font-bold text-sm"
            value={filterState.search}
            onChange={e => update('search', e.target.value)}
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Chronology & Value</p>
        <select
          className="w-full px-5 py-3.5 bg-gray-50 dark:bg-dark-800 border-2 border-transparent focus:border-brand-600/30 rounded-2xl outline-none transition-all font-bold text-sm cursor-pointer"
          value={filterState.sortBy}
          onChange={e => update('sortBy', e.target.value)}
        >
          <option value="default">Featured Selection</option>
          <option value="price-asc">Value: Low to High</option>
          <option value="price-desc">Premium: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Alphabetical (A-Z)</option>
        </select>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Curation Tracks</p>
        <div className="flex flex-col gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => update('category', cat)}
              className={`text-left px-5 py-3 rounded-xl text-sm font-black transition-all duration-300 flex items-center justify-between group
                ${filterState.category === cat 
                  ? 'bg-brand-600 text-white shadow-glow-sm scale-[1.02]' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              {cat.toUpperCase()}
              {filterState.category === cat && (
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Grid */}
      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Value Horizon</p>
        <div className="px-2">
           <div className="flex justify-between text-xs font-black text-gray-900 dark:text-white mb-4 italic">
              <span>$0</span>
              <span>${filterState.maxPrice === 2000 ? '2000+' : filterState.maxPrice}</span>
           </div>
           <div className="relative h-2 bg-gray-100 dark:bg-dark-800 rounded-full group">
              <input 
                type="range" 
                min="0" 
                max="2000" 
                step="50"
                value={filterState.maxPrice}
                onChange={e => update('maxPrice', Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
              />
              <div 
                className="absolute h-full bg-brand-600 rounded-full transition-all duration-300 shadow-glow-sm" 
                style={{ width: `${(filterState.maxPrice / 2000) * 100}%` }} 
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-brand-600 rounded-full shadow-lg z-10" 
                style={{ left: `calc(${(filterState.maxPrice / 2000) * 100}% - 10px)` }}
              />
           </div>
        </div>
      </div>

      {/* Reset */}
      <button 
        onClick={() => setFilterState({ category: 'All', search: '', minPrice: 0, maxPrice: 2000, sortBy: 'default' })}
        className="w-full py-4 text-xs font-black text-gray-400 uppercase tracking-[0.2em] hover:text-brand-600 transition-colors border-2 border-dashed border-gray-100 dark:border-dark-border rounded-2xl"
      >
        Reset Filters ↺
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden xl:block w-[300px] flex-shrink-0">
        <div className="sticky top-32 p-8 bg-white dark:bg-dark-900 border-2 border-gray-100 dark:border-dark-border rounded-[2.5rem] shadow-sm">
           {SidebarContent}
        </div>
      </aside>

      {/* Mobile Trigger */}
      <div className="xl:hidden mb-8">
         <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-5 bg-white dark:bg-dark-800 border-2 border-gray-100 dark:border-dark-border rounded-2xl font-black text-sm uppercase tracking-widest text-gray-900 dark:text-white shadow-sm active:scale-95 transition-all"
         >
            Catalog Controls
            <svg className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
         </button>
         
         <AnimatePresence>
           {isOpen && (
             <motion.div
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               className="overflow-hidden mt-4 bg-white dark:bg-dark-900 border-2 border-gray-100 dark:border-dark-border rounded-[2.5rem] p-8"
             >
                {SidebarContent}
             </motion.div>
           )}
         </AnimatePresence>
      </div>
    </>
  );
}
