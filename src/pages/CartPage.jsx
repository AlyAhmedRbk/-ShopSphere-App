import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart } = useCartStore();
  const total = items.reduce((a, i) => a + i.price * i.qty, 0);
  const totalItems = items.reduce((a, i) => a + i.qty, 0);
  const shipping = total >= 100 ? 0 : 9.99;
  const tax = total * 0.08;

  if (items.length === 0) return (
    <div className="page-container py-24 text-center animate-fade-in">
      <div className="max-w-sm mx-auto">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-primary justify-center text-base px-8 py-3">Browse Products</Link>
      </div>
    </div>
  );

  return (
    <div className="page-container py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Shopping Cart <span className="text-gray-400 font-normal text-xl">({totalItems})</span>
        </h1>
        <button onClick={() => { clearCart(); toast('Cart cleared'); }} className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">
          Clear All
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25 }}
                className="card p-4 flex gap-4 items-start"
              >
                <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm hover:text-primary-600 transition-colors line-clamp-2">{item.title}</h3>
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                  <p className="text-primary-600 font-bold mt-1">{formatPrice(item.price)}</p>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                  <button
                    onClick={() => { removeItem(item.id); toast('Item removed'); }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-1 border border-gray-200 dark:border-surface-dark-border rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} disabled={item.qty <= 1}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors font-bold">−</button>
                    <span className="w-6 text-center text-sm font-semibold text-gray-900 dark:text-white">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold">+</button>
                  </div>

                  <span className="text-sm font-bold text-gray-900 dark:text-white">{formatPrice(item.price * item.qty)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Shipping</span>
                <span className={`font-semibold ${shipping === 0 ? 'text-emerald-600' : ''}`}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Tax (8%)</span>
                <span className="font-semibold">{formatPrice(tax)}</span>
              </div>
              {total < 100 && (
                <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2">
                  Add {formatPrice(100 - total)} more for free shipping!
                </p>
              )}
              <div className="border-t border-gray-100 dark:border-surface-dark-border pt-3 flex justify-between font-extrabold text-gray-900 dark:text-white text-lg">
                <span>Total</span>
                <span>{formatPrice(total + shipping + tax)}</span>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary w-full justify-center mt-6 py-3 text-base">
              Proceed to Checkout →
            </Link>
            <Link to="/shop" className="btn-ghost w-full justify-center mt-3 text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
