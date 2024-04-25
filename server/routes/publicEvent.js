import { Router } from 'express';
import * as publicEventController from '../controllers/publicEventController.js';

const router = Router();

// POST Endpoints
router.route('/').post(publicEventController.createEvent);

// GET Endpoints
router.route('/').get(publicEventController.getEvents);
router.route('/:id').get(publicEventController.getEvent);

export default router;