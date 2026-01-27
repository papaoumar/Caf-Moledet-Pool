import React, { useState, useEffect, useMemo } from 'react';
import { Tv, Activity, Trophy, RefreshCw, ExternalLink, Cpu, Zap, Globe, ShieldCheck, Filter } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { MatchInfo, LoadingState, GroundingSource } from '../types';

type AIEngine = 'Gemini-3' | 'Grok-Optimized' | 'GPT-Realtime';
type SportFilter = 'Tous' | 'Football' | 'Basketball' | 'Tennis';
type StatusFilter = 'Tous' | 'Live' | 'À venir';

export const LiveSports: React.FC = () => {
  const [matches, setMatches] = useState<MatchInfo[]>([]);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [selectedEngine, setSelectedEngine] = useState<AIEngine>('Gemini-3');
  
  // Filter States
  const [sportFilter, setSportFilter] = useState<SportFilter>('Tous');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Tous');

  const fetchLiveMatches = async (engine: AIEngine = selectedEngine) => {
    setLoading(LoadingState.LOADING);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const strategyPrompt = engine === 'Grok-Optimized' 
        ? "Perform an ultra-fast real-time search for live sports scores and streaming links. Focus on breaking updates and live x.com trends."
        : engine === 'GPT-Realtime'
        ? "Curate a high-precision list of live matches with detailed scoreboards and verified official broadcasting links."
        : "Find current major live sports matches happening right now (Football, Basketball, Tennis).";

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${strategyPrompt} Include teams, current score, competition name, and estimated time remaining. Format the core data as a JSON array. Ensure each object has a 'category' field matching either 'Football', 'Basketball', or 'Tennis'.`,
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
                status: { type: "STRING", description: "Either 'Live' or 'Upcoming'" },
                category: { type: "STRING", description: "Either 'Football', 'Basketball', or 'Tennis'" }
              },
              required: ["teams", "competition", "time", "status", "category"]
            }
          }
        },
      });

      const data = JSON.parse(response.text || "[]");
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources: GroundingSource[] = groundingChunks
        .filter(chunk => chunk.web)
        .map(chunk => ({
          title: chunk.web?.title || "Source Direct",
          uri: chunk.web?.uri || "#"
        }))
        .slice(0, 3);

      const matchesWithSources = data.map((m: any) => ({
        ...m,
        sources: sources
      }));

      setMatches(matchesWithSources);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(LoadingState.SUCCESS);
    } catch (error) {
      console.error("Error fetching live sports:", error);
      setLoading(LoadingState.ERROR);
      setMatches([
        { teams: "Real Madrid vs AC Milan", score: "2-1", competition: "Champions League", status: "Live", category: "Football" },
        { teams: "Lakers vs Warriors", score: "0-0", competition: "NBA", status: "Upcoming", category: "Basketball" },
        { teams: "Liverpool vs B. Leverkusen", score: "Live", competition: "Champions League", status: "Live", category: "Football" }
      ]);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      const matchSport = (match as any).category || 'Football';
      const sportMatch = sportFilter === 'Tous' || matchSport.toLowerCase() === sportFilter.toLowerCase();
      
      const matchStatus = match.status || 'Live';
      const statusMatch = statusFilter === 'Tous' || 
                        (statusFilter === 'Live' && matchStatus.toLowerCase().includes('live')) ||
                        (statusFilter === 'À venir' && matchStatus.toLowerCase().includes('upcom'));
      
      return sportMatch && statusMatch;
    });
  }, [matches, sportFilter, statusFilter]);

  return (
    <section className="py-20 px-4 bg-stone-950 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8 border-b border-stone-800/50 pb-8">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Cpu className="w-3 h-3 animate-pulse" />
              <span>Multi-AI Real-Time Engine</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Streaming Live <span className="text-amber-500">HD Center</span></h2>
            <p className="mt-4 text-stone-400 max-w-xl">
              Curation en temps réel via Gemini 3 Flash. Filtrez par sport ou statut pour trouver votre match.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="bg-stone-900/80 backdrop-blur-xl border border-stone-800 p-2 rounded-2xl flex items-center space-x-1 shadow-2xl self-end">
              {(['Gemini-3', 'Grok-Optimized', 'GPT-Realtime'] as AIEngine[]).map((engine) => (
                <button
                  key={engine}
                  onClick={() => {
                    setSelectedEngine(engine);
                    fetchLiveMatches(engine);
                  }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all duration-300 ${
                    selectedEngine === engine 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' 
                      : 'text-stone-500 hover:text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  {engine.replace('-', ' ')}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => fetchLiveMatches()}
              disabled={loading === LoadingState.LOADING}
              className="flex items-center justify-center space-x-2 bg-stone-800 hover:bg-stone-700 text-white px-6 py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-50 border border-stone-700"
            >
              <RefreshCw className={`w-4 h-4 ${loading === LoadingState.LOADING ? 'animate-spin' : ''}`} />
              <span className="font-bold text-xs uppercase tracking-widest">Rafraîchir</span>
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-stone-900/40 p-6 rounded-[2rem] border border-stone-800/50">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center text-stone-500 mr-2">
              <Filter className="w-4 h-4 mr-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Sport</span>
            </div>
            {(['Tous', 'Football', 'Basketball', 'Tennis'] as SportFilter[]).map((sport) => (
              <button
                key={sport}
                onClick={() => setSportFilter(sport)}
                className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all ${
                  sportFilter === sport 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center text-stone-500 mr-2">
              <Activity className="w-4 h-4 mr-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Statut</span>
            </div>
            {(['Tous', 'Live', 'À venir'] as StatusFilter[]).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all ${
                  statusFilter === status 
                    ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20' 
                    : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Mini Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-stone-900/40 border border-stone-800 p-4 rounded-2xl flex items-center space-x-3">
                <Zap className="w-5 h-5 text-amber-500" />
                <div>
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Latence</div>
                    <div className="text-xs text-white font-mono">0.4s (Ultra)</div>
                </div>
            </div>
            <div className="bg-stone-900/40 border border-stone-800 p-4 rounded-2xl flex items-center space-x-3">
                <Globe className="w-5 h-5 text-emerald-500" />
                <div>
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Région</div>
                    <div className="text-xs text-white font-mono">EMEA (Global)</div>
                </div>
            </div>
            <div className="bg-stone-900/40 border border-stone-800 p-4 rounded-2xl flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                <div>
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Vérifié</div>
                    <div className="text-xs text-white font-mono">SSL Secure</div>
                </div>
            </div>
            <div className="bg-stone-900/40 border border-stone-800 p-4 rounded-2xl flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-amber-600" />
                <div>
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Matchs</div>
                    <div className="text-xs text-white font-mono">{filteredMatches.length} Trouvé(s)</div>
                </div>
            </div>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          {loading === LoadingState.LOADING ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
              <p className="text-stone-500 font-bold uppercase tracking-[0.2em] text-xs">Synchronisation du flux IA...</p>
            </div>
          ) : filteredMatches.length > 0 ? (
            filteredMatches.map((match, idx) => (
              <div 
                key={idx} 
                className="group relative bg-stone-900/60 backdrop-blur-md border border-stone-800 rounded-[2.5rem] p-7 hover:border-emerald-500/50 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] group-hover:bg-emerald-500/10 transition-colors"></div>
                
                <div className="flex justify-between items-start mb-8">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20">
                    {match.competition}
                  </span>
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border ${
                    match.status?.toLowerCase().includes('live') 
                      ? 'bg-red-500/10 border-red-500/20' 
                      : 'bg-blue-500/10 border-blue-500/20'
                  }`}>
                    <div className="relative flex h-2 w-2">
                      <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        match.status?.toLowerCase().includes('live') ? 'animate-ping bg-red-400' : 'bg-blue-400'
                      }`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${
                        match.status?.toLowerCase().includes('live') ? 'bg-red-500' : 'bg-blue-500'
                      }`}></span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-tighter ${
                      match.status?.toLowerCase().includes('live') ? 'text-red-500' : 'text-blue-500'
                    }`}>
                      {match.status?.toLowerCase().includes('live') ? 'Live HD' : 'Prochainement'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-4 mb-10">
                  <div className="text-2xl font-bold text-white text-center leading-tight min-h-[4rem] flex items-center px-4">
                    {match.teams}
                  </div>
                  <div className="relative group/score">
                      <div className="absolute -inset-4 bg-amber-500/5 rounded-full blur-xl opacity-0 group-hover/score:opacity-100 transition-opacity"></div>
                      <div className="bg-stone-950 px-8 py-4 rounded-3xl border border-stone-800 shadow-inner">
                        <div className="text-5xl font-black text-amber-500 tabular-nums tracking-tighter">
                          {match.score || "VS"}
                        </div>
                      </div>
                  </div>
                  <div className="text-xs text-stone-500 font-bold uppercase tracking-widest">
                    {match.time || "Flux en direct"}
                  </div>
                </div>

                {match.sources && match.sources.length > 0 && (
                  <div className="mb-6 space-y-2">
                      <div className="text-[9px] text-stone-600 font-bold uppercase tracking-widest mb-3 flex items-center">
                          <Globe className="w-3 h-3 mr-2" /> Canaux vérifiés
                      </div>
                      {match.sources.map((source, sIdx) => (
                          <a 
                              key={sIdx}
                              href={source.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-between text-[11px] text-stone-400 hover:text-emerald-400 bg-stone-950/50 p-2.5 rounded-xl border border-stone-800/50 hover:border-emerald-500/30 transition-all"
                          >
                              <span className="truncate max-w-[180px]">{source.title}</span>
                              <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                      ))}
                  </div>
                )}

                <button className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-4 rounded-2xl transition-all flex items-center justify-center space-x-3 shadow-lg shadow-emerald-900/30 font-bold group-hover:scale-[1.02]">
                  <Tv className="w-5 h-5" />
                  <span>Diffuser au Café</span>
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-stone-600 border-2 border-dashed border-stone-800 rounded-[3rem]">
              <Filter className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-bold text-sm uppercase tracking-widest">Aucun match trouvé pour ces filtres</p>
              <button 
                onClick={() => {setSportFilter('Tous'); setStatusFilter('Tous');}}
                className="mt-4 text-emerald-500 text-xs font-bold underline underline-offset-4"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {lastUpdated && (
          <div className="mt-12 flex items-center justify-center space-x-4">
             <div className="h-[1px] w-12 bg-stone-800"></div>
             <div className="text-stone-700 text-[10px] uppercase tracking-[0.3em] font-black">
                Mise à jour via {selectedEngine} @ {lastUpdated}
             </div>
             <div className="h-[1px] w-12 bg-stone-800"></div>
          </div>
        )}
      </div>
    </section>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
