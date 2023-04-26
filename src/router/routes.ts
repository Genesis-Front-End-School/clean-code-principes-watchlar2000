import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/course/:id',
    name: 'course',
    component: () => import('@/views/CourseView.vue'),
    meta: {
      title: 'Course',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/NotFoundView.vue'),
    props: true,
    meta: {
      title: '404',
    },
  },
] as Array<RouteRecordRaw>;