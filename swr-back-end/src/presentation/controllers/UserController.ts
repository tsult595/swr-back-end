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
      clans: req.body.clans || [],
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    // Здесь предполагается, что у вас есть UserRepository с методом findAllUsers
    const users = await import('../../data/repositories/UserRepository').then((m) => m.findAllUsers());
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}