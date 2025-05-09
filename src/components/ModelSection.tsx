import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate the section title
    gsap.fromTo(
      ".section-title",
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
    
    // Animate each model card
    modelRefs.current.forEach((modelRef, index) => {
      if (!modelRef) return;
      
      // Image animation
      gsap.fromTo(
        modelRef.querySelector('.model-image'),
        { scale: 0.9, opacity: 0.5 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: modelRef,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          }
        }
      );
      
      // Text content animation with staggered effect
      gsap.fromTo(
        modelRef.querySelectorAll('.model-content > *'),
        { 
          x: index % 2 === 0 ? 50 : -50, 
          opacity: 0 
        },
        { 
          x: 0, 
          opacity: 1, 
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: modelRef,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="models" ref={sectionRef} className="section-padding py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-racing font-bold mb-16 text-center text-gradient section-title">
          Exceptional Models
        </h2>
        
        <div className="space-y-32 md:space-y-40">
          {models.map((model, index) => (
            <div 
              key={model.id} 
              ref={el => modelRefs.current[index] = el}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                gap-8 md:gap-12 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={model.imageUrl} 
                    alt={model.name} 
                    className="w-full h-[300px] md:h-[400px] object-cover model-image"
                  />
                </div>
              </div>
              
              <div className={`w-full md:w-1/2 model-content`}>
                <h3 className="text-3xl md:text-4xl font-racing font-bold mb-2">
                  {model.name}
                </h3>
                <p className="text-mclaren-orange text-xl mb-4">{model.tagline}</p>
                <p className="text-gray-300 mb-6">{model.description}</p>
                <a 
                  href="#" 
                  className="inline-block border-b-2 border-mclaren-orange text-white hover:text-mclaren-orange transition-colors duration-300"
                >
                  Discover More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelSection;
