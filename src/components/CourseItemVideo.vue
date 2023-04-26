<script setup lang="ts">
import VideoPlayer from './VideoPlayer.vue';

defineProps<{
  source: string;
  poster: string;
  isSelectedLessonEmpty: boolean;
}>();
</script>

<template>
  <slot />
  <video-player
    :key="source"
    :src="source"
    :poster="poster"
    autoplay
    controls
  />
</template>
