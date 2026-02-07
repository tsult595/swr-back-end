import * as heroRepository from '../../data/repositories/HeroRepository';
import * as favoriteRepository from '../../data/repositories/FavoriteRepository';
import { Character } from '../../data/types';

export async function getAllHeroesUseCase(userId?: string): Promise<Character[]> {
  const heroes = await heroRepository.findAllHeroes();
  if (!userId) return heroes;
  const favorites = await favoriteRepository.findFavoritesByUserId(userId);
  const favoriteHeroIds = new Set(favorites.map(f => f.heroId));
  return heroes.map(hero => ({ ...hero, isLiked: favoriteHeroIds.has(hero.id) }));
}