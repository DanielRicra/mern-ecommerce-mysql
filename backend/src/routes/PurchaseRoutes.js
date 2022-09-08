import { Router } from 'express';
import {
   getAllPurchases,
   addPurchase,
   getPurchasesByUserId
} from '../controllers/PurchaseController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', getAllPurchases);
router.get('/:userId', getPurchasesByUserId);
router.post('/', auth, addPurchase);

export default router;
