import { http } from '@/http-common';
import { HttpAuthService } from './authService';

enum Auth {
  TokenStorageKey = 'authToken',
}

type AuthToken = string | null;

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
}

export const getTokenFromLocalStorage = (): AuthToken => {
  return window.localStorage.getItem(Auth.TokenStorageKey) ?? null;
}

export const setTokenToLocalStorage = (token: string): void => {
  window.localStorage.setItem(Auth.TokenStorageKey, token);
}