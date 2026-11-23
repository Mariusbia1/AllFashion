import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Boutique', path: '/boutique' },
    { label: 'Sur-Mesure', path: '/sur-mesure' },
    { label: 'Flocage', path: '/flocage' },
    { label: 'Galerie', path: '/lookbook' },
    { label: 'L’Atelier', path: '/atelier' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="navbar-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #000000'
    }}>
      {/* Top Banner monochrome */}
      <div style={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: '0.45rem 1rem',
        fontSize: '0.68rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase'
      }}>
        <div className="editorial-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Prise de mesure à domicile à Cotonou</span>
          <span className="navbar-top-note">Échanges et commandes sur WhatsApp</span>
        </div>
      </div>

      {/* Main Nav (Inspiré de la barre DBY de la maquette) */}
      <div className="editorial-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Logo Styliste */}
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#000000',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span className="navbar-logo-title" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.85rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            lineHeight: 1
          }}>
            AllFashion
          </span>
          <span className="navbar-logo-subtitle" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.28em',
            marginTop: '3px',
            color: '#666666'
          }}>
            MODE & SUR-MESURE
          </span>
        </Link>

        {/* Liens Desktop : STRICTEMENT VISIBLES SUR DESKTOP */}
        <nav className="navbar-desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: isActive(link.path) ? 700 : 500,
                color: '#000000',
                paddingBottom: '4px',
                borderBottom: isActive(link.path) ? '2px solid #000000' : '2px solid transparent',
                transition: 'border-color 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions droite : Panier & Bouton Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <button
            onClick={() => setIsCartOpen(true)}
            className="navbar-cart-btn btn-stylist-outline"
            title="Ouvrir le panier"
          >
            <ShoppingBag size={17} />
            <span className="navbar-cart-text">
              PANIER ({totalCount})
            </span>
            {totalCount > 0 && (
              <span className="navbar-cart-badge">
                {totalCount}
              </span>
            )}
          </button>

          {/* Hamburger button : STRICTEMENT MOBILE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="navbar-hamburger-btn"
            style={{
              background: 'none',
              border: '1px solid #000000',
              padding: '0.5rem',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#000000'
            }}
            aria-label="Menu Mobile"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation : En superposition (couvre le hero sans le pousser) */}
      {mobileMenuOpen && (
        <>
          {/* Arrière-plan semi-transparent qui couvre le reste de l'écran */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 998
            }}
          />

          {/* Tiroir menu mobile qui flotte par-dessus le hero */}
          <div className="navbar-mobile-drawer" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderBottom: '2px solid #000000',
            padding: '1.6rem 1.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.25)',
            zIndex: 999,
            maxHeight: 'calc(100vh - 110px)',
            overflowY: 'auto'
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  fontWeight: isActive(link.path) ? 700 : 500,
                  color: '#000000',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '0.55rem',
                  borderBottom: '1px solid #E5E5E5'
                }}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </div>
        </>
      )}
    </header>
  );
}
