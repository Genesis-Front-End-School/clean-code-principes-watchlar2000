import { api } from '@/api/api';
import type { Course } from '@/types/Course';
import { Pagination } from '@/types/Course';
import type { ICourseRootState } from '@/types/RootState';
import { defineStore } from 'pinia';
import { useErrorStore } from './error';
import { useLoadingStore } from './loading';

export const useCourseStore = defineStore('course', {
  state: () =>
  ({
    courses: [],
    cashedCoursesDetails: [] as Course[],
    selectedCourse: null,
    currentPage: 1,
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
      const errorStore = useErrorStore();
      const typedError = e as Error;
      errorStore.setError(typedError.message);
    },
    resetErrors(): void {
      const errorStore = useErrorStore();
      errorStore.clearError();
    },
    startLoading(): void {
      const loadingStore = useLoadingStore();
      loadingStore.startLoading();
    },
    stopLoading(): void {
      const loadingStore = useLoadingStore();
      loadingStore.stopLoading();
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
