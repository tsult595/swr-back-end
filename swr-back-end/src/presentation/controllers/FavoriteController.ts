import { Request, Response } from 'express';
import * as addToFavoritesUseCase from '../../domain/usecases/AddToFavoritesUseCase';
import * as removeFromFavoritesUseCase from '../../domain/usecases/RemoveFromFavoritesUseCase';
import * as getUserFavoritesUseCase from '../../domain/usecases/GetUserFavoritesUseCase';

export async function getFavorites(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const favorites = await getUserFavoritesUseCase.getUserFavorites(userId);
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
}

export async function addFavorite(req: Request, res: Response) {
  try {
    const { userId, heroId } = req.body;
    await addToFavoritesUseCase.addToFavorites(userId, heroId);
    res.status(201).json({ message: 'Added to favorites' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
}

export async function removeFavorite(req: Request, res: Response) {
  try {
    const { userId, heroId } = req.body;
    await removeFromFavoritesUseCase.removeFromFavorites(userId, heroId);
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
}