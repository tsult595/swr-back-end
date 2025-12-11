import { LotHistory } from '../types';

export class LotHistoryModel {
  static collectionName = 'lot_history';

  static fromDB(data: any): LotHistory {
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

  static toDB(history: LotHistory): any {
    return { ...history };
  }
}