import React, { useEffect, useRef } from 'react';
import { Gauge } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type SpeedSpecType = {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
};

const SpeedSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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

  // Initialize counter refs array
  counterRefs.current = Array(speedSpecs.length).fill(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Parallax effect for background
    gsap.to(".parallax-bg", {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Animate heading and description
    const contentTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "center center",
      }
    });
    
    contentTimeline
      .fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );
    
    // Animate spec cards with staggered appearance
    if (specsRef.current) {
      gsap.fromTo(
        specsRef.current.children,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: specsRef.current,
            start: "top 75%",
          }
        }
      );
    }
    
    // Animate counters
    counterRefs.current.forEach((counterRef, index) => {
      if (!counterRef) return;
      
      const spec = speedSpecs[index];
      const countElement = counterRef.querySelector('.counter-value');
      
      if (countElement) {
        gsap.fromTo(
          countElement,
          { textContent: "0" },
          {
            textContent: spec.value.toString(),
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counterRef,
              start: "top 80%",
            },
            onUpdate: function() {
              // Format decimals for values less than 10
              if (spec.value < 10) {
                const value = parseFloat(countElement.textContent || "0");
                countElement.textContent = value.toFixed(1);
              }
            }
          }
        );
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="performance" ref={sectionRef} className="relative py-20">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626409325900-31965771d82a?q=80&w=1632&auto=format&fit=crop')] bg-fixed bg-cover bg-center parallax-bg"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-mclaren-dark via-mclaren-dark/90 to-mclaren-dark/90" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-racing font-bold mb-6 text-gradient"
          >
            Unmatched Performance
          </h2>
          <p 
            ref={descriptionRef}
            className="text-gray-300 text-lg"
          >
            McLaren's relentless pursuit of performance creates cars that deliver exhilarating driving experiences through innovative engineering and lightweight design.
          </p>
        </div>
        
        <div ref={specsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speedSpecs.map((spec, index) => (
            <div 
              key={index}
              ref={el => counterRefs.current[index] = el}
              className="bg-mclaren-dark-gray/50 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-mclaren-dark-gray/80 transition-all duration-500 hover:transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">
                {spec.icon}
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">{spec.title}</h3>
              <div className="flex items-center justify-center gap-1">
                <p className="text-4xl font-racing font-bold text-mclaren-orange counter-value">
                  0
                </p>
                <span className="text-lg text-gray-300">{spec.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeedSection;
