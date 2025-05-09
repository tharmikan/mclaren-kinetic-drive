
import React, { useEffect, useRef, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ModelSection from '@/components/ModelSection';
import SpeedSection from '@/components/SpeedSection';
import DesignSection from '@/components/DesignSection';
import Navbar from '@/components/Navbar';
import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Index = () => {
  // Initialize Lenis smooth scrolling
  const { lenis } = useSmoothScroll();
  const mainRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top button functionality
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
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
    // Enhanced GSAP animations with intersection observer
    if (!mainRef.current) return;

    // Create and setup intersection observer for advanced reveal animations
    const revealElements = mainRef.current.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .stagger-children');
    
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            // Uncomment to remove animation when out of view
            // entry.target.classList.remove('is-visible');
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px"
      }
    );
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
    
    // Enhanced magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(elem => {
      elem.addEventListener('mousemove', (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(target, {
          duration: 0.3,
          x: x * 0.2,
          y: y * 0.2,
          ease: "power2.out"
        });
      });
      
      elem.addEventListener('mouseleave', (e) => {
        const target = e.currentTarget as HTMLElement;
        gsap.to(target, {
          duration: 0.5,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });

    // Progress bar effect
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: scrollProgress + "%",
        ease: "power1.out",
        duration: 0.3
      });
    }
    
    return () => {
      revealObserver.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [lenis, scrollProgress]);
  
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
      <main>
        <HeroSection />
        <ModelSection />
        <SpeedSection />
        <DesignSection />
        
        <section id="history" className="section-padding text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-racing font-bold mb-8 text-gradient reveal-up">
              A Legacy of Excellence
            </h2>
            <p className="text-gray-300 text-lg mb-10 reveal-up">
              From our Formula 1 origins to our groundbreaking road cars, McLaren's history 
              is defined by a relentless pursuit of perfection and innovation.
            </p>
            <a 
              href="#" 
              className="inline-block bg-mclaren-dark-gray/50 hover:bg-mclaren-orange/90 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 reveal-up hover-lift"
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
                  href={`#${item.toLowerCase()}`}
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

export default Index;
