import { LotHistory } from '../types';
import { WithId, Document } from 'mongodb';
export const LOT_HISTORY_COLLECTION = 'lot_history';

export function lotHistoryFromDB(data: WithId<Document>): LotHistory {
  return {
    id: data.id,
    heroId: data.heroId,
    type: data.type,
    from: data.from,
    to: data.to,
    price: data.price,
    date: data.date
  };
}

export function lotHistoryToDB(history: LotHistory): Document {
  return { ...history };
}