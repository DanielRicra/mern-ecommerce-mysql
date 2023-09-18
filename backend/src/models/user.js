import { pool } from '../config/database.js';

export class UserModel {
   static async getByEmail(email) {
      const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [
         email,
      ]);

      if (users.length === 0) return null;

      return users[0];
   }

   static async getById(userId) {
      const [users] = await pool.query(
         'SELECT user_id, first_name, last_name, cellphone, address, email, is_admin FROM users WHERE user_id = ?',
         [userId]
      );

      if (users.length === 0) return null;

      return users[0];
   }

   static async create(user) {
      const [result] = await pool.query(
         'INSERT INTO users (first_name, last_name, cellphone, address, email, password, is_admin) ' +
            ' VALUES (?, ?, ?, ?, ?, ?, ?)',
         [
            user.firstName,
            user.lastName,
            user.cellphone,
            user.address,
            user.email,
            user.password,
            user.isAdmin,
         ]
      );

      const [users] = await pool.query(
         'SELECT user_id, first_name, last_name, cellphone, address, email FROM users WHERE user_id = ?',
         [result.insertId]
      );

      return users[0];
   }
}
