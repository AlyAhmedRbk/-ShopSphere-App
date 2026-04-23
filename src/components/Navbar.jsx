import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useWishlistStore } from '../store/wishlistStore';

const NAV_LINKS = [
  { label: 'Marketplace', to: '/shop' },
  { label: 'Collections', to: '#' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = useCartStore(s => s.items.reduce((acc, i) => acc + i.qty, 0));
  const wishlistCount = useWishlistStore(s => s.items.length);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { dark, toggle } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled 
        ? 'py-3 bg-white/70 dark:bg-dark-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-dark-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
            <span className="text-white font-black text-xl italic tracking-tighter">S</span>
          </div>
          <span className="font-black text-2xl tracking-tighter text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">
            SHOP<span className="text-brand-600 opacity-80">SPHERE-V2</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-gray-100/50 dark:bg-dark-700/50 p-1 rounded-2xl border border-gray-200/50 dark:border-dark-border/50">
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                location.pathname === link.to
                  ? 'bg-white dark:bg-dark-600 text-brand-600 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={toggle}
            className="p-2.5 rounded-2xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all active:scale-90 border border-transparent hover:border-gray-200 dark:hover:border-dark-border"
          >
            {dark ? (
              <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.485a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2.5 rounded-2xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all active:scale-90 border border-transparent hover:border-gray-200 dark:hover:border-dark-border group">
            <svg className="w-5 h-5 group-hover:text-rose-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {wishlistCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-dark-900 leading-none">{wishlistCount}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2.5 rounded-2xl bg-brand-600 text-white shadow-glow-sm hover:shadow-glow-md transition-all active:scale-90 group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            {totalItems > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-brand-600 text-xs font-black rounded-full flex items-center justify-center border-2 border-brand-600 leading-none">{totalItems}</span>}
          </Link>

          {/* Auth / Avatar */}
          <div className="h-8 w-px bg-gray-200 dark:bg-dark-border mx-1 hidden sm:block"></div>

          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 pr-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-all border border-transparent hover:border-gray-200 dark:hover:border-dark-border overflow-hidden">
                <div className="w-8 h-8 rounded-xl bg-mesh-purple flex items-center justify-center text-brand-600 font-black text-xs border border-brand-200 dark:border-brand-900/50">
                  {user.avatar}
                </div>
                <span className="hidden md:block text-xs font-bold text-gray-700 dark:text-gray-200">{user.name.split(' ')[0]}</span>
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 invisible group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-border shadow-xl overflow-hidden p-1.5">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-dark-border mb-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">My Account</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.email}</p>
                  </div>
                  <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-700 transition-all border border-gray-200 dark:border-dark-border group">
              Sign In
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map(link => (
                <Link key={link.label} to={link.to} className="text-2xl font-black text-gray-900 dark:text-white hover:text-brand-600 transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-dark-border flex flex-col gap-3">
                {!isAuthenticated && (
                  <Link to="/login" className="flex items-center justify-center p-4 rounded-2xl bg-brand-600 text-white font-black">
                    Join ShopSphere
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
