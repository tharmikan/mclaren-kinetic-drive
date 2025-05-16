
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CarType } from '@/data/mclarenCars';

interface CarCardProps {
  car: CarType;
}

export const CarCard = ({ car }: CarCardProps) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    // Apply the transformation
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    // Reset the transformation
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  };

  return (
    <Card 
      ref={cardRef}
      className="overflow-hidden bg-mclaren-dark-gray/40 border-mclaren-dark-gray tilt-element hover-lift cursor-pointer rounded-lg shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/car/${car.slug}`)}
    >
      <div className="h-[220px] overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <CardContent className="p-6 tilt-inner">
        <h3 className="text-2xl font-racing font-bold mb-2 text-white text-shadow-md">{car.name}</h3>
        <p className="text-mclaren-orange font-medium mb-3">{car.tagline}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          {car.specs.map((spec, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-gray-400">{spec.label}</p>
              <p className="text-lg font-racing font-bold text-white">{spec.value}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-mclaren-dark-gray/60 flex justify-between items-center">
          <span className="text-mclaren-orange font-racing font-bold">
            {car.price}
          </span>
          <span className="inline-flex items-center text-sm text-white bg-mclaren-orange/20 rounded-full py-1 px-3">
            {car.type}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
