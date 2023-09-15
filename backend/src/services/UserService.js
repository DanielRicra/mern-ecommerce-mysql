import { pool } from '../config/database.js';

export const findUserByEmail = async (email) => {
   return await pool.query('SELECT * FROM users WHERE email=?', [email]);
};

export const saveUser = async (user) => {
   return await pool
      .query(
         'INSERT INTO users (first_name, last_name, cellphone, address, email, password, is_admin) ' +
         ' VALUES (?, ?, ?, ?, ?, ?, ?)', 
         [user.firstName, user.lastName, user.cellphone, user.address, user.email, user.password, user.isAdmin]
      );
};