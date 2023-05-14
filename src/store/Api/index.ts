import HttpCourseService from '../../Shared/Api';
import { http } from '../../Shared/Api/Auth';

export const api = new HttpCourseService(http);
