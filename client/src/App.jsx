import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastNotification } from './components/ToastNotification';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Wishlist } from './pages/Wishlist';
import { Checkout } from './pages/Checkout';
import { TrackOrder } from './pages/TrackOrder';
import { Account } from './pages/Account';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C1810] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#2C1810]">
            <Navbar />
            <CartDrawer />
            <QuickViewModal />
            <ToastNotification />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </ShopProvider>
    </AuthProvider>
  );
}
