// src/components/ui/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Button = ({ 
  to, 
  href, 
  onClick, 
  variant = 'primary', // 'primary', 'secondary', 'outline', 'whatsapp'
  children, 
  showArrow = false,
  className = '' 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 md:gap-3 font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 shadow-xl";
  
  const variants = {
    primary: "bg-forest text-white hover:bg-gold hover:scale-105",
    secondary: "bg-white text-forest hover:bg-gold hover:text-forest hover:-translate-y-1 hover:shadow-2xl",
    outline: "bg-transparent border border-white/30 text-white hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl",
    whatsapp: "bg-[#25D366] text-white hover:bg-forest hover:shadow-2xl hover:-translate-y-1",
  };

  const sizes = {
    md: "py-3 md:py-4 px-8 md:px-12 text-[11px] md:text-xs rounded-full",
    sm: "py-2.5 md:py-3.5 px-4 md:px-10 text-[11px] xs:text-[13px] md:text-base rounded-lg md:rounded-xl",
  };

  const content = (
    <>
      {variant === 'whatsapp' && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="md:w-[18px] md:h-[18px]">
          <path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.64-2.542 3.841-2.542 6.162 0 1.564.433 3.134 1.253 4.513l-1.341 4.904 5.025-1.319c1.328.727 2.812 1.11 4.316 1.11 2.321 0 4.519-.903 6.16-2.544 1.64-1.64 2.542-3.841 2.542-6.163 0-4.789-3.891-8.717-8.753-8.717zm4.49 12.33c-.66.66-1.538 1.023-2.47 1.023-.604 0-1.202-.152-1.729-.44l-.24-.132-2.83.742.754-2.758-.145-.23c-.347-.549-.53-1.184-.53-1.838 0-.932.363-1.81 1.023-2.47.66-.66 1.538-1.023 2.47-1.023.931 0 1.81.363 2.47 1.023.66.66 1.023 1.538 1.023 2.47 0 .933-.363 1.811-1.023 2.471z" />
        </svg>
      )}
      {children}
      {showArrow && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />}
    </>
  );

  const fullClassName = `${baseStyles} ${variants[variant]} ${sizes[variant === 'secondary' || variant === 'outline' ? 'sm' : 'md']} ${className}`;

  if (to) return <Link to={to} className={fullClassName}>{content}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={fullClassName}>{content}</a>;
  return <button onClick={onClick} className={fullClassName}>{content}</button>;
};

export default Button;
