import SkillsList from '@/components/courses/skills/SkillsList.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('SkillsList', () => {
  it('is mounted', () => {
    expect(SkillsList).toBeTruthy();
  });

  it('renders unordered list', () => {
    const wrapper = mount(SkillsList);
    const list = wrapper.find('ul');
    expect(list.html()).toBeTruthy();
  });
});
