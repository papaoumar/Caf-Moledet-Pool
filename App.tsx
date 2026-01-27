import React from 'react';
import { Hero } from './components/Hero';
import { InfoCards } from './components/InfoCards';
import { LiveSports } from './components/LiveSports';
import { Menu } from './components/Menu';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { ChatWidget } from './components/ChatWidget';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Hero />
      <main className="flex-grow">
        <LiveSports />
        <Menu />
        <InfoCards />
        <Events />
        <Gallery />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;