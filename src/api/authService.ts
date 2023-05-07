import type { AxiosInstance } from "axios";
export interface AuthService {
  getToken(): Promise<string>;
}

const { VITE_APP_AUTH_URL } = import.meta.env;

export class HttpAuthService implements AuthService {
  constructor(private httpClient: AxiosInstance) { }

  async getToken(): Promise<string> {
    const { data } = await this.httpClient.get(VITE_APP_AUTH_URL);
    return data.token;
  }
}