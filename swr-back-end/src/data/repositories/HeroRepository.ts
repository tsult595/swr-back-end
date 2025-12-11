import { getDB } from '../../config/database';
import { HeroModel } from '../models/Hero';
import { Hero } from '../types';

export class HeroRepository {
  async findAll(): Promise<Hero[]> {
    const db = getDB();
    const data = await db.collection(HeroModel.collectionName).find().toArray();
    return data.map(HeroModel.fromDB);
  }

  async findById(id: number): Promise<Hero | null> {
    const db = getDB();
    const data = await db.collection(HeroModel.collectionName).findOne({ id });
    return data ? HeroModel.fromDB(data) : null;
  }

  async findByStatus(status: string): Promise<Hero[]> {
    const db = getDB();
    const data = await db.collection(HeroModel.collectionName).find({ status }).toArray();
    return data.map(HeroModel.fromDB);
  }
}

export default new HeroRepository();