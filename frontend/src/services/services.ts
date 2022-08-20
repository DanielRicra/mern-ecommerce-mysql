/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios';
import { SigninPostData, AuthResponse, SignupPostData } from '../types/types';

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
