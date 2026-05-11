// src/components/ui/Section.jsx
import React from 'react';

const Section = ({ 
  children, 
  className = '', 
  bg = 'white', // 'white', 'gray', 'forest', 'pattern'
  id 
}) => {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-[#f8f9f7]",
    forest: "bg-forest text-white",
    pattern: "bg-[#fcfdfc] relative",
    cream: "bg-cream",
    beige: "bg-beige",
  };

  return (
    <section id={id} className={`py-12 md:py-20 relative overflow-hidden ${backgrounds[bg]} ${className}`}>
      {bg === 'pattern' && (
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1a3a1a_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {children}
      </div>
    </section>
  );
};

// src/components/ui/Heading.jsx
const Heading = ({ 
  tag, 
  title, 
  accent, 
  center = true, 
  className = '',
  light = false 
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center' : 'text-left'} ${className}`}>
      {tag && (
        <span className="text-gold font-black tracking-[0.4em] uppercase text-[9px] md:text-[10px] mb-3 md:mb-4 block">
          {tag}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-forest'} leading-tight tracking-tighter`}>
        {title} {accent && <span className="text-gold italic">{accent}</span>}
      </h2>
      <div className={`w-16 h-1 bg-gold mt-6 rounded-full ${center ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export { Section, Heading };
