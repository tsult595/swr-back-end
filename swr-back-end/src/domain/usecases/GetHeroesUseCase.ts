import * as heroRepository from '../../data/repositories/HeroRepository';
import {Character } from '../../data/types';

export async function getHeroes(status?: string): Promise<Character[]> {
  if (status) {
    return await heroRepository.findHeroesByStatus(status);
  }
  return await heroRepository.findAllHeroes();
}