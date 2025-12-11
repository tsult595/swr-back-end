import heroRepository from '../../data/repositories/HeroRepository';
import lotHistoryRepository from '../../data/repositories/LotHistoryRepository';
import { Hero, LotHistory } from '../../data/types';

export class GetHeroByIdUseCase {
  async execute(id: number): Promise<{ hero: Hero; history: LotHistory[] } | null> {
    const hero = await heroRepository.findById(id);
    if (!hero) return null;

    const history = await lotHistoryRepository.findByHeroId(id);
    return { hero, history };
  }
}

export default new GetHeroByIdUseCase();