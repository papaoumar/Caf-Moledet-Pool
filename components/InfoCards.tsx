import React from 'react';
import { CAFE_DATA, MATCH_OF_THE_DAY } from '../constants';
import { Wifi, Tv, Baby, Phone, Map, Coffee, Clock } from 'lucide-react';

export const InfoCards: React.FC = () => {
  return (
    <div className="py-12 md:py-16 px-4 max-w-7xl mx-auto bg-stone-50">
      
      {/* Services Grid */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-8 md:mb-12">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Sports Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl border border-stone-100 flex flex-col items-center text-center transition-all hover:-translate-y-2 duration-300 relative overflow-hidden group cursor-default">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-700"></div>
            
            <div className="bg-amber-100 p-4 rounded-full mb-4 group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300">
              <Tv className="w-8 h-8 text-amber-700" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">Sports en Direct</h3>
            <p className="text-stone-600 mb-6 text-sm md:text-base">L'endroit idéal pour suivre vos matchs préférés dans une ambiance passionnée.</p>
            
            {/* Match of the Day Card */}
            <div className="w-full bg-stone-900 rounded-xl p-4 text-white transform transition-all hover:scale-105 shadow-md hover:shadow-lg border border-stone-800 mt-auto">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-2 flex items-center justify-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                Match du Jour
              </div>
              <div className="font-bold text-base md:text-lg leading-tight mb-1">{MATCH_OF_THE_DAY.teams}</div>
              <div className="flex justify-between items-center text-sm text-stone-400 mt-2 pt-2 border-t border-stone-800">
                  <span className="truncate pr-2">{MATCH_OF_THE_DAY.competition}</span>
                  <span className="flex items-center text-white whitespace-nowrap bg-stone-800 px-2 py-1 rounded">
                    <Clock className="w-3 h-3 mr-1" aria-hidden="true" /> 
                    {MATCH_OF_THE_DAY.time}
                  </span>
              </div>
            </div>
          </div>

          {/* Wi-Fi Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl border border-stone-100 flex flex-col items-center text-center transition-all hover:-translate-y-2 duration-300 group cursor-default">
            <div className="bg-amber-100 p-4 rounded-full mb-4 group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300">
              <Wifi className="w-8 h-8 text-amber-700" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">Wi-Fi Gratuit</h3>
            <p className="text-stone-600 text-sm md:text-base">Restez connectés avec notre connexion haut débit gratuite pour tous les clients.</p>
          </div>

          {/* Families Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl border border-stone-100 flex flex-col items-center text-center transition-all hover:-translate-y-2 duration-300 group cursor-default">
            <div className="bg-amber-100 p-4 rounded-full mb-4 group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300">
              <Baby className="w-8 h-8 text-amber-700" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">Familles Bienvenues</h3>
            <p className="text-stone-600 text-sm md:text-base">Chaises hautes disponibles et environnement adapté pour les familles.</p>
          </div>
        </div>
      </div>

      {/* Contact & Location Section */}
      <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          <div className="p-6 md:p-10 lg:p-16 flex flex-col justify-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-amber-400">Nous trouver</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Map className="w-6 h-6 text-stone-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-lg">Adresse</h4>
                  <p className="text-stone-300 text-sm md:text-base">{CAFE_DATA.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-stone-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-lg">Téléphone</h4>
                  <p className="text-stone-300 text-sm md:text-base">{CAFE_DATA.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Coffee className="w-6 h-6 text-stone-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-lg">Horaires</h4>
                  <p className="text-stone-300 text-sm md:text-base">{CAFE_DATA.hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-10">
               <button 
                className="w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                aria-label={`Appeler le café au ${CAFE_DATA.phone}`}
               >
                 Appeler maintenant
               </button>
            </div>
          </div>

          <div className="h-64 md:h-96 lg:h-auto bg-stone-800 relative">
             <img 
              src="https://picsum.photos/seed/fesmap/800/800" 
              alt="Carte stylisée montrant la localisation du café à Fès" 
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-stone-900/80 text-white px-4 py-2 rounded backdrop-blur border border-white/20 text-sm md:text-base">
                    Carte interactive indisponible
                </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};