import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Atelier() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '7rem' }}>
      
      {/* Header */}
      <section style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: 'clamp(4rem, 6vw, 6rem) 0', borderBottom: '1px solid #000000' }}>
        <div className="editorial-container">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#888888', display: 'block', marginBottom: '0.8rem' }}>
            QUI SOMMES-NOUS ?
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', lineHeight: 1.05, marginBottom: '1.2rem', color: '#FFFFFF' }}>
            L’Atelier & Votre Styliste.
          </h1>
          <p style={{ color: '#CCCCCC', fontSize: '1rem', maxWidth: '640px', lineHeight: 1.6 }}>
            Bienvenue chez AllFashion. Nous créons des vêtements élégants et confortables, faciles à porter tous les jours ou lors de vos grandes fêtes et cérémonies.
          </p>
        </div>
      </section>

      {/* Présentation du Styliste */}
      <section style={{ padding: 'clamp(3.5rem, 6vw, 6rem) 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center'
          }}>
            <div>
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.5rem' }}>
                LE CRÉATEUR
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.8vw, 2.6rem)', lineHeight: 1.15, marginBottom: '1.2rem' }}>
                Des vêtements bien coupés, faits pour vous.
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#444444', lineHeight: 1.7, marginBottom: '1rem' }}>
                Chez AllFashion, nous pensons qu'un bon vêtement doit d'abord vous mettre en valeur et être agréable à porter. Chaque modèle est pensé avec soin pour vous donner du style, de l'assurance et une allure soignée.
              </p>
              <p style={{ fontSize: '0.95rem', color: '#444444', lineHeight: 1.7, marginBottom: '1.8rem' }}>
                Que vous cherchiez un prêt-à-porter moderne ou une tenue sur-mesure pour un mariage ou un événement, le styliste vous conseille avec plaisir et peut se déplacer directement chez vous à Cotonou avec ses tissus.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Link to="/sur-mesure" className="btn-stylist-dark">
                  PRENDRE RENDEZ-VOUS AVEC LE STYLISTE
                </Link>
                <Link to="/boutique" className="btn-stylist-outline">
                  VOIR LA BOUTIQUE
                </Link>
              </div>
            </div>

            <div style={{ border: '2px solid #000000', backgroundColor: '#F8F8F8', aspectRatio: '4/5', overflow: 'hidden' }}>
              <img
                src="/images/look-imprime-2.jpg"
                alt="Le Styliste AllFashion"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'none' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Engagements Simples */}
      <section style={{ padding: 'clamp(3.5rem, 5vw, 5rem) 0' }}>
        <div className="editorial-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.8rem', textAlign: 'center' }}>
            <div style={{ padding: '2rem 1.5rem', border: '1px solid #000000' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.4rem', fontWeight: 700, display: 'block' }}>100%</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginTop: '0.4rem', display: 'block', fontWeight: 600 }}>Sur-Mesure Précis</span>
              <p style={{ fontSize: '0.85rem', color: '#666666', marginTop: '0.3rem' }}>Vos mesures exactes pour que la tenue vous aille parfaitement.</p>
            </div>

            <div style={{ padding: '2rem 1.5rem', border: '1px solid #000000' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.4rem', fontWeight: 700, display: 'block' }}>Domicile</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginTop: '0.4rem', display: 'block', fontWeight: 600 }}>Déplacement Chez Vous</span>
              <p style={{ fontSize: '0.85rem', color: '#666666', marginTop: '0.3rem' }}>Le styliste vient à votre domicile ou bureau à Cotonou.</p>
            </div>

            <div style={{ padding: '2rem 1.5rem', border: '1px solid #000000' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.4rem', fontWeight: 700, display: 'block' }}>Atelier</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginTop: '0.4rem', display: 'block', fontWeight: 600 }}>Cousu Avec Soin</span>
              <p style={{ fontSize: '0.85rem', color: '#666666', marginTop: '0.3rem' }}>Chaque couture est réalisée à la main avec passion.</p>
            </div>

            <div style={{ padding: '2rem 1.5rem', border: '1px solid #000000' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.4rem', fontWeight: 700, display: 'block' }}>Direct</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginTop: '0.4rem', display: 'block', fontWeight: 600 }}>Échange WhatsApp</span>
              <p style={{ fontSize: '0.85rem', color: '#666666', marginTop: '0.3rem' }}>Contact simple et rapide avec le styliste pour vos questions.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
