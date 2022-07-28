import { 
   deleteProductById,
   findAllProducts,
   countProducts, 
   findProductById, 
   saveProduct, 
   updateProduct, 
   findProductsByCategory,
   countProductsByCategory
} from '../services/ProductService.js';
import { isValidProduct } from '../validations/ProductValidations.js';

export const getAllProducts = async (req, res) => {
   const { page = 1} = req.query;
 
   try {
      const [resultCount] = await countProducts();
      const totalPages = Math.ceil(resultCount[0].count_products/20);

      if (isNaN(page) || (!isNaN(page) && page < 1 || page > totalPages)) {
         return res.status(404).json({ message: 'Page not found' });
      }

      const [productsResult] = await findAllProducts(page);

      res.status(200).json({ 
         page: Number(page),
         results: productsResult,
         total_results: resultCount[0].count_products,
         total_pages: totalPages
      });
   } catch (error) {
      return res.status(500).json({ message: 'Something went wrong: ' + error.message });
   }
};

export const getProductById = async (req, res) => {
   const { productId } = req.params;

   try {
      const [result] = await findProductById(productId);

      if (result.length === 0) {
         return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json({ ...result[0] });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const getProductsByCategory = async (req, res) => {
   const { categoryId } = req.params;
   const { page = 1} = req.query;

   try {
      const [resultCount] = await countProductsByCategory(categoryId);
      const totalPages = Math.ceil(resultCount[0].count_products/20);

      if (isNaN(page) || (!isNaN(page) && page < 1 || page > totalPages) || isNaN(categoryId)) {
         return res.status(404).json({ message: 'Page not found' });
      }

      const [result] = await findProductsByCategory(categoryId, page);

      if (result.length === 0) {
         return res.status(404).json({ message: 'There is no products with that category id' });
      }

      return res.status(200).json({ 
         page: Number(page), 
         results: result,  
         total_results: resultCount[0].count_products,
         total_pages: totalPages
      });

   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const addNewProduct = async (req, res) => {
   const product = req.body;

   if (!isValidProduct(product)) {
      return res.status(400).json({ message: 'Invalid Data' });
   }

   try {
      const [result] = await saveProduct(product);

      return res.status(201).json({...product, productId: result.insertId });
   } catch (error) {
      return res.status(500).json({ message: 'Something went wrong: ' + error.message });
   }
};

export const modifyProduct = async (req, res) => {
   const { productId } = req.params; 
   const { name, description, categoryId, barCode, salePrice, stock } = req.body;

   if (!isValidProduct({name, categoryId, salePrice, stock})) {
      return res.status(400).json({ message: 'Invalid Data' });
   }

   try {
      const [resultFind] = await findProductById(productId);

      if (resultFind.length === 0) {
         return res.status(404).json({ message: 'Product to update cannot be found'});
      }

      const modifiedProduct = {
         name, 
         description, 
         category_id: categoryId, 
         bar_code: barCode, 
         sale_price: salePrice, 
         stock 
      };

      await updateProduct(modifiedProduct, productId);

      return res.status(200).json({...resultFind[0], ...modifiedProduct});

   } catch (error) {
      return res.status(500).json({ message: 'Something went wrong: ' + error.message });
   }
};

export const deleteProduct = async (req, res) => {
   const { productId } = req.params;

   if (isNaN(productId)) {
      return res.sendStatus(400);
   }

   try {
      const [result] = await deleteProductById(productId); 
      
      if (result.affectedRows === 0){
         return res.status(404).json({ message: 'Product not found' });
      }

      return res.sendStatus(204);
   } catch (error) {
      return res.status(500).json({ message: 'Something went wrong: ' + error.message });
   }
};