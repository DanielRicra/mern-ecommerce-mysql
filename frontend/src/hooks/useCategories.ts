import { useState, useEffect } from 'react';
import { findAllCategories } from '../services/services';
import { Category } from '../types/types';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([{ category_id: 0, name: 'All' }]);

  useEffect(() => {
    async function getAllCategories() {
      try {
        const response = await findAllCategories();
        setCategories(response.data.results);
      } catch (error) {
        // Ignore
      }
    }

    getAllCategories();
  }, []);

  return { categories };
};

export default useCategories;
