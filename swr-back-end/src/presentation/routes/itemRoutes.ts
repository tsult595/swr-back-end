import express from 'express';
import { getAllItems, getItemById, getItemsByRarity, buyItemController, getUserItems, deleteItemController } from '../controllers/ItemController';

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.get('/rarity/:rarity', getItemsByRarity);
router.post('/user-items', buyItemController);
router.get('/user/:ownerId', getUserItems);
router.delete('/delete', deleteItemController);

export default router;