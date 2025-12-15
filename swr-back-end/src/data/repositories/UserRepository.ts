import { getDB } from '../../config/database';
import { USER_COLLECTION, userFromDB, userToDB } from '../models/User';
import { UserType } from '../types';

export async function findUserById(id: string): Promise<UserType | null> {
  const db = getDB();
  const data = await db.collection(USER_COLLECTION).findOne({ id });
  return data ? userFromDB(data) : null;
}

export async function createUser(user: UserType): Promise<UserType> {
  const db = getDB();
  await db.collection(USER_COLLECTION).insertOne(userToDB(user));
  return user;
}