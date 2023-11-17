import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/pixi'
    },
    {
      path: '/pixi',
      name: 'pixi',
      component: () => import('../views/PixiView.vue')
    }
  ]
});

export default router;
