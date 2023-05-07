<script setup lang="ts">
defineProps<{
  skill: string;
}>();
</script>

<template>
  <li>
    <font-awesome-icon
      icon="check"
      class="icon"
    /> {{ skill }}
  </li>
</template>
