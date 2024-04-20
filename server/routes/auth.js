import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// POST Endpoints
router.route('/register').post(authController.register);
router.route('/registerMail').post(authController.registerMail);
router.route('/authenticate').post((req, res) => {
  res.json('Authenticate');
});
router.route('/login').post(authMiddleware.verifyUser, authController.login);

// GET Endpoints
router.route('/user/:username').get(authController.getUser);
router
  .route('/generateOTP')
  .get(
    authMiddleware.verifyUser,
    authMiddleware.localVariables,
    authController.generateOTP
  );
router.route('/verifyOTP').get(authController.verifyOTP);
router.route('/createResetSession').get(authController.createResetSession);

// PUT Endpoints
router
  .route('/updateUser')
  .put(authMiddleware.authorize, authController.updateUser);
router
  .route('/resetPassword')
  .put(authMiddleware.verifyUser, authController.resetPassword);

export default router;