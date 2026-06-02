import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
  // baseURL: process.env.FASTAPI_URL,
  baseURL: "http://127.0.0.1:8080",  
  // headers: {
  //   'Content-Type': 'application/json',
  // }
});


export const fetcher = (url: string, options: AxiosRequestConfig = {}) =>
  api.get(url, options).then((res) => res.data);
