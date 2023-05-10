import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SkillsListItem from '../courses/skills/SkillsListItem.vue';

describe('SkillsListItem', () => {
  it('displays skill', () => {
    const skill = 'Aligning your goals with your motives';
    const wrapper = shallowMount(SkillsListItem, {
      props: { skill },
      global: {
        stubs: ['font-awesome-icon'],
      },
    });
    const span = wrapper.find('span');
    expect(span.text()).toContain(skill);
  });
});
