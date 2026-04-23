import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../services/productService';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import { formatPrice, calcDiscount } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);

  const addItem = useCartStore(s => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setSelectedImg(0);
    setQty(1);
    productService.getById(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
        return productService.getRelated(id, data.category);
      })
      .then(rel => setRelated(rel))
      .catch(err => { setError(err.message); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="page-container py-12 animate-pulse">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="shimmer-bg aspect-square rounded-2xl" />
        <div className="space-y-4">
          <div className="shimmer-bg h-4 w-24 rounded-full" />
          <div className="shimmer-bg h-8 w-3/4 rounded-full" />
          <div className="shimmer-bg h-4 w-full rounded-full" />
          <div className="shimmer-bg h-4 w-2/3 rounded-full" />
          <div className="shimmer-bg h-10 w-32 rounded-full mt-4" />
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="page-container py-20 text-center">
      <p className="text-red-500 font-semibold text-lg">{error}</p>
      <Link to="/shop" className="btn-primary mt-6 inline-flex">← Back to Shop</Link>
    </div>
  );

  if (!product) return null;

  const discount = calcDiscount(product.originalPrice, product.price);
  const wished = isWishlisted(product.id);
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${qty}× "${product.title}" added to cart!`, {
      icon: '🛒', style: { borderRadius: '12px', fontWeight: 500 },
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="page-container py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300 truncate max-w-xs">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image gallery */}
          <div className="space-y-4">
            <motion.div
              key={selectedImg}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800"
            >
              <img
                src={images[selectedImg]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImg === i ? 'border-primary-500 shadow-glow' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-5">
            <div>
              <span className="badge bg-primary-50 dark:bg-primary-900/30 text-primary-600 text-xs font-semibold uppercase tracking-wide px-3 py-1 mb-3 inline-block rounded-full">
                {product.category}
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">{product.title}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size="lg" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="badge bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">Save {discount}%</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1"># {tag}</span>
              ))}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
              <span className={`text-sm font-medium ${product.stock > 10 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left!`}
              </span>
            </div>

            {/* Qty + Actions */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 border border-gray-200 dark:border-surface-dark-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-lg"
                >−</button>
                <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-lg"
                >+</button>
              </div>

              <button onClick={handleAddToCart} className="btn-primary flex-1 justify-center py-3 text-base">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>

              <button
                onClick={() => { toggle(product); toast(isWishlisted(product.id) ? 'Removed from wishlist' : 'Added to wishlist ❤️', { style: { borderRadius: '12px' } }); }}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                  wished
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'border-gray-200 dark:border-surface-dark-border text-gray-500 hover:border-rose-400 hover:text-rose-500'
                }`}
                aria-label="Wishlist"
              >
                <svg className="w-5 h-5" fill={wished ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100 dark:border-surface-dark-border">
              {[{ icon: '🚚', label: 'Free Shipping' }, { icon: '🔄', label: '30-Day Return' }, { icon: '🔒', label: 'Secure Pay' }].map(g => (
                <div key={g.label} className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-2xl">{g.icon}</span>
                  <p className="text-xs font-medium mt-1 text-gray-600 dark:text-gray-400">{g.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="section-title mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
