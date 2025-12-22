export async function findMessages(limit: number = 50): Promise<Message[]> {
  const db = getDB();
  const data = await db.collection(MESSAGE_COLLECTION)
    .find({})
    .sort({ timestamp: 1 })
    .limit(limit)
    .toArray();
  return data.map(messageFromDB);
}
import { getDB } from '../../config/database';
import { MESSAGE_COLLECTION, messageFromDB, messageToDB } from '../models/MessageModel';
import { Message } from '../types';

export async function findMessagesByChannel(channel: string, limit: number = 50): Promise<Message[]> {
  const db = getDB();
  const data = await db.collection(MESSAGE_COLLECTION)
    .find({ channel })
    .sort({ timestamp: 1 })
    .limit(limit)
    .toArray();
  return data.map(messageFromDB);
}

export async function createMessage(message: Omit<Message, 'id'>): Promise<Message> {
  const db = getDB();
  const result = await db.collection(MESSAGE_COLLECTION).insertOne(messageToDB(message));
  const newMessage = await db.collection(MESSAGE_COLLECTION).findOne({ _id: result.insertedId });
  return messageFromDB(newMessage!);
}

export async function findPrivateMessages(userId: string): Promise<Message[]> {
  const db = getDB();
  const data = await db.collection(MESSAGE_COLLECTION)
    .find({
      type: 'private',
      $or: [{ userId }, { recipientId: userId }]
    })
    .sort({ timestamp: 1 })
    .toArray();
  return data.map(messageFromDB);
}

export async function findClanMessages(clanId: string): Promise<Message[]> {
  const db = getDB();
  const data = await db.collection(MESSAGE_COLLECTION)
    .find({
      type: 'clanChat',
      recipientId: clanId
    })
    .sort({ timestamp: 1 })
    .toArray();
  return data.map(messageFromDB);
}