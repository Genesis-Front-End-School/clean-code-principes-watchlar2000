<script setup lang="ts">
import { computed } from 'vue';
import AppFooter from './AppFooter.vue';
import AppHeader from './AppHeader.vue';

const fullYear = computed(() => {
  return new Date().getFullYear();
});

defineExpose({ fullYear });
</script>

<template>
  <div class="container">
    <app-header class="header" title="Courses app" />
    <main class="main">
      <slot />
    </main>
    <app-footer class="footer">
      <template #link>
        <a href="https://github.com/watchlar2000/courses-app.git" target="_black"
          >Source code on Github</a
        >
      </template>
      <template #message>
        &#169; Genesis Front-End School <span>{{ fullYear }}</span>
      </template>
    </app-footer>
  </div>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 125px auto 100px;
  grid-template-areas:
    'header'
    'main'
    'footer';
}

.header {
  grid-area: header;
}

.main {
  align-self: self-start;
  grid-area: main;
  display: grid;
  margin: 0 12px;
  height: 100%;
}

@media screen and (min-width: 576px) {
  .main {
    margin: 0 24px;
  }
}

.footer {
  grid-area: footer;
  align-items: center;
  align-self: center;
}
</style>
