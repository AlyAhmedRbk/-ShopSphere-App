import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart } = useCartStore();
  const total = items.reduce((a, i) => a + i.price * i.qty, 0);
  const totalItems = items.reduce((a, i) => a + i.qty, 0);
  const shipping = total >= 100 ? 0 : 25;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  if (items.length === 0) return (
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-dark-900 flex items-center justify-center">
       <div className="text-center max-w-sm px-6">
          <p className="text-8xl mb-8 grayscale opacity-20">📦</p>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">Manifest Empty</h2>
          <p className="text-gray-400 font-bold mt-4 leading-relaxed italic">Your inventory manifest is currently void. Initialize a shopping session to populate with gear.</p>
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
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-600 mb-4 opacity-80">Inventory Matrix</p>
              <h1 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none italic uppercase">Your Manifest.</h1>
           </div>
           <button onClick={() => { clearCart(); toast('Manifest Wiped'); }} className="text-xs font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl transition-all uppercase tracking-widest border-2 border-dashed border-red-500/20">Wipe Database ↺</button>
        </div>

        <div className="flex flex-col xl:flex-row gap-16 items-start">
           
           {/* Items Manifest */}
           <div className="flex-1 space-y-4">
              <AnimatePresence mode="popLayout">
                 {items.map(item => (
                    <motion.div
                       layout
                       key={item.id}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.4 }}
                       className="group relative bg-white dark:bg-dark-800/40 p-6 rounded-[2.5rem] border-2 border-gray-50 dark:border-dark-border flex flex-col sm:flex-row gap-8 items-center"
                    >
                       <Link to={`/product/${item.id}`} className="w-32 h-40 rounded-3xl overflow-hidden bg-gray-100 dark:bg-dark-800/50 flex-shrink-0 border-4 border-white dark:border-dark-700 shadow-lg group-hover:scale-105 transition-transform duration-500">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                       </Link>

                       <div className="flex-1 min-w-0 text-center sm:text-left">
                          <p className="text-[10px] font-black uppercase tracking-widest text-brand-600 mb-1 opacity-80">{item.category}</p>
                          <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-none mb-3 truncate">{item.title}</h3>
                          <p className="text-3xl font-black text-gray-900 dark:text-white italic tracking-tighter">{formatPrice(item.price)}</p>
                       </div>

                       <div className="flex flex-row sm:flex-col items-center justify-between gap-6 w-full sm:w-auto mt-4 sm:mt-0 pt-6 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-dark-border">
                          <div className="flex items-center gap-1 bg-gray-50 dark:bg-dark-900 p-1 rounded-2xl">
                             <button onClick={() => updateQty(item.id, item.qty - 1)} disabled={item.qty === 1} className="w-10 h-10 flex items-center justify-center font-black text-gray-400 hover:text-brand-600 disabled:opacity-20 transition-all">−</button>
                             <span className="w-8 text-center font-black text-gray-900 dark:text-white">{item.qty}</span>
                             <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-10 h-10 flex items-center justify-center font-black text-gray-400 hover:text-brand-600 transition-all">+</button>
                          </div>
                          
                          <div className="text-right">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Row Total</p>
                             <p className="text-xl font-black text-gray-900 dark:text-white italic">{formatPrice(item.price * item.qty)}</p>
                          </div>
                       </div>

                       <button 
                          onClick={() => { removeItem(item.id); toast('Removed'); }}
                          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-2xl bg-gray-50 dark:bg-dark-900 text-gray-300 hover:bg-gray-900 hover:text-white dark:hover:bg-red-600 transition-all flex items-center justify-center"
                       >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                       </button>
                    </motion.div>
                 ))}
              </AnimatePresence>
           </div>

           {/* Financial Summary */}
           <div className="w-full xl:w-[450px] flex-shrink-0 space-y-8">
              <div className="p-10 bg-gray-900 text-white rounded-[3.5rem] shadow-glow-md relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-600/40 transition-colors duration-700" />
                 
                 <h2 className="text-3xl font-black italic tracking-tighter mb-10 relative z-10">SUMMARY.</h2>
                 
                 <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-end pb-4 border-b border-white/5">
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Inventory Subtotal</span>
                       <span className="text-2xl font-black tracking-tighter">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between items-end pb-4 border-b border-white/5">
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Logistics Deployment</span>
                       <span className={`text-2xl font-black tracking-tighter ${shipping === 0 ? 'text-brand-500' : ''}`}>
                          {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                       </span>
                    </div>
                    <div className="flex justify-between items-end pb-4 border-b border-white/5">
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">V.A.T Revision (8%)</span>
                       <span className="text-2xl font-black tracking-tighter">{formatPrice(tax)}</span>
                    </div>
                    
                    {total < 100 && (
                       <div className="py-4 px-6 bg-brand-600/10 border border-brand-600/30 rounded-2xl">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400 mb-1 leading-none">Threshold Alert</p>
                          <p className="text-xs font-bold text-gray-300">Deploy {formatPrice(100 - total)} more to bypass logistics fees.</p>
                       </div>
                    )}

                    <div className="pt-8 flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Order Final Total</p>
                          <h3 className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                             {formatPrice(grandTotal)}
                          </h3>
                       </div>
                    </div>

                    <Link to="/checkout" className="mt-12 w-full flex items-center justify-center gap-4 py-6 bg-brand-600 hover:bg-brand-500 text-white font-black rounded-2xl transition-all shadow-glow-sm hover:shadow-glow-lg group active:scale-95">
                       INITIALIZE CHECKOUT
                       <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                 </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: '🔒', title: 'Secured Link', desc: 'Quantum-safe SSL' },
                   { icon: '🌍', title: 'Global Grid', desc: 'Syncing 48 nodes' }
                 ].map(g => (
                    <div key={g.title} className="p-6 bg-white dark:bg-dark-800 border-2 border-gray-100 dark:border-dark-border rounded-[2rem] text-center group hover:border-brand-600/20 transition-all">
                       <div className="text-3xl mb-3 group-hover:scale-125 transition-transform inline-block">{g.icon}</div>
                       <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase mb-1">{g.title}</h4>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{g.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
