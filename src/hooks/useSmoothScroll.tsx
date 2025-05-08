
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Set up the animation frame for Lenis
    function raf(time: number) {
      lenisInstance.raf(time);
      reqIdRef.current = requestAnimationFrame(raf);
    }
    
    reqIdRef.current = requestAnimationFrame(raf);
    setLenis(lenisInstance);

    // Update ScrollTrigger when Lenis scrolls
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Make ScrollTrigger use Lenis's scroll position
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenisInstance.scrollTo(value || 0);
        }
        return lenisInstance.scroll;
      },
      getBoundingClientRect() {
        return { 
          top: 0, 
          left: 0, 
          width: window.innerWidth, 
          height: window.innerHeight 
        };
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    });

    // Refresh ScrollTrigger on resize
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    resizeObserver.observe(document.documentElement);

    // Clean up
    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current);
      }
      lenisInstance.destroy();
      resizeObserver.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return { lenis };
}
