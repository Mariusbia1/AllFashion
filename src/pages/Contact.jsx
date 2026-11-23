import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, MessageSquare } from 'lucide-react';
import { STYLIST_WHATSAPP_NUMBER } from '../data/products';

const FAQS = [
  {
    q: "Comment se déroule la prise de mesure chez vous ?",
    a: "Le styliste se déplace directement à votre domicile ou à votre bureau à Cotonou et ses environs avec ses échantillons de tissus et son mètre ruban. En 30 minutes, il prend vos mesures et note tous les détails de votre tenue."
  },
  {
    q: "Comment s'effectue la commande d'une pièce ?",
    a: "Vous choisissez votre vêtement sur le site et vous cliquez sur Commander. Vous êtes automatiquement redirigé vers WhatsApp pour échanger directement avec le styliste et convenir de la livraison."
  },
  {
    q: "Quels sont les délais pour une tenue sur-mesure ?",
    a: "Le délai moyen est de 7 à 14 jours selon le modèle choisi et le temps nécessaire pour un essayage parfait."
  },
  {
    q: "Faites-vous du flocage pour des groupes ou entreprises ?",
    a: "Oui, nous personnalisons les vêtements à l'unité comme en grandes séries (t-shirts, polos, vestes) avec des tarifs préférentiels."
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Question générale',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let msg = `*MESSAGE DE CONTACT — SITE INTERNET*\n`;
    msg += `-----------------------------------\n`;
    msg += `De : ${formData.name}\n`;
    msg += `Téléphone : ${formData.phone}\n`;
    msg += `Objet : ${formData.subject}\n`;
    msg += `-----------------------------------\n`;
    msg += `Message : ${formData.message}\n`;

    window.open(`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '7rem' }}>
      
      {/* Header */}
      <section style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '6rem 0', borderBottom: '1px solid #000000' }}>
        <div className="editorial-container">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#888888', display: 'block', marginBottom: '0.8rem' }}>
            CONTACT DIRECT & LOCALISATION
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', lineHeight: 1.05, marginBottom: '1.5rem', color: '#FFFFFF' }}>
            Contacter le Styliste.
          </h1>
          <p style={{ color: '#CCCCCC', fontSize: '1.05rem', maxWidth: '640px', lineHeight: 1.6 }}>
            Une question sur une pièce, un projet sur-mesure ou une demande de flocage ? Échangez directement avec le créateur.
          </p>
        </div>
      </section>

      {/* Coordonnées & Formulaire */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start'
          }}>
            
            {/* Colonne Gauche : Cartouche Infos */}
            <div>
              <div style={{ padding: '2.5rem', backgroundColor: '#000000', color: '#FFFFFF', border: '2px solid #000000', marginBottom: '2.5rem' }}>
                <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.6rem' }}>
                  CANAL PRIORITAIRE
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem', color: '#FFFFFF' }}>
                  Échange Direct sur WhatsApp
                </h3>
                <p style={{ color: '#CCCCCC', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.8rem' }}>
                  Pour une réponse immédiate, l’envoi de photos de modèles ou un conseil personnalisé de coupe.
                </p>
                <a
                  href={`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite échanger directement avec le styliste.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-stylist-inverse"
                >
                  <MessageSquare size={16} />
                  <span>OUVRIR WHATSAPP</span>
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.6rem', border: '1px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>Atelier & Showroom</h4>
                    <p style={{ fontSize: '0.85rem', color: '#555555', marginTop: '0.2rem' }}>
                      Cotonou, Bénin (Haie Vive / Cadjehoun)<br />
                      Déplacement VIP possible sur tout Cotonou & environs.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.6rem', border: '1px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>Horaires d'Ouverture</h4>
                    <p style={{ fontSize: '0.85rem', color: '#555555', marginTop: '0.2rem' }}>
                      Lundi au Samedi : 09h00 - 20h00<br />
                      Sur rendez-vous uniquement.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.6rem', border: '1px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>Courriel</h4>
                    <p style={{ fontSize: '0.85rem', color: '#555555', marginTop: '0.2rem' }}>
                      contact@atelier-createur.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Formulaire */}
            <div style={{ padding: '2.5rem', border: '2px solid #000000', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>
                Transmettre un Message
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Votre Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Jean DUPONT"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-stylist"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Objet de votre demande
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-stylist"
                  >
                    <option value="Question sur le prêt-à-porter">Question sur le prêt-à-porter</option>
                    <option value="Demande de confection sur-mesure">Demande de confection sur-mesure</option>
                    <option value="Projet de flocage / personnalisation">Projet de flocage / personnalisation</option>
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Votre Message *
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Détaillez votre projet..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-stylist"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-stylist-dark"
                  style={{ width: '100%', padding: '1.1rem' }}
                >
                  <Send size={15} />
                  <span>ENVOYER SUR WHATSAPP</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '6rem 0' }}>
        <div className="editorial-container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
              QUESTIONS FRÉQUENTES
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem' }}>
              Foire Aux Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      padding: '1.3rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.4rem', color: '#555555', fontSize: '0.9rem', lineHeight: 1.6, borderTop: '1px solid #EEEEEE' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
