import * as favoriteRepository from '../../data/repositories/FavoriteRepository';

export async function removeFromFavorites(userId: string, heroId: number): Promise<void> {
  await favoriteRepository.removeFavorite(userId, heroId);
}