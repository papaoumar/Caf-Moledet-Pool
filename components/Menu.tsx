import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { Coffee, Cake, Sandwich, Star } from 'lucide-react';

export const Menu: React.FC = () => {
  const categories = ['Tous', 'Crèmerie', 'Sandwichs', 'Boissons', 'Spécialités'];
  const [activeTab, setActiveTab] = useState('Tous');

  const filteredItems = activeTab === 'Tous' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeTab);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Crèmerie': return <Cake className="w-5 h-5" />;
      case 'Sandwichs': return <Sandwich className="w-5 h-5" />;
      case 'Boissons': return <Coffee className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-24 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-amber-600 font-bold text-xs uppercase tracking-widest mb-4">
            <Star className="w-4 h-4" />
            <span>Notre Sélection Gourmande</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-6 tracking-tight">Menu Digital</h2>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            De la fraîcheur de notre crèmerie à la générosité de nos sandwichs, découvrez ce que nous préparons avec passion.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === cat 
                  ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-900/20 scale-105' 
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div 
              key={idx} 
              className="group p-6 rounded-3xl border border-stone-100 bg-stone-50/50 hover:bg-white hover:border-emerald-200 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-white shadow-sm border border-stone-100 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors`}>
                  {getIcon(item.category)}
                </div>
                <span className="text-emerald-700 font-black text-lg">{item.price}</span>
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">{item.name}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <p className="text-xs text-stone-400 font-medium uppercase tracking-[0.2em]">Produits frais préparés quotidiennement</p>
        </div>
      </div>
    </section>
  );
};