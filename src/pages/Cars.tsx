
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { CarCard } from '@/components/CarCard';
import { mclarenCars } from '@/data/mclarenCars';

const Cars = () => {
  const { lenis } = useSmoothScroll();
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top button functionality
  const [showScrollButton, setShowScrollButton] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  
  // Enhanced scroll tracking
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / scrollTotal) * 100;
      setScrollProgress(progress);
      
      if (scrollPosition > window.innerHeight * 0.5) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);
  
  useEffect(() => {
    // Progress bar effect
    if (progressBarRef.current) {
      progressBarRef.current.style.width = scrollProgress + "%";
    }
  }, [scrollProgress]);
  
  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { 
        duration: 1.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 3) // Cubic ease out
      });
    }
  };

  return (
    <div className="min-h-screen bg-mclaren-dark bg-[url('https://images.unsplash.com/photo-1626409325900-31965771d82a?q=80&w=1632&auto=format&fit=crop&blur=2')] bg-fixed bg-cover bg-center bg-blend-overlay custom-scrollbar overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/30 z-50">
        <div 
          ref={progressBarRef} 
          className="h-full bg-mclaren-orange transition-all duration-300 ease-out"
        />
      </div>
      
      <Navbar />
      
      <main className="pt-32 pb-24">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-lg mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-racing font-bold mb-6 text-white">
              McLaren <span className="text-mclaren-orange">Collection</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our lineup of legendary supercars, meticulously engineered for uncompromising performance and breathtaking design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {mclarenCars.map((car) => (
              <div key={car.id} className="transform transition-all duration-500">
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-black/80 backdrop-blur-md py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <a href="/" className="font-racing text-2xl font-bold text-white">
                McLaren<span className="text-mclaren-orange">.</span>
              </a>
              <p className="text-gray-400 mt-2">
                © {new Date().getFullYear()} McLaren Automotive. All rights reserved.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4">
              {["Models", "Performance", "Design", "History"].map((item) => (
                <a 
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-mclaren-orange transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-8 right-8 bg-mclaren-orange hover:bg-mclaren-orange-dark p-3 rounded-full shadow-lg transition-all duration-300 z-30 ${
          showScrollButton ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default Cars;
