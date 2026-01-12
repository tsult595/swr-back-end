import { Request, Response } from 'express';
import { findAllItems, findItemById, findItemsByRarity } from '../../data/repositories/ItemRepository';

export async function getAllItems(req: Request, res: Response) {
  try {
    const items = await findAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}

export async function getItemById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const item = await findItemById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
}

export async function getItemsByRarity(req: Request, res: Response) {
  try {
    const rarity = req.params.rarity;
    const items = await findItemsByRarity(rarity);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items by rarity' });
  }
}