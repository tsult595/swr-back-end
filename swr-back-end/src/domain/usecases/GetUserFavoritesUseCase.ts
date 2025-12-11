import favoriteRepository from '../../data/repositories/FavoriteRepository';

export class GetUserFavoritesUseCase {
  async execute(userId: string) {
    return await favoriteRepository.findByUserIdWithHeroes(userId);
  }
}

export default new GetUserFavoritesUseCase();