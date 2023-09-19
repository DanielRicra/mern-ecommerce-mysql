import axios, { AxiosRequestConfig } from 'axios';
import {
   SigninPostData,
   AuthResponse,
   SignupPostData,
   ProductsResponse,
   Product,
   CategoriesResponse,
   PurchasesResponse,
   SavePurchaseResponse,
   SavePurchaseBody,
} from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((config: AxiosRequestConfig) => {
   const user = localStorage.getItem('user');
   try {
      if (user !== null) {
         const userToken = JSON.parse(user).token;
         if (config.headers === undefined) {
            config.headers = {};
         }
         config.headers.Authorization = `Bearer ${userToken}`;
      }
   } catch (error) {
      return config;
   }
   return config;
});

export const signin = (formData: SigninPostData) =>
   API.post<AuthResponse>('/auth/signin', formData);

export const signup = (formData: SignupPostData) =>
   API.post<AuthResponse>('/auth/signup', formData);

export const findAllProducts = ({
   categoryId,
   name = '',
   page = 1,
}: {
   name?: string;
   categoryId?: number;
   page?: number;
}) =>
   API.get<ProductsResponse>(
      `/products?name=${name}${categoryId ? `&categoryId=${categoryId}` : ''}&page=${page}`
   );

export const findProductById = (productId: number) =>
   API.get<Product>(`/products/${productId}`);

export const findAllCategories = () =>
   API.get<CategoriesResponse>('/categories');

export const findAllPurchases = (page: number) =>
   API.get<PurchasesResponse>(`/purchases?page=${page}`);

export const findPurchasesByUserId = (page: number, userId: number) =>
   API.get<PurchasesResponse>(`/purchases/${userId}?page=${page}`);

export const savePurchase = (body: SavePurchaseBody) =>
   API.post<SavePurchaseResponse>('/purchases', body);
