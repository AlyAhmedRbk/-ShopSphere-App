import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

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
    <div className="overflow-hidden">
      {/* ── 2025 Hero Section ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-brand-500/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-neon-purple/15 rounded-full blur-[140px] animate-float" />
          <div className="absolute top-[40%] right-[30%] w-[100px] h-[100px] bg-neon-cyan/20 rounded-full blur-[60px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-600/10 border border-brand-600/20 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-ping" />
              <span className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em]">New drops Every Week</span>
            </div>
            
            <h1 className="text-6xl sm:text-8xl font-black text-gray-900 dark:text-white leading-[0.9] tracking-tighter mb-8">
              STYLE FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-neon-purple to-neon-pink">THE DIGITAL</span> <br />
              NOMAD.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium max-w-lg mb-10 leading-relaxed">
              Curating the world's most innovative tech, apparel, and lifestyle essentials for those who live life on the edge.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="relative group flex items-center justify-center">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-neon-purple rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative px-8 py-4 bg-brand-600 text-white font-black rounded-2xl flex items-center gap-3 transition-transform active:scale-95 group-hover:-translate-y-1">
                  Start Exploring
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </Link>
              
              <Link to="/shop?category=Electronics" className="px-8 py-4 bg-white dark:bg-dark-700 border-2 border-gray-100 dark:border-dark-border text-gray-900 dark:text-white font-black rounded-2xl flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-dark-600 transition-all active:scale-95 hover:-translate-y-1">
                Tech Gear
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-8 border-t border-gray-100 dark:border-dark-border pt-10">
              {[
                { label: 'Products', value: '30+' },
                { label: 'Customers', value: '12K' },
                { label: 'Retention', value: '98%' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "backOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 w-[500px] h-[600px] rounded-[60px] overflow-hidden border-[12px] border-white dark:border-dark-800 shadow-2xl skew-x-3 -rotate-3 hover:rotate-0 hover:skew-x-0 transition-all duration-700">
              <img 
                src="/hero-render.png" 
                alt="Product Showcase" 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Featured Item</p>
                <h3 className="text-3xl font-black">Sony WH-1000XM5</h3>
                <p className="text-brand-400 font-bold">$348.00</p>
              </div>
            </div>
            
            {/* Overlay Cards */}
            <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-dark-border z-20 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 rounded-2xl flex items-center justify-center text-emerald-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">In Stock</p>
                <p className="text-base font-black text-gray-900 dark:text-white">Ready to Ship</p>
              </div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, 20, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
               className="absolute -bottom-10 -left-10 bg-brand-600 p-6 rounded-3xl shadow-glow-md z-20 text-white"
            >
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Weekly Special</p>
              <p className="text-2xl font-black italic">-20% OFF</p>
              <p className="text-xs font-bold opacity-80">Electronics collection</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Category Ticker ── */}
      <section className="bg-gray-900 py-10 overflow-hidden">
        <div className="flex animate-[shimmer_20s_linear_infinite] whitespace-nowrap gap-20 items-center opacity-40 grayscale group-hover:grayscale-0 transition-all">
          {Array.from({ length: 15 }).map((_, i) => (
             <span key={i} className="text-4xl font-black text-white italic tracking-tighter uppercase">
               ShopSphere Excellence ✦ Curated Marketplace ✦ Future Living
             </span>
          ))}
        </div>
      </section>

      {/* ── Trending Now ── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div className="max-w-xl">
             <div className="inline-block px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-600 font-black text-[10px] uppercase tracking-widest mb-4">
                The Highlight
             </div>
             <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-6">
                TRENDING SELECTION.
             </h2>
             <p className="text-gray-500 dark:text-gray-400 font-medium">
                The most popular products this week, handpicked based on style, innovation, and durability.
             </p>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-3 text-sm font-black text-brand-600 group">
             VIEW FULL CATALOG
             <div className="w-10 h-10 rounded-full border-2 border-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {loading ? (
             <ProductSkeleton count={4} />
          ) : (
            featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
          )}
        </div>
      </section>

      {/* ── Experience Banner ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto relative group">
           <div className="absolute inset-0 bg-brand-600 rounded-[4rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
           <div className="relative bg-gray-900 rounded-[4rem] p-12 md:p-20 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group-hover:-translate-y-2 transition-transform duration-700">
              <div className="max-w-lg text-center md:text-left">
                 <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-8">
                    FREE SHIPPING<br/>
                    <span className="text-brand-500">ON ORDERS $100+</span>
                 </h2>
                 <p className="text-gray-400 font-medium text-lg mb-10">
                    Premium delivery experience. Track your order in real-time with our sleek dashboard.
                 </p>
                 <Link to="/shop" className="inline-flex items-center justify-center px-10 py-5 bg-white text-gray-900 font-black rounded-2xl hover:bg-brand-500 hover:text-white transition-all shadow-glow-md">
                    SHOP THE SALE
                 </Link>
              </div>
              <div className="relative h-80 w-full md:w-80 flex-shrink-0 animate-float">
                 <div className="absolute inset-x-0 bottom-0 h-40 bg-brand-600/20 blur-[60px] rounded-full" />
                 <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop" 
                    alt="Floating Shoe" 
                    className="relative z-10 w-full h-full object-contain -rotate-12 group-hover:rotate-0 transition-transform duration-700"
                 />
              </div>
           </div>
        </div>
      </section>

      {/* ── Footer Stats ── */}
      <section className="py-24 border-t border-gray-100 dark:border-dark-border">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: '🚚', title: 'Global Express', desc: 'Secure shipping to 48 countries' },
              { icon: '💳', title: 'Fast Checkout', desc: 'Apple Pay & Crypto supported' },
              { icon: '🤝', title: 'Best Support', desc: 'Lifetime warranty on tech' },
              { icon: '🔄', title: 'Easy Returns', desc: '30-day no-hassle returns' },
            ].map(item => (
              <div key={item.title} className="text-center group">
                 <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">{item.icon}</div>
                 <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{item.title}</h3>
                 <p className="text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
