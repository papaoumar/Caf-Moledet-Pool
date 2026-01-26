import React, { useState, useEffect } from 'react';
import { Tv, Activity, Trophy, RefreshCw, ExternalLink, Play } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { MatchInfo, LoadingState } from '../types';

export const LiveSports: React.FC = () => {
  const [matches, setMatches] = useState<MatchInfo[]>([]);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchLiveMatches = async () => {
    setLoading(LoadingState.LOADING);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Find current major live sports matches happening right now (Football, Basketball, Tennis) including teams, current score (if available), competition name, and time. Format as a list.",
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                teams: { type: "STRING" },
                score: { type: "STRING" },
                competition: { type: "STRING" },
                time: { type: "STRING" },
                status: { type: "STRING" }
              },
              required: ["teams", "competition", "time"]
            }
          }
        },
      });

      const data = JSON.parse(response.text || "[]");
      setMatches(data);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(LoadingState.SUCCESS);
    } catch (error) {
      console.error("Error fetching live sports:", error);
      setLoading(LoadingState.ERROR);
      // Fallback data if search fails or is unavailable
      setMatches([
        { teams: "Real Madrid vs AC Milan", score: "Live", competition: "Champions League", status: "Direct" },
        { teams: "Liverpool vs Bayer Leverkusen", score: "Live", competition: "Champions League", status: "Direct" }
      ]);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  return (
    <section className="py-20 px-4 bg-stone-900 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
              <Activity className="w-3 h-3" />
              <span>Direct HD 1080p</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Streaming Sport Temps Réel</h2>
            <p className="mt-4 text-stone-400 max-w-xl">
              Suivez les plus grandes compétitions mondiales sur nos écrans géants HD au Café Molédét.
            </p>
          </div>
          
          <button 
            onClick={fetchLiveMatches}
            disabled={loading === LoadingState.LOADING}
            className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-emerald-900/20"
          >
            <RefreshCw className={`w-4 h-4 ${loading === LoadingState.LOADING ? 'animate-spin' : ''}`} />
            <span className="font-bold text-sm">Actualiser les scores</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, idx) => (
            <div 
              key={idx} 
              className="bg-stone-800/40 backdrop-blur-md border border-stone-700/50 rounded-[2rem] p-6 hover:border-emerald-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/30 transition-all duration-300 group cursor-default"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
                  {match.competition}
                </span>
                <div className="flex items-center space-x-2 bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </div>
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter">Live</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 mb-8">
                <div className="text-xl font-bold text-white text-center line-clamp-2 min-h-[3.5rem] flex items-center">
                  {match.teams}
                </div>
                <div className="bg-stone-900/50 px-6 py-3 rounded-2xl border border-stone-700/50">
                  <div className="text-4xl font-black text-amber-500 tabular-nums tracking-tighter drop-shadow-sm">
                    {match.score || "VS"}
                  </div>
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  {match.time || "Match en cours"}
                </div>
              </div>

              <button className="w-full bg-stone-700/30 hover:bg-emerald-700 text-white py-3.5 rounded-2xl transition-all flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-emerald-900/40 border border-stone-600/50 hover:border-emerald-500">
                <Tv className="w-4 h-4" />
                <span className="text-sm font-bold">Réserver au Café</span>
              </button>
            </div>
          ))}

          {/* Special "Coming Up" Card */}
          <div className="bg-gradient-to-br from-emerald-900/80 to-emerald-950 rounded-[2rem] p-6 border border-emerald-800/50 flex flex-col justify-between group cursor-pointer hover:shadow-2xl hover:shadow-emerald-900/40 transition-all duration-300 hover:-translate-y-2">
            <div>
              <div className="bg-amber-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Prochaines Affiches</h3>
              <p className="text-emerald-100/60 text-sm leading-relaxed">Ne manquez aucun événement majeur. Nous diffusons la Champions League, La Liga et la Premier League en 4K.</p>
            </div>
            <div className="mt-8 flex items-center text-amber-500 font-bold text-sm group-hover:translate-x-1 transition-transform bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
              <span>Voir le programme</span>
              <ExternalLink className="w-4 h-4 ml-auto" />
            </div>
          </div>
        </div>

        {lastUpdated && (
          <div className="mt-10 text-center flex items-center justify-center space-x-2 text-stone-600 text-[10px] uppercase tracking-[0.2em] font-bold">
            <span className="w-1 h-1 bg-stone-700 rounded-full"></span>
            <span>Flux mis à jour à {lastUpdated}</span>
            <span className="w-1 h-1 bg-stone-700 rounded-full"></span>
          </div>
        )}
      </div>
    </section>
  );
};