import { pool } from '../config/DatabseConfig.js';

export const findAllProducts = async (page = 1) => {
   return await pool.query(`SELECT * FROM products LIMIT ${(page - 1) * 20}, 20`);
};

export const countProducts = async () => {
   return await pool.query('SELECT COUNT(product_id) AS count_products FROM products');
};

export const findProductById = async (productId) => {
   return await pool.query('SELECT * FROM products WHERE product_id=?', [productId]);
};

export const findProductsByCategory = async (categoryId, page = 1) => {
   return await pool.query(
      `SELECT * FROM products WHERE category_id = ? LIMIT ${(page - 1) * 20}, 20` , 
      [categoryId]
   );
};

export const countProductsByCategory = async (categoryId) => {
   return await pool.query(
      'SELECT COUNT(product_id) AS count_products FROM products WHERE category_id = ?',
      [categoryId]
   );
};

export const saveProduct = async (product) => {
   return await pool.query(
      'INSERT INTO products (name, description, category_id, bar_code, sale_price, stock, img_url) ' +
      'VALUES(?, ?, ?, ?, ?, ?, ?)', 
      [product.name, product.description, product.categoryId, product.barCode, product.salePrice, product.stock, product.imgUrl]
   );
};

export const updateProduct = async (product, productId) => {
   return await pool.query(
      'UPDATE products SET ? WHERE product_id = ?', 
      [product, productId]
   );
};

export const deleteProductById = async (productId) => {
   return await pool.query('DELETE FROM products WHERE product_id = ?', [productId]);
};