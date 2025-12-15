import React from 'react';
import { Hero } from './components/Hero';
import { InfoCards } from './components/InfoCards';
import { ChatWidget } from './components/ChatWidget';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Hero />
      <main className="flex-grow">
        <InfoCards />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;