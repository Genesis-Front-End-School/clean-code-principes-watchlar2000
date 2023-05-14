<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import CourseDetailsCard from '../../Entities/CourseDetailsCard';
import BaseError from '../../Shared/Error';
import BaseLoader from '../../Shared/Loader';
import { useCourseStore } from '../../Store';
import CourseDetails from '../../Widgets/CourseDetails';

const courseStore = useCourseStore();
const { setDetailedCourseById } = courseStore;
const { selectedCourse, error } = storeToRefs(courseStore);

const route = useRoute();

const id = route.params.id as string;

watchEffect(() => {
  setDetailedCourseById(id);
});
</script>

<template>
  <base-loader v-if="!selectedCourse" />
  <base-error v-else-if="error"> The course you are looking for is not existing. </base-error>
  <course-details v-else>
    <course-details-card :course="selectedCourse" />
  </course-details>
</template>
