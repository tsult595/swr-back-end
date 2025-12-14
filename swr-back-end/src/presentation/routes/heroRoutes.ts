import { Router } from 'express';
import { getHeroes, getHeroById, getHeroHistory } from '../controllers/HeroController';

const router = Router();

router.get('/', getHeroes);
router.get('/:id/history', getHeroHistory);
router.get('/:id', getHeroById);

export default router;