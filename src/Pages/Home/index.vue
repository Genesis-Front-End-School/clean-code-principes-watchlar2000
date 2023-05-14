<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CourseCard from '../../Entities/CourseCard';
import PaginationFeature from '../../Features/Pagination';
import BaseError from '../../Shared/Error';
import BaseLoader from '../../Shared/Loader';
import { useCourseStore } from '../../Store';
import { Pagination } from '../../Types/Course';
import CourseList from '../../Widgets/CourseList';

const courseStore = useCourseStore();
const { currentPage, getPaginatedCourses, getTotalPages, error, errorMessage } =
  storeToRefs(courseStore);
const { fetchCourses, courses, setInitPage } = courseStore;

const router = useRouter();

const onPageChange = (page: number) => {
  courseStore.currentPage = page;
};

watch(currentPage, () => {
  router.replace({ query: { page: currentPage.value } });
});

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
  <base-loader v-if="getPaginatedCourses.length === 0" />
  <base-error v-else-if="error">
    {{ errorMessage }}
  </base-error>
  <div v-else>
    <course-list>
      <course-card
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
    </course-list>
    <pagination-feature
      :total-pages="getTotalPages"
      :per-page="Pagination.ItemsPerPage"
      :current-page="currentPage"
      :max-visible-buttons="Pagination.MaxVisibleButtons"
      @pagechange="onPageChange"
    />
  </div>
</template>
