import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories } from '../services/mockData';
import { motion } from 'framer-motion';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc',label: 'Price: High → Low' },
  { value: 'rating',    label: 'Highest Rated' },
  { value: 'name',      label: 'Name A–Z' },
];

export default function FilterSidebar({ onFilter }) {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState(params.get('category') || 'All');
  const [search,   setSearch]   = useState(params.get('search')   || '');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy,   setSortBy]   = useState('default');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Fire filter whenever any dep changes
  useEffect(() => {
    onFilter({ category, search, minPrice, maxPrice, sortBy });
  }, [category, search, minPrice, maxPrice, sortBy]);

  // Sync from URL search param on mount
  useEffect(() => {
    const s = params.get('search');
    const c = params.get('category');
    if (s) setSearch(s);
    if (c) setCategory(c);
  }, []);

  const reset = () => {
    setCategory('All');
    setSearch('');
    setMinPrice(0);
    setMaxPrice(2000);
    setSortBy('default');
  };

  const SidebarContent = (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            className="input pl-9"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="input cursor-pointer"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Category
        </label>
        <div className="flex flex-col gap-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                category === cat
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Price Range
        </label>
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-200">
            <span>${minPrice}</span>
            <span>${maxPrice === 2000 ? '2000+' : maxPrice}</span>
          </div>
          <div className="flex flex-col gap-2">
            <input type="range" min={0} max={2000} step={10} value={minPrice}
              onChange={e => setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))}
              className="accent-primary-600"
            />
            <input type="range" min={0} max={2000} step={10} value={maxPrice}
              onChange={e => setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))}
              className="accent-primary-600"
            />
          </div>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={reset}
        className="btn-secondary text-sm justify-center"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="card p-5 sticky top-24">
          {SidebarContent}
        </div>
      </aside>

      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="btn-secondary w-full justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters & Sort
        </button>

        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="card p-5 mt-3 overflow-hidden"
          >
            {SidebarContent}
          </motion.div>
        )}
      </div>
    </>
  );
}
