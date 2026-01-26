import React from 'react';
import { GALLERY_IMAGES } from '../constants';

export const Gallery: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-emerald-950 mb-4">Aperçu de Notre Univers</h2>
          <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-stone-600 max-w-2xl mx-auto">
            Découvrez l'ambiance chaleureuse de nos salles, notre espace billard de précision et nos délices sucrés.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((img, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl ${
                index % 4 === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 min-h-[200px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-semibold text-lg">{img.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};