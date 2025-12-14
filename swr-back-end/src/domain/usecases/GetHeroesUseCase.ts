import * as heroRepository from '../../data/repositories/HeroRepository';
import { Hero } from '../../data/types';

export async function getHeroes(status?: string): Promise<Hero[]> {
  if (status) {
    return await heroRepository.findHeroesByStatus(status);
  }
  return await heroRepository.findAllHeroes();
}