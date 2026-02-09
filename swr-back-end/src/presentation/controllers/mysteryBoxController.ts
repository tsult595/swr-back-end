import { Request, Response } from 'express';

import { buyMysteryBox, deleteMysteryBox, findAllMysteryBoxes, findMysteryBoxById, findMysteryBoxesByOwnerId } from '../../data/repositories/mysteryBoxesRepository';

export async function getAllMysteryBoxesController(req: Request, res: Response) {
    try {
      const mysteryBoxes = await findAllMysteryBoxes();
      res.json(mysteryBoxes);  
    } catch (error) {
       res.status(500).json({ error: 'Failed to fetch mystery boxes' }); 
    }
}  


export async function getMysteryBoxByIdController(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const mysteryBox = await findMysteryBoxById(id);
        if (mysteryBox) {
            res.json(mysteryBox);
        } else {
            res.status(404).json({ error: 'Mystery box not found' });
        }
    } catch (error) {
       res.status(500).json({ error: 'Failed to fetch mystery box' }); 
    }
}

export async function buyMysteryBoxController(req: Request, res: Response) {
    try {
        const { userId, boxId } = req.body;
        if (!userId || !boxId) {
            return res.status(400).json({ error: 'Missing userId or boxId' });
        }
        const mysteryBox = await findMysteryBoxById(boxId);
        if (!mysteryBox) {
            return res.status(404).json({ error: 'Mystery box not found' });
        }
        await buyMysteryBox(userId, boxId);
        res.json(mysteryBox);
    } catch (error) {
        res.status(500).json({ error: 'Failed to buy mystery box' });
    }
}

export async function getUserMysteryBoxesController(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const mysteryBoxes = await findMysteryBoxesByOwnerId(userId);
        res.json(mysteryBoxes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user mystery boxes' });
    }
}

export async function deleteMysteryBoxController(req: Request, res: Response) {
    try {
        const { userId, boxId } = req.body;
        if (!userId || !boxId) {
            return res.status(400).json({ error: 'Missing userId or boxId' });
        }
        const mysteryBox = await findMysteryBoxById(boxId);
        if (!mysteryBox) {
            return res.status(404).json({ error: 'Mystery box not found' });
        }
        await deleteMysteryBox(boxId, userId);
        res.json({ message: 'Mystery box deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete mystery box' });
    }
}