import { findAllCategories, findCategoryByName, saveCategory } from '../services/CategoryService.js';


export const getAllCategories = async (req, res) => {
   try {
      const [result] = await findAllCategories();
      return res.status(200).json({ results: result });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const addCategory = async (req, res) => {
   const { name } = req.body;
   
   if (!name) {
      return res.status(400).json({ message: 'Name must be provided' });
   }

   try {
      const [foundedResult] = await findCategoryByName(name);
      if (foundedResult.length > 0) {
         return res.status(409).json({ message: `category with name '${name}' already exists` });
      }

      const [result] = await saveCategory(name);
      return res.status(201).json({ name, categoryId: result.insertId });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};