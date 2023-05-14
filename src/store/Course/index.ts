import type { Course } from '@/Types/Course';
import { Pagination } from '@/Types/Course';
import type { ICourseRootState } from '@/Types/RootState';
import { defineStore } from 'pinia';
import { api } from '../Api';

export const useCourseStore = defineStore('course', {
  state: () =>
    ({
      courses: [],
      cashedCoursesDetails: [] as Course[],
      selectedCourse: null,
      currentPage: 1,
      loading: false,
      error: false,
      errorMessage: '',
    } as ICourseRootState),

  actions: {
    async fetchCourses() {
      this.startLoading();

      try {
        const courses = await api.getCourses();
        this.courses = courses;
        this.resetErrors();
      } catch (e: unknown) {
        this.handleError(e);
      } finally {
        this.stopLoading();
      }
    },
    async fetchCourseById(id: string): Promise<Course | null> {
      this.startLoading();

      try {
        const course = await api.getCourseById(id);
        this.cashedCoursesDetails.push(course);
        this.resetErrors();
        return course;
      } catch (e: unknown) {
        this.handleError(e);
        return null;
      } finally {
        this.stopLoading();
      }
    },
    async setDetailedCourseById(id: string): Promise<void> {
      const courseData = this.getCashedCourse(id);

      if (courseData !== null) {
        this.selectedCourse = courseData;
      } else {
        this.selectedCourse = await this.fetchCourseById(id);
      }
    },
    getCashedCourse(id: string): Course | null {
      const courseData = this.cashedCoursesDetails.find((course) => course.id === id) || null;
      return courseData;
    },
    setInitPage(page: number): void {
      this.currentPage = page || 1;
    },
    handleError(e: unknown): void {
      const typedError = e as Error;
      this.error = true;
      this.errorMessage = typedError.message;
    },
    resetErrors(): void {
      this.error = false;
      this.errorMessage = '';
    },
    startLoading(): void {
      this.loading = true;
    },
    stopLoading(): void {
      this.loading = false;
    },
  },

  getters: {
    getPaginatedCourses(): Course[] {
      const startIndex = (this.currentPage - 1) * Pagination.ItemsPerPage;
      return this.courses.slice(startIndex, startIndex + Pagination.ItemsPerPage);
    },
    getTotalPages(): number {
      return Math.ceil(this.courses.length / Pagination.ItemsPerPage);
    },
  },
});
