import { Message } from '../types';
import { ObjectId } from 'mongodb';

export class MessageModel {
  static collectionName = 'messages';

  static fromDB(data: any): Message {
    return {
      id: data._id.toString(),
      channel: data.channel,
      username: data.username,
      userId: data.userId,
      text: data.text,
      type: data.type || 'user',
      timestamp: new Date(data.timestamp)
    };
  }

  static toDB(message: Omit<Message, 'id'>): any {
    return {
      channel: message.channel,
      username: message.username,
      userId: message.userId,
      text: message.text,
      type: message.type || 'user',
      timestamp: message.timestamp
    };
  }
}