import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('DefaultLayout', () => {
  it('is mounted', () => {
    expect(DefaultLayout).toBeTruthy();
  });

  it('shows main content', () => {
    const wrapper = shallowMount(DefaultLayout);
    const main = wrapper.find('main');
    expect(main.html()).toContain('main');
  });
});
