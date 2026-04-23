import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 mt-auto">
      <div className="page-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-extrabold text-xl text-white">
                Shop<span className="text-primary-400">Sphere</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Premium products, curated for modern living. Fast shipping, easy returns.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Shop</h4>
            <ul className="space-y-2 text-sm">
              {['All Products', 'Electronics', 'Clothing', 'Footwear', 'Home & Kitchen'].map(cat => (
                <li key={cat}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(cat === 'All Products' ? 'All' : cat)}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Account</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Sign In', to: '/login' },
                { label: 'Register', to: '/register' },
                { label: 'Wishlist', to: '/wishlist' },
                { label: 'Cart', to: '/cart' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              {['FAQ', 'Shipping Policy', 'Return Policy', 'Contact Us'].map(i => (
                <li key={i}><span className="hover:text-white transition-colors cursor-pointer">{i}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} ShopSphere. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
