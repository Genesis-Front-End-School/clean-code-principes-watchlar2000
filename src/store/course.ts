import { courseDataService } from '@/api/CourseDataService';
import type { Course } from '@/types/Course';
import type { CourseRootState } from '@/types/CourseRootState';
import { defineStore } from 'pinia';

enum Pagination {
  per_page = 10,
}

export const useCourseStore = defineStore('course', {
  state: () =>
  ({
    courses: [],
    detailedCourses: [],
    selectedCourse: null,
    page: 1,
    loading: true,
    error: false,
    errorMessage: '',
  } as CourseRootState),

  actions: {
    async loadCourses() {
      try {
        this.loading = true;
        const courses = await courseDataService.getCourses();
        this.courses = courses;
      } catch (e: unknown) {
        this.handleActionError(e);
      } finally {
        this.loading = false;
      }
    },
    async loadCourseById(id: string): Promise<Course | null> {
      try {
        this.loading = true;
        const course = await courseDataService.getCourseById(id);
        this.detailedCourses.push(course);
        return course;
      } catch (e: unknown) {
        this.handleActionError(e);
        return null;
      } finally {
        this.loading = false;
      }
    },
    async setDetailedCourseById(id: string): Promise<any> {
      const courseData = this.detailedCourses.find((course) => course.id === id);

      if (courseData !== undefined) {
        this.selectedCourse = courseData;
        return;
      }

      this.selectedCourse = await this.loadCourseById(id);
      return;
    },
    setInitPage(page: number) {
      this.page = page;
    },
    handleActionError(e: unknown) {
      const typedError = e as Error;
      this.error = true;
      this.errorMessage = typedError.message;
    },
  },

  getters: {
    paginateCourses(): Course[] {
      const coursesPerPage = Pagination.per_page;

      if (this.page === 1) {
        return this.courses?.slice(0, coursesPerPage);
      }

      const end = this.page * coursesPerPage;
      const start = end - coursesPerPage;

      return this.courses?.slice(start, end);
    },
    totalPages(): number {
      return Math.ceil(this.courses.length / Pagination.per_page);
    },
  },
});
