import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./../views/Verb') },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
