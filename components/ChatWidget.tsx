import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, AlertCircle, Trash2, Sparkles } from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage, LoadingState } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  
  const suggestions = [
    "Quel est le menu ?",
    "Horaires du billard",
    "Matchs ce soir ?",
    "Où êtes-vous ?"
  ];

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
      text: text,
      timestamp: Date.now()
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getWelcomeMessage()]);
  const [inputValue, setInputValue] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const startNewSession = () => {
    if (!process.env.API_KEY) {
      setApiKeyMissing(true);
      return;
    }
    
    setApiKeyMissing(false);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSessionRef.current = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  };

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

  const handleSendMessage = async (text?: string) => {
    const messageToSend = text || inputValue.trim();
    if (!messageToSend || apiKeyMissing) return;

    if (!chatSessionRef.current && process.env.API_KEY) {
        startNewSession();
    }
    
    if (!chatSessionRef.current) return;

    if (!text) setInputValue('');
    
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: messageToSend,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setLoadingState(LoadingState.LOADING);

    try {
      const response: GenerateContentResponse = await chatSessionRef.current.sendMessage({
        message: messageToSend
      });
      
      const modelText = response.text || "Désolé, je n'ai pas compris.";
      
      const newModelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: modelText,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, newModelMsg]);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Désolé, une erreur technique est survenue.",
        isError: true,
        timestamp: Date.now()
      }]);
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-500/50 ${
          isOpen ? 'bg-stone-900 rotate-90' : 'bg-emerald-800 hover:bg-emerald-900'
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-full max-w-[380px] h-[600px] bg-white rounded-[2rem] shadow-[0_30px_90px_rgba(0,0,0,0.2)] border border-stone-200 flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-emerald-950 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white border-2 border-emerald-500 flex-shrink-0">
                <img 
                  src="https://img.freepik.com/premium-vector/billiard-pool-logo-vector-design_255554-150.jpg" 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-black text-white text-sm tracking-tight">AI Assistant</h3>
                <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-emerald-100/60 font-bold uppercase tracking-widest">En ligne</span>
                </div>
              </div>
            </div>
            <button onClick={handleClearChat} className="text-white/40 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-stone-50 space-y-6 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed ${
                  msg.role === 'user' ? 'bg-emerald-800 text-white rounded-tr-none shadow-lg' : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-sm'
                } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}>
                  {msg.text}
                </div>
                <span className={`text-[10px] text-stone-400 mt-2 font-bold uppercase tracking-widest ${msg.role === 'user' ? 'mr-1' : 'ml-1'}`}>
                  {new Date(msg.timestamp || 0).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {loadingState === LoadingState.LOADING && (
              <div className="flex items-center space-x-2 text-stone-400">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-800" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Réflexion IA...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-stone-100">
            {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {suggestions.map(s => (
                        <button 
                            key={s} 
                            onClick={() => handleSendMessage(s)}
                            className="text-[10px] font-bold bg-stone-100 text-stone-600 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-800 transition-all flex items-center space-x-1"
                        >
                            <Sparkles className="w-3 h-3" />
                            <span>{s}</span>
                        </button>
                    ))}
                </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Écrivez ici..."
                className="flex-1 bg-stone-100 border-0 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none text-stone-800"
                disabled={loadingState === LoadingState.LOADING || apiKeyMissing}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || loadingState === LoadingState.LOADING || apiKeyMissing}
                className="p-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 rounded-2xl text-white transition-all shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};