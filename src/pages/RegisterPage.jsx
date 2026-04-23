import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();
  const { register, error, loading, clearError, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    return () => clearError();
  }, [isAuthenticated, navigate, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return; 
    }
    const success = await register(formData.name, formData.email, formData.password);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white dark:bg-dark-900">
      {/* Left: Branding/Visual */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-600/20 rounded-full blur-[100px]" />
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
            JOIN THE <br/>
            <span className="text-brand-500">REVOLUTION</span> <br/>
            OF STYLE.
          </h2>
          <p className="text-gray-400 font-medium text-lg max-w-sm">
            Experience the future of digital commerce. Curated collections, exclusive drops, and global shipping.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4">
           <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs font-black text-white overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt=""/>
                </div>
              ))}
           </div>
           <p className="text-xs font-bold text-gray-500 tracking-wide">TRUSTED BY 12,000+ SHOPPERS</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
        {/* Animated Background blobs for mobile */}
        <div className="lg:hidden absolute inset-0 z-0 pointer-events-none">
           <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="w-full max-w-md relative z-10"
        >
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">CREATE ACCOUNT</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Step into the sphere of high-end curation.</p>
          </div>

          {error && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-2xl mb-8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm font-bold text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Identity</label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-800 border-2 border-transparent focus:border-brand-600/50 dark:focus:border-brand-600 rounded-2xl outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400"
                placeholder="Alex Johnson"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Electronic Mail</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-800 border-2 border-transparent focus:border-brand-600/50 dark:focus:border-brand-600 rounded-2xl outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400"
                placeholder="alex@domain.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Secret Key</label>
                 <input
                   type="password"
                   required
                   className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-800 border-2 border-transparent focus:border-brand-600/50 dark:focus:border-brand-600 rounded-2xl outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400"
                   placeholder="••••••••"
                   value={formData.password}
                   onChange={e => setFormData({ ...formData, password: e.target.value })}
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Confirm</label>
                 <input
                   type="password"
                   required
                   className={`w-full px-5 py-4 bg-gray-50 dark:bg-dark-800 border-2 outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400 rounded-2xl ${
                     formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500' : 'border-transparent focus:border-brand-600/50'
                   }`}
                   placeholder="••••••••"
                   value={formData.confirmPassword}
                   onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                 />
               </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-600 text-white font-black rounded-2xl shadow-glow-md hover:shadow-glow-lg active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3 overflow-hidden relative group"
            >
              {loading ? (
                 <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">INITIALIZE ACCOUNT</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-bold text-gray-500">
            ALREADY IN THE SPHERE? <br/>
            <Link to="/login" className="text-brand-600 hover:underline">ACCESS YOUR ACCOUNT</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
