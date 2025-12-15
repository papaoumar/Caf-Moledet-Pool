import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, Trash2 } from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage, LoadingState } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Dynamic welcome message based on time of day
  const getWelcomeMessage = (): ChatMessage => {
    const hour = new Date().getHours();
    let text = "";

    if (hour >= 5 && hour < 12) {
      text = "Bonjour ! ☕ Un bon café pour bien démarrer la journée ? Je suis l'assistant du Café Moledet Pool. Comment puis-je vous aider ?";
    } else if (hour >= 12 && hour < 18) {
      text = "Bon après-midi ! ☀️ Envie d'une pause détente ou de suivre un match ? Je suis là pour vous renseigner.";
    } else {
      text = "Bonsoir ! 🎱 La soirée s'annonce belle au Café Moledet Pool. Une question sur nos services ou nos horaires ?";
    }

    return {
      id: 'welcome',
      role: 'model',
      text: text
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getWelcomeMessage()]);
  const [inputValue, setInputValue] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const startNewSession = () => {
    if (!process.env.API_KEY) {
      console.error("API_KEY is missing!");
      return;
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSessionRef.current = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  };

  // Initialize Gemini Chat Session on mount
  useEffect(() => {
    startNewSession();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleClearChat = () => {
    setMessages([getWelcomeMessage()]);
    startNewSession();
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || !chatSessionRef.current) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setLoadingState(LoadingState.LOADING);

    try {
      // Send to Gemini
      const response: GenerateContentResponse = await chatSessionRef.current.sendMessage({
        message: userText
      });
      
      const modelText = response.text || "Désolé, je n'ai pas compris.";
      
      const newModelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: modelText
      };

      setMessages(prev => [...prev, newModelMsg]);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        isError: true
      }]);
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500/50 ${
          isOpen ? 'bg-stone-800 rotate-90' : 'bg-amber-700 hover:bg-amber-800'
        }`}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir l'assistant virtuel"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" aria-hidden="true" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" aria-hidden="true" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-40 w-full max-w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-fade-in-up"
          role="dialog"
          aria-label="Assistant virtuel Café Moledet"
        >
          {/* Header */}
          <div className="bg-stone-900 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-stone-600 flex-shrink-0">
                <img 
                  src="https://img.freepik.com/premium-vector/billiard-pool-logo-vector-design_255554-150.jpg" 
                  alt="Logo Café Moledet Pool" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Assistant Moledet</h3>
                <p className="text-xs text-stone-400">En ligne</p>
              </div>
            </div>
            <button 
              onClick={handleClearChat}
              className="text-stone-400 hover:text-white transition-colors p-2 rounded-full hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              title="Effacer l'historique"
              aria-label="Effacer l'historique de la conversation"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-4 scrollbar-hide"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            tabIndex={0}
            aria-label="Historique des messages"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-amber-700 text-white rounded-br-none'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-sm'
                  } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loadingState === LoadingState.LOADING && (
              <div className="flex justify-start w-full">
                 <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-stone-200 shadow-sm flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 text-amber-700 animate-spin" aria-hidden="true" />
                    <span className="text-xs text-stone-500">En train d'écrire...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-stone-100 flex items-center space-x-2">
            <label htmlFor="chat-input" className="sr-only">Votre message</label>
            <input
              id="chat-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Posez une question..."
              className="flex-1 bg-stone-100 border-0 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-700 focus:outline-none text-stone-800 placeholder-stone-500"
              disabled={loadingState === LoadingState.LOADING}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || loadingState === LoadingState.LOADING}
              className="p-2.5 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-700"
              aria-label="Envoyer le message"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};