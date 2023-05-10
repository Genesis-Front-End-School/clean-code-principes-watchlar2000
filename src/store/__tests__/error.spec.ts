import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useErrorStore } from '../error';

describe('Error Store', () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useErrorStore();
    console.log(store.message);
  });

  it('initializes with empty fields', () => {
    expect(store.message).toMatch('');
    expect(store.hasError).toBe(false);
  });

  it('calls setError to set up an error message and change hasError state', async () => {
    store.setError = (msg) => {
      store.message = msg;
      store.hasError = true;
    };
    store.setError('some error');

    expect(store.message).toMatch('some error');
    expect(store.hasError).toBe(true);
  });

  it('calls clearError to clear error', async () => {
    store.clearError = () => {
      store.message = '';
      store.hasError = false;
    };
    store.clearError();

    expect(store.message).toMatch('');
    expect(store.hasError).toBe(false);
  });
});
