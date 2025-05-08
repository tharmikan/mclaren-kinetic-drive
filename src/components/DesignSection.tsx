
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';

type DesignFeatureType = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

const designFeatures: DesignFeatureType[] = [
  {
    id: 1,
    title: "Aerodynamic Excellence",
    description: "Every curve, vent and surface is meticulously designed with aerodynamic performance in mind, creating a perfect balance between downforce and reduced drag.",
    imageUrl: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Dihedral Doors",
    description: "McLaren's signature dihedral doors are not just a design statement—they're engineered to provide better access in tight spaces while showcasing our innovative approach.",
    imageUrl: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=1640&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Carbon Fiber Monocage",
    description: "Our revolutionary carbon fiber chassis technology provides exceptional strength and rigidity while keeping weight to an absolute minimum.",
    imageUrl: "https://images.unsplash.com/photo-1610979089716-3d3feea16e1b?q=80&w=1640&auto=format&fit=crop"
  }
];

const DesignSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate section title and description
    const headerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });
    
    headerTimeline
      .fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.5"
      );
    
    // Animate feature cards
    if (featuresGridRef.current) {
      const featureCards = featuresGridRef.current.children;
      
      for (let i = 0; i < featureCards.length; i++) {
        const card = featureCards[i];
        const image = card.querySelector('.feature-image');
        const content = card.querySelector('.feature-content');
        
        // Image zoom-in effect
        gsap.fromTo(
          image,
          { scale: 1.1, opacity: 0.7 },
          { 
            scale: 1, 
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            }
          }
        );
        
        // Text fade in from bottom
        gsap.fromTo(
          content?.children || [],
          { y: 20, opacity: 0 },
          { 
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            }
          }
        );
      }
    }
    
    // Animate design philosophy section
    if (philosophyRef.current) {
      const image = philosophyRef.current.querySelector('.philosophy-image');
      const content = philosophyRef.current.querySelectorAll('.philosophy-content > *');
      
      // Horizontal slide and reveal for the section
      gsap.fromTo(
        philosophyRef.current,
        { opacity: 0.5, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 75%",
          }
        }
      );
      
      // Image reveal
      gsap.fromTo(
        image,
        { x: -50, opacity: 0.5 },
        { 
          x: 0, 
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 70%",
          }
        }
      );
      
      // Content staggered reveal
      gsap.fromTo(
        content,
        { x: 50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 70%",
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="design" ref={sectionRef} className="section-padding py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-racing font-bold mb-6 text-gradient"
          >
            Design Excellence
          </h2>
          <p 
            ref={descriptionRef}
            className="text-gray-300 text-lg"
          >
            Every McLaren is a harmonious blend of form and function, where beauty emerges from engineering purpose.
          </p>
        </div>
        
        <div 
          ref={featuresGridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {designFeatures.map((feature) => (
            <div key={feature.id}>
              <div className="rounded-lg overflow-hidden mb-6 h-64">
                <img 
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover feature-image hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="feature-content">
                <h3 className="text-2xl font-racing font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Design Philosophy Section */}
        <div ref={philosophyRef} className="mt-24 relative">
          <div className="absolute inset-0 bg-mclaren-dark-gray/30 rounded-xl" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden">
            <div className="h-64 md:h-auto philosophy-image-container">
              <img 
                src="https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=1640&auto=format&fit=crop"
                alt="McLaren Design Philosophy"
                className="w-full h-full object-cover philosophy-image"
              />
            </div>
            
            <div className="p-8 md:p-12 flex flex-col justify-center philosophy-content">
              <h3 className="text-3xl font-racing font-bold mb-4 text-gradient">
                Our Design Philosophy
              </h3>
              <p className="text-gray-300 mb-6">
                At McLaren, we believe that true beauty comes from genuine engineering purpose. Every line, curve and detail serves a specific function, combining to create vehicles that are as captivating to look at as they are thrilling to drive.
              </p>
              <a 
                href="#" 
                className="text-mclaren-orange hover:text-orange-400 font-medium transition-colors"
              >
                Discover our design process →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
