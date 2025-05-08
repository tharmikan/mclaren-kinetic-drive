
import { useEffect } from 'react';

export const initScrollAnimations = () => {
  useEffect(() => {
    // Function to check if an element is in viewport
    const handleScrollAnimations = () => {
      const elements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up, .scroll-slide-right, .scroll-slide-left');
      
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If element is in viewport
        if (elementPosition.top < windowHeight * 0.85) {
          element.classList.add('active');
        }
      });
    };
    
    // Initial check when component mounts
    setTimeout(handleScrollAnimations, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScrollAnimations);
  }, []);
};

export default initScrollAnimations;
