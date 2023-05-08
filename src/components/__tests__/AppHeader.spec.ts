import AppHeader from '@/components/layout/AppHeader.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('AppHeader', () => {
  it('is mounted', () => {
    expect(AppHeader).toBeTruthy();
  });

  it('displays title prop', () => {
    const title = 'Courses App';
    const wrapper = mount(AppHeader, {
      props: { title },
    });
    const wrapperHeader = wrapper.find('h1');
    expect(wrapperHeader.text()).toContain(title);
  });
});
