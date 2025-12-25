import { Request, Response } from 'express';
import * as getMessagesUseCase from '../../domain/usecases/GetMessagesUseCase';
import * as sendMessageUseCase from '../../domain/usecases/SendMessageUseCase';
import * as messageRepository from '../../data/repositories/MessageRepository';
import { io, userSockets } from '../../index';


export async function getMessages(req: Request, res: Response) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 1000;
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
    const messages = await messageRepository.findPrivateMessages(userId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch private messages' });
  }
}

export async function getClanMessages(req: Request, res: Response) {
  try {
    const clanId = req.query.clanId as string;
    if (!clanId) return res.status(400).json({ error: 'Missing clanId' });
    const messages = await messageRepository.findClanMessages(clanId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clan messages' });
  }
}

export async function sendMessage(req: Request, res: Response) {
  try {
    const { username, userId, text, type, recipientId, clanId, clanName } = req.body;

    if (!username || !userId || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const message = await sendMessageUseCase.sendMessage({
      username,
      userId,
      text,
      type: type || 'normal',
      recipientId,
      clanId,
      clanName 
    });

    console.log('Message saved:', message);

    
    if (message.type === 'clanChat' && message.recipientId) {
      console.log('Emitting to clan room:', message.recipientId);
      io.to(message.recipientId).emit('chat message', message);
    } else if (message.type === 'private' && message.recipientId) {
      const recipientSockets = userSockets.get(message.recipientId);
      console.log('Emitting to private recipient:', message.recipientId, 'sockets:', recipientSockets);
      if (recipientSockets?.length) {
        recipientSockets.forEach(sid => {
          console.log('Emitting to socket:', sid);
          io.to(sid).emit('chat message', message);
        });
      } else {
        console.log('No sockets found for recipient');
      }
    } else {
      console.log('Emitting to all for public message');
      io.emit('chat message', message);
    }

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
}

export async function deleteMessage(req: Request, res: Response) {
  console.log('Delete message called with id:', req.params.id);
  try {
    const { id } = req.params;
    if (!id) {
      console.log('No id provided');
      return res.status(400).json({ error: 'Missing id' });
    }
    const isDeleted = await messageRepository.deleteMessageById(id);
    if (isDeleted) {
      console.log('Message deleted successfully');
      res.status(200).json({ message: 'Message deleted' });
    } else {
      console.log('Message not found');
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    console.log('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
}

export async function getGlobalMessages(req: Request, res: Response) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const messages = await messageRepository.findGlobalMessages(limit);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch global messages' });
  }
}
