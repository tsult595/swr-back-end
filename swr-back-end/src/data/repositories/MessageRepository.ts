import { getDB } from '../../config/database';
import { MessageModel } from '../models/MessageModel';
import { Message } from '../types';

export class MessageRepository {
  async findByChannel(channel: string, limit: number = 50): Promise<Message[]> {
    const db = getDB();
    const data = await db.collection(MessageModel.collectionName)
      .find({ channel })
      .sort({ timestamp: 1 })
      .limit(limit)
      .toArray();
    return data.map(MessageModel.fromDB);
  }

  async create(message: Omit<Message, 'id'>): Promise<Message> {
    const db = getDB();
    const result = await db.collection(MessageModel.collectionName)
      .insertOne(MessageModel.toDB(message));
    
    const newMessage = await db.collection(MessageModel.collectionName)
      .findOne({ _id: result.insertedId });
    
    return MessageModel.fromDB(newMessage);
  }

  async deleteOldMessages(channel: string, daysToKeep: number = 7): Promise<void> {
    const db = getDB();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    await db.collection(MessageModel.collectionName).deleteMany({
      channel,
      timestamp: { $lt: cutoffDate }
    });
  }
}

export default new MessageRepository();