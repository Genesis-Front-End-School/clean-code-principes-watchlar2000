import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false as boolean,
  }),
  actions: {
    startLoading(): void {
      this.isLoading = true;
    },
    stopLoading(): void {
      this.isLoading = false;
    },
  },
});
