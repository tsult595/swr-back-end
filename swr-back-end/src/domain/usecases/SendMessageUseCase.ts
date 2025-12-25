import * as messageRepository from '../../data/repositories/MessageRepository';
import * as clanRepository from '../../data/repositories/ClanRepository';
import { Message } from '../../data/types';

export async function sendMessage(messageData: Omit<Message, 'id' | 'timestamp'>): Promise<Message> {
  let clanName = messageData.clanName;

  if (messageData.type === 'clanChat' && messageData.clanId && !clanName) {
    const clan = await clanRepository.getClanById(messageData.clanId);
    clanName = clan?.name;
  }

  const message: Omit<Message, 'id'> = {
    ...messageData,
    clanName,
    timestamp: new Date().toISOString()
  };

  return await messageRepository.createMessage(message);
}