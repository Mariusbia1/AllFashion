import React, { createContext, useContext, useState, useEffect } from 'react';
import { STYLIST_WHATSAPP_NUMBER } from '../data/products';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('stylist_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('stylist_cart_items', JSON.stringify(items));
    } catch (e) {
      console.error('Erreur sauvegarde panier local:', e);
    }
  }, [items]);

  const addItem = (product, size = 'M', quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id && i.size === size);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += quantity;
        return copy;
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          priceFormatted: product.priceFormatted,
          image: product.images ? product.images[0] : '/assets/img/creation-1.jpg',
          size,
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, quantity } : i))
    );
  };

  const removeItem = (id, size) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Génération du flux de commande WhatsApp conforme au cahier des charges
  const checkoutWhatsApp = ({ customerName, customerPhone, customerAddress, notes }) => {
    if (items.length === 0) return;

    // Simulation de la référence de commande qui sera générée par Laravel (ex: CMD-2026-XXXX)
    const orderRef = `CMD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let msg = `*NOUVELLE COMMANDE — ALLFASHION*\n`;
    msg += `Référence : ${orderRef}\n`;
    msg += `-----------------------------------\n`;
    msg += `Client : ${customerName}\n`;
    msg += `Téléphone : ${customerPhone}\n`;
    msg += `Livraison / Retrait : ${customerAddress}\n`;
    if (notes && notes.trim()) {
      msg += `Remarques : ${notes.trim()}\n`;
    }
    msg += `-----------------------------------\n`;
    msg += `ARTICLES COMMANDÉS :\n`;
    items.forEach((item) => {
      const lineTotal = (item.price * item.quantity).toLocaleString('fr-FR');
      msg += `• ${item.quantity}x ${item.name} (Taille : ${item.size}) — ${lineTotal} FCFA\n`;
    });
    msg += `-----------------------------------\n`;
    msg += `*TOTAL ESTIMÉ : ${totalAmount.toLocaleString('fr-FR')} FCFA*\n\n`;
    msg += `Bonjour, je souhaite finaliser ma commande et convenir avec vous des modalités de livraison.`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encoded}`;

    window.open(waUrl, '_blank');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalAmount,
        totalCount,
        isCartOpen,
        setIsCartOpen,
        checkoutWhatsApp
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
