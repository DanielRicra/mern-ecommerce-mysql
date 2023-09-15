import { pool } from '../config/database.js';

export const saveAllPurchaseProducts = async (queryData) => {
   return await pool.query(
      `INSERT INTO purchase_products (purchase_id, product_id, quantity, total) VALUES ${queryData}`
   );
};