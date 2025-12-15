import * as userRepository from '../../data/repositories/UserRepository';
import { UserType } from '../../data/types';

export async function createUserIfNotExists(user: UserType) {
  const existing = await userRepository.findUserById(user.id);
  if (existing) return existing;
  return await userRepository.createUser(user);
}