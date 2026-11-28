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
    clientName: 'Patrice Talon',
    clientPhone: '+229 66 55 44 33',
    locationType: 'domicile',
    address: 'Quartier Les Cocotiers, Cotonou',
    dateSlot: '2026-12-05',
    garmentIdea: 'Costume 3 pièces Cérémonie sur-mesure',
    status: 'confirme',
    createdAt: new Date().toISOString()
  }
];

export function StoreProvider({ children }) {
  // Produits
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('allfashion_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Catégories
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('allfashion_categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });

  // Commandes
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('allfashion_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Rendez-vous
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('allfashion_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  // Réalisations
  const [realisations, setRealisations] = useState(() => {
    const saved = localStorage.getItem('allfashion_realisations');
    return saved ? JSON.parse(saved) : INITIAL_REALISATIONS;
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
        const [prodRes, catRes] = await Promise.all([
          api.getProducts().catch(() => null),
          api.getCategories().catch(() => null),
        ]);

        if (isMounted && prodRes && prodRes.data && prodRes.data.length > 0) {
          setIsBackendConnected(true);
          const formatted = prodRes.data.map((p) => ({
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
            images: [p.main_image || '/assets/img/creation-1.jpg'],
            inStock: (p.stock || 0) > 0 && p.is_active !== false,
          }));
          setProducts(formatted);
        }

        if (isMounted && catRes && catRes.data && catRes.data.length > 0) {
          setCategories(catRes.data.map(c => ({
            id: c.slug,
            name: c.name,
            count: c.products_count || 0,
            image: '/assets/img/creation-1.jpg'
          })));
        }
      } catch (err) {
        // En cas d'indisponibilité du serveur, le store local assure la continuité
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
    localStorage.setItem('allfashion_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('allfashion_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('allfashion_realisations', JSON.stringify(realisations));
  }, [realisations]);

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

  // Actions Produits
  const addProduct = async (newProd) => {
    const id = newProd.id || `prod-${Date.now()}`;
    const product = {
      ...newProd,
      id,
      slug: newProd.slug || id,
      price: Number(newProd.price),
      inStock: newProd.inStock !== false,
      images: newProd.images || [newProd.image]
    };
    setProducts((prev) => [product, ...prev]);

    // Envoi au backend Laravel
    try {
      await api.admin.createProduct({
        name: product.name,
        price: product.price,
        description: product.description,
        main_image: product.images[0],
        stock: product.inStock ? 10 : 0
      });
    } catch (e) {
      // Stocké localement
    }
  };

  const updateProduct = async (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );

    if (typeof id === 'number') {
      try {
        await api.admin.updateProduct(id, updatedFields);
      } catch (e) {
        // Ignorer si local
      }
    }
  };

  const deleteProduct = async (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    if (typeof id === 'number') {
      try {
        await api.admin.deleteProduct(id);
      } catch (e) {
        // Ignorer si local
      }
    }
  };

  // Actions Commandes
  const addOrder = async (orderData) => {
    const newOrder = {
      ...orderData,
      id: `CMD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'en_attente',
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);

    // Enregistrement dans l'API Laravel
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
    } catch (e) {
      // Sauvegardé localement
    }

    return newOrder;
  };

  const updateOrderStatus = async (id, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );

    if (typeof id === 'number') {
      try {
        await api.admin.updateOrderStatus(id, status);
      } catch (e) {
        // Ignorer
      }
    }
  };

  // Actions Rendez-vous
  const addAppointment = async (aptData) => {
    const newApt = {
      ...aptData,
      id: `RDV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      status: 'a_confirmer',
      createdAt: new Date().toISOString()
    };
    setAppointments((prev) => [newApt, ...prev]);

    // Enregistrement dans l'API Laravel
    try {
      await api.createAppointment({
        client_name: aptData.clientName,
        client_phone: aptData.clientPhone,
        location_type: aptData.locationType || 'domicile',
        address: aptData.address,
        garment_type: aptData.garmentIdea,
        preferred_date: aptData.dateSlot,
      });
    } catch (e) {
      // Sauvegardé localement
    }

    return newApt;
  };

  const updateAppointmentStatus = async (id, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );

    if (typeof id === 'number') {
      try {
        await api.admin.updateAppointmentStatus(id, status);
      } catch (e) {
        // Ignorer
      }
    }
  };

  // Actions Réalisations
  const addRealisation = (real) => {
    const newReal = {
      ...real,
      id: `real-${Date.now()}`
    };
    setRealisations((prev) => [newReal, ...prev]);
  };

  const deleteRealisation = (id) => {
    setRealisations((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        appointments,
        realisations,
        isAdmin,
        isBackendConnected,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        addAppointment,
        updateAppointmentStatus,
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
