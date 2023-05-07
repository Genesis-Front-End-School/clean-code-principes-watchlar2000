import { http } from '@/http-common';
import { HttpCourseService } from './courseService';

export const api = new HttpCourseService(http);