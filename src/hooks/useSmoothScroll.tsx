
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling with enhanced settings
    const lenisInstance = new Lenis({
      duration: 1.6,  // Increased for smoother transitions
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Improved easing function
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,  // Slightly increased for better responsiveness
      touchMultiplier: 2.5,  // Enhanced touch response
      infinite: false,
      lerp: 0.1,  // Added linear interpolation for smoother feel
      syncTouch: true, // Better touch synchronization
    });

    // Optimized animation frame for Lenis
    function raf(time: number) {
      lenisInstance.raf(time);
      reqIdRef.current = requestAnimationFrame(raf);
    }
    
    reqIdRef.current = requestAnimationFrame(raf);
    setLenis(lenisInstance);

    // Enhanced ScrollTrigger integration
    lenisInstance.on('scroll', (e: any) => {
      ScrollTrigger.update();
      // Make scroll data globally available
      window.scrollData = {
        current: e.current,
        velocity: e.velocity,
        progress: e.progress,
        direction: e.direction,
      };
    });

    // Advanced ScrollTrigger proxy settings
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenisInstance.scrollTo(value || 0, { immediate: true });
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

    // Enhanced resize observer for responsive animations
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
      lenisInstance.resize(); // Make sure Lenis adapts to new dimensions
    });

    resizeObserver.observe(document.documentElement);

    // Store lenis instance in window for global access
    (window as any).lenis = lenisInstance;

    // Clean up with enhanced memory management
    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current);
        reqIdRef.current = null;
      }
      lenisInstance.destroy();
      resizeObserver.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      delete (window as any).lenis;
      delete (window as any).scrollData;
    };
  }, []);

  return { lenis };
}
