import { Hero } from '../types';
import { WithId, Document } from 'mongodb';
export const HERO_COLLECTION = 'heroes';

export function heroFromDB(data: WithId<Document>): Hero {
  return {
    id: data.id,
    name: data.name,
    fileName: data.fileName,
    rarity: data.rarity,
    level: data.level,
    price: data.price,
    bid: data.bid,
    status: data.status
  };
}

export function heroToDB(hero: Hero): Document {
  return { ...hero };
}