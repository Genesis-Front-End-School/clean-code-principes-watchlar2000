import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseError from '../common/BaseError.vue';

describe('BaseError', () => {
  it('renders slot text when component is created', () => {
    const wrapper = mount(BaseError, {
      slots: {
        default: 'Bad request',
      },
    });
    expect(wrapper.text()).toMatch('Bad request');
  });

  it('renders default text when component is created without specified slot text', () => {
    const wrapper = mount(BaseError);
    expect(wrapper.text()).toMatch('There is an error');
  });
});
