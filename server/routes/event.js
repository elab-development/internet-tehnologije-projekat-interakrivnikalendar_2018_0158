import { Router } from 'express';
import * as eventController from '../controllers/eventController.js';

const router = Router();

// POST Endpoints
router.route('/').post(eventController.createEvent);

// GET Endpoints
router.route('/').get(eventController.getEvents);

export default router;