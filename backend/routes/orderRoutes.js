import express from 'express';
import * as orderController from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, orderController.createOrder);
router.get('/', protect, admin, orderController.getAllOrders);
router.get('/myorders', protect, orderController.getUserOrders);
router.get('/:id', protect, orderController.getOrderById);
router.put('/:id', protect, orderController.updateOrder);
router.put('/:id/status', protect, admin, orderController.updateOrderStatus);
router.delete('/:id', protect, admin, orderController.deleteOrder);

export default router;
