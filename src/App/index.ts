import VueVideoPlayer from '@videojs-player/vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import FontAwesomeIcon from '../Shared/Icons';
import { router } from './Providers/router';
import App from './index.vue';

export const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(VueVideoPlayer);
