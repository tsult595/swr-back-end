import { getDB } from '../../config/database';
import { LOT_HISTORY_COLLECTION, lotHistoryFromDB, lotHistoryToDB } from '../models/LotHistory';
import { LotHistory } from '../types';

export async function findLotHistoryByHeroId(heroId: number): Promise<LotHistory[]> {
  const db = getDB();
  const data = await db.collection(LOT_HISTORY_COLLECTION)
    .find({ heroId })
    .sort({ date: -1 })
    .toArray();
  return data.map(lotHistoryFromDB);
}

export async function createLotHistory(history: LotHistory): Promise<void> {
  const db = getDB();
  await db.collection(LOT_HISTORY_COLLECTION).insertOne(lotHistoryToDB(history));
}