import express from 'express';
import { getAllItems, getItemById, getItemsByRarity } from '../controllers/ItemController';

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.get('/rarity/:rarity', getItemsByRarity);

export default router;