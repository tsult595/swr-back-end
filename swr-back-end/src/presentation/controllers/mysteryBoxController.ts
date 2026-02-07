import { Request, Response } from 'express';

import { findAllMysteryBoxes, findMysteryBoxById } from '../../data/repositories/mysteryBoxesRepository';

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