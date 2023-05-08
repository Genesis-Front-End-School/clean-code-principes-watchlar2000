<script setup lang="ts">
defineProps<{
  skill: string;
}>();
</script>

<template>
  <li>
    <font-awesome-icon icon="check" class="icon" />
    <span>
      {{ skill }}
    </span>
  </li>
</template>
