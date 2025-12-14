import * as heroRepository from '../../data/repositories/HeroRepository';
import * as lotHistoryRepository from '../../data/repositories/LotHistoryRepository';
import { Hero, LotHistory } from '../../data/types';

export async function getHeroById(id: number): Promise<{ hero: Hero; history: LotHistory[] } | null> {
  const hero = await heroRepository.findHeroById(id);
  if (!hero) return null;

  const history = await lotHistoryRepository.findLotHistoryByHeroId(id);
  return { hero, history };
}