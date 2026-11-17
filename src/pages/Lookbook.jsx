import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Maximize2, X, ArrowRight } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/products';

export default function Lookbook() {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [activeImage, setActiveImage] = useState(null);

  const categories = [
    { id: 'ALL', label: 'Toutes les silhouettes' },
    { id: 'TAILORING', label: 'Tailoring & Vestes' },
    { id: 'COUTURE', label: 'Haute Couture' },
    { id: 'CEREMONIE', label: 'Cérémonie Sur-Mesure' },
    { id: 'STREETWEAR', label: 'Streetwear Éditorial' }
  ];

  const filteredItems = selectedCat === 'ALL'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter((item) => item.category === selectedCat);

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '7rem' }}>
      
      {/* Header Lookbook */}
      <section style={{ backgroundColor: '#F8F8F8', borderBottom: '1px solid #E5E5E5', padding: '5rem 0' }}>
        <div className="editorial-container">
          <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.6rem' }}>
            PORTFOLIO & DÉFILÉS
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.4rem', lineHeight: 1.1, marginBottom: '1rem' }}>
            Galerie Lookbook
          </h1>
          <p style={{ color: '#555555', fontSize: '1rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Exploration photographique de nos silhouettes créateur, pièces de gala et réalisations d’atelier.
          </p>
        </div>
      </section>

      {/* Filtres Catégories */}
      <div className="editorial-container" style={{ marginTop: '3rem', marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCat(c.id)}
              style={{
                padding: '0.6rem 1.2rem',
                border: '1px solid #000000',
                backgroundColor: selectedCat === c.id ? '#000000' : 'transparent',
                color: selectedCat === c.id ? '#FFFFFF' : '#000000',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: selectedCat === c.id ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grille Lookbook (Format 3 colonnes strict avec bordures droites) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginTop: '3.5rem'
        }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              style={{
                border: '1px solid #000000',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                transition: 'transform 0.25s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#000000' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              <div style={{ padding: '1.4rem', borderTop: '1px solid #000000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888888', display: 'block' }}>
                    {item.categoryLabel}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, marginTop: '0.2rem' }}>
                    {item.title}
                  </h3>
                </div>

                <div style={{ border: '1px solid #000000', padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <Maximize2 size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bannière d'inspiration sur-mesure */}
        <div style={{
          marginTop: '6rem',
          backgroundColor: '#000000',
          color: '#FFFFFF',
          padding: '4rem 2rem',
          textAlign: 'center',
          border: '2px solid #000000'
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '1rem', color: '#FFFFFF' }}>
            Une création vous inspire ?
          </h2>
          <p style={{ color: '#AAAAAA', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Le créateur conçoit une pièce adaptée à votre morphologie exacte et à votre événement.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/sur-mesure" className="btn-stylist-inverse">
              PRENDRE RENDEZ-VOUS SUR-MESURE
            </Link>
            <Link to="/contact" className="btn-stylist-outline" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>
              CONTACTER LE STYLISTE
            </Link>
          </div>
        </div>
      </div>

      {/* Visionneuse Plein Écran (Lightbox monochrome) */}
      {activeImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.92)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={() => setActiveImage(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '800px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              border: '2px solid #000000'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#000000',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.4rem',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <div style={{ maxHeight: '75vh', overflow: 'hidden', backgroundColor: '#000000' }}>
              <img
                src={activeImage.image}
                alt={activeImage.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'grayscale(100%)' }}
              />
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid #000000' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888888', textTransform: 'uppercase' }}>
                {activeImage.categoryLabel}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginTop: '0.3rem' }}>
                {activeImage.title}
              </h3>
              <p style={{ color: '#666666', fontSize: '0.85rem', marginTop: '0.4rem' }}>
                {activeImage.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
