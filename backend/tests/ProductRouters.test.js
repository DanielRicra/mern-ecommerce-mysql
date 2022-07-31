import { app, server } from '../src/index.js';
import request from 'supertest';
import { pool } from '../src/config/DatabseConfig.js';

const api = request(app);

describe('GET /products', () => {
   test('should respond with a 200 status code', async () => {
      await api.get('/api/products').expect(200).expect('Content-type', /json/);
   });

   test('should respond with an JSON object', async () => { 
      const response = await api.get('/api/products');
      expect(response.body).toBeInstanceOf(Object);
   });

   test('should have results property in response', async () => { 
      const response = await api.get('/api/products').send();
      expect(response.body.results).toBeDefined();
   });

   describe('GET /products/:producId', () => {
      test('should responde with a 200 status code', async () => { 
         await api.get('/api/products/1')
            .expect(200)
            .expect('Content-type', /json/);
      });

      test('should respond with  JSON object', async () => { 
         const response = await api.get('/api/products/1').send();
         expect(response.body).toBeInstanceOf(Object);
      });

      test('should respond with  404 status code', async () => { 
         await api.get('/api/products/0').expect(404);
      });
   });

   describe('GET /products/category/:categoryId', () => {
      test('should responde with a 200 status code', async () => { 
         await api.get('/api/products/category/1')
            .expect(200)
            .expect('Content-type', /json/);
      });

      test('should respond with  JSON object', async () => { 
         const response = await api.get('/api/products/category/1').send();
         expect(response.body).toBeInstanceOf(Object);
      });

      test('should respond with  404 status code', async () => { 
         await api.get('/api/products/category/0').expect(404);
         await api.get('/api/products/category/hf').expect(404);
      });
   });

   describe('When page query parameter is not a numbert or wrong page',  () => {
      test('should respond with status code 404', async () => { 
         await api.get('/api/products?page=text').expect(404);
         await api.get('/api/products?page=0').expect(404);
      });
   });
});

describe('POST /products', () => {
   
   describe('When there is no authorization token', () => {
      test('should respond with a 401 status code', async () => { 
         const response = await api.post('/api/products').send();
         expect(response.statusCode).toBe(401);
      });
   });
   
});

afterAll(async () => {
   await pool.end();
   server.close();
});