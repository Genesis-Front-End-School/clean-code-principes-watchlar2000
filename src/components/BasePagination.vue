<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  maxVisibleButtons: number;
  totalPages: number;
  perPage: number;
  currentPage: number;
}>();

const startPage = computed(() => {
  if (isFirstPage.value) {
    return 1;
  }

  if (isLastPage.value) {
    return props.maxVisibleButtons;
  }

  return props.currentPage - 1;
});

const isPageActive = (page: number) => {
  return props.currentPage === page;
};

const pages = computed(() => {
  const range = [];
  let initPage = startPage.value;

  if (startPage.value === props.maxVisibleButtons) {
    initPage = 1;
  }

  for (
    let i = initPage;
    i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage,
    });
  }

  return range;
});

const isFirstPage = computed(() => {
  return props.currentPage === 1;
});

const isLastPage = computed(() => {
  return props.currentPage === props.totalPages;
});

const emit = defineEmits<{
  (e: 'pagechange', page: number): void;
}>();

const onClickFirstPage = () => {
  emit('pagechange', 1);
};

const onClickPreviousPage = () => {
  const prevPage = props.currentPage - 1;
  emit('pagechange', prevPage);
};

const onClickPage = (page: number) => {
  emit('pagechange', page);
};

const onClickNextPage = () => {
  const nextPage = props.currentPage + 1;
  emit('pagechange', nextPage);
};

const onClickLastPage = () => {
  emit('pagechange', props.totalPages);
};
</script>

<template>
  <ul class="pagination">
    <li>
      <button
        :disabled="isFirstPage"
        type="button"
        @click="onClickFirstPage"
      >First</button>
    </li>
    <li>
      <button
        :disabled="isFirstPage"
        type="button"
        @click="onClickPreviousPage"
      >Prev</button>
    </li>
    <li
      v-for="(page, idx) in pages"
      :key="idx"
    >
      <button
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        type="button"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>
    <li>
      <button
        :disabled="isLastPage"
        type="button"
        @click="onClickNextPage"
      >Next</button>
    </li>
    <li>
      <button
        :disabled="isLastPage"
        type="button"
        @click="onClickLastPage"
      >Last</button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.pagination {
  font-size: 16px;
  display: flex;
  gap: 12px;
  justify-content: center;

  .active {
    background-color: var(--primary);
    color: var(--color-background-secondary);
  }
}

@media screen and (min-width: 576px) {
  .pagination {
    font-size: 20px;
  }
}
</style>
