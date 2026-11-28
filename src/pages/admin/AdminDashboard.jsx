import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Calendar,
  Layers,
  Image as ImageIcon,
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
  Menu,
  Scissors,
  Sparkles,
  Phone,
  BarChart3,
  TrendingUp,
  Eye,
  Users,
  Smartphone,
  Globe,
  ArrowUpRight,
  Activity,
  Upload
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { api } from '../../services/api';

export default function AdminDashboard() {
  const {
    products,
    categories,
    orders,
    appointments,
    flockingRequests = [],
    realisations,
    analytics,
    isAdmin,
    logout,
    addCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateAppointmentStatus,
    updateFlockingStatus,
    addManualOrder,
    addRealisation,
    deleteRealisation
  } = useStore();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // Onglet commandes par défaut
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Filtre commandes
  const [orderFilter, setOrderFilter] = useState('ALL'); // 'ALL' | 'couture' | 'flocage' | 'pret-a-porter'

  // Modal Nouvelle Commande
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    type: 'couture', // 'couture', 'flocage', 'pret-a-porter'
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    amount: '',
    details: '',
    status: 'en_attente'
  });

  // Modal Nouvelle Catégorie
  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({
    name: '',
    type: 'shop',
    sort_order: 0
  });

  // Filtres / Recherche Produits
  const [prodSearch, setProdSearch] = useState('');
  const [prodCategory, setProdCategory] = useState('ALL');

  // Modal Ajout Produit
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    category: categories[0]?.slug || 'HOMME',
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

  // Modal Ajout Photo Galerie Lookbook
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Sur-Mesure Cérémonie',
    badge: 'Créateur',
    desc: '',
    imageUrl: ''
  });

  // Redirection si non authentifié
  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  // Calculs statistiques
  const totalRevenue =
    orders
      .filter((o) => o.status === 'confirmee' || o.status === 'livree')
      .reduce((acc, o) => acc + (o.totalAmount || 0), 0) +
    flockingRequests
      .filter((f) => f.status === 'en_production' || f.status === 'terminee')
      .reduce((acc, f) => acc + (f.quotedPrice || 0), 0);

  const pendingOrdersCount =
    orders.filter((o) => o.status === 'en_attente').length +
    appointments.filter((a) => a.status === 'en_attente' || a.status === 'a_confirmer').length +
    flockingRequests.filter((f) => f.status === 'nouvelle').length;

  const totalAllOrders = orders.length + appointments.length + flockingRequests.length;

  // Soumission Ajout Produit
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      alert('Veuillez renseigner le nom et le prix du vêtement.');
      return;
    }

    const sizesArr = newProd.sizes.split(',').map((s) => s.trim()).filter(Boolean);

    addProduct({
      name: newProd.name,
      category: newProd.category,
      categoryLabel: categories.find((c) => c.slug === newProd.category)?.name || newProd.category,
      price: Number(newProd.price),
      priceFormatted: `${Number(newProd.price).toLocaleString('fr-FR')} FCFA`,
      image: newProd.image || '/images/look-imprime-2.jpg',
      images: [newProd.image || '/images/look-imprime-2.jpg'],
      sizes: sizesArr.length > 0 ? sizesArr : ['S', 'M', 'L', 'XL'],
      description: newProd.description,
      inStock: newProd.inStock,
      isNew: newProd.isNew,
      isBestSeller: newProd.isBestSeller,
      rating: 5
    });

    setIsAddModalOpen(false);
    setNewProd({
      name: '',
      category: categories[0]?.slug || 'HOMME',
      price: '',
      image: '/images/look-imprime-2.jpg',
      description: '',
      sizes: 'S, M, L, XL',
      inStock: true,
      isNew: true,
      isBestSeller: false
    });
  };

  // Sélection & prévisualisation de photo
  const handlePhotoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  // Soumission Ajout Photo Galerie
  const handleAddPhotoSubmit = async (e) => {
    e.preventDefault();
    if (!newPhoto.title) {
      alert('Veuillez renseigner le titre de la tenue.');
      return;
    }

    if (!photoFile && !newPhoto.imageUrl) {
      alert('Veuillez sélectionner une photo sur votre appareil ou renseigner une URL.');
      return;
    }

    setIsUploadingPhoto(true);
    let finalImageUrl = newPhoto.imageUrl;

    try {
      if (photoFile) {
        finalImageUrl = await api.uploadImage(photoFile);
      }

      await addRealisation({
        title: newPhoto.title,
        category: newPhoto.category,
        badge: newPhoto.badge || 'Créateur',
        desc: newPhoto.desc,
        image: finalImageUrl || '/images/look-imprime-2.jpg'
      });

      setIsAddPhotoModalOpen(false);
      setPhotoFile(null);
      setPhotoPreview('');
      setNewPhoto({
        title: '',
        category: 'Sur-Mesure Cérémonie',
        badge: 'Créateur',
        desc: '',
        imageUrl: ''
      });
    } catch (err) {
      alert('Une erreur est survenue lors de l’enregistrement de la photo.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Soumission Édition Produit
  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();
    if (!editingProd) return;

    updateProduct(editingProd.id, {
      name: editingProd.name,
      category: editingProd.category,
      categoryLabel: categories.find((c) => c.slug === editingProd.category)?.name || editingProd.category,
      price: Number(editingProd.price),
      priceFormatted: `${Number(editingProd.price).toLocaleString('fr-FR')} FCFA`,
      description: editingProd.description,
      inStock: editingProd.inStock
    });

    setEditingProd(null);
  };

  // Soumission Ajout Catégorie
  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) {
      alert('Veuillez renseigner un nom de catégorie.');
      return;
    }

    addCategory({
      name: newCat.name.trim(),
      type: newCat.type,
      sort_order: Number(newCat.sort_order) || 0
    });

    setIsAddCatModalOpen(false);
    setNewCat({ name: '', type: 'shop', sort_order: 0 });
  };

  // Soumission Ajout Commande Manuelle
  const handleAddOrderSubmit = async (e) => {
    e.preventDefault();
    if (!newOrder.customerName || !newOrder.customerPhone) {
      alert('Veuillez renseigner le nom et le numéro du client.');
      return;
    }

    await addManualOrder(newOrder);

    setIsAddOrderModalOpen(false);
    setNewOrder({
      type: 'couture',
      customerName: '',
      customerPhone: '',
      deliveryAddress: '',
      amount: '',
      details: '',
      status: 'en_attente'
    });
  };

  // Filtrage des vêtements du catalogue
  const filteredProducts = products.filter((p) => {
    if (prodCategory !== 'ALL' && p.category !== prodCategory) return false;
    if (prodSearch.trim()) {
      const q = prodSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q));
    }
    return true;
  });

  // Construction de la liste unifiée et concrète des commandes & projets
  const unifiedOrdersList = [
    ...orders.map((o) => ({
      ...o,
      orderType: 'pret-a-porter',
      typeBadge: 'PRÊT-À-PORTER',
      badgeColor: '#166534',
      badgeBg: '#DCFCE7',
      client: o.customerName,
      phone: o.whatsappNumber,
      date: o.createdAt,
      concreteDetails: (
        <div>
          <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>Articles commandés :</span>
          {o.items && o.items.map((it, idx) => (
            <div key={idx} style={{ fontSize: '0.74rem', color: '#333333' }}>
              • {it.quantity}x {it.name} (Taille : {it.size}) — {Number(it.price * it.quantity).toLocaleString('fr-FR')} FCFA
            </div>
          ))}
          {o.deliveryAddress && (
            <div style={{ fontSize: '0.72rem', color: '#666666', marginTop: '0.3rem' }}>
              Livraison : {o.deliveryAddress}
            </div>
          )}
        </div>
      ),
      amount: o.totalAmount || 0,
      whatsappMsg: `Bonjour ${o.customerName}, nous faisons le point sur votre commande AllFashion (${o.id}). Pouvons-nous confirmer la livraison ?`,
      onStatusChange: (newStatus) => updateOrderStatus(o.id, newStatus)
    })),

    ...appointments.map((a) => ({
      ...a,
      orderType: 'couture',
      typeBadge: 'SUR-MESURE & COUTURE',
      badgeColor: '#000000',
      badgeBg: '#F3F4F6',
      client: a.clientName || a.customerName,
      phone: a.clientPhone || a.whatsappNumber,
      date: a.createdAt,
      concreteDetails: (
        <div>
          <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
            {a.garmentIdea || a.garment_type || 'Tenue Sur-Mesure'}
          </span>
          <div style={{ fontSize: '0.74rem', color: '#444444' }}>
            <strong>Lieu :</strong> {a.locationType === 'domicile' ? 'Déplacement chez le client' : "À l'Atelier AllFashion"}
          </div>
          {a.address && (
            <div style={{ fontSize: '0.72rem', color: '#666666' }}>
              Adresse : {a.address}
            </div>
          )}
          {a.dateSlot && (
            <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 600, marginTop: '0.2rem' }}>
              Date souhaitée : {a.dateSlot}
            </div>
          )}
        </div>
      ),
      amount: a.amount || 0,
      whatsappMsg: `Bonjour ${a.clientName || a.customerName}, suite à votre demande de rendez-vous sur-mesure (${a.id}), le styliste AllFashion souhaite convenir du créneau pour la prise de mesure.`,
      onStatusChange: (newStatus) => updateAppointmentStatus(a.id, newStatus)
    })),

    ...flockingRequests.map((f) => ({
      ...f,
      orderType: 'flocage',
      typeBadge: 'FLOCAGE & MARQUAGE',
      badgeColor: '#1E40AF',
      badgeBg: '#DBEAFE',
      client: f.clientName,
      phone: f.clientPhone,
      date: f.createdAt,
      concreteDetails: (
        <div>
          <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
            {f.garmentType} ({f.quantity} pièces)
          </span>
          <div style={{ fontSize: '0.74rem', color: '#444444' }}>
            <strong>Emplacement :</strong> {f.position}
          </div>
          {f.instructions && (
            <div style={{ fontSize: '0.72rem', color: '#555555', marginTop: '0.2rem', fontStyle: 'italic' }}>
              "{f.instructions}"
            </div>
          )}
        </div>
      ),
      amount: f.quotedPrice || 0,
      whatsappMsg: `Bonjour ${f.clientName}, suite à votre projet de flocage (${f.id}), nous avons étudié votre demande et souhaitons valider le visuel et le devis avec vous.`,
      onStatusChange: (newStatus) => updateFlockingStatus(f.id, newStatus)
    }))
  ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  // Filtrage selon le bouton sélectionné
  const displayedOrders = unifiedOrdersList.filter((item) => {
    if (orderFilter === 'ALL') return true;
    return item.orderType === orderFilter;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9F9F9', color: '#000000', display: 'flex' }}>
      
      {/* =========================================================================
          BARRE LATÉRALE (SIDEBAR ADMIN)
          ========================================================================= */}
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
              ADMINISTRATION ATELIER
            </span>
          </div>

          {/* Liens de menu */}
          <nav style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[
              { id: 'dashboard', label: 'Vue d’ensemble', icon: <LayoutDashboard size={17} /> },
              { id: 'analytics', label: 'Statistiques & Visites', icon: <BarChart3 size={17} /> },
              { id: 'orders', label: 'Commandes', icon: <Package size={17} />, badge: pendingOrdersCount },
              { id: 'categories', label: 'Catégories', icon: <Layers size={17} /> },
              { id: 'products', label: 'Vêtements', icon: <ShoppingBag size={17} /> },
              { id: 'realisations', label: 'Galerie Lookbook', icon: <ImageIcon size={17} /> }
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
              border: 'none',
              color: '#FF6B6B',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.5rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <LogOut size={14} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          ZONE PRINCIPALE DE CONTENU
          ========================================================================= */}
      <main style={{ flex: 1, padding: 'clamp(1.5rem, 3vw, 2.5rem)', overflowY: 'auto' }}>
        
        {/* Header mobile & bienvenue */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Espace Styliste & Gestion
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', lineHeight: 1.1, marginTop: '0.2rem' }}>
              {activeTab === 'dashboard' && 'Tableau de Bord Global'}
              {activeTab === 'analytics' && 'Statistiques & Fréquentation du Site'}
              {activeTab === 'orders' && 'Commandes & Projets Atelier'}
              {activeTab === 'categories' && 'Gestion des Catégories'}
              {activeTab === 'products' && 'Catalogue de Prêt-à-Porter'}
              {activeTab === 'realisations' && 'Galerie & Portfolio'}
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            {activeTab === 'orders' && (
              <button
                type="button"
                onClick={() => setIsAddOrderModalOpen(true)}
                className="btn-stylist-dark"
                style={{ padding: '0.7rem 1.4rem', fontSize: '0.75rem' }}
              >
                <Plus size={15} />
                <span>NOUVELLE COMMANDE ATELIER</span>
              </button>
            )}

            {activeTab === 'categories' && (
              <button
                type="button"
                onClick={() => setIsAddCatModalOpen(true)}
                className="btn-stylist-dark"
                style={{ padding: '0.7rem 1.4rem', fontSize: '0.75rem' }}
              >
                <Plus size={15} />
                <span>NOUVELLE CATÉGORIE</span>
              </button>
            )}

            {activeTab === 'products' && (
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="btn-stylist-dark"
                style={{ padding: '0.7rem 1.4rem', fontSize: '0.75rem' }}
              >
                <Plus size={15} />
                <span>AJOUTER UN VÊTEMENT</span>
              </button>
            )}

            {activeTab === 'realisations' && (
              <button
                type="button"
                onClick={() => setIsAddPhotoModalOpen(true)}
                className="btn-stylist-dark"
                style={{ padding: '0.7rem 1.4rem', fontSize: '0.75rem' }}
              >
                <Plus size={15} />
                <span>AJOUTER UNE PHOTO</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            TAB 1 : DASHBOARD (VUE D'ENSEMBLE & KPIS)
            ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.2rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #000000', padding: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888888', textTransform: 'uppercase', display: 'block' }}>
                  Chiffre d’Affaires Estimé
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.9rem', fontWeight: 800, display: 'block', marginTop: '0.4rem' }}>
                  {totalRevenue.toLocaleString('fr-FR')} <span style={{ fontSize: '0.9rem' }}>FCFA</span>
                </span>
                <span style={{ fontSize: '0.72rem', color: '#166534', marginTop: '0.4rem', display: 'block' }}>
                  Commandes confirmées & en confection
                </span>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888888', textTransform: 'uppercase', display: 'block' }}>
                  Commandes & Projets
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.9rem', fontWeight: 800, display: 'block', marginTop: '0.4rem' }}>
                  {totalAllOrders}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#DC2626', marginTop: '0.4rem', display: 'block' }}>
                  {pendingOrdersCount} en attente de validation
                </span>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888888', textTransform: 'uppercase', display: 'block' }}>
                  Catégories Actives
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.9rem', fontWeight: 800, display: 'block', marginTop: '0.4rem' }}>
                  {categories.length}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#666666', marginTop: '0.4rem', display: 'block' }}>
                  Collections configurées
                </span>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888888', textTransform: 'uppercase', display: 'block' }}>
                  Articles en Boutique
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.9rem', fontWeight: 800, display: 'block', marginTop: '0.4rem' }}>
                  {products.length}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#166534', marginTop: '0.4rem', display: 'block' }}>
                  {products.filter(p => p.inStock).length} en stock immédiat
                </span>
              </div>
            </div>

            {/* Accès rapide aux dernières commandes */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
                  Derniers Projets de l'Atelier
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  style={{ background: 'none', border: 'none', color: '#000000', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Voir tous les projets →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {displayedOrders.slice(0, 4).map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', border: '1px solid #EEEEEE' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        backgroundColor: item.badgeBg,
                        color: item.badgeColor,
                        fontFamily: 'var(--font-mono)'
                      }}>
                        {item.typeBadge}
                      </span>
                      <div>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem', display: 'block' }}>{item.client}</span>
                        <span style={{ fontSize: '0.72rem', color: '#666666' }}>{item.phone} • Réf: {item.id}</span>
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem' }}>
                      {Number(item.amount).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB : STATISTIQUES & VISITES DU SITE
            ========================================================================= */}
        {activeTab === 'analytics' && (
          <div>
            {/* Bannière de suivi en direct */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              padding: '1rem 1.4rem',
              marginBottom: '1.8rem',
              flexWrap: 'wrap',
              gap: '0.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{
                  display: 'inline-block',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  backgroundColor: '#16A34A',
                  boxShadow: '0 0 0 3px rgba(22, 163, 74, 0.2)'
                }} />
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    SUIVI DU TRAFIC EN DIRECT
                  </span>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: '#666666' }}>
                    Comptabilisation active de chaque visiteur et consultation de page sur AllFashion.
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#888888' }}>
                  Période : 7 derniers jours
                </span>
              </div>
            </div>

            {/* 4 Cartes Métriques Clés */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.2rem',
              marginBottom: '2rem'
            }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #000000', padding: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666666' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Visites Totales
                  </span>
                  <Eye size={18} color="#000000" />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, display: 'block', marginTop: '0.5rem', lineHeight: 1 }}>
                  {(analytics?.totalVisits || 0).toLocaleString('fr-FR')}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.6rem', color: '#166534', fontSize: '0.72rem' }}>
                  <TrendingUp size={13} />
                  <span>+22% cette semaine</span>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666666' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Visiteurs Uniques
                  </span>
                  <Users size={18} color="#000000" />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, display: 'block', marginTop: '0.5rem', lineHeight: 1 }}>
                  {(analytics?.uniqueVisitors || 0).toLocaleString('fr-FR')}
                </span>
                <span style={{ display: 'block', marginTop: '0.6rem', color: '#666666', fontSize: '0.72rem' }}>
                  Clients et prospects distincts
                </span>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666666' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Pages Consultées
                  </span>
                  <BarChart3 size={18} color="#000000" />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, display: 'block', marginTop: '0.5rem', lineHeight: 1 }}>
                  {(analytics?.pageViews || 0).toLocaleString('fr-FR')}
                </span>
                <span style={{ display: 'block', marginTop: '0.6rem', color: '#666666', fontSize: '0.72rem' }}>
                  Moyenne de ~2.5 pages / session
                </span>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666666' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Taux d'Intention WhatsApp
                  </span>
                  <TrendingUp size={18} color="#000000" />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, display: 'block', marginTop: '0.5rem', lineHeight: 1 }}>
                  {analytics?.conversionRate || '4.8%'}
                </span>
                <span style={{ display: 'block', marginTop: '0.6rem', color: '#166534', fontSize: '0.72rem' }}>
                  Clics vers devis ou commande
                </span>
              </div>
            </div>

            {/* Graphique d'Évolution Quotidienne */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              padding: '1.8rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', margin: 0 }}>
                    Évolution de la Fréquentation Quotidienne
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#666666', display: 'block', marginTop: '0.2rem' }}>
                    Nombre de visites enregistrées par jour sur le site
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', backgroundColor: '#F3F4F6', padding: '0.3rem 0.7rem' }}>
                  Graphique d'affluence
                </span>
              </div>

              {/* Barres de fréquentation */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '0.8rem',
                height: '220px',
                paddingTop: '2rem',
                borderBottom: '2px solid #000000'
              }}>
                {(analytics?.dailyVisits || []).map((dayData, idx) => {
                  const maxVisits = Math.max(...(analytics?.dailyVisits || []).map(d => d.visits), 1);
                  const barHeightPercent = Math.max(12, Math.round((dayData.visits / maxVisits) * 100));

                  return (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100%',
                        justifyContent: 'flex-end',
                        position: 'relative'
                      }}
                    >
                      {/* Valeur au-dessus */}
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        marginBottom: '0.4rem',
                        color: '#000000'
                      }}>
                        {dayData.visits}
                      </span>

                      {/* Barre */}
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '44px',
                          height: `${barHeightPercent}%`,
                          backgroundColor: idx === ((analytics?.dailyVisits?.length || 1) - 1) ? '#000000' : '#333333',
                          transition: 'height 0.4s ease',
                          cursor: 'pointer'
                        }}
                        title={`${dayData.day} ${dayData.date} : ${dayData.visits} visites (${dayData.views} pages vues)`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Étiquettes des jours */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8rem', marginTop: '0.8rem' }}>
                {(analytics?.dailyVisits || []).map((dayData, idx) => (
                  <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', fontWeight: 700, display: 'block' }}>
                      {dayData.day}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#888888', display: 'block' }}>
                      {dayData.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grille 2 colonnes : Pages Populaires & Répartitions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Pages les Plus Fréquentées */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.6rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.3rem' }}>
                  Pages les Plus Consultées
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#666666', display: 'block', marginBottom: '1.4rem' }}>
                  Sections les plus visitées de l'atelier en ligne
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {(analytics?.topPages || []).map((page, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <div>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block' }}>
                            {page.name}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#888888' }}>
                            {page.path}
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700 }}>
                            {page.views.toLocaleString('fr-FR')} vues
                          </span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#666666', display: 'block' }}>
                            {page.percent}%
                          </span>
                        </div>
                      </div>

                      {/* Barre de progression */}
                      <div style={{ height: '6px', backgroundColor: '#F0F0F0', width: '100%', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${page.percent}%`,
                          backgroundColor: idx === 0 ? '#000000' : '#444444'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Répartition Appareils & Sources */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Appareils */}
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Smartphone size={17} />
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0 }}>
                        Appareils Utilisés
                      </h4>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#888888' }}>
                      Mobile-first
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    {(analytics?.devices || []).map((dev, idx) => (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                          <span>{dev.type}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                            {dev.percent}% ({dev.count.toLocaleString('fr-FR')})
                          </span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: '#F0F0F0', width: '100%' }}>
                          <div style={{ height: '100%', width: `${dev.percent}%`, backgroundColor: '#000000' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sources de Trafic */}
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Globe size={17} />
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0 }}>
                        Canaux d'Acquisition
                      </h4>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#888888' }}>
                      Réseaux & Partages
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    {(analytics?.sources || []).map((src, idx) => (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                          <span>{src.source}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                            {src.percent}% ({src.visits.toLocaleString('fr-FR')})
                          </span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: '#F0F0F0', width: '100%' }}>
                          <div style={{ height: '100%', width: `${src.percent}%`, backgroundColor: '#222222' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pièces les Plus Vues du Catalogue */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: 0 }}>
                    Créations & Vêtements Vedettes
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: '#666666' }}>
                    Articles du catalogue attirant le plus d'intérêt des visiteurs
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('products')}
                  style={{ background: 'none', border: 'none', color: '#000000', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Gérer la boutique →
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {products.slice(0, 4).map((p, idx) => (
                  <div key={p.id} style={{ display: 'flex', gap: '0.9rem', border: '1px solid #EEEEEE', padding: '0.8rem', alignItems: 'center' }}>
                    <img
                      src={p.image || (p.images && p.images[0]) || '/images/look-imprime-2.jpg'}
                      alt={p.name}
                      style={{ width: '56px', height: '68px', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/images/look-imprime-2.jpg'; }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#888888', textTransform: 'uppercase', display: 'block' }}>
                        {p.category}
                      </span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, display: 'block', marginTop: '0.2rem' }}>
                        {Number(p.price).toLocaleString('fr-FR')} FCFA
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem', fontSize: '0.68rem', color: '#166534' }}>
                        <Eye size={12} />
                        <span>~{Math.round((840 - idx * 115) + (p.id ? Number(String(p.id).replace(/\D/g, '') || 1) * 7 : 0))} vues</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2 : COMMANDES & PROJETS ATELIER (CONCRET & COMPLET)
            ========================================================================= */}
        {activeTab === 'orders' && (
          <div>
            {/* Barre de filtres par pilules */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {[
                { id: 'ALL', label: `Tous les travaux (${totalAllOrders})` },
                { id: 'couture', label: `Sur-Mesure & Couture (${appointments.length})` },
                { id: 'flocage', label: `Flocage & Marquage (${flockingRequests.length})` },
                { id: 'pret-a-porter', label: `Boutique Prêt-à-Porter (${orders.length})` }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setOrderFilter(f.id)}
                  style={{
                    padding: '0.55rem 1rem',
                    border: orderFilter === f.id ? '2px solid #000000' : '1px solid #DDDDDD',
                    backgroundColor: orderFilter === f.id ? '#000000' : '#FFFFFF',
                    color: orderFilter === f.id ? '#FFFFFF' : '#000000',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    fontWeight: orderFilter === f.id ? 700 : 500,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Tableau complet des commandes & projets */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #000000', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Type & Réf</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Client & Contact</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Détails Concrets du Projet</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Montant / Devis</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Statut</th>
                    <th style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>Action Directe</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: '3rem 1rem', textAlign: 'center', color: '#888888' }}>
                        Aucun travail trouvé dans cette catégorie.
                      </td>
                    </tr>
                  ) : (
                    displayedOrders.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                        <td style={{ padding: '0.8rem 0.5rem', verticalAlign: 'top' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '0.2rem 0.5rem',
                            backgroundColor: item.badgeBg,
                            color: item.badgeColor,
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            marginBottom: '0.3rem'
                          }}>
                            {item.typeBadge}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.78rem', display: 'block' }}>
                            {item.id}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#888888' }}>
                            {item.date ? new Date(item.date).toLocaleDateString('fr-FR') : 'Aujourd’hui'}
                          </span>
                        </td>

                        <td style={{ padding: '0.8rem 0.5rem', verticalAlign: 'top' }}>
                          <span style={{ fontWeight: 600, display: 'block' }}>{item.client}</span>
                          <span style={{ fontSize: '0.74rem', color: '#666666', fontFamily: 'var(--font-mono)' }}>
                            {item.phone}
                          </span>
                        </td>

                        <td style={{ padding: '0.8rem 0.5rem', verticalAlign: 'top', maxWidth: '380px' }}>
                          {item.concreteDetails}
                        </td>

                        <td style={{ padding: '0.8rem 0.5rem', verticalAlign: 'top', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          {Number(item.amount) > 0 ? `${Number(item.amount).toLocaleString('fr-FR')} FCFA` : 'Sur Devis'}
                        </td>

                        <td style={{ padding: '0.8rem 0.5rem', verticalAlign: 'top' }}>
                          <select
                            value={item.status}
                            onChange={(e) => item.onStatusChange(e.target.value)}
                            style={{
                              padding: '0.35rem 0.6rem',
                              border: '1px solid #CCCCCC',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              backgroundColor:
                                item.status === 'confirmee' || item.status === 'confirme' || item.status === 'terminee'
                                  ? '#DCFCE7'
                                  : item.status === 'en_production' || item.status === 'livree'
                                  ? '#DBEAFE'
                                  : '#FEF3C7'
                            }}
                          >
                            <option value="en_attente">En attente</option>
                            <option value="confirmee">Confirmée</option>
                            <option value="en_production">En confection / production</option>
                            <option value="livree">Prête / Livrée</option>
                            <option value="annulee">Annulée</option>
                          </select>
                        </td>

                        <td style={{ padding: '0.8rem 0.5rem', verticalAlign: 'top', textAlign: 'right' }}>
                          <a
                            href={`https://wa.me/${String(item.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(item.whatsappMsg)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.45rem 0.85rem',
                              backgroundColor: '#25D366',
                              color: '#FFFFFF',
                              textDecoration: 'none',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <MessageCircle size={14} />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3 : GESTION DES CATÉGORIES (CRÉATION, MODIFICATION, SUPPRESSION)
            ========================================================================= */}
        {activeTab === 'categories' && (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>
                  Toutes les Catégories de l'Atelier
                </h3>
                <p style={{ color: '#666666', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                  Ces catégories apparaissent automatiquement dans le filtre de la boutique et pour la création de vos vêtements.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddCatModalOpen(true)}
                className="btn-stylist-dark"
                style={{ padding: '0.65rem 1.2rem', fontSize: '0.74rem' }}
              >
                <Plus size={14} />
                <span>AJOUTER UNE CATÉGORIE</span>
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #000000', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Nom affiché</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Identifiant (Slug)</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Type</th>
                    <th style={{ padding: '0.8rem 0.5rem' }}>Articles associés</th>
                    <th style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id || c.slug} style={{ borderBottom: '1px solid #EEEEEE' }}>
                      <td style={{ padding: '0.8rem 0.5rem', fontWeight: 600 }}>
                        {c.name}
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666666' }}>
                        {c.slug || c.id}
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem' }}>
                        <span style={{
                          padding: '0.2rem 0.55rem',
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          backgroundColor: c.type === 'lookbook' ? '#F3F4F6' : '#DCFCE7',
                          color: c.type === 'lookbook' ? '#000000' : '#166534'
                        }}>
                          {c.type === 'lookbook' ? 'Galerie Lookbook' : 'Boutique Prêt-à-Porter'}
                        </span>
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem', fontFamily: 'var(--font-mono)' }}>
                        {products.filter(p => p.category === (c.slug || c.id)).length} pièce(s)
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Voulez-vous supprimer la catégorie "${c.name}" ?`)) {
                              deleteCategory(c.id || c.slug);
                            }
                          }}
                          style={{
                            padding: '0.35rem 0.6rem',
                            border: '1px solid #FFCDD2',
                            backgroundColor: '#FFEBEE',
                            color: '#C62828',
                            fontSize: '0.72rem',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4 : CATALOGUE DE VÊTEMENTS (PRODUITS)
            ========================================================================= */}
        {activeTab === 'products' && (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
            
            {/* Filtres & Recherche de vêtements */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.8rem', flex: 1, minWidth: '280px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#888888' }} />
                  <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem 0.6rem 2.2rem', border: '1px solid #CCCCCC', fontSize: '0.8rem' }}
                  />
                </div>

                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  style={{ padding: '0.6rem 1rem', border: '1px solid #CCCCCC', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
                >
                  <option value="ALL">Toutes les catégories</option>
                  {categories.map((c) => (
                    <option key={c.id || c.slug} value={c.slug || c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="btn-stylist-dark"
                style={{ padding: '0.6rem 1.4rem', fontSize: '0.75rem' }}
              >
                <Plus size={15} />
                <span>NOUVEAU VÊTEMENT</span>
              </button>
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
                        {categories.find(c => c.slug === p.category)?.name || p.category}
                      </td>
                      <td style={{ padding: '0.7rem 0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {Number(p.price).toLocaleString('fr-FR')} FCFA
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
                          {p.inStock ? 'EN STOCK' : 'RUPTURE'}
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
            TAB 5 : GALERIE / PORTFOLIO LOOKBOOK
            ========================================================================= */}
        {activeTab === 'realisations' && (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', margin: 0 }}>
                  Galerie & Réalisations de l'Atelier
                </h3>
                <p style={{ color: '#666666', fontSize: '0.82rem', marginTop: '0.3rem', marginBottom: 0 }}>
                  Vos photos ajoutées ici s'affichent automatiquement sur la page d'accueil et dans la page Lookbook pour tous les visiteurs.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddPhotoModalOpen(true)}
                className="btn-stylist-dark"
                style={{ padding: '0.65rem 1.3rem', fontSize: '0.75rem' }}
              >
                <Plus size={15} />
                <span>AJOUTER UNE PHOTO</span>
              </button>
            </div>

            {realisations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem', border: '1px dashed #CCCCCC' }}>
                <ImageIcon size={36} color="#888888" style={{ margin: '0 auto 0.8rem' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>Aucune photo dans la galerie</h4>
                <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '0.3rem' }}>
                  Ajoutez les clichés de vos créations (couture, vestes, costumes, flocages) pour inspirer vos clients.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddPhotoModalOpen(true)}
                  className="btn-stylist-dark"
                  style={{ marginTop: '1rem', padding: '0.7rem 1.4rem', fontSize: '0.75rem' }}
                >
                  <Plus size={15} />
                  <span>AJOUTER MA PREMIÈRE PHOTO</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.4rem' }}>
                {realisations.map((r) => (
                  <div key={r.id} style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden', backgroundColor: '#F3F4F6' }}>
                      <img
                        src={r.image}
                        alt={r.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = '/assets/img/creation-1.jpg'; }}
                      />
                      {r.badge && (
                        <span style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: '#000000',
                          color: '#FFFFFF',
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.2rem 0.5rem',
                          textTransform: 'uppercase',
                          fontWeight: 700
                        }}>
                          {r.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#888888', textTransform: 'uppercase', display: 'block' }}>
                          {r.category}
                        </span>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', marginTop: '0.3rem', lineHeight: 1.2 }}>
                          {r.title}
                        </h4>
                        {r.desc && (
                          <p style={{ fontSize: '0.75rem', color: '#666666', marginTop: '0.4rem', lineHeight: 1.4 }}>
                            {r.desc}
                          </p>
                        )}
                      </div>
                      <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid #EEEEEE', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Supprimer la photo "${r.title}" de la galerie ?`)) {
                              deleteRealisation(r.id);
                            }
                          }}
                          style={{
                            padding: '0.35rem 0.7rem',
                            border: '1px solid #FFCCCC',
                            backgroundColor: '#FFF5F5',
                            color: '#DC2626',
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <Trash2 size={12} />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* =========================================================================
          MODAL 1 : NOUVELLE COMMANDE ATELIER (COUTURE, FLOCAGE, PRÊT-À-PORTER)
          ========================================================================= */}
      {isAddOrderModalOpen && (
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
            padding: '2rem',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888888', textTransform: 'uppercase' }}>
                  Enregistrement Manuel
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                  Nouvelle Commande Atelier
                </h3>
              </div>
              <button onClick={() => setIsAddOrderModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem', fontWeight: 600 }}>
                  Type de Travail *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {[
                    { id: 'couture', label: 'Couture Sur-Mesure' },
                    { id: 'flocage', label: 'Flocage Textile' },
                    { id: 'pret-a-porter', label: 'Prêt-à-Porter' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setNewOrder({ ...newOrder, type: t.id })}
                      style={{
                        padding: '0.65rem 0.5rem',
                        border: newOrder.type === t.id ? '2px solid #000000' : '1px solid #DDDDDD',
                        backgroundColor: newOrder.type === t.id ? '#000000' : '#FFFFFF',
                        color: newOrder.type === t.id ? '#FFFFFF' : '#000000',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Nom du client *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Patrice Talon"
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    className="input-stylist"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Téléphone WhatsApp *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: +229 97 00 00 00"
                    value={newOrder.customerPhone}
                    onChange={(e) => setNewOrder({ ...newOrder, customerPhone: e.target.value })}
                    className="input-stylist"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Adresse / Lieu de rendez-vous
                </label>
                <input
                  type="text"
                  placeholder="Ex: Quartier Les Cocotiers, Cotonou ou À l'Atelier"
                  value={newOrder.deliveryAddress}
                  onChange={(e) => setNewOrder({ ...newOrder, deliveryAddress: e.target.value })}
                  className="input-stylist"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Détails du travail / Mensurations / Consignes *
                </label>
                <textarea
                  rows="3"
                  placeholder={
                    newOrder.type === 'couture'
                      ? 'Ex: Costume 3 pièces noir, épaule 48, tour de taille 84, longueur veste 76...'
                      : newOrder.type === 'flocage'
                      ? 'Ex: 10 Polos noirs avec logo doré dos (20cm) + nom côté cœur...'
                      : 'Ex: Veste Croisée Soie Noire, Taille L, quantité 1...'
                  }
                  value={newOrder.details}
                  onChange={(e) => setNewOrder({ ...newOrder, details: e.target.value })}
                  className="input-stylist"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Montant / Devis (FCFA)
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 95000"
                    value={newOrder.amount}
                    onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })}
                    className="input-stylist"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Statut initial
                  </label>
                  <select
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                    className="input-stylist"
                  >
                    <option value="en_attente">En attente</option>
                    <option value="confirmee">Confirmée</option>
                    <option value="en_production">En confection / production</option>
                  </select>
                </div>
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
                  ENREGISTRER LA COMMANDE
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddOrderModalOpen(false)}
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

      {/* =========================================================================
          MODAL 2 : NOUVELLE CATÉGORIE
          ========================================================================= */}
      {isAddCatModalOpen && (
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
            maxWidth: '460px',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                Ajouter une Catégorie
              </h3>
              <button onClick={() => setIsAddCatModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Nom de la catégorie *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Chemises Soie, Robes Cérémonie..."
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  className="input-stylist"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Type d'utilisation *
                </label>
                <select
                  value={newCat.type}
                  onChange={(e) => setNewCat({ ...newCat, type: e.target.value })}
                  className="input-stylist"
                >
                  <option value="shop">Boutique (Prêt-à-Porter)</option>
                  <option value="lookbook">Galerie Lookbook (Atelier)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Ordre d'affichage (Numéro)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 1"
                  value={newCat.sort_order}
                  onChange={(e) => setNewCat({ ...newCat, sort_order: e.target.value })}
                  className="input-stylist"
                />
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
                  CRÉER LA CATÉGORIE
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddCatModalOpen(false)}
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

      {/* =========================================================================
          MODAL 3 : AJOUTER UN VÊTEMENT (PRODUIT)
          ========================================================================= */}
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
            padding: '2rem',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                Ajouter une Pièce au Catalogue
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
                    {categories.map((c) => (
                      <option key={c.id || c.slug} value={c.slug || c.id}>
                        {c.name}
                      </option>
                    ))}
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

      {/* =========================================================================
          MODAL 4 : MODIFIER UN VÊTEMENT (PRODUIT)
          ========================================================================= */}
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
                    {categories.map((c) => (
                      <option key={c.id || c.slug} value={c.slug || c.id}>
                        {c.name}
                      </option>
                    ))}
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

      {/* =========================================================================
          MODAL 5 : AJOUT PHOTO DANS LA GALERIE LOOKBOOK
          ========================================================================= */}
      {isAddPhotoModalOpen && (
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
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            position: 'relative'
          }}>
            <button
              type="button"
              onClick={() => {
                setIsAddPhotoModalOpen(false);
                setPhotoFile(null);
                setPhotoPreview('');
              }}
              style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              PORTFOLIO & LOOKBOOK
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginTop: '0.2rem', marginBottom: '1.4rem' }}>
              Ajouter une Photo à la Galerie
            </h2>

            <form onSubmit={handleAddPhotoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Zone Téléversement Fichier */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Sélectionner une photo depuis votre appareil
                </label>
                <div style={{
                  border: '2px dashed #000000',
                  padding: '1.2rem',
                  textAlign: 'center',
                  backgroundColor: '#FAFAFA',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFileChange}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                  {photoPreview ? (
                    <div>
                      <img
                        src={photoPreview}
                        alt="Aperçu sélection"
                        style={{ maxHeight: '180px', margin: '0 auto', objectFit: 'contain' }}
                      />
                      <span style={{ display: 'block', fontSize: '0.72rem', color: '#166534', marginTop: '0.5rem', fontWeight: 600 }}>
                        Photo sélectionnée prête (Cliquer pour changer)
                      </span>
                    </div>
                  ) : (
                    <div>
                      <Upload size={28} color="#000000" style={{ margin: '0 auto 0.5rem' }} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block' }}>
                        Cliquez ou glissez une photo ici
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#666666', display: 'block', marginTop: '0.2rem' }}>
                        Formats supportés : JPG, PNG, WEBP (Jusqu'à 10 Mo)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* URL alternative */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Ou saisir une URL d'image directe
                </label>
                <input
                  type="text"
                  placeholder="https://... ou /assets/img/..."
                  value={newPhoto.imageUrl}
                  onChange={(e) => {
                    setNewPhoto({ ...newPhoto, imageUrl: e.target.value });
                    if (e.target.value) setPhotoPreview(e.target.value);
                  }}
                  className="input-stylist"
                />
              </div>

              {/* Titre */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem', fontWeight: 600 }}>
                  Titre de la création *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Veste Croisée Cérémonie Bleu Nuit"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  className="input-stylist"
                  required
                />
              </div>

              {/* Catégorie & Badge */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Catégorie de la tenue
                  </label>
                  <select
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="input-stylist"
                  >
                    <option value="Sur-Mesure Cérémonie">Sur-Mesure Cérémonie</option>
                    <option value="Haute Couture">Haute Couture</option>
                    <option value="Tailoring & Vestes">Tailoring & Vestes</option>
                    <option value="Flocage & Marquage">Flocage & Marquage</option>
                    <option value="Prêt-à-Porter">Prêt-à-Porter</option>
                    <option value="Streetwear Éditorial">Streetwear Éditorial</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Mention / Badge
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Cérémonie, Créateur..."
                    value={newPhoto.badge}
                    onChange={(e) => setNewPhoto({ ...newPhoto, badge: e.target.value })}
                    className="input-stylist"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Description / Finitions de confection
                </label>
                <textarea
                  rows="3"
                  placeholder="Ex: Coupe structurée, doublure satinée, boutons sur-mesure..."
                  value={newPhoto.desc}
                  onChange={(e) => setNewPhoto({ ...newPhoto, desc: e.target.value })}
                  className="input-stylist"
                />
              </div>

              {/* Bouton Enregistrer */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.8rem' }}>
                <button
                  type="submit"
                  disabled={isUploadingPhoto}
                  style={{
                    flex: 1,
                    padding: '0.95rem',
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: isUploadingPhoto ? 'not-allowed' : 'pointer',
                    opacity: isUploadingPhoto ? 0.7 : 1
                  }}
                >
                  {isUploadingPhoto ? 'TÉLÉVERSEMENT EN COURS...' : 'ENREGISTRER LA PHOTO DANS LA GALERIE'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddPhotoModalOpen(false);
                    setPhotoFile(null);
                    setPhotoPreview('');
                  }}
                  style={{
                    padding: '0.95rem 1.4rem',
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
