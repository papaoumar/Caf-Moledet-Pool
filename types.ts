export interface CafeInfo {
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  description: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface MatchInfo {
  teams: string;
  time: string;
  competition: string;
  status?: string;
  score?: string;
  sources?: GroundingSource[];
}

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: 'Crèmerie' | 'Sandwichs' | 'Boissons' | 'Spécialités';
  image?: string;
}

export interface CafeEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'Tournament' | 'Sporting' | 'Live';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  timestamp?: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}