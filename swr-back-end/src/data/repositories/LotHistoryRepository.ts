import { getDB } from '../../config/database';
import { LotHistoryModel } from '../models/LotHistory';
import { LotHistory } from '../types';

export class LotHistoryRepository {
  async findByHeroId(heroId: number): Promise<LotHistory[]> {
    const db = getDB();
    const data = await db.collection(LotHistoryModel.collectionName)
      .find({ heroId })
      .sort({ date: -1 })
      .toArray();
    return data.map(LotHistoryModel.fromDB);
  }

  async create(history: LotHistory): Promise<void> {
    const db = getDB();
    await db.collection(LotHistoryModel.collectionName).insertOne(LotHistoryModel.toDB(history));
  }
}

export default new LotHistoryRepository();