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