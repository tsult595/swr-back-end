import * as messageRepository from '../../data/repositories/MessageRepository';
import { Message } from '../../data/types';

export async function getMessages(limit?: number): Promise<Message[]> {
 const messages = await messageRepository.findMessages();  
 console.log('Fetched messages:', messages);
 return messages;

  return await messageRepository.findMessages(limit);
}