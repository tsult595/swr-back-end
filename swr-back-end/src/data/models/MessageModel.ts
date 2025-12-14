import { Message } from '../types';
import { ObjectId } from 'mongodb';
import { WithId, Document } from 'mongodb';
export const MESSAGE_COLLECTION = 'messages';

export function messageFromDB(data: WithId<Document>): Message {
  return {
    id: data._id.toString(),
    channel: data.channel,
    username: data.username,
    userId: data.userId,
    text: data.text,
    type: data.type || 'normal',
    timestamp: data.timestamp instanceof Date
      ? data.timestamp.toISOString()
      : new Date(data.timestamp).toISOString()
  };
}

export function messageToDB(message: Omit<Message, 'id'>): Document {
  return {
    channel: message.channel,
    username: message.username,
    userId: message.userId,
    text: message.text,
    type: message.type || 'normal',
    timestamp: new Date(message.timestamp)
  };
}