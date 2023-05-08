import BaseButton from '@/components/common/BaseButton.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('BaseButton', () => {
  it('is mounted', () => {
    expect(BaseButton).toBeTruthy();
  });

  it('has correct attribute', () => {
    const wrapper = mount(BaseButton);
    const button = wrapper.find('button');
    expect(button.attributes().type).toBe('button');
  });
});
