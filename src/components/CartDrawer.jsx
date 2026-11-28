import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalAmount,
    isCartOpen,
    setIsCartOpen,
    checkoutWhatsApp
  } = useCart();
  const { addOrder } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');

  if (!isCartOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Veuillez renseigner votre nom, numéro WhatsApp et votre adresse de livraison.');
      return;
    }
    // Enregistrement dans le Store / Base de données Admin
    addOrder({
      customerName,
      whatsappNumber: customerPhone,
      deliveryAddress: customerAddress,
      items: items.map((i) => ({ name: i.name, size: i.size, price: i.price, quantity: i.quantity })),
      totalAmount,
      notes
    });

    checkoutWhatsApp({
      customerName,
      customerPhone,
      customerAddress,
      notes
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(2px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCartOpen(false);
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          borderLeft: '2px solid #000000',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
        }}
      >
        {/* Header Drawer */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid #000000',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#000000',
            color: '#FFFFFF'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={18} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              VOTRE PANIER ({items.length})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.2rem'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#666666' }}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                Votre panier est vide.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="btn-stylist-outline"
                style={{ marginTop: '1.5rem' }}
              >
                Découvrir la collection
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingBottom: '1.2rem',
                    borderBottom: '1px solid #E5E5E5'
                  }}
                >
                  {/* Photo produit avec bord droit strict */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '100px',
                      objectFit: 'cover',
                      border: '1px solid #000000'
                    }}
                  />

                  {/* Infos */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.15rem',
                          fontWeight: 600,
                          lineHeight: 1.2
                        }}
                      >
                        {item.name}
                      </h4>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: '#666666',
                          fontFamily: 'var(--font-mono)',
                          marginTop: '0.2rem'
                        }}
                      >
                        Taille : <strong>{item.size}</strong>
                      </div>
                      <div
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          fontFamily: 'var(--font-mono)',
                          marginTop: '0.3rem'
                        }}
                      >
                        {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                      </div>
                    </div>

                    {/* Compteur quantité & suppression */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #000000' }}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          style={{
                            padding: '0.25rem 0.6rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, padding: '0 0.4rem', fontFamily: 'var(--font-mono)' }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          style={{
                            padding: '0.25rem 0.6rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.size)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#888888',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Form (WhatsApp Commerce) */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid #000000',
              backgroundColor: '#F8F8F8'
            }}
          >
            {/* Total */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '1.2rem',
                paddingBottom: '0.8rem',
                borderBottom: '1px solid #E5E5E5'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                TOTAL ESTIMÉ
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700 }}>
                {totalAmount.toLocaleString('fr-FR')} FCFA
              </span>
            </div>

            {/* Formulaire Express */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <input
                type="text"
                placeholder="Votre Nom & Prénom *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="input-stylist"
                required
                style={{ padding: '0.8rem', fontSize: '0.85rem' }}
              />
              <input
                type="tel"
                placeholder="Numéro WhatsApp *"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="input-stylist"
                required
                style={{ padding: '0.8rem', fontSize: '0.85rem' }}
              />
              <input
                type="text"
                placeholder="Quartier ou Ville de livraison à Cotonou *"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="input-stylist"
                required
                style={{ padding: '0.8rem', fontSize: '0.85rem' }}
              />

              <button
                type="submit"
                className="btn-stylist-dark"
                style={{
                  width: '100%',
                  marginTop: '0.4rem',
                  padding: '1rem'
                }}
              >
                <Send size={15} />
                <span>COMMANDER SUR WHATSAPP</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
