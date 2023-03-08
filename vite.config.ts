/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'modules',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        schema: resolve(__dirname, 'src/schema/index.ts'),
        validate: resolve(__dirname, 'src/validate/index.ts'),
      },
      name: 'AmnisState',
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
        'crypto',
      ],
    },
  },
  test: {
    globals: true,
    testTimeout: 10000,
  },
});
