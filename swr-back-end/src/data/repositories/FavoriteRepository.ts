import { getDB } from '../../config/database';
import { FavoriteModel } from '../models/Favorite';
import { Favorite } from '../types';

export class FavoriteRepository {
  async findByUserId(userId: string): Promise<Favorite[]> {
    const db = getDB();
    const data = await db.collection(FavoriteModel.collectionName)
      .find({ userId })
      .toArray();
    return data.map(FavoriteModel.fromDB);
  }

  async findByUserIdWithHeroes(userId: string): Promise<any[]> {
    const db = getDB();
    const favorites = await db.collection(FavoriteModel.collectionName)
      .find({ userId })
      .toArray();
    
    const heroIds = favorites.map(f => f.heroId);
    const heroes = await db.collection('heroes')
      .find({ id: { $in: heroIds } })
      .toArray();
    
    return heroes;
  }

  async add(favorite: Favorite): Promise<void> {
    const db = getDB();
    await db.collection(FavoriteModel.collectionName).insertOne(FavoriteModel.toDB(favorite));
  }

  async remove(userId: string, heroId: number): Promise<void> {
    const db = getDB();
    await db.collection(FavoriteModel.collectionName).deleteOne({ userId, heroId });
  }

  async exists(userId: string, heroId: number): Promise<boolean> {
    const db = getDB();
    const count = await db.collection(FavoriteModel.collectionName).countDocuments({ userId, heroId });
    return count > 0;
  }
}

export default new FavoriteRepository();