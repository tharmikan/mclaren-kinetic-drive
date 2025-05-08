
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  
  useEffect(() => {
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const button = buttonRef.current;
    
    // Trigger animations on mount
    setTimeout(() => {
      if (heading) heading.classList.add('opacity-100');
      
      setTimeout(() => {
        if (subheading) subheading.classList.add('opacity-100', 'translate-y-0');
        
        setTimeout(() => {
          if (button) button.classList.add('opacity-100', 'translate-y-0');
        }, 400);
      }, 400);
    }, 500);
    
    // Cleanup function
    return () => {
      if (heading) heading.classList.remove('opacity-100');
      if (subheading) subheading.classList.remove('opacity-100', 'translate-y-0');
      if (button) button.classList.remove('opacity-100', 'translate-y-0');
    };
  }, []);

  const scrollToModels = () => {
    const modelsSection = document.getElementById('models');
    if (modelsSection) {
      modelsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-mclaren-dark via-mclaren-dark/70 to-transparent z-10" />
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634543392603-d55409339466?q=80&w=1632&auto=format&fit=crop')] bg-cover bg-center" 
          style={{ y }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20"
        style={{ opacity }}
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            ref={headingRef}
            className="font-racing text-5xl md:text-7xl font-bold mb-6 opacity-0 transition-opacity duration-1000"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">KINETIC</span> DRIVE
          </motion.h1>
          
          <motion.p 
            ref={subheadingRef}
            className="text-xl md:text-2xl mb-10 text-gray-300 opacity-0 translate-y-6 transition-all duration-1000"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Experience the engineering excellence and speed that defines McLaren automotive innovation
          </motion.p>
          
          <motion.div 
            ref={buttonRef}
            className="opacity-0 translate-y-6 transition-all duration-1000"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={scrollToModels}
              className="bg-mclaren-orange hover:bg-mclaren-orange-dark text-white font-bold py-3 px-8 rounded-md transition-all duration-300 flex items-center mx-auto"
            >
              Explore Models
              <ArrowDown className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ArrowDown className="h-6 w-6 text-mclaren-orange" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
