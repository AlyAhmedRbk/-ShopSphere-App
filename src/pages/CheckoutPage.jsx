import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { formatPrice, generateOrderId } from '../utils/helpers';
import toast from 'react-hot-toast';

const STEPS = ['Shipping', 'Payment', 'Review'];

const Input = ({ label, id, type = 'text', placeholder, required, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
    <input id={id} type={type} placeholder={placeholder} required={required} className="input" {...props} />
  </div>
);

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();

  const total = items.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = total >= 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', zip: '', country: 'United States',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });
  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < STEPS.length - 1) { setStep(s => s + 1); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const id = generateOrderId();
    clearCart();
    setOrderId(id);
    setSuccess(true);
    setLoading(false);
  };

  if (items.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  if (success) return (
    <div className="page-container py-24 text-center animate-scale-in">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6"
      >
        <svg className="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Order Confirmed! 🎉</h1>
      <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
      <p className="text-sm font-semibold text-primary-600 mb-8">Order ID: {orderId}</p>
      <div className="card p-6 max-w-sm mx-auto mb-8 text-left">
        <p className="text-sm text-gray-500 mb-1">Delivery to</p>
        <p className="font-semibold text-gray-900 dark:text-white">{form.name}</p>
        <p className="text-sm text-gray-500">{form.address}, {form.city}</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white mt-4">{formatPrice(grandTotal)} <span className="text-sm font-normal text-gray-400">total paid</span></p>
      </div>
      <button onClick={() => navigate('/shop')} className="btn-primary px-8 py-3 text-base">Continue Shopping</button>
    </div>
  );

  return (
    <div className="page-container py-10 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center mb-10 max-w-md">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              i <= step ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${i <= step ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{s}</span>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 transition-all duration-300 ${i < step ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {step === 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Shipping Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" id="name" placeholder="John Smith" value={form.name} onChange={set('name')} required />
                <Input label="Email" id="email" type="email" placeholder="john@example.com" value={form.email} onChange={set('email')} required />
              </div>
              <Input label="Street Address" id="address" placeholder="123 Main St" value={form.address} onChange={set('address')} required />
              <div className="grid sm:grid-cols-3 gap-4">
                <Input label="City" id="city" placeholder="New York" value={form.city} onChange={set('city')} required />
                <Input label="ZIP Code" id="zip" placeholder="10001" value={form.zip} onChange={set('zip')} required />
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Country</label>
                  <select className="input" value={form.country} onChange={set('country')}>
                    {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Payment Details</h2>
              <div className="flex gap-2 mb-2">
                {['💳 Visa', '🔵 Mastercard', '🟡 Amex'].map(c => (
                  <span key={c} className="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 text-xs">{c}</span>
                ))}
              </div>
              <Input label="Name on Card" id="cardName" placeholder="John Smith" value={form.cardName} onChange={set('cardName')} required />
              <Input label="Card Number" id="cardNumber" placeholder="4242 4242 4242 4242" value={form.cardNumber} onChange={set('cardNumber')} required />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Expiry Date" id="expiry" placeholder="MM / YY" value={form.expiry} onChange={set('expiry')} required />
                <Input label="CVV" id="cvv" placeholder="123" value={form.cvv} onChange={set('cvv')} required />
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <span>🔒</span> Your payment info is encrypted and secure. This is a demo — no real charges.
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Review Your Order</h2>
              <div className="divide-y divide-gray-100 dark:divide-surface-dark-border">
                {items.map(item => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.title}</p>
                      <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="flex gap-3">
            {step > 0 && (
              <button type="button" onClick={() => setStep(s => s - 1)} className="btn-secondary flex-1 justify-center">← Back</button>
            )}
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center py-3 text-base disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Processing…
                </span>
              ) : step < STEPS.length - 1 ? `Continue to ${STEPS[step + 1]} →` : 'Place Order 🎉'}
            </button>
          </div>
        </form>

        {/* Summary sidebar */}
        <div className="card p-6 h-fit sticky top-24">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Summary</h2>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold">{formatPrice(total)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className={`font-semibold ${shipping === 0 ? 'text-emerald-600' : ''}`}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span className="font-semibold">{formatPrice(tax)}</span></div>
            <div className="border-t border-gray-100 dark:border-surface-dark-border pt-2 flex justify-between font-extrabold text-gray-900 dark:text-white text-base">
              <span>Total</span><span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
