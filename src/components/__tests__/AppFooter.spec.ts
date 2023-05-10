import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppFooter from '../layout/AppFooter.vue';

describe('AppFooter', () => {
  const slots = {
    message: 'Genesis FE School',
    link: '<a href="https://github.com/watchlar2000/courses-app.git">Source code on Github</a>',
  };

  it('renders message when component is created', () => {
    const wrapper = shallowMount(AppFooter, {
      slots,
    });
    expect(wrapper.text()).toMatch('Genesis FE School');
  });

  it('renders default text when component is created without specified message slot', () => {
    const wrapper = shallowMount(AppFooter);
    expect(wrapper.text()).toMatch('Default footer');
  });

  it('renders link when component is created', () => {
    const wrapper = shallowMount(AppFooter, {
      slots,
    });
    const link = wrapper.find('a');
    expect(link.text()).toMatch('Source code on Github');
  });
});
