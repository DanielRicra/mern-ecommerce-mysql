import {
   validatePartialProduct,
   validateProduct,
} from '../schemas/product.js';
import { validateQuery } from '../schemas/query.js';

export class ProductController {
   constructor(productModel) {
      this.productModel = productModel;
   }

   getAll = async (req, res) => {
      const result = validateQuery(req.query);

      if (!result.success) {
         return res
            .status(400)
            .json({ message: JSON.parse(result.error.message) });
      }
      const { name, page, categoryId, take } = result.data;

      try {
         const count = await this.productModel.count({ categoryId, name });
         const totalPages = Math.ceil(count / take);

         if (page < 1 || page > totalPages) {
            return res.status(404).json({ message: 'Page not found' });
         }

         const products = await this.productModel.getAll({
            page,
            name,
            categoryId,
            take,
         });

         res.status(200).json({
            page: Number(page),
            results: products,
            total_results: count,
            total_pages: totalPages,
         });
      } catch (error) {
         return res.status(500).json({ message: 'Something went wrong' });
      }
   };

   getById = async (req, res) => {
      const { productId } = req.params;

      try {
         const product = await this.productModel.getById({ productId });

         if (!product) {
            return res.status(404).json({ message: 'Product not found' });
         }

         return res.status(200).json(product);
      } catch (error) {
         return res.status(500).json({ message: 'Something went wrong' });
      }
   };

   // TODO: find category first, to enhance handle error
   create = async (req, res) => {
      const result = validateProduct(req.body);

      if (!result.success) {
         return res
            .status(400)
            .json({ message: JSON.parse(result.error.message) });
      }

      try {
         const newProduct = await this.productModel.create({
            product: result.data,
         });

         return res.status(201).json(newProduct);
      } catch (error) {
         return res.status(500).json({ message: 'Something went wrong' });
      }
   };

   // TODO: find category first, to enhance handle error
   update = async (req, res) => {
      const { productId } = req.params;

      const result = validatePartialProduct(req.body);

      if (!result.success) {
         return res
            .status(400)
            .json({ message: JSON.parse(result.error.message) });
      }

      try {
         const existingProduct = await this.productModel.getById({ productId });

         if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
         }

         const {
            description,
            barCode,
            categoryId,
            imgUrl,
            name,
            salePrice,
            stock,
         } = result.data;

         const mappedProduct = {};
         if (name) mappedProduct.name = name;
         if (description) mappedProduct.description = description;
         if (categoryId) mappedProduct.category_id = categoryId;
         if (barCode) mappedProduct.bar_code = barCode;
         if (salePrice) mappedProduct.sale_price = salePrice;
         if (stock) mappedProduct.stock = stock;
         if (imgUrl) mappedProduct.img_url = imgUrl;

         const updatedProduct = await this.productModel.update({
            productId,
            product: { ...mappedProduct },
         });

         return res.status(200).json(updatedProduct);
      } catch (error) {
         console.log(error);
         return res.status(500).json({ message: 'Something went wrong' });
      }
   };

   delete = async (req, res) => {
      const { productId } = req.params;

      try {
         const wasDeleted = await this.productModel.delete({ productId });

         if (!wasDeleted) {
            return res.status(404).json({ message: 'Product not found' });
         }

         return res.sendStatus(204);
      } catch (error) {
         return res.status(500).json({ message: 'Something went wrong' });
      }
   };
}
