import { validateProduct } from '../product';
import { validateUser } from '../user';

describe('Valid User object data', () => {
   const validUser = {
      firstName: 'Daniel',
      lastName: 'Ricra',
      email: 'daniel@test.com',
      password: '12345678',
   };

   const invalidUsers = [
      {},
      { lastName: 'Ricra', email: 'daniel@test.com', password: '12345678' },
      { lastName: 'Ricra', password: '12345678' },
      { lastName: 'Ricra', email: 'daniel@test.com' },
      {
         firstName: 'Daniel',
         lastName: 'Ricra',
         email: 'daniel@test.com',
         password: '1234567',
      },
      {
         firstName: '',
         lastName: 'Ricra',
         email: 'daniel@test.com',
         password: '12345678',
      },
      {
         firstName: 'Daniel',
         lastName: '',
         email: 'daniel@test.com',
         password: '12345678',
      },
      {
         firstName: 'Dan',
         lastName: 'Ricra',
         email: 'danieltest.com',
         password: '12345678',
      },
   ];

   test('should return true for valid user fields', () => {
      expect(validateUser(validUser).success).toBe(true);
   });

   test('should return false for invalid user fields', () => {
      for (const invalidUser of invalidUsers) {
         expect(validateUser(invalidUser).success).toBe(false);
      }
   });
});

describe('Valid Product object data', () => {
   const validProduct = {
      name: 'Product',
      categoryId: 1,
      salePrice: 22.2,
      stock: 2,
      imgUrl: 'https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg'
   };

   const invalidProducts = [
      {},
      { name: '', categoryId: 1, salePrice: 22.2, stock: 2 },
      { name: '', categoryId: 1, stock: 2 },
      { categoryId: 1, stock: 2 },
      { stock: 2 },
   ];

   test('should return true for valid product fields', () => {
      expect(validateProduct(validProduct).success).toBe(true);
   });

   test('should return false for invalid product fields', () => {
      for (const invalidProduct of invalidProducts) {
         expect(validateProduct(invalidProduct).success).toBe(false);
      }
   });
});
