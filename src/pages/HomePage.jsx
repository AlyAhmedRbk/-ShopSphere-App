import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../services/productService';
import { categories } from '../services/mockData';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

const HERO_STATS = [
  { label: 'Products', value: '10K+' },
  { label: 'Happy Customers', value: '50K+' },
  { label: 'Brands', value: '200+' },
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getFeatured().then(data => {
      setFeatured(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="animate-fade-in">
      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-gray-900">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-accent-500/15 blur-3xl" />
        </div>

        <div className="page-container relative z-10 py-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge bg-primary-500/20 text-primary-300 border border-primary-500/30 mb-6 inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                ✦ New Season Arrivals
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                Discover
                <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  Premium Picks
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
                Curated products from the world's best brands. Free shipping on orders over $100. 30-day returns guaranteed.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/shop" className="btn-primary text-base px-7 py-3 shadow-glow">
                  Shop Now
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link to="/shop?category=Electronics" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 text-base px-7 py-3">
                  Explore Electronics
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-8 mt-14 pt-10 border-t border-white/10"
            >
              {HERO_STATS.map(stat => (
                <div key={stat.label}>
                  <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Category pills ── */}
      <section className="py-12 bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-surface-dark-border">
        <div className="page-container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.filter(c => c !== 'All').map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={`/shop?category=${encodeURIComponent(cat)}`}
                  className="px-5 py-2.5 rounded-full border border-gray-200 dark:border-surface-dark-border text-sm font-semibold text-gray-700 dark:text-gray-200
                    hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-200 shadow-sm"
                >
                  {cat}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-16">
        <div className="page-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-1">Handpicked</p>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/shop" className="btn-ghost text-sm hidden sm:flex">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? <ProductSkeleton count={4} />
              : featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
            }
          </div>
        </div>
      </section>

      {/* ── Banner ── */}
      <section className="py-12">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-accent-500 p-10 md:p-16">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-black/10 translate-y-1/3 -translate-x-1/4" />
            </div>
            <div className="relative z-10 max-w-lg">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Free Shipping on Orders $100+
              </h2>
              <p className="text-primary-100 mb-6 text-lg">
                Shop your favourite brands and get them delivered right to your door, on us.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                Start Shopping
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust badges ── */}
      <section className="py-12 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-surface-dark-border">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: '🔄', title: 'Easy Returns', desc: '30-day return policy' },
              { icon: '🔒', title: 'Secure Payment', desc: 'SSL encrypted checkout' },
              { icon: '⭐', title: 'Top Rated', desc: '4.9/5 customer rating' },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center gap-2 p-4">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
