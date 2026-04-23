import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { formatPrice, calcDiscount } from '../utils/helpers';
import StarRating from './StarRating';
import toast from 'react-hot-toast';

export default function ProductCard({ product, index = 0 }) {
  const addItem = useCartStore(s => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const wished = isWishlisted(product.id);
  const discount = calcDiscount(product.originalPrice, product.price);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success(`"${product.title}" added!`, {
      icon: '🛍️',
      style: { 
        borderRadius: '20px', 
        fontSize: '14px', 
        fontWeight: '900',
        background: '#111118',
        color: '#fff',
        border: '1px solid #2d2d4e'
      },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggle(product);
    toast(wished ? 'Removed' : 'Saved to Wishlist ❤️', {
      style: { borderRadius: '20px', fontWeight: '900' },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[10/12] rounded-[2.5rem] overflow-hidden bg-gray-100 dark:bg-dark-800 border-4 border-white dark:border-dark-700 shadow-xl group-hover:shadow-card-hover transition-all duration-500">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            {product.badge && (
              <span className="px-3 py-1 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white shadow-sm border border-gray-200/50 dark:border-dark-border/50">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-glow-sm">
                −{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-4 right-4 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 z-20 shadow-md backdrop-blur-md border border-white/20
              ${wished 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/70 dark:bg-dark-900/70 text-gray-900 dark:text-white hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-500'
              }`}
          >
            <svg className="w-5 h-5" fill={wished ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Interaction Overlay */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
             <button 
                onClick={handleAddToCart}
                className="w-full py-3 bg-brand-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-glow-md flex items-center justify-center gap-2 hover:bg-brand-500 active:scale-95 transition-all"
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                QUICK ADD
             </button>
          </div>
        </div>

        {/* Info Area */}
        <div className="mt-6 px-2 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-600 dark:text-brand-400 opacity-80">{product.category}</p>
          <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight group-hover:text-brand-600 transition-colors line-clamp-1">{product.title}</h3>
          
          <div className="flex items-center justify-between pt-1">
             <div className="flex flex-col">
                <p className="text-xl font-black text-gray-900 dark:text-white leading-none">{formatPrice(product.price)}</p>
                {product.originalPrice && (
                  <p className="text-xs text-gray-400 line-through font-bold mt-1">{formatPrice(product.originalPrice)}</p>
                )}
             </div>
             <div className="flex flex-col items-end">
                <StarRating rating={product.rating} size="sm" />
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-tighter">{product.reviewCount} REVIEWS</p>
             </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
