import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { CartProvider } from './context/CartContext';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Bespoke from './pages/Bespoke';
import Flocking from './pages/Flocking';
import Lookbook from './pages/Lookbook';
import Atelier from './pages/Atelier';
import Contact from './pages/Contact';

function ScrollHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Rafraîchir AOS lors de chaque changement de page
    AOS.refresh();
  }, [pathname]);

  return null;
}

function MainLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* Navigation principale */}
      <Navbar />

      {/* Tiroir Panier WhatsApp latéral */}
      <CartDrawer />

      {/* Assistant WhatsApp flottant monochrome */}
      <FloatingWhatsApp />

      {/* Pages du site */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boutique" element={<Shop />} />
          <Route path="/produit/:slug" element={<ProductDetail />} />
          <Route path="/sur-mesure" element={<Bespoke />} />
          <Route path="/flocage" element={<Flocking />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/atelier" element={<Atelier />} />
          <Route path="/a-propos" element={<Atelier />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Pied de page éditorial */}
      <Footer />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    // Initialisation d'AOS avec transitions douces et sobres
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }, []);

  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollHandler />
        <MainLayout />
      </CartProvider>
    </BrowserRouter>
  );
}
