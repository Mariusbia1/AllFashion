import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { api } from '../services/api';

const StoreContext = createContext();

const INITIAL_REALISATIONS = [
  {
    id: 'real-1',
    title: 'Costume Croisé 3 Pièces',
    category: 'Sur-Mesure Cérémonie',
    image: '/assets/img/creation-1.jpg',
    desc: 'Coupe droite élégante, veste structurée et finitions soignées pour mariage.',
    badge: 'Cérémonie'
  },
  {
    id: 'real-2',
    title: 'Robe Sculpturale Monochrome',
    category: 'Haute Couture',
    image: '/assets/img/creation-2.jpg',
    desc: 'Jeu de contrastes noir et blanc fluide pour soirée de gala.',
    badge: 'Édition Privée'
  },
  {
    id: 'real-3',
    title: 'Gilet Artistique Imprimé',
    category: 'Signature Styliste',
    image: '/images/look-imprime-2.jpg',
    desc: 'La création signature portée par le styliste créateur AllFashion.',
    badge: 'Créateur'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'CMD-2026-0001',
    type: 'pret-a-porter',
    customerName: 'Koffi Mensah',
    whatsappNumber: '+229 97 12 34 56',
    deliveryAddress: 'Haie Vive, Cotonou',
    items: [{ name: 'Veste Croisée Coupe Tailleur', size: 'L', price: 95000, quantity: 1 }],
    totalAmount: 95000,
    status: 'confirmee',
    notes: 'Livraison en soirée après 18h',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: 'RDV-2026-0001',
    type: 'couture',
    clientName: 'Patrice Talon',
    clientPhone: '+229 66 55 44 33',
    locationType: 'domicile',
    address: 'Quartier Les Cocotiers, Cotonou',
    dateSlot: '2026-12-05',
    garmentIdea: 'Costume 3 pièces Cérémonie sur-mesure (Veste, Pantalon, Gilet)',
    status: 'confirme',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_FLOCKING = [
  {
    id: 'FLOC-2026-0001',
    type: 'flocage',
    clientName: 'Sèna Hounnou',
    clientPhone: '+229 97 45 67 89',
    garmentType: 'Hoodies Coton Noir Épais',
    position: 'Dos (Logo 25cm) + Poitrine gauche (Prénoms)',
    quantity: 12,
    instructions: 'Marquage or mat premium pour équipe de basketball',
    quotedPrice: 84000,
    status: 'en_production',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_ANALYTICS = {
  totalVisits: 3842,
  uniqueVisitors: 2154,
  pageViews: 9680,
  conversionRate: '4.8%',
  dailyVisits: [
    { day: 'Lun', date: '24 Nov', visits: 385, views: 920 },
    { day: 'Mar', date: '25 Nov', visits: 440, views: 1060 },
    { day: 'Mer', date: '26 Nov', visits: 510, views: 1280 },
    { day: 'Jeu', date: '27 Nov', visits: 490, views: 1190 },
    { day: 'Ven', date: '28 Nov', visits: 615, views: 1580 },
    { day: 'Sam', date: '29 Nov', visits: 780, views: 1950 },
    { day: 'Dim', date: '30 Nov', visits: 622, views: 1700 },
  ],
  topPages: [
    { path: '/', name: 'Accueil & Univers Atelier', views: 3420, percent: 35 },
    { path: '/boutique', name: 'Boutique Prêt-à-Porter', views: 2850, percent: 29 },
    { path: '/sur-mesure', name: 'Confection Sur-Mesure', views: 1480, percent: 15 },
    { path: '/flocage', name: 'Flocage & Personnalisation', views: 1120, percent: 12 },
    { path: '/lookbook', name: 'Galerie Lookbook', views: 810, percent: 9 },
  ],
  devices: [
    { type: 'Smartphones (Mobile)', percent: 79, count: 3035 },
    { type: 'Ordinateurs (Desktop)', percent: 18, count: 691 },
    { type: 'Tablettes', percent: 3, count: 116 },
  ],
  sources: [
    { source: 'WhatsApp Direct & Statuts', percent: 46, visits: 1767 },
    { source: 'Instagram & Réseaux Sociaux', percent: 32, visits: 1229 },
    { source: 'Accès Direct & Bouche-à-oreille', percent: 15, visits: 576 },
    { source: 'Recherche Google / Moteurs', percent: 7, visits: 270 },
  ]
};

export function StoreProvider({ children }) {
  // Produits
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('allfashion_products');
    const raw = saved ? JSON.parse(saved) : PRODUCTS;
    return raw.map((p) => {
      const img = p.image || (p.images && p.images[0]) || p.main_image || '/assets/img/creation-1.jpg';
      return {
        ...p,
        image: img,
        images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [img]
      };
    });
  });

  // Catégories
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('allfashion_categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });

  // Commandes Prêt-à-Porter
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('allfashion_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Rendez-vous Sur-Mesure (Couture)
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('allfashion_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  // Demandes de Flocage
  const [flockingRequests, setFlockingRequests] = useState(() => {
    const saved = localStorage.getItem('allfashion_flocking_requests');
    return saved ? JSON.parse(saved) : INITIAL_FLOCKING;
  });

  // Réalisations Lookbook
  const [realisations, setRealisations] = useState(() => {
    const saved = localStorage.getItem('allfashion_realisations');
    return saved ? JSON.parse(saved) : INITIAL_REALISATIONS;
  });

  // Statistiques & Visites
  const [analytics, setAnalytics] = useState(() => {
    const saved = localStorage.getItem('allfashion_analytics');
    return saved ? JSON.parse(saved) : INITIAL_ANALYTICS;
  });

  // Session Admin
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('allfashion_admin_auth') === 'true';
  });

  // État de connexion au backend Laravel
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Synchronisation avec l'API Laravel au chargement
  useEffect(() => {
    let isMounted = true;
    async function syncWithLaravel() {
      try {
        const [prodRes, catRes, flocRes, lookRes] = await Promise.all([
          api.getProducts().catch(() => null),
          api.getCategories().catch(() => null),
          api.admin.getFlockingRequests().catch(() => null),
          api.getLookbook().catch(() => null),
        ]);

        if (isMounted && prodRes && prodRes.data && prodRes.data.length > 0) {
          setIsBackendConnected(true);
          const formatted = prodRes.data.map((p) => {
            const mainImg = p.main_image || (p.images && p.images[0]) || p.image || '/assets/img/creation-1.jpg';
            return {
              id: p.id,
              slug: p.slug,
              name: p.name,
              category: p.category ? p.category.slug : 'HOMME',
              price: p.price,
              priceFormatted: `${Number(p.price).toLocaleString('fr-FR')} FCFA`,
              badge: p.badge,
              description: p.description,
              details: Array.isArray(p.details) ? p.details : [],
              sizes: Array.isArray(p.sizes) ? p.sizes : ['S', 'M', 'L', 'XL'],
              image: mainImg,
              images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [mainImg],
              inStock: (p.stock || 0) > 0 && p.is_active !== false,
            };
          });
          setProducts(formatted);
        }

        if (isMounted && catRes && catRes.data && catRes.data.length > 0) {
          setCategories(catRes.data.map(c => ({
            id: c.slug || c.id,
            slug: c.slug,
            name: c.name,
            type: c.type || 'shop',
            count: c.products_count || 0,
            image: '/assets/img/creation-1.jpg'
          })));
        }

        if (isMounted && flocRes && flocRes.data && flocRes.data.length > 0) {
          setFlockingRequests(flocRes.data.map(f => ({
            id: f.reference || `FLOC-${f.id}`,
            reference: f.reference,
            clientName: f.client_name,
            clientPhone: f.client_phone,
            garmentType: f.garment_type,
            position: f.position,
            quantity: f.quantity,
            instructions: f.instructions,
            quotedPrice: f.quoted_price,
            status: f.status,
            createdAt: f.created_at
          })));
        }

        if (isMounted && lookRes && lookRes.data && lookRes.data.length > 0) {
          setRealisations(lookRes.data.map(l => ({
            id: l.id,
            title: l.title,
            category: l.category ? l.category.name : (l.badge || 'Haute Couture'),
            image: l.image_path.startsWith('http')
              ? l.image_path
              : (l.image_path.startsWith('/') ? l.image_path : `http://127.0.0.1:8000/storage/${l.image_path}`),
            desc: l.description || '',
            badge: l.badge || (l.category ? l.category.name : 'Créateur')
          })));
        }
      } catch (err) {
        console.info('[Store] Utilisation des données locales');
      }
    }

    syncWithLaravel();
    return () => { isMounted = false; };
  }, []);

  // Synchronisation localStorage
  useEffect(() => {
    localStorage.setItem('allfashion_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('allfashion_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('allfashion_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('allfashion_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('allfashion_flocking_requests', JSON.stringify(flockingRequests));
  }, [flockingRequests]);

  useEffect(() => {
    localStorage.setItem('allfashion_realisations', JSON.stringify(realisations));
  }, [realisations]);

  useEffect(() => {
    localStorage.setItem('allfashion_analytics', JSON.stringify(analytics));
  }, [analytics]);

  // Enregistrement d'une visite réelle
  const recordVisit = (pathname) => {
    setAnalytics((prev) => {
      const updatedTotal = prev.totalVisits + 1;
      const updatedViews = prev.pageViews + 1;
      const updatedPages = prev.topPages.map((pg) => {
        if (pg.path === pathname || (pg.path === '/' && (pathname === '' || pathname === '/'))) {
          return { ...pg, views: pg.views + 1 };
        }
        return pg;
      });
      return {
        ...prev,
        totalVisits: updatedTotal,
        pageViews: updatedViews,
        topPages: updatedPages
      };
    });
  };

  // Auth Admin
  const login = (username, password) => {
    if (username === 'admin' && (password === 'allfashion2026' || password === 'admin')) {
      setIsAdmin(true);
      localStorage.setItem('allfashion_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('allfashion_admin_auth');
  };

  // Actions Catégories
  const addCategory = async (catData) => {
    const slug = (catData.slug || catData.name).toUpperCase().trim().replace(/[^A-Z0-9]/gi, '_');
    const newCat = {
      id: slug,
      slug: slug,
      name: catData.name,
      type: catData.type || 'shop',
      count: 0,
      image: '/assets/img/creation-1.jpg',
      sort_order: Number(catData.sort_order) || 0,
      is_active: true
    };
    setCategories((prev) => [...prev, newCat]);

    try {
      await api.admin.createCategory({
        name: newCat.name,
        type: newCat.type,
        sort_order: newCat.sort_order
      });
    } catch (e) {}

    return newCat;
  };

  const deleteCategory = async (idOrSlug) => {
    setCategories((prev) => prev.filter((c) => c.id !== idOrSlug && c.slug !== idOrSlug));
    if (typeof idOrSlug === 'number') {
      try {
        await api.admin.deleteCategory(idOrSlug);
      } catch (e) {}
    }
  };

  // Actions Produits
  const addProduct = async (newProd) => {
    const id = newProd.id || `prod-${Date.now()}`;
    const img = newProd.image || (newProd.images && newProd.images[0]) || '/images/look-imprime-2.jpg';
    const product = {
      ...newProd,
      id,
      slug: newProd.slug || id,
      price: Number(newProd.price),
      inStock: newProd.inStock !== false,
      image: img,
      images: newProd.images || [img]
    };
    setProducts((prev) => [product, ...prev]);

    // Envoi au backend Laravel
    try {
      await api.admin.createProduct({
        name: product.name,
        price: product.price,
        category_id: newProd.category_id || null,
        description: product.description,
        main_image: img,
        stock: product.inStock ? 10 : 0
      });
    } catch (e) {}
  };

  const updateProduct = async (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );

    if (typeof id === 'number') {
      try {
        await api.admin.updateProduct(id, updatedFields);
      } catch (e) {}
    }
  };

  const deleteProduct = async (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    if (typeof id === 'number') {
      try {
        await api.admin.deleteProduct(id);
      } catch (e) {}
    }
  };

  // Actions Commandes Prêt-à-Porter
  const addOrder = async (orderData) => {
    const newOrder = {
      ...orderData,
      type: 'pret-a-porter',
      id: `CMD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'en_attente',
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);

    try {
      await api.createOrder({
        customer_name: orderData.customerName,
        customer_phone: orderData.whatsappNumber,
        customer_address: orderData.deliveryAddress,
        notes: orderData.notes,
        items: (orderData.items || []).map(i => ({
          name: i.name,
          size: i.size || 'M',
          unit_price: i.price,
          quantity: i.quantity || 1
        }))
      });
    } catch (e) {}

    return newOrder;
  };

  const updateOrderStatus = async (id, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );

    if (typeof id === 'number') {
      try {
        await api.admin.updateOrderStatus(id, status);
      } catch (e) {}
    }
  };

  // Actions Rendez-vous Couture
  const addAppointment = async (aptData) => {
    const newApt = {
      ...aptData,
      type: 'couture',
      id: `RDV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      status: 'a_confirmer',
      createdAt: new Date().toISOString()
    };
    setAppointments((prev) => [newApt, ...prev]);

    try {
      await api.createAppointment({
        client_name: aptData.clientName,
        client_phone: aptData.clientPhone,
        location_type: aptData.locationType || 'domicile',
        address: aptData.address,
        garment_type: aptData.garmentIdea,
        preferred_date: aptData.dateSlot,
      });
    } catch (e) {}

    return newApt;
  };

  const updateAppointmentStatus = async (id, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );

    if (typeof id === 'number') {
      try {
        await api.admin.updateAppointmentStatus(id, status);
      } catch (e) {}
    }
  };

  // Actions Flocage
  const updateFlockingStatus = async (id, status) => {
    setFlockingRequests((prev) =>
      prev.map((f) => (f.id === id || f.reference === id ? { ...f, status } : f))
    );

    if (typeof id === 'number') {
      try {
        await api.admin.updateFlockingStatus(id, status);
      } catch (e) {}
    }
  };

  // Création Manuelle de Commande (Atelier / WhatsApp / Visite)
  const addManualOrder = async ({ type, customerName, customerPhone, deliveryAddress, amount, details, status }) => {
    if (type === 'couture') {
      const apt = await addAppointment({
        clientName: customerName,
        clientPhone: customerPhone,
        locationType: 'atelier',
        address: deliveryAddress || 'Atelier AllFashion Cotonou',
        garmentIdea: details || 'Confection Sur-Mesure',
        dateSlot: 'Sur rendez-vous',
        status: status === 'confirmee' ? 'confirme' : 'en_attente'
      });
      try {
        await api.admin.createManualOrder({
          type: 'couture',
          customer_name: customerName,
          customer_phone: customerPhone,
          delivery_address: deliveryAddress,
          amount,
          details,
          status
        });
      } catch (e) {}
      return apt;
    } else if (type === 'flocage') {
      const newFloc = {
        id: `FLOC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        type: 'flocage',
        clientName: customerName,
        clientPhone: customerPhone,
        garmentType: 'Textile / Vêtement',
        position: 'Personnalisation',
        quantity: 1,
        instructions: details,
        quotedPrice: Number(amount) || 0,
        status: status === 'confirmee' ? 'en_production' : 'nouvelle',
        createdAt: new Date().toISOString()
      };
      setFlockingRequests((prev) => [newFloc, ...prev]);
      try {
        await api.admin.createManualOrder({
          type: 'flocage',
          customer_name: customerName,
          customer_phone: customerPhone,
          delivery_address: deliveryAddress,
          amount,
          details,
          status
        });
      } catch (e) {}
      return newFloc;
    } else {
      const ord = await addOrder({
        customerName,
        whatsappNumber: customerPhone,
        deliveryAddress: deliveryAddress || 'Retrait en Atelier',
        items: [{ name: details || 'Article Prêt-à-Porter', size: 'Sur-Mesure', price: Number(amount) || 0, quantity: 1 }],
        totalAmount: Number(amount) || 0,
        notes: details,
        status: status || 'en_attente'
      });
      try {
        await api.admin.createManualOrder({
          type: 'pret-a-porter',
          customer_name: customerName,
          customer_phone: customerPhone,
          delivery_address: deliveryAddress,
          amount,
          details,
          status
        });
      } catch (e) {}
      return ord;
    }
  };

  // Actions Réalisations
  const addRealisation = async (real) => {
    const tempId = `real-${Date.now()}`;
    const newReal = {
      ...real,
      id: tempId
    };
    setRealisations((prev) => [newReal, ...prev]);

    try {
      const res = await api.admin.createLookbookItem({
        title: real.title,
        image_path: real.image,
        description: real.desc || '',
        badge: real.badge || 'Créateur',
        category_slug: real.category
      });
      if (res && res.data) {
        setRealisations((prev) =>
          prev.map((r) =>
            r.id === tempId
              ? {
                  ...r,
                  id: res.data.id,
                  image: res.data.image_path.startsWith('http')
                    ? res.data.image_path
                    : (res.data.image_path.startsWith('/') ? res.data.image_path : `http://127.0.0.1:8000/storage/${res.data.image_path}`)
                }
              : r
          )
        );
      }
    } catch (e) {
      console.info('Galerie enregistrée localement:', e.message);
    }
    return newReal;
  };

  const deleteRealisation = async (id) => {
    setRealisations((prev) => prev.filter((r) => r.id !== id));
    try {
      if (typeof id === 'number' || !String(id).startsWith('real-')) {
        await api.admin.deleteLookbookItem(id);
      }
    } catch (e) {
      console.info('Suppression galerie locale:', e.message);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        appointments,
        flockingRequests,
        realisations,
        analytics,
        recordVisit,
        isAdmin,
        isBackendConnected,
        login,
        logout,
        addCategory,
        deleteCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        addAppointment,
        updateAppointmentStatus,
        updateFlockingStatus,
        addManualOrder,
        addRealisation,
        deleteRealisation
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
