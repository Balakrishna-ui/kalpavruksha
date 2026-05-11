// src/constants/homeData.js

export const HERO_SLIDES = [
  {
    id: 'ecosystem',
    bg: '/img/im1.PNG',
    overlay: 'rgba(0,0,0,0.25)',
    tag: 'Join Our Family',
    heading: 'Kalpavruksha Co-operative Ecosystem',
    description: 'Empowering members through finance, agriculture, community living, industry, and sustainable development',
    ctaPrimary: { text: 'Become a Member', to: '/membership' },
    ctaSecondary: { text: 'Contact Us', to: '/contact' },
  },
  {
    id: 'grameenam',
    bg: '/img/gra1.png',
    overlay: 'rgba(0,0,0,0.3)',
    tag: 'Pure • Traditional • Natural',
    heading: 'Grameenam Products',
    description: 'Authentic village products crafted with care and delivered with trust',
    ctaPrimary: { text: 'Shop Now', to: '/products' },
    ctaSecondary: { text: 'Explore Products', to: '/products' },
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
