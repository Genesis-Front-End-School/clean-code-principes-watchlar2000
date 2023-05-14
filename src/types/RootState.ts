import type { Course } from './Course';

export interface ICourseRootState {
  courses: Course[];
  cashedCoursesDetails: Course[];
  selectedCourse: Course | null;
  currentPage: number;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IErrorRootState {
  code?: string | number;
  message: string;
  hasError: boolean;
}
