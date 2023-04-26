<script setup lang="ts">
import BaseError from '@/components/BaseError.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import CourseItem from '@/components/CourseItem.vue';
import { useCourseStore, useErrorStore, useLoadingStore } from '@/store/_index';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const courseStore = useCourseStore();
const { setDetailedCourseById } = courseStore;

const errorStore = useErrorStore();
const { hasError } = storeToRefs(errorStore);

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);

const route = useRoute();

const id = route.params.id as string;

watchEffect(() => {
  setDetailedCourseById(id)
});
</script>

<template>
  <base-loader v-if="isLoading" />
  <base-error v-else-if="hasError">The course you are looking for is not existing.</base-error>
  <course-item v-else />
</template>
