import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Scissors, ShieldCheck, Send, Check } from 'lucide-react';
import { STYLIST_WHATSAPP_NUMBER } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function Bespoke() {
  const { addAppointment } = useStore();
  const [locationType, setLocationType] = useState('domicile');
  const [address, setAddress] = useState('');
  const [dateSlot, setDateSlot] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [garmentIdea, setGarmentIdea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert('Veuillez renseigner votre nom et votre numéro WhatsApp.');
      return;
    }

    if (locationType === 'domicile' && !address.trim()) {
      alert('Veuillez préciser votre quartier ou adresse pour le déplacement.');
      return;
    }

    // Enregistrement dans le Store / Base de données Admin
    addAppointment({
      clientName,
      clientPhone,
      locationType,
      address,
      dateSlot,
      garmentIdea
    });

    // Référence provisoire RDV
    const ref = `RDV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let msg = `*DEMANDE DE RENDEZ-VOUS SUR-MESURE*\n`;
    msg += `Référence : ${ref}\n`;
    msg += `-----------------------------------\n`;
    msg += `Client : ${clientName}\n`;
    msg += `Téléphone : ${clientPhone}\n`;
    msg += `Lieu : ${locationType === 'domicile' ? 'Déplacement à Domicile / Bureau' : "À l'Atelier du Styliste à Cotonou"}\n`;
    if (locationType === 'domicile' && address.trim()) {
      msg += `Quartier / Adresse : ${address.trim()}\n`;
    }
    if (dateSlot) {
      msg += `Date souhaitée : ${dateSlot}\n`;
    }
    if (garmentIdea.trim()) {
      msg += `Idée de tenue : ${garmentIdea.trim()}\n`;
    }
    msg += `-----------------------------------\n`;
    msg += `Bonjour AllFashion, je souhaite fixer un rendez-vous avec le styliste pour une prise de mesure. Pouvez-vous me confirmer vos disponibilités ?`;

    window.open(`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '7rem' }}>
      
      {/* Header */}
      <section style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '6rem 0', borderBottom: '1px solid #000000' }}>
        <div className="editorial-container">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#888888', display: 'block', marginBottom: '0.8rem' }}>
            SUR-MESURE & DÉPLACEMENT
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', lineHeight: 1.05, marginBottom: '1.5rem', color: '#FFFFFF' }}>
            Votre Tenue Sur-Mesure.
          </h1>
          <p style={{ color: '#CCCCCC', fontSize: '1.05rem', maxWidth: '640px', lineHeight: 1.6 }}>
            Un vêtement adapté exactement à votre taille et à vos envies. Le styliste se déplace directement chez vous ou au bureau à Cotonou avec ses tissus, ou vous reçoit à l’atelier.
          </p>
        </div>
      </section>

      {/* 4 Étapes de Confection */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: '#888888' }}>01</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Choix du Modèle & Tissus</h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.6 }}>
                On échange sur votre projet et le styliste vous présente des tissus de qualité adaptés à votre événement.
              </p>
            </div>

            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: '#888888' }}>02</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Prise de Mesures</h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.6 }}>
                Le styliste prend toutes vos mesures directement chez vous ou à l’atelier pour un ajustement parfait.
              </p>
            </div>

            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: '#888888' }}>03</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Couture à l'Atelier</h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.6 }}>
                Chaque pièce est découpée et confectionnée à la main avec passion et minutie.
              </p>
            </div>

            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: '#888888' }}>04</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Essayage & Ajustements</h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.6 }}>
                Séance d’essayage pour vérifier que le vêtement tombe à la perfection, avec retouches incluses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de Réservation */}
      <section style={{ padding: '6rem 0' }}>
        <div className="editorial-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start'
          }}>
            {/* Colonne Gauche : Explication */}
            <div>
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.6rem' }}>
                RÉSERVATION SIMPLE
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Prendre Rendez-Vous avec le Styliste
              </h2>
              <p style={{ color: '#555555', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Choisissez la date et le créneau qui vous conviennent. Le styliste vient avec ses échantillons de tissus et tout le nécessaire pour créer votre vêtement.
              </p>

              <div style={{ padding: '1.8rem', border: '1px solid #000000', backgroundColor: '#F8F8F8', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <MapPin size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    DÉPLACEMENT DIRECT CHEZ VOUS OU AU BUREAU
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#666666', lineHeight: 1.5 }}>
                  Pas besoin de vous déplacer : le styliste se déplace à votre adresse à Cotonou et ses environs.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
                  <Check size={16} />
                  <span>Mesures conservées dans votre fiche client pour vos futures commandes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
                  <Check size={16} />
                  <span>Conseils de style et choix exclusif des matières</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Formulaire Strict Monochrome */}
            <div style={{ padding: '2.5rem', border: '2px solid #000000', backgroundColor: '#FFFFFF' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                
                {/* 1. Lieu du RDV */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                    1. Où préférez-vous le rendez-vous ?
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setLocationType('domicile')}
                      style={{
                        padding: '0.85rem 0.5rem',
                        border: '1px solid #000000',
                        backgroundColor: locationType === 'domicile' ? '#000000' : 'transparent',
                        color: locationType === 'domicile' ? '#FFFFFF' : '#000000',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Chez moi à Cotonou
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocationType('atelier')}
                      style={{
                        padding: '0.85rem 0.5rem',
                        border: '1px solid #000000',
                        backgroundColor: locationType === 'atelier' ? '#000000' : 'transparent',
                        color: locationType === 'atelier' ? '#FFFFFF' : '#000000',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      À l’Atelier
                    </button>
                  </div>
                </div>

                {/* Quartier si domicile */}
                {locationType === 'domicile' && (
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Votre quartier ou adresse à Cotonou *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Haie Vive, Cadjehoun, Fidjrossè..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="input-stylist"
                      required
                    />
                  </div>
                )}

                {/* 2. Date souhaitée */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
                    2. Date souhaitée (Facultatif)
                  </label>
                  <input
                    type="date"
                    value={dateSlot}
                    onChange={(e) => setDateSlot(e.target.value)}
                    className="input-stylist"
                  />
                </div>

                {/* 3. Vos Coordonnées */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
                    3. Vos coordonnées
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.8rem' }}>
                    <input
                      type="text"
                      placeholder="Votre Nom & Prénom *"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="input-stylist"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Numéro WhatsApp *"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="input-stylist"
                      required
                    />
                  </div>
                </div>

                {/* Idée de vêtement simple */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Une idée de tenue en tête ? (Optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Costume 3 pièces, robe de soirée, tunique..."
                    value={garmentIdea}
                    onChange={(e) => setGarmentIdea(e.target.value)}
                    className="input-stylist"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-stylist-dark"
                  style={{ width: '100%', padding: '1.05rem', marginTop: '0.4rem' }}
                >
                  <Send size={15} />
                  <span>PRENDRE RENDEZ-VOUS SUR WHATSAPP</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
