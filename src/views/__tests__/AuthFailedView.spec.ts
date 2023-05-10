import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AuthFailedView from '../AuthFailedView.vue';

describe('AuthFailedView', () => {
  it('displays corresponding text', () => {
    const wrapper = mount(AuthFailedView);
    expect(wrapper.text()).toContain('Failed to log in the user');
  });
});
