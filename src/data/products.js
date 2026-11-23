// Configuration générale et numéro de contact WhatsApp par défaut (remplaçable dynamiquement)
export const STYLIST_WHATSAPP_NUMBER = "22900000000";

// Collections / Catégories inspirées de la maquette (Shop by Category)
export const CATEGORIES = [
  { id: 'ALL', name: 'Toutes les créations', count: 18, image: '/assets/img/creation-1.jpg' },
  { id: 'HOMME', name: 'Homme', count: 8, image: '/assets/img/creation-1.jpg' },
  { id: 'FEMME', name: 'Femme', count: 6, image: '/assets/img/creation-2.jpg' },
  { id: 'SUR_MESURE', name: 'Sur-Mesure', count: 5, image: '/assets/img/creation-3.jpg' },
  { id: 'STREETWEAR', name: 'Streetwear & Flocage', count: 7, image: '/assets/img/creation-4.jpg' },
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
    description: 'Costume élégant confectionné avec soin dans notre atelier. Coupe moderne et confortable, idéal pour mariages, galas et cérémonies. Le styliste peut venir prendre vos mesures directement chez vous.',
    details: [
      'Tissu léger et confortable de haute qualité',
      'Coupe droite et tombé élégant',
      'Finitions soignées à la main',
      'Disponible en prêt-à-porter ou sur-mesure'
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
    description: 'Tenue chic en noir et blanc, pensée pour vos soirées et grands événements. Coupe moderne qui met en valeur la silhouette.',
    details: [
      'Modèle exclusif imaginé par le styliste',
      'Tissu fluide et agréable à porter',
      'Finitions propres et discrètes'
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
    description: 'Veste moderne et bien coupée, facile à porter pour vos sorties chic ou professionnelles. Ajustable à votre taille exacte.',
    details: [
      'Coupe nette et moderne',
      'Doublure légère et respirante',
      'Ajustable à vos mesures sur demande'
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
    description: 'Ensemble décontracté et soigné, combinant style urbain et finitions d\'atelier. Personnalisable avec votre nom ou numéro en flocage.',
    details: [
      'Coton doux et épais de qualité',
      'Personnalisation possible (flocage nom & numéro)',
      'Coupe moderne et confortable'
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
    description: 'Tunique moderne inspirée des traditions, confectionnée avec soin pour allier confort et élégance lors de vos événements.',
    details: [
      'Tissu noble et agréable au toucher',
      'Coupe confortable et stylée',
      'Cousu artisanalement dans notre atelier'
    ]
  }
];

// Lookbook éditorial inspiré de la section "The Spring Lookbook" de la maquette
export const LOOKBOOK_ITEMS = [
  {
    id: 'look-1',
    title: 'Silhouette 01 — Veste Structurée & Pantalon Droit',
    category: 'TAILORING',
    categoryLabel: 'Tailoring & Cérémonie',
    image: '/assets/img/creation-1.jpg',
    height: '560px',
    description: 'Une coupe droite élégante, idéale pour un style chic et soigné.',
    dots: [
      { id: 'd1', x: 48, y: 32, title: 'Veste Structurée', price: '95 000 FCFA', slug: 'veste-tailleur-luxe-monochrome' },
      { id: 'd2', x: 52, y: 68, title: 'Pantalon Droit Coupe Nette', price: '50 000 FCFA', slug: 'ensemble-costume-croise-ivoire' }
    ]
  },
  {
    id: 'look-2',
    title: 'Silhouette 02 — Robe Noir & Blanc',
    category: 'COUTURE',
    categoryLabel: 'Haute Couture',
    image: '/assets/img/creation-2.jpg',
    height: '420px',
    description: 'Un jeu de contrastes noir et blanc, fluide et raffiné pour vos soirées.',
    dots: [
      { id: 'd3', x: 50, y: 40, title: 'Robe Sculpturale', price: '145 000 FCFA', slug: 'robe-sculpturale-contrast-graphique' }
    ]
  },
  {
    id: 'look-3',
    title: 'Silhouette 03 — Costume de Cérémonie',
    category: 'CEREMONIE',
    categoryLabel: 'Cérémonie Sur-Mesure',
    image: '/assets/img/creation-3.jpg',
    height: '680px',
    description: 'Un costume habillé pour briller lors de vos événements importants.',
    dots: [
      { id: 'd4', x: 46, y: 35, title: 'Costume Croisé Cérémonie', price: '185 000 FCFA', slug: 'ensemble-costume-croise-ivoire' }
    ]
  },
  {
    id: 'look-4',
    title: 'Silhouette 04 — Ensemble Street-Chic',
    category: 'STREETWEAR',
    categoryLabel: 'Streetwear Éditorial',
    image: '/assets/img/creation-4.jpg',
    height: '380px',
    description: 'Un style urbain confortable et moderne, conçu avec des finitions soignées.',
    dots: [
      { id: 'd5', x: 50, y: 45, title: 'Ensemble Street-Chic', price: '75 000 FCFA', slug: 'ensemble-street-couture-minimaliste' }
    ]
  },
  {
    id: 'look-5',
    title: 'Silhouette 05 — Tunique Moderne',
    category: 'TAILORING',
    categoryLabel: 'Atelier & Sur-Mesure',
    image: '/assets/img/creation-5.jpg',
    height: '520px',
    description: 'Une tenue souple et agréable, parfaitement ajustée à votre morphologie.',
    dots: [
      { id: 'd6', x: 52, y: 42, title: 'Tunique Atelier', price: '110 000 FCFA', slug: 'tunique-ceremonie-artisanale' }
    ]
  },
  {
    id: 'look-6',
    title: 'Silhouette 06 — Veste Habillée',
    category: 'COUTURE',
    categoryLabel: 'Haute Couture',
    image: '/assets/img/creation-1.jpg',
    height: '640px',
    description: 'Une veste de créateur élégante, travaillée à la main dans notre atelier.',
    dots: [
      { id: 'd7', x: 50, y: 35, title: 'Veste Haute Couture', price: '115 000 FCFA', slug: 'veste-tailleur-luxe-monochrome' }
    ]
  },
  {
    id: 'look-7',
    title: 'Silhouette 07 — Tunique de Fête',
    category: 'CEREMONIE',
    categoryLabel: 'Cérémonie Sur-Mesure',
    image: '/assets/img/creation-3.jpg',
    height: '440px',
    description: 'Des tissus soyeux et des boutons discrets pour vos grandes occasions.',
    dots: [
      { id: 'd8', x: 45, y: 40, title: 'Tunique Cérémonie', price: '135 000 FCFA', slug: 'tunique-ceremonie-artisanale' }
    ]
  },
  {
    id: 'look-8',
    title: 'Silhouette 08 — Pièce Personnalisée',
    category: 'STREETWEAR',
    categoryLabel: 'Streetwear Éditorial',
    image: '/assets/img/creation-4.jpg',
    height: '600px',
    description: 'Un sweat moderne floqué avec votre nom ou numéro personnalisé.',
    dots: [
      { id: 'd9', x: 50, y: 50, title: 'Sweat Flocage Signature', price: '65 000 FCFA', slug: 'ensemble-street-couture-minimaliste' }
    ]
  },
  {
    id: 'look-9',
    title: 'Silhouette 09 — Allure Noire Chic',
    category: 'TAILORING',
    categoryLabel: 'Tailoring & Cérémonie',
    image: '/assets/img/creation-2.jpg',
    height: '360px',
    description: 'L’élégance du noir pour une allure discrète, moderne et raffinée.',
    dots: [
      { id: 'd10', x: 50, y: 45, title: 'Ensemble Soirée Minimaliste', price: '140 000 FCFA', slug: 'robe-sculpturale-contrast-graphique' }
    ]
  }
];

// Avis et témoignages clients inspirés de la maquette (section Testimonials)
export const TESTIMONIALS = [
  {
    id: 'test-1',
    author: 'Jean-Marc D.',
    role: 'Costume 3 Pièces',
    quote: 'Le résultat est impeccable. Le styliste est venu directement chez moi pour prendre mes mesures avec ses tissus. La tenue me va à la perfection.',
    rating: 5
  },
  {
    id: 'test-2',
    author: 'Aurélie K.',
    role: 'Robe de Soirée Sur-Mesure',
    quote: 'Très belle tenue, élégante et agréable à porter. On voit tout de suite la qualité du travail et le soin apporté à chaque couture.',
    rating: 5
  },
  {
    id: 'test-3',
    author: 'Stéphane M.',
    role: 'Tenues avec Flocage',
    quote: 'Le flocage avec notre nom et numéro est très propre et résistant. La communication directe par WhatsApp avec le styliste est super pratique.',
    rating: 5
  }
];
