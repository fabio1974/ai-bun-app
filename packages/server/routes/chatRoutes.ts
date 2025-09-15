import { Router } from 'express';
import { chatController } from '../controllers/chatController';
import { healthController } from '../controllers/healthController';

const router = Router();

router.post('/chat', chatController);

router.get('/chat', healthController);

export default router;
