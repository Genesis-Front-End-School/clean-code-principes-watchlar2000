<script setup lang="ts">
import BaseError from '@/components/BaseError.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import CourseItem from '@/components/CourseItem.vue';
import { useCourseStore } from '@/store/course';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const courseStore = useCourseStore();
const { loading, error } = storeToRefs(courseStore);
const { setDetailedCourseById } = courseStore;
const route = useRoute();

const id = route.params.id as string;

watchEffect(() => {
  setDetailedCourseById(id)
});
</script>

<template>
  <div>
    <base-loader v-if="loading" />
    <base-error v-else-if="error">The course you are looking for is not existing.</base-error>
    <course-item v-else />
  </div>
</template>
