import PaginationBlock from '@/components/ui/pagination/PaginationBlock.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

const mockProps = {
  maxVisibleButtons: 3,
  totalPages: 3,
  perPage: 9,
  currentPage: 2,
};

describe('PaginationBlock', () => {
  it('is mounted', () => {
    expect(PaginationBlock).toBeTruthy();
  });

  it('displays actual page which is equal to current page prop', () => {
    const wrapper = mount(PaginationBlock, {
      props: mockProps,
    });
    expect(wrapper.vm.actualPage).toBe(mockProps.currentPage);
  });

  it('next button increments actual page by 1', async () => {
    const wrapper = mount(PaginationBlock, {
      props: mockProps,
    });

    await wrapper.vm.onClickNextPage();
    expect(wrapper.vm.actualPage).toBe(mockProps.currentPage + 1);
  });

  it('previous button decrements actual page by 1', async () => {
    const wrapper = mount(PaginationBlock, {
      props: mockProps,
    });

    await wrapper.vm.onClickPreviousPage();
    expect(wrapper.vm.actualPage).toBe(mockProps.currentPage - 1);
  });

  it('first button sets actual page to 1', async () => {
    const wrapper = mount(PaginationBlock, {
      props: mockProps,
    });

    await wrapper.vm.onClickFirstPage();
    expect(wrapper.vm.actualPage).toBe(1);
  });

  it(`last button sets actual page to ${mockProps.totalPages}`, async () => {
    const wrapper = mount(PaginationBlock, {
      props: mockProps,
    });

    await wrapper.vm.onClickLastPage();
    expect(wrapper.vm.actualPage).toBe(mockProps.totalPages);
  });

  it(`onClickPage sets actual page to the required page`, async () => {
    const wrapper = mount(PaginationBlock, {
      props: mockProps,
    });

    await wrapper.vm.onClickPage(4);
    expect(wrapper.vm.actualPage).toBe(4);
  });
});
