import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function Lookbook() {
  const { realisations } = useStore();
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [activeImage, setActiveImage] = useState(null);

  const categories = [
    { id: 'ALL', label: 'Toutes les créations' },
    { id: 'TAILORING', label: 'Tailoring & Vestes' },
    { id: 'COUTURE', label: 'Haute Couture' },
    { id: 'CEREMONIE', label: 'Cérémonie Sur-Mesure' },
    { id: 'STREETWEAR', label: 'Streetwear Éditorial' }
  ];

  const allItems = useMemo(() => {
    const customItems = (realisations || []).map((r) => {
      let cat = 'COUTURE';
      const c = (r.category || '').toUpperCase();
      if (c.includes('TAILOR') || c.includes('VESTE')) cat = 'TAILORING';
      else if (c.includes('CEREMONIE') || c.includes('CÉRÉMONIE')) cat = 'CEREMONIE';
      else if (c.includes('STREET') || c.includes('FLOC')) cat = 'STREETWEAR';

      return {
        id: r.id,
        title: r.title,
        category: cat,
        tag: r.category || 'Atelier',
        image: r.image,
        description: r.desc || r.description || 'Création unique confectionnée sur-mesure dans notre atelier AllFashion.',
        badge: r.badge || 'Créateur'
      };
    });

    return [...customItems, ...LOOKBOOK_ITEMS];
  }, [realisations]);

  const filteredItems = selectedCat === 'ALL'
    ? allItems
    : allItems.filter((item) => item.category === selectedCat);

  // Navigation clavier pour la visionneuse (Echap pour fermer, Flèches Gauche/Droite)
  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredItems.findIndex((item) => item.id === activeImage.id);
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setActiveImage(filteredItems[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredItems.findIndex((item) => item.id === activeImage.id);
        const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setActiveImage(filteredItems[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, filteredItems]);

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '0', color: '#000000', width: '100%' }}>
      
      {/* Header sobre Galerie */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #EAEAEA', padding: 'clamp(2.5rem, 4vw, 3.5rem) 2rem 2rem' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.6rem' }}>
            PORTFOLIO & DÉFILÉS
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', lineHeight: 1.1, marginBottom: '0.8rem' }}>
            Galerie
          </h1>
          <p style={{ color: '#555555', fontSize: '1rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Exploration visuelle de nos silhouettes créateur, pièces de gala et réalisations d’atelier.
          </p>

          {/* Filtres Catégories */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCat(c.id)}
                style={{
                  padding: '0.55rem 1.1rem',
                  border: '1px solid #000000',
                  backgroundColor: selectedCat === c.id ? '#000000' : '#FFFFFF',
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
        </div>
      </section>

      {/* =========================================================================
          GRILLE PLEINE PAGE MASONRY : FOND BLANC & TAILLES D'IMAGES VARIÉES
          3 COLONNES SUR DESKTOP, PLEINE LARGEUR, SANS MARGE EXTÉRIEURE
          ========================================================================= */}
      <section style={{ width: '100%', margin: 0, padding: '0 0.5rem', backgroundColor: '#FFFFFF' }}>
        <div className="gallery-masonry-wrapper">
          <div className="gallery-masonry-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="gallery-masonry-card"
                onClick={() => setActiveImage(item)}
                style={{
                  height: item.height || '500px',
                  backgroundColor: '#F7F7F7'
                }}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 100}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Overlay discret au survol */}
                <div className="gallery-masonry-overlay">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E0E0E0' }}>
                    {item.categoryLabel}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: '#FFFFFF', marginTop: '0.3rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#CCCCCC', fontSize: '0.85rem', marginTop: '0.3rem', lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFFFFF' }}>
                    <Maximize2 size={13} />
                    <span>Agrandir</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bannière sur-mesure sobre sous la galerie */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '6rem 2rem', textAlign: 'center', borderTop: '1px solid #E5E5E5' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>
            Une création vous inspire ?
          </h2>
          <p style={{ color: '#555555', fontSize: '1rem', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Le créateur conçoit une pièce adaptée à votre morphologie exacte et à votre événement.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <Link to="/sur-mesure" className="btn-stylist-dark">
              PRENDRE RENDEZ-VOUS SUR-MESURE
            </Link>
            <Link to="/contact" className="btn-stylist-outline">
              CONTACTER LE STYLISTE
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VISIONNEUSE PLEIN ÉCRAN (LIGHTBOX)
          LA PHOTO S'AFFICHE ENTIÈREMENT SANS AUCUNE DÉCOUPE NI ROGNAGE
          ========================================================================= */}
      {activeImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setActiveImage(null)}
        >
          {/* Bouton Fermer styliste */}
          <button
            onClick={() => setActiveImage(null)}
            style={{
              position: 'fixed',
              top: '1.2rem',
              right: '1.5rem',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              border: '1px solid #000000',
              padding: '0.6rem 1.1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              zIndex: 10002
            }}
          >
            <span>Fermer</span>
            <X size={15} />
          </button>

          {/* Navigation Précédente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = filteredItems.findIndex((item) => item.id === activeImage.id);
              const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
              setActiveImage(filteredItems[prevIndex]);
            }}
            style={{
              position: 'fixed',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              color: '#000000',
              border: 'none',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10002
            }}
            title="Précédent (Flèche Gauche)"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Navigation Suivante */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = filteredItems.findIndex((item) => item.id === activeImage.id);
              const nextIndex = (currentIndex + 1) % filteredItems.length;
              setActiveImage(filteredItems[nextIndex]);
            }}
            style={{
              position: 'fixed',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              color: '#000000',
              border: 'none',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10002
            }}
            title="Suivant (Flèche Droite)"
          >
            <ChevronRight size={24} />
          </button>

          {/* Conteneur principal : Photo 100% Entière sans rognage */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '92vw',
              maxHeight: '92vh',
              margin: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.image}
              alt={activeImage.title}
              style={{
                maxWidth: '92vw',
                maxHeight: '76vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)'
              }}
            />

            {/* Détails du modèle */}
            <div style={{
              marginTop: '1.2rem',
              textAlign: 'center',
              color: '#FFFFFF',
              maxWidth: '680px',
              padding: '0.2rem 1rem'
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#AAAAAA',
                display: 'block',
                marginBottom: '0.25rem'
              }}>
                {activeImage.categoryLabel}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                color: '#FFFFFF',
                fontWeight: 600,
                margin: 0
              }}>
                {activeImage.title}
              </h3>
              <p style={{
                color: '#CCCCCC',
                fontSize: '0.85rem',
                marginTop: '0.35rem',
                marginBottom: 0,
                lineHeight: 1.45
              }}>
                {activeImage.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
