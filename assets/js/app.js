/**
 * ATELIER RAPHAËL — APPLICATION JAVASCRIPT & WHATSAPP COMMERCE ENGINE
 * Architecture : Zero Emoji, Luxe Noir & Blanc, Full Interactive
 */

// Numéro WhatsApp officiel du styliste (à adapter selon le numéro du client)
const STYLIST_WHATSAPP_NUMBER = "22900000000"; 

// ==========================================================================
// 1. INTRO / SPLASH SCREEN ENGINE
// ==========================================================================
class IntroEngine {
  constructor() {
    this.overlay = document.getElementById('splashOverlay');
    this.flasher = document.getElementById('splashFlasher');
    this.logo = document.getElementById('splashLogo');

    this.images = [
      'assets/img/tailor_atelier_hero.jpg',
      'assets/img/atelier_sketch_table.jpg',
      'assets/img/atelier_bespoke_fitting.jpg',
      'assets/img/flocking_garment_studio.jpg',
      'assets/img/balenciaga_bomber_flat.jpg',
      'assets/img/margiela_trench_flat.jpg',
      'assets/img/rick_leather_flat.jpg',
      'assets/img/yohji_coat_flat.jpg',
      'assets/img/raf_knit_flat.jpg',
      'assets/img/jpg_mesh_flat.jpg',
      'assets/img/balenciaga_bomber_model.jpg',
      'assets/img/margiela_trench_model.jpg',
      'assets/img/rick_leather_model.jpg',
      'assets/img/yohji_coat_model.jpg',
      'assets/img/raf_knit_model.jpg'
    ];

    this.timer = null;
    this.flashInterval = null;
    this.currentIdx = 0;
    this.flasherImgs = [];
    this.isActive = false;

    if (this.overlay && this.flasher) {
      this.init();
    }
  }

  init() {
    // Populate flasher with 24 fast frames
    let list = [...this.images];
    while (list.length < 24) list = list.concat(this.images);
    list = list.slice(0, 24);

    this.flasher.innerHTML = list.map((src, i) => `
      <img class="splash-flasher-img ${i === 0 ? 'active' : ''}" src="${src}" alt="Archive Flash ${i + 1}" />
    `).join('');

    this.flasherImgs = Array.from(this.flasher.querySelectorAll('.splash-flasher-img'));

    // Skip on click anywhere
    this.overlay.addEventListener('click', () => this.dismiss());
    if (this.logo) this.logo.addEventListener('click', () => this.dismiss());

    // Skip on key press
    window.addEventListener('keydown', (e) => {
      if (this.isActive && (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter')) {
        this.dismiss();
      }
    });

    this.start();
  }

  start() {
    this.isActive = true;
    this.overlay.classList.remove('hidden-splash');

    // Rapid cycling loop (80ms)
    this.flashInterval = setInterval(() => {
      if (this.flasherImgs.length === 0) return;
      this.flasherImgs[this.currentIdx].classList.remove('active');
      this.currentIdx = (this.currentIdx + 1) % this.flasherImgs.length;
      this.flasherImgs[this.currentIdx].classList.add('active');
    }, 80);

    // Auto-dismiss after 2.2s
    this.timer = setTimeout(() => {
      this.dismiss();
    }, 2200);
  }

  dismiss() {
    if (!this.isActive) return;
    this.isActive = false;
    if (this.timer) clearTimeout(this.timer);
    clearInterval(this.flashInterval);
    this.overlay.classList.add('hidden-splash');
  }
}

// ==========================================================================
// 2. DONNÉES DU CATALOGUE PRÊT-À-PORTER
// ==========================================================================
const PRODUCTS_DATA = [
  {
    id: "p1",
    name: "Costume Tailleur Lin Brut",
    brand: "Atelier Signature",
    category: "VESTES",
    price: 95000,
    priceFormatted: "95 000 FCFA",
    image: "assets/img/balenciaga_bomber_flat.jpg",
    tag: "SUR-MESURE DISPO",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "p2",
    name: "Veste Structurée Laine Noire",
    brand: "Collection 01",
    category: "VESTES",
    price: 85000,
    priceFormatted: "85 000 FCFA",
    image: "assets/img/rick_leather_flat.jpg",
    tag: "BEST-SELLER",
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    id: "p3",
    name: "T-Shirt Signature Coton Épais",
    brand: "Atelier Essentials",
    category: "TOPS",
    price: 25000,
    priceFormatted: "25 000 FCFA",
    image: "assets/img/raf_knit_flat.jpg",
    tag: "FLOCAGE DISPO",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "p4",
    name: "Hoodie Boxy Coupe Oversize",
    brand: "Atelier Street-Chic",
    category: "TOPS",
    price: 45000,
    priceFormatted: "45 000 FCFA",
    image: "assets/img/jpg_mesh_flat.jpg",
    tag: "NOUVEAUTÉ",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "p5",
    name: "Trench Coat Long Déstructuré",
    brand: "Haute Couture",
    category: "MANTEAUX",
    price: 130000,
    priceFormatted: "130 000 FCFA",
    image: "assets/img/margiela_trench_flat.jpg",
    tag: "ÉDITION LIMITÉE",
    sizes: ["M", "L", "XL"]
  },
  {
    id: "p6",
    name: "Ensemble Veste & Pantalon Ample",
    brand: "Collection Runway",
    category: "ENSEMBLES",
    price: 110000,
    priceFormatted: "110 000 FCFA",
    image: "assets/img/yohji_coat_flat.jpg",
    tag: "PIÈCE MAÎTRESSE",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "p7",
    name: "Manteau Drap de Laine Kimono",
    brand: "Atelier Couture",
    category: "MANTEAUX",
    price: 145000,
    priceFormatted: "145 000 FCFA",
    image: "assets/img/hero_cover.jpg",
    tag: "EXCLUSIF",
    sizes: ["M", "L", "XL"]
  },
  {
    id: "p8",
    name: "Ensemble Urbain Minimaliste",
    brand: "Studio Street",
    category: "ENSEMBLES",
    price: 75000,
    priceFormatted: "75 000 FCFA",
    image: "assets/img/balenciaga_bomber_model.jpg",
    tag: "SUR COMMANDE",
    sizes: ["S", "M", "L", "XL"]
  }
];

// ==========================================================================
// 3. DONNÉES DU LOOKBOOK
// ==========================================================================
const LOOKBOOK_DATA = [
  {
    id: "lb1",
    title: "Silhouette Tailoring Cérémonie",
    category: "SUR-MESURE",
    image: "assets/img/tailor_atelier_hero.jpg"
  },
  {
    id: "lb2",
    title: "Manteau Déstructuré & Lin",
    category: "RUNWAY 2026",
    image: "assets/img/margiela_trench_model.jpg"
  },
  {
    id: "lb3",
    title: "Veste Kimono Cuir Épuré",
    category: "COLLECTION PRIVÉE",
    image: "assets/img/rick_leather_model.jpg"
  },
  {
    id: "lb4",
    title: "Ensemble Minimaliste Urbain",
    category: "STREET-CHIC",
    image: "assets/img/balenciaga_bomber_model.jpg"
  }
];

// ==========================================================================
// 4. GESTION DU PANIER & WHATSAPP COMMERCE
// ==========================================================================
class CartManager {
  constructor() {
    this.items = [];
    this.drawer = document.getElementById('cartDrawer');
    this.backdrop = document.getElementById('cartDrawerBackdrop');
    this.itemsList = document.getElementById('cartItemsList');
    this.countBadge = document.getElementById('cartCount');
    this.subtotalEl = document.getElementById('cartSubtotal');
    this.checkoutForm = document.getElementById('cartCheckoutForm');

    this.init();
  }

  init() {
    const openBtn = document.getElementById('openCartBtn');
    const closeBtn = document.getElementById('closeCartBtn');

    if (openBtn) openBtn.addEventListener('click', () => this.open());
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (this.backdrop) {
      this.backdrop.addEventListener('click', (e) => {
        if (e.target === this.backdrop) this.close();
      });
    }

    if (this.checkoutForm) {
      this.checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processWhatsAppCheckout();
      });
    }
  }

  open() {
    if (this.backdrop) this.backdrop.classList.add('active');
  }

  close() {
    if (this.backdrop) this.backdrop.classList.remove('active');
  }

  addItem(productId, selectedSize) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existing = this.items.find(item => item.id === productId && item.size === selectedSize);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity: 1
      });
    }

    this.render();
    this.open();
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.render();
  }

  getTotalAmount() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  render() {
    const totalCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    if (this.countBadge) this.countBadge.textContent = totalCount;

    if (!this.itemsList) return;

    if (this.items.length === 0) {
      this.itemsList.innerHTML = `
        <div style="padding: 4rem 0; text-align: center; color: var(--text-muted); font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;">
          Votre panier est actuellement vide.
        </div>
      `;
      if (this.subtotalEl) this.subtotalEl.textContent = "0 FCFA";
      return;
    }

    this.itemsList.innerHTML = this.items.map((item, idx) => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-meta">Taille: <strong>${item.size}</strong> • Qté: <strong>${item.quantity}</strong></div>
          <div class="cart-item-price">${(item.price * item.quantity).toLocaleString()} FCFA</div>
        </div>
        <button class="cart-item-remove" data-index="${idx}" title="Supprimer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    `).join('');

    // Attach remove handlers
    this.itemsList.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(btn.getAttribute('data-index'), 10);
        this.removeItem(index);
      });
    });

    const total = this.getTotalAmount();
    if (this.subtotalEl) this.subtotalEl.textContent = `${total.toLocaleString()} FCFA`;
  }

  processWhatsAppCheckout() {
    if (this.items.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    const clientName = document.getElementById('cartClientName').value.trim();
    const clientPhone = document.getElementById('cartClientPhone').value.trim();
    const clientAddress = document.getElementById('cartClientAddress').value.trim();

    if (!clientName || !clientPhone || !clientAddress) {
      alert("Veuillez remplir vos coordonnées pour la commande.");
      return;
    }

    // Build Formatted WhatsApp Message
    const total = this.getTotalAmount();
    let msg = `NOUVELLE COMMANDE — ATELIER RAPHAËL\n`;
    msg += `-----------------------------------\n`;
    msg += `Client : ${clientName}\n`;
    msg += `Téléphone : ${clientPhone}\n`;
    msg += `Adresse de livraison : ${clientAddress}\n`;
    msg += `-----------------------------------\n`;
    msg += `ARTICLES COMMANDÉS :\n`;

    this.items.forEach((item, i) => {
      msg += `• ${item.quantity}x ${item.name} (Taille: ${item.size}) — ${(item.price * item.quantity).toLocaleString()} FCFA\n`;
    });

    msg += `-----------------------------------\n`;
    msg += `TOTAL ESTIMÉ : ${total.toLocaleString()} FCFA\n\n`;
    msg += `Bonjour Atelier Raphaël, je souhaite valider cette commande svp.`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodedMsg}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset Cart
    this.items = [];
    this.render();
    this.close();
  }
}

// ==========================================================================
// 5. INITIALISATION DE L'APPLICATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Lance l'Intro
  new IntroEngine();

  // 2. Initialise le gestionnaire de panier
  const cart = new CartManager();

  // 3. Rendu des produits
  const productsGrid = document.getElementById('productsGrid');
  const categoryFilters = document.querySelectorAll('#categoryFilter .filter-btn');

  function renderProducts(category = 'ALL') {
    if (!productsGrid) return;

    const filtered = category === 'ALL' 
      ? PRODUCTS_DATA 
      : PRODUCTS_DATA.filter(p => p.category === category);

    productsGrid.innerHTML = filtered.map(p => `
      <div class="product-card" data-id="${p.id}">
        <div class="product-media">
          <span class="product-tag-badge">${p.tag}</span>
          <img src="${p.image}" alt="${p.name}" class="product-img" />
        </div>
        <div class="product-info">
          <span class="product-brand">${p.brand}</span>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-price">${p.priceFormatted}</div>

          <div class="size-selector" id="sizes_${p.id}">
            ${p.sizes.map((s, idx) => `
              <button type="button" class="size-pill ${idx === 0 ? 'active' : ''}" data-size="${s}">${s}</button>
            `).join('')}
          </div>

          <div class="product-actions">
            <button type="button" class="btn-add-cart" data-id="${p.id}">
              <span>Ajouter au Panier</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button type="button" class="btn-direct-wa" data-id="${p.id}" title="Commander directement sur WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach Size pill click handler
    productsGrid.querySelectorAll('.size-selector').forEach(sel => {
      const pills = sel.querySelectorAll('.size-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
        });
      });
    });

    // Attach Add To Cart handler
    productsGrid.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const activePill = document.querySelector(`#sizes_${id} .size-pill.active`);
        const size = activePill ? activePill.getAttribute('data-size') : 'M';
        cart.addItem(id, size);
      });
    });

    // Attach Direct WhatsApp handler
    productsGrid.querySelectorAll('.btn-direct-wa').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const product = PRODUCTS_DATA.find(p => p.id === id);
        const activePill = document.querySelector(`#sizes_${id} .size-pill.active`);
        const size = activePill ? activePill.getAttribute('data-size') : 'M';

        if (product) {
          let msg = `COMMANDE DIRECTE — ATELIER RAPHAËL\n`;
          msg += `-----------------------------------\n`;
          msg += `Article : ${product.name}\n`;
          msg += `Taille souhaitée : ${size}\n`;
          msg += `Prix : ${product.priceFormatted}\n`;
          msg += `-----------------------------------\n`;
          msg += `Bonjour Atelier Raphaël, je souhaite commander cette pièce directement. Pouvez-vous me confirmer sa disponibilité ?`;

          window.open(`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
        }
      });
    });
  }

  renderProducts('ALL');

  // Filter Buttons
  categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderProducts(cat);
    });
  });

  // 4. Atelier Flocage / Studio de Personnalisation
  const garmentBtns = document.querySelectorAll('#garmentTypeSelector .custom-option-btn');
  const positionBtns = document.querySelectorAll('#positionSelector .custom-option-btn');
  const mockupImage = document.getElementById('mockupImage');
  const logoOverlay = document.getElementById('logoOverlay');
  const logoPlaceholderText = document.getElementById('logoPlaceholderText');
  const dropzone = document.getElementById('dropzone');
  const logoFileInput = document.getElementById('logoFileInput');
  const flockingForm = document.getElementById('flockingForm');

  let selectedGarment = "Hoodie Oversize";
  let selectedPosition = "Dos Centré";

  garmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      garmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedGarment = btn.getAttribute('data-val');
      const mockupSrc = btn.getAttribute('data-mockup');
      if (mockupImage && mockupSrc) mockupImage.src = mockupSrc;
    });
  });

  positionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      positionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPosition = btn.textContent.trim();
      const pos = btn.getAttribute('data-pos');

      if (logoOverlay) {
        if (pos === 'chest-left') {
          logoOverlay.style.top = '30%';
          logoOverlay.style.left = '35%';
          logoOverlay.style.width = '60px';
          logoOverlay.style.height = '60px';
        } else if (pos === 'chest-center') {
          logoOverlay.style.top = '35%';
          logoOverlay.style.left = '50%';
          logoOverlay.style.width = '70px';
          logoOverlay.style.height = '70px';
        } else if (pos === 'sleeve') {
          logoOverlay.style.top = '40%';
          logoOverlay.style.left = '22%';
          logoOverlay.style.width = '50px';
          logoOverlay.style.height = '50px';
        } else {
          // Center back
          logoOverlay.style.top = '40%';
          logoOverlay.style.left = '50%';
          logoOverlay.style.width = '95px';
          logoOverlay.style.height = '95px';
        }
      }
    });
  });

  if (dropzone && logoFileInput) {
    dropzone.addEventListener('click', () => logoFileInput.click());

    logoFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (logoOverlay) {
            logoOverlay.innerHTML = `<img src="${event.target.result}" style="max-width:90%; max-height:90%; object-fit:contain;" alt="Logo Client" />`;
          }
          const dropText = document.getElementById('dropzoneText');
          if (dropText) dropText.innerHTML = `<strong>Visuel importé :</strong> ${file.name}`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (flockingForm) {
    flockingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const qty = document.getElementById('flockingQty').value || 1;
      const client = document.getElementById('flockingClient').value.trim();

      let msg = `DEMANDE DE FLOCAGE & PERSONNALISATION — ATELIER RAPHAËL\n`;
      msg += `-----------------------------------\n`;
      msg += `Client : ${client}\n`;
      msg += `Vêtement sélectionné : ${selectedGarment}\n`;
      msg += `Emplacement du marquage : ${selectedPosition}\n`;
      msg += `Quantité souhaitée : ${qty} pièce(s)\n`;
      msg += `-----------------------------------\n`;
      msg += `Bonjour Atelier Raphaël, je vous transmets mon projet de flocage. Pouvez-vous m'établir un devis et me confirmer la faisabilité ? (Je vous transmets également mon fichier image ci-joint).`;

      window.open(`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // 5. Sur-Mesure & Prise de Rendez-vous
  const rdvLocation = document.getElementById('rdvLocation');
  const addressFieldGroup = document.getElementById('addressFieldGroup');
  const appointmentForm = document.getElementById('appointmentForm');

  if (rdvLocation && addressFieldGroup) {
    rdvLocation.addEventListener('change', () => {
      if (rdvLocation.value === "À l'Atelier") {
        addressFieldGroup.style.display = 'none';
        document.getElementById('rdvAddress').removeAttribute('required');
      } else {
        addressFieldGroup.style.display = 'block';
        document.getElementById('rdvAddress').setAttribute('required', 'true');
      }
    });
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = document.getElementById('rdvLocation').value;
      const address = document.getElementById('rdvAddress') ? document.getElementById('rdvAddress').value : '';
      const garment = document.getElementById('rdvGarment').value;
      const date = document.getElementById('rdvDate').value;
      const time = document.getElementById('rdvTime').value;
      const name = document.getElementById('rdvName').value;
      const phone = document.getElementById('rdvPhone').value;

      let msg = `DEMANDE DE RENDEZ-VOUS SUR-MESURE — ATELIER RAPHAËL\n`;
      msg += `-----------------------------------\n`;
      msg += `Client : ${name}\n`;
      msg += `Téléphone : ${phone}\n`;
      msg += `Lieu de consultation : ${location}\n`;
      if (location !== "À l'Atelier" && address) {
        msg += `Adresse de déplacement : ${address}\n`;
      }
      msg += `Type de tenue : ${garment}\n`;
      msg += `Date souhaitée : ${date}\n`;
      msg += `Créneau horaire : ${time}\n`;
      msg += `-----------------------------------\n`;
      msg += `Bonjour Atelier Raphaël, je souhaite bloquer ce créneau de rendez-vous pour la confection de ma tenue sur-mesure.`;

      window.open(`https://wa.me/${STYLIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // 6. Lookbook Lightbox
  const lookbookGrid = document.getElementById('lookbookGrid');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lookbookGrid) {
    lookbookGrid.innerHTML = LOOKBOOK_DATA.map(item => `
      <div class="lookbook-item" data-img="${item.image}">
        <img src="${item.image}" alt="${item.title}" />
        <div class="lookbook-hover-overlay">
          <span class="lookbook-category">${item.category}</span>
          <h3 class="lookbook-title">${item.title}</h3>
        </div>
      </div>
    `).join('');

    lookbookGrid.querySelectorAll('.lookbook-item').forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-img');
        if (lightboxImage && lightboxModal) {
          lightboxImage.src = imgSrc;
          lightboxModal.classList.add('active');
        }
      });
    });
  }

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => lightboxModal.classList.remove('active'));
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) lightboxModal.classList.remove('active');
    });
  }
});
