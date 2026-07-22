import { getTokenCookie, deleteTokenCookie } from "@/app/auth/sign-in/actions";
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

    return config;
  }
);

api.interceptors.response.use(res => res, err => {  
  if (err.response?.status === 401) {     
    deleteTokenCookie();    
  }
  return Promise.reject(err);
});


export const fetcher = (url: string, options: AxiosRequestConfig = {}) =>
  api.get(url, options).then((res) => res.data);
