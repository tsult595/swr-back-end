import { Router } from 'express';
import favoriteController from '../controllers/FavoriteController';

const router = Router();

router.get('/:userId', favoriteController.getFavorites.bind(favoriteController));
router.post('/', favoriteController.addFavorite.bind(favoriteController));
router.delete('/', favoriteController.removeFavorite.bind(favoriteController));

export default router;