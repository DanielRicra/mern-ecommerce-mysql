import { Router } from 'express';
import { getAllPurchases, addPurchase } from '../controllers/PurchaseController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', getAllPurchases);
router.post('/', auth, addPurchase);

export default router;
