import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppHeader from '../layout/AppHeader.vue';

describe('AppHeader', () => {
  it('displays title when component is created', () => {
    const wrapper = shallowMount(AppHeader, {
      props: { title: 'Courses App' },
    });
    const wrapperHeader = wrapper.find('h1');
    expect(wrapperHeader.text()).toMatch('Courses App');
  });
});
