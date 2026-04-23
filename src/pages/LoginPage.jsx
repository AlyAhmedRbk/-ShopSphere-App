import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('alex@demo.com');
  const [password, setPassword] = useState('password123');
  const navigate = useNavigate();
  const { login, error, loading, clearError, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    return () => clearError();
  }, [isAuthenticated, navigate, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white dark:bg-dark-900">
      {/* Left: Branding/Visual */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px]" />
        </div>
        
        <Link to="/" className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center">
            <span className="text-white font-black text-xl italic tracking-tighter">S</span>
          </div>
          <span className="font-black text-2xl tracking-tighter text-white">SHOP<span className="opacity-50">SPHERE</span></span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-6xl font-black text-white leading-none tracking-tighter mb-8">
            WELCOME <br/>
            <span className="text-neon-cyan">BACK TO</span> <br/>
            THE CORE.
          </h2>
          <p className="text-gray-400 font-medium text-lg max-w-sm">
            Unlock your curated dashboard, track orders, and access member-only drops and prices.
          </p>
        </div>

        <div className="relative z-10 p-6 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-md max-w-xs transition-transform hover:-translate-y-2 cursor-pointer">
           <p className="text-[10px] font-black text-neon-cyan uppercase tracking-widest mb-2">Member Perk</p>
           <p className="text-sm font-bold text-white mb-4">You have 2 items saved in your wishlist. Complete your purchase now for free shipping!</p>
           <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center text-neon-cyan">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
           </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
        <div className="lg:hidden absolute inset-0 z-0 pointer-events-none">
           <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-neon-cyan/10 rounded-full blur-3xl" />
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="w-full max-w-md relative z-10"
        >
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">AUTH ACCESS</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Re-enter the world of premium curation.</p>
          </div>

          {error && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-2xl mb-8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm font-bold text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Account Mail</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-800 border-2 border-transparent focus:border-brand-600/50 dark:focus:border-brand-600 rounded-2xl outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400"
                placeholder="alex@domain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Security Key</label>
                <button type="button" className="text-[10px] font-black text-brand-600 uppercase hover:underline">Forgot?</button>
              </div>
              <input
                type="password"
                required
                className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-800 border-2 border-transparent focus:border-brand-600/50 dark:focus:border-brand-600 rounded-2xl outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-600 text-white font-black rounded-2xl shadow-glow-md hover:shadow-glow-lg active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3 relative group"
            >
              {loading ? (
                 <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>INITIALIZE SESSION</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-bold text-gray-500">
            NEW TO THE SPHERE? <br/>
            <Link to="/register" className="text-brand-600 hover:underline">CREATE AN IDENTITY</Link>
          </p>

          <div className="mt-12 p-4 rounded-2xl bg-gray-50 dark:bg-dark-800/50 border border-gray-100 dark:border-dark-border text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-wider text-center">
             💡 This is a demonstration. Use alex@demo.com & password123 to access the pre-configured mock account.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
