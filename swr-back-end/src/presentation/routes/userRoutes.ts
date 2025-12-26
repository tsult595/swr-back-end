import express from 'express';
import * as UserController from '../controllers/UserController';

const router = express.Router();
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.post('/register', UserController.register);
router.get('/verify', UserController.verify);

export default router;