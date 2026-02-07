import * as heroRepository from '../../data/repositories/HeroRepository';
import * as lotHistoryRepository from '../../data/repositories/LotHistoryRepository';
import { Character, LotHistory } from '../../data/types';

export async function getHeroById(id: number): Promise<{ hero: Character; history: LotHistory[] } | null> {
  const hero = await heroRepository.findHeroById(id);
  if (!hero) return null;

  const history = await lotHistoryRepository.findLotHistoryByHeroId(id);
  return { hero, history };
}