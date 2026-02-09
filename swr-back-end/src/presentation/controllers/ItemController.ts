import { Request, Response } from 'express';
import { findAllItems, findItemById, findItemsByRarity, buyItem, findItemsByOwnerId, deleteItem } from '../../data/repositories/ItemRepository';

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

export async function buyItemController(req: Request, res: Response) {
  try {
    const { userId, itemId } = req.body;
    
    if (!userId || !itemId) {
      return res.status(400).json({ error: 'Missing userId or itemId' });
    }

    await buyItem(userId, itemId);
    res.status(200).json({ message: 'Item purchased successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to buy item' });
  }
}

export async function getUserItems(req: Request, res: Response) {
  try {
    const ownerId = req.params.ownerId;
    const items = await findItemsByOwnerId(ownerId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user items' });
  }
}


export async function deleteItemController(req: Request, res: Response) {
  try {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) {
      return res.status(400).json({ error: 'Missing userId or itemId' });
    }
    const item = await findItemById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    await deleteItem(itemId, userId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
}

