import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/MessageController';

const router = Router();

router.get('/:channel', getMessages);
router.post('/', sendMessage);


export default router;