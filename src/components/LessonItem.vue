<script setup lang="ts">
import type { Lesson, LessonError } from '@/types/Course';
import { computed } from 'vue';

const emit = defineEmits<{
  (e: 'select', lesson: Lesson): void;
}>();

const props = defineProps<{
  lesson: Lesson;
  error: LessonError | Record<string, string>;
}>();

const onSelect = (): void => {
  emit('select', props.lesson);
};

const isLessonLocked = computed(() => props.lesson.status === 'locked');

const displayError = computed(() => props.error.message && props.error.lessonId === props.lesson.id);
</script>

<template>
  <li
    :class="{
      locked: isLessonLocked,
    }"
    class="lesson"
  >
    <h3 class="title">
      <font-awesome-icon v-if="isLessonLocked" icon="lock" class="lesson-chip" />
      Lesson {{ lesson.order }}: {{ lesson.title }}
    </h3>
    <p v-if="displayError" class="error">
      This lesson is locked
    </p>
    <button
      :class="{
        disabled: lesson.status === 'locked',
      }"
      @click="onSelect()"
      class="button-play"
    >
      <span>Play the video</span>
      <font-awesome-icon icon="play" />
    </button>
  </li>
</template>

<style lang="scss" scoped>
.lesson {
  padding: 18px;
  background-color: var(--color-background-alt);

  .title {
    font-size: 18px;
    color: var(--color-text);
  }
}

.button-play {
  margin-top: 14px;
}
.disabled {
  cursor: not-allowed;

  &:hover {
    color: inherit;
  }
}

.lesson-chip {
  margin-right: 8px;
}

.error {
  color: var(--color-danger);
  font-size: 18px;
  margin-top: 14px;
}
</style>
