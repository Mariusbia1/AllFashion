import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Send, ShieldCheck, Check, Truck } from 'lucide-react';
import { PRODUCTS, STYLIST_WHATSAPP_NUMBER } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(product.images ? product.images[0] : '/assets/img/creation-1.jpg');
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Sur-Mesure');
  const [quantity, setQuantity] = useState(1);

  // Commande directe d'un seul article sur WhatsApp (conforme cahier des charges)
  const handleDirectWhatsAppOrder = () => {
    let msg = `*COMMANDE DIRECTE — ${product.name}*\n`;
    msg += `-----------------------------------\n`;
    msg += `Article : ${product.name}\n`;
    msg += `Taille souhaitée : ${selectedSize}\n`;
    msg += `Quantité : ${quantity}\n`;
    msg += `Prix unitaire : ${product.priceFormatted}\n`;
    msg += `-----------------------------------\n`;
    msg += `Total estimé : ${(product.price * quantity).toLocaleString('fr-FR')} FCFA\n\n`;
    msg += `Bonjour, je souhaite commander cette pièce directement avec vous. Pouvez-vous me confirmer la disponibilité et les modalités de livraison ?`;

    window.open(`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const similarProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '7rem' }}>
      
      {/* Navigation fil d'ariane */}
      <div className="editorial-container" style={{ paddingTop: '2rem', paddingBottom: '1.5rem' }}>
        <Link
          to="/boutique"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#000000',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase'
          }}
        >
          <ArrowLeft size={14} />
          <span>Retour à la Boutique</span>
        </Link>
      </div>

      {/* Détail Produit Layout 2 Colonnes */}
      <div className="editorial-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Colonne Gauche : Galerie Photos */}
          <div>
            <div style={{
              aspectRatio: '3/4',
              backgroundColor: '#000000',
              border: '1px solid #000000',
              overflow: 'hidden',
              marginBottom: '1rem'
            }}>
              <img
                src={selectedImage}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)'
                }}
              />
            </div>

            {/* Vignettes miniatures */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '70px',
                      height: '90px',
                      padding: 0,
                      border: selectedImage === img ? '2px solid #000000' : '1px solid #CCCCCC',
                      backgroundColor: '#FFFFFF',
                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={img}
                      alt={`Vue ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne Droite : Fiche Technique & Achat */}
          <div>
            <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.5rem' }}>
              {product.categoryLabel}
            </span>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', lineHeight: 1.1, marginBottom: '1rem' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 700 }}>
                {product.priceFormatted}
              </span>
              {product.oldPrice && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', textDecoration: 'line-through', color: '#888888' }}>
                  {product.oldPrice}
                </span>
              )}
            </div>

            <p style={{ color: '#444444', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              {product.description}
            </p>

            {/* Sélecteur de Taille */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 600 }}>
                  Sélectionnez votre taille :
                </span>
                <Link to="/sur-mesure" style={{ fontSize: '0.75rem', color: '#000000', textDecoration: 'underline' }}>
                  Guide & Prise de mesure à domicile
                </Link>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {product.sizes && product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: '0.7rem 1.4rem',
                      border: selectedSize === s ? '2px solid #000000' : '1px solid #CCCCCC',
                      backgroundColor: selectedSize === s ? '#000000' : '#FFFFFF',
                      color: selectedSize === s ? '#FFFFFF' : '#000000',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantité & 2 Modes d'achat */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {/* Compteur */}
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #000000' }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>

                {/* Bouton Ajouter au Panier */}
                <button
                  type="button"
                  onClick={() => addItem(product, selectedSize, quantity)}
                  className="btn-stylist-outline"
                  style={{ flex: 1, padding: '1rem' }}
                >
                  <ShoppingBag size={16} />
                  <span>AJOUTER AU PANIER</span>
                </button>
              </div>

              {/* Bouton Commander Directement sur WhatsApp */}
              <button
                type="button"
                onClick={handleDirectWhatsAppOrder}
                className="btn-stylist-dark"
                style={{ width: '100%', padding: '1rem' }}
              >
                <Send size={16} />
                <span>COMMANDER DIRECTEMENT SUR WHATSAPP</span>
              </button>
            </div>

            {/* Caractéristiques détaillées */}
            <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '2rem' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                Détails de Confection & Finitions
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {product.details && product.details.map((d, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#555555' }}>
                    <Check size={14} color="#000000" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Produits Recommandés */}
        <div style={{ marginTop: '7rem', borderTop: '1px solid #E5E5E5', paddingTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
              COMPLÉTER LA SILHOUETTE
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem' }}>
              Créations Similaires
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
