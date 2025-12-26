import crypto from 'crypto';
import transporter from '../../scripts/nodemailerTransporter';
import * as userRepository from '../../data/repositories/UserRepository';
import { UserType } from '../../data/types';

export async function createUserIfNotExists(user: UserType) {
  const existing = await userRepository.findUserById(user.id);
  if (existing) {
    // Ensure clans field exists for old users
    if (!Array.isArray(existing.clans)) {
      existing.clans = [];
    }
    return existing;
  }
  return await userRepository.createUser(user);
}

export async function registerUser(email: string) {
  // Проверьте, существует ли пользователь с таким email
  const existing = await userRepository.findUserByEmail(email);
  if (existing) {
    if (existing.emailVerified) {
      throw new Error('Email already registered and verified');
    } else {
      // Re-send verification
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await userRepository.updateUser(existing.id, { verificationToken: token, tokenExpires: expires });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `<p>Click <a href="${process.env.AUTH_URL || 'http://localhost:3001'}/api/users/verify?token=${token}">here</a> to verify.</p>`,
      });
      return existing;
    }
  }

  // Генерируйте токен
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 часа

  // Создайте временного пользователя или обновите
  const user = await userRepository.createUser({
    id: crypto.randomUUID(), // Или используйте email как ID
    email,
    verificationToken: token,
    tokenExpires: expires,
    emailVerified: false,
    clans: [],
  });
await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${process.env.AUTH_URL || 'http://localhost:3001'}/verify?token=${token}">here</a> to verify.</p>`,
  });

  return user;
}  

export async function verifyEmail(token: string) {
  const user = await userRepository.findUserByVerificationToken(token);
  if (!user || user.tokenExpires! < new Date()) throw new Error('Invalid or expired token');

  // Верифицируйте
  await userRepository.updateUser(user.id, { emailVerified: true, verificationToken: undefined, tokenExpires: undefined });
  return user;
}