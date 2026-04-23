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
    toast.success(`"${product.title}" added to cart!`, {
      icon: '🛒',
      style: { borderRadius: '12px', fontWeight: 500 },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggle(product);
    toast(wished ? 'Removed from wishlist' : 'Added to wishlist ❤️', {
      style: { borderRadius: '12px', fontWeight: 500 },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`} className="card card-hover group flex flex-col overflow-hidden block">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className={`badge text-white ${
                product.badge === 'New' ? 'bg-emerald-500' :
                product.badge === 'Sale' ? 'bg-red-500' :
                product.badge === 'Bestseller' ? 'bg-primary-600' :
                product.badge === 'Top Rated' ? 'bg-amber-500' :
                product.badge === 'Eco' ? 'bg-green-600' :
                'bg-gray-700'
              }`}>{product.badge}</span>
            )}
            {discount > 0 && (
              <span className="badge bg-red-500 text-white">−{discount}%</span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full shadow-lg flex items-center justify-center
              transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
              ${wished
                ? 'bg-rose-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 hover:bg-rose-50 hover:text-rose-500'
              }`}
            aria-label="Wishlist"
          >
            <svg className="w-4 h-4" fill={wished ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Quick add */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary justify-center py-2 text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center gap-1.5 mt-auto pt-1">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {product.stock <= 10 && (
            <p className="text-xs text-amber-600 font-medium">Only {product.stock} left in stock</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
