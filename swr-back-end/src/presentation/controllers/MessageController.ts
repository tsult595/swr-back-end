import { Request, Response } from 'express';
import * as getMessagesUseCase from '../../domain/usecases/GetMessagesUseCase';
import * as sendMessageUseCase from '../../domain/usecases/SendMessageUseCase';

export async function getMessages(req: Request, res: Response) {
  try {
    const channel = req.params.channel;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;

    const messages = await getMessagesUseCase.getMessages(channel, limit);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}

export async function sendMessage(req: Request, res: Response) {
  try {
    const { channel, username, userId, text, type } = req.body;

    if (!channel || !username || !userId || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const message = await sendMessageUseCase.sendMessage({
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