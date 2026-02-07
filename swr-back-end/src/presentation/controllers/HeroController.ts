import { Request, Response } from 'express';
import * as getAllHeroesUseCase from '../../domain/usecases/GetAllHeroesUseCase';
import * as getHeroByIdUseCase from '../../domain/usecases/GetHeroByIdUseCase';

export async function getHeroes(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string | undefined;
    const heroes = await getAllHeroesUseCase.getAllHeroesUseCase(userId);
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