import { Router } from 'express';
import * as inviteController from '../controllers/inviteController.js';

const router = Router();

// POST Endpoints
router.route('/').post(inviteController.createInvite);

// GET Endpoints
router.route('/').get(inviteController.getInvites);
router.route('/populated').get(inviteController.getSentInvitesPopulated);
router.route('/:id').get(inviteController.getInvite);

// PUT Endpoints
router.route('/:id').put(inviteController.updateInvite);

// DELETE Endpoints
router.route('/:id').delete(inviteController.deleteInvite);

export default router;