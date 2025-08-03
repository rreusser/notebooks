import { observable, config } from '@observablehq/notebook-kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  ...config(),
  plugins: [
    observable({ })
  ],
  root: 'notebooks',
  base: '/',
});
