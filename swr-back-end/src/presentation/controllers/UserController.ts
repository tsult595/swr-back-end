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
    // Return HTML instead of JSON
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verified</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
          }
          h1 {
            color: #28a745;
          }
          p {
            color: #666;
          }
          .user-info {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>✅ Email Verified Successfully!</h1>
          <p>Welcome! Your email has been verified.</p>
          <div class="user-info">
            <strong>User ID:</strong> ${user.id}<br>
            <strong>Email:</strong> ${user.email}
          </div>
          <p>You can now close this page and continue using the app.</p>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(400).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Failed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
          }
          h1 {
            color: #dc3545;
          }
          p {
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>❌ Verification Failed</h1>
          <p>${(error as Error).message}</p>
          <p>Please try again or contact support.</p>
        </div>
      </body>
      </html>
    `);
  }
}