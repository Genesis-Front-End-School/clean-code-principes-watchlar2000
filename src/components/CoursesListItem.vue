<script setup lang="ts">
import type { Course } from '@/types/Course';
import { computed, ref } from 'vue';
import CourseItemHeader from './CourseItemHeader.vue';
import VideoPlayer from './VideoPlayer.vue';

const props = defineProps<{
  course: Course;
}>();

const toCourse = computed(() => {
  return { name: 'course', params: { id: props.course.id } }
});

const isVideoPlaying = ref<boolean>(false);
const isVideoSupported = ref<boolean>(true);

function playVideo() {
  isVideoPlaying.value = true;
}

function stopVideo() {
  isVideoPlaying.value = false;
}

function handleVideoError() {
  isVideoSupported.value = false;
}

const titleImgSrc = computed(() => `${props.course.previewImageLink}/cover.webp`);

const areSkillsPresented = computed(() => props.course.meta.skills !== undefined);

const videoSrc = computed(() => props.course.meta.courseVideoPreview?.link ?? '');
</script>

<template>
  <div class="course-section">
    <course-item-header>
      <router-link :to="toCourse">{{
        props.course.title
      }}</router-link>
    </course-item-header>
    <video-player
      v-if="isVideoSupported"
      :src="videoSrc"
      :poster="titleImgSrc"
      :autoplay="isVideoPlaying"
      @source-error="handleVideoError"
      @mouseenter="playVideo"
      @mouseleave="stopVideo"
    />
    <img
      v-if="!isVideoSupported"
      :src="`${props.course.previewImageLink}/cover.webp`"
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
</style>
