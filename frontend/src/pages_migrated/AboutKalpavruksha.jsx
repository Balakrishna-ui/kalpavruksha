import React from 'react';

const AboutKalpavruksha = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* HERO SECTION */}
      <section className="relative py-24 md:py-32 bg-gray-50 flex items-center justify-center text-center px-6 overflow-hidden">
        {/* Subtle Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-full max-w-4xl flex justify-center">
          <img src="/img/logoo.PNG" alt="Kalpavruksha Watermark" className="w-full max-w-lg object-contain blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto mt-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-forest tracking-tight mb-6 leading-tight">
            About Kalpavruksha Cooperative Society
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 font-medium tracking-wide">
            Empowering Communities Through Cooperation
          </p>
        </div>
      </section>

      {/* TEXT CONTENT CONTAINER */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-[1000px] mx-auto text-left space-y-24">

          {/* SECTION 1: Introduction */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              Introduction
            </h2>
            <p className="text-base md:text-lg leading-[1.8] text-gray-700">
              Kalpavruksha Mutually Aided Cooperative Thrift and Credit Society Limited stands as a beacon of collective progress. At its core, the society was formed to unite individuals under the powerful banner of cooperation, bringing shared resources together to build an ecosystem that nurtures everyone involved. We believe that true growth happens when people support each other, pool their strengths, and collectively elevate their standard of living.
            </p>
            <p className="text-base md:text-lg leading-[1.8] text-gray-700">
              Named after the legendary wish-fulfilling tree, Kalpavruksha strives to provide a self-sustaining foundation for our members. Our focus extends far beyond traditional banking; we are building an integrated network that touches upon every critical aspect of a member's life, creating opportunities that might otherwise remain entirely out of reach.
            </p>
          </div>

          {/* SECTION 2: Philosophy */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              Our Philosophy
            </h2>
            <p className="text-base md:text-lg leading-[1.8] text-gray-700">
              Our guiding philosophy is rooted deeply in the principles of collective strength, community ownership, and absolute transparency. We operate on the fundamental belief that financial systems should serve the people who use them, not extract value from them. Every member is a vital stakeholder with equal standing, ensuring that our society is governed by democratic principles and driven by mutual benefit rather than profit margins.
            </p>
            <p className="text-base md:text-lg leading-[1.8] text-gray-700">
              Through unwavering transparency, we ensure that our operations remain visible and understandable to all our members, establishing a foundation of deep-seated trust and shared accountability that powers everything we do.
            </p>
          </div>

          {/* SECTION 3: Vision & Mission */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              Vision & Mission
            </h2>
            <p className="text-base md:text-lg leading-[1.8] text-gray-700">
              <strong>Our Vision:</strong> To cultivate a robust, resilient, and inclusive economic ecosystem where every single member has the resources, knowledge, and support needed to thrive comprehensively and sustainably.
            </p>
            <p className="text-base md:text-lg leading-[1.8] text-gray-700">
              <strong>Our Mission:</strong> We are committed to achieving this vision by systematically breaking down economic barriers. We aim to accomplish this by providing transparent financial services, fostering sustainable agricultural practices, investing in community-driven infrastructure, and relentlessly prioritizing the holistic well-being of our members in every major decision we execute.
            </p>
          </div>

          {/* SECTION 4: Multi-Sector Ecosystem */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              A Multi-Sector Ecosystem
            </h2>
            <p className="text-base md:text-lg leading-[1.8] text-gray-700">
              What sets Kalpavruksha apart is our commitment to a holistic approach. We have evolved beyond a purely financial cooperative into a dynamic, multi-sector ecosystem designed to protect and support our members across essential life domains.
            </p>
            <div className="pl-4 md:pl-6 space-y-4 pt-2">
              <p className="text-base md:text-lg leading-[1.8] text-gray-700">
                <strong>Agriculture:</strong> We work directly with farmers, integrating organic farming methodologies, providing fair market access through our Grameenam brand, and securing the livelihood of rural communities.
              </p>
              <p className="text-base md:text-lg leading-[1.8] text-gray-700">
                <strong>Finance:</strong> We offer tailored credit, accessible savings programs, and secure investment opportunities carefully constructed to protect against exploitation.
              </p>
              <p className="text-base md:text-lg leading-[1.8] text-gray-700">
                <strong>Manufacturing:</strong> We actively invest in local, small-scale production units, empowering local artisans and generating sustainable regional employment.
              </p>
              <p className="text-base md:text-lg leading-[1.8] text-gray-700">
                <strong>Retail & Services:</strong> Through integrated consumer outlets and essential services, we ensure our members have direct, affordable access to high-quality daily necessities without intermediary markups.
              </p>
            </div>
          </div>

          {/* SECTION 5: Impact */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              Our Growing Impact
            </h2>
            <p className="text-base md:text-lg leading-[1.8] text-gray-700">
              The true measure of Kalpavruksha is seen not in balance sheets, but in the real-world impact we generate across our expanding network of member communities. Through our shared efforts, we proudly support:
            </p>
            <ul className="list-disc transform translate-x-6 space-y-3 mt-4 text-base md:text-lg leading-[1.8] text-gray-700 max-w-[850px]">
              <li className="pl-2">Over 5000+ active, engaged members driving the cooperative forward.</li>
              <li className="pl-2">8 perfectly integrated economic divisions providing comprehensive stability.</li>
              <li className="pl-2">Active outreach and developmental operations spanning across 50+ partner villages.</li>
              <li className="pl-2">A society that is entirely, unequivocally, 100% member-owned.</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutKalpavruksha;
