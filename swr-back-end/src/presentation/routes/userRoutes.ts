import express from 'express';
import * as UserController from '../controllers/UserController';

const router = express.Router();
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);

export default router;