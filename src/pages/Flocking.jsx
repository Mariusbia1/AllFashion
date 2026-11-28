import React from 'react';
import { MessageCircle, Sparkles, Check, ArrowRight, ShieldCheck, Clock, Users } from 'lucide-react';
import { STYLIST_WHATSAPP_NUMBER } from '../data/products';

export default function Flocking() {
  const openWhatsApp = (type = 'general') => {
    let msg = '';
    if (type === 'logo') {
      msg = 'Bonjour AllFashion, je souhaite vous envoyer un logo ou une image pour faire un flocage sur vêtement.';
    } else if (type === 'serie') {
      msg = 'Bonjour AllFashion, je souhaite un devis pour floquer une série de vêtements (entreprise, club ou groupe).';
    } else {
      msg = 'Bonjour AllFashion, je souhaite personnaliser un vêtement avec du flocage (nom, numéro ou texte). Pouvez-vous m’indiquer vos tarifs et délais ?';
    }
    window.open(`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '7rem', color: '#000000', overflowX: 'hidden' }}>
      
      {/* 1. Header Éditorial */}
      <section style={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: 'clamp(3.5rem, 6vw, 5.5rem) 0',
        borderBottom: '1px solid #000000'
      }}>
        <div className="editorial-container">
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#888888',
            display: 'block',
            marginBottom: '0.8rem',
            fontWeight: 600
          }}>
            PERSONNALISATION TEXTILE
          </span>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            lineHeight: 1.05,
            marginBottom: '1.2rem',
            color: '#FFFFFF'
          }}>
            Flocage & Personnalisation.
          </h1>
          <p style={{
            color: '#CCCCCC',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
            maxWidth: '680px',
            lineHeight: 1.6
          }}>
            Personnalisez vos t-shirts, polos, hoodies, vestes ou casquettes avec votre nom, votre numéro ou le logo de votre entreprise. Contactez directement le styliste sur WhatsApp pour échanger sur votre projet en toute simplicité.
          </p>
        </div>
      </section>

      {/* 2. Bloc Principal d'Action WhatsApp : Rapide et sans formulaire */}
      <section style={{ padding: 'clamp(3rem, 5vw, 4.5rem) 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            border: '2px solid #000000',
            backgroundColor: '#FAFAFA',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.4rem 0.9rem',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '1.4rem'
            }}>
              <Sparkles size={14} />
              <span>PAS DE FORMULAIRE COMPLIQUÉ</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              lineHeight: 1.15,
              marginBottom: '1rem',
              maxWidth: '720px'
            }}>
              Échangez directement avec le styliste pour votre flocage
            </h2>

            <p style={{
              color: '#555555',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              maxWidth: '620px',
              lineHeight: 1.6,
              marginBottom: '2.4rem'
            }}>
              Envoyez-nous simplement un message sur WhatsApp avec ce que vous souhaitez inscrire (votre nom, un chiffre ou votre logo). On vous répond immédiatement avec le modèle, les couleurs et le devis.
            </p>

            {/* Boutons d'action WhatsApp directs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => openWhatsApp('general')}
                className="btn-stylist-inverse"
                style={{
                  padding: '1.1rem 2.4rem',
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.7rem'
                }}
              >
                <MessageCircle size={18} />
                <span>DISCUTER SUR WHATSAPP</span>
              </button>

              <button
                type="button"
                onClick={() => openWhatsApp('logo')}
                className="btn-stylist-outline"
                style={{
                  padding: '1.1rem 2.2rem',
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.7rem'
                }}
              >
                <MessageCircle size={18} />
                <span>ENVOYER UN LOGO OU IMAGE</span>
              </button>
            </div>

            <span style={{
              display: 'block',
              marginTop: '1.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#777777'
            }}>
              Réponse rapide • Atelier basé à Cotonou
            </span>
          </div>
        </div>
      </section>

      {/* 3. Les 3 Prestations de Flocage */}
      <section style={{ padding: 'clamp(3.5rem, 6vw, 5.5rem) 0', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
              CE QUE NOUS FAISONS
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.6rem)' }}>
              Nos Formats de Personnalisation
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.8rem'
          }}>
            {/* Format 1 : Nom & Numéro */}
            <div style={{
              padding: '2.2rem 1.8rem',
              border: '1px solid #000000',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#666666',
                  display: 'block',
                  marginBottom: '0.6rem'
                }}>
                  INDIVIDUEL & STYLE
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.8rem' }}>
                  Nom & Numéro
                </h3>
                <p style={{ color: '#555555', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Idéal pour t-shirts, maillots et hoodies. Inscrivez votre prénom, nom, surnom ou chiffre fétiche avec une police soignée et durable.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <Check size={15} color="#000000" />
                    <span>Grand format dos ou poitrine</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <Check size={15} color="#000000" />
                    <span>Polices élégantes au choix</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <Check size={15} color="#000000" />
                    <span>Dès 1 pièce</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => openWhatsApp('general')}
                className="btn-stylist-outline"
                style={{ width: '100%', padding: '0.8rem', fontSize: '0.75rem' }}
              >
                <span>COMMANDER SUR WHATSAPP</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Format 2 : Logos d'Entreprises & Groupes */}
            <div style={{
              padding: '2.2rem 1.8rem',
              border: '1px solid #000000',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#AAAAAA',
                  display: 'block',
                  marginBottom: '0.6rem'
                }}>
                  PROFESSIONNEL & ÉVÉNEMENTS
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.8rem', color: '#FFFFFF' }}>
                  Logos & Séries
                </h3>
                <p style={{ color: '#CCCCCC', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Personnalisation pour entreprises, associations, anniversaires et événements. Polos, chemises et casquettes avec votre identité visuelle.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <Check size={15} color="#FFFFFF" />
                    <span>Reproduction exacte de votre logo</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <Check size={15} color="#FFFFFF" />
                    <span>Tarifs dégressifs par quantité</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <Check size={15} color="#FFFFFF" />
                    <span>Devis rapide sous 1 heure</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => openWhatsApp('serie')}
                className="btn-stylist-inverse"
                style={{ width: '100%', padding: '0.8rem', fontSize: '0.75rem', backgroundColor: '#FFFFFF', color: '#000000' }}
              >
                <span>DEMANDER UN DEVIS SÉRIE</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Format 3 : Marquage Créatif & Broderie */}
            <div style={{
              padding: '2.2rem 1.8rem',
              border: '1px solid #000000',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#666666',
                  display: 'block',
                  marginBottom: '0.6rem'
                }}>
                  FINITIONS SUR-MESURE
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.8rem' }}>
                  Flocage Créatif
                </h3>
                <p style={{ color: '#555555', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Pour les vestes, pièces capsules ou créations spéciales. Marquage en relief, effet mat ou doré avec finitions couture d'atelier.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <Check size={15} color="#000000" />
                    <span>Finitions haute précision</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <Check size={15} color="#000000" />
                    <span>Tenue renforcée au lavage</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <Check size={15} color="#000000" />
                    <span>Conseils du styliste créateur</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => openWhatsApp('general')}
                className="btn-stylist-outline"
                style={{ width: '100%', padding: '0.8rem', fontSize: '0.75rem' }}
              >
                <span>DISCUTER SUR WHATSAPP</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Les 3 Étapes Ultra Simples */}
      <section style={{ padding: 'clamp(3.5rem, 5vw, 5rem) 0', backgroundColor: '#F8F8F8', borderBottom: '1px solid #E5E5E5' }}>
        <div className="editorial-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.4rem' }}>
              COMMENT ÇA FONCTIONNE
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.6rem)' }}>
              Simple en 3 Étapes
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{ padding: '2rem 1.6rem', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                01
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                Vous envoyez votre idée
              </h3>
              <p style={{ color: '#666666', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Un message WhatsApp avec votre nom, texte ou photo de logo, et le vêtement que vous souhaitez personnaliser.
              </p>
            </div>

            <div style={{ padding: '2rem 1.6rem', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                02
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                Validation rapide
              </h3>
              <p style={{ color: '#666666', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Le styliste vous montre un aperçu, vous conseille sur les couleurs et vous donne le tarif exact et le délai.
              </p>
            </div>

            <div style={{ padding: '2rem 1.6rem', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                03
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                Atelier & Livraison
              </h3>
              <p style={{ color: '#666666', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Le flocage est réalisé avec soin dans notre atelier et votre vêtement est prêt à être récupéré ou livré à Cotonou.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Garanties Atelier */}
      <section style={{ padding: 'clamp(3rem, 5vw, 4.5rem) 0' }}>
        <div className="editorial-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ padding: '1.8rem 1.2rem', border: '1px solid #E5E5E5' }}>
              <ShieldCheck size={28} style={{ margin: '0 auto 0.8rem auto' }} />
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.3rem' }}>
                Tenue Durable
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#666666' }}>
                Flocage de qualité professionnelle résistant aux lavages fréquents.
              </p>
            </div>

            <div style={{ padding: '1.8rem 1.2rem', border: '1px solid #E5E5E5' }}>
              <Users size={28} style={{ margin: '0 auto 0.8rem auto' }} />
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.3rem' }}>
                À l’Unité ou en Série
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#666666' }}>
                Disponible pour un seul vêtement ou pour 100+ pièces d’entreprise.
              </p>
            </div>

            <div style={{ padding: '1.8rem 1.2rem', border: '1px solid #E5E5E5' }}>
              <Clock size={28} style={{ margin: '0 auto 0.8rem auto' }} />
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.3rem' }}>
                Délai Rapide
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#666666' }}>
                Confection rapide en 24h à 72h selon la quantité.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
