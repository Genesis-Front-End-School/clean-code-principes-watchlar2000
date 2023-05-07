<script setup lang="ts">
import { Pagination } from '@/types/Course';
import { computed, ref, watch } from 'vue';
import PaginationButton from './PaginationButton.vue';

interface BasePaginationProps {
  maxVisibleButtons: number;
  totalPages: number;
  perPage: number;
  currentPage: number;
}

const props = withDefaults(defineProps<BasePaginationProps>(), {
  maxVisibleButtons: Pagination.MaxVisibleButtons,
  perPage: Pagination.ItemsPerPage,
  currentPage: Pagination.CurrentPage,
});

const actualPage = ref<number>(props.currentPage);

const startPage = computed(() => {
  if (isFirstPage.value) {
    return 1;
  }

  if (isLastPage.value) {
    return props.maxVisibleButtons;
  }

  return actualPage.value - 1;
});

const isPageActive = (page: number) => {
  return actualPage.value === page;
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
      isDisabled: i === actualPage.value,
    });
  }

  return range;
});

const isFirstPage = computed(() => {
  return actualPage.value === 1;
});

const isLastPage = computed(() => {
  return actualPage.value === props.totalPages;
});

const emit = defineEmits<{
  (e: 'pagechange', page: number): void;
}>();

const onClickFirstPage = () => {
  actualPage.value = 1;
};

const onClickPreviousPage = () => {
  actualPage.value = actualPage.value - 1;
};

const onClickPage = (page: number) => {
  actualPage.value = page;
};

const onClickNextPage = () => {
  actualPage.value = actualPage.value + 1;
};

const onClickLastPage = () => {
  actualPage.value = props.totalPages;
};

watch(actualPage, (newPage) => {
  emit('pagechange', newPage);
});
</script>

<template>
  <div class="pagination">
    <pagination-button
      :disabled="isFirstPage"
      @click="onClickFirstPage"
    >
      First
    </pagination-button>
    <pagination-button
      :disabled="isFirstPage"
      @click="onClickPreviousPage"
    >
      Prev
    </pagination-button>
    <pagination-button
      v-for="(page, idx) in pages"
      :key="idx"
      :disabled="page.isDisabled"
      :class="{ active: isPageActive(page.name) }"
      @click="onClickPage(page.name)"
    >
      {{ page.name }}
    </pagination-button>
    <pagination-button
      :disabled="isLastPage"
      @click="onClickNextPage"
    >
      Next
    </pagination-button>
    <pagination-button
      :disabled="isLastPage"
      @click="onClickLastPage"
    >
      Last
    </pagination-button>
  </div>
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
