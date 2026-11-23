import React, { useState } from 'react';
import { Send, Type, Sparkles, MessageCircle, Info, Check } from 'lucide-react';
import { STYLIST_WHATSAPP_NUMBER } from '../data/products';

const GARMENT_SUPPORTS = [
  { id: 'hoodie', name: 'Hoodie Oversize Coton Lourd', image: '/assets/img/creation-4.jpg' },
  { id: 'tshirt', name: 'T-Shirt Signature 380 GSM', image: '/assets/img/creation-1.jpg' },
  { id: 'veste', name: 'Veste Structurée Capsule', image: '/assets/img/creation-3.jpg' },
  { id: 'sweat', name: 'Sweat Minimal Col Rond', image: '/assets/img/creation-5.jpg' }
];

const MARKING_POSITIONS = [
  { id: 'dos', name: 'Dos Centré (Grand Format)', top: '38%', left: '50%', scale: 1 },
  { id: 'poitrine', name: 'Face / Poitrine Centrée', top: '34%', left: '50%', scale: 0.85 },
  { id: 'coeur', name: 'Cœur (Côté Gauche)', top: '32%', left: '40%', scale: 0.6 }
];

const FLOCKING_FONTS = [
  {
    id: 'athletic',
    name: 'Athletic / Varsity',
    fontFamily: "'Bebas Neue', sans-serif",
    letterSpacing: '0.08em',
    sample: 'VARSITY'
  },
  {
    id: 'couture',
    name: 'Couture Romaine',
    fontFamily: "'Cinzel', serif",
    letterSpacing: '0.12em',
    sample: 'ROMAN'
  },
  {
    id: 'streetwear',
    name: 'Streetwear Bold',
    fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: '0.04em',
    sample: 'STREET'
  },
  {
    id: 'minimalist',
    name: 'Minimaliste Chic',
    fontFamily: "'Inter', sans-serif",
    letterSpacing: '0.2em',
    sample: 'MINIMAL'
  },
  {
    id: 'garamond',
    name: 'Garamond Atelier',
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: '0.06em',
    sample: 'ATELIER'
  }
];

const FLOCKING_COLORS = [
  { id: 'white', name: 'Blanc Pur', hex: '#FFFFFF', border: '#DDDDDD' },
  { id: 'black', name: 'Noir Mat', hex: '#111111', border: '#444444' },
  { id: 'gold', name: 'Or Satiné', hex: '#D4AF37', border: '#D4AF37' },
  { id: 'red', name: 'Rouge Vif', hex: '#D32F2F', border: '#D32F2F' }
];

export default function Flocking() {
  const [selectedSupport, setSelectedSupport] = useState(GARMENT_SUPPORTS[0]);
  const [selectedPosition, setSelectedPosition] = useState(MARKING_POSITIONS[0]);
  const [selectedFont, setSelectedFont] = useState(FLOCKING_FONTS[0]);
  const [selectedColor, setSelectedColor] = useState(FLOCKING_COLORS[0]);

  // Personnalisation Texte & Numéro
  const [customText, setCustomText] = useState('ALLFASHION');
  const [customNumber, setCustomNumber] = useState('07');

  const [quantity, setQuantity] = useState(1);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert('Veuillez renseigner votre nom et numéro WhatsApp.');
      return;
    }
    if (!customText.trim() && !customNumber.trim()) {
      alert('Veuillez renseigner au moins un texte ou un numéro à floquer.');
      return;
    }

    const ref = `FLOC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let msg = `*COMMANDE FLOCAGE NOM & NUMÉRO — ALLFASHION*\n`;
    msg += `Référence : ${ref}\n`;
    msg += `-----------------------------------\n`;
    msg += `Client : ${clientName}\n`;
    msg += `Téléphone : ${clientPhone}\n`;
    msg += `Support : ${selectedSupport.name}\n`;
    msg += `Emplacement : ${selectedPosition.name}\n`;
    msg += `-----------------------------------\n`;
    msg += `PERSONNALISATION SOUHAITÉE :\n`;
    if (customText.trim()) {
      msg += `• Nom / Texte : "${customText.trim().toUpperCase()}"\n`;
    }
    if (customNumber.trim()) {
      msg += `• Numéro : "${customNumber.trim()}"\n`;
    }
    msg += `• Police choisie : ${selectedFont.name}\n`;
    msg += `• Couleur de flocage : ${selectedColor.name}\n`;
    msg += `• Quantité : ${quantity} pièce(s)\n`;
    if (instructions.trim()) {
      msg += `• Précisions : ${instructions.trim()}\n`;
    }
    msg += `-----------------------------------\n`;
    msg += `Bonjour, je souhaite commander cette pièce personnalisée. Pouvez-vous me confirmer le tarif exact et le délai de confection ?`;

    window.open(`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleImageOrderWhatsApp = () => {
    const msg = `*DEMANDE DE FLOCAGE SUR-MESURE AVEC IMAGE / LOGO*\n` +
      `Bonjour AllFashion, je souhaite faire floquer un logo/image personnalisé sur l'une de vos pièces. Je vous transmets mon fichier visuel ci-joint pour étude de faisabilité et devis.`;
    window.open(`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const displayText = customText.trim().toUpperCase() || 'VOTRE NOM';
  const displayNumber = customNumber.trim();

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '7rem' }}>
      
      {/* Header Flocage */}
      <section style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: 'clamp(3.5rem, 6vw, 5.5rem) 0', borderBottom: '1px solid #000000' }}>
        <div className="editorial-container">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#888888', display: 'block', marginBottom: '0.8rem' }}>
            PERSONNALISATION & FLOCAGE
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', lineHeight: 1.05, marginBottom: '1.2rem', color: '#FFFFFF' }}>
            Flocage Nom & Numéro.
          </h1>
          <p style={{ color: '#CCCCCC', fontSize: '1rem', maxWidth: '640px', lineHeight: 1.6 }}>
            Personnalisez votre pièce avec votre nom, texte et numéro. Choisissez votre typographie préférée et visualisez immédiatement le résultat avant de valider votre commande sur WhatsApp.
          </p>
        </div>
      </section>

      {/* Studio Interactif Layout 2 Colonnes */}
      <section style={{ padding: 'clamp(3rem, 5vw, 5rem) 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start'
          }}>
            
            {/* Colonne Gauche : Aperçu en Direct sur le Vêtement */}
            <div style={{ position: 'sticky', top: '96px' }}>
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.6rem' }}>
                APERÇU EN DIRECT DU FLOCAGE
              </span>
              
              <div style={{
                position: 'relative',
                aspectRatio: '3/4',
                backgroundColor: '#000000',
                border: '1px solid #000000',
                overflow: 'hidden'
              }}>
                {/* Photo du support textile */}
                <img
                  src={selectedSupport.image}
                  alt={selectedSupport.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'none'
                  }}
                />

                {/* Voile très léger pour faire ressortir le flocage */}
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.22)' }} />

                {/* ZONE DE FLOCAGE : NOM & NUMÉRO EN TEMPS RÉEL */}
                <div
                  style={{
                    position: 'absolute',
                    top: selectedPosition.top,
                    left: selectedPosition.left,
                    transform: `translate(-50%, -50%) scale(${selectedPosition.scale})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    maxWidth: '85%',
                    pointerEvents: 'none',
                    zIndex: 10,
                    textShadow: selectedColor.id === 'white'
                      ? '0 2px 8px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)'
                      : '0 2px 8px rgba(255,255,255,0.4)'
                  }}
                >
                  {/* Nom floqué */}
                  {displayText && (
                    <span
                      style={{
                        fontFamily: selectedFont.fontFamily,
                        fontSize: selectedPosition.id === 'coeur' ? '1.15rem' : 'clamp(1.5rem, 3.2vw, 2.4rem)',
                        fontWeight: 700,
                        letterSpacing: selectedFont.letterSpacing,
                        color: selectedColor.hex,
                        lineHeight: 1.1,
                        whiteSpace: 'nowrap',
                        textTransform: 'uppercase'
                      }}
                    >
                      {displayText}
                    </span>
                  )}

                  {/* Numéro floqué */}
                  {displayNumber && (
                    <span
                      style={{
                        fontFamily: selectedFont.fontFamily,
                        fontSize: selectedPosition.id === 'coeur' ? '1.8rem' : 'clamp(3.5rem, 8vw, 5.8rem)',
                        fontWeight: 800,
                        color: selectedColor.hex,
                        lineHeight: 0.95,
                        marginTop: '0.2rem'
                      }}
                    >
                      {displayNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* Récapitulatif discret sous la photo */}
              <div style={{ marginTop: '0.8rem', padding: '0.85rem 1rem', border: '1px solid #E5E5E5', backgroundColor: '#F8F8F8' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: '#555555' }}>
                  Support : <strong>{selectedSupport.name}</strong> • Police : <strong>{selectedFont.name}</strong> • Couleur : <strong>{selectedColor.name}</strong>
                </span>
              </div>
            </div>

            {/* Colonne Droite : Formulaire & Personnalisation Nom/Numéro/Police */}
            <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
                
                {/* 1. Saisie du Nom et Numéro */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.6rem' }}>
                    1. Votre Texte / Nom & Numéro
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.8rem' }}>
                    <div>
                      <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666666', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Nom ou Texte
                      </span>
                      <input
                        type="text"
                        placeholder="Ex: RAPHAËL, BOSS..."
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        className="input-stylist"
                        maxLength={20}
                        style={{ fontWeight: 600, textTransform: 'uppercase' }}
                      />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666666', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Numéro (Optionnel)
                      </span>
                      <input
                        type="text"
                        placeholder="Ex: 07, 10, 23..."
                        value={customNumber}
                        onChange={(e) => setCustomNumber(e.target.value)}
                        className="input-stylist"
                        maxLength={4}
                        style={{ fontWeight: 600 }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Choix de la Police de caractères */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
                      2. Choisir la Police de Caractères
                    </label>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888888' }}>
                      {selectedFont.name}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '0.5rem' }}>
                    {FLOCKING_FONTS.map((font) => (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => setSelectedFont(font)}
                        style={{
                          padding: '0.85rem 0.6rem',
                          border: selectedFont.id === font.id ? '2px solid #000000' : '1px solid #D5D5D5',
                          backgroundColor: selectedFont.id === font.id ? '#000000' : '#FFFFFF',
                          color: selectedFont.id === font.id ? '#FFFFFF' : '#000000',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.3rem',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span
                          style={{
                            fontFamily: font.fontFamily,
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            letterSpacing: font.letterSpacing,
                            lineHeight: 1
                          }}
                        >
                          {customText.trim() ? customText.trim().slice(0, 7).toUpperCase() : font.sample}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.8 }}>
                          {font.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Couleur du marquage */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.6rem' }}>
                    3. Couleur du Flocage
                  </label>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    {FLOCKING_COLORS.map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setSelectedColor(col)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.55rem 0.9rem',
                          border: selectedColor.id === col.id ? '2px solid #000000' : '1px solid #D5D5D5',
                          backgroundColor: '#FFFFFF',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: selectedColor.id === col.id ? 700 : 500
                        }}
                      >
                        <span
                          style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: col.hex,
                            border: '1px solid #999999',
                            display: 'inline-block'
                          }}
                        />
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Choix du support textile */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                    4. Support textile
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '0.5rem' }}>
                    {GARMENT_SUPPORTS.map((sup) => (
                      <button
                        key={sup.id}
                        type="button"
                        onClick={() => setSelectedSupport(sup)}
                        style={{
                          padding: '0.75rem',
                          border: selectedSupport.id === sup.id ? '2px solid #000000' : '1px solid #CCCCCC',
                          backgroundColor: selectedSupport.id === sup.id ? '#000000' : '#FFFFFF',
                          color: selectedSupport.id === sup.id ? '#FFFFFF' : '#000000',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        {sup.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Emplacement */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                    5. Emplacement du flocage
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '0.5rem' }}>
                    {MARKING_POSITIONS.map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => setSelectedPosition(pos)}
                        style={{
                          padding: '0.75rem',
                          border: selectedPosition.id === pos.id ? '2px solid #000000' : '1px solid #CCCCCC',
                          backgroundColor: selectedPosition.id === pos.id ? '#000000' : '#FFFFFF',
                          color: selectedPosition.id === pos.id ? '#FFFFFF' : '#000000',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        {pos.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Quantité & Coordonnées */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Quantité
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="input-stylist"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Votre Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Jean D."
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

                {/* Instructions facultatives */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Remarques ou instructions (Optionnel)
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Dimensions souhaitées, date d'événement particulière..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="input-stylist"
                  />
                </div>

                {/* Bouton de validation WhatsApp */}
                <button
                  type="submit"
                  className="btn-stylist-dark"
                  style={{ width: '100%', padding: '1.15rem' }}
                >
                  <Send size={15} />
                  <span>COMMANDER MON FLOCAGE SUR WHATSAPP</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* BANNIÈRE EXPLICATIVE : POUR LES IMAGES / LOGOS (PAS EN LIGNE) */}
      <section style={{ padding: '4rem 0', backgroundColor: '#F8F8F8', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div
            style={{
              padding: '2.5rem',
              border: '1px solid #000000',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              alignItems: 'flex-start'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Info size={18} color="#000000" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                VOUS SOUHAITEZ UN LOGO D'ENTREPRISE OU UNE IMAGE PERSONNALISÉE ?
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', lineHeight: 1.2, margin: 0 }}>
              Le marquage d'images et logos complexes ne se simule pas en ligne.
            </h3>

            <p style={{ color: '#555555', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '850px', margin: 0 }}>
              Pour garantir une netteté absolue et une tenue irréprochable au lavage, chaque logo, blason ou illustration nécessite une analyse vectorielle et technique spécifique par nos artisans. Envoyez-nous directement votre visuel sur WhatsApp pour recevoir nos conseils et un devis adapté.
            </p>

            <button
              type="button"
              onClick={handleImageOrderWhatsApp}
              className="btn-stylist-outline"
              style={{ marginTop: '0.5rem', padding: '0.85rem 1.6rem' }}
            >
              <MessageCircle size={15} />
              <span>ENVOYER MON LOGO / IMAGE SUR WHATSAPP</span>
            </button>
          </div>
        </div>
      </section>

      {/* Savoir-faire Flocage */}
      <section style={{ padding: '5rem 0' }}>
        <div className="editorial-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
              SAVOIR-FAIRE D'ATELIER
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem' }}>
              Nos Techniques de Marquage
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '2rem', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.6rem' }}>Flocage Flex Haute Densité</h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.6 }}>
                Texture en relief nette, opacité totale et résistance aux lavages répétés. Idéal pour typographies précises, noms et numéros.
              </p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.6rem' }}>Broderie Couture</h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.6 }}>
                Points denses au fil renforcé pour un marquage inaltérable sur vestes, casquettes et pièces structurées.
              </p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.6rem' }}>Sérigraphie Artisanale</h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.6 }}>
                Encres écologiques haute tenue pour séries limitées, collections capsules et associations d'entreprise.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
