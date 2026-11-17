import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { STYLIST_WHATSAPP_NUMBER } from '../data/products';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#000000',
      color: '#FFFFFF',
      borderTop: '1px solid #000000',
      paddingTop: '5rem',
      paddingBottom: '3rem'
    }}>
      <div className="editorial-container">
        {/* Top Newsletter / Stay Inspired (Directement repris de la maquette) */}
        <div style={{
          borderBottom: '1px solid #333333',
          paddingBottom: '4rem',
          marginBottom: '4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#888888',
              display: 'block',
              marginBottom: '0.6rem'
            }}>
              INFORMATIONS & NOUVEAUTÉS
            </span>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.5rem',
              lineHeight: 1.1,
              color: '#FFFFFF'
            }}>
              L’Art du Vêtement Épuré.
            </h2>
            <p style={{
              color: '#888888',
              fontSize: '0.9rem',
              marginTop: '0.8rem',
              maxWidth: '480px'
            }}>
              Recevez les sorties de collections capsules, créations uniques et créneaux de déplacements privés.
            </p>
          </div>

          <div>
            <div style={{
              display: 'flex',
              border: '1px solid #FFFFFF'
            }}>
              <input
                type="email"
                placeholder="Votre adresse email..."
                style={{
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '1rem',
                  fontSize: '0.85rem',
                  flex: 1,
                  outline: 'none',
                  fontFamily: 'var(--font-sans)'
                }}
              />
              <button
                type="button"
                className="btn-stylist-inverse"
                style={{
                  border: 'none',
                  borderLeft: '1px solid #FFFFFF'
                }}
              >
                S'INSCRIRE
              </button>
            </div>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: '#666666',
              marginTop: '0.5rem'
            }}>
              Aucun spam. Désinscription possible à tout moment.
            </span>
          </div>
        </div>

        {/* Colonnes du Footer (reprises de la maquette DBY) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '4rem',
          borderBottom: '1px solid #222222'
        }}>
          {/* Col 1 : Marque */}
          <div style={{ gridColumn: 'span 1' }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              fontWeight: 700,
              display: 'block',
              marginBottom: '1rem'
            }}>
              ATELIER
            </span>
            <p style={{
              fontSize: '0.85rem',
              color: '#888888',
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}>
              Maison de création vestimentaire contemporaine : prêt-à-porter numéroté, tailoring sur-mesure et studio de flocage textile.
            </p>
            <a
              href={`https://wa.me/${STYLIST_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-stylist-inverse"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.7rem' }}
            >
              Échanger sur WhatsApp
            </a>
          </div>

          {/* Col 2 : Collections */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '1.2rem',
              color: '#FFFFFF'
            }}>
              Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <li><Link to="/boutique" style={{ color: '#888888', textDecoration: 'none', fontSize: '0.85rem' }}>Prêt-à-Porter</Link></li>
              <li><Link to="/sur-mesure" style={{ color: '#888888', textDecoration: 'none', fontSize: '0.85rem' }}>Tailoring & Sur-Mesure</Link></li>
              <li><Link to="/flocage" style={{ color: '#888888', textDecoration: 'none', fontSize: '0.85rem' }}>Studio de Flocage</Link></li>
              <li><Link to="/lookbook" style={{ color: '#888888', textDecoration: 'none', fontSize: '0.85rem' }}>Galerie Lookbook</Link></li>
            </ul>
          </div>

          {/* Col 3 : Services & Déplacement */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '1.2rem',
              color: '#FFFFFF'
            }}>
              Sur-Mesure VIP
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <li><Link to="/sur-mesure" style={{ color: '#888888', textDecoration: 'none', fontSize: '0.85rem' }}>Prise de Mesure à Domicile</Link></li>
              <li><Link to="/sur-mesure" style={{ color: '#888888', textDecoration: 'none', fontSize: '0.85rem' }}>Consultation à l'Atelier</Link></li>
              <li><Link to="/atelier" style={{ color: '#888888', textDecoration: 'none', fontSize: '0.85rem' }}>Le Savoir-Faire</Link></li>
              <li><Link to="/contact" style={{ color: '#888888', textDecoration: 'none', fontSize: '0.85rem' }}>Prendre Rendez-vous</Link></li>
            </ul>
          </div>

          {/* Col 4 : Contact & Localisation */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '1.2rem',
              color: '#FFFFFF'
            }}>
              Atelier & Showroom
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#888888', lineHeight: 1.6, marginBottom: '0.6rem' }}>
              Cotonou, Bénin (Haie Vive / Cadjehoun)<br />
              Déplacement disponible sur rendez-vous.<br />
              Lundi au Samedi : 09h00 - 20h00
            </p>
            <p style={{ fontSize: '0.85rem', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
              WhatsApp : +229 XX XX XX XX
            </p>
          </div>
        </div>

        {/* Bottom Credits & Mentions */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '2.5rem',
          fontSize: '0.75rem',
          color: '#666666',
          fontFamily: 'var(--font-mono)'
        }}>
          <span>© {new Date().getFullYear()} ATELIER CRÉATEUR. TOUS DROITS RÉSERVÉS.</span>
          <span>PLATEFORME WEB & COMMERCE WHATSAPP</span>
        </div>
      </div>
    </footer>
  );
}
