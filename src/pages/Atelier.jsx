import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Atelier() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '7rem' }}>
      
      {/* Header */}
      <section style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '6rem 0', borderBottom: '1px solid #000000' }}>
        <div className="editorial-container">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#888888', display: 'block', marginBottom: '0.8rem' }}>
            SAVOIR-FAIRE & HISTOIRE
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', lineHeight: 1.05, marginBottom: '1.5rem', color: '#FFFFFF' }}>
            L’Atelier & La Vision.
          </h1>
          <p style={{ color: '#CCCCCC', fontSize: '1.05rem', maxWidth: '640px', lineHeight: 1.6 }}>
            Une approche exigeante où chaque pièce est pensée comme une structure architecturale : précision de coupe, matières nobles et finitions artisanales.
          </p>
        </div>
      </section>

      {/* Manifeste Éditorial */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.6rem' }}>
                PHILOSOPHIE DE CRÉATION
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', lineHeight: 1.15, marginBottom: '1.5rem' }}>
                La Ligne Droite Comme Signature.
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#444444', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                Notre atelier refuse le prêt-à-porter standardisé et sans âme. Nous abordons le vêtement comme une seconde peau sculptée pour donner assurance et prestance à celui ou celle qui le porte.
              </p>
              <p style={{ fontSize: '0.95rem', color: '#444444', lineHeight: 1.7, marginBottom: '2rem' }}>
                De la prise de mesure minutieuse à domicile jusqu’à la dernière piqûre d’ourlet, nous privilégions la rigueur d’exécution et le contact direct avec chaque client.
              </p>

              <Link to="/sur-mesure" className="btn-stylist-dark">
                RÉSERVER UNE SÉANCE DE MESURE
              </Link>
            </div>

            <div style={{ border: '2px solid #000000', backgroundColor: '#000000', aspectRatio: '4/5', overflow: 'hidden' }}>
              <img
                src="/assets/img/creation-2.jpg"
                alt="Atelier Créateur"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres & Piliers */}
      <section style={{ padding: '5rem 0' }}>
        <div className="editorial-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div style={{ padding: '2.5rem', border: '1px solid #000000' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.8rem', fontWeight: 700, display: 'block' }}>20+</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginTop: '0.5rem', display: 'block' }}>Points de Mesure</span>
              <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '0.3rem' }}>Pour un patronage individuel parfait</p>
            </div>

            <div style={{ padding: '2.5rem', border: '1px solid #000000' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.8rem', fontWeight: 700, display: 'block' }}>100%</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginTop: '0.5rem', display: 'block' }}>Artisanal & Manuel</span>
              <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '0.3rem' }}>Chaque pièce est cousue en atelier</p>
            </div>

            <div style={{ padding: '2.5rem', border: '1px solid #000000' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.8rem', fontWeight: 700, display: 'block' }}>VIP</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginTop: '0.5rem', display: 'block' }}>Déplacement Client</span>
              <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '0.3rem' }}>À votre domicile ou bureau à Cotonou</p>
            </div>

            <div style={{ padding: '2.5rem', border: '1px solid #000000' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.8rem', fontWeight: 700, display: 'block' }}>0</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginTop: '0.5rem', display: 'block' }}>Compromis Matière</span>
              <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '0.3rem' }}>Étoffes nobles rigoureusement sélectionnées</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
