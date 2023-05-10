import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SkillsList from '../courses/skills/SkillsList.vue';

describe('SkillsList', () => {
  it('renders slot list items when component is created', () => {
    const wrapper = mount(SkillsList, {
      slots: {
        default: `
          <li>Test skill 1</li>
          <li>Test skill 2</li>
        `,
      },
    });
    const listItems = wrapper.findAll('li');
    expect(listItems[0].html()).toMatch('Test skill 1');
    expect(listItems[1].html()).toMatch('Test skill 2');
  });

  it('renders unordered list', () => {
    const wrapper = shallowMount(SkillsList);
    const list = wrapper.find('ul');
    expect(list.html()).toBeTruthy();
  });
});
