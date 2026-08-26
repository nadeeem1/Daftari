import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: '/daftari-landing/',
  build: {
    target: 'esnext',
    sourcemap: true,
    outDir: 'dist'
  },
  server: {
    port: 5173
  }
});
