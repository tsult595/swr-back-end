import { ObjectId } from 'mongodb';

export interface Character {
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
  isLiked?: boolean;
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
  clanId?: string;
  clanName?: string; 
}

export type UserType = {
  id: string;
  nickname?: string;
  clans: string[]; 
  companions?: string[];
  createdAt?: string;
  email?: string;
  emailVerified?: boolean; 
  verificationToken?: string;
  tokenExpires?: Date;
};

export type ClanDocument = {
  id: string;
  _id?: ObjectId; 
  name: string;
  members: string[];
  ownerId: string;
};

export type Item = {
  id: number;
  ownerId: string;
  name: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
};

export type MysteryBox = {
  id: number;
  name: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Middle' | 'High';
  price: number;
  image: string;
};