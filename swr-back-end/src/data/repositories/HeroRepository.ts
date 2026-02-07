import { getDB } from '../../config/database';
import { HERO_COLLECTION, heroFromDB } from '../models/Hero';
import { Character } from '../types';

export async function findAllHeroes(): Promise<Character[]> {
  const db = getDB();
  const data = await db.collection(HERO_COLLECTION).find().toArray();
  return data.map(heroFromDB);
}

export async function findHeroById(id: number): Promise<Character | null> {
  const db = getDB();
  const data = await db.collection(HERO_COLLECTION).findOne({ id });
  return data ? heroFromDB(data) : null;
}

export async function findHeroesByStatus(status: string): Promise<Character[]> {
  const db = getDB();
  const data = await db.collection(HERO_COLLECTION).find({ status }).toArray();
  return data.map(heroFromDB);
}