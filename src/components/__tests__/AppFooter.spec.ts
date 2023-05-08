import AppFooter from '@/components/layout/AppFooter.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

const currentYear = new Date().getFullYear();

describe('AppFooter', () => {
  it('should compute full year', () => {
    const wrapper = mount(AppFooter, {
      data() {
        return {
          fullYear: '2023',
        };
      },
    });
    expect(wrapper.vm.fullYear).toBe(currentYear);
  });
});
