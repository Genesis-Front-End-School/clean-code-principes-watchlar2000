<script setup lang="ts">
import type { Course } from '@/types/Course';
import { computed } from 'vue';

const props = defineProps<{
  course: Course;
}>();

const toCourse = computed(() => {
  return { name: 'course', params: { id: props.course.id } }
});

const titleImgSrc = computed(() => `${props.course.previewImageLink}/cover.webp`);

const areSkillsPresented = computed(() => props.course.meta.skills !== undefined);
</script>

<template>
  <div class="course-section">
    <h2 class="title">
      <router-link :to="toCourse">{{
        props.course.title
      }}</router-link>
    </h2>
    <img
      :src="titleImgSrc"
      :alt="props.course.title"
    />
    <div class="course-category">
      <p class="category">{{ course.lessonsCount }} lessons</p>
      <p class="category">
        Rating: <span>{{ course.rating }}</span>
      </p>
    </div>
    <div
      v-show="areSkillsPresented"
      class="skills"
    >
      <h4 class="category">Skills:</h4>
      <ul class="skills-list">
        <li
          v-for="(skill, idx) in course.meta.skills"
          :key="idx + skill"
        >
          <font-awesome-icon
            icon="check"
            class="icon"
          /> {{ skill }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.course-section {
  height: 100%;
  transition: all 0.1s ease;
}

.video-player {
  min-width: 370px;
  min-height: 160px;
}
</style>
