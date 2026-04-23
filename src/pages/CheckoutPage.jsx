import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { formatPrice, generateOrderId } from '../utils/helpers';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'logistics', label: 'Logistics Hub' },
  { id: 'payment', label: 'Payment Encryption' },
  { id: 'validation', label: 'Final Validation' }
];

const InputField = ({ label, type = 'text', placeholder, value, onChange, required }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-800 border-2 border-transparent focus:border-brand-600/50 dark:focus:border-brand-600 rounded-2xl outline-none transition-all font-bold text-sm text-gray-900 dark:text-white placeholder:text-gray-400"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ id: '', total: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '', 
    email: user?.email || '', 
    address: '42 Sector 7, Cyber-Nexus', 
    city: 'Neo-Genesis', 
    zip: '5577-X', 
    country: 'United Regions',
    cardName: '', 
    cardNumber: '', 
    expiry: '', 
    cvv: ''
  });

  const total = items.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = total >= 100 ? 0 : 25;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const updateForm = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
      window.scrollTo(0, 0);
    } else {
      finalizeOrder();
    }
  };

  const finalizeOrder = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2500));
    const orderId = generateOrderId();
    setOrderDetails({ id: orderId, total: grandTotal });
    setIsSuccess(true);
    clearCart();
    setIsProcessing(false);
    toast.success('Transaction Logged', { style: { borderRadius: '20px', fontWeight: '900' } });
  };

  if (items.length === 0 && !isSuccess) {
    navigate('/shop');
    return null;
  }

  if (isSuccess) return (
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-dark-900 flex items-center justify-center px-6">
       <motion.div 
         initial={{ scale: 0.9, opacity: 0 }} 
         animate={{ scale: 1, opacity: 1 }} 
         className="w-full max-w-xl text-center space-y-10"
       >
          <div className="relative inline-block">
             <div className="absolute inset-0 bg-brand-600 blur-[60px] opacity-20 rounded-full animate-pulse" />
             <div className="relative w-32 h-32 rounded-[2.5rem] bg-brand-600 flex items-center justify-center text-white shadow-glow-lg animate-float">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
             </div>
          </div>

          <div className="space-y-4">
             <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase leading-none">ORDER LOGGED.</h1>
             <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">Your transaction sequence is complete. Recalibrating logistics for teleportation.</p>
          </div>

          <div className="p-10 bg-gray-900 text-white rounded-[3rem] border border-white/5 text-left relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-40 h-40 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
             <div className="grid grid-cols-2 gap-8 relative z-10">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Sequence ID</p>
                  <p className="text-xl font-black text-brand-500 tracking-tighter">#{orderDetails.id}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Total Captured</p>
                  <p className="text-xl font-black tracking-tighter">{formatPrice(orderDetails.total)}</p>
                </div>
                <div className="col-span-2 pt-4 border-t border-white/5">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Vessel Destination</p>
                  <p className="text-sm font-bold text-gray-300 leading-relaxed">{form.address}, {form.city}, {form.country}</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/" className="px-10 py-5 bg-brand-600 text-white font-black rounded-2xl shadow-glow-md hover:shadow-glow-lg transition-all active:scale-95 text-xs tracking-widest uppercase">RETURN TO CORE</Link>
             <button onClick={() => window.print()} className="px-10 py-5 bg-white dark:bg-dark-800 border-2 border-gray-100 dark:border-dark-border text-gray-900 dark:text-white font-black rounded-2xl hover:bg-gray-50 transition-all text-xs tracking-widest uppercase">PRINT MANIFEST</button>
          </div>
       </motion.div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-dark-900 min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-600 mb-4 opacity-80">Transaction Unit</p>
                <h1 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none italic uppercase">Finalize.</h1>
             </div>
             
             {/* Progress Gauge */}
             <div className="flex gap-4">
                {STEPS.map((step, i) => (
                  <div key={step.id} className="flex flex-col gap-2">
                     <div className={`h-1.5 w-16 sm:w-24 rounded-full transition-all duration-700 ${i <= currentStep ? 'bg-brand-600 shadow-glow-sm' : 'bg-gray-100 dark:bg-dark-800'}`} />
                     <p className={`text-[10px] font-black uppercase tracking-widest italic ${i <= currentStep ? 'text-brand-600' : 'text-gray-300 dark:text-gray-700'}`}>{`0${i+1}`}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-16 items-start">
             
             {/* Active Panel */}
             <form onSubmit={handleNext} className="lg:col-span-2 space-y-10">
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div 
                      key="step-0" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                      className="space-y-8"
                    >
                       <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gray-900 dark:text-white underline decoration-brand-600/30 decoration-4 underline-offset-8">LOGISTICS NEXUS</h2>
                       <div className="grid sm:grid-cols-2 gap-6">
                          <InputField label="Identity Name" placeholder="Alex Johnson" value={form.name} onChange={e => updateForm('name', e.target.value)} required />
                          <InputField label="Electronic Mail" placeholder="alex@domain.com" type="email" value={form.email} onChange={e => updateForm('email', e.target.value)} required />
                       </div>
                       <InputField label="Nexus Coordinate (Street)" placeholder="42 Sector 7..." value={form.address} onChange={e => updateForm('address', e.target.value)} required />
                       <div className="grid sm:grid-cols-3 gap-6">
                          <InputField label="Metropolis" placeholder="Neo-Genesis" value={form.city} onChange={e => updateForm('city', e.target.value)} required />
                          <InputField label="Grid Code" placeholder="5577-X" value={form.zip} onChange={e => updateForm('zip', e.target.value)} required />
                          <InputField label="Global Zone" placeholder="United Regions" value={form.country} onChange={e => updateForm('country', e.target.value)} required />
                       </div>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div 
                      key="step-1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                      className="space-y-8"
                    >
                       <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gray-900 dark:text-white underline decoration-brand-600/30 decoration-4 underline-offset-8">ENCRYPTION PROTOCOLS</h2>
                       <div className="flex gap-4 mb-4">
                          <div className="px-6 py-4 bg-gray-50 dark:bg-dark-800 rounded-2xl border-2 border-brand-600 flex items-center gap-4">
                             <div className="w-4 h-4 rounded-full bg-brand-600 animate-pulse" />
                             <span className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white italic">Credit / Debit Interface</span>
                          </div>
                       </div>
                       <InputField label="Licensee Name" placeholder="ALEX JOHNSON" value={form.cardName} onChange={e => updateForm('cardName', e.target.value)} required />
                       <InputField label="Access Serial (Card Number)" placeholder="XXXX-XXXX-XXXX-XXXX" value={form.cardNumber} onChange={e => updateForm('cardNumber', e.target.value)} required />
                       <div className="grid sm:grid-cols-2 gap-6">
                          <InputField label="Expiration Cycle" placeholder="MM / YY" value={form.expiry} onChange={e => updateForm('expiry', e.target.value)} required />
                          <InputField label="Security Key (CVV)" placeholder="***" type="password" value={form.cvv} onChange={e => updateForm('cvv', e.target.value)} required />
                       </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div 
                      key="step-2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                      className="space-y-8"
                    >
                       <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gray-900 dark:text-white underline decoration-brand-600/30 decoration-4 underline-offset-8">MANIFEST VALIDATION</h2>
                       <div className="divide-y-2 divide-gray-50 dark:divide-dark-border">
                          {items.map(item => (
                             <div key={item.id} className="py-6 flex items-center justify-between group">
                                <div className="flex items-center gap-5">
                                   <div className="w-16 h-20 rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-800 flex-shrink-0 border-2 border-transparent group-hover:border-brand-600/20 transition-all">
                                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                                   </div>
                                   <div>
                                      <p className="text-sm font-black text-gray-900 dark:text-white tracking-tighter italic uppercase">{item.title}</p>
                                      <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">Qty: {item.qty} × {formatPrice(item.price)}</p>
                                   </div>
                                </div>
                                <p className="text-xl font-black text-gray-900 dark:text-white italic tracking-tighter">{formatPrice(item.price * item.qty)}</p>
                             </div>
                          ))}
                       </div>
                       
                       <div className="p-8 bg-brand-600/5 border-2 border-dashed border-brand-600/30 rounded-[2.5rem]">
                          <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mb-2 italic underline underline-offset-4">Legal Consent Vector</p>
                          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 leading-relaxed italic">By initializing this sequence, you confirm the transfer of credits and data encryption standards as per the ShopSphere Protocol. All sales on digital drops are absolute.</p>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t-2 border-gray-50 dark:border-dark-border">
                   {currentStep > 0 && (
                     <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="flex-1 py-5 bg-white dark:bg-dark-900 border-2 border-gray-100 dark:border-dark-border text-gray-900 dark:text-white font-black rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest text-xs italic">← Previous Stage</button>
                   )}
                   <button 
                     type="submit" 
                     disabled={isProcessing}
                     className="flex-[2] py-5 bg-brand-600 text-white font-black rounded-2xl shadow-glow-md hover:shadow-glow-lg transition-all active:scale-95 flex items-center justify-center gap-4 group"
                   >
                     {isProcessing ? (
                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                     ) : (
                       <>
                          <span className="text-sm uppercase tracking-widest">{currentStep < STEPS.length - 1 ? 'PROCEED TO NEXT STAGE' : 'FINALIZE TRANSACTION ✦'}</span>
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                       </>
                     )}
                   </button>
                </div>
             </form>

             {/* Dynamic Summary */}
             <div className="hidden lg:block space-y-8 sticky top-32">
                <div className="p-8 bg-gray-900 text-white rounded-[2.5rem] shadow-xl border border-white/5 relative overflow-hidden">
                   <div className="absolute top-10 right-10 w-32 h-32 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
                   <h3 className="text-xl font-black italic tracking-tighter mb-8 relative z-10">ORDER PARAMS.</h3>
                   <div className="space-y-4 relative z-10">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                         <span>Units Subtotal</span>
                         <span className="text-white italic">{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                         <span>Logistics Fee</span>
                         <span className={shipping === 0 ? 'text-brand-500' : 'text-white italic'}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 pb-4 border-b border-white/5">
                         <span>Revision Tax</span>
                         <span className="text-white italic">{formatPrice(tax)}</span>
                      </div>
                      <div className="flex justify-between items-end pt-4">
                         <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-600 italic">Total Value</span>
                         <span className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{formatPrice(grandTotal)}</span>
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-gray-50 dark:bg-dark-800/50 rounded-[2.5rem] border-2 border-transparent hover:border-brand-600/10 transition-all group">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-brand-600/10 rounded-xl flex items-center justify-center text-brand-600">
                         <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white italic">QUANTUM SECURITY</p>
                   </div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">YOUR TRANSACTION GEOMETRY IS ENCRYPTED WITH AES-256 BIT STANDARDS. DATA REPUTATION: EXCELLENT.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
