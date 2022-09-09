/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios';
import {
  SigninPostData,
  AuthResponse,
  SignupPostData,
  ProductsResponse,
  Product,
  CategoriesResponse,
  PurchasesResponse,
} from '../types/types';

const API = axios.create({ baseURL: 'http://localhost:3001/api' });

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

export const signin = (formData: SigninPostData) => API
  .post<AuthResponse>('/user/signin', formData);

export const signup = (formData: SignupPostData) => API
  .post<AuthResponse>('/user/signup', formData);

export const findAllProducts = (page: number) => API
  .get<ProductsResponse>(`/products?page=${page}`);

export const findProductById = (productId: number) => API
  .get<Product>(`/products/${productId}`);

export const findAllCategories = () => API.get<CategoriesResponse>('/categories');

export const findProductsByNameAndCategory = (name: string, categoryId: number, page = 1) => API
  .get<ProductsResponse>(`/search?q=${name}&catId=${categoryId}&page=${page}`);

export const findAllPurchases = (page: number) => API
  .get<PurchasesResponse>(`/purchases?page=${page}`);

export const findPurchasesByUserId = (page: number, userId: number) => API
  .get<PurchasesResponse>(`/purchases/${userId}?page=${page}`);
