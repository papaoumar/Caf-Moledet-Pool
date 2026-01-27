import React from 'react';
import { EVENTS } from '../constants';
import { Calendar, Users, Trophy, ArrowRight } from 'lucide-react';

export const Events: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-emerald-950 text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 border-8 border-white rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 border-8 border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Événements & Tournois</h2>
            <p className="text-emerald-100/60 max-w-xl text-lg font-light leading-relaxed">
              Rejoignez la communauté du Café Molédét Pool. Compétitions de billard, soirées thématiques et retransmissions historiques.
            </p>
          </div>
          <button className="flex items-center space-x-2 text-amber-500 font-bold hover:text-amber-400 transition-colors uppercase tracking-widest text-sm bg-amber-500/10 px-6 py-3 rounded-2xl border border-amber-500/20">
            <span>Voir tout l'agenda</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENTS.map((event) => (
            <div 
              key={event.id}
              className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 cursor-default"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="bg-amber-500 text-emerald-950 p-4 rounded-2xl shadow-lg shadow-amber-500/20">
                  {event.type === 'Tournament' ? <Trophy className="w-6 h-6" /> : <Calendar className="w-6 h-6" />}
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">Date Prévue</div>
                  <div className="text-xl font-bold">{event.date}</div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-500 transition-colors">{event.title}</h3>
              <p className="text-emerald-100/60 leading-relaxed mb-8">{event.description}</p>

              <div className="flex items-center justify-between pt-8 border-t border-white/10">
                <div className="flex items-center space-x-2 text-emerald-200/40 text-sm">
                  <Users className="w-4 h-4" />
                  <span>Inscription ouverte</span>
                </div>
                <button className="text-xs font-black uppercase tracking-widest text-white underline underline-offset-8 decoration-amber-500/50 hover:decoration-amber-500 transition-all">
                  S'inscrire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};