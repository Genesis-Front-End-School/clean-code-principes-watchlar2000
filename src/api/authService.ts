import { http } from '@/http-common';

export interface AuthService {
  getToken(): Promise<string>;
}

export class HttpAuthService implements AuthService {
  async getToken(): Promise<string> {
    const { data } = await http.get(import.meta.env.VITE_APP_AUTH_URL);
    return data.token;
  }
} 