
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initial animations when the section loads
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    ).fromTo(
      subheadingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6" // Start slightly before the previous animation finishes
    ).fromTo(
      buttonRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );
    
    // Parallax effect for the background
    if (backgroundRef.current && sectionRef.current) {
      gsap.to(backgroundRef.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
    
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToModels = () => {
    const modelsSection = document.getElementById('models');
    if (modelsSection) {
      // Use Lenis smooth scroll
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(modelsSection);
      } else {
        // Fallback to native scroll
        modelsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-mclaren-dark via-mclaren-dark/70 to-transparent z-10" />
        <div 
          ref={backgroundRef}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634543392603-d55409339466?q=80&w=1632&auto=format&fit=crop')] bg-cover bg-center"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 
            ref={headingRef}
            className="font-racing text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-gradient">KINETIC</span> DRIVE
          </h1>
          
          <p 
            ref={subheadingRef}
            className="text-xl md:text-2xl mb-10 text-gray-300"
          >
            Experience the engineering excellence and speed that defines McLaren automotive innovation
          </p>
          
          <button 
            ref={buttonRef}
            onClick={scrollToModels}
            className="bg-mclaren-orange hover:bg-mclaren-orange-dark text-white font-bold py-3 px-8 rounded-md transition-all duration-300 flex items-center mx-auto"
          >
            Explore Models
            <ArrowDown className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <ArrowDown className="h-6 w-6 text-mclaren-orange animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
