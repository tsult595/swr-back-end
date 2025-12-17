import { Request, Response } from 'express';
import * as getMessagesUseCase from '../../domain/usecases/GetMessagesUseCase';
import * as sendMessageUseCase from '../../domain/usecases/SendMessageUseCase';

export async function getMessages(req: Request, res: Response) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const messages = await getMessagesUseCase.getMessages(limit);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}

export async function sendMessage(req: Request, res: Response) {
  try {
    const { username, userId, text } = req.body;

    if (!username || !userId || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const message = await sendMessageUseCase.sendMessage({
      username,
      userId,
      text,
      type: 'normal'
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
}