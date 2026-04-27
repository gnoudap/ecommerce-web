import express from 'express';
import * as productController from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';
import { cacheProducts, clearProductCache } from '../middleware/cache.js';

const router = express.Router();

router.get('/', cacheProducts, productController.getAllProducts);
router.get('/search', cacheProducts, productController.searchProducts);
router.get('/category/:category', cacheProducts, productController.getProductsByCategory);
router.get('/:id', cacheProducts, productController.getProductById);
router.post('/:id/reviews', protect, clearProductCache, productController.createProductReview);
router.post('/', protect, admin, clearProductCache, productController.createProduct);
router.put('/:id', protect, admin, clearProductCache, productController.updateProduct);
router.delete('/:id', protect, admin, clearProductCache, productController.deleteProduct);

export default router;
