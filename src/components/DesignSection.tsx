
import React, { useRef } from 'react';

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
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Initialize array with the correct length
  featureRefs.current = Array(designFeatures.length).fill(null);

  return (
    <section id="design" ref={sectionRef} className="section-padding" data-scroll-section>
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16" data-scroll data-scroll-speed="0.5">
          <h2 className="text-4xl md:text-5xl font-racing font-bold mb-6 text-gradient">
            Design Excellence
          </h2>
          <p className="text-gray-300 text-lg">
            Every McLaren is a harmonious blend of form and function, where beauty emerges from engineering purpose.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {designFeatures.map((feature, index) => (
            <div 
              key={feature.id}
              ref={el => featureRefs.current[index] = el}
              data-scroll
              data-scroll-speed={0.2 + (index * 0.1)}
            >
              <div 
                className="rounded-lg overflow-hidden mb-6 h-64"
                data-scroll
                data-scroll-speed={0.1}
              >
                <img 
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  data-scroll
                  data-scroll-direction="horizontal"
                  data-scroll-speed={index % 2 === 0 ? "-0.2" : "0.2"}
                />
              </div>
              
              <h3 
                className="text-2xl font-racing font-bold mb-3 text-white"
                data-scroll
                data-scroll-speed="0.3"
              >
                {feature.title}
              </h3>
              
              <p 
                className="text-gray-300"
                data-scroll
                data-scroll-speed="0.5"
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Design Philosophy Section */}
        <div className="mt-24 relative" data-scroll data-scroll-speed="0.1">
          <div className="absolute inset-0 bg-mclaren-dark-gray/30 rounded-xl" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden">
            <div className="h-64 md:h-auto" data-scroll data-scroll-direction="horizontal" data-scroll-speed="-0.1">
              <img 
                src="https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=1640&auto=format&fit=crop"
                alt="McLaren Design Philosophy"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div 
              className="p-8 md:p-12 flex flex-col justify-center"
              data-scroll
              data-scroll-speed="0.3"
            >
              <h3 
                className="text-3xl font-racing font-bold mb-4 text-gradient"
                data-scroll
                data-scroll-speed="0.4"
              >
                Our Design Philosophy
              </h3>
              <p 
                className="text-gray-300 mb-6"
                data-scroll
                data-scroll-speed="0.5"
              >
                At McLaren, we believe that true beauty comes from genuine engineering purpose. Every line, curve and detail serves a specific function, combining to create vehicles that are as captivating to look at as they are thrilling to drive.
              </p>
              <a 
                href="#" 
                className="text-mclaren-orange hover:text-orange-400 font-medium transition-colors"
                data-scroll
                data-scroll-speed="0.6"
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
