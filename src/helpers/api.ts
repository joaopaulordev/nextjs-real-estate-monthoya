import { getTokenCookie } from "@/app/auth/sign-in/actions";
import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,  
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Dynamic server interceptor
api.interceptors.request.use(
  async (config) => {
    // Safely extract token from server cookies
    const token = await getTokenCookie();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;      
    }

    console.log('Token added to request headers:', token);

    return config;
  },
  (error) => {
    console.log('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);


export const fetcher = (url: string, options: AxiosRequestConfig = {}) =>
  api.get(url, options).then((res) => res.data);
