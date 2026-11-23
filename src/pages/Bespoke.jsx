import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Scissors, ShieldCheck, Send, Check } from 'lucide-react';
import { STYLIST_WHATSAPP_NUMBER } from '../data/products';

export default function Bespoke() {
  const [locationType, setLocationType] = useState('domicile');
  const [address, setAddress] = useState('');
  const [garmentType, setGarmentType] = useState('Costume 3 Pièces');
  const [dateSlot, setDateSlot] = useState('');
  const [timeSlot, setTimeSlot] = useState('14:00 - 16:00');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !dateSlot) {
      alert('Veuillez remplir votre nom, numéro WhatsApp et date souhaitée.');
      return;
    }

    if (locationType === 'domicile' && !address.trim()) {
      alert('Veuillez renseigner votre adresse pour le déplacement à domicile.');
      return;
    }

    // Référence provisoire RDV
    const ref = `RDV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let msg = `*DEMANDE DE RENDEZ-VOUS SUR-MESURE*\n`;
    msg += `Référence : ${ref}\n`;
    msg += `-----------------------------------\n`;
    msg += `Client : ${clientName}\n`;
    msg += `Téléphone : ${clientPhone}\n`;
    msg += `Lieu : ${locationType === 'domicile' ? 'Déplacement VIP à Domicile / Bureau' : "À l'Atelier du Styliste à Cotonou"}\n`;
    if (locationType === 'domicile') {
      msg += `Adresse exacte : ${address}\n`;
    }
    msg += `Tenue souhaitée : ${garmentType}\n`;
    msg += `Date souhaitée : ${dateSlot}\n`;
    msg += `Créneau horaire : ${timeSlot}\n`;
    if (notes.trim()) {
      msg += `Précisions : ${notes}\n`;
    }
    msg += `-----------------------------------\n`;
    msg += `Bonjour, je souhaite bloquer ce créneau pour ma consultation et prise de mesure. Merci de me confirmer vos disponibilités.`;

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
                    1. Lieu de consultation
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setLocationType('domicile')}
                      style={{
                        padding: '0.8rem',
                        border: '1px solid #000000',
                        backgroundColor: locationType === 'domicile' ? '#000000' : 'transparent',
                        color: locationType === 'domicile' ? '#FFFFFF' : '#000000',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Déplacement à Domicile / Bureau
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocationType('atelier')}
                      style={{
                        padding: '0.8rem',
                        border: '1px solid #000000',
                        backgroundColor: locationType === 'atelier' ? '#000000' : 'transparent',
                        color: locationType === 'atelier' ? '#FFFFFF' : '#000000',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      À l'Atelier du Styliste
                    </button>
                  </div>
                </div>

                {/* Adresse si domicile */}
                {locationType === 'domicile' && (
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Adresse de déplacement à Cotonou & Environs *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Cotonou, Haie Vive, Rue 340..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="input-stylist"
                      required
                    />
                  </div>
                )}

                {/* 2. Type de tenue */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
                    2. Type de vêtement souhaité
                  </label>
                  <select
                    value={garmentType}
                    onChange={(e) => setGarmentType(e.target.value)}
                    className="input-stylist"
                  >
                    <option value="Costume 3 Pièces (Veste, Gilet, Pantalon)">Costume 3 Pièces (Veste, Gilet, Pantalon)</option>
                    <option value="Costume 2 Pièces Tailleur">Costume 2 Pièces Tailleur</option>
                    <option value="Veste / Blazer de Cérémonie">Veste / Blazer de Cérémonie</option>
                    <option value="Robe de Soirée / Mariage">Robe de Soirée / Mariage</option>
                    <option value="Tenue Traditionnelle Moderne">Tenue Traditionnelle Moderne</option>
                    <option value="Tenue de Scène / Spectacle">Tenue de Scène / Spectacle</option>
                  </select>
                </div>

                {/* Date & Heure */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Date souhaitée *
                    </label>
                    <input
                      type="date"
                      value={dateSlot}
                      onChange={(e) => setDateSlot(e.target.value)}
                      className="input-stylist"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Créneau horaire
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="input-stylist"
                    >
                      <option value="10:00 - 12:00">Matin (10h00 - 12h00)</option>
                      <option value="14:00 - 16:00">Après-midi (14h00 - 16h00)</option>
                      <option value="16:30 - 18:30">Fin d'après-midi (16h30 - 18h30)</option>
                      <option value="19:00 - 21:00">Soirée VIP (19h00 - 21h00)</option>
                    </select>
                  </div>
                </div>

                {/* Coordonnées */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Votre Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Jean DUPONT"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="input-stylist"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Numéro WhatsApp *
                    </label>
                    <input
                      type="tel"
                      placeholder="+229 XX XX XX XX"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="input-stylist"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Remarques ou événement particulier
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Ex: Cérémonie prévue le mois prochain, préférences de matière..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input-stylist"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-stylist-dark"
                  style={{ width: '100%', padding: '1.1rem' }}
                >
                  <Send size={15} />
                  <span>TRANSMETTRE LA DEMANDE SUR WHATSAPP</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
