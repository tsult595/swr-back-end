import { Item } from '../types';
import { WithId, Document } from 'mongodb';

export const ITEM_COLLECTION = 'items';

export function itemFromDB(data: WithId<Document>): Item {
  return {
    id: data.id,
    ownerId: data.ownerId,
    name: data.name,
    description: data.description,
    rarity: data.rarity
  };
}

export function itemToDB(item: Item): Document {
  return { ...item };
}