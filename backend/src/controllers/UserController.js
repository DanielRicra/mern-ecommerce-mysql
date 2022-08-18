import bcrypt from 'bcryptjs';
import { findUserByEmail, saveUser } from '../services/UserService.js';
import jwt from 'jsonwebtoken';
import { isValidUser } from '../validations/UserValidations.js';

export const signin = async (req, res) => {
   const { email, password } = req.body;
   
   try {
      const [result] = await findUserByEmail(email); 

      if (result.length === 0) {
         return res.status(404).json({ message: 'User does not exist' });
      }

      const existingUser = result[0];

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

      if (!isPasswordCorrect) {
         return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign(
         { email: existingUser.email, userId: existingUser.user_id },
         process.env.EXPRESS_SECRET_KEY,
         { expiresIn: '1 days' }
      );
      delete existingUser.password;
      res.status(200).json({ 
         result: {
            userId: existingUser.user_id,
            firstName: existingUser.first_name,
            lastName: existingUser.last_name,
            email: existingUser.email,
            isAdmin: existingUser.is_admin
         },
         token 
      });

   } catch (error) {
      res.status(500).json({ message: 'Something went wrong: ' + error.message });
   }
};

export const signup = async (req, res) => {
   const newUser = req.body;

   if (!isValidUser(newUser)) {
      return res.status(400).json({ message: 'Invalid data' });
   }

   if (!newUser.isAdmin) {
      newUser.isAdmin = 0;
   }

   try {
      const [findResult] = await findUserByEmail(newUser.email);
      
      if (findResult.length > 0) {
         return res.status(404).json({ message: 'A user with that email already exist' });
      }
      
      const hashedPassword = await bcrypt.hash(newUser.password, 12);

      const [saveResult] = await saveUser({...newUser, password: hashedPassword});

      const token = jwt.sign(
         { email: newUser.email, id: saveResult.insertId },
         process.env.EXPRESS_SECRET_KEY,
         { expiresIn: '1 days' }
      );
      
      delete newUser.password;
      return res.status(201).json({result: { ...newUser, userId: saveResult.insertId }, token });

   } catch (error) {
      return res.status(500).json({ message: 'Something went wrong: ' + error.message });
   }
};