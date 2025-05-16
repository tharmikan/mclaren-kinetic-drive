
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { CarCard } from '@/components/CarCard';
import { mclarenCars } from '@/data/mclarenCars';
import { Card, CardContent } from '@/components/ui/card';

const Cars = () => {
  const { lenis } = useSmoothScroll();
  const mainRef = useRef<HTMLDivElement>(null);
  const carGridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
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
    if (!mainRef.current) return;
    
    // Animate the page title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2,
        ease: "power3.out"
      }
    );
    
    // Animate car cards with staggered effect
    if (carGridRef.current) {
      gsap.fromTo(
        carGridRef.current.children,
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carGridRef.current,
            start: "top 85%",
          }
        }
      );
    }

    // Progress bar effect
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: scrollProgress + "%",
        ease: "power1.out",
        duration: 0.3
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
    <div 
      ref={mainRef} 
      className="min-h-screen bg-mclaren-dark custom-scrollbar overflow-x-hidden"
    >
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-container">
        <div 
          ref={progressBarRef} 
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <section className="section-padding">
          <div className="container mx-auto">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-racing font-bold mb-16 text-center text-gradient"
            >
              McLaren Collection
            </h1>
            
            <div 
              ref={carGridRef}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
            >
              {mclarenCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-mclaren-dark-gray/50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="#" className="font-racing text-xl font-bold text-white magnetic">
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
                  href={`/#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-mclaren-orange transition-colors magnetic"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Enhanced Scroll to top button */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-8 right-8 bg-mclaren-orange hover:bg-mclaren-orange-dark p-3 rounded-full shadow-lg transition-all duration-300 z-30 magnetic ${
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
