import { Request, Response } from 'express';
import { createUserIfNotExists } from '../../domain/usecases/UserUseCase';

export async function createUser(req: Request, res: Response) {
  try {
    const { id, createdAt } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const user = await createUserIfNotExists({ id, createdAt });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}