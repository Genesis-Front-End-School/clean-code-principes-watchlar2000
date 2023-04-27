<script setup lang="ts">
import { computed, ref } from 'vue';
import CourseItemHeader from './CourseItemHeader.vue';
import VideoPlayer from './VideoPlayer.vue';

const props = defineProps<{
  id: string;
  title: string;
  lessonsCount: number | string;
  rating: number | string;
  image: string;
  skills: string[];
  video: string;
}>();

const toCourse = computed(() => {
  return { name: 'course', params: { id: props.id } }
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

const imageSource = computed(() => `${props.image}/cover.webp`);
const areSkillsPresented = computed(() => props.skills.length !== 0)
</script>

<template>
  <div class="course-section">
    <course-item-header>
      <router-link :to="toCourse">{{
        title
      }}</router-link>
    </course-item-header>
    <video-player
      :src="video"
      :poster="imageSource"
      :autoplay="isVideoPlaying && isVideoSupported"
      @source-error="handleVideoError"
      @mouseenter="playVideo"
      @mouseleave="stopVideo"
    />
    <div class="course-category">
      <p class="category">{{ lessonsCount }} lessons</p>
      <p class="category">
        Rating: <span>{{ rating }}</span>
      </p>
    </div>
    <div
      v-if="areSkillsPresented"
      class="skills"
    >
      <h3 class="category title">Skills:</h3>
      <ul class="skills-list">
        <li
          v-for="(skill, idx) in skills"
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
