import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from './store/themeStore';
import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WishlistPage from './pages/WishlistPage';

export default function App() {
  const init = useThemeStore(s => s.init);
  useEffect(() => { init(); }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages — no main layout */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Main layout routes */}
        <Route path="/" element={
          <MainLayout><HomePage /></MainLayout>
        } />
        <Route path="/shop" element={
          <MainLayout><ShopPage /></MainLayout>
        } />
        <Route path="/product/:id" element={
          <MainLayout><ProductDetailPage /></MainLayout>
        } />
        <Route path="/cart" element={
          <MainLayout><CartPage /></MainLayout>
        } />
        <Route path="/checkout" element={
          <MainLayout><CheckoutPage /></MainLayout>
        } />
        <Route path="/wishlist" element={
          <MainLayout><WishlistPage /></MainLayout>
        } />

        {/* 404 fallback */}
        <Route path="*" element={
          <MainLayout>
            <div className="page-container py-24 text-center">
              <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-4">404</h1>
              <p className="text-gray-500 text-lg mb-8">Page not found</p>
              <a href="/" className="btn-primary px-8 py-3 text-base">Go Home</a>
            </div>
          </MainLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}
