import * as messageRepository from '../../data/repositories/MessageRepository';
import { Message } from '../../data/types';

export async function getMessages(channel: string, limit?: number): Promise<Message[]> {
  return await messageRepository.findMessagesByChannel(channel, limit);
}