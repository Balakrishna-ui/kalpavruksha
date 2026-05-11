import { 
  Sprout, BookOpen, Truck, Users, Leaf,
  HeartHandshake, Store, ShieldCheck, MapPin, Trees,
  Package, Globe, Recycle, Handshake
} from 'lucide-react';

export const HERO_DATA = {
  title: "Growing Prosperity,",
  titleAccent: "Nurturing Nature",
  subtitle: "Empowering farmers with sustainable practices, modern solutions, and direct market access for a better tomorrow.",
  image: "/img/mana_hero.png",
  tag: "Agriculture Division",
};

export const HERO_FEATURES = [
  { icon: Leaf, title: 'SUSTAINABLE FARMING', sub: 'For a greener tomorrow' },
  { icon: HeartHandshake, title: 'BETTER YIELDS', sub: 'Better crops, better lives' },
  { icon: Store, title: 'MARKET EMPOWERMENT', sub: 'Stronger access, fairer prices' },
  { icon: ShieldCheck, title: 'CARE FOR NATURE', sub: 'Care today, thrive tomorrow' },
];

export const CORE_SERVICES = [
  {
    title: 'Organic Farming Support',
    desc: 'Assisting farmers in transitioning to sustainable & organic farming with certification guidance.',
    icon: Leaf,
  },
  {
    title: 'Crop Advisory & Guidance',
    desc: 'Expert advice on soil health, pest management, and crop planning tailored to local village conditions.',
    icon: BookOpen,
  },
  {
    title: 'Farm-to-Market Access',
    desc: 'Direct market linkage that eliminates middlemen, ensuring better prices for farmers and fresher products for consumers.',
    icon: Truck,
  },
  {
    title: 'Agricultural Training',
    desc: 'Regular workshops on modern farming techniques, water conservation, and eco-friendly harvesting.',
    icon: Users,
  }
];

export const IMPACT_STATS = [
  { label: 'FARMERS SUPPORTED', value: '5000+', icon: Users },
  { label: 'VILLAGES COVERED', value: '50+', icon: MapPin },
  { label: 'ACRES CULTIVATED', value: '100+', icon: Trees },
  { label: 'PRODUCTS DELIVERED', value: '20+', icon: Package },
];

export const FOOTER_FEATURES = [
  { icon: Globe, text: 'Transparency At Every Step' },
  { icon: Leaf, text: 'Eco-friendly Approach' },
  { icon: Sprout, text: 'Empowering Farmers' },
  { icon: Trees, text: 'Building a Better Tomorrow' },
];

export const ABOUT_POINTS = [
  'Comprehensive 100% organic farming initiatives',
  'Direct linkage to urban markets avoiding middlemen',
  'Access to advanced equipment and modern tools',
  'Guidance on sustainable water and soil management'
];
