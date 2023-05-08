import SkillsListItem from '@/components/courses/skills/SkillsListItem.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('SkillsListItem', () => {
  it('is mounted', () => {
    expect(SkillsListItem).toBeTruthy();
  });

  it('displays skill', () => {
    const skill = 'Aligning your goals with your motives';
    const wrapper = mount(SkillsListItem, {
      props: { skill },
    });
    const span = wrapper.find('span');
    expect(span.text()).toContain(skill);
  });
});
