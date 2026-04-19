import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { partnerData } from '../data/partnerData';
import { ArrowLeft } from 'lucide-react';

const PartnerDetail = () => {
  const { slug } = useParams();
  const partner = partnerData[slug];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!partner) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full min-h-screen bg-white font-inter pb-32 pt-12 md:pt-20">
      {/* Background Watermark (Optional as per 6) */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] text-[20vw] z-0 select-none">
        {partner.logo}
      </div>

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        {/* Back Link - Simple Text Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-[0.2em] mb-12 hover:text-forest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* SECTION 1: Heading */}
        <header className="mb-16">
          <div className="text-4xl md:text-6xl font-black text-forest leading-tight tracking-tighter mb-4">
            {partner.name}
          </div>
          <div className="w-24 h-1 bg-gold rounded-full"></div>
        </header>

        {/* SECTION 2: About Organization */}
        <section className="mb-16">
          <h2 className="text-gold font-black tracking-[0.4em] uppercase text-[11px] mb-6">
            About Organization
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
            {partner.about}
          </p>
        </section>

        {/* SECTION 3: Role in Kalpavruksha */}
        <section className="mb-16">
          <h2 className="text-gold font-black tracking-[0.4em] uppercase text-[11px] mb-6">
            Role in Kalpavruksha
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
            {partner.role}
          </p>
        </section>

        {/* SECTION 4: Services / Support */}
        <section className="mb-16">
          <h2 className="text-gold font-black tracking-[0.4em] uppercase text-[11px] mb-6">
            Services & Support
          </h2>
          <div className="flex flex-col gap-6">
            {partner.services.map((service, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="text-gold font-bold mt-1.5">•</span>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: Impact */}
        <section>
          <h2 className="text-gold font-black tracking-[0.4em] uppercase text-[11px] mb-6">
            Impact
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium italic border-l-4 border-gold/20 pl-8 py-2">
            {partner.impact}
          </p>
        </section>
      </div>
    </div>
  );
};

export default PartnerDetail;
