import React from 'react';

const Hero = ({ 
  image, 
  tag, 
  title, 
  subtitle, 
  titleAccent,
  height = 'h-[60vh] md:h-[400px]',
  overlay = 'bg-gradient-to-r from-[#0B3D2E]/75 to-[#102030]/60 backdrop-blur-[2px]',
  children 
}) => {
  return (
    <div className={`relative ${height} flex flex-col items-center justify-center text-center overflow-hidden w-full`}>
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={title || "Background"}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
      
      {/* Overlay */}
      <div className={`absolute inset-0 z-[1] ${overlay}`}></div>
      
      {/* Content */}
      <div className="relative z-[2] px-6 max-w-5xl mx-auto w-full pt-10">
        {tag && (
          <span className="inline-block text-gold font-black tracking-[0.4em] uppercase text-[10px] md:text-[12px] mb-3 md:mb-4 drop-shadow-md">
            {tag}
          </span>
        )}
        
        {title && (
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl">
            {title} {titleAccent && <span className="text-gold">{titleAccent}</span>}
          </h1>
        )}
        
        {subtitle && (
          <p className="text-white/90 text-sm md:text-lg mt-3 md:mt-4 font-medium drop-shadow-lg px-4 md:px-0 mx-auto max-w-2xl leading-relaxed md:leading-normal">
            {subtitle}
          </p>
        )}
        
        {children && (
          <div className="mt-8 md:mt-10">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
