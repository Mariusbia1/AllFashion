import React, { useState } from 'react';
import { MessageSquare, X, Send, Scissors, ShoppingBag, Sparkles, HelpCircle } from 'lucide-react';
import { STYLIST_WHATSAPP_NUMBER } from '../data/products';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickTopics = [
    {
      id: 'rdv',
      icon: <Scissors size={15} />,
      title: 'Prise de RDV Sur-Mesure',
      desc: 'Déplacement VIP à domicile ou consultation à l’Atelier',
      prefill: 'Bonjour, je souhaite bloquer une consultation et prise de mesure sur-mesure.'
    },
    {
      id: 'shop',
      icon: <ShoppingBag size={15} />,
      title: 'Question Prêt-à-Porter',
      desc: 'Disponibilité des tailles, matières & délais de livraison',
      prefill: 'Bonjour, j’ai une question concernant vos pièces de prêt-à-porter.'
    },
    {
      id: 'flocage',
      icon: <Sparkles size={15} />,
      title: 'Studio de Flocage',
      desc: 'Personnalisation textile, broderie & séries limitées',
      prefill: 'Bonjour, je souhaite un devis pour la personnalisation / flocage de vêtements.'
    },
    {
      id: 'conseil',
      icon: <HelpCircle size={15} />,
      title: 'Conseil Styliste Direct',
      desc: 'Échanger directement avec le créateur',
      prefill: 'Bonjour, je souhaite un conseil personnalisé pour un projet vestimentaire.'
    }
  ];

  const handleOpenWhatsApp = (text) => {
    const finalMsg = customMsg.trim() ? `${text}\nPrécisions : ${customMsg.trim()}` : text;
    window.open(`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMsg)}`, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 900 }}>
      {/* Fenêtre pop-up de discussion styliste */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '4rem',
            right: 0,
            width: '360px',
            backgroundColor: '#FFFFFF',
            border: '2px solid #000000',
            boxShadow: '0 12px 35px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column'
          }}
          className="fade-in-element"
        >
          {/* Header Monochrome strict */}
          <div
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              padding: '1.2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888888', display: 'block' }}>
                CANAL PRIORITAIRE
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
                Assistant Styliste WhatsApp
              </h4>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Corps de sélection des motifs */}
          <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', backgroundColor: '#FBFBFB' }}>
            <p style={{ fontSize: '0.78rem', color: '#555555' }}>
              Sélectionnez l’objet de votre échange pour ouvrir instantanément votre discussion privée avec le créateur :
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {quickTopics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleOpenWhatsApp(topic.prefill)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.8rem',
                    padding: '0.8rem',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CCCCCC',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#000000';
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#CCCCCC';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                  }}
                >
                  <div style={{ marginTop: '2px' }}>{topic.icon}</div>
                  <div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block' }}>{topic.title}</span>
                    <span style={{ fontSize: '0.72rem', opacity: 0.75 }}>{topic.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Message libre optionnel */}
            <div style={{ marginTop: '0.6rem' }}>
              <input
                type="text"
                placeholder="Votre message spécifique..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="input-stylist"
                style={{ padding: '0.6rem 0.8rem', fontSize: '0.8rem' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bouton Rond ou Carré déclencheur (Noir et Blanc strict) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          backgroundColor: '#000000',
          color: '#FFFFFF',
          border: '2px solid #FFFFFF',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Ouvrir l'échange WhatsApp avec le Styliste"
      >
        <MessageSquare size={22} />
      </button>
    </div>
  );
}
