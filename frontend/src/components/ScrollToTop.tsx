import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      const resetScroll = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      };

      resetScroll();
      requestAnimationFrame(resetScroll);
      const timer = setTimeout(resetScroll, 50);
      return () => clearTimeout(timer);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
