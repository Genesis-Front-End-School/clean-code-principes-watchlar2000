<script setup lang="ts">
import { computed, ref } from 'vue';
import VideoPlayer from '../ui/video-player/VideoPlayer.vue';
import CourseItemHeader from './course/CourseItemHeader.vue';
import SkillsList from './skills/SkillsList.vue';
import SkillsListItem from './skills/SkillsListItem.vue';

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
      <router-link :to="toCourse">
        {{
          title
        }}
      </router-link>
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
      <p class="category">
        {{ lessonsCount }} lessons
      </p>
      <p class="category">
        Rating: <span>{{ rating }}</span>
      </p>
    </div>
    <div
      v-if="areSkillsPresented"
      class="skills"
    >
      <h3 class="category title">
        Skills:
      </h3>
      <skills-list>
        <skills-list-item
          v-for="(skill) in skills"
          :key="skill"
          :skill="skill"
        />
      </skills-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.course-section {
  height: 100%;
  transition: all 0.1s ease;
}
</style>
