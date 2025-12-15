import express from 'express';
import * as userController from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', protect, admin, userController.getAllUsers);
router.get('/:id', protect, userController.getUserById);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, admin, userController.deleteUser);

export default router;
