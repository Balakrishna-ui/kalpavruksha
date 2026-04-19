import React from 'react';

const ProjMana = () => {
  return (
    <>
      <section className="page" id="page-proj-mana">
        <div 
          className="page-hero" 
          style={{ background: 'url("/img/mana_hero.png") center/cover no-repeat' }}
        >
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="page-hero-content relative z-10">
            <h1>Mana <span className="gold">Palle</span></h1>
            <p>A sustainable, tech-integrated village for the modern family.</p>
          </div>
        </div>

        <div className="page-body space-y-20">
          {/* Inline Image & Content Section */}
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="standalone-content flex-1 !max-w-none !mb-0">
              <h2>Experience <span className="gold">Village Life</span></h2>
              <p className="text-lg leading-relaxed text-gray-600 mt-4">
                Mana Palle is more than just a housing scheme—it's a commitment to shared living, organic food, and community
                responsibility. By integrating smart tech with sustainable building practices, we aim to provide an unparalleled modern rural lifestyle.
              </p>
            </div>
            <div className="flex-1 w-full overflow-hidden rounded-[16px] shadow-lg group">
              <img 
                src="/img/mana_eco.png" 
                loading="lazy" 
                alt="Sustainable Village Homes" 
                className="w-full h-auto md:h-[400px] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" 
              />
            </div>
          </div>

          {/* Image Gallery Section */}
          <div className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="overflow-hidden rounded-[16px] shadow-md group">
                <img 
                  src="/img/mana_agri.png" 
                  loading="lazy" 
                  alt="Green Agriculture Fields" 
                  className="w-full h-auto md:h-[300px] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" 
                />
              </div>
              <div className="overflow-hidden rounded-[16px] shadow-md group">
                <img 
                  src="/img/banner.jpeg" 
                  loading="lazy" 
                  alt="Community Lifestyle" 
                  className="w-full h-auto md:h-[300px] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjMana;

