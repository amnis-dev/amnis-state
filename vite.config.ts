/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AmnisState',
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
      external: [
        '@reduxjs/toolkit',
      ],
    },
  },
  test: {
    globals: true,
  },
});
