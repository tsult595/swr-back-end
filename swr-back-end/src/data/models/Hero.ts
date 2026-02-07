import { Character } from '../types';
import { WithId, Document } from 'mongodb';
export const HERO_COLLECTION = 'heroes';

export function heroFromDB(data: WithId<Document>): Character {
  return {
    id: data.id,
    name: data.name,
    fileName: data.fileName,
    rarity: data.rarity,
    level: data.level,
    price: data.price,
    bid: data.bid,
    status: data.status,
    ...(typeof data.isLiked === 'boolean' ? { isLiked: data.isLiked } : {})
  };
}

export function heroToDB(hero: Character): Document {
  return { ...hero };
}