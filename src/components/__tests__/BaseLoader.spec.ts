import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseLoader from '../common/BaseLoader.vue';

describe('BaseLoader', () => {
  it('dispays loading text', () => {
    const wrapper = shallowMount(BaseLoader);
    const paragraph = wrapper.find('p');
    expect(paragraph.html()).toContain('Loading');
  });
});
