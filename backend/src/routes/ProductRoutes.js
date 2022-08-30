import { Router } from 'express';
import {
   addNewProduct,
   deleteProduct,
   getAllProducts,
   getProductById,
   getProductsByCategory,
   modifyProduct
} from '../controllers/ProductController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/:productId', getProductById);
router.post('/', auth, addNewProduct);
router.put('/:productId', auth, modifyProduct);
router.delete('/:productId', auth, deleteProduct);

export default router;