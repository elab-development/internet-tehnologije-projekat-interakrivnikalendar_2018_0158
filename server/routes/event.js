import { Router } from 'express';
import * as eventController from '../controllers/eventController.js';

const router = Router();

// POST Endpoints
router.route('/').post(eventController.createEvent);

// GET Endpoints
router.route('/').get(eventController.getEvents);
router.route('/:id').get(eventController.getEvent);

// PUT Endpoints
router.route('/:id').put(eventController.updateEvent);

// DELETE Endpoints
router.route('/:id').delete(eventController.deleteEvent);

export default router;