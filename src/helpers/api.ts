import axios, { type AxiosRequestConfig } from "axios";
// import { cookies } from 'next/headers';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,  
  headers: {
    'Content-Type': 'application/json',
  },
});

// // 2. Dynamic server interceptor
// api.interceptors.request.use(
//   async (config) => {
//     // Safely extract token from server cookies
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log('Token added to request headers:', token);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


export const fetcher = (url: string, options: AxiosRequestConfig = {}) =>
  api.get(url, options).then((res) => res.data);
