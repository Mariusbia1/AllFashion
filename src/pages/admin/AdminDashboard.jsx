import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Calendar,
  Image as ImageIcon,
  Database,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageCircle,
  Search,
  ExternalLink,
  Save,
  X,
  Menu
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function AdminDashboard() {
  const {
    products,
    categories,
    orders,
    appointments,
    realisations,
    isAdmin,
    logout,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateAppointmentStatus,
    addRealisation,
    deleteRealisation
  } = useStore();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Filtres / Recherche
  const [prodSearch, setProdSearch] = useState('');
  const [prodCategory, setProdCategory] = useState('ALL');

  // Modal Ajout Produit
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'HOMME',
    price: '',
    image: '/images/look-imprime-2.jpg',
    description: '',
    sizes: 'S, M, L, XL',
    inStock: true,
    isNew: true,
    isBestSeller: false
  });

  // Modal Édition Produit
  const [editingProd, setEditingProd] = useState(null);

  // Redirection si non authentifié
  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  // Calculs statistiques
  const totalRevenue = orders
    .filter((o) => o.status === 'confirmee' || o.status === 'livree')
    .reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  const pendingOrders = orders.filter((o) => o.status === 'en_attente').length;
  const pendingAppointments = appointments.filter((a) => a.status === 'a_confirmer').length;
  const outOfStockProducts = products.filter((p) => p.inStock === false).length;

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      alert('Veuillez renseigner au moins le nom et le prix du vêtement.');
      return;
    }

    const sizesArr = newProd.sizes.split(',').map((s) => s.trim()).filter(Boolean);

    addProduct({
      name: newProd.name,
      category: newProd.category,
      price: Number(newProd.price),
      image: newProd.image || '/images/look-imprime-2.jpg',
      description: newProd.description,
      sizes: sizesArr.length ? sizesArr : ['Sur-Mesure', 'M', 'L'],
      inStock: newProd.inStock,
      isNew: newProd.isNew,
      isBestSeller: newProd.isBestSeller
    });

    setIsAddModalOpen(false);
    setNewProd({
      name: '',
      category: 'HOMME',
      price: '',
      image: '/images/look-imprime-2.jpg',
      description: '',
      sizes: 'S, M, L, XL',
      inStock: true,
      isNew: true,
      isBestSeller: false
    });
  };

  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();
    if (!editingProd) return;
    updateProduct(editingProd.id, {
      name: editingProd.name,
      category: editingProd.category,
      price: Number(editingProd.price),
      inStock: editingProd.inStock,
      description: editingProd.description
    });
    setEditingProd(null);
  };

  const filteredProducts = products.filter((p) => {
    if (prodCategory !== 'ALL' && p.category !== prodCategory) return false;
    if (prodSearch.trim()) {
      return p.name.toLowerCase().includes(prodSearch.toLowerCase());
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4F4F4', color: '#000000', fontFamily: 'var(--font-sans)' }}>
      
      {/* SIDEBAR NAVIGATION ADMIN */}
      <aside style={{
        width: '260px',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem 1rem',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 100
      }} className="admin-sidebar">
        
        <div>
          {/* Logo Styliste */}
          <div style={{ padding: '0.5rem 0.5rem 1.8rem 0.5rem', borderBottom: '1px solid #222222' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, display: 'block', lineHeight: 1 }}>
              AllFashion
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.2em', color: '#888888', textTransform: 'uppercase', display: 'block', marginTop: '4px' }}>
              ADMINISTRATION
            </span>
          </div>

          {/* Liens de menu */}
          <nav style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[
              { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={17} /> },
              { id: 'products', label: `Vêtements (${products.length})`, icon: <ShoppingBag size={17} /> },
              { id: 'orders', label: `Commandes (${orders.length})`, icon: <Package size={17} />, badge: pendingOrders },
              { id: 'appointments', label: `Rendez-vous (${appointments.length})`, icon: <Calendar size={17} />, badge: pendingAppointments },
              { id: 'realisations', label: 'Galerie / Réalisations', icon: <ImageIcon size={17} /> },
              { id: 'database', label: 'Base de données', icon: <Database size={17} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileSidebarOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                  color: activeTab === tab.id ? '#000000' : '#CCCCCC',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.badge > 0 && (
                  <span style={{
                    backgroundColor: activeTab === tab.id ? '#000000' : '#FFFFFF',
                    color: activeTab === tab.id ? '#FFFFFF' : '#000000',
                    fontSize: '0.65rem',
                    padding: '0.15rem 0.45rem',
                    fontWeight: 700
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Liens bas de sidebar */}
        <div style={{ borderTop: '1px solid #222222', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              color: '#888888',
              textDecoration: 'none',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.5rem'
            }}
          >
            <ExternalLink size={14} />
            <span>Voir le site en direct</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            style={{
              backgroundColor: 'transparent',
              color: '#FF6666',
              border: '1px solid #331111',
              padding: '0.65rem 0.8rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              justifyContent: 'center'
            }}
          >
            <LogOut size={14} />
            <span>Déconnexion</span>
          </button>
        </div>

      </aside>

      {/* ZONE DE CONTENU PRINCIPALE */}
      <main style={{ flex: 1, padding: 'clamp(1.5rem, 3vw, 2.5rem)', overflowY: 'auto' }}>
        
        {/* Top bar avec bouton d'ajout rapide */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 600 }}>
              {activeTab === 'dashboard' && 'Tableau de bord'}
              {activeTab === 'products' && 'Gestion du Catalogue Vêtements'}
              {activeTab === 'orders' && 'Gestion des Commandes'}
              {activeTab === 'appointments' && 'Prises de Mesure Sur-Mesure'}
              {activeTab === 'realisations' && 'Galerie & Réalisations Atelier'}
              {activeTab === 'database' && 'Base de données TablePlus'}
            </h1>
            <span style={{ fontSize: '0.75rem', color: '#666666', fontFamily: 'var(--font-mono)' }}>
              Maison AllFashion • Cotonou, Bénin
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.7rem 1.2rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Plus size={16} />
              <span>AJOUTER UN VÊTEMENT</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1 : TABLEAU DE BORD (STATS ET ACTIVITÉ RÉCENTE)
            ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* 4 Cartes de statistiques clés */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.2rem'
            }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #000000', padding: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666666', textTransform: 'uppercase' }}>
                  Chiffre d’Affaires Validé
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '1.7rem', fontWeight: 700, marginTop: '0.4rem' }}>
                  {totalRevenue.toLocaleString('fr-FR')} FCFA
                </span>
                <span style={{ fontSize: '0.72rem', color: '#888888', marginTop: '0.3rem', display: 'block' }}>
                  Commandes confirmées ou livrées
                </span>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #000000', padding: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666666', textTransform: 'uppercase' }}>
                  Commandes en Attente
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '1.7rem', fontWeight: 700, marginTop: '0.4rem', color: pendingOrders > 0 ? '#D97706' : '#000000' }}>
                  {pendingOrders}
                </span>
                <button
                  onClick={() => setActiveTab('orders')}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#000000', textDecoration: 'underline', fontSize: '0.72rem', cursor: 'pointer', marginTop: '0.3rem' }}
                >
                  Voir les commandes &rarr;
                </button>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #000000', padding: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666666', textTransform: 'uppercase' }}>
                  RDV Sur-Mesure à Valider
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '1.7rem', fontWeight: 700, marginTop: '0.4rem', color: pendingAppointments > 0 ? '#D97706' : '#000000' }}>
                  {pendingAppointments}
                </span>
                <button
                  onClick={() => setActiveTab('appointments')}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#000000', textDecoration: 'underline', fontSize: '0.72rem', cursor: 'pointer', marginTop: '0.3rem' }}
                >
                  Voir le planning &rarr;
                </button>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #000000', padding: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666666', textTransform: 'uppercase' }}>
                  Pièces en Boutique
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '1.7rem', fontWeight: 700, marginTop: '0.4rem' }}>
                  {products.length}
                </span>
                <span style={{ fontSize: '0.72rem', color: outOfStockProducts > 0 ? '#DC2626' : '#16A34A', marginTop: '0.3rem', display: 'block' }}>
                  {outOfStockProducts > 0 ? `${outOfStockProducts} en rupture` : 'Toutes en stock'}
                </span>
              </div>
            </div>

            {/* Deux colonnes : Dernières commandes & Derniers rendez-vous */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              
              {/* Dernières commandes */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600 }}>
                    Commandes Récentes
                  </h3>
                  <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', fontSize: '0.75rem', textDecoration: 'underline', cursor: 'pointer' }}>
                    Tout voir
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {orders.slice(0, 4).map((o) => (
                    <div key={o.id} style={{ padding: '0.8rem', border: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700 }}>{o.id}</span>
                        <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600 }}>{o.customerName}</span>
                        <span style={{ fontSize: '0.72rem', color: '#666666' }}>{o.deliveryAddress}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700 }}>
                          {(o.totalAmount || 0).toLocaleString('fr-FR')} FCFA
                        </span>
                        <span style={{
                          display: 'block',
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                          color: o.status === 'confirmee' ? '#16A34A' : o.status === 'en_attente' ? '#D97706' : '#666666'
                        }}>
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Derniers rendez-vous */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600 }}>
                    Rendez-vous Sur-Mesure
                  </h3>
                  <button onClick={() => setActiveTab('appointments')} style={{ background: 'none', border: 'none', fontSize: '0.75rem', textDecoration: 'underline', cursor: 'pointer' }}>
                    Tout voir
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {appointments.slice(0, 4).map((a) => (
                    <div key={a.id} style={{ padding: '0.8rem', border: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700 }}>{a.id} • {a.desiredDate}</span>
                        <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600 }}>{a.customerName}</span>
                        <span style={{ fontSize: '0.72rem', color: '#666666' }}>{a.locationType} - {a.address}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                          padding: '0.2rem 0.5rem',
                          backgroundColor: a.status === 'confirme' ? '#DCFCE7' : '#FEF3C7',
                          color: a.status === 'confirme' ? '#166534' : '#92400E'
                        }}>
                          {a.status}
                        </span>
                        <a
                          href={`https://wa.me/${a.whatsappNumber.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#000000', marginTop: '0.4rem', justifyContent: 'flex-end', textDecoration: 'none' }}
                        >
                          <MessageCircle size={12} />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2 : GESTION DES PRODUITS / VÊTEMENTS
            ========================================================================= */}
        {activeTab === 'products' && (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
            
            {/* Barre de recherche et filtres de catégorie */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F8F8F8', border: '1px solid #CCCCCC', padding: '0.4rem 0.8rem', flex: 1, maxWidth: '340px' }}>
                <Search size={15} color="#888888" />
                <input
                  type="text"
                  placeholder="Rechercher un vêtement..."
                  value={prodSearch}
                  onChange={(e) => setProdSearch(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.82rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['ALL', 'HOMME', 'FEMME', 'SUR_MESURE', 'STREETWEAR'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProdCategory(cat)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      border: prodCategory === cat ? '1px solid #000000' : '1px solid #CCCCCC',
                      backgroundColor: prodCategory === cat ? '#000000' : '#FFFFFF',
                      color: prodCategory === cat ? '#FFFFFF' : '#000000',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tableau des vêtements */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #000000', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Visuel</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Nom de la pièce</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Catégorie</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Prix (FCFA)</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Disponibilité</th>
                    <th style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                      <td style={{ padding: '0.7rem 0.5rem' }}>
                        <img
                          src={p.image || (p.images && p.images[0]) || p.main_image || '/assets/img/creation-1.jpg'}
                          alt={p.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/assets/img/creation-1.jpg';
                          }}
                          style={{ width: '48px', height: '60px', objectFit: 'cover', border: '1px solid #E0E0E0', backgroundColor: '#F5F5F5' }}
                        />
                      </td>
                      <td style={{ padding: '0.7rem 0.5rem' }}>
                        <span style={{ fontWeight: 600, display: 'block' }}>{p.name}</span>
                        <span style={{ fontSize: '0.7rem', color: '#888888', fontFamily: 'var(--font-mono)' }}>ID: {p.id}</span>
                      </td>
                      <td style={{ padding: '0.7rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                        {p.category}
                      </td>
                      <td style={{ padding: '0.7rem 0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {p.price.toLocaleString('fr-FR')} FCFA
                      </td>
                      <td style={{ padding: '0.7rem 0.5rem' }}>
                        <button
                          onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                          style={{
                            padding: '0.25rem 0.6rem',
                            border: 'none',
                            backgroundColor: p.inStock ? '#DCFCE7' : '#FEE2E2',
                            color: p.inStock ? '#166534' : '#991B1B',
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                          title="Cliquer pour basculer en stock ou rupture"
                        >
                          {p.inStock ? '✓ EN STOCK' : '✗ RUPTURE'}
                        </button>
                      </td>
                      <td style={{ padding: '0.7rem 0.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => setEditingProd(p)}
                            style={{ padding: '0.4rem', border: '1px solid #CCCCCC', backgroundColor: '#FFFFFF', cursor: 'pointer' }}
                            title="Modifier"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Supprimer définitivement "${p.name}" ?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            style={{ padding: '0.4rem', border: '1px solid #FFCCCC', backgroundColor: '#FFF5F5', color: '#DC2626', cursor: 'pointer' }}
                            title="Supprimer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 3 : GESTION DES COMMANDES (PANIER)
            ========================================================================= */}
        {activeTab === 'orders' && (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #000000', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Réf & Date</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Client & Contact</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Articles</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Total</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Statut</th>
                    <th style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>WhatsApp</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                      <td style={{ padding: '0.8rem 0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block' }}>{o.id}</span>
                        <span style={{ fontSize: '0.7rem', color: '#888888' }}>
                          {new Date(o.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem' }}>
                        <span style={{ fontWeight: 600, display: 'block' }}>{o.customerName}</span>
                        <span style={{ fontSize: '0.75rem', color: '#666666' }}>{o.whatsappNumber}</span>
                        <span style={{ fontSize: '0.72rem', color: '#888888', display: 'block' }}>{o.deliveryAddress}</span>
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem' }}>
                        {o.items && o.items.map((it, idx) => (
                          <div key={idx} style={{ fontSize: '0.75rem' }}>
                            • {it.name} ({it.size}) × {it.quantity}
                          </div>
                        ))}
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {(o.totalAmount || 0).toLocaleString('fr-FR')} FCFA
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem' }}>
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          style={{
                            padding: '0.3rem 0.5rem',
                            border: '1px solid #CCCCCC',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            backgroundColor: o.status === 'confirmee' ? '#DCFCE7' : o.status === 'livree' ? '#DBEAFE' : '#FEF3C7'
                          }}
                        >
                          <option value="en_attente">En attente</option>
                          <option value="confirmee">Confirmée</option>
                          <option value="livree">Livrée</option>
                          <option value="annulee">Annulée</option>
                        </select>
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>
                        <a
                          href={`https://wa.me/${o.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${o.customerName}, nous faisons le suivi de votre commande AllFashion ${o.id}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '0.4rem 0.8rem',
                            backgroundColor: '#25D366',
                            color: '#FFFFFF',
                            textDecoration: 'none',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <MessageCircle size={13} />
                          <span>Écrire</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4 : GESTION DES RENDEZ-VOUS SUR-MESURE
            ========================================================================= */}
        {activeTab === 'appointments' && (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #000000', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Réf & Date Souhaitée</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Client</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Lieu & Adresse</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Projet de Tenue</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Statut</th>
                    <th style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>WhatsApp</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr key={a.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                      <td style={{ padding: '0.8rem 0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block' }}>{a.id}</span>
                        <span style={{ fontSize: '0.78rem', color: '#000000', fontWeight: 600 }}>{a.desiredDate}</span>
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem' }}>
                        <span style={{ fontWeight: 600, display: 'block' }}>{a.customerName}</span>
                        <span style={{ fontSize: '0.75rem', color: '#666666' }}>{a.whatsappNumber}</span>
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                          {a.locationType}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#555555' }}>{a.address}</span>
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem', fontSize: '0.75rem', color: '#444444' }}>
                        {a.garmentIdea || 'Non précisé'}
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem' }}>
                        <select
                          value={a.status}
                          onChange={(e) => updateAppointmentStatus(a.id, e.target.value)}
                          style={{
                            padding: '0.3rem 0.5rem',
                            border: '1px solid #CCCCCC',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            backgroundColor: a.status === 'confirme' ? '#DCFCE7' : a.status === 'termine' ? '#F3F4F6' : '#FEF3C7'
                          }}
                        >
                          <option value="a_confirmer">À confirmer</option>
                          <option value="confirme">Confirmé</option>
                          <option value="termine">Terminé</option>
                        </select>
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>
                        <a
                          href={`https://wa.me/${a.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${a.customerName}, le styliste AllFashion vous contacte pour convenir de l'heure exacte de votre prise de mesure le ${a.desiredDate}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '0.4rem 0.8rem',
                            backgroundColor: '#25D366',
                            color: '#FFFFFF',
                            textDecoration: 'none',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <MessageCircle size={13} />
                          <span>Confirmer</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5 : GESTION DES RÉALISATIONS
            ========================================================================= */}
        {activeTab === 'realisations' && (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {realisations.map((r) => (
                <div key={r.id} style={{ border: '1px solid #E5E5E5', overflow: 'hidden' }}>
                  <img src={r.image} alt={r.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ padding: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888888', textTransform: 'uppercase' }}>
                      {r.category}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginTop: '0.2rem', marginBottom: '0.4rem' }}>
                      {r.title}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: '#666666', lineHeight: 1.4, marginBottom: '0.8rem' }}>
                      {r.desc}
                    </p>
                    <button
                      onClick={() => {
                        if (confirm(`Supprimer la réalisation "${r.title}" ?`)) {
                          deleteRealisation(r.id);
                        }
                      }}
                      style={{ padding: '0.35rem 0.7rem', border: '1px solid #FFCCCC', backgroundColor: '#FFF5F5', color: '#DC2626', fontSize: '0.7rem', cursor: 'pointer' }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6 : BASE DE DONNÉES TABLEPLUS
            ========================================================================= */}
        {activeTab === 'database' && (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #000000', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <Database size={24} />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>
                Base de données TablePlus
              </h2>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#444444', lineHeight: 1.6, maxWidth: '750px', marginBottom: '1.8rem' }}>
              Votre base de données AllFashion est créée et disponible localement. Vous pouvez l'ouvrir immédiatement dans <strong>TablePlus</strong> pour inspecter, modifier et gérer vos tables.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              
              {/* Option SQLite direct */}
              <div style={{ padding: '1.4rem', border: '1px solid #CCCCCC', backgroundColor: '#FAFAFA' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Option 1 : SQLite (Ouverture directe en 1 clic)
                </span>
                <p style={{ fontSize: '0.82rem', color: '#666666', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  Fichier créé à l'emplacement :<br />
                  <code style={{ display: 'block', backgroundColor: '#EEEEEE', padding: '0.5rem', marginTop: '0.4rem', fontSize: '0.75rem', wordBreak: 'break-all' }}>
                    database/allfashion.sqlite
                  </code>
                </p>
                <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: '#333333' }}>
                  💡 <em>Double-cliquez sur ce fichier dans le Finder ou ouvrez-le avec TablePlus pour voir les tables <code>products</code>, <code>orders</code>, <code>appointments</code>.</em>
                </div>
              </div>

              {/* Option MySQL */}
              <div style={{ padding: '1.4rem', border: '1px solid #CCCCCC', backgroundColor: '#FAFAFA' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Option 2 : MySQL / Laravel Herd (Port 3306)
                </span>
                <p style={{ fontSize: '0.82rem', color: '#666666', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  Script SQL complet généré à l'emplacement :<br />
                  <code style={{ display: 'block', backgroundColor: '#EEEEEE', padding: '0.5rem', marginTop: '0.4rem', fontSize: '0.75rem', wordBreak: 'break-all' }}>
                    database/mysql_schema.sql
                  </code>
                </p>
                <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: '#333333' }}>
                  💡 <em>Dans TablePlus, créez une connexion MySQL (Host: 127.0.0.1, Port: 3306, User: root) et exécutez ce script pour créer la base <code>allfashion</code>.</em>
                </div>
              </div>

            </div>

            <div style={{ padding: '1rem 1.4rem', backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', color: '#0369A1', fontSize: '0.82rem' }}>
              ✓ <strong>Tables prêtes :</strong> <code>products</code>, <code>categories</code>, <code>orders</code>, <code>appointments</code>, <code>realisations</code>, <code>admins</code>.
            </div>
          </div>
        )}

      </main>

      {/* MODAL : AJOUTER UN PRODUIT */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #000000',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                Ajouter une Nouvelle Pièce
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Nom de la création *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Veste Croisée Soie Noire"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="input-stylist"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Catégorie *
                  </label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="input-stylist"
                  >
                    <option value="HOMME">HOMME</option>
                    <option value="FEMME">FEMME</option>
                    <option value="SUR_MESURE">SUR_MESURE</option>
                    <option value="STREETWEAR">STREETWEAR</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Prix en FCFA *
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 85000"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    className="input-stylist"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Image URL / Chemin relatif
                </label>
                <input
                  type="text"
                  placeholder="Ex: /images/look-imprime-2.jpg ou https://..."
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  className="input-stylist"
                />
                <span style={{ fontSize: '0.68rem', color: '#888888', marginTop: '0.2rem', display: 'block' }}>
                  Vous pouvez utiliser les photos du dossier <code>/images/...</code> ou une URL en ligne.
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Tailles disponibles (séparées par des virgules)
                </label>
                <input
                  type="text"
                  value={newProd.sizes}
                  onChange={(e) => setNewProd({ ...newProd, sizes: e.target.value })}
                  className="input-stylist"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Description de la pièce
                </label>
                <textarea
                  rows="3"
                  placeholder="Coupe, détails des matières, finitions..."
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  className="input-stylist"
                />
              </div>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newProd.inStock}
                    onChange={(e) => setNewProd({ ...newProd, inStock: e.target.checked })}
                  />
                  <span>Disponible en Stock</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newProd.isNew}
                    onChange={(e) => setNewProd({ ...newProd, isNew: e.target.checked })}
                  />
                  <span>Nouveauté</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.9rem',
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}
                >
                  ENREGISTRER LE PRODUIT
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: '0.9rem 1.4rem',
                    border: '1px solid #CCCCCC',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL : MODIFIER UN PRODUIT */}
      {editingProd && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #000000',
            width: '100%',
            maxWidth: '520px',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                Modifier : {editingProd.name}
              </h3>
              <button onClick={() => setEditingProd(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Nom de la pièce
                </label>
                <input
                  type="text"
                  value={editingProd.name}
                  onChange={(e) => setEditingProd({ ...editingProd, name: e.target.value })}
                  className="input-stylist"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Catégorie
                  </label>
                  <select
                    value={editingProd.category}
                    onChange={(e) => setEditingProd({ ...editingProd, category: e.target.value })}
                    className="input-stylist"
                  >
                    <option value="HOMME">HOMME</option>
                    <option value="FEMME">FEMME</option>
                    <option value="SUR_MESURE">SUR_MESURE</option>
                    <option value="STREETWEAR">STREETWEAR</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Prix (FCFA)
                  </label>
                  <input
                    type="number"
                    value={editingProd.price}
                    onChange={(e) => setEditingProd({ ...editingProd, price: e.target.value })}
                    className="input-stylist"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Description
                </label>
                <textarea
                  rows="3"
                  value={editingProd.description || ''}
                  onChange={(e) => setEditingProd({ ...editingProd, description: e.target.value })}
                  className="input-stylist"
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingProd.inStock}
                    onChange={(e) => setEditingProd({ ...editingProd, inStock: e.target.checked })}
                  />
                  <span>Disponible en Stock</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.9rem',
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}
                >
                  METTRE À JOUR
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProd(null)}
                  style={{
                    padding: '0.9rem 1.4rem',
                    border: '1px solid #CCCCCC',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
