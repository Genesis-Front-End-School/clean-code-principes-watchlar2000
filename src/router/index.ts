import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0, behavior: 'smooth' };
    }
  }
});

router.beforeEach((to, from, next) => {
  window.document.title = `${to.meta.title}`;
  next();
});

export default router;
