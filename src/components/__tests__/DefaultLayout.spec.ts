import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DefaultLayout from '../layout/DefaultLayout.vue';

const currentYear = new Date().getFullYear();

describe('DefaultLayout', () => {
  it('renders the page', () => {
    const wrapper = mount(DefaultLayout);

    const main = wrapper.find('main');

    expect(wrapper.getComponent({ name: 'app-header' }).exists()).toBeTruthy();
    expect(wrapper.getComponent({ name: 'app-footer' }).exists()).toBeTruthy();
    expect(main).toBeTruthy();
  });

  it('computes current year when component is created', () => {
    const wrapper = shallowMount(DefaultLayout);
    expect(wrapper.vm.fullYear).toBe(currentYear);
  });
});
