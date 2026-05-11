// src/components/ui/Card.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Card = ({ 
  to, 
  image, 
  title, 
  subtitle, 
  badge, 
  className = '' 
}) => {
  return (
    <Link 
      to={to}
      className={`group bg-white rounded-[16px] md:rounded-[20px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center ${className}`}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-[#fcfdfa] flex items-center justify-center p-4 md:p-8 overflow-hidden">
        {badge && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20">
            <span className="bg-forest text-gold text-[7px] md:text-[9px] font-black px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg tracking-widest shadow-lg uppercase">
              {badge}
            </span>
          </div>
        )}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 w-full flex flex-col items-center text-center">
        <h3 className="text-sm md:text-xl font-bold text-forest mb-1 md:mb-2 group-hover:text-gold transition-colors line-clamp-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-gray-400 text-[10px] md:text-xs font-medium mb-4 md:mb-6 line-clamp-2 h-8 md:h-auto">
            {subtitle}
          </p>
        )}
        
        <div className="w-full flex items-center justify-center gap-2 py-2.5 md:py-3.5 bg-forest text-white text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-lg md:rounded-xl group-hover:bg-gold group-hover:text-forest transition-all duration-300">
          View Details
          <ArrowRight className="w-3 md:w-3.5 h-3 md:h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default Card;
