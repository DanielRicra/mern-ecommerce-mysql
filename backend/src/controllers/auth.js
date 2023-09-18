import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateUser } from '../schemas/user.js';

export class AuthController {
   #userModel = null;
   constructor(userModel) {
      this.#userModel = userModel;
   }

   signin = async (req, res) => {
      const { email, password } = req.body;

      try {
         const existingUser = await this.#userModel.getByEmail(email);

         if (!existingUser) {
            return res.status(404).json({ message: 'User does not exist' });
         }

         const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
         );

         if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid password' });
         }

         const token = jwt.sign(
            { email: existingUser.email, userId: existingUser.user_id },
            process.env.EXPRESS_SECRET_KEY,
            { expiresIn: '1 days' }
         );

         res.status(200).json({
            result: {
               userId: existingUser.user_id,
               firstName: existingUser.first_name,
               lastName: existingUser.last_name,
               email: existingUser.email,
               isAdmin: existingUser.is_admin,
            },
            token,
         });
      } catch (error) {
         res.status(500).json({
            message: 'Something went wrong',
         });
      }
   };

   signup = async (req, res) => {
      const validatedResult = validateUser(req.body);

      if (!validatedResult.success) {
         return res
            .status(400)
            .json({ message: JSON.parse(validatedResult.error.message) });
      }

      const { data } = validatedResult;

      try {
         const existingUser = await this.#userModel.getByEmail(data.email);

         if (existingUser) {
            return res
               .status(404)
               .json({ message: 'A user with that email already exist' });
         }

         data.password = await bcrypt.hash(data.password, 12);

         const newUser = await this.#userModel.create(data);

         const token = jwt.sign(
            { email: newUser.email, userId: newUser.user_id },
            process.env.EXPRESS_SECRET_KEY,
            { expiresIn: '1 days' }
         );

         delete newUser.password;
         res.status(201).json({
            result: { ...newUser },
            token,
         });
      } catch (error) {
         res.status(500).json({
            message: 'Something went wrong',
         });
      }
   };
}
