
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export function useLocomotiveScroll(options = {}) {
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize Locomotive Scroll
    scrollRef.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      smartphone: {
        smooth: true,
        inertia: 0.8,
      },
      tablet: {
        smooth: true,
        inertia: 0.8,
      },
      ...options,
    });

    // Update scroll on window resize
    const resizeObserver = new ResizeObserver(() => {
      scrollRef.current?.update();
    });

    resizeObserver.observe(containerRef.current);

    // Clean up
    return () => {
      resizeObserver.disconnect();
      scrollRef.current?.destroy();
    };
  }, [options]);

  return { containerRef, locomotiveScroll: scrollRef };
}
