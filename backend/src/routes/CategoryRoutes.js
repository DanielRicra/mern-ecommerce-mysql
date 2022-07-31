import { Router } from 'express';
import { addCategory, getAllCategories } from '../controllers/CategoryController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', getAllCategories);
router.post('/', auth, addCategory);

export default router;