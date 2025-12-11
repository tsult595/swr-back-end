import favoriteRepository from '../../data/repositories/FavoriteRepository';

export class RemoveFromFavoritesUseCase {
  async execute(userId: string, heroId: number): Promise<void> {
    await favoriteRepository.remove(userId, heroId);
  }
}

export default new RemoveFromFavoritesUseCase();