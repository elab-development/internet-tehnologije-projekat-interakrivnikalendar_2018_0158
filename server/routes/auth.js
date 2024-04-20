import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// POST Endpoints
router.route('/register').post(authController.register);
router.route('/registerMail').post((req, res) => {
  res.json('Register Mail');
});
router.route('/authenticate').post((req, res) => {
  res.json('Authenticate');
});
router.route('/login').post(authMiddleware.verifyUser, authController.login);

// GET Endpoints
router.route('/user/:username').get(authController.getUser);
router.route('/generateOTP').get(authController.generateOTP);
router.route('/verifyOTP').get(authController.verifyOTP);
router.route('/createResetSession').get(authController.createResetSession);

// PUT Endpoints
router.route('/updateUser').put(authController.updateUser);
router.route('/resetPassword').put(authController.resetPassword);

export default router;