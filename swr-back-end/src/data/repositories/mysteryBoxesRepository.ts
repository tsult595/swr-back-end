import { getDB } from '../../config/database';
import { MYSTERY_BOX_COLLECTION, mysteryBoxFromDB } from '../models/MysteryBox';
import { MysteryBox } from '../types';


export async function findAllMysteryBoxes(): Promise<MysteryBox[]> {
  const db = getDB();
  const data = await db.collection(MYSTERY_BOX_COLLECTION).find().toArray();
  return data.map(mysteryBoxFromDB);
}

export async function findMysteryBoxById(id: number): Promise<MysteryBox | null> {
  const db = getDB();
  const data = await db.collection(MYSTERY_BOX_COLLECTION).findOne({ id });
  return data ? mysteryBoxFromDB(data) : null;
}

export async function findMysteryBoxesByOwnerId(ownerId: string): Promise<MysteryBox[]> { 
  const db = getDB();
  const data = await db.collection(MYSTERY_BOX_COLLECTION).find({ ownerId }).toArray();
  return data.map(mysteryBoxFromDB);
}

export async function buyMysteryBox(userId: string, boxId: number): Promise<void> {
  const db = getDB();
  await db.collection(MYSTERY_BOX_COLLECTION).updateOne(
    { id: boxId },
    { $set: { ownerId: userId } }
  );
}


export async function deleteMysteryBox(boxId: number, userId: string): Promise<void> {
  const db = getDB();
  await db.collection(MYSTERY_BOX_COLLECTION).updateOne(
    { id: boxId, ownerId: userId },
    { $set: { ownerId: null } }
  );
}