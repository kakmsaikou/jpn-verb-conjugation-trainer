import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// @ts-ignore
import ElementPlus from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/jpn-word-conjugation-trainer',
  plugins: [
    vue(),
    vueJsx({ transformOn: true, mergeProps: true }),
    ElementPlus(),
  ],
  server: {
    port: 3000,
  },
});
