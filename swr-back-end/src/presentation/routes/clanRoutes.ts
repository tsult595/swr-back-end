import express from 'express';
import { createClanController, removeUserFromClanController, deleteClanController, getClansByUserController, addUserToClanController } from '../controllers/ClanController';
const router = express.Router();

router.post('/', createClanController);
router.post('/:clanId/remove-member', removeUserFromClanController);
router.delete('/:clanId', deleteClanController);
router.get('/user/:userId', getClansByUserController);
router.post('/:clanId/addUser', addUserToClanController);
export default router;