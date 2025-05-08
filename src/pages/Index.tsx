
import React, { useEffect, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import ModelSection from '@/components/ModelSection';
import SpeedSection from '@/components/SpeedSection';
import DesignSection from '@/components/DesignSection';
import Navbar from '@/components/Navbar';
import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';

const Index = () => {
  // Initialize Lenis smooth scrolling
  const { lenis } = useSmoothScroll();
  const mainRef = useRef<HTMLDivElement>(null);
  
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
  
  useEffect(() => {
    // Set up GSAP animations
    if (!mainRef.current) return;

    // Animate sections on scroll
    const sections = mainRef.current.querySelectorAll('section');
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll('.animate-on-scroll'),
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [lenis]);
  
  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    }
  };

  return (
    <div 
      ref={mainRef}
      className="min-h-screen bg-mclaren-dark custom-scrollbar overflow-x-hidden"
    >
      <Navbar />
      <main>
        <HeroSection />
        <ModelSection />
        <SpeedSection />
        <DesignSection />
        
        <section id="history" className="section-padding text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-racing font-bold mb-8 text-gradient animate-on-scroll">
              A Legacy of Excellence
            </h2>
            <p className="text-gray-300 text-lg mb-10 animate-on-scroll">
              From our Formula 1 origins to our groundbreaking road cars, McLaren's history 
              is defined by a relentless pursuit of perfection and innovation.
            </p>
            <a 
              href="#" 
              className="inline-block bg-mclaren-dark-gray/50 hover:bg-mclaren-orange/90 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 animate-on-scroll"
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
