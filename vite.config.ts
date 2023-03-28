import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/jpn-word-conjugation-trainer',
  plugins: [vue(), vueJsx({ transformOn: true, mergeProps: true })],
  server: {
    port: 3000,
  },
});
