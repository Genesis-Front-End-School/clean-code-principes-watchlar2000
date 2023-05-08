import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import SkillsListItem from './SkillsListItem.vue';

describe('SkillsListItem', () => {
  it('displays props properly', () => {
    const wrapper = mount(SkillsListItem, {
      props: { skill: 'Aligning your goals with your motives' },
    });
    expect(wrapper.text()).toContain('Aligning your goals with your motives');
  });
});
