import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../views/PracticePage') },
  { path: '/setting', component: () => import('../views/SettingPage') },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
