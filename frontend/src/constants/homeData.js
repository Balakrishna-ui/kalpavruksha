// src/constants/homeData.js

export const HERO_SLIDES = [
  {
    id: 'ecosystem',
    bg: '/img/kal.png',
    overlay: 'rgba(0,0,0,0.4)', // Slightly dark overlay for text readability
    heading: 'One Ecosystem. Endless Possibilities.',
    description: 'Building prosperity through cooperation, sustainability, and community development.',
    hideContent: false,
    ctaPrimary: { text: 'Become a Member', to: '/membership' },
  },
  {
    id: 'banner-2',
    bg: '/img/Banner.png',
    overlay: 'transparent',
    hideContent: true,
    bgSize: '100% 100%',
  },
  {
    id: 'divisions-3',
    bg: '/img/divisions.png',
    overlay: 'transparent',
    hideContent: true,
    bgSize: '100% 100%',
    clickableZones: [
      { to: '/div-agri', label: 'Agriculture' },
      { to: '/divisions/financial', label: 'Finance' },
      { to: '/div-mfg', label: 'Manufacturing' },
      { to: '/div-edu', label: 'Education' },
    ]
  },
];

export const CORE_VALUES = [
  { 
    title: 'Innovation', 
    desc: 'Technology and continuous improvement for smarter, faster, traceable operations.', 
    color: 'blue'
  },
  { 
    title: 'Integrity', 
    desc: 'Transparency and fairness in every transaction, partnership, and policy.', 
    color: 'green'
  },
  { 
    title: 'Agility', 
    desc: 'Quick response to market changes ensuring consistency in availability.', 
    color: 'purple'
  },
  { 
    title: 'Sustainability', 
    desc: 'Ethical sourcing, green logistics, and eco-friendly packaging solutions.', 
    color: 'forest'
  },
  { 
    title: 'Partnership', 
    desc: 'Long-term relationships with suppliers, distributors, and clients globally.', 
    color: 'orange'
  },
];

export const FEATURED_PRODUCTS = [
  { 
    id: 'ecolimits',
    cat: 'ECO LIMITS', 
    name: 'Biodegradable Covers', 
    tagline: 'Eco-friendly protection for a greener tomorrow.',
    img: '/img/p1.png',
    link: '/products?category=ecolimits'
  },
  { 
    id: 'kulfi',
    cat: 'KULFI', 
    name: 'Traditional Kulfi', 
    tagline: 'Authentic flavor, frozen with pure tradition.',
    img: '/img/p2.jpg',
    link: '/products?category=kulfis'
  },
  { 
    id: 'honey',
    cat: 'HONEY', 
    name: 'Wildflower Honey', 
    tagline: 'Golden purity, harvested from the wild.',
    img: '/img/p3.png',
    link: '/products?category=honey'
  },
  { 
    id: 'niramaya',
    cat: 'NIRAMAYA', 
    name: 'Wellness Juice', 
    tagline: 'Natural wellness for a balanced lifestyle.',
    img: '/img/p4.jpg',
    link: '/products?category=niramaya'
  },
];
