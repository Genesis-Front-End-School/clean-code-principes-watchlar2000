<script setup lang="ts">
import HeaderLogo from './Ui/Logo';

defineProps<{
  title: string;
}>();
</script>

<template>
  <header class="header">
    <header-logo>{{ title }}</header-logo>
  </header>
</template>

<style lang="scss" scoped>
.header {
  align-self: center;
  justify-self: center;
}
</style>
