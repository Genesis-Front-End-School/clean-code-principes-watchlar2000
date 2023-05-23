<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getTheme, setTheme } from './Lib';
import { ThemeIcon, ThemeMode } from './Lib/types';

const userTheme = ref<string | null>(null);

const toggleTheme = (): void => {
  userTheme.value === ThemeMode.Light ? setTheme(ThemeMode.Dark) : setTheme(ThemeMode.Light);
  userTheme.value = getTheme();
};

const icon = computed(() => {
  return userTheme.value === ThemeMode.Light ? ThemeIcon.Light : ThemeIcon.Dark;
});

onMounted(() => {
  userTheme.value = getTheme() ?? ThemeMode.Light;
  setTheme(userTheme.value);
});

defineExpose({ icon, toggleTheme, userTheme });
</script>

<template>
  <div class="icon" @click="toggleTheme">
    <span>
      {{ icon }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  position: relative;
  width: 40px;
  height: 40px;
  font-size: 24px;
  border-radius: 50%;
  background-color: var(--color-background-variant);
  align-self: center;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    background-color: var(--color-black-0);
  }
}

@media screen and (min-width: 576px) {
  .icon {
    width: 50px;
    height: 50px;
    font-size: 28px;
  }
}
</style>
