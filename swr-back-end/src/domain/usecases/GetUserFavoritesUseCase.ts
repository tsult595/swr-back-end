import * as favoriteRepository from '../../data/repositories/FavoriteRepository';

export async function getUserFavorites(userId: string) {
  return await favoriteRepository.findFavoritesByUserIdWithHeroes(userId);
}