/**
 * Client API Laravel 11 pour AllFashion
 * Communique avec les endpoints /api/v1
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://allfashion-backend.test/api/v1';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `Erreur API (${res.status})`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[API Laravel Offline/Erreur] Sur ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // 1. Paramètres du site
  getSettings: () => request('/settings'),

  // 2. Catégories
  getCategories: (type) => request(`/categories${type ? `?type=${type}` : ''}`),

  // 3. Produits
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products${query ? `?${query}` : ''}`);
  },
  getProductBySlug: (slug) => request(`/products/${slug}`),

  // 4. Galerie / Lookbook
  getLookbook: (category) => request(`/lookbook${category ? `?category=${category}` : ''}`),

  // 5. Création de commande (retourne référence unique, montant et lien WhatsApp officiel)
  createOrder: (orderData) => request('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  }),

  // 6. Demande de rendez-vous sur-mesure
  createAppointment: (appointmentData) => request('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData)
  }),

  // 7. Demande de flocage
  createFlockingRequest: (flockingData) => request('/flocking-requests', {
    method: 'POST',
    body: JSON.stringify(flockingData)
  }),

  // 8. Contact
  sendContact: (contactData) => request('/contacts', {
    method: 'POST',
    body: JSON.stringify(contactData)
  }),

  // 9. Back-Office Admin
  admin: {
    getStats: () => request('/admin/stats'),
    getAnalytics: () => request('/admin/analytics'),
    getOrders: () => request('/admin/orders'),
    updateOrderStatus: (id, status) => request(`/admin/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
    getAppointments: () => request('/admin/appointments'),
    updateAppointmentStatus: (id, status) => request(`/admin/appointments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
    // Catégories
    getCategories: () => request('/admin/categories'),
    createCategory: (data) => request('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateCategory: (id, data) => request(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    deleteCategory: (id) => request(`/admin/categories/${id}`, {
      method: 'DELETE'
    }),

    // Produits
    getProducts: () => request('/admin/products'),
    createProduct: (data) => request('/admin/products', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateProduct: (id, data) => request(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    deleteProduct: (id) => request(`/admin/products/${id}`, {
      method: 'DELETE'
    }),

    // Commandes & Projets (Manuel & Flocage)
    createManualOrder: (data) => request('/admin/orders', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    getFlockingRequests: () => request('/admin/flocking-requests'),
    updateFlockingStatus: (id, status) => request(`/admin/flocking-requests/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    })
  }
};
