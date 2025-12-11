import favoriteRepository from '../../data/repositories/FavoriteRepository';
import heroRepository from '../../data/repositories/HeroRepository';
import { Favorite } from '../../data/types';

export class AddToFavoritesUseCase {
  async execute(userId: string, heroId: number): Promise<void> {
    const hero = await heroRepository.findById(heroId);
    if (!hero) {
      throw new Error('Hero not found');
    }

    const exists = await favoriteRepository.exists(userId, heroId);
    if (exists) {
      throw new Error('Already in favorites');
    }

    const favorite: Favorite = {
      userId,
      heroId,
      addedAt: new Date()
    };

    await favoriteRepository.add(favorite);
  }
}

export default new AddToFavoritesUseCase();