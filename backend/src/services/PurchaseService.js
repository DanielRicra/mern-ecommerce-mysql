import { pool } from '../config/DatabseConfig.js';


export const findAllPurchases = async (page = 1) => {
   return await pool.query(
      `SELECT 
         JSON_ARRAYAGG(JSON_OBJECT(
            'purchaseId', P.purchase_id, 'user_id', P.user_id, 'purchaseDate', P.purchase_date, 'comment', P.comment, 'status', P.status, 'paymentType', P.payment_type , 'products', PP.products
         )) as results
      FROM purchases P
         INNER JOIN (
            SELECT
               pp.purchase_id,
               JSON_ARRAYAGG(JSON_OBJECT(
                  'productId', pp.product_id, 'totalPrice', pp.total, 'quantity', pp.quantity ,'name', Pr.name, 'description', Pr.description, 'unitSalePrice', Pr.sale_price, 'barCode', Pr.bar_code, 'categoryId', Pr.category_id
               )) products
            FROM purchase_products pp
               INNER JOIN products Pr ON Pr.product_id=pp.product_id
            GROUP BY pp.purchase_id
         ) PP ON PP.purchase_id=P.purchase_id
      LIMIT ${(page - 1) * 20}, 20`
   );
};

export const countPurchases = async () => { 
   return await pool.query('SELECT COUNT(purchase_id) as purchases_count FROM purchases');
};

export const savePurchase = async ({purchaseDate, comment, status, userId, paymentType}) => {
   return await pool.query(
      'INSERT INTO purchases (purchase_date, comment, status, user_id, payment_type) ' + 
      'VALUES (?, ?, ?, ?, ?)',
      [purchaseDate, comment, status, userId, paymentType]
   ); 
};