import * as messageRepository from '../../data/repositories/MessageRepository';
import { Message } from '../../data/types';

export async function sendMessage(messageData: Omit<Message, 'id' | 'timestamp'>): Promise<Message> {
  const message: Omit<Message, 'id'> = {
    ...messageData,
    timestamp: new Date().toISOString()
  };

  return await messageRepository.createMessage(message);
}