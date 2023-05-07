<script setup lang="ts">
import BaseError from '@/components/common/BaseError.vue';
import BaseLoader from '@/components/common/BaseLoader.vue';
import CoursesList from '@/components/courses/CoursesList.vue';
import CoursesListItem from '@/components/courses/CoursesListItem.vue';
import BasePagination from '@/components/ui/pagination/PaginationBlock.vue';
import { useCourseStore, useErrorStore, useLoadingStore } from '@/store/_index';
import { Pagination } from '@/types/Course';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const courseStore = useCourseStore();
const { currentPage, getPaginatedCourses, getTotalPages } = storeToRefs(courseStore);
const { fetchCourses, courses, setInitPage } = courseStore;

const router = useRouter();

const onPageChange = (page: number) => {
  courseStore.currentPage = page;
};

watch(currentPage, () => {
  router.replace({ query: { page: currentPage.value } });
});

const errorStore = useErrorStore();
const { hasError, message } = storeToRefs(errorStore);

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);

const route = useRoute();
const page = route.query.page as string;

onMounted(() => {
  if (page !== undefined && page !== null) {
    setInitPage(+page);
  }

  if (courses.length === 0) {
    fetchCourses();
  }
});
</script>

<template>
  <base-loader v-if="isLoading" />
  <base-error v-else-if="hasError">
    {{ message }}
  </base-error>
  <div v-else>
    <courses-list>
      <courses-list-item
        v-for="course in getPaginatedCourses"
        :id="course.id"
        :key="course.title"
        :course="course"
        :title="course.title"
        :lessons-count="course.lessonsCount ?? 0"
        :rating="course.rating"
        :image="course.previewImageLink"
        :video="course.meta.courseVideoPreview?.link ?? ''"
        :skills="course.meta.skills ?? []"
      />
    </courses-list>
    <base-pagination
      :total-pages="getTotalPages"
      :per-page="Pagination.ItemsPerPage"
      :current-page="currentPage"
      :max-visible-buttons="Pagination.MaxVisibleButtons"
      @pagechange="onPageChange"
    />
  </div>
</template>
