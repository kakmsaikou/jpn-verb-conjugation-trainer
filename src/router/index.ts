import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../views/PracticePage') },
  { path: '/settings', component: () => import('../views/SettingsPage') },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
