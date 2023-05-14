import type { AxiosInterceptorManager, AxiosRequestConfig } from 'axios';
import { http } from './Lib/http-common';
import { getTokenFromLocalStorage, setTokenToLocalStorage } from './Lib/storage';
import { HttpAuthService } from './authService';

export const authService = new HttpAuthService(http);

export const isUserLoggedIn = async (): Promise<boolean> => {
  try {
    const bearerToken = getTokenFromLocalStorage();

    if (!bearerToken) {
      const token = await authService.getToken();
      setTokenToLocalStorage(token);
    }

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

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
