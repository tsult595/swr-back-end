import { Request, Response } from 'express';
import { createUserIfNotExists } from '../../domain/usecases/UserUseCase';

export async function createUser(req: Request, res: Response) {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing id' });
   const user = await createUserIfNotExists({
   id: req.body.id,
   createdAt: req.body.createdAt || new Date().toISOString(),
   nickname: req.body.nickname,
   companions: req.body.companions,
  });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}