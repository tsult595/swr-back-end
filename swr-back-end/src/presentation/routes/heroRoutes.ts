import { Router } from 'express';
import heroController from '../controllers/HeroController';

const router = Router();

router.get('/', heroController.getHeroes.bind(heroController));
router.get('/:id/history', heroController.getHeroHistory.bind(heroController));
router.get('/:id', heroController.getHeroById.bind(heroController));

export default router;