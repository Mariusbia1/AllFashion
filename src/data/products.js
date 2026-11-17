// Configuration générale et numéro de contact WhatsApp par défaut (remplaçable dynamiquement)
export const STYLIST_WHATSAPP_NUMBER = "22900000000";

// Collections / Catégories inspirées de la maquette (Shop by Category)
export const CATEGORIES = [
  { id: 'ALL', name: 'Toutes les créations', count: 18, image: '/assets/img/creation-1.jpg' },
  { id: 'HOMME', name: 'Homme / Tailoring', count: 8, image: '/assets/img/creation-1.jpg' },
  { id: 'FEMME', name: 'Femme / Robes & Ensembles', count: 6, image: '/assets/img/creation-2.jpg' },
  { id: 'SUR_MESURE', name: 'Cérémonie & Sur-Mesure', count: 5, image: '/assets/img/creation-3.jpg' },
  { id: 'STREETWEAR', name: 'Street-Chic & Flocage', count: 7, image: '/assets/img/creation-4.jpg' },
  { id: 'ACCESSOIRES', name: 'Éditions Limitées', count: 4, image: '/assets/img/creation-5.jpg' }
];

// Produits de prêt-à-porter utilisant directement les vraies images créateur
export const PRODUCTS = [
  {
    id: 'prod-01',
    slug: 'ensemble-costume-croise-ivoire',
    name: 'Costume Croisé Cérémonie',
    category: 'SUR_MESURE',
    categoryLabel: 'Sur-Mesure & Cérémonie',
    badge: 'Nouvelle Édition',
    price: 185000,
    priceFormatted: '185 000 FCFA',
    oldPrice: '210 000 FCFA',
    rating: 5,
    isTrending: true,
    isBestSeller: true,
    isNew: true,
    images: [
      '/assets/img/creation-1.jpg',
      '/assets/img/creation-2.jpg',
      '/assets/img/creation-3.jpg'
    ],
    sizes: ['Sur-Mesure', 'S', 'M', 'L', 'XL'],
    colors: ['Noir Ébène', 'Blanc Craie', 'Bleu Nuit'],
    description: 'Ensemble structuré confectionné à la main dans notre atelier. Silhouette droite contemporaine, finitions intérieures en soie et entoilage traditionnel. Prise de mesures à domicile incluse.',
    details: [
      'Laine froide et finitions satinées d’exception',
      'Entoilage semi-traditionnel pour un tombé parfait',
      'Boutons recouverts faits main',
      'Confectionné sur-mesure ou en prêt-à-porter numéroté'
    ]
  },
  {
    id: 'prod-02',
    slug: 'robe-sculpturale-contrast-graphique',
    name: 'Silhouette Signature Créateur',
    category: 'FEMME',
    categoryLabel: 'Haute Couture',
    badge: 'Pièce Maîtresse',
    price: 145000,
    priceFormatted: '145 000 FCFA',
    oldPrice: null,
    rating: 5,
    isTrending: true,
    isBestSeller: true,
    isNew: false,
    images: [
      '/assets/img/creation-2.jpg',
      '/assets/img/creation-4.jpg'
    ],
    sizes: ['Sur-Mesure', 'S', 'M', 'L'],
    colors: ['Monochrome Noir/Blanc', 'Noir Minimal'],
    description: 'Une coupe architecturale qui allie rigueur des lignes et fluidité textile. Conçue pour les soirées et grandes réceptions.',
    details: [
      'Patronage exclusif créé par le styliste',
      'Coupe ajustée et tombé drapé fluide',
      'Fermeture invisible et ourlets piqués main'
    ]
  },
  {
    id: 'prod-03',
    slug: 'veste-tailleur-luxe-monochrome',
    name: 'Veste Tailleur Structurée',
    category: 'HOMME',
    categoryLabel: 'Tailoring Moderne',
    badge: 'Best Seller',
    price: 95000,
    priceFormatted: '95 000 FCFA',
    oldPrice: '120 000 FCFA',
    rating: 5,
    isTrending: true,
    isBestSeller: true,
    isNew: true,
    images: [
      '/assets/img/creation-3.jpg',
      '/assets/img/creation-1.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Sur-Mesure'],
    colors: ['Noir Mat', 'Gris Graphite'],
    description: 'La quintessence du tailoring urbain : épaules précises, plastron travaillé et poches passepoilées sans compromis.',
    details: [
      'Coupe nette et angulaire sans rondeur superflue',
      'Doublure respirante ton sur ton',
      'Adaptable à vos mesures exactes sur demande'
    ]
  },
  {
    id: 'prod-04',
    slug: 'ensemble-street-couture-minimaliste',
    name: 'Ensemble Street-Chic Graphique',
    category: 'STREETWEAR',
    categoryLabel: 'Streetwear Couture',
    badge: 'Édition Capsule',
    price: 75000,
    priceFormatted: '75 000 FCFA',
    oldPrice: null,
    rating: 5,
    isTrending: true,
    isBestSeller: false,
    isNew: true,
    images: [
      '/assets/img/creation-4.jpg',
      '/assets/img/creation-5.jpg'
    ],
    sizes: ['M', 'L', 'XL', 'Oversize'],
    colors: ['Noir & Blanc', 'Noir Brillant'],
    description: 'La rencontre entre l’énergie street et la minutie des ateliers d’artisanat. Compatible personnalisation et flocage sur-mesure.',
    details: [
      'Coton lourd 380 GSM sélectionné',
      'Marquage possible (broderie, flocage flex haute densité)',
      'Coupe oversize moderne géométrique'
    ]
  },
  {
    id: 'prod-05',
    slug: 'tunique-ceremonie-artisanale',
    name: 'Tunique Contemporaine Atelier',
    category: 'SUR_MESURE',
    categoryLabel: 'Artisanat d’Art',
    badge: 'Artisanal',
    price: 110000,
    priceFormatted: '110 000 FCFA',
    oldPrice: null,
    rating: 5,
    isTrending: true,
    isBestSeller: true,
    isNew: false,
    images: [
      '/assets/img/creation-5.jpg',
      '/assets/img/creation-1.jpg'
    ],
    sizes: ['Sur-Mesure', 'M', 'L', 'XL'],
    colors: ['Noir Profond', 'Écru Naturel'],
    description: 'Inspirée des traditions d’habillement repensées à travers une optique contemporaine et minimaliste.',
    details: [
      'Textile noble et fibres naturelles',
      'Finitions coutures anglaises',
      'Fabrication 100% atelier local'
    ]
  }
];

// Lookbook éditorial inspiré de la section "The Spring Lookbook" de la maquette
export const LOOKBOOK_ITEMS = [
  {
    id: 'look-1',
    title: 'Silhouette 01 — Tailoring Architectural',
    category: 'TAILORING',
    categoryLabel: 'Tailoring & Cérémonie',
    image: '/assets/img/creation-1.jpg',
    description: 'Lignes épurées, col structuré et géométrie nette.',
    dots: [
      { id: 'd1', x: 48, y: 32, title: 'Veste Structurée', price: '95 000 FCFA', slug: 'veste-tailleur-luxe-monochrome' },
      { id: 'd2', x: 52, y: 68, title: 'Pantalon Droit Coupe Nette', price: '50 000 FCFA', slug: 'ensemble-costume-croise-ivoire' }
    ]
  },
  {
    id: 'look-2',
    title: 'Silhouette 02 — Contraste Monochrome',
    category: 'COUTURE',
    categoryLabel: 'Haute Couture',
    image: '/assets/img/creation-2.jpg',
    description: 'Jeux d’ombres et de lumières dans une recherche de pureté absolue.',
    dots: [
      { id: 'd3', x: 50, y: 40, title: 'Robe Sculpturale', price: '145 000 FCFA', slug: 'robe-sculpturale-contrast-graphique' }
    ]
  },
  {
    id: 'look-3',
    title: 'Silhouette 03 — Prestige & Matières',
    category: 'CEREMONIE',
    categoryLabel: 'Cérémonie Sur-Mesure',
    image: '/assets/img/creation-3.jpg',
    description: 'Une pièce pensée pour marquer les mémoires lors des événements d’exception.',
    dots: [
      { id: 'd4', x: 46, y: 35, title: 'Costume Croisé Cérémonie', price: '185 000 FCFA', slug: 'ensemble-costume-croise-ivoire' }
    ]
  },
  {
    id: 'look-4',
    title: 'Silhouette 04 — L’Esprit Capsule',
    category: 'STREETWEAR',
    categoryLabel: 'Streetwear Éditorial',
    image: '/assets/img/creation-4.jpg',
    description: 'Une interprétation brute et raffinée des silhouettes urbaines contemporaines.',
    dots: [
      { id: 'd5', x: 50, y: 45, title: 'Ensemble Street-Chic', price: '75 000 FCFA', slug: 'ensemble-street-couture-minimaliste' }
    ]
  },
  {
    id: 'look-5',
    title: 'Silhouette 05 — Équilibre & Matière',
    category: 'SUR_MESURE',
    categoryLabel: 'Sur-Mesure',
    image: '/assets/img/creation-5.jpg',
    description: 'Chaque couture suit la dynamique du corps sans superflu.',
    dots: [
      { id: 'd6', x: 52, y: 42, title: 'Tunique Atelier', price: '110 000 FCFA', slug: 'tunique-ceremonie-artisanale' }
    ]
  }
];

// Avis et témoignages clients inspirés de la maquette (section Testimonials)
export const TESTIMONIALS = [
  {
    id: 'test-1',
    author: 'Jean-Marc D.',
    role: 'Costume 3 Pièces Cérémonie',
    quote: 'La précision de coupe est impressionnante. Le créateur s’est déplacé à mon domicile pour la prise de mesures avec ses nuanciers d’étoffes. Le résultat est sans comparaison avec ce que l’on trouve en boutique standard.',
    rating: 5
  },
  {
    id: 'test-2',
    author: 'Aurélie K.',
    role: 'Robe de Réception Sur-Mesure',
    quote: 'Une allure architecturale, pure, sans aucun artifice inutile. On sent l’exigence du travail d’atelier dans chaque couture.',
    rating: 5
  },
  {
    id: 'test-3',
    author: 'Stéphane M.',
    role: 'Collection Capsule & Flocage',
    quote: 'Le service de personnalisation et de flocage a sublimé notre projet de marque. Rapidité exemplaire et communication directe par WhatsApp très appréciable.',
    rating: 5
  }
];
