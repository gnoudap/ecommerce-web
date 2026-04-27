import express from 'express';
import * as userController from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', authLimiter, userController.registerUser);
router.post('/login', authLimiter, userController.loginUser);
router.get('/', protect, admin, userController.getAllUsers);
router.get('/:_id', protect, userController.getUserById);
router.put('/:_id', protect, userController.updateUser);
router.delete('/:_id', protect, admin, userController.deleteUser);

export default router;
