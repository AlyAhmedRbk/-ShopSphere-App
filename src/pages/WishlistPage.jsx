import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/helpers';
import StarRating from '../components/StarRating';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { items, toggle } = useWishlistStore();
  const addItem = useCartStore(s => s.addItem);

  const moveToCart = (product) => {
    addItem(product);
    toggle(product);
    toast.success('Deployed to Cart', { icon: '🛍️', style: { borderRadius: '20px', fontWeight: '900' } });
  };

  if (items.length === 0) return (
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-dark-900 flex items-center justify-center">
       <div className="text-center max-w-sm px-6">
          <p className="text-8xl mb-8 grayscale opacity-20">🖤</p>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">Collection Null</h2>
          <p className="text-gray-400 font-bold mt-4 leading-relaxed italic">You haven't flagged any items for your private collection. Browse the marketplace and tap the heart icon to save gear for the future.</p>
          <Link to="/shop" className="mt-10 inline-flex items-center gap-3 px-10 py-5 bg-brand-600 text-white font-black rounded-2xl shadow-glow-md hover:shadow-glow-lg transition-all active:scale-95">
             LAUNCH MARKETPLACE
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
       </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-dark-900 min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-600 mb-4 opacity-80">Private Curation</p>
              <h1 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none italic uppercase">Your Collection.</h1>
           </div>
           <div className="flex items-center gap-4">
              <div className="text-right">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Collection Volume</p>
                 <p className="text-sm font-black text-gray-900 dark:text-white uppercase italic">{items.length} Tracked Units</p>
              </div>
              <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-glow-pink">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                <div className="relative aspect-[10/12] rounded-[2.5rem] overflow-hidden bg-gray-100 dark:bg-dark-800 border-4 border-white dark:border-dark-700 shadow-xl group-hover:shadow-card-hover transition-all duration-500">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </Link>
                  <button
                    onClick={() => { toggle(product); toast('Removed'); }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-glow-pink active:scale-90 transition-all z-20"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div className="mt-6 px-2 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-600 dark:text-brand-400 opacity-80">{product.category}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight hover:text-brand-600 transition-colors line-clamp-1">{product.title}</h3>
                  </Link>
                  <div className="flex items-center justify-between pt-2">
                     <p className="text-xl font-black text-gray-900 dark:text-white italic tracking-tighter">{formatPrice(product.price)}</p>
                     <button
                       onClick={() => moveToCart(product)}
                       className="px-4 py-2 bg-brand-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-brand-500 shadow-glow-sm transition-all active:scale-95 flex items-center gap-2"
                     >
                       DEPLOY 
                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
