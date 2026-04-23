import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { productService } from '../services/productService';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import { formatPrice, calcDiscount } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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
     <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-dark-900 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-600/20 border-t-brand-600 rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Product Specifications...</p>
     </div>
  );

  if (error || !product) return (
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-dark-900 flex items-center justify-center">
       <div className="text-center">
          <p className="text-4xl mb-4">🔦</p>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic">Product Hidden</h2>
          <p className="text-gray-400 font-bold mt-2">The specified ID does not exist in our current catalog.</p>
          <Link to="/shop" className="mt-8 inline-block px-10 py-4 bg-brand-600 text-white font-black rounded-2xl shadow-glow-sm">RETURN TO SHOP</Link>
       </div>
    </div>
  );

  const discount = calcDiscount(product.originalPrice, product.price);
  const wished = isWishlisted(product.id);
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${qty}x Added to cart!`, {
      style: { borderRadius: '20px', fontWeight: '900', background: '#111118', color: '#fff' },
    });
  };

  return (
    <div className="bg-white dark:bg-dark-900 min-h-screen pt-32 pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Navigation / Breadcrumb */}
        <div className="flex items-center gap-4 mb-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
           <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-600 transition-colors">Sphere</Link>
           <div className="w-1 h-1 rounded-full bg-gray-300" />
           <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-600 transition-colors">Marketplace</Link>
           <div className="w-1 h-1 rounded-full bg-gray-300" />
           <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-600 transition-colors">{product.category}</Link>
           <div className="w-1 h-1 rounded-full bg-gray-300" />
           <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 truncate">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          
          {/* Visual Gallery */}
          <div className="sticky top-32 space-y-8">
            <motion.div 
               layoutId={`product-img-${product.id}`}
               className="relative aspect-[9/11] rounded-[3rem] overflow-hidden bg-gray-100 dark:bg-dark-800 border-4 border-white dark:border-dark-700 shadow-2xl"
            >
               <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedImg}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={images[selectedImg]} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
               </AnimatePresence>
               
               {/* Detail Overlay */}
               <div className="absolute top-8 left-8 z-10 flex flex-col gap-3">
                  <span className="px-4 py-1.5 bg-brand-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-glow-sm">SPEC. GRADE</span>
                  {discount > 0 && <span className="px-4 py-1.5 bg-red-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-glow-sm">LIMIT DROP</span>}
               </div>
            </motion.div>

            {/* Thumbnail Controls */}
            {images.length > 1 && (
              <div className="flex gap-4">
                 {images.map((img, i) => (
                    <button 
                       key={i}
                       onClick={() => setSelectedImg(i)}
                       className={`w-28 h-28 rounded-3xl overflow-hidden border-4 transition-all duration-300 transform ${
                         selectedImg === i ? 'border-brand-600 scale-105 shadow-glow-sm' : 'border-white dark:border-dark-800 opacity-50 grayscale hover:grayscale-0 hover:opacity-100'
                       }`}
                    >
                       <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                 ))}
              </div>
            )}
          </div>

          {/* Core Product Info */}
          <div className="py-8 space-y-10">
             <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-600 dark:text-brand-400 mb-4 opacity-80">{product.category}</p>
                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.9] mb-6 italic">{product.title.toUpperCase()}</h1>
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2">
                      <StarRating rating={product.rating} size="md" />
                      <span className="text-sm font-black text-gray-900 dark:text-white">{product.rating}</span>
                   </div>
                   <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.reviewCount} VERIFIED DEPLOYMENTS</p>
                </div>
             </div>

             <div className="flex items-baseline gap-6 border-y-2 border-gray-100 dark:border-dark-border py-10">
                <span className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter italic">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <div className="flex flex-col">
                     <span className="text-xl text-gray-400 line-through font-bold">{formatPrice(product.originalPrice)}</span>
                     <span className="text-xs font-black text-red-500 uppercase tracking-wider mt-1">-{discount}% Reduction</span>
                  </div>
                )}
             </div>

             <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Technical Description</p>
                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-xl italic">
                   "{product.description}"
                </p>
             </div>

             <div className="flex flex-wrap gap-2 pt-4">
                {product.tags.map(tag => (
                   <span key={tag} className="px-4 py-2 bg-gray-100 dark:bg-dark-800 rounded-xl text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest border border-transparent hover:border-brand-600/20 transition-all cursor-default">
                      ✦ {tag}
                   </span>
                ))}
             </div>

             {/* Action Matrix */}
             <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-10">
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-dark-800 p-1 rounded-2xl border-2 border-transparent">
                   <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-14 h-14 flex items-center justify-center font-black text-xl text-gray-400 hover:text-brand-600 transition-colors">−</button>
                   <span className="w-10 text-center font-black text-gray-900 dark:text-white text-lg">{qty}</span>
                   <button onClick={() => setQty(q => Math.min(product.stock, q+1))} className="w-14 h-14 flex items-center justify-center font-black text-xl text-gray-400 hover:text-brand-600 transition-colors">+</button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 flex items-center justify-center gap-4 py-5 font-black text-sm uppercase tracking-widest rounded-2xl shadow-glow-md hover:shadow-glow-lg transition-all active:scale-95 group
                    ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-600 text-white'}`}
                >
                   {product.stock === 0 ? 'Out of Stock' : (
                     <>
                        DEPLOY TO CART
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </>
                   )}
                </button>

                <button 
                  onClick={() => toggle(product)}
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl border-2 transition-all active:scale-90
                    ${wished ? 'bg-rose-500 border-rose-500 text-white shadow-glow-pink' : 'bg-white dark:bg-dark-800 border-gray-100 dark:border-dark-border text-gray-400 hover:border-rose-500 hover:text-rose-500'}`}
                >
                   <svg className="w-6 h-6" fill={wished ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                   </svg>
                </button>
             </div>

             {/* Dynamic Stock Indicator */}
             <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 dark:bg-dark-800/50 rounded-2xl border border-gray-100 dark:border-dark-border">
                <div className={`w-2.5 h-2.5 rounded-full animate-ping ${product.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 italic">
                   {product.stock > 10 ? 'Unit Status: High Availability - Ships in 24h' : `Unit Status: Critical Low Availability - Only ${product.stock} Remain`}
                </p>
             </div>
          </div>
        </div>

        {/* Extended Related Grid */}
        {related.length > 0 && (
          <section className="mt-40">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-600 mb-4 opacity-80">Syncing Catalog</p>
                  <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase leading-none">Compatible Selections.</h2>
                </div>
                <Link to="/shop" className="text-xs font-black text-gray-400 hover:text-brand-600 transition-colors uppercase tracking-[0.2em]">Explore Total Repository →</Link>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
             </div>
          </section>
        )}
      </div>
    </div>
  );
}
