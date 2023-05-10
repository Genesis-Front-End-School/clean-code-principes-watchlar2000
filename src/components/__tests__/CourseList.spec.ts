import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CoursesList from '../courses/CoursesList.vue';

describe('CoursesList', () => {
  it('renders course items when component is created', () => {
    const wrapper = mount(CoursesList, {
      slots: {
        default: `
          <h2>Test course</h2>
          <h2>Another test course</h2>
        `,
      },
    });
    const courseItems = wrapper.findAll('h2');
    expect(courseItems[0].html()).toMatch('Test course');
    expect(courseItems[1].html()).toMatch('Another test course');
  });
});
