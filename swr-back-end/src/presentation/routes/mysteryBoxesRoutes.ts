import express from 'express';
import { getAllMysteryBoxesController, getMysteryBoxByIdController } from '../controllers/mysteryBoxController';

const router = express.Router();

router.get('/', getAllMysteryBoxesController);
router.get('/:id', getMysteryBoxByIdController);

export default router;