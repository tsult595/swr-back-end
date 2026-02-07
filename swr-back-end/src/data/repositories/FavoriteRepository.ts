import { getDB } from '../../config/database';
import { FAVORITE_COLLECTION, favoriteFromDB, favoriteToDB } from '../models/Favorite';
import { Favorite } from '../types';
import { Character } from '../types';
import { heroFromDB } from '../models/Hero';
export async function findFavoritesByUserId(userId: string): Promise<Favorite[]> {
  const db = getDB();
  const data = await db.collection(FAVORITE_COLLECTION).find({ userId }).toArray();
  return data.map(favoriteFromDB);
}

export async function findFavoritesByUserIdWithHeroes(userId: string): Promise<Character[]> {
  const db = getDB();
  const favorites = await db.collection(FAVORITE_COLLECTION).find({ userId }).toArray();
  const heroIds = favorites.map(f => f.heroId);
  const heroes = await db.collection('heroes').find({ id: { $in: heroIds } }).toArray();
  return heroes.map(heroFromDB);
}

export async function addFavorite(favorite: Favorite): Promise<void> {
  const db = getDB();
  await db.collection(FAVORITE_COLLECTION).insertOne(favoriteToDB(favorite));
}

export async function removeFavorite(userId: string, heroId: number): Promise<void> {
  const db = getDB();
  await db.collection(FAVORITE_COLLECTION).deleteOne({ userId, heroId });
}

export async function favoriteExists(userId: string, heroId: number): Promise<boolean> {
  const db = getDB();
  const count = await db.collection(FAVORITE_COLLECTION).countDocuments({ userId, heroId });
  return count > 0;
}