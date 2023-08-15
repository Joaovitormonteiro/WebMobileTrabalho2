import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ListPokemons.vue') }],
  },
  {
    path: '/favorite',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/FavoritePokemons.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

// admin
// 9FEs8mIYAl31IJav
