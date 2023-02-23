/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'modules',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AmnisState',
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          '@reduxjs/toolkit': 'ReduxToolkit',
        },
      },
      external: [
        '@reduxjs/toolkit',
        'node:crypto',
      ],
    },
  },
  test: {
    globals: true,
    testTimeout: 10000,
  },
});
