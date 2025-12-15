export interface CafeInfo {
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  description: string;
}

export interface MatchInfo {
  teams: string;
  time: string;
  competition: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}