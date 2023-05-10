<script setup lang="ts">
import VideoPlayer from '../../ui/video-player/VideoPlayer.vue';

defineProps<{
  source: string;
  poster: string;
}>();
</script>

<template>
  <slot />
  <video-player :key="source" :src="source" :poster="poster" aytoplay controls />
</template>
