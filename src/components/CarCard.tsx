
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CarType } from '@/data/mclarenCars';
import { ArrowRight } from 'lucide-react';

interface CarCardProps {
  car: CarType;
}

export const CarCard = ({ car }: CarCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden bg-black/80 border border-mclaren-orange/20 rounded-xl shadow-xl transition-all duration-300 hover:border-mclaren-orange"
      onClick={() => navigate(`/car/${car.slug}`)}
    >
      <div className="relative h-[240px] overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="inline-block px-3 py-1 bg-mclaren-orange/90 text-white text-xs font-medium rounded-full">
            {car.type}
          </span>
        </div>
      </div>
      
      <CardContent className="p-6 bg-gradient-to-b from-black to-mclaren-dark-gray/90">
        <h3 className="text-2xl font-racing font-bold mb-2 text-white">{car.name}</h3>
        <p className="text-mclaren-orange font-medium mb-5">{car.tagline}</p>
        
        {/* Key specs highlights */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {car.specs.slice(0, 4).map((spec, index) => (
            <div key={index} className="text-center">
              <p className="text-xs text-gray-400">{spec.label}</p>
              <p className="text-base font-racing font-bold text-white">{spec.value}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-800">
          <span className="text-xl font-racing font-bold text-white">
            {car.price}
          </span>
          <button 
            className="flex items-center gap-2 bg-mclaren-dark-gray/80 hover:bg-mclaren-orange text-white text-sm px-4 py-2 rounded-full transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/car/${car.slug}`);
            }}
          >
            Details <ArrowRight size={16} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
