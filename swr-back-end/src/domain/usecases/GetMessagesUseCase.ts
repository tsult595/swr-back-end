import * as messageRepository from '../../data/repositories/MessageRepository';
import { Message } from '../../data/types';

export async function getMessages(limit?: number): Promise<Message[]> {
  return await messageRepository.findMessages(limit);
}