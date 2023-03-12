import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./../views/VerbPage') },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
