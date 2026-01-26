import React from 'react';
import { CAFE_DATA, MATCH_OF_THE_DAY } from '../constants';
import { Wifi, Tv, Gamepad2, Phone, Map, Coffee, Clock, Activity } from 'lucide-react';

export const InfoCards: React.FC = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      
      {/* Main Service Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        
        {/* Billiards Card */}
        <div className="bg-emerald-900 p-8 rounded-3xl shadow-xl flex flex-col items-center text-center transition-all hover:-translate-y-2 duration-300 group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Gamepad2 className="w-24 h-24 text-white" />
          </div>
          <div className="bg-amber-500/20 p-5 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-10 h-10 text-amber-500" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Espace Billard</h3>
          <p className="text-emerald-100/80 text-sm leading-relaxed mb-6">
            Des tables professionnelles et une ambiance feutrée pour les amateurs de précision.
          </p>
          <div className="mt-auto inline-block px-4 py-1 rounded-full bg-emerald-800 text-xs font-bold text-emerald-400 uppercase tracking-widest border border-emerald-700">
            Ouvert 7j/7
          </div>
        </div>

        {/* Sports & TV Card */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 flex flex-col items-center text-center transition-all hover:-translate-y-2 duration-300 group relative overflow-hidden">
          <div className="bg-emerald-100 p-5 rounded-2xl mb-6 group-hover:bg-emerald-200 transition-colors relative">
            <Tv className="w-10 h-10 text-emerald-900" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <h3 className="text-2xl font-bold text-emerald-950 mb-3">Grands Matchs HD</h3>
          <p className="text-stone-600 text-sm leading-relaxed mb-6">
            L'effervescence du stade sur nos écrans HD 1080p. Streaming temps réel et passion garantie.
          </p>
          
          <div className="w-full bg-stone-900 rounded-2xl p-4 text-white shadow-lg border border-stone-800 mt-auto">
            <div className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-2 flex items-center justify-center">
              <Activity className="w-3 h-3 mr-2 animate-pulse" />
              Diffusion en Direct
            </div>
            <div className="font-bold text-sm leading-tight mb-2">{MATCH_OF_THE_DAY.teams}</div>
            <div className="flex justify-between items-center text-[10px] text-stone-400 pt-2 border-t border-stone-800">
                <span className="truncate">{MATCH_OF_THE_DAY.competition}</span>
                <span className="text-white font-bold">{MATCH_OF_THE_DAY.time}</span>
            </div>
          </div>
        </div>

        {/* Cafe & Food Card */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 flex flex-col items-center text-center transition-all hover:-translate-y-2 duration-300 group">
          <div className="bg-emerald-100 p-5 rounded-2xl mb-6 group-hover:bg-emerald-200 transition-colors">
            <Coffee className="w-10 h-10 text-emerald-900" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-950 mb-3">Crèmerie & Plus</h3>
          <p className="text-stone-600 text-sm leading-relaxed mb-6">
            Découvrez nos pâtisseries fraîches, nos jus vitaminés et notre carte de sandwichs gourmands.
          </p>
          <div className="flex gap-2 mt-auto">
            <div className="p-2 bg-stone-100 rounded-lg"><Wifi className="w-4 h-4 text-emerald-700" /></div>
            <div className="p-2 bg-stone-100 rounded-lg"><Wifi className="w-4 h-4 text-emerald-700" /></div>
          </div>
        </div>

      </div>

      {/* Contact & Map Section */}
      <div className="bg-emerald-950 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          <div className="p-8 md:p-16 flex flex-col justify-center text-white relative">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white relative">
              Venez nous <span className="text-amber-500">rendre visite</span>
            </h2>
            
            <div className="space-y-8 relative">
              <div className="flex items-start space-x-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center flex-shrink-0 border border-emerald-800">
                   <Map className="w-5 h-5 text-amber-500" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Localisation</h4>
                  <p className="text-emerald-100/60 text-sm leading-relaxed">{CAFE_DATA.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center flex-shrink-0 border border-emerald-800">
                   <Phone className="w-5 h-5 text-amber-500" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Téléphone</h4>
                  <p className="text-emerald-100/60 text-sm">{CAFE_DATA.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center flex-shrink-0 border border-emerald-800">
                   <Clock className="w-5 h-5 text-amber-500" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Horaires d'Ouverture</h4>
                  <p className="text-emerald-100/60 text-sm">{CAFE_DATA.hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <a 
                href={`tel:${CAFE_DATA.phone}`}
                className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-amber-500/20 active:scale-95"
               >
                 Réserver une Table
               </a>
            </div>
          </div>

          <div className="h-80 lg:h-auto relative">
             <img 
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1000" 
              alt="Café extérieur à Fès" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-emerald-950/40"></div>
          </div>

        </div>
      </div>
    </div>
  );
};