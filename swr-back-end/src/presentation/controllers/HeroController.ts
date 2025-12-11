import { Request, Response } from 'express';
import getHeroesUseCase from '../../domain/usecases/GetHeroesUseCase';
import getHeroByIdUseCase from '../../domain/usecases/GetHeroByIdUseCase';

export class HeroController {
  async getHeroes(req: Request, res: Response) {
    try {
      const status = req.query.status as string | undefined;
      const heroes = await getHeroesUseCase.execute(status);
      res.json(heroes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch heroes' });
    }
  }

  async getHeroById(req: Request, res: Response) {
    try {
      const heroId = parseInt(req.params.id);
      const result = await getHeroByIdUseCase.execute(heroId);
      
      if (!result) {
        return res.status(404).json({ error: 'Hero not found' });
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hero' });
    }
  }

  async getHeroHistory(req: Request, res: Response) {
    try {
      const heroId = parseInt(req.params.id);
      const result = await getHeroByIdUseCase.execute(heroId);
      
      if (!result) {
        return res.status(404).json({ error: 'Hero not found' });
      }

   
      res.json(result.history);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hero history' });
    }
  }
}

export default new HeroController();