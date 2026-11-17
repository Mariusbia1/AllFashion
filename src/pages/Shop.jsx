import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function Shop() {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (selectedCat !== 'ALL' && p.category !== selectedCat) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q));
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedCat, search, sortBy]);

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '7rem' }}>
      
      {/* Header Éditorial Boutique */}
      <section style={{ backgroundColor: '#F8F8F8', borderBottom: '1px solid #E5E5E5', padding: '5rem 0' }}>
        <div className="editorial-container">
          <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.6rem' }}>
            BOUTIQUE EN LIGNE
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.4rem', lineHeight: 1.1, marginBottom: '1rem' }}>
            Prêt-à-Porter & Séries Limitées
          </h1>
          <p style={{ color: '#555555', fontSize: '1rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Chaque modèle est confectionné avec rigueur. Validation de votre taille et expédition convenues directement sur WhatsApp.
          </p>
        </div>
      </section>

      {/* Barre de contrôles & Filtres sans arrondis */}
      <div className="editorial-container" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '2rem',
          borderBottom: '1px solid #E5E5E5'
        }}>
          {/* Catégories Onglets */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                style={{
                  padding: '0.6rem 1.1rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: selectedCat === cat.id ? 700 : 500,
                  backgroundColor: selectedCat === cat.id ? '#000000' : 'transparent',
                  color: selectedCat === cat.id ? '#FFFFFF' : '#000000',
                  border: '1px solid #000000',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Recherche & Tri */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-stylist"
                style={{ padding: '0.6rem 0.8rem 0.6rem 2.2rem', fontSize: '0.8rem' }}
              />
              <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-stylist"
              style={{ width: 'auto', padding: '0.6rem 1rem', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              <option value="default">Tri par défaut</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Grille des Produits */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', textTransform: 'uppercase', color: '#888888' }}>
              Aucune pièce trouvée pour cette recherche.
            </p>
            <button
              type="button"
              onClick={() => { setSelectedCat('ALL'); setSearch(''); }}
              className="btn-stylist-outline"
              style={{ marginTop: '1.5rem' }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '2.5rem'
          }}>
            {filtered.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
