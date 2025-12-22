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

export async function getPrivateMessages(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });
    const messages = await getMessagesUseCase.getMessages(100);
    const filtered = messages.filter(msg =>
      msg.type === 'private' && (msg.userId === userId || msg.recipientId === userId)
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch private messages' });
  }
}

export async function getClanMessages(req: Request, res: Response) {
  try {
    const clanId = req.query.clanId as string;
    if (!clanId) return res.status(400).json({ error: 'Missing clanId' });
    const messages = await getMessagesUseCase.getMessages(100);
    const filtered = messages.filter(msg =>
      msg.type === 'clanChat' && msg.recipientId === clanId
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clan messages' });
  }
}

export async function sendMessage(req: Request, res: Response) {
  try {
    const { username, userId, text, type, recipientId, clanId } = req.body;

    if (!username || !userId || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const message = await sendMessageUseCase.sendMessage({
      username,
      userId,
      text,
      type: type || 'normal',
      recipientId,
      clanId
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
}