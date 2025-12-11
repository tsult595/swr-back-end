import { Router } from 'express';
import heroRoutes from './heroRoutes';
import favoriteRoutes from './favoriteRoutes';

const router = Router();

router.use('/heroes', heroRoutes);
router.use('/favorites', favoriteRoutes);

export default router;