
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { ArrowLeft, ArrowUp, ChevronLeft } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { mclarenCars, CarType } from '@/data/mclarenCars';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const CarDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { lenis } = useSmoothScroll();
  const [car, setCar] = useState<CarType | null>(null);
  
  // Refs for sections
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const specListRef = useRef<HTMLDivElement>(null);
  const featureListRef = useRef<HTMLUListElement>(null);
  
  // Scroll to top button functionality
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const foundCar = mclarenCars.find((c) => c.slug === slug);
    
    if (foundCar) {
      setCar(foundCar);
      // Set page title
      document.title = `${foundCar.name} | McLaren`;
    } else {
      // If car not found, navigate to cars listing
      navigate('/cars');
    }
    
    // Cleanup
    return () => {
      document.title = 'McLaren';
    };
  }, [slug, navigate]);
  
  // Enhanced scroll tracking
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / scrollTotal) * 100;
      setScrollProgress(progress);
      
      if (scrollPosition > window.innerHeight * 0.5) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);
  
  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { 
        duration: 1.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 3) // Cubic ease out
      });
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-mclaren-dark flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mclaren-dark custom-scrollbar overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/30 z-50">
        <div 
          className="h-full bg-mclaren-orange transition-all duration-300 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Back button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <button
            onClick={() => navigate('/cars')}
            className="flex items-center gap-2 text-gray-400 hover:text-mclaren-orange transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to All Cars</span>
          </button>
        </div>
        
        {/* Car header */}
        <div 
          ref={headerRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-racing font-bold text-white mb-2">
                {car.name}
              </h1>
              <p className="text-xl text-mclaren-orange mb-4">{car.tagline}</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-6 py-3 mt-4 md:mt-0">
              <span className="text-3xl font-racing font-bold text-white">{car.price}</span>
            </div>
          </div>
        </div>
        
        {/* Main car image */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="overflow-hidden rounded-lg h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <img 
              ref={imageRef}
              src={car.imageUrl}
              alt={car.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Car details */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left column - Description */}
            <div 
              ref={contentRef}
              className="lg:col-span-2 space-y-10"
            >
              <div>
                <h2 className="text-3xl font-racing font-bold text-white mb-6">Overview</h2>
                <p className="text-gray-200 text-lg leading-relaxed">{car.description}</p>
              </div>
              
              {/* Gallery section with carousel */}
              {car.gallery && car.gallery.length > 0 && (
                <div>
                  <h2 className="text-3xl font-racing font-bold text-white mb-6">Gallery</h2>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {car.gallery.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="overflow-hidden rounded-lg h-[250px] md:h-[350px]">
                            <img 
                              src={image} 
                              alt={`${car.name} - Gallery ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-black/50 text-white border-none" />
                    <CarouselNext className="bg-black/50 text-white border-none" />
                  </Carousel>
                </div>
              )}
              
              {/* Features */}
              {car.features && car.features.length > 0 && (
                <div>
                  <h2 className="text-3xl font-racing font-bold text-white mb-6">Key Features</h2>
                  <ul 
                    ref={featureListRef}
                    className="space-y-4"
                  >
                    {car.features.map((feature, index) => (
                      <li 
                        key={index}
                        className="flex items-start"
                      >
                        <span className="inline-block w-1.5 h-1.5 bg-mclaren-orange rounded-full mt-2 mr-3"></span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Right column - Specs */}
            <div>
              <Card className="bg-black/60 backdrop-blur-md border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-racing font-bold text-white mb-6">Specifications</h3>
                  
                  <div 
                    ref={specListRef}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                      <span className="text-gray-400">Year</span>
                      <span className="text-lg font-medium text-white">{car.year}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                      <span className="text-gray-400">Type</span>
                      <span className="text-lg font-medium text-white">{car.type}</span>
                    </div>
                    
                    {car.specs.map((spec, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center pb-3 border-b border-gray-700"
                      >
                        <span className="text-gray-400">{spec.label}</span>
                        <span className="text-lg font-medium text-white">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      className="w-full bg-mclaren-orange hover:bg-mclaren-orange-dark text-white font-racing font-medium py-3 px-6 rounded-md transition-colors duration-300"
                    >
                      Configure This Car
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-black/80 backdrop-blur-md py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <a href="/" className="font-racing text-2xl font-bold text-white">
                McLaren<span className="text-mclaren-orange">.</span>
              </a>
              <p className="text-gray-400 mt-2">
                © {new Date().getFullYear()} McLaren Automotive. All rights reserved.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4">
              {["Models", "Performance", "Design", "History"].map((item) => (
                <a 
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-mclaren-orange transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-8 right-8 bg-mclaren-orange hover:bg-mclaren-orange-dark p-3 rounded-full shadow-lg transition-all duration-300 z-30 ${
          showScrollButton ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default CarDetail;
