import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20 relative">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/10 rounded-full blur-[120px]" />
          
          <div className="col-span-2 relative z-10">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center shadow-glow-sm">
                <span className="text-white font-black text-xl italic tracking-tighter">S</span>
              </div>
              <span className="font-black text-2xl tracking-tighter text-white">SHOP<span className="opacity-40">SPHERE</span></span>
            </Link>
            <p className="text-xl font-bold text-gray-400 max-w-sm mb-10 italic leading-relaxed">
              Redefining digital acquisition with precision curation and unmatched logistics.
            </p>
            <div className="flex gap-4">
               {['TW', 'IG', 'LI'].map(social => (
                 <button key={social} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-gray-500 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all active:scale-90">
                    {social}
                 </button>
               ))}
            </div>
          </div>

          <div className="relative z-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white underline decoration-brand-600 decoration-4 underline-offset-8 mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-sm font-bold text-gray-500 hover:text-brand-600 transition-colors uppercase italic">Marketplace</Link></li>
              <li><Link to="/wishlist" className="text-sm font-bold text-gray-500 hover:text-brand-600 transition-colors uppercase italic">Private Collection</Link></li>
              <li><Link to="/cart" className="text-sm font-bold text-gray-500 hover:text-brand-600 transition-colors uppercase italic">Manifest Check</Link></li>
              <li><Link to="/login" className="text-sm font-bold text-gray-500 hover:text-brand-600 transition-colors uppercase italic">Member Core</Link></li>
            </ul>
          </div>

          <div className="relative z-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white underline decoration-neon-cyan decoration-4 underline-offset-8 mb-8">Grid Sectors</h4>
            <ul className="space-y-4">
              <li><Link to="/shop?category=Electronics" className="text-sm font-bold text-gray-500 hover:text-neon-cyan transition-colors uppercase italic">Electronics</Link></li>
              <li><Link to="/shop?category=Footwear" className="text-sm font-bold text-gray-500 hover:text-neon-cyan transition-colors uppercase italic">Footwear</Link></li>
              <li><Link to="/shop?category=Outerwear" className="text-sm font-bold text-gray-500 hover:text-neon-cyan transition-colors uppercase italic">Apparel</Link></li>
              <li><Link to="/shop?category=Home & Kitchen" className="text-sm font-bold text-gray-500 hover:text-neon-cyan transition-colors uppercase italic">Home Core</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 italic">
          <p>© 2025 ShopSphere Protocol. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-600 transition-colors">Privacy Paradigm</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Term Vectors</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Cookie Schema</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
