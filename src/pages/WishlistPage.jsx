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
    toggle(product); // remove from wishlist
    toast.success('Moved to cart!', { icon: '🛒', style: { borderRadius: '12px' } });
  };

  if (items.length === 0) return (
    <div className="page-container py-24 text-center animate-fade-in">
      <div className="max-w-sm mx-auto">
        <div className="text-8xl mb-6">💝</div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h1>
        <p className="text-gray-500 mb-8">Save items you love for later by clicking the heart icon.</p>
        <Link to="/shop" className="btn-primary justify-center text-base px-8 py-3">Explore Products</Link>
      </div>
    </div>
  );

  return (
    <div className="page-container py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Wishlist <span className="text-gray-400 font-normal text-xl">({items.length})</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="card overflow-hidden group"
            >
              <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3]">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <button
                  onClick={() => { toggle(product); toast('Removed from wishlist'); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">{product.category}</span>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 hover:text-primary-600 transition-colors">
                    {product.title}
                  </h3>
                </Link>
                <StarRating rating={product.rating} size="sm" />
                <p className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</p>
                <button
                  onClick={() => moveToCart(product)}
                  className="btn-primary w-full justify-center text-sm py-2 mt-1"
                >
                  Move to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
