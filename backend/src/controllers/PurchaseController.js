import { format } from 'date-fns';
import { saveAllPurchaseProducts } from '../services/PurchaseProductsService.js';
import {
   countPurchases,
   countPurchasesByUserId,
   findAllPurchases,
   findPurchasesByUserId,
   savePurchase
} from '../services/PurchaseService.js';

const paymentTypes = ['cash', 'paypal', 'credit_card', 'debit_card'];

export const getAllPurchases = async (req, res) => {
   const { page =  1 } = req.query;
   try {
      const [countResult] = await countPurchases();
      const totaPages = Math.ceil(countResult[0].purchases_count/20);

      if (isNaN(page) || (!isNaN(page) && page < 1 || page > totaPages)) {
         return res.status(404).json({ message: 'Page not found' });
      }

      const [resultPurchases] = await findAllPurchases(page);
      
      res.status(200).json({ 
         page: Number(page),
         results: resultPurchases[0].results,
         total_results: countResult[0].purchases_count,
         total_pages: totaPages
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const getPurchasesByUserId = async (req, res) => {
   const { userId } = req.params;
   const { page = 1 } = req.query;

   try {
      const [countResult] = await countPurchasesByUserId(userId);
      const totaPages = Math.ceil(countResult[0].purchases_count/20);

      if (isNaN(page) || (!isNaN(page) && page < 1 || page > totaPages)) {
         return res.status(404).json({ message: 'Page not found' });
      }

      const [result] = await findPurchasesByUserId(userId, page);

      res.status(200).json({
         page: Number(page),
         results: result[0].results,
         total_results: countResult[0].purchases_count,
         total_pages: totaPages
      });

   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const addPurchase = async (req, res) => {
   const currentDateTime = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss');
   const { userId, purchaseDate = currentDateTime, paymentType, comment, state, items = [] } = req.body;

   if (!paymentType || !paymentTypes.includes(paymentType.toLowerCase()) ||
      items.length === 0) {
      return res.status(400).json({ message: 'Invalid payment type or empty items list' });
   }

   let productsValues = '';
   
   try {
      const [saveResult] = await savePurchase({userId, purchaseDate, paymentType, comment, state});
      
      for (let i = 0; i < items.length; i++) {
         if (!items[i].productId || !items[i].quantity || !items[i].total) {
            return res.status(400).json({ message: 'Invalid product data' });
         }
         productsValues += `(${saveResult.insertId}, ${items[i].productId}, ${items[i].quantity}, ${items[i].total})${i === (items.length - 1) ? '': ','}`;
      }

      await saveAllPurchaseProducts(productsValues);
      
      return res.status(201).json({purchase_id: saveResult.insertId, userId, purchaseDate, paymentType, comment, state});
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
   
};