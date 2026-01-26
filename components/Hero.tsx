import React from 'react';
import { CAFE_DATA } from '../constants';
import { MapPin, Clock, Gamepad2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[70vh] min-h-[500px] w-full bg-emerald-950 overflow-hidden flex items-center justify-center">
      {/* Background Image Overlay with Parallax effect simulation */}
      <div className="absolute inset-0 scale-110 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1538333308182-2728537bb4b9?q=80&w=2000" 
          alt="Terrasse du Café Molédét" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/50 to-emerald-950"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-transparent to-emerald-950/80"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
        <div className="inline-flex items-center space-x-2 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
          <Gamepad2 className="w-4 h-4" />
          <span>Billiards • Coffee • Sports</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl leading-[1.1]">
          {CAFE_DATA.name}
        </h1>
        
        <p className="text-lg md:text-2xl text-stone-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
          {CAFE_DATA.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center bg-white/5 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 w-full sm:w-auto shadow-2xl">
            <Clock className="w-5 h-5 mr-3 text-amber-500" aria-hidden="true" />
            <span className="text-stone-200 font-medium">{CAFE_DATA.hours}</span>
          </div>
          <div className="flex items-center bg-white/5 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 w-full sm:w-auto shadow-2xl">
            <MapPin className="w-5 h-5 mr-3 text-amber-500" aria-hidden="true" />
            <span className="text-stone-200 font-medium">Fès, Maroc</span>
          </div>
        </div>
      </div>

      {/* Subtle bottom curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fafaf9"></path>
        </svg>
      </div>
    </div>
  );
};