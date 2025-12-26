import { Request, Response } from 'express';
import { createUserIfNotExists, registerUser, verifyEmail } from '../../domain/usecases/UserUseCase';
import { findAllUsers } from '../../data/repositories/UserRepository';

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
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { email } = req.body;
    console.log('Register request:', { email });
    if (!email) return res.status(400).json({ error: 'Email required' });
    await registerUser(email);
    res.json({ message: 'Verification email sent' });
  } catch (error) {
    console.log('Register error:', error);
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function verify(req: Request, res: Response) {
  try {
    const { token } = req.query;
    const user = await verifyEmail(token as string);
    // Здесь можно сгенерировать JWT и вернуть
    res.json({ user, message: 'Email verified' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}