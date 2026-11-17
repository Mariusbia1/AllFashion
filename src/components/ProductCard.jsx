import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const mainImage = product.images && product.images[0] ? product.images[0] : '/assets/img/creation-1.jpg';
  const hoverImage = product.images && product.images[1] ? product.images[1] : mainImage;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E5E5',
        transition: 'border-color 0.25s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#000000'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E5E5'}
    >
      {/* Conteneur Image avec proportions élégantes 3:4 */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          backgroundColor: '#F5F5F5'
        }}
      >
        {/* Badge supérieur */}
        {product.badge && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 5
            }}
          >
            <span className="badge-minimal-dark">{product.badge}</span>
          </div>
        )}

        {/* Image avec zoom subtil au survol */}
        <Link to={`/produit/${product.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img
            src={mainImage}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Link>
      </div>

      {/* Informations Produit (Inspiré fidèlement de la maquette DBY) */}
      <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#888888',
              display: 'block',
              marginBottom: '0.3rem'
            }}
          >
            {product.categoryLabel || 'Collection Atelier'}
          </span>

          <Link
            to={`/produit/${product.slug}`}
            style={{
              textDecoration: 'none',
              color: '#000000'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.25,
                marginBottom: '0.5rem'
              }}
            >
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Prix et Action */}
        <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#000000'
              }}
            >
              {product.priceFormatted}
            </span>
            {product.oldPrice && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  textDecoration: 'line-through',
                  color: '#999999',
                  marginLeft: '0.5rem'
                }}
              >
                {product.oldPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addItem(product, product.sizes ? product.sizes[0] : 'Sur-Mesure')}
            className="btn-stylist-outline"
            style={{
              padding: '0.45rem 0.8rem',
              fontSize: '0.68rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            title="Ajouter au panier"
          >
            <ShoppingBag size={13} />
            <span>AJOUTER</span>
          </button>
        </div>
      </div>
    </div>
  );
}
