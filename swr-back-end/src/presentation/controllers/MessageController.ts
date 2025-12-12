import { Request, Response } from 'express';
import getMessagesUseCase from '../../domain/usecases/GetMessagesUseCase';
import sendMessageUseCase from '../../domain/usecases/SendMessageUseCase';

export class MessageController {
  async getMessages(req: Request, res: Response) {
    try {
      const channel = req.params.channel;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      
      const messages = await getMessagesUseCase.execute(channel, limit);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }

  async sendMessage(req: Request, res: Response) {
    try {
      const { channel, username, userId, text, type } = req.body;

      if (!channel || !username || !userId || !text) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const message = await sendMessageUseCase.execute({
        channel,
        username,
        userId,
        text,
        type: type || 'user'
      });

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  }
}

export default new MessageController();