<script setup lang="ts">
import { useCourseStore } from '@/store/course';
import { Pagination } from '@/types/Course';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import BasePagination from './BasePagination.vue';
import CoursesListItem from './CoursesListItem.vue';

const courseStore = useCourseStore();
const { currentPage, getPaginatedCourses, getTotalPages } = storeToRefs(courseStore);

const router = useRouter();

const onPageChange = (page: number) => {
  courseStore.currentPage = page;
};

watch(currentPage, () => {
  router.replace({ query: { page: currentPage.value } });
});
</script>

<template>
  <div>
    <div class="course-grid">
      <div
        v-for="course in getPaginatedCourses"
        :key="course.id"
      >
        <courses-list-item :course="course" />
      </div>
    </div>
    <base-pagination
      :total-pages="getTotalPages"
      :per-page="Pagination.ItemsPerPage"
      :current-page="currentPage"
      :max-visible-buttons="Pagination.MaxVisibleButtons"
      @pagechange="onPageChange"
    />
  </div>
</template>

<style scoped lang="scss">
.course-grid {
  display: grid;
  grid-auto-rows: auto;
  gap: 32px;
  margin-bottom: 32px;
}

@media screen and (min-width: 992px) {
  .course-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1600px) {
  .course-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
