import { pool } from '../config/DatabseConfig.js';

export const findAllCategories = async () => {
   return await pool.query('SELECT * FROM categories');
};

export const findCategoryByName = async (name) => {
   return await pool.query('SELECT * FROM categories WHERE LOWER(name) = ?', [name.toLowerCase()]);
};

export const saveCategory = async (name) => {
   return await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
};