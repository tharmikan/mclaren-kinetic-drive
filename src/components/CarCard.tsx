
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CarType } from '@/data/mclarenCars';

interface CarCardProps {
  car: CarType;
}

export const CarCard = ({ car }: CarCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden bg-mclaren-dark-gray/40 border-mclaren-dark-gray rounded-lg shadow-lg cursor-pointer"
      onClick={() => navigate(`/car/${car.slug}`)}
    >
      <div className="h-[220px] overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardContent className="p-6">
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
