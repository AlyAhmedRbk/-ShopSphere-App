# ShopSphere 🛍️

A production-ready, modern SaaS-style e-commerce frontend built with **React + Vite + Tailwind CSS**.

![ShopSphere](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop)

## ✨ Features

- 🛍️ **Product Listing** — Grid layout with hover animations, badges, and quick-add
- 🔍 **Filters & Search** — Real-time filter by category, price range, and search term
- 📦 **Product Detail** — Image gallery, qty selector, wishlist, related products
- 🛒 **Cart System** — Add/remove/update qty, persisted via localStorage
- 💳 **Multi-step Checkout** — Shipping → Payment → Review → Success screen
- 🔐 **Auth UI** — Login / Register with mock authentication
- 💝 **Wishlist** — Save and move items to cart
- 🌓 **Dark Mode** — Full dark/light theme toggle
- 💀 **Loading Skeletons** — Shimmer placeholders for all async states
- 🔔 **Toast Notifications** — Cart, wishlist, and error feedback
- 📱 **Fully Responsive** — Mobile-first design

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM v6 |
| State | Zustand (with `persist` middleware) |
| Animations | Framer Motion |
| Notifications | react-hot-toast |
| Data | Mock service layer (swap for real API) |

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── ProductSkeleton.jsx
│   ├── FilterSidebar.jsx
│   └── StarRating.jsx
├── pages/            # Route-based pages
│   ├── HomePage.jsx
│   ├── ShopPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── WishlistPage.jsx
├── layouts/          # Layout wrappers
│   └── MainLayout.jsx
├── store/            # Zustand stores
│   ├── cartStore.js
│   ├── wishlistStore.js
│   ├── authStore.js
│   └── themeStore.js
├── services/         # API abstraction layer
│   ├── mockData.js
│   └── productService.js
└── utils/            # Helper functions
    ├── helpers.js
    └── useAsyncFilter.js
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker Deployment

```bash
# Build image
docker build -t shopsphere .

# Run container
docker run -p 8080:80 shopsphere

# Visit http://localhost:8080
```

## 🔐 Demo Credentials

| Field | Value |
|-------|-------|
| Email | `alex@demo.com` |
| Password | `demo1234` |

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_APP_NAME=ShopSphere
VITE_API_BASE_URL=https://fakestoreapi.com
VITE_ENABLE_ANALYTICS=false
```

All Right Reserved

## 🔄 Swapping Mock Data for a Real API

All API calls are centralized in `src/services/productService.js`. Replace the mock implementations with real `axios` calls pointing to your backend.
