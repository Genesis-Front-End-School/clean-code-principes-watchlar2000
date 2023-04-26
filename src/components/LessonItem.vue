<script setup lang="ts">
import type { LessonError, LessonStatus } from '@/types/Course';
import { computed } from 'vue';

const emit = defineEmits<{
  (e: 'select', id: string): void;
}>();

const props = defineProps<{
  // lesson: Lesson;
  id: string;
  title: string;
  order: number;
  status: LessonStatus;
  error: LessonError | Record<string, string>;
}>();

const onSelect = (): void => {
  emit('select', props.id);
};

const isLessonLocked = computed(() => props.status === 'locked');

const displayError = computed(() => props.error.message && props.error.lessonId === props.id);
</script>

<template>
  <li
    :class="{
      locked: isLessonLocked,
    }"
    class="lesson"
  >
    <h3 class="title">
      <font-awesome-icon
        v-if="isLessonLocked"
        icon="lock"
        class="lesson-chip"
      />
      Lesson {{ order }}: {{ title }}
    </h3>
    <p
      v-if="displayError"
      class="error"
    >
      This lesson is locked
    </p>
    <button
      :class="{
          disabled: status === 'locked',
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
}</style>
