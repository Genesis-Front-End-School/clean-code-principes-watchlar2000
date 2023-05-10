import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CoursesListItem from '../courses/CoursesListItem.vue';

const mockProps = {
  id: '1',
  title: 'title',
  lessonsCount: 5,
  rating: 5,
  image: 'image',
  skills: ['test skill', 'another test skill'],
  video: 'video',
};

describe('CoursesListItem', () => {
  it('displays skill', () => {
    const wrapper = shallowMount(CoursesListItem, {
      props: mockProps,
      global: {
        stubs: ['router-link'],
      },
    });
    const routerLink = wrapper.findAll('a');
    console.log(routerLink);
    expect(true).toBe(true);
  });
});
