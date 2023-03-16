import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../views/PracticePage') },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
