import { useEffect, useState } from 'react';
import { scrollToTop } from 'utils';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // function control scroll
  const handleScroll = () => {
    const scrollThreshold = 300;
    const scrollY = window.scrollY;

    setIsVisible(scrollY > scrollThreshold);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      style={{
        display: 'block',
        position: 'fixed',
        right: '20px',
        bottom: '30px',
        cursor: 'pointer',
        padding: '10px 20px',
        background: 'hsla(0,0%,100%,.8)',
        color: '#636363',
        opacity: isVisible ? '1' : '0',
        textAlign: 'center',
        borderRadius: '30px',
        zIndex: 999,
        transition: 'opacity 0.25s',
        border: '1px solid rgba(0,0,0,.7)',
      }}
    >
      ToTop
    </button>
  );
};

export default ScrollToTopButton;
