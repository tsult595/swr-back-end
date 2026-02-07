import { getDB } from '../../config/database';
import { Collection, ObjectId } from 'mongodb';
import type { ClanDocument , UserType } from '../types';

export async function addUserToClan(clanId: string, userId: string) {
  const db = getDB();
  const clansCollection: Collection<ClanDocument> = db.collection('clans');
  const usersCollection: Collection<UserType> = db.collection('users');

  // Добавить пользователя в массив members клана
  await clansCollection.updateOne(
    { _id: new ObjectId(clanId) },
    { $addToSet: { members: userId } }
  );

  // Добавить clanId в массив clans пользователя
  await usersCollection.updateOne(
    { id: userId },
    { $addToSet: { clans: clanId } }
  );

  return { success: true };
}


export async function getClansByUserId(userId: string) {
  const db = getDB();
  // Найти пользователя и получить его clans
  const user = await db.collection('users').findOne({ id: userId });
  if (!user || !user.clans) return [];
  // Найти кланы по id из массива clans
  return db.collection('clans').find({ _id: { $in: user.clans.map((id: string) => new ObjectId(id)) } }).toArray();
}

export async function createClan(name: string, members: string[], ownerId: string) {
  const db = getDB();
  const result = await db.collection('clans').insertOne({ name, members, ownerId });
  const clanId = result.insertedId.toString();

  await db.collection('users').updateMany(
    { id: { $in: members } },
    { $addToSet: { clans: clanId } }
  );

  return { id: clanId, name, members, ownerId };
}

export async function removeUserFromClan(clanId: string, userId: string) {
  const db = getDB();

  const clansCollection: Collection<ClanDocument> = db.collection('clans');
  const usersCollection: Collection<UserType> = db.collection('users');


  await clansCollection.updateOne(
    { _id: new ObjectId(clanId) },
    { $pull: { members: userId } }   
  );


  await usersCollection.updateOne(
    { id: userId },
    { $pull: { clans: clanId } }
  );

  return { success: true };
}

export async function deleteClan(clanId: string): Promise<void> {
  const db = getDB();
  // Удалить клан из коллекции кланов
  await db.collection('clans').deleteOne({ _id: new ObjectId(clanId) });
  // Удалить clanId из массива clans у всех пользователей
    
  const usersCollection: Collection<UserType> = db.collection('users');
  await usersCollection.updateMany(
    { clans: clanId },
    { $pull: { clans: clanId } }
  );
}

export async function getClanById(clanId: string) {
  const db = getDB();
  return await db.collection('clans').findOne({ _id: new ObjectId(clanId) });
}

export async function getAllClans() {
  const db = getDB();
  return await db.collection('clans').find({}).toArray();
}