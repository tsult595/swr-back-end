import { Message } from '../types';
import { ObjectId } from 'mongodb';
import { WithId, Document } from 'mongodb';
export const MESSAGE_COLLECTION = 'messages';

export function messageFromDB(data: WithId<Document>): Message {
  return {
    id: data._id.toString(),
    username: data.username,
    userId: data.userId,
    text: data.text,
    type: data.type || 'normal',
    recipientId: data.recipientId || undefined,
    timestamp: data.timestamp instanceof Date
      ? data.timestamp.toISOString()
      : new Date(data.timestamp).toISOString(),
    clanId: data.clanId || undefined,
    clanName: data.clanName || undefined
  };
}

export function messageToDB(message: Omit<Message, 'id'>): Document {
  return {
    username: message.username,
    userId: message.userId,
    text: message.text,
    type: message.type || 'normal',
    recipientId: message.recipientId || null,
    timestamp: new Date(message.timestamp),
    clanId: message.clanId || null,
    clanName: message.clanName || null
  };
}