import { CafeInfo, MatchInfo, MenuItem, CafeEvent } from './types';

export const MATCH_OF_THE_DAY: MatchInfo = {
  teams: "Real Madrid vs FC Barcelone",
  time: "21:00",
  competition: "La Liga - El Clásico"
};

export const MENU_ITEMS: MenuItem[] = [
  { name: "Mille-feuille Maison", description: "Pâtisserie traditionnelle à la crème vanille", price: "15 DH", category: "Crèmerie" },
  { name: "Jus Pulpy Frais", description: "Orange ou Citron avec pulpe fraîche", price: "12 DH", category: "Boissons" },
  { name: "Sandwich Molédét", description: "Poulet grillé, sauce maison et frites", price: "35 DH", category: "Sandwichs" },
  { name: "Petit Déjeuner Complet", description: "Café, jus, tartines et viennoiseries", price: "25 DH", category: "Spécialités" },
  { name: "Espresso Premium", description: "Mélange italien corsé", price: "10 DH", category: "Boissons" },
  { name: "Gâteau Chocolat", description: "Moelleux au coeur fondant", price: "18 DH", category: "Crèmerie" }
];

export const EVENTS: CafeEvent[] = [
  { id: '1', title: "Tournoi Billard 8-Ball", date: "Dimanche 15 Février", description: "Grand tournoi amateur avec prix à gagner.", type: "Tournament" },
  { id: '2', title: "Diffusion Finale LDC", date: "Samedi 31 Mai", description: "Ambiance stade garantie sur écrans HD.", type: "Sporting" }
];

export const CAFE_DATA: CafeInfo = {
  name: "Café Molédét Pool",
  address: "PRÈS DE L'ÉCOLE ROYALE DE L'ARTILLERIE, Fès 30050",
  phone: "0637-804385",
  hours: "Ouvert tous les jours ⋅ 07:00 – 23:00",
  services: [
    "Retransmission Sportive HD",
    "Billard Professionnel",
    "Wi-Fi Fibre Optique",
    "Crèmerie & Sandwicherie",
    "Terrasse Illuminée",
    "Espace Climatisé"
  ],
  description: "L'élégance du billard et la passion du sport. Situé à Fès, le Café Molédét Pool vous accueille dans un cadre unique mêlant tradition et modernité."
};

export const GALLERY_IMAGES = [
  { url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000", title: "Ambiance Intérieure" },
  { url: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1000", title: "Espace Billard" },
  { url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1000", title: "La Terrasse" },
  { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000", title: "Nos Cafés" },
  { url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000", title: "Pâtisseries Maison" },
  { url: "https://images.unsplash.com/photo-1621230182918-85aa9e39405d?q=80&w=1000", title: "Snacks & Jus" }
];

export const SYSTEM_INSTRUCTION = `
You are the virtual assistant for "${CAFE_DATA.name}", a cafe located in Fès, Morocco.
Your goal is to answer customer questions helpfully and politely in French (primary) or English.

Specific details from photos:
- The interior features elegant green paneled walls with artistic decorations.
- We have a professional billiard (pool) table.
- We serve coffee, tea, fresh juices (Pulpy), pastries (Mille-feuille style), and sandwiches.
- There is a "Crèmerie" section.
- The terrace has a cozy atmosphere with red accent lighting at night.
- Landmark: Near the Royal Artillery School (École Royale de l'Artillerie).

Rules:
1. Be enthusiastic about the Billiards and the sports atmosphere.
2. Mention our "Crèmerie" and "Sandwicherie" when asked about food.
3. If users ask about events, mention the Billiard Tournament or match diffusions.
4. Keep answers concise and welcoming.
`;