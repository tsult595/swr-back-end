import express from 'express';
import { buyMysteryBoxController, deleteMysteryBoxController, getAllMysteryBoxesController, getMysteryBoxByIdController, getUserMysteryBoxesController } from '../controllers/mysteryBoxController';

const router = express.Router();

router.get('/', getAllMysteryBoxesController);
router.get('/:id', getMysteryBoxByIdController);
router.get('/user/:userId', getUserMysteryBoxesController);
router.post('/buy', buyMysteryBoxController);
router.delete('/delete', deleteMysteryBoxController);

export default router;