import { Router } from 'express';
import { countProductsByNameMatch, findProductByNameMatch } from '../services/ProductService.js';

const router = Router();

router.get('/', async (req, res) => {
   const { q: query, page = 1, catId: categoryId = 0 } = req.query;

   if (query === undefined || query === '') {
      return res.sendStatus(400);
   }

   try {
      const [resultCount] = await countProductsByNameMatch(query, Number(categoryId));
      const totalPages = Math.ceil(resultCount[0].count_products/20);

      if (isNaN(page) || (!isNaN(page) && resultCount[0].count_products !== 0 && (page < 1 || page > totalPages))) {
         return res.status(404).json({ message: 'Page not found' });
      }

      const [result] = await findProductByNameMatch(query, Number(page), Number(categoryId));

      return res.status(200).json({
         page: Number(page),
         results: result,
         total_results: resultCount[0].count_products,
         total_pages: totalPages
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
});

export default router;