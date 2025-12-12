import { Router } from 'express';
import heroRoutes from './heroRoutes';
import favoriteRoutes from './favoriteRoutes';
import messageRoutes from './messageRoutes';

const router = Router();

router.use('/heroes', heroRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/messages', messageRoutes);

export default router;