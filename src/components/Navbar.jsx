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
    { label: 'Sur-Mesure & RDV', path: '/sur-mesure' },
    { label: 'Flocage & Personnalisation', path: '/flocage' },
    { label: 'Lookbook', path: '/lookbook' },
    { label: 'L’Atelier', path: '/atelier' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header style={{
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
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div className="editorial-container" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Service Sur-Mesure avec Déplacement VIP à Cotonou & Environs</span>
          <span style={{ display: 'none', md: 'inline' }}>Commandes & Réservations traitées directement sur WhatsApp</span>
        </div>
      </div>

      {/* Main Nav (Inspiré de la barre DBY de la maquette) */}
      <div className="editorial-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px'
      }}>
        {/* Logo Styliste minimaliste */}
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#000000',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            lineHeight: 1
          }}>
            ATELIER
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.35em',
            marginTop: '2px',
            color: '#666666'
          }}>
            HAUTE COUTURE & TAILORING
          </span>
        </Link>

        {/* Liens Desktop */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }} className="hidden md:flex">
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
                transition: 'border-color 0.2s ease'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions droite : Panier & Menu Mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-stylist-outline"
            style={{
              padding: '0.6rem 1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
            title="Ouvrir le panier"
          >
            <ShoppingBag size={15} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>
              PANIER ({totalCount})
            </span>
          </button>

          {/* Hamburger button (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            style={{
              background: 'none',
              border: '1px solid #000000',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#000000'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '2px solid #000000',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem'
        }} className="md:hidden">
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
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #E5E5E5'
              }}
            >
              <span>{link.label}</span>
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
