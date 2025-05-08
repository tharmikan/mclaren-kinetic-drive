
import React, { useEffect, useRef, useState } from 'react';
import { Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

type SpeedSpecType = {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
};

const SpeedSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const speedSpecs: SpeedSpecType[] = [
    {
      title: "Top Speed",
      value: 341,
      unit: "km/h",
      icon: <Gauge className="h-8 w-8 text-mclaren-orange" />
    },
    {
      title: "0-100 km/h",
      value: 2.9,
      unit: "seconds",
      icon: <Gauge className="h-8 w-8 text-mclaren-orange" />
    },
    {
      title: "Horsepower",
      value: 720,
      unit: "hp",
      icon: <Gauge className="h-8 w-8 text-mclaren-orange" />
    },
    {
      title: "Torque",
      value: 770,
      unit: "Nm",
      icon: <Gauge className="h-8 w-8 text-mclaren-orange" />
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.3 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const [counts, setCounts] = useState<number[]>(speedSpecs.map(() => 0));
  
  useEffect(() => {
    if (!isVisible) return;
    
    const intervals = speedSpecs.map((spec, index) => {
      const duration = 2000; // 2 seconds animation
      const finalValue = spec.value;
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = duration / frameDuration;
      const valueIncrement = finalValue / totalFrames;
      
      let frame = 0;
      
      return setInterval(() => {
        if (frame >= totalFrames) {
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = finalValue;
            return newCounts;
          });
          clearInterval(intervals[index]);
          return;
        }
        
        frame++;
        setCounts(prev => {
          const newCounts = [...prev];
          // Calculate the new value with easing
          newCounts[index] = Math.min(Math.ceil(frame * valueIncrement), finalValue);
          return newCounts;
        });
      }, frameDuration);
    });
    
    return () => intervals.forEach(interval => clearInterval(interval));
  }, [isVisible, speedSpecs]);

  return (
    <section id="performance" ref={sectionRef} className="relative py-20" data-scroll-section>
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626409325900-31965771d82a?q=80&w=1632&auto=format&fit=crop')] bg-fixed bg-cover bg-center"
        data-scroll
        data-scroll-speed="-0.3"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-mclaren-dark via-mclaren-dark/90 to-mclaren-dark/90" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" data-scroll data-scroll-speed="0.5">
          <motion.h2 
            className="text-4xl md:text-5xl font-racing font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            data-scroll
            data-scroll-speed="0.7"
          >
            Unmatched Performance
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            data-scroll
            data-scroll-speed="0.9"
          >
            McLaren's relentless pursuit of performance creates cars that deliver exhilarating driving experiences through innovative engineering and lightweight design.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speedSpecs.map((spec, index) => (
            <motion.div 
              key={index}
              className="bg-mclaren-dark-gray/50 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-mclaren-dark-gray/80 transition-all duration-500 hover:transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-scroll
              data-scroll-speed={0.2 + (index * 0.1)}
            >
              <div className="flex justify-center mb-4">
                {spec.icon}
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">{spec.title}</h3>
              <div className="flex items-center justify-center gap-1">
                <p className="text-4xl font-racing font-bold text-mclaren-orange">
                  {counts[index]}
                </p>
                <span className="text-lg text-gray-300">{spec.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeedSection;
