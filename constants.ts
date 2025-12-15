import { CafeInfo, MatchInfo } from './types';

export const MATCH_OF_THE_DAY: MatchInfo = {
  teams: "Real Madrid vs FC Barcelone",
  time: "21:00",
  competition: "La Liga - El Clásico"
};

export const CAFE_DATA: CafeInfo = {
  name: "Café Moledet Pool",
  address: "PRÈS DE L'ÉCOLE ROYALE DE L'ARTILLERIE, Fès 30050",
  phone: "0637-804385",
  hours: "Ouvert tous les jours ⋅ Ferme à 23:00",
  services: [
    "Convient pour regarder du sport",
    "Wi-Fi Gratuit",
    "Chaises hautes disponibles",
    "Ambiance familiale",
    "Terrasse"
  ],
  description: "Détendez-vous au cœur de Fès. Profitez de nos matchs en direct, d'une connexion Wi-Fi rapide et d'un service chaleureux."
};

export const SYSTEM_INSTRUCTION = `
You are the virtual assistant for "${CAFE_DATA.name}", a cafe located in Fès, Morocco.
Your goal is to answer customer questions helpfully and politely in French (primary) or English (if the user speaks English).

Here are the details you know:
- Name: ${CAFE_DATA.name}
- Address: ${CAFE_DATA.address} (Near the Royal Artillery School)
- Phone: ${CAFE_DATA.phone}
- Opening Hours: ${CAFE_DATA.hours}
- Services: Suitable for watching sports matches (football, etc.), Free Wi-Fi, High chairs for children.
- Atmosphere: Friendly, local, good coffee and beverages.
- MATCH DU JOUR (TODAY'S MATCH): ${MATCH_OF_THE_DAY.teams} (${MATCH_OF_THE_DAY.competition}) at ${MATCH_OF_THE_DAY.time}. If a user asks about sports, matches, or what's happening today, mention this match enthusiastically!

Rules:
1. Keep answers concise and friendly.
2. If asked about the menu, say you don't have the specific daily menu but offer general cafe items like coffee, tea, juices, and snacks.
3. If asked about location, provide the address and mention the landmark (Royal Artillery School).
4. Always be polite.
`;