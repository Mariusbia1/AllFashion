import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCat, setSelectedCat] = useState(categoryParam || 'ALL');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedSize, setSelectedSize] = useState('ALL');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCat(categoryParam);
    }
  }, [categoryParam]);

  const availableSizes = ['ALL', 'S', 'M', 'L', 'XL', 'Sur-Mesure'];

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (selectedCat !== 'ALL' && p.category !== selectedCat) return false;
      if (selectedSize !== 'ALL' && (!p.sizes || !p.sizes.includes(selectedSize))) return false;
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
  }, [selectedCat, selectedSize, search, sortBy]);

  const resetFilters = () => {
    setSelectedCat('ALL');
    setSelectedSize('ALL');
    setSearch('');
    setSortBy('default');
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '7rem', color: '#000000', overflowX: 'hidden' }}>
      
      {/* Header Éditorial Boutique */}
      <section style={{ backgroundColor: '#F8F8F8', borderBottom: '1px solid #E5E5E5', padding: 'clamp(3rem, 5vw, 4.5rem) 0' }}>
        <div className="editorial-container">
          <span className="tracking-wide-caps" style={{ color: '#888888', display: 'block', marginBottom: '0.6rem' }}>
            BOUTIQUE EN LIGNE
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', lineHeight: 1.1, marginBottom: '0.8rem', color: '#000000' }}>
            Prêt-à-Porter & Séries Limitées
          </h1>
          <p style={{ color: '#555555', fontSize: 'clamp(0.92rem, 1.5vw, 1.05rem)', maxWidth: '640px', lineHeight: 1.6 }}>
            Chaque modèle est confectionné avec rigueur. Validation de votre taille et expédition convenues directement sur WhatsApp.
          </p>
        </div>
      </section>

      {/* CONTENEUR PRINCIPAL AVEC BARRE LATÉRALE DE FILTRES */}
      <div className="editorial-container" style={{ marginTop: '3.5rem' }}>
        
        {/* Barre d'action sur mobile pour ouvrir les filtres */}
        <div className="shop-mobile-filter-bar" style={{
          display: 'none',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid #E5E5E5',
          marginBottom: '2rem'
        }}>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="btn-stylist-outline"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <SlidersHorizontal size={14} />
            <span>FILTRER ({filtered.length} pièces)</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-stylist"
            style={{ width: 'auto', padding: '0.6rem 0.9rem', fontSize: '0.78rem' }}
          >
            <option value="default">Tri par défaut</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>

        {/* LAYOUT 2 COLONNES : SIDEBAR LATÉRALE GAUCHE (270px) + GRILLE PRODUITS DROITE */}
        <div className="shop-layout-grid" style={{
          display: 'grid',
          gridTemplateColumns: '270px 1fr',
          gap: '3.5rem',
          alignItems: 'start'
        }}>
          
          {/* =========================================================================
              SIDEBAR FILTRES LATÉRALE GAUCHE
              "Trier par" et "Réinitialiser" placés TOUT EN HAUT comme demandé
              ========================================================================= */}
          <aside className={`shop-sidebar ${mobileFilterOpen ? 'active' : ''}`} style={{
            position: 'sticky',
            top: '95px',
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid #E5E5E5',
            paddingRight: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            
            {/* Header sidebar (Mobile close button) */}
            <div className="shop-sidebar-mobile-header" style={{
              display: 'none',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '1rem',
              borderBottom: '1px solid #000000'
            }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700 }}>
                FILTRES
              </span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* 1. TRIER PAR : TOUT EN HAUT */}
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.6rem'
              }}>
                Trier par
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-stylist"
                style={{ padding: '0.7rem 0.8rem', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                <option value="default">Sélection du créateur</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
              </select>
            </div>

            {/* 2. RÉINITIALISER LES FILTRES : TOUT EN HAUT ÉGALEMENT */}
            <div>
              <button
                type="button"
                onClick={resetFilters}
                className="btn-stylist-outline"
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <RotateCcw size={13} />
                <span>RÉINITIALISER LES FILTRES</span>
              </button>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #E5E5E5', margin: '0.5rem 0' }} />

            {/* 3. Recherche par mot-clé */}
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.6rem'
              }}>
                Recherche
              </span>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Rechercher une pièce..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-stylist"
                  style={{ padding: '0.7rem 0.8rem 0.7rem 2.2rem', fontSize: '0.82rem' }}
                />
                <Search size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
              </div>
            </div>

            {/* 4. Catégories & Univers */}
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.6rem'
              }}>
                Univers & Catégories
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCat === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCat(cat.id);
                        setMobileFilterOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.65rem 0.8rem',
                        backgroundColor: isSelected ? '#000000' : 'transparent',
                        color: isSelected ? '#FFFFFF' : '#000000',
                        border: 'none',
                        textAlign: 'left',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.82rem',
                        fontWeight: isSelected ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{cat.name}</span>
                      {cat.count && (
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: isSelected ? '#CCCCCC' : '#888888'
                        }}>
                          {cat.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Tailles disponibles */}
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.6rem'
              }}>
                Tailles
              </span>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {availableSizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '0.5rem 0.9rem',
                        border: isSelected ? '2px solid #000000' : '1px solid #CCCCCC',
                        backgroundColor: isSelected ? '#000000' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#000000',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {s === 'ALL' ? 'Toutes' : s}
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* =========================================================================
              COLONNE PRODUITS : EXACTEMENT 3 PRODUITS PAR LIGNE SUR DESKTOP
              ========================================================================= */}
          <div>
            {/* Compteur et statut actif */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '1.2rem',
              borderBottom: '1px solid #E5E5E5',
              marginBottom: '2.5rem'
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', color: '#666666' }}>
                Affichage de <strong>{filtered.length} pièces</strong> de prêt-à-porter
              </span>

              {selectedCat !== 'ALL' && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#000000', fontWeight: 600 }}>
                  Catégorie : {CATEGORIES.find((c) => c.id === selectedCat)?.name}
                </span>
              )}
            </div>

            {/* Grille des Produits : STRICTEMENT 3 PAR LIGNE */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '6rem 0' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', textTransform: 'uppercase', color: '#888888' }}>
                  Aucune pièce ne correspond à ces critères de recherche.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn-stylist-outline"
                  style={{ marginTop: '1.5rem' }}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="shop-products-grid">
                {filtered.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
