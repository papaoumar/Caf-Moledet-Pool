import React from 'react';
import { CAFE_DATA } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-1">{CAFE_DATA.name}</h3>
          <p className="text-sm">Votre destination détente à Fès.</p>
        </div>
        
        <div className="text-sm space-y-1">
          <p>{CAFE_DATA.address}</p>
          <p>Tél: {CAFE_DATA.phone}</p>
        </div>
        
        <div className="mt-4 md:mt-0 text-xs">
          &copy; {new Date().getFullYear()} Café Moledet Pool. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};