import { Router } from 'express';

import { sendMessage, getPrivateMessages, getClanMessages , getMessages , deleteMessage } from '../controllers/MessageController';
const router = Router();

router.get('/:channel', getMessages);
router.post('/', sendMessage);
router.post('/send_message', sendMessage);
router.get('/private-messages', getPrivateMessages);
router.get('/clan-messages', getClanMessages);
router.delete('/:id', deleteMessage);

export default router;