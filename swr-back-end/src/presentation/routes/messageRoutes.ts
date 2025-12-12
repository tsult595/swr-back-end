import { Router } from 'express';
import messageController from '../controllers/MessageController';

const router = Router();

router.get('/:channel', messageController.getMessages.bind(messageController));
router.post('/', messageController.sendMessage.bind(messageController));

export default router;