import * as favoriteRepository from '../../data/repositories/FavoriteRepository';
import * as heroRepository from '../../data/repositories/HeroRepository';
import { Favorite } from '../../data/types';

export async function addToFavorites(userId: string, heroId: number): Promise<void> {
  const hero = await heroRepository.findHeroById(heroId);
  if (!hero) {
    throw new Error('Hero not found');
  }

  const exists = await favoriteRepository.favoriteExists(userId, heroId);
  if (exists) {
    throw new Error('Already in favorites');
  }

  const favorite: Favorite = {
    userId,
    heroId,
    addedAt: new Date()
  };

  await favoriteRepository.addFavorite(favorite);
}