import { Router } from 'express';
import heroRoutes from './heroRoutes';
import favoriteRoutes from './favoriteRoutes';
import messageRoutes from './messageRoutes';
import userRoutes from './userRoutes'; 
import clanRoutes from './clanRoutes';
import itemRoutes from './itemRoutes';

const router = Router();

router.use('/heroes', heroRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/messages', messageRoutes);
router.use('/users', userRoutes); 
router.use('/clans', clanRoutes);
router.use('/items', itemRoutes);


export default router;