import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Sparkles, ShoppingBag, ShieldCheck, Clock, Award, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, LOOKBOOK_ITEMS, TESTIMONIALS, STYLIST_WHATSAPP_NUMBER } from '../data/products';

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeLookIndex, setActiveLookIndex] = useState(0);

  // Filtrage Trending Now
  const trendingProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === 'NEW') return p.isNew;
    if (selectedFilter === 'BEST') return p.isBestSeller;
    if (selectedFilter === 'SUR_MESURE') return p.category === 'SUR_MESURE';
    return true;
  });

  const currentLook = LOOKBOOK_ITEMS[activeLookIndex] || LOOKBOOK_ITEMS[0];

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      
      {/* =========================================================================
          1. HERO HEADER ÉDITORIAL (Repris fidèlement de la maquette "Discover Timeless Fashion")
          ========================================================================= */}
      <section style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}>
        {/* Image de fond en arrière-plan avec voile noir éditorial */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/assets/img/creation-1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 25%',
          opacity: 0.42,
          filter: 'grayscale(100%)' // Noir et blanc absolu
        }} />

        <div className="editorial-container" style={{ position: 'relative', zIndex: 10, width: '100%', paddingBottom: '3rem', paddingTop: '3rem' }}>
          <div style={{ maxWidth: '820px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#CCCCCC',
              display: 'block',
              marginBottom: '1rem'
            }}>
              COLLECTION CAPSULE & SUR-MESURE — 2026
            </span>

            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3.2rem, 7vw, 5.8rem)',
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              color: '#FFFFFF'
            }}>
              L’Élégance de Coupe.<br />
              Sculptée Pour Vous.
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: '#CCCCCC',
              maxWidth: '560px',
              lineHeight: 1.6,
              marginBottom: '2.5rem'
            }}>
              Créations de prêt-à-porter numérotées, confection sur-mesure avec déplacement direct à domicile à Cotonou, et studio de personnalisation textile.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/boutique" className="btn-stylist-inverse">
                <span>DÉCOUVRIR LA BOUTIQUE</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/sur-mesure" className="btn-stylist-outline" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>
                <span>PRENDRE RENDEZ-VOUS SUR-MESURE</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Indicateur de défilement discret en bas */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#888888',
          zIndex: 10
        }}>
          SCROLL
        </div>
      </section>

      {/* =========================================================================
          2. SHOP BY CATEGORY (Repris de la maquette "Shop by Category")
          ========================================================================= */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
                EXPLORER
              </span>
              <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)' }}>
                Catégories & Univers
              </h2>
            </div>

            <Link to="/boutique" className="link-editorial">
              <span>Voir tout le catalogue</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Grille des catégories avec vraies images noir & blanc */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.2rem'
          }}>
            {CATEGORIES.slice(1).map((cat) => (
              <Link
                key={cat.id}
                to={`/boutique?category=${cat.id}`}
                style={{
                  textDecoration: 'none',
                  color: '#000000',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #E5E5E5',
                  backgroundColor: '#FFFFFF',
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#000000'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E5E5'}
              >
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#000000' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(100%)',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '1rem', borderTop: '1px solid #E5E5E5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600 }}>{cat.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#888888' }}>{cat.count} pièces</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. NOUVELLES ARRIVÉES (New Arrivals)
          ========================================================================= */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8F8F8', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
                DERNIÈRES CRÉATIONS
              </span>
              <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)' }}>
                Nouvelles Éditions
              </h2>
            </div>
            <Link to="/boutique" className="link-editorial">
              <span>Voir tout</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.8rem'
          }}>
            {PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. BANNIÈRE PROMOTIONNELLE & ATELIER (Inspiré de "Summer Collection 2026")
          ========================================================================= */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid #000000' }}>
        <div className="editorial-container">
          <div style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            border: '2px solid #000000'
          }}>
            {/* Image éditoriale atelier */}
            <div style={{ position: 'relative', minHeight: '380px' }}>
              <img
                src="/assets/img/creation-3.jpg"
                alt="Atelier de Confection"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)'
                }}
              />
            </div>

            {/* Texte et appel à l'action */}
            <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#888888',
                marginBottom: '1rem',
                display: 'block'
              }}>
                SUR-MESURE & DÉPLACEMENT PRIVÉ
              </span>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.8rem',
                lineHeight: 1.1,
                marginBottom: '1.2rem',
                color: '#FFFFFF'
              }}>
                La Prise de Mesure à Domicile.
              </h2>

              <p style={{
                color: '#AAAAAA',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}>
                Le styliste apporte ses nuanciers d’étoffes nobles et prend l’ensemble de vos mensurations directement chez vous ou à votre bureau. Confection artisanale et essayages garantis.
              </p>

              <div>
                <Link to="/sur-mesure" className="btn-stylist-inverse">
                  RÉSERVER VOTRE CRÉNEAU
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. TRENDING NOW AVEC FILTRES (Inspiré de "Trending Now" de la maquette)
          ========================================================================= */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.5rem' }}>
              SÉLECTION EXCLUSIVE
            </span>
            <h2 style={{ fontSize: '2.6rem', fontFamily: 'var(--font-serif)' }}>
              Pièces Phares
            </h2>

            {/* Onglets filtres stricts sans arrondis */}
            <div style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1.8rem',
              border: '1px solid #000000',
              padding: '0.3rem'
            }}>
              {[
                { id: 'ALL', label: 'Toutes les pièces' },
                { id: 'NEW', label: 'Nouveautés' },
                { id: 'BEST', label: 'Bestsellers' },
                { id: 'SUR_MESURE', label: 'Sur-Mesure' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  style={{
                    padding: '0.55rem 1.2rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: selectedFilter === tab.id ? 700 : 500,
                    backgroundColor: selectedFilter === tab.id ? '#000000' : 'transparent',
                    color: selectedFilter === tab.id ? '#FFFFFF' : '#000000',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.8rem'
          }}>
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. EDITORIAL LOOKBOOK AVEC HOTSPOTS (Directement inspiré de "The Spring Lookbook")
          ========================================================================= */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8F8F8', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            {/* Colonne Gauche : Image Lookbook avec Points Interactifs */}
            <div style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: '#000000', border: '1px solid #000000' }}>
              <img
                src={currentLook.image}
                alt={currentLook.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)'
                }}
              />

              {/* Hotspots cliquables sur la silhouette */}
              {currentLook.dots && currentLook.dots.map((dot) => (
                <div
                  key={dot.id}
                  className="lookbook-hotspot"
                  style={{ top: `${dot.y}%`, left: `${dot.x}%` }}
                  title={`${dot.title} — ${dot.price}`}
                />
              ))}
            </div>

            {/* Colonne Droite : Explication du Look et détails des pièces */}
            <div>
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.6rem' }}>
                ÉDITORIAL & DÉFILÉS
              </span>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', lineHeight: 1.1, marginBottom: '1.2rem' }}>
                Le Lookbook de l’Atelier.
              </h2>

              <p style={{ color: '#555555', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                Chaque création s’articule dans une composition étudiée où tombé de tissu et coupe nette dialoguent avec la silhouette.
              </p>

              {/* Liste des pièces du Look (comme dans la maquette DBY) */}
              <div style={{ borderTop: '1px solid #CCCCCC', marginBottom: '2.5rem' }}>
                {currentLook.dots && currentLook.dots.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.2rem 0',
                      borderBottom: '1px solid #E5E5E5'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{item.title}</span>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#888888', fontFamily: 'var(--font-mono)' }}>
                        Confection artisanale sur-mesure
                      </span>
                    </div>

                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700 }}>
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sélecteur de silhouette */}
              <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem' }}>
                {LOOKBOOK_ITEMS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveLookIndex(i)}
                    style={{
                      width: '38px',
                      height: '38px',
                      border: activeLookIndex === i ? '2px solid #000000' : '1px solid #CCCCCC',
                      backgroundColor: activeLookIndex === i ? '#000000' : '#FFFFFF',
                      color: activeLookIndex === i ? '#FFFFFF' : '#000000',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>

              <Link to="/lookbook" className="btn-stylist-dark">
                EXPLORER LA GALERIE COMPLÈTE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. VALEURS & ENGAGEMENTS DE L'ATELIER (Repris des 5 icônes de la maquette)
          ========================================================================= */}
      <section style={{ padding: '4.5rem 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            textAlign: 'center'
          }}>
            <div>
              <Scissors size={24} style={{ margin: '0 auto 0.8rem', display: 'block' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.4rem' }}>Sur-Mesure Pur</h4>
              <p style={{ fontSize: '0.8rem', color: '#666666', lineHeight: 1.5 }}>
                Prise de plus de 20 points de mesure pour un patronage individuel exclusif.
              </p>
            </div>

            <div>
              <Clock size={24} style={{ margin: '0 auto 0.8rem', display: 'block' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.4rem' }}>Déplacement VIP</h4>
              <p style={{ fontSize: '0.8rem', color: '#666666', lineHeight: 1.5 }}>
                Le créateur se déplace directement chez vous ou au bureau à Cotonou.
              </p>
            </div>

            <div>
              <Sparkles size={24} style={{ margin: '0 auto 0.8rem', display: 'block' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.4rem' }}>Studio Flocage</h4>
              <p style={{ fontSize: '0.8rem', color: '#666666', lineHeight: 1.5 }}>
                Marquage haute densité, flex velours et broderie couture pour pièces uniques.
              </p>
            </div>

            <div>
              <ShieldCheck size={24} style={{ margin: '0 auto 0.8rem', display: 'block' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.4rem' }}>Suivi WhatsApp</h4>
              <p style={{ fontSize: '0.8rem', color: '#666666', lineHeight: 1.5 }}>
                Validation directe avec le styliste pour un accompagnement humain sur chaque commande.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. TÉMOIGNAGES CLIENTS (What Our Customers Say)
          ========================================================================= */}
      <section style={{ padding: '6rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.6rem' }}>
            EXPÉRIENCE CLIENT
          </span>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2.5rem' }}>
            Ce que disent nos clients
          </h2>

          <div style={{ padding: '3rem', border: '1px solid #000000', backgroundColor: '#FBFBFB' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', marginBottom: '1.5rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#000000" color="#000000" />
              ))}
            </div>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.65rem',
              lineHeight: 1.4,
              fontStyle: 'italic',
              marginBottom: '2rem',
              color: '#000000'
            }}>
              "{TESTIMONIALS[0].quote}"
            </p>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block' }}>
              {TESTIMONIALS[0].author}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#666666', fontFamily: 'var(--font-mono)' }}>
              {TESTIMONIALS[0].role} • Client Vérifié
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FOLLOW OUR WORLD (Grille Instagram / Galerie de la maquette)
          ========================================================================= */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
              UNIVERS VISUEL
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem' }}>
              L’Atelier en Images
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0.6rem'
          }}>
            {[
              '/assets/img/creation-1.jpg',
              '/assets/img/creation-2.jpg',
              '/assets/img/creation-3.jpg',
              '/assets/img/creation-4.jpg',
              '/assets/img/creation-5.jpg'
            ].map((img, i) => (
              <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden', border: '1px solid #E5E5E5' }}>
                <img
                  src={img}
                  alt={`Création ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
