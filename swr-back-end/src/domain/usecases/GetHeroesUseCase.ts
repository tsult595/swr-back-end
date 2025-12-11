import heroRepository from '../../data/repositories/HeroRepository';
import { Hero } from '../../data/types';

export class GetHeroesUseCase {
  async execute(status?: string): Promise<Hero[]> {
    if (status) {
      return await heroRepository.findByStatus(status);
    }
    return await heroRepository.findAll();
  }
}

export default new GetHeroesUseCase();