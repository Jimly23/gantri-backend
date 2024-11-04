import express from 'express';
import { createQueue, getQueues, getQueueByUser, updateQueue } from '../controllers/queueController.js';

const router = express.Router();

router.post('/queue', createQueue);
router.put('/queue', updateQueue);
router.get('/queue', getQueues);
router.get('/queue/user', getQueueByUser);

export default router;