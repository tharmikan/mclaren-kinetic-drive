
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, useScroll, useTransform } from 'framer-motion';

type ModelType = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
};

const models: ModelType[] = [
  {
    id: 1,
    name: "McLaren 720S",
    tagline: "Raise Your Limits",
    description: "The McLaren 720S embodies our relentless quest to push the limits of possibility. Born of the track but created for the road, this is a car that delivers on every level.",
    imageUrl: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=1632&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "McLaren Artura",
    tagline: "The Full Force of Progress",
    description: "The Artura marks the beginning of a new chapter for McLaren as our first high-performance hybrid supercar, offering all the performance, dynamism and engagement for which we are renowned.",
    imageUrl: "https://images.unsplash.com/photo-1580274437636-1c384e617d45?q=80&w=1633&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "McLaren P1",
    tagline: "Maximum Attack",
    description: "The McLaren P1™ represents the ultimate expression of our technological expertise. This is a car that rewrites the rulebook and redefines what is possible.",
    imageUrl: "https://images.unsplash.com/photo-1573950940509-d924ee3fd345?q=80&w=1696&auto=format&fit=crop"
  }
];

const ModelSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const modelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();
  
  // Initialize array with the correct length
  modelRefs.current = Array(models.length).fill(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.1, 0.2], [50, 0]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: isMobile ? 0.1 : 0.25 });
    
    // Observe section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Observe each model
    modelRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, [isMobile]);

  const getAnimationProps = (index: number) => {
    return {
      initial: { opacity: 0, y: 100 },
      whileInView: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.8, 
        delay: 0.1 * index,
        type: "spring",
        stiffness: 50
      },
      viewport: { once: true, margin: "-100px" }
    };
  };

  return (
    <section id="models" ref={sectionRef} className="section-padding scroll-fade-in">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-racing font-bold mb-16 text-center text-gradient"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          Exceptional Models
        </motion.h2>
        
        <div className="space-y-32 md:space-y-40">
          {models.map((model, index) => (
            <motion.div 
              key={model.id} 
              ref={el => modelRefs.current[index] = el}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                gap-8 md:gap-12 items-center`}
              {...getAnimationProps(index)}
            >
              <div className="w-full md:w-1/2">
                <motion.div 
                  className="overflow-hidden rounded-lg"
                  whileInView={{ scale: [0.9, 1] }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <motion.img 
                    src={model.imageUrl} 
                    alt={model.name} 
                    className="w-full h-[300px] md:h-[400px] object-cover"
                    whileInView={{ scale: [1, 1.05] }}
                    transition={{ duration: 5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              </div>
              
              <motion.div 
                className={`w-full md:w-1/2`}
                whileInView={{ x: [index % 2 === 0 ? 50 : -50, 0], opacity: [0, 1] }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl md:text-4xl font-racing font-bold mb-2">
                  {model.name}
                </h3>
                <p className="text-mclaren-orange text-xl mb-4">{model.tagline}</p>
                <p className="text-gray-300 mb-6">{model.description}</p>
                <motion.a 
                  href="#" 
                  className="inline-block border-b-2 border-mclaren-orange text-white hover:text-mclaren-orange transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  Discover More
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelSection;
