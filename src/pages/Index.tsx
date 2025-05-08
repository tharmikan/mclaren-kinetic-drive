
import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ModelSection from '@/components/ModelSection';
import SpeedSection from '@/components/SpeedSection';
import DesignSection from '@/components/DesignSection';
import Navbar from '@/components/Navbar';
import { initScrollAnimations } from '@/utils/scrollAnimation';
import { ArrowUp } from 'lucide-react';

const Index = () => {
  // Initialize scroll animations
  initScrollAnimations();
  
  // Scroll to top button functionality
  const [showScrollButton, setShowScrollButton] = React.useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-mclaren-dark custom-scrollbar overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ModelSection />
        <SpeedSection />
        <DesignSection />
        
        <section id="history" className="section-padding text-center">
          <div className="container mx-auto max-w-4xl scroll-fade-in">
            <h2 className="text-4xl md:text-5xl font-racing font-bold mb-8 text-gradient">
              A Legacy of Excellence
            </h2>
            <p className="text-gray-300 text-lg mb-10">
              From our Formula 1 origins to our groundbreaking road cars, McLaren's history 
              is defined by a relentless pursuit of perfection and innovation.
            </p>
            <a 
              href="#" 
              className="inline-block bg-mclaren-dark-gray/50 hover:bg-mclaren-orange/90 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
            >
              Explore Our Heritage
            </a>
          </div>
        </section>
      </main>
      
      <footer className="bg-mclaren-dark-gray/50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="#" className="font-racing text-xl font-bold text-white">
                McLaren<span className="text-mclaren-orange">.</span>
              </a>
              <p className="text-gray-400 mt-2 text-sm">
                © {new Date().getFullYear()} McLaren Automotive. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-8">
              {["Models", "Performance", "Design", "History"].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
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

export default Index;
