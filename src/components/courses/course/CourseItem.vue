<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCourseStore } from '../../../store/course';
import type { Lesson, LessonError } from '../../../types/Course';
import CourseItemHeader from '../course/CourseItemHeader.vue';
import CourseItemVideo from '../course/CourseItemVideo.vue';
import LessonsList from '../lessons/LessonsList.vue';
import LessonsListItem from '../lessons/LessonsListItem.vue';

const router = useRouter();
const courseStore = useCourseStore();
const { selectedCourse } = storeToRefs(courseStore);
const videoSrc = ref<string>(selectedCourse.value?.meta.courseVideoPreview?.link ?? '');
const videoPoster = ref<string>(`${selectedCourse.value?.previewImageLink}/cover.webp`);
const lessonError = ref<LessonError | null>(null);
const selectedLesson = ref<Lesson | null>(null);

const back = (): void => {
  router.go(-1);
};

const findLessonById = (id: string): Lesson | null => {
  return selectedCourse.value?.lessons?.find((lesson) => lesson.id === id) ?? null;
};

const clearLessonError = (): void => {
  lessonError.value = null;
};

const selectUnlockedLesson = (id: string): void => {
  const lesson = findLessonById(id);

  if (lesson) {
    const { link, previewImageLink, order } = lesson;
    selectedLesson.value = lesson;
    videoSrc.value = link;
    videoPoster.value = `${previewImageLink}/lesson-${order}.webp`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const selectLockedLesson = (id: string): void => {
  if (lessonError.value) {
    lessonError.value.message = 'This lesson is locked.';
    lessonError.value.lessonId = id;
  }
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
  return JSON.stringify(selectedLesson.value) === null;
});

const sortedLessons = computed(() => {
  const { lessons } = selectedCourse.value ?? { lessons: [] };
  return lessons?.sort((a, b) => a.order - b.order);
});
</script>

<template>
  <div v-if="selectedCourse" class="course-section">
    <button class="button-back" @click="back">
      <font-awesome-icon icon="arrow-left" />
      <span>Back</span>
    </button>
    <course-item-header>
      {{ selectedCourse.title }}
    </course-item-header>
    <course-item-video :source="videoSrc" :poster="videoPoster">
      <div v-if="!isSelectedLessonEmpty">
        <p>You are watching lesson #{{ selectedLesson?.order }}:</p>
        <span class="lesson-title">{{ selectedLesson?.title }}</span>
      </div>
    </course-item-video>
    <lessons-list>
      <lessons-list-item
        v-for="lesson in sortedLessons"
        :key="lesson.id"
        :lesson="lesson"
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
