import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [validErr, setValidErr] = useState('');
  const { register, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setValidErr('');
    if (password !== confirm) { setValidErr('Passwords do not match'); return; }
    if (password.length < 6) { setValidErr('Password must be at least 6 characters'); return; }
    setLoading(true);
    const ok = await register(name, email, password);
    setLoading(false);
    if (ok) navigate('/');
  };

  const displayError = validErr || error;

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 bg-gradient-to-br from-primary-50 to-gray-100 dark:from-primary-950 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="font-extrabold text-2xl text-gray-900 dark:text-white">Shop<span className="text-primary-600">Sphere</span></span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Create your account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Join ShopSphere and start shopping</p>
        </div>

        <div className="card p-8">
          {displayError && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl p-3 mb-5 text-sm text-red-600 dark:text-red-400 font-medium">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: 'reg-name', label: 'Full Name', type: 'text', value: name, setter: setName, placeholder: 'John Smith' },
              { id: 'reg-email', label: 'Email', type: 'email', value: email, setter: setEmail, placeholder: 'you@example.com' },
              { id: 'reg-pass', label: 'Password', type: 'password', value: password, setter: setPassword, placeholder: '••••••••' },
              { id: 'reg-confirm', label: 'Confirm Password', type: 'password', value: confirm, setter: setConfirm, placeholder: '••••••••' },
            ].map(f => (
              <div key={f.id}>
                <label htmlFor={f.id} className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">{f.label}</label>
                <input id={f.id} type={f.type} value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder} className="input" required />
              </div>
            ))}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60 mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating account…
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
