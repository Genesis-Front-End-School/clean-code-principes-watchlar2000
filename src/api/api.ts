import { HttpAuthService } from "./authService";
import { HttpCourseService } from "./courseService";

const authService = new HttpAuthService();

export const api = new HttpCourseService(authService);