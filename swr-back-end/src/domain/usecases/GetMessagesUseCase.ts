import * as messageRepository from '../../data/repositories/MessageRepository';
import { Message } from '../../data/types';

export async function getMessages(limit?: number): Promise<Message[]> {
  const messages = await messageRepository.findAllMessages(limit);
  console.log('Fetched messages:', messages);
  return messages;
}