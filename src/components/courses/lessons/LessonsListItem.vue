<script setup lang="ts">
import { computed } from 'vue';
import type { Lesson, LessonError } from '../../../types/Course';

const emit = defineEmits<{
  (e: 'select', id: string): void;
}>();

const props = defineProps<{
  error: LessonError | null;
  lesson: Lesson;
}>();

const onSelect = (): void => {
  emit('select', props.lesson.id);
};

const isLessonLocked = computed(() => props.lesson.status === 'locked');

const displayError = computed(
  () => props.error?.message && props.error?.lessonId === props.lesson.id,
);
</script>

<template>
  <div
    :class="{
      locked: isLessonLocked,
    }"
    class="lesson"
  >
    <h3 class="title">
      <font-awesome-icon v-if="isLessonLocked" icon="lock" class="lesson-chip" />
      Lesson {{ lesson.order }}: {{ lesson.title }}
    </h3>
    <p v-if="displayError && props.error" class="error">This lesson is locked</p>
    <button
      :class="{
        disabled: lesson.status === 'locked',
      }"
      class="button-play"
      @click="onSelect"
    >
      <span>Play the video</span>
      <font-awesome-icon icon="play" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.lesson {
  width: 100%;
  padding: 18px;
  background-color: var(--color-background-alt);

  .title {
    font-family: 'Open Sans';
    font-size: 20px;
    color: var(--color-text);
    line-height: 1.2;
    font-weight: 600;
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
