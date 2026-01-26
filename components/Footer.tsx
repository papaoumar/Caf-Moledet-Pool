import React from 'react';
import { CAFE_DATA } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-100/40 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{CAFE_DATA.name}</h3>
          <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Votre oasis de détente à Fès. Billards, sports en direct et délices gourmands dans un cadre d'exception.
          </p>
        </div>
        
        <div className="text-sm">
          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Contact</h4>
          <p className="mb-2">{CAFE_DATA.address}</p>
          <p className="text-amber-500 font-bold">{CAFE_DATA.phone}</p>
        </div>
        
        <div className="text-sm">
          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Suivez-nous</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <span className="hover:text-amber-500 cursor-pointer transition-colors">Facebook</span>
            <span className="hover:text-amber-500 cursor-pointer transition-colors">Instagram</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-[10px] uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} Café Molédét Pool • Fès, Maroc
      </div>
    </footer>
  );
};