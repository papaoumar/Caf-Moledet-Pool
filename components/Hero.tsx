import React from 'react';
import { CAFE_DATA } from '../constants';
import { MapPin, Clock } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[50vh] md:h-[60vh] min-h-[400px] md:min-h-[500px] w-full bg-stone-900 overflow-hidden flex items-center justify-center">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-60">
        <img 
          src="https://picsum.photos/seed/coffeevibe/1920/1080" 
          alt="Ambiance du Café Moledet Pool" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg leading-tight">
          {CAFE_DATA.name}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-stone-200 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
          {CAFE_DATA.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center text-sm font-medium text-white">
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 w-full sm:w-auto justify-center">
            <Clock className="w-4 h-4 mr-2 text-amber-400 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{CAFE_DATA.hours}</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 w-full sm:w-auto justify-center">
            <MapPin className="w-4 h-4 mr-2 text-amber-400 flex-shrink-0" aria-hidden="true" />
            <span>Fès, Maroc</span>
          </div>
        </div>
      </div>
    </div>
  );
};