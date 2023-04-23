import type { Course } from './Course';

export type CourseRootState = {
  courses: Course[];
  detailedCourses: Course[];
  selectedCourse: Course | null;
  page: number;
  loading: boolean;
  error: boolean;
  errorMessage: string;
};
