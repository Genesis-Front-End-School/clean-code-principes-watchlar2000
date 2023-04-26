<script setup lang="ts">
import BaseError from '@/components/BaseError.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import CoursesList from '@/components/CoursesList.vue';
import { useCourseStore, useErrorStore, useLoadingStore } from '@/store/_index';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const courseStore = useCourseStore();
const { fetchCourses, courses, setInitPage } = courseStore;

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
  <div>
    <base-loader v-if="isLoading" />
    <base-error v-else-if="hasError">{{ message }}</base-error>
    <courses-list v-else />
  </div>
</template>
