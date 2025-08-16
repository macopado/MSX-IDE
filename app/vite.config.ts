import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@state': fileURLToPath(new URL('./src/state', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@hierarchy': fileURLToPath(new URL('./src/hierarchy', import.meta.url)),
      '@inspector': fileURLToPath(new URL('./src/inspector', import.meta.url)),
      '@project': fileURLToPath(new URL('./src/project', import.meta.url)),
      '@game': fileURLToPath(new URL('./src/game', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    sourcemap: true,
  },
});