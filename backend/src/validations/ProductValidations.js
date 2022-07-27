
export const isValidProduct = ({ name, categoryId, salePrice, stock }) => {
   if (!name || !categoryId || !salePrice || !stock) {
      return false;
   }
   
   if (name.trim() === '' ) return false;
   return true;
};