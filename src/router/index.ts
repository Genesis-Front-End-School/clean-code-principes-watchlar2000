import { isUserLoggedIn } from '@/api/auth';
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
  },
});

router.beforeEach(async (to, from, next) => {
  window.document.title = `${to.meta.title}`;
  const isLoggedIn = await isUserLoggedIn();

  if (!isLoggedIn) {
    next('/auth-failed');
  }

  next();
});

export default router;
