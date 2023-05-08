import BaseLoader from '@/components/common/BaseLoader.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('BaseLoader', () => {
  it('is mounted', () => {
    expect(BaseLoader).toBeTruthy();
  });

  it('dispays loading text', () => {
    const wrapper = mount(BaseLoader);
    const paragraph = wrapper.find('p');
    expect(paragraph.html()).toContain('Loading');
  });
});
