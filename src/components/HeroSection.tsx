
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Split text animation functionality
    const createSplitText = (element: HTMLElement | null) => {
      if (!element) return;
      
      const text = element.innerText;
      element.innerHTML = '';
      
      const words = text.split(' ');
      words.forEach((word, i) => {
        const wordContainer = document.createElement('span');
        wordContainer.className = 'split-text-container';
        wordContainer.style.transitionDelay = `${i * 0.08}s`;
        
        const wordSpan = document.createElement('span');
        wordSpan.className = 'split-text-inner';
        wordSpan.textContent = word + (i < words.length - 1 ? ' ' : '');
        
        wordContainer.appendChild(wordSpan);
        element.appendChild(wordContainer);
      });
    };
    
    // Initial animations with advanced techniques
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Apply split text to heading and subheading
    if (headingRef.current) createSplitText(headingRef.current);
    if (subheadingRef.current) createSplitText(subheadingRef.current);
    
    // Animate with sequence and better timing
    tl.to(
      '.split-text-container',
      { 
        className: '+=is-visible',
        stagger: 0.03,
        duration: 0.1
      }
    ).fromTo(
      buttonRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      },
      "-=0.4"
    ).fromTo(
      arrowRef.current,
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: 'power2.out'
      },
      "-=0.2"
    );
    
    // Enhanced parallax effect with velocity factor
    if (backgroundRef.current && sectionRef.current) {
      gsap.to(backgroundRef.current, {
        y: "40%",  // More pronounced effect
        scale: 1.1, // Subtle scale effect
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5, // Smoother scrub
          onUpdate: (self) => {
            // Dynamic velocity-based effect
            const velocity = self.getVelocity() / 2000;
            const bounded = Math.min(Math.max(velocity, -5), 5);
            if (backgroundRef.current) {
              gsap.to(backgroundRef.current, {
                duration: 0.5,
                skewY: bounded * 0.2, // Subtle skew for dynamic feel
                ease: "power1.out"
              });
            }
          }
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
      // Enhanced Lenis smooth scroll with options
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(modelsSection, { 
          offset: -50,
          duration: 1.5,
          easing: (t: number) => 1 - Math.pow(1 - t, 3), // Cubic ease out
        });
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
      {/* Advanced Video Background with Enhanced Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-mclaren-dark via-mclaren-dark/70 to-transparent z-10" />
        <div 
          ref={backgroundRef}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634543392603-d55409339466?q=80&w=1632&auto=format&fit=crop')] bg-cover bg-center parallax-deep"
        />
      </div>

      {/* Content with enhanced animations */}
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
            className="bg-mclaren-orange hover:bg-mclaren-orange-dark text-white font-bold py-3 px-8 rounded-md transition-all duration-300 flex items-center mx-auto hover-lift"
          >
            Explore Models
            <ArrowDown className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Enhanced Animated Scroll Indicator */}
      <div 
        ref={arrowRef} 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDown className="h-6 w-6 text-mclaren-orange animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
