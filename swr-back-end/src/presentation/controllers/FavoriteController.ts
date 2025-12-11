import { Request, Response } from 'express';
import addToFavoritesUseCase from '../../domain/usecases/AddToFavoritesUseCase';
import removeFromFavoritesUseCase from '../../domain/usecases/RemoveFromFavoritesUseCase';
import getUserFavoritesUseCase from '../../domain/usecases/GetUserFavoritesUseCase';

export class FavoriteController {
  async getFavorites(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const favorites = await getUserFavoritesUseCase.execute(userId);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch favorites' });
    }
  }

  async addFavorite(req: Request, res: Response) {
    try {
      const { userId, heroId } = req.body;
      await addToFavoritesUseCase.execute(userId, heroId);
      res.status(201).json({ message: 'Added to favorites' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeFavorite(req: Request, res: Response) {
    try {
      const { userId, heroId } = req.body;
      await removeFromFavoritesUseCase.execute(userId, heroId);
      res.json({ message: 'Removed from favorites' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove favorite' });
    }
  }
}

export default new FavoriteController();