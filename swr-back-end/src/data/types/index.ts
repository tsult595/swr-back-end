export interface Hero {
  id: number;
  name: string;
  fileName: string;
  rarity: 'Common' | 'Middle' | 'High';
  level: number;
  price: number;
  bid: number;
  status: 'Active' | 'Cancelled';
  highestBidder?: string;
  yourBid?: number;
  wins?: number;
  loses?: number;
  creator?: string;
  createDate?: string;
}

export interface LotHistory {
  id: number;
  heroId: number;
  type: string;
  from: string;
  to: string;
  price: number;
  date: string;
}

export interface Favorite {
  userId: string;
  heroId: number;
  addedAt: Date;
}

export interface Message {
  id?: string;
  username: string;
  userId: string;
  text: string;
   type: 'normal' | 'private' | 'clanChat';
  recipientId?: string;
  timestamp: string;
}

export type UserType = {
  id: string;
  nickname?: string;
  clans?: string[]; 
  companions?: string[];
  createdAt?: string; 
};

