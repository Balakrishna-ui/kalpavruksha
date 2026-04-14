import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  BookOpen, 
  TrendingUp, 
  Truck, 
  CheckCircle2, 
  Users, 
  MapPin, 
  Leaf 
} from 'lucide-react';

const DivAgri = () => {
  const services = [
    {
      title: 'Organic Farming Support',
      desc: 'Assisting farmers in transitioning to sustainable, chemical-free methods with organic certification guidance.',
      icon: <Leaf className="w-8 h-8 text-forest" />
    },
    {
      title: 'Crop Advisory & Guidance',
      desc: 'Expert advice on soil health, pest management, and crop selection tailored to local village conditions.',
      icon: <BookOpen className="w-8 h-8 text-forest" />
    },
    {
      title: 'Farm-to-Market Access',
      desc: 'Direct market linkage that eliminates middlemen, ensuring better prices for farmers and fresher products for consumers.',
      icon: <Truck className="w-8 h-8 text-forest" />
    },
    {
      title: 'Agricultural Training',
      desc: 'Regular workshops on modern farming techniques, water conservation, and eco-friendly harvesting.',
      icon: <Sprout className="w-8 h-8 text-forest" />
    }
  ];

  const products = [
    { title: 'Fresh Vegetables', img: '/assets/prod_veg_1773805467767.png', desc: 'Directly from our organic partner farms.' },
    { title: 'Naturally Ripe Fruits', img: '/assets/prod_fruits_natural.png', desc: 'Tree-ripened and delivered fresh.' },
    { title: 'Wild Forest Honey', img: '/assets/prod_honey_1773805513434.png', desc: 'Pure, unprocessed honey from natural hives.' },
    { title: 'Village Grains', img: '/assets/prod_village_graminam.png', desc: 'Authentic staples from rural communities.' }
  ];

  const stats = [
    { label: 'Farmers Supported', value: '5000+' },
    { label: 'Villages Covered', value: '50+' },
    { label: 'Acres Cultivated', value: '100+' },
    { label: 'Products Delivered', value: '20+' }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/img/gra2.png')" }}
        >
          <div className="absolute inset-0 bg-black/15"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">
            Agriculture <span className="text-gold">Division</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
            Empowering farmers with sustainable practices, modern solutions, and direct market access for a thriving rural economy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" className="bg-gold text-forest font-bold py-3 px-8 rounded-md hover:bg-white transition-all shadow-lg text-sm uppercase">
              Explore Services
            </a>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white font-medium py-3 px-8 rounded-md hover:bg-white hover:text-forest transition-all shadow-lg text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">About the Division</span>
              <h2 className="text-3xl md:text-4xl font-bold text-forest mb-6">Cultivating Sustainability & Prosperity</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our Agriculture Division is the heart of the Kalpavruksha ecosystem. We bridge the gap between traditional wisdom and modern innovation to ensure that our partner farmers can thrive in an evolving market.
              </p>
              <ul className="space-y-4">
                {[
                  'Comprehensive 100% organic farming initiatives',
                  'Direct linkage to urban markets avoiding middlemen',
                  'Access to shared equipment and modern tools',
                  'Guidance on sustainable water and soil management'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="text-forest w-5 h-5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="/img/im1.PNG" alt="Agriculture field" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-forest text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-2xl font-bold">5+ Years</p>
                <p className="text-sm opacity-80">of Field Impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4">Core Services</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="mb-6 flex justify-center">{svc.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Impact Stats */}
      <section className="py-16 bg-[#0B3D2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl md:text-5xl font-bold text-gold mb-2">{stat.value}</p>
                <p className="text-sm tracking-widest uppercase opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gray-50 rounded-3xl p-10 md:p-16 border border-gray-100 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-forest mb-6">Join Our Agriculture Network</h2>
            <p className="text-gray-600 mb-10 text-lg">
              Whether you are a farmer looking for support or a consumer wanting quality products, be part of a growing ecosystem that builds sustainable prosperity.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/membership" className="bg-forest text-white font-bold py-4 px-10 rounded-full hover:bg-gold hover:text-forest transition-all shadow-xl">
                Join Now
              </Link>
              <Link to="/contact" className="bg-white border-2 border-forest text-forest font-bold py-4 px-10 rounded-full hover:bg-forest hover:text-white transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DivAgri;
