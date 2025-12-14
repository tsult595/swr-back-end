import { Request, Response } from 'express';
import * as getHeroesUseCase from '../../domain/usecases/GetHeroesUseCase';
import * as getHeroByIdUseCase from '../../domain/usecases/GetHeroByIdUseCase';

export async function getHeroes(req: Request, res: Response) {
  try {
    const status = req.query.status as string | undefined;
    const heroes = await getHeroesUseCase.getHeroes(status);
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch heroes' });
  }
}

export async function getHeroById(req: Request, res: Response) {
  try {
    const heroId = parseInt(req.params.id);
    const result = await getHeroByIdUseCase.getHeroById(heroId);

    if (!result) {
      return res.status(404).json({ error: 'Hero not found' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hero' });
  }
}

export async function getHeroHistory(req: Request, res: Response) {
  try {
    const heroId = parseInt(req.params.id);
    const result = await getHeroByIdUseCase.getHeroById(heroId);

    if (!result) {
      return res.status(404).json({ error: 'Hero not found' });
    }

    res.json(result.history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hero history' });
  }
}