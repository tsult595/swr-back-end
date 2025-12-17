import { Request, Response } from 'express';
import { createClan } from '../../data/repositories/ClanRepository';

export async function createClanController(req: Request, res: Response) {
  try {
    const { name, members } = req.body;
    if (!name || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ error: 'Invalid data' });
    }
    const clan = await createClan(name, members);
    res.status(201).json(clan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create clan' });
  }
}