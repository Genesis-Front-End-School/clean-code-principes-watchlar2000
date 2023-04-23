import { http } from '@/http-common';
import type { Course } from '@/types/Course';

interface AuthService {
  getToken(): Promise<string>;
}

interface CourseService {
  getCourses(): Promise<Course[]>;
  getCourseById(id: string): Promise<Course>;
}

class HttpAuthService implements AuthService {
  async getToken(): Promise<string> {
    const { data } = await http.get(import.meta.env.VITE_APP_AUTH_URL);
    return data.token;
  }
}

class HttpCourseService implements CourseService {
  private readonly config = {
    headers: { Authorization: '' },
    'Access-Control-Allow-Origin': 'DELETE',
  };
  private authToken: string | null = null;

  constructor(private authService: AuthService) { }

  private async setAuthorizationHeader(): Promise<void> {
    if (!this.authToken) {
      this.authToken = await this.authService.getToken();
    }
    this.config.headers.Authorization = `Bearer ${this.authToken}`;
  }

  async getCourses(): Promise<Course[]> {
    await this.setAuthorizationHeader();
    const { data } = await http.get(import.meta.env.VITE_APP_COURSES_URL, this.config);
    return data.courses;
  }

  async getCourseById(id: string): Promise<Course> {
    await this.setAuthorizationHeader();
    const { data } = await http.get(`${import.meta.env.VITE_APP_COURSES_URL}/${id}`, this.config);
    return data;
  }
}

export const courseDataService = new HttpCourseService(new HttpAuthService());
