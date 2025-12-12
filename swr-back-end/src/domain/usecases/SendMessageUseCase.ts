import messageRepository from '../../data/repositories/MessageRepository';
import { Message } from '../../data/types';

export class SendMessageUseCase {
  async execute(messageData: Omit<Message, 'id' | 'timestamp'>): Promise<Message> {
    const message: Omit<Message, 'id'> = {
      ...messageData,
      timestamp: new Date()
    };

    return await messageRepository.create(message);
  }
}

export default new SendMessageUseCase();