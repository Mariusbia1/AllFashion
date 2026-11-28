import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';

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
    id: 'CMD-2026-1042',
    customerName: 'Koffi Mensah',
    whatsappNumber: '+229 97 12 34 56',
    deliveryAddress: 'Haie Vive, Cotonou',
    items: [{ name: 'Veste Croisée Coupe Tailleur', size: 'L', price: 95000, quantity: 1 }],
    totalAmount: 95000,
    status: 'confirmee',
    notes: 'Livraison en soirée après 18h',
    createdAt: new Date().toISOString()
  },
  {
    id: 'CMD-2026-1043',
    customerName: 'Amina Bello',
    whatsappNumber: '+229 66 88 99 00',
    deliveryAddress: 'Cadjehoun, Cotonou',
    items: [{ name: 'Gilet Artistique Imprimé AllFashion', size: 'M', price: 65000, quantity: 1 }],
    totalAmount: 65000,
    status: 'en_attente',
    notes: 'Contactée sur WhatsApp',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: 'RDV-2026-089',
    customerName: 'Marius Biaou',
    whatsappNumber: '+229 90 00 11 22',
    locationType: 'domicile',
    address: 'Akpakpa, Cotonou',
    desiredDate: '2026-12-05',
    garmentIdea: 'Costume sur-mesure pour gala de fin d’année',
    status: 'confirme',
    createdAt: new Date().toISOString()
  },
  {
    id: 'RDV-2026-090',
    customerName: 'Diane Sossou',
    whatsappNumber: '+229 95 44 33 22',
    locationType: 'bureau',
    address: 'Ganhi, Immeuble BOA',
    desiredDate: '2026-12-08',
    garmentIdea: 'Deux ensembles tailleurs féminins',
    status: 'a_confirmer',
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
  const addProduct = (newProd) => {
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
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Actions Commandes
  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `CMD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'en_attente',
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  // Actions Rendez-vous
  const addAppointment = (aptData) => {
    const newApt = {
      ...aptData,
      id: `RDV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      status: 'a_confirmer',
      createdAt: new Date().toISOString()
    };
    setAppointments((prev) => [newApt, ...prev]);
    return newApt;
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
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
