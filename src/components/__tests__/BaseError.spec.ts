import BaseError from '@/components/common/BaseError.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('BaseError', () => {
  it('displays loading text', () => {
    const wrapper = mount(BaseError);
    const title = wrapper.find('h2');
    expect(title.text()).toContain('Oops...');
  });
});
