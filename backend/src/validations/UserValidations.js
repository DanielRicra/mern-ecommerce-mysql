
export const isValidUser =  ({ firstName, lastName, email, password }) => {
   if (!email || !firstName || !lastName || !password) {
      return false;
   }
   
   const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;

   if (email.trim() === '' || !emailPattern.test(email) || firstName.trim() === '' ||
      lastName.trim() === '' || password.trim() === '' || password.length < 8) {
      return false;
   }
   return true;
};