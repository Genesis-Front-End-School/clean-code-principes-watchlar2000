<script setup lang="ts">
import { useCourseStore } from '@/store/course';
import type { Lesson, LessonError } from '@/types/Course';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import CourseItemHeader from './CourseItemHeader.vue';
import CourseItemVideo from './CourseItemVideo.vue';
import LessonsList from './LessonsList.vue';
import LessonsListItem from './LessonsListItem.vue';

const router = useRouter();
const courseStore = useCourseStore();
const { selectedCourse } = storeToRefs(courseStore);
const videoSrc = ref<string>(selectedCourse.value?.meta.courseVideoPreview?.link ?? '');
const videoPoster = ref<string>(`${selectedCourse.value?.previewImageLink}/cover.webp`);
const lessonError = ref<LessonError | Record<string, string>>({});
const selectedLesson = ref<Lesson | Record<string, string>>({});

const back = (): void => {
  router.go(-1);
};

const findLessonById = (id: string): Lesson | null => {
  return selectedCourse.value?.lessons?.find(lesson => lesson.id === id) ?? null;
}

const clearLessonError = (): void => {
  lessonError.value = {};
}

const selectUnlockedLesson = (id: string): void => {
  const lesson = findLessonById(id);

  if (lesson !== null) {
    const { link, previewImageLink, order } = lesson;
    selectedLesson.value = lesson;
    videoSrc.value = link;
    videoPoster.value = `${previewImageLink}/lesson-${order}.webp`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const selectLockedLesson = (id: string): void => {
  lessonError.value.message = 'This lesson is locked.';
  lessonError.value.lessonId = id;
};

const selectLesson = (id: string): void => {
  clearLessonError();
  const lesson = findLessonById(id);

  if (lesson?.status !== 'locked') {
    selectUnlockedLesson(id);
  } else {
    selectLockedLesson(id);
  }
};

const isSelectedLessonEmpty = computed(() => {
  return JSON.stringify(selectedLesson.value) === '{}';
});

const sortedLessons = computed(() => {
  const { lessons } = selectedCourse.value ?? { lessons: [] };
  return lessons?.sort((a, b) => a.order - b.order);
});
</script>

<template>
  <div
    class="course-section"
    v-if="selectedCourse"
  >
    <button
      @click="back"
      class="button-back"
    >
      <font-awesome-icon icon="arrow-left" />
      <span>Back</span>
    </button>
    <course-item-header>
      {{ selectedCourse.title }}
    </course-item-header>
    <course-item-video
      :source="videoSrc"
      :poster="videoPoster"
      :isSelectedLessonEmpty="isSelectedLessonEmpty"
    >
      <div v-if="!isSelectedLessonEmpty">
        <p>You are watching lesson #{{ selectedLesson.order }}:</p>
        <span class="lesson-title">{{ selectedLesson.title }}</span>
      </div>
    </course-item-video>
    <lessons-list>
      <lessons-list-item
        v-for="lesson in sortedLessons"
        :key="lesson.id"
        :id="lesson.id"
        :title="lesson.title"
        :order="lesson.order"
        :status="lesson.status"
        :error="lessonError"
        @select="selectLesson"
      />
    </lessons-list>
  </div>
</template>

<style scoped lang="scss">
.course-section {
  max-width: 850px;
  width: 100%;
  margin-inline: auto;
}

.lesson-title {
  font-weight: 600;
}

.button-back {
  background-color: transparent;
  padding: 0;
}
</style>
