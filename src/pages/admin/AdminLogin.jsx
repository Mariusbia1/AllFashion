import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Identifiant ou mot de passe incorrect.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        
        {/* Lien retour au site public */}
        <Link
          to="/"
          style={{
            color: '#888888',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}
        >
          <ArrowLeft size={14} />
          <span>Retour au site AllFashion</span>
        </Link>

        {/* Boîte d'authentification */}
        <div style={{
          backgroundColor: '#0D0D0D',
          border: '1px solid #262626',
          padding: 'clamp(2rem, 5vw, 3rem)'
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              display: 'block'
            }}>
              AllFashion
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              color: '#888888',
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '4px'
            }}>
              ESPACE GESTION & ADMINISTRATION
            </span>
          </div>

          {error && (
            <div style={{
              backgroundColor: 'rgba(255, 68, 68, 0.12)',
              border: '1px solid #FF4444',
              color: '#FF6666',
              padding: '0.8rem 1rem',
              fontSize: '0.8rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.4rem',
                color: '#CCCCCC'
              }}>
                Identifiant
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  backgroundColor: '#171717',
                  border: '1px solid #333333',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.4rem',
                color: '#CCCCCC'
              }}>
                Mot de Passe
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  backgroundColor: '#171717',
                  border: '1px solid #333333',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '0.6rem',
                padding: '1rem',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem'
              }}
            >
              <Lock size={15} />
              <span>CONNEXION ADMIN</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            paddingTop: '1.2rem',
            borderTop: '1px solid #222222',
            textAlign: 'center',
            fontSize: '0.72rem',
            color: '#666666',
            fontFamily: 'var(--font-mono)'
          }}>
            <span>Accès sécurisé pour le styliste et l'équipe AllFashion</span>
          </div>
        </div>

      </div>
    </div>
  );
}
