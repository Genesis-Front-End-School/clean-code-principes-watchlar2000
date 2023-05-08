import type { IErrorRootState } from '@/types/RootState';
import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
  state: () =>
    ({
      message: '',
      hasError: false,
    } as IErrorRootState),
  actions: {
    setError(message: string): void {
      this.message = message;
      this.hasError = true;
    },
    clearError() {
      this.message = '';
      this.hasError = false;
    },
  },
});
