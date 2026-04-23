export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

export const calcDiscount = (original, current) =>
  original ? Math.round(((original - current) / original) * 100) : 0;

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export const debounce = (fn, ms = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

export const truncate = (str, n = 60) =>
  str.length > n ? str.slice(0, n) + '…' : str;

export const generateOrderId = () =>
  'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase();
