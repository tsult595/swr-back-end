import { getDB } from '../../config/database';
import { ITEM_COLLECTION, itemFromDB } from '../models/Item';
import { Item } from '../types';

export async function findAllItems(): Promise<Item[]> {
  const db = getDB();
  const data = await db.collection(ITEM_COLLECTION).find().toArray();
  return data.map(itemFromDB);
}

export async function findItemById(id: number): Promise<Item | null> {
  const db = getDB();
  const data = await db.collection(ITEM_COLLECTION).findOne({ id });
  return data ? itemFromDB(data) : null;
}

export async function findItemsByRarity(rarity: string): Promise<Item[]> {
  const db = getDB();
  const data = await db.collection(ITEM_COLLECTION).find({ rarity }).toArray();
  return data.map(itemFromDB);
}

export async function buyItem(userId: string, itemId: number): Promise<void> {
  const db = getDB();
  await db.collection(ITEM_COLLECTION).updateOne(
    { id: itemId },
    { $set: { ownerId: userId } }
  );
}

export async function findItemsByOwnerId(ownerId: string): Promise<Item[]> {
  const db = getDB();
  const data = await db.collection(ITEM_COLLECTION).find({ ownerId }).toArray();
  return data.map(itemFromDB);
}

export async function deleteItem(itemId: number, userId: string): Promise<void> {
  const db = getDB();
  await db.collection(ITEM_COLLECTION).updateOne(
    { id: itemId, ownerId: userId },
    { $set: { ownerId: null } }
  );
}