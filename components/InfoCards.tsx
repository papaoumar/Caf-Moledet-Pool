import React from 'react';
import { CAFE_DATA } from '../constants';
import { Wifi, Tv, Baby, Phone, Map, Coffee } from 'lucide-react';

export const InfoCards: React.FC = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto bg-stone-50">
      
      {/* Services Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-12">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
            <div className="bg-amber-100 p-4 rounded-full mb-4">
              <Tv className="w-8 h-8 text-amber-700" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">Sports en Direct</h3>
            <p className="text-stone-600">L'endroit idéal pour suivre vos matchs préférés dans une ambiance passionnée.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
            <div className="bg-amber-100 p-4 rounded-full mb-4">
              <Wifi className="w-8 h-8 text-amber-700" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">Wi-Fi Gratuit</h3>
            <p className="text-stone-600">Restez connectés avec notre connexion haut débit gratuite pour tous les clients.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
            <div className="bg-amber-100 p-4 rounded-full mb-4">
              <Baby className="w-8 h-8 text-amber-700" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">Familles Bienvenues</h3>
            <p className="text-stone-600">Chaises hautes disponibles et environnement adapté pour les familles.</p>
          </div>
        </div>
      </div>

      {/* Contact & Location Section */}
      <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          <div className="p-10 lg:p-16 flex flex-col justify-center text-white">
            <h2 className="text-3xl font-bold mb-8 text-amber-400">Nous trouver</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Map className="w-6 h-6 text-stone-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-lg">Adresse</h4>
                  <p className="text-stone-300">{CAFE_DATA.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-stone-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-lg">Téléphone</h4>
                  <p className="text-stone-300">{CAFE_DATA.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Coffee className="w-6 h-6 text-stone-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-lg">Horaires</h4>
                  <p className="text-stone-300">{CAFE_DATA.hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
               <button 
                className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                aria-label={`Appeler le café au ${CAFE_DATA.phone}`}
               >
                 Appeler maintenant
               </button>
            </div>
          </div>

          <div className="h-96 lg:h-auto bg-stone-800 relative">
             <img 
              src="https://picsum.photos/seed/fesmap/800/800" 
              alt="Carte stylisée montrant la localisation du café à Fès" 
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-stone-900/80 text-white px-4 py-2 rounded backdrop-blur border border-white/20">
                    Carte interactive indisponible
                </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};