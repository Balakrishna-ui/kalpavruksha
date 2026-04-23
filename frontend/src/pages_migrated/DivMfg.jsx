import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const DivMfg = () => {

  const areas = [
    {
      label: 'Food Processing',
      heading: 'From Farm to Finished Product',
      desc: 'Our food processing units transform raw agricultural produce from member farms into packaged, market-ready goods. This includes cleaning, grading, drying, and packaging of grains, vegetables, spices, and other farm-sourced produce — ensuring quality at every step and a far better price for the farmer.',
    },
    {
      label: 'Textile Production',
      heading: 'Handloom & Fabric Manufacturing',
      desc: 'Kalpavruksha supports rural weavers and textile artisans through cooperative textile units. Natural fibres are processed and woven into finished fabrics, supporting heritage craft traditions while generating stable income for rural households and reducing dependence on informal middlemen.',
    },
    {
      label: 'Handicrafts & Rural Art',
      heading: 'Preserving Artisan Heritage',
      desc: 'Traditional crafts — pottery, bamboo work, stone carving, and folk art — are organised under a cooperative umbrella, giving village artisans access to raw materials, shared workspaces, and a direct market channel to urban consumers and export buyers.',
    },
  ];

  const impacts = [
    'Generating sustainable rural employment close to home',
    'Increasing farmer income through value-addition to raw produce',
    'Preserving and scaling traditional artisan communities',
    'Reducing post-harvest loss through timely processing',
    'Strengthening the cooperative economy from within',
    'Building local industrial capacity without displacing culture',
  ];

  const steps = [
    { num: '01', title: 'Raw Material Collection', desc: 'Produce and materials sourced directly from member farmers and artisans.' },
    { num: '02', title: 'Processing & Production', desc: 'Transformation in cooperative-run units under trained supervision.' },
    { num: '03', title: 'Quality Check', desc: 'Each batch reviewed against defined quality standards before moving forward.' },
    { num: '04', title: 'Packaging', desc: 'Eco-friendly packaging that represents the Kalpavruksha brand and values.' },
    { num: '05', title: 'Distribution', desc: 'Delivery through our network to local markets, urban outlets, and online channels.' },
  ];

  return (
    <div className="w-full font-inter">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section
        className="relative h-[240px] md:h-[450px] flex items-center justify-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Hero Image Background */}
        <div className="absolute inset-0">
          <img 
            src="/img/manufacturing_hero.jpg" 
            alt="Manufacturing Division" 
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <span className="inline-block text-[#c9a84c] font-black tracking-[0.3em] uppercase text-[8px] md:text-xs mb-1 md:mb-6">
            Kalpavruksha Cooperative Society
          </span>
          <h1 className="text-xl md:text-6xl font-black text-white mb-1 md:mb-5 leading-tight drop-shadow-md">
            Manufacturing <span className="text-[#c9a84c]">Division</span>
          </h1>
          <p className="text-[10px] md:text-xl text-white/95 font-light max-w-2xl mx-auto leading-snug md:leading-relaxed px-4 md:px-0 drop-shadow-sm">
            Industrial units dedicated to value-added production.
          </p>
        </div>
      </section>

      {/* ── Intro Section & Subtitle ─────────────────────────────── */}
      <section className="pt-4 md:pt-10 pb-2 md:pb-4 bg-white" aria-label="EcoLimits Introduction">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-gold font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Product Focus</span>
          <h2 className="text-3xl md:text-5xl font-black text-forest mb-12 leading-tight">
            Eco-Friendly <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-gold">Biodegradable Cover</span> Manufacturing
          </h2>
          
          <div className="space-y-8 text-gray-600 text-lg md:text-xl leading-loose font-medium max-w-3xl mx-auto">
            <p>
              Under the visionary **EcoLimits** brand, Kalpavruksha Manufacturing Division is leading the charge in environmental sustainability by producing high-quality biodegradable covers. Supported by **SBI** and backed by the **Ministry of Micro, Small and Medium Enterprises (MSME), Government of India**, our facility in Mahabubnagar, Telangana, represents a major step toward a plastic-free future.
            </p>
          </div>
        </div>
      </section>

      {/* ── Product & Sample Showcase ──────────────────────────────── */}
      <section className="pt-2 md:pt-4 pb-2 md:pb-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-12 items-start md:items-center">
            {/* Left: Premium Concept Image */}
            <div className="rounded-[20px] md:rounded-[40px] overflow-hidden shadow-lg md:shadow-2xl border border-gray-100 p-1 md:p-2 bg-white">
              <img 
                src="/img/biodegradable_covers_1.png" 
                alt="Premium Biodegradable Covers" 
                className="w-full h-[180px] sm:h-[220px] md:h-[400px] object-cover rounded-[16px] md:rounded-[32px]"
              />
            </div>
            {/* Right: Actual Sample Image */}
            <div className="space-y-3 md:space-y-6">
              <div className="rounded-[20px] md:rounded-[40px] overflow-hidden shadow-lg md:shadow-2xl border border-gray-100 p-1 md:p-2 bg-white">
                <img 
                  src="/img/c4.jpeg" 
                  alt="EcoLimits Cover Sample" 
                  className="w-full h-[180px] sm:h-[220px] md:h-[400px] object-cover rounded-[16px] md:rounded-[32px]"
                />
              </div>
              <p className="text-gray-500 italic text-center text-[10px] sm:text-xs md:text-sm px-1 md:px-0 leading-tight md:leading-normal">
                Actual production sample of EcoLimits 100% compostable bags.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* ── Detailed Content Section ─────────────────────────────── */}
      <section className="pt-2 md:pt-4 pb-2 md:pb-4 bg-[#fcfdfc]" aria-label="Sustainable Impact">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6 md:space-y-12 text-gray-600 text-lg md:text-xl leading-loose font-medium">
            <h3 className="text-2xl md:text-3xl font-black text-forest mb-6">Technical Excellence in Bioplastics</h3>
            <p>
              Our manufacturing process utilizes **100% sustainable materials**, ensuring that every cover produced is naturally compostable and safe for the ecosystem. These covers are versatile and robust, specifically engineered for diverse applications including agriculture, commercial packaging, and everyday consumer use. By choosing **EcoLimits**, businesses and individuals transition toward a circular economy that prioritizes the health of our planet.
            </p>
            <p>
              Beyond environmental protection, this initiative is a cornerstone of our commitment to the rural economy. Our manufacturing units create stable, dignified employment opportunities within local villages, empowering communities to thrive while promoting a lifestyle of sustainable living. We believe that green alternatives are not just a choice, but a necessity for a prosperous future.
            </p>
          </div>
        </div>
      </section>

      {/* ── Production Line & Machinery Showcase ───────────────────── */}
      <section className="pt-12 md:pt-24 pb-2 md:pb-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-4xl font-black text-forest mb-8 md:mb-12 text-center uppercase tracking-tighter">
            Our <span className="text-gold">Production</span> Line
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
            <div className="rounded-[16px] md:rounded-[30px] overflow-hidden shadow-md md:shadow-xl border border-gray-100 p-1 md:p-2 bg-white">
              <img src="/img/m1.jpeg" alt="Machinery 1" className="w-full h-[120px] sm:h-[180px] md:h-[300px] object-cover rounded-[12px] md:rounded-[22px]" />
            </div>
            <div className="rounded-[16px] md:rounded-[30px] overflow-hidden shadow-md md:shadow-xl border border-gray-100 p-1 md:p-2 bg-white">
              <img src="/img/m2.jpeg" alt="Machinery 2" className="w-full h-[120px] sm:h-[180px] md:h-[300px] object-cover rounded-[12px] md:rounded-[22px]" />
            </div>
            <div className="rounded-[16px] md:rounded-[30px] overflow-hidden shadow-md md:shadow-xl border border-gray-100 p-1 md:p-2 bg-white">
              <img src="/img/m3.jpeg" alt="Production Unit" className="w-full h-[120px] sm:h-[180px] md:h-[300px] object-cover rounded-[12px] md:rounded-[22px]" />
            </div>
          </div>

        </div>
      </section>

      {/* ── Final Conclusion & CTA ───────────────────────────────── */}
      <section className="pt-2 md:pt-8 pb-10 md:pb-24 bg-[#fcfdfc]" aria-label="Final Call to Action">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-lg md:text-xl leading-loose font-medium mb-16">
            Join the movement toward a plastic-free world. Explore how **EcoLimits Bioplastics** can transform your environmental impact today.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="https://ecolimits.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-forest text-gold font-black px-12 py-5 rounded-full hover:bg-gold hover:text-forest hover:scale-105 transition-all shadow-2xl text-xs uppercase tracking-[0.3em]"
            >
              Explore EcoLimits Products
            </a>
            <span className="text-gray-400 font-medium hidden md:block">|</span>
            <p className="text-forest font-bold tracking-tight">Supporting the MSME Green Initiative</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DivMfg;
