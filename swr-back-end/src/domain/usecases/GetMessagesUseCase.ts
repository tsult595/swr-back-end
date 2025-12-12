import messageRepository from '../../data/repositories/MessageRepository';
import { Message } from '../../data/types';

export class GetMessagesUseCase {
  async execute(channel: string, limit?: number): Promise<Message[]> {
    return await messageRepository.findByChannel(channel, limit);
  }
}

export default new GetMessagesUseCase();