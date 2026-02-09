import { MysteryBox } from "../types";
export const MYSTERY_BOX_COLLECTION = 'mystery_boxes';

import { WithId, Document } from 'mongodb';


export function mysteryBoxFromDB(data: WithId<Document>): MysteryBox {
  return {
    id: data.id,
    ownerId: data.ownerId,
    name: data.name,
    description: data.description,
    rarity: data.rarity,
    price: data.price,
    image: data.image
  };
}