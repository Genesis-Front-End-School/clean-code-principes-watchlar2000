import type { AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { getTokenFromLocalStorage } from './api/auth';

const { VITE_APP_BASE_URL } = import.meta.env;

const http: AxiosInstance = axios.create({
  baseURL: VITE_APP_BASE_URL,
});

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers = config.headers ?? {};
  const bearerToken = getTokenFromLocalStorage();

  if (bearerToken) {
    config.headers.Authorization = `Bearer ${bearerToken}`;
  }

  return config;
};

(http.interceptors.request as AxiosInterceptorManager<AxiosRequestConfig>).use(requestInterceptor);

export { http };
