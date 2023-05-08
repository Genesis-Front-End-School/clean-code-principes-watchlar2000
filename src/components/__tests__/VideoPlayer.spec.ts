import VideoPlayer from '@/components/ui/video-player/VideoPlayer.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('VideoPlayer', () => {
  it('is mounted', () => {
    expect(VideoPlayer).toBeTruthy();
  });

  it(`emits an error`, async () => {
    const wrapper = mount(VideoPlayer);
    await wrapper.vm.onError();
    expect(wrapper.emitted()).toBeTruthy();
  });
});
