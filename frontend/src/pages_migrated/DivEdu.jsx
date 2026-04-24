import React from 'react';

const DivEdu = () => {
  return (
    <div className="w-full font-inter bg-[#fcfbf9]">
      {/* ── Hero Section ───────────────────────────────────────────── */}
      <section 
        className="relative h-[50vh] md:h-[550px] flex items-center justify-center overflow-hidden pt-[80px] md:pt-0"
        aria-label="Hero"
      >
        {/* Hero Image Background */}
        <div className="absolute inset-0">
          <img 
            src="/img/edu_hero.png" 
            alt="Education Hero" 
            className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
          />
          {/* Refined gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center px-6 py-6 max-w-5xl mx-auto flex flex-col items-center">
          <span className="inline-block text-gold font-black tracking-[0.4em] uppercase text-[8px] md:text-[12px] mb-1 md:mb-6 drop-shadow-sm">
            Empowerment Through Knowledge
          </span>
          <h1 className="text-3xl md:text-7xl font-black text-white mb-2 md:mb-8 leading-tight tracking-tighter drop-shadow-2xl">
            Education <span className="text-gold">Division</span>
          </h1>
          <p className="text-sm md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-4 md:px-0">
            Empowering individuals through practical knowledge, advanced skills, and transformative opportunities to build self-reliant communities.
          </p>
        </div>
      </section>

      {/* ── Editorial Section 1: Empowerment ──────────────────────── */}
      <section className="py-8 md:py-12" aria-label="Introduction">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-24">
          <div className="flex-1 flex flex-col space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-[#1a3a1a] leading-tight">
              Education as the <span className="text-[#c9a84c]">Ultimate Catalyst</span>
            </h2>
            
            {/* Mobile Image */}
            <div className="md:hidden w-full">
              <img 
                src="/img/ed1.jpeg" 
                alt="Students learning in class" 
                className="w-full h-auto rounded-[24px] shadow-xl object-cover"
              />
            </div>

            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
              <p>
                At Kalpavruksha, we believe that true rural development is rooted in the continuous pursuit of knowledge. By providing open access to high-quality, practical learning, we actively enable individuals to break free from traditional cycles of dependency.
              </p>
              <p>
                Our learning initiatives are designed to be entirely inclusive, reaching the very heart of rural landscapes. We do not just teach theory; we focus intensely on skill-based paradigms that translate directly into robust livelihoods, entrepreneurship, and enduring community resilience.
              </p>
            </div>
          </div>
          
          {/* Desktop Image */}
          <div className="hidden md:block flex-1 w-full">
            <img 
              src="/img/ed1.jpeg" 
              alt="Students learning in class" 
              className="w-full h-auto rounded-[32px] shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Editorial Section 2: Vocational Training ──────────────── */}
      <section className="py-8 md:py-12 bg-white" aria-label="Vocational Training">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-24">
          <div className="flex-1 flex flex-col space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-[#1a3a1a] leading-tight">
              Bridging the Gap with <span className="text-[#c9a84c]">Vocational Mastery</span>
            </h2>
            
            {/* Mobile Image */}
            <div className="md:hidden w-full">
              <img 
                src="/img/ed2.jpeg" 
                alt="Practical vocational training" 
                className="w-full h-auto rounded-[24px] shadow-xl object-cover"
              />
            </div>

            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
              <p>
                Modern challenges require modern capabilities. Our highly specialized vocational programs immerse students directly into hands-on environments, blurring the lines between the classroom and the industry.
              </p>
              <p>
                From sustainable, eco-friendly agricultural techniques to advanced technological and digital literacy tools, we equip our community members with precisely the skills that current and future markets demand. This practical approach ensures immediate employability and promotes deep self-reliance among our youth and women.
              </p>
            </div>
          </div>
          
          {/* Desktop Image */}
          <div className="hidden md:block flex-1 w-full">
            <img 
              src="/img/ed2.jpeg" 
              alt="Practical vocational training" 
              className="w-full h-auto rounded-[32px] shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Editorial Section 3: Vision & Impact ──────────────────── */}
      <section className="py-8 md:py-12" aria-label="Vision and Impact">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-24">
          <div className="flex-1 flex flex-col space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-[#1a3a1a] leading-tight">
              A Vision Driven by <span className="text-[#c9a84c]">Impact</span>
            </h2>
            
            {/* Mobile Image */}
            <div className="md:hidden w-full">
              <img 
                src="/img/ed3.jpeg" 
                alt="Community educational assembly" 
                className="w-full h-auto rounded-[24px] shadow-xl object-cover"
              />
            </div>

            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
              <p>
                Our ultimate vision is to seamlessly transform every village associated with Kalpavruksha into a deeply networked hub of knowledge, innovation, and unwavering support.
              </p>
              <p>
                By fostering a dynamic culture of continuous, lifelong learning, we are not simply building institutions—we are cultivating an entire society capable of leading the broader region into a sustainable, collectively prosperous future. Education is not just our division; it is our foundation.
              </p>
            </div>
          </div>
          
          {/* Desktop Image */}
          <div className="hidden md:block flex-1 w-full">
            <img 
              src="/img/ed3.jpeg" 
              alt="Community educational assembly" 
              className="w-full h-auto rounded-[32px] shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default DivEdu;

