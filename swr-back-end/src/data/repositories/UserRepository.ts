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

export async function findUserByEmail(email: string): Promise<UserType | null> {
  const db = getDB();
  const data = await db.collection(USER_COLLECTION).findOne({ email });
  return data ? userFromDB(data) : null;
}

export async function findUserByVerificationToken(token: string): Promise<UserType | null> {
  const db = getDB();
  const data = await db.collection(USER_COLLECTION).findOne({ verificationToken: token });
  return data ? userFromDB(data) : null;
}

export async function updateUser(id: string, updates: Partial<UserType>): Promise<void> {
  const db = getDB();
  await db.collection(USER_COLLECTION).updateOne({ id }, { $set: updates });
}

export async function findAllUsers(): Promise<UserType[]> {
  const db = getDB();
  const data = await db.collection(USER_COLLECTION).find({}).toArray();
  return data.map(userFromDB);
}