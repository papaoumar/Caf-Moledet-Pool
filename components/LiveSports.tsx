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
            className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading === LoadingState.LOADING ? 'animate-spin' : ''}`} />
            <span className="font-bold text-sm">Actualiser les scores</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, idx) => (
            <div key={idx} className="bg-stone-800/50 backdrop-blur-sm border border-stone-700 rounded-3xl p-6 hover:border-emerald-500/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded">
                  {match.competition}
                </span>
                <div className="flex items-center space-x-1 text-red-500">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                  <span className="text-[10px] font-bold uppercase">Live</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 mb-8">
                <div className="text-xl font-bold text-white text-center line-clamp-2">
                  {match.teams}
                </div>
                <div className="text-4xl font-black text-amber-500 tabular-nums tracking-tighter">
                  {match.score || "VS"}
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  {match.time || "En cours"}
                </div>
              </div>

              <button className="w-full bg-stone-700/50 hover:bg-emerald-700 text-white py-3 rounded-xl transition-all flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-emerald-900/20">
                <Tv className="w-4 h-4" />
                <span className="text-sm font-bold">Voir au Café</span>
              </button>
            </div>
          ))}

          {/* Special "Coming Up" Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl p-6 border border-emerald-800 flex flex-col justify-between group cursor-pointer">
            <div>
              <Trophy className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Prochaines Affiches</h3>
              <p className="text-emerald-100/60 text-sm">Ne manquez aucun événement majeur. Nous diffusons tous les matchs de Champions League, La Liga et Premier League.</p>
            </div>
            <div className="mt-8 flex items-center text-amber-500 font-bold text-sm group-hover:translate-x-1 transition-transform">
              <span>Consulter le programme complet</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>

        {lastUpdated && (
          <div className="mt-8 text-center text-stone-600 text-[10px] uppercase tracking-widest font-bold">
            Dernière mise à jour : {lastUpdated}
          </div>
        )}
      </div>
    </section>
  );
};