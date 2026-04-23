import { products } from './mockData';

// Simulate network latency
const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export const productService = {
  async getAll({ category = 'All', search = '', minPrice = 0, maxPrice = 9999, sortBy = 'default' } = {}) {
    await delay(600);
    let result = [...products];

    if (category && category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

    if (sortBy === 'price-asc')  result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating')     result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'name')       result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  },

  async getById(id) {
    await delay(400);
    const product = products.find(p => p.id === Number(id));
    if (!product) throw new Error('Product not found');
    return product;
  },

  async getFeatured() {
    await delay(300);
    return products.filter(p => p.badge).slice(0, 4);
  },

  async getRelated(id, category) {
    await delay(300);
    return products.filter(p => p.category === category && p.id !== Number(id)).slice(0, 4);
  },
};
