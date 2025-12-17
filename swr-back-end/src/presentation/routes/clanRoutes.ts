import express from 'express';
import { createClanController } from '../controllers/ClanController';
const router = express.Router();

router.post('/', createClanController);

export default router;