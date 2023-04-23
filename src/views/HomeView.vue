<script setup lang="ts">
import BaseError from '@/components/BaseError.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import CoursesList from '@/components/CoursesList.vue';
import { useCourseStore } from '@/store/course';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const courseStore = useCourseStore();
const { loading, error, errorMessage } = storeToRefs(courseStore);
const { loadCourses, courses, setInitPage } = courseStore;
const route = useRoute();

onMounted(() => {
  const page = route.query.page as string;

  if (page !== undefined && page !== null) {
    setInitPage(+page);
  }

  if (courses.length === 0) {
    loadCourses();
  }
});
</script>

<template>
  <div>
    <base-loader v-if="loading" />
    <base-error v-else-if="error">{{ errorMessage }}</base-error>
    <courses-list v-else />
  </div>
</template>
