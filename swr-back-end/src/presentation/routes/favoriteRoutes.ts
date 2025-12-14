import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/FavoriteController';

const router = Router();

router.get('/:userId', getFavorites);
router.post('/', addFavorite);
router.delete('/', removeFavorite);

export default router;