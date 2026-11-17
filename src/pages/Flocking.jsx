import React, { useState } from 'react';
import { Upload, Send, Sparkles, Layers, ShieldCheck, Check } from 'lucide-react';
import { STYLIST_WHATSAPP_NUMBER } from '../data/products';

const GARMENT_SUPPORTS = [
  { id: 'hoodie', name: 'Hoodie Oversize Coton Lourd', image: '/assets/img/creation-4.jpg' },
  { id: 'tshirt', name: 'T-Shirt Signature 380 GSM', image: '/assets/img/creation-1.jpg' },
  { id: 'veste', name: 'Veste Structurée Capsule', image: '/assets/img/creation-3.jpg' },
  { id: 'sweat', name: 'Sweat Minimal Col Rond', image: '/assets/img/creation-5.jpg' }
];

const MARKING_POSITIONS = [
  { id: 'dos', name: 'Dos Centré (Grand Format)', top: '40%', left: '50%', width: '110px', height: '110px' },
  { id: 'coeur', name: 'Cœur Centré', top: '34%', left: '50%', width: '70px', height: '70px' },
  { id: 'poitrine-gauche', name: 'Poitrine Gauche', top: '32%', left: '38%', width: '60px', height: '60px' },
  { id: 'manche', name: 'Manche Droite', top: '42%', left: '22%', width: '50px', height: '50px' }
];

export default function Flocking() {
  const [selectedSupport, setSelectedSupport] = useState(GARMENT_SUPPORTS[0]);
  const [selectedPosition, setSelectedPosition] = useState(MARKING_POSITIONS[0]);
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [logoName, setLogoName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedLogo(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert('Veuillez renseigner votre nom et numéro WhatsApp.');
      return;
    }

    // Référence Devis Flocage
    const ref = `FLOC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let msg = `*DEMANDE DE DEVIS — FLOCAGE & PERSONNALISATION*\n`;
    msg += `Référence : ${ref}\n`;
    msg += `-----------------------------------\n`;
    msg += `Client : ${clientName}\n`;
    msg += `Téléphone : ${clientPhone}\n`;
    msg += `Support textile : ${selectedSupport.name}\n`;
    msg += `Emplacement : ${selectedPosition.name}\n`;
    msg += `Quantité : ${quantity} pièce(s)\n`;
    if (logoName) {
      msg += `Fichier visuel : ${logoName} (Transmis ci-joint dans la discussion)\n`;
    }
    if (instructions.trim()) {
      msg += `Instructions : ${instructions.trim()}\n`;
    }
    msg += `-----------------------------------\n`;
    msg += `Bonjour, je vous transmets mon projet de personnalisation textile. Pouvez-vous me confirmer la faisabilité et m’établir un devis ? (Je vous joins également mon fichier visuel).`;

    window.open(`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '7rem' }}>
      
      {/* Header Flocage */}
      <section style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '6rem 0', borderBottom: '1px solid #000000' }}>
        <div className="editorial-container">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#888888', display: 'block', marginBottom: '0.8rem' }}>
            STUDIO DE PERSONNALISATION TEXTILE & MARQUAGE
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', lineHeight: 1.05, marginBottom: '1.5rem', color: '#FFFFFF' }}>
            Flocage & Pièces Personnalisées.
          </h1>
          <p style={{ color: '#CCCCCC', fontSize: '1.05rem', maxWidth: '640px', lineHeight: 1.6 }}>
            Importez votre logo ou typographie, visualisez le rendu en direct sur nos vêtements et transmettez votre demande sur WhatsApp pour validation et devis instantané.
          </p>
        </div>
      </section>

      {/* Studio Interactif Layout 2 Colonnes */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '4rem',
            alignItems: 'start'
          }}>
            
            {/* Visualiseur interactif (Mockup avec superposition) */}
            <div>
              <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.6rem' }}>
                APERÇU EN DIRECT
              </span>
              <div style={{
                position: 'relative',
                aspectRatio: '3/4',
                backgroundColor: '#000000',
                border: '2px solid #000000',
                overflow: 'hidden'
              }}>
                {/* Photo du support */}
                <img
                  src={selectedSupport.image}
                  alt={selectedSupport.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)'
                  }}
                />

                {/* Superposition du logo client */}
                <div
                  style={{
                    position: 'absolute',
                    top: selectedPosition.top,
                    left: selectedPosition.left,
                    width: selectedPosition.width,
                    height: selectedPosition.height,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #FFFFFF',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(1px)',
                    zIndex: 10
                  }}
                >
                  {uploadedLogo ? (
                    <img
                      src={uploadedLogo}
                      alt="Logo client"
                      style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
                    />
                  ) : (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      VOTRE LOGO
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #E5E5E5', backgroundColor: '#F8F8F8' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', color: '#666666' }}>
                  Support : <strong>{selectedSupport.name}</strong> • Emplacement : <strong>{selectedPosition.name}</strong>
                </span>
              </div>
            </div>

            {/* Formulaire de configuration */}
            <div style={{ padding: '2.5rem', border: '2px solid #000000', backgroundColor: '#FFFFFF' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                
                {/* 1. Choix du support */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                    1. Sélection du support textile
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {GARMENT_SUPPORTS.map((sup) => (
                      <button
                        key={sup.id}
                        type="button"
                        onClick={() => setSelectedSupport(sup)}
                        style={{
                          padding: '0.8rem',
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

                {/* 2. Emplacement du marquage */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                    2. Emplacement du marquage
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {MARKING_POSITIONS.map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => setSelectedPosition(pos)}
                        style={{
                          padding: '0.8rem',
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

                {/* 3. Téléversement du logo */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                    3. Importer votre visuel / logo
                  </label>
                  <label
                    htmlFor="logo-input"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1.8rem',
                      border: '1px dashed #000000',
                      backgroundColor: '#FBFBFB',
                      cursor: 'pointer'
                    }}
                  >
                    <Upload size={20} style={{ marginBottom: '0.5rem' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                      {logoName ? `Fichier chargé : ${logoName}` : 'Cliquer pour charger votre fichier (PNG, JPG, SVG, PDF)'}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#888888', marginTop: '0.2rem' }}>
                      Poids maximum 5 Mo • Fond transparent recommandé
                    </span>
                    <input
                      id="logo-input"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* 4. Quantité & Coordonnées */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Quantité souhaitée
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="input-stylist"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Votre Nom *
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

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Instructions particulières
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Couleurs d'impression, dimensions exactes, date d'événement..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="input-stylist"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-stylist-dark"
                  style={{ width: '100%', padding: '1.1rem' }}
                >
                  <Send size={15} />
                  <span>ENVOYER LE PROJET SUR WHATSAPP</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Techniques de Marquage */}
      <section style={{ padding: '5rem 0' }}>
        <div className="editorial-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
              SAVOIR-FAIRE
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem' }}>
              Nos Techniques de Marquage
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '2rem', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.6rem' }}>Flocage Flex Haute Définition</h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.6 }}>
                Texture en relief nette, grande résistance aux lavages. Idéal pour typographies épurées et géométrie monochrome.
              </p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.6rem' }}>Sérigraphie Artisanale</h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.6 }}>
                Encres haute densité opaques pour tirages en séries limitées, collections capsules et associations d'entreprise.
              </p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.6rem' }}>Broderie Couture</h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.6 }}>
                Points denses au fil renforcé pour un marquage inaltérable sur vestes, casquettes et pièces structurées.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
