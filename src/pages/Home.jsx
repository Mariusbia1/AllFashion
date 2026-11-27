import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Sparkles, ShieldCheck, Clock, Star, MessageCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, LOOKBOOK_ITEMS, TESTIMONIALS, STYLIST_WHATSAPP_NUMBER } from '../data/products';

const REALISATIONS = [
  {
    id: 'real-1',
    title: 'Costume Croisé 3 Pièces',
    category: 'Sur-Mesure Cérémonie',
    image: '/assets/img/creation-1.jpg',
    desc: 'Coupe droite élégante, veste structurée et finitions soignées pour mariage.',
    badge: 'Cérémonie'
  },
  {
    id: 'real-2',
    title: 'Robe Sculpturale Monochrome',
    category: 'Haute Couture',
    image: '/assets/img/creation-2.jpg',
    desc: 'Jeu de contrastes noir et blanc fluide pour soirée de gala.',
    badge: 'Édition Privée'
  },
  {
    id: 'real-3',
    title: 'Gilet Artistique Imprimé',
    category: 'Signature Styliste',
    image: '/images/look-imprime-2.jpg',
    desc: 'La création signature portée par le styliste créateur AllFashion.',
    badge: 'Créateur'
  }
];

export default function Home() {
  const [activeLookIndex, setActiveLookIndex] = useState(0);

  // 4 catégories sur une ligne
  const mainCategories = CATEGORIES.slice(1, 5);
  const currentLook = LOOKBOOK_ITEMS[activeLookIndex] || LOOKBOOK_ITEMS[0];

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#000000', overflowX: 'hidden' }}>

      {/* =========================================================================
          1. HERO HEADER FULL-SCREEN AVEC IMAGE EN BG + LÉGER FLOU NOIR + AOS
          ========================================================================= */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100vh - 110px)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#FFFFFF'
      }}>
        {/* IMAGE BACKGROUND : TABLE DE COUPE ATELIER HAUTE COUTURE (CISEAUX MAT, CRAIE, PATRONAGE, MÈTRE & TISSUS NOBLES) SANS PERSONNE */}
        <div style={{
          position: 'absolute',
          inset: '-20px',
          backgroundImage: `url('/images/hero-tailor-tools.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          filter: 'blur(0.8px) brightness(0.72)',
          transform: 'scale(1.03)',
          zIndex: 1
        }} />

        {/* OVERLAY VOILE NOIR SUBTIL POUR CONTRASTE PARFAIT DU TEXTE */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.40)',
          zIndex: 2
        }} />

        {/* CONTENU DU HERO ANIMÉ VIA AOS */}
        <div className="editorial-container" style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          paddingBottom: '4rem',
          paddingTop: '4rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <span
            data-aos="fade-down"
            data-aos-delay="100"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.72rem, 1.2vw, 0.85rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#E0E0E0',
              display: 'block',
              marginBottom: '1.2rem',
              fontWeight: 600
            }}
          >
            PRÊT-À-PORTER & SUR-MESURE
          </span>

          <h1
            data-aos="fade-up"
            data-aos-delay="200"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 6.5vw, 5.8rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              color: '#FFFFFF',
              maxWidth: '960px'
            }}
          >
            Votre Style, Sur-Mesure.<br />
            Créé Rien Que Pour Vous.
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="300"
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: '#E5E5E5',
              lineHeight: 1.6,
              marginBottom: '2.8rem',
              maxWidth: '620px'
            }}
          >
            Des vêtements élégants en prêt-à-porter ou sur-mesure. Le styliste se déplace directement chez vous ou à votre bureau à Cotonou pour vos mesures.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="400"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'center' }}
          >
            <Link
              to="/boutique"
              className="btn-stylist-inverse"
              style={{
                padding: '1.05rem 2.4rem',
                fontSize: '0.8rem',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid #FFFFFF'
              }}
            >
              <span>VOIR LA BOUTIQUE</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/sur-mesure"
              className="btn-stylist-outline"
              style={{
                padding: '1.05rem 2.4rem',
                fontSize: '0.8rem',
                color: '#FFFFFF',
                borderColor: '#FFFFFF',
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(4px)'
              }}
            >
              <span>PRENDRE RENDEZ-VOUS</span>
            </Link>
          </div>
        </div>

        {/* Indicateur SCROLL */}
        <div style={{
          position: 'absolute',
          bottom: '1.6rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#CCCCCC',
          zIndex: 10
        }}>

        </div>
      </section>

      {/* =========================================================================
          2. SHOP BY CATEGORY : 4 GRANDES IMAGES SUR LA LIGNE AVEC ANIMATIONS DÉCALÉES
          ========================================================================= */}
      <section style={{ padding: 'clamp(3.5rem, 6vw, 5.5rem) 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div
            data-aos="fade-up"
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', marginBottom: '2.8rem' }}
          >
            <div>
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
                COLLECTIONS
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontFamily: 'var(--font-serif)', color: '#000000' }}>
                Nos Catégories
              </h2>
            </div>

            <Link to="/boutique" className="link-editorial">
              <span>Voir tout</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="home-categories-grid">
            {mainCategories.map((cat, idx) => (
              <div
                key={cat.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <Link
                  to={`/boutique?category=${cat.id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#000000',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#FFFFFF',
                    border: 'none',
                    padding: 0
                  }}
                >
                  <div style={{ aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#F0F0F0', border: 'none' }}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'none',
                        opacity: 1,
                        transition: 'transform 0.45s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div style={{ paddingTop: '0.75rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
                      fontWeight: 600,
                      display: 'block',
                      lineHeight: 1.2
                    }}>
                      {cat.name}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: '#888888',
                      display: 'block',
                      marginTop: '0.25rem'
                    }}>
                      {cat.count} pièces
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. NOUVELLES ARRIVÉES : 3 GRANDES PIÈCES ANIMÉES AU SCROLL
          ========================================================================= */}
      <section style={{ padding: 'clamp(3.5rem, 6vw, 6rem) 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div
            data-aos="fade-up"
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', marginBottom: '3rem' }}
          >
            <div>
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
                NOUVEAUTÉS
              </span>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 2.8rem)', fontFamily: 'var(--font-serif)' }}>
                Nouvelles Arrivées
              </h2>
            </div>
            <Link to="/boutique" className="link-editorial">
              <span>Voir tout</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="home-products-grid-3">
            {PRODUCTS.slice(0, 3).map((product, idx) => (
              <div
                key={product.id}
                data-aos="fade-up"
                data-aos-delay={idx * 120}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. LE CRÉATEUR & LE SUR-MESURE (SECTION NOIRE ARCHITECTURALE & IMPRESSIONNANTE)
          ========================================================================= */}
      <section className="home-creator-section">
        <div className="editorial-container">
          <div data-aos="fade-up" className="home-creator-grid">
            
            {/* Colonne Gauche : Portrait Majestueux du Styliste */}
            <div className="home-creator-photo-box" data-aos="fade-right">
              <span className="home-creator-badge-top">
                LE STYLISTE ALLFASHION
              </span>
              <img
                src="/images/look-imprime-2.jpg"
                alt="Le Styliste Créateur AllFashion"
                loading="lazy"
              />
              <div className="home-creator-badge-bottom">
                <span>DIRECTION ARTISTIQUE • COTONOU</span>
              </div>
            </div>

            {/* Colonne Droite : Présentation Charismatique & Prise de RDV */}
            <div data-aos="fade-left">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.35rem 0.8rem', border: '1px solid #333333', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: '1.2rem' }}>
                <Scissors size={14} color="#FFFFFF" />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#CCCCCC',
                  fontWeight: 600
                }}>
                  LE CRÉATEUR & LE SUR-MESURE
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 4vw, 3.4rem)',
                lineHeight: 1.08,
                marginBottom: '1.2rem',
                color: '#FFFFFF'
              }}>
                L’Élégance du Vêtement,<br />
                Façonné Pour Vous.
              </h2>

              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                color: '#E0E0E0',
                lineHeight: 1.5,
                marginBottom: '1.4rem'
              }}>
                « Un bon vêtement ne se contente pas d’habiller : il révèle votre personnalité et vous donne de l’assurance. »
              </p>

              <p style={{
                color: '#AAAAAA',
                fontSize: '0.95rem',
                lineHeight: 1.65,
                marginBottom: '2rem',
                maxWidth: '540px'
              }}>
                Pour vos mariages, réceptions ou votre quotidien, le styliste se déplace directement chez vous ou à votre bureau à Cotonou avec sa sélection de tissus. Vos mesures sont prises avec soin pour créer une tenue sur-mesure unique.
              </p>

              {/* 3 Piliers de Prestige */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                paddingBottom: '2rem',
                marginBottom: '2rem',
                borderBottom: '1px solid #222222'
              }}>
                <div>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>100%</span>
                  <span style={{ fontSize: '0.78rem', color: '#888888', marginTop: '0.2rem', display: 'block' }}>Sur-Mesure Précis</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>Domicile</span>
                  <span style={{ fontSize: '0.78rem', color: '#888888', marginTop: '0.2rem', display: 'block' }}>Déplacement Chez Vous</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>Direct</span>
                  <span style={{ fontSize: '0.78rem', color: '#888888', marginTop: '0.2rem', display: 'block' }}>Échange WhatsApp</span>
                </div>
              </div>

              {/* Actions Directes */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Link
                  to="/sur-mesure"
                  className="btn-stylist-inverse"
                  style={{ padding: '0.95rem 2rem', fontSize: '0.78rem' }}
                >
                  <span>PRENDRE RENDEZ-VOUS AVEC LE STYLISTE</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href={`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour AllFashion, je souhaite prendre rendez-vous avec le styliste pour une confection sur-mesure.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-stylist-outline"
                  style={{ padding: '0.95rem 1.6rem', fontSize: '0.78rem', color: '#FFFFFF', borderColor: '#FFFFFF' }}
                >
                  <MessageCircle size={15} />
                  <span>DISCUTER SUR WHATSAPP</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. NOS RÉALISATIONS (REMPLACE LA DOUBLE SECTION DE PRODUITS)
          ========================================================================= */}
      <section style={{ padding: 'clamp(3.5rem, 6vw, 6rem) 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div
            data-aos="fade-up"
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', marginBottom: '3rem' }}
          >
            <div>
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
                PORTFOLIO & ATELIER
              </span>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 2.8rem)', fontFamily: 'var(--font-serif)' }}>
                Nos Réalisations
              </h2>
              <p style={{ color: '#666666', fontSize: '0.95rem', marginTop: '0.4rem', maxWidth: '560px' }}>
                Découvrez nos créations sur-mesure et nos pièces signatures confectionnées avec soin dans notre atelier.
              </p>
            </div>
            <Link to="/lookbook" className="link-editorial">
              <span>Voir toute la galerie</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="home-realisations-grid">
            {REALISATIONS.map((item, idx) => (
              <div
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  backgroundColor: '#F5F5F5',
                  marginBottom: '0.85rem'
                }}>
                  <span style={{
                    position: 'absolute',
                    top: '0.8rem',
                    left: '0.8rem',
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 0.6rem',
                    zIndex: 2
                  }}>
                    {item.badge}
                  </span>

                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: item.id === 'real-3' ? 'center 35%' : 'center center',
                      transition: 'transform 0.45s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                <div>
                  <span style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#888888',
                    marginBottom: '0.2rem'
                  }}>
                    {item.category}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    lineHeight: 1.25,
                    marginBottom: '0.35rem',
                    color: '#000000'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.82rem',
                    color: '#666666',
                    lineHeight: 1.45,
                    marginBottom: '0.6rem'
                  }}>
                    {item.desc}
                  </p>
                  <a
                    href={`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour AllFashion, je suis intéressé(e) par votre réalisation : "${item.title}". Pouvez-vous me donner plus de détails pour une confection ?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-editorial"
                    style={{ fontSize: '0.72rem' }}
                  >
                    <span>Commander ce modèle</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
            <Link to="/lookbook" className="btn-stylist-dark" style={{ padding: '1rem 2.4rem' }}>
              <span>EXPLORER LA GALERIE COMPLÈTE</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. EDITORIAL LOOKBOOK ANIMÉ VIA AOS (MOTS SIMPLES & STYLE ÉPURÉ)
          ========================================================================= */}
      <section style={{ padding: 'clamp(3.5rem, 5vw, 5rem) 0', backgroundColor: '#F8F8F8', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center'
          }}>
            <div
              data-aos="fade-right"
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                maxHeight: '620px',
                width: '100%',
                backgroundColor: '#EFEFEF',
                border: 'none',
                overflow: 'hidden'
              }}
            >
              <img
                src={currentLook.image}
                alt={currentLook.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'none',
                  opacity: 1
                }}
              />

              {currentLook.dots && currentLook.dots.map((dot) => (
                <div
                  key={dot.id}
                  className="lookbook-hotspot"
                  style={{ top: `${dot.y}%`, left: `${dot.x}%` }}
                  title={`${dot.title} — ${dot.price}`}
                />
              ))}
            </div>

            <div data-aos="fade-left">
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.5rem' }}>
                NOS STYLES & INSPIRATIONS
              </span>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.8vw, 2.6rem)', lineHeight: 1.1, marginBottom: '0.8rem' }}>
                Le Lookbook AllFashion
              </h2>

              <p style={{ color: '#555555', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.8rem' }}>
                Découvrez nos tenues portées au quotidien. Des vêtements bien coupés, confortables et adaptés à votre style.
              </p>

              <div style={{ borderTop: '1px solid #CCCCCC', marginBottom: '1.8rem' }}>
                {currentLook.dots && currentLook.dots.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.9rem 0',
                      borderBottom: '1px solid #E5E5E5'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{item.title}</span>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: '#888888', fontFamily: 'var(--font-mono)' }}>
                        Fait main sur-mesure
                      </span>
                    </div>

                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', fontWeight: 700 }}>
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.8rem' }}>
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
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>

              <Link to="/lookbook" className="btn-stylist-dark">
                VOIR TOUS LES LOOKS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. VALEURS & ENGAGEMENTS DE L'ATELIER (4 Colonnes animées avec AOS)
          ========================================================================= */}
      <section style={{ padding: 'clamp(3rem, 5vw, 4.5rem) 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            textAlign: 'center'
          }}>
            <div data-aos="fade-up" data-aos-delay="50">
              <Scissors size={24} style={{ margin: '0 auto 0.8rem', display: 'block' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.3rem' }}>Sur-Mesure</h4>
              <p style={{ fontSize: '0.82rem', color: '#666666', lineHeight: 1.5 }}>
                Des vêtements adaptés exactement à votre taille et à vos envies.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="150">
              <Clock size={24} style={{ margin: '0 auto 0.8rem', display: 'block' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.3rem' }}>Déplacement Chez Vous</h4>
              <p style={{ fontSize: '0.82rem', color: '#666666', lineHeight: 1.5 }}>
                Le styliste vient chez vous ou au bureau à Cotonou pour vos mesures.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="250">
              <Sparkles size={24} style={{ margin: '0 auto 0.8rem', display: 'block' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.3rem' }}>Personnalisation & Flocage</h4>
              <p style={{ fontSize: '0.82rem', color: '#666666', lineHeight: 1.5 }}>
                Ajoutez votre nom et numéro sur vos vêtements avec le style d’écriture de votre choix.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="350">
              <ShieldCheck size={24} style={{ margin: '0 auto 0.8rem', display: 'block' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.3rem' }}>Contact Direct WhatsApp</h4>
              <p style={{ fontSize: '0.82rem', color: '#666666', lineHeight: 1.5 }}>
                Échangez directement avec le styliste pour toutes vos questions et commandes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. TÉMOIGNAGES CLIENTS
          ========================================================================= */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span
            data-aos="fade-down"
            className="tracking-wide-caps"
            style={{ color: '#888888', display: 'block', marginBottom: '0.5rem' }}
          >
            EXPÉRIENCE CLIENT
          </span>

          <h2
            data-aos="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.6rem)', marginBottom: '2rem' }}
          >
            Ce que disent nos clients
          </h2>

          <div
            data-aos="zoom-in"
            style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', marginBottom: '1.2rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#000000" color="#000000" />
              ))}
            </div>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
              lineHeight: 1.45,
              fontStyle: 'italic',
              marginBottom: '1.8rem',
              color: '#000000'
            }}>
              "{TESTIMONIALS[0].quote}"
            </p>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block' }}>
              {TESTIMONIALS[0].author}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#666666', fontFamily: 'var(--font-mono)' }}>
              {TESTIMONIALS[0].role} • Client Vérifié
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. L'ATELIER EN IMAGES
          ========================================================================= */}
      <section style={{ padding: 'clamp(3rem, 5vw, 4.5rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="editorial-container">
          <div
            data-aos="fade-up"
            style={{ textAlign: 'center', marginBottom: '2.5rem' }}
          >
            <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
              UNIVERS VISUEL
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)' }}>
              L’Atelier en Images
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.8rem'
          }}>
            {[
              '/assets/img/creation-1.jpg',
              '/assets/img/creation-2.jpg',
              '/assets/img/creation-3.jpg',
              '/assets/img/creation-4.jpg',
              '/assets/img/creation-5.jpg'
            ].map((img, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                style={{ aspectRatio: '1/1', overflow: 'hidden', border: 'none' }}
              >
                <img
                  src={img}
                  alt={`Création ${i + 1}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'none',
                    opacity: 1,
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
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
