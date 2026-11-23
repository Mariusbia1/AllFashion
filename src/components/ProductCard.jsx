import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const mainImage = product.images && product.images[0] ? product.images[0] : '/assets/img/creation-1.jpg';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        border: 'none',
        padding: '0'
      }}
    >
      {/* Conteneur Image net, sans flou, sans voile blanc, sans bordure */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          backgroundColor: '#F5F5F5',
          border: 'none'
        }}
      >
        {/* Badge supérieur discret */}
        {product.badge && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 5
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '0.35rem 0.65rem',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid #000000',
                display: 'inline-block',
                fontWeight: 600
              }}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Image 100% nette */}
        <Link to={`/produit/${product.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'none',
              opacity: 1,
              transition: 'transform 0.4s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Link>
      </div>

      {/* Informations Produit : Nom, Catégorie, Prix, Bouton texte pur sans icône */}
      <div style={{ paddingTop: '1.2rem', paddingBottom: '0.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.8rem' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#888888',
                display: 'block',
                marginBottom: '0.3rem'
              }}
            >
              {product.categoryLabel || 'Atelier'}
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
                  fontSize: 'clamp(1.2rem, 2vw, 1.45rem)',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  marginBottom: '0.4rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {product.name}
              </h3>
            </Link>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.05rem',
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
                    fontSize: '0.8rem',
                    textDecoration: 'line-through',
                    color: '#999999'
                  }}
                >
                  {product.oldPrice}
                </span>
              )}
            </div>
          </div>

          {/* Bouton Panier SANS ICÔNE : gain de place maximal */}
          <button
            type="button"
            onClick={() => addItem(product, product.sizes ? product.sizes[0] : 'Sur-Mesure')}
            className="btn-stylist-outline"
            style={{
              padding: '0.55rem 0.9rem',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
            title="Ajouter au panier"
          >
            AJOUTER
          </button>
        </div>
      </div>
    </div>
  );
}
