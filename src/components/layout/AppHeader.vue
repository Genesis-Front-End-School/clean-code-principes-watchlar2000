<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <header class="header">
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  align-self: center;
  justify-self: center;

  .title {
    font-size: 48px;
    font-family: 'Open Sans';
    font-weight: 700;
  }
}
</style>
